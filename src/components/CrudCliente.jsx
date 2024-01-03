import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import { Table, Button, Container, FormGroup } from "reactstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

/* endpoint donde realizaremos las consultas de la base de datos */
const url = "http://localhost:5000/cliente/"

class CrudCliente extends Component {

    state={
        data:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
            id: '',
            nombre: '',
            animal: '',
            raza: '',
            edad: '',
            dueño: '',
            tipoModal: ''
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

    seleccionarCliente=(cliente)=>{
        this.setState({
          tipoModal: 'actualizar',
          form: {
            id: cliente.id,
            nombre: cliente.nombre,
            animal: cliente.animal,
            raza: cliente.raza,
            edad: cliente.edad,
            dueño: cliente.dueño
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
                    <h4>Gestionar clientes</h4>
                    <button className='btn btn-primary' onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Añadir mascota</button>
                </div>

                <br />

                <table className='table-main'>
                    <thead className='table-header'>
                        <tr className='table-row'>
                            <th className='table-item col-md-1'>Id</th>
                            <th className='table-item col-md-2'>Nombre</th>
                            <th className='table-item col-md-2'>Animal</th>
                            <th className='table-item col-md-2'>Raza</th>
                            <th className='table-item col-md-1'>Edad</th>
                            <th className='table-item col-md-2'>Dueño</th>
                            <th className='table-item col-md-2'>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.data.map((cliente) => (
                            <tr key={cliente.id} className='table-row'>
                                <td className='table-item col-md-1'>{cliente.id}</td>
                                <td className='table-item col-md-2'>{cliente.nombre}</td>
                                <td className='table-item col-md-2'>{cliente.animal}</td>
                                <td className='table-item col-md-2'>{cliente.raza}</td>
                                <td className='table-item col-md-1'>{cliente.edad} años</td>
                                <td className='table-item col-md-2'>{cliente.dueño}</td>
                                <td className='table-item col-md-2'>
                                    <button className='btn btn-info btn-sm' onClick={()=>{this.seleccionarCliente(cliente); this.modalInsertar()}}>Editar</button>
                                    {"    "}
                                    <button className='btn btn-outline-danger btn-sm' onClick={()=>{this.seleccionarCliente(cliente); this.setState({modalEliminar: true})}}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                {/* Modal para agregar una nueva mascota a la base de datos */}
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{display: 'block'}}>
                        <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                        <div><h3>Añadir mascota</h3></div>
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
                            <label htmlFor="animal">Tipo de mascota:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="animal"
                                id="animal"
                                onChange={this.handleChange}
                                value={form?form.animal: ''}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="raza">Raza:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="raza"
                                id="raza"
                                onChange={this.handleChange}
                                value={form?form.raza: ''}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="edad">Edad (en años):</label>
                            <input
                                className="form-control"
                                type="number"
                                name="edad"
                                id="edad"
                                onChange={this.handleChange}
                                value={form?form.edad: ''}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="dueño">Dueño:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="dueño"
                                id="dueño"
                                onChange={this.handleChange}
                                value={form?form.dueño: ''}
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
                    Estás seguro que deseas eliminar a la mascota {form && form.nombre}
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

export default CrudCliente;