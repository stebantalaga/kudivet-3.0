import React from 'react'
import appFirebase from '../credenciales'
import {getAuth, signOut} from 'firebase/auth'
import Crud from './CrudCliente'
import AppTap from './Tabs'
import '../App.css'


const auth = getAuth(appFirebase)

export const Home = ({correoUsuario}) => {
    return (
      <div className='container'>
        <div className='wrap-space-between'>
          <h2>Bienvenido de nuevo {correoUsuario}</h2>
        </div>
        <br/>
        <AppTap />
        <br/>
        <div className='wrap-btn'><button onClick={() => signOut(auth)} className='btn btn-outline-secondary'>Cerrar sesión</button></div>
      </div>
    )
  }
  