import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import { Table, Button, Container, FormGroup } from "reactstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

/* endpoint donde realizaremos las consultas de la base de datos */
const url = "http://localhost:5000/inventario/"



class CrudInventario extends Component {

    state={
        data:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
            id: '',
            producto: '',
            categoria: '',
            stock: '',
            precio: '',
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

    seleccionarInventario=(inventario)=>{
        this.setState({
          tipoModal: 'actualizar',
          form: {
            id: inventario.id,
            producto: inventario.producto,
            categoria: inventario.categoria,
            stock: inventario.stock,
            precio: inventario.precio
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
                    <h4>Gestionar inventario</h4>
                    <button className='btn btn-primary' onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Añadir producto</button>
                </div>

                <br />

                <table className='table-main'>
                    <thead className='table-header'>
                        <tr className='table-row'>
                            <th className='table-item col-md-1'>Id</th>
                            <th className='table-item col-md-3'>Producto</th>
                            <th className='table-item col-md-2'>Categoría</th>
                            <th className='table-item col-md-2'>Stock</th>
                            <th className='table-item col-md-2'>Precio</th>
                            <th className='table-item col-md-2'>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.data.map((inventario) => (
                            <tr key={inventario.id} className='table-row'>
                                <td className='table-item col-md-1'>{inventario.id}</td>
                                <td className='table-item col-md-3'>{inventario.producto}</td>
                                <td className='table-item col-md-2'>{inventario.categoria}</td>
                                <td className='table-item col-md-2'>{inventario.stock} unidades</td>
                                <td className='table-item col-md-2'>${inventario.precio} COP</td>
                                <td className='table-item col-md-2'>
                                    <button className='btn btn-info btn-sm' onClick={()=>{this.seleccionarInventario(inventario); this.modalInsertar()}}>Editar</button>
                                    {"    "}
                                    <button className='btn btn-outline-danger btn-sm' onClick={()=>{this.seleccionarInventario(inventario); this.setState({modalEliminar: true})}}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                {/* Modal para agregar una nueva mascota a la base de datos */}
                <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                        <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                        <div><h3>Añadir producto</h3></div>
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
                            <label htmlFor="producto">Nombre del producto:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="producto"
                                id="producto"
                                onChange={this.handleChange}
                                value={form?form.producto: ''}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="categoria">Categoría:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="categoria"
                                id="categoria"
                                onChange={this.handleChange}
                                value={form?form.categoria: ''}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="stock">Cantidad en Stock:</label>
                            <input
                                className="form-control"
                                type="number"
                                name="stock"
                                id="stock"
                                onChange={this.handleChange}
                                value={form?form.stock: ''}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="precio">Precio:</label>
                            <input
                                className="form-control"
                                type="number"
                                name="precio"
                                id="precio"
                                onChange={this.handleChange}
                                value={form?form.precio: ''}
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
                    Estás seguro que deseas eliminar este producto: {form && form.nombre}
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

export default CrudInventario;