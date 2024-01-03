import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import { Table, Button, Container, FormGroup } from "reactstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

/* endpoint donde realizaremos las consultas de la base de datos */
const url = "http://localhost:5000/personal/"

class CrudPersonal extends Component {

    state={
            data:[],
            modalInsertar: false,
            modalEliminar: false,
            form:{
                id: '',
                nombre: '',
                cargo: '',
                celular: '',
                correo: ''
            }
        }
        
        peticionGet=()=>{
        axios.get(url).then(response=>{
            this.setState({data: response.data});
        }).catch(error=>{
            console.log(error.message);
        })
        }
        
    
        peticionPost=async()=>{
            delete this.state.form.id;
            await axios.post(url,this.state.form).then(response=>{
            this.modalInsertar();
            this.peticionGet();
            }).catch(error=>{
            console.log(error.message);
            })
        }
        
        peticionPut=()=>{
          axios.put(url+this.state.form.id, this.state.form).then(response=>{
            this.modalInsertar();
            this.peticionGet();
          })
        }
        
        peticionDelete=()=>{
          axios.delete(url+this.state.form.id).then(response=>{
            this.setState({modalEliminar: false});
            this.peticionGet();
          })
        }
    
    
        /* Función para abrir el modal de añadir datos */
        modalInsertar = () => {
            this.setState({modalInsertar: !this.state.modalInsertar});
        };
    
        seleccionarPersonal=(personal)=>{
            this.setState({
              tipoModal: 'actualizar',
              form: {
                id: personal.id,
                nombre: personal.nombre,
                cargo: personal.cargo,
                celular: personal.celular,
                correo: personal.correo
            }
            })
          }
    
    
        handleChange=async e=>{
          e.persist();
          await this.setState({
            form:{
              ...this.state.form,
              [e.target.name]: e.target.value
            }
          });
          console.log(this.state.form);
          }
    
    
        componentDidMount() {
          this.peticionGet();
        }
    

    /* UI que se renderiza al usuario */
    render() {

        const {form}=this.state;

        return(
            <div>
                <div className='wrap-space-between'>
                    <h4>Gestionar el personal de la veterinaria</h4>
                    <button className='btn btn-primary' onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Añadir personal</button>
                </div>

                <br />

                <table className='table-main'>
                    <thead className='table-header'>
                        <tr className='table-row'>
                            <th className='table-item col-md-1'>Id</th>
                            <th className='table-item col-md-2'>Nombre</th>
                            <th className='table-item col-md-2'>Cargo</th>
                            <th className='table-item col-md-2'>N° celular</th>
                            <th className='table-item col-md-3'>Correo electrónico</th>
                            <th className='table-item col-md-2'>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.data.map((personal) => (
                            <tr key={personal.id} className='table-row'>
                                <td className='table-item col-md-1'>{personal.id}</td>
                                <td className='table-item col-md-2'>{personal.nombre}</td>
                                <td className='table-item col-md-2'>{personal.cargo}</td>
                                <td className='table-item col-md-2'>{personal.celular}</td>
                                <td className='table-item col-md-3'>{personal.correo}</td>
                                <td className='table-item col-md-2'>
                                    <button className='btn btn-info btn-sm' onClick={()=>{this.seleccionarPersonal(personal); this.modalInsertar()}}>Editar</button>
                                    {"    "}
                                    <button className='btn btn-outline-danger btn-sm' onClick={()=>{this.seleccionarPersonal(personal); this.setState({modalEliminar: true})}}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal para agregar personal a la veterinaria */}
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{display: 'block'}}>
                        <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                        <div><h3>Editar personal de la veterinaria</h3></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                        <label htmlFor="id">Id:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="id"
                            id="id"
                            readOnly
                            onChange={this.handleChange}
                            value={form?form.id: this.state.data.length+1} 
                        />
                        </FormGroup>
                        <FormGroup>
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="nombre"
                            id="nombre"
                            onChange={this.handleChange}
                            value={form?form.nombre: ''}
                        />
                        </FormGroup>
                        <FormGroup>
                        <label htmlFor="cargo">Cargo:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="cargo"
                            id="cargo"
                            onChange={this.handleChange}
                            value={form?form.cargo: ''}
                        />
                        </FormGroup>
                        <FormGroup>
                        <label htmlFor="celular">Número de celular:</label>
                        <input
                            className="form-control"
                            type="number"
                            name="celular"
                            id="celular"
                            onChange={this.handleChange}
                            value={form?form.celular: ''}
                        />
                        </FormGroup>
                        <FormGroup>
                        <label htmlFor="correo">Correo electrónico:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="correo"
                            id="correo"
                            onChange={this.handleChange}
                            value={form?form.correo: ''}
                        />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.tipoModal=='insertar'?
                            <button className="btn btn-primary" onClick={()=>this.peticionPost()}>
                            Insertar
                            </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                                Actualizar
                            </button>
                        }
                        <button className="btn btn-outline-secondary" onClick={()=>this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                {/* Modal para eliminar una mascota de la base de datos */}
                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                    Estás seguro que deseas eliminar a este miembro del personal: {form && form.nombre}
                    </ModalBody>
                    <ModalFooter>
                    <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
                    <button className="btn btn-outline-secondary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
                    </ModalFooter>
                </Modal>
                </div>
        )
    }
}

export default CrudPersonal;