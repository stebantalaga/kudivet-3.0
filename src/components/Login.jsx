import React, {useState} from 'react'
import Image from '../assets/login-banner.png'
import Logo from '../assets/logo-kudivet.png'
import '../App.css'

import appFirebase from '../credenciales'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
const auth = getAuth(appFirebase)

export const Login = () => {

    const [registrando, setRegistrando] = useState(false)

    const functAutenticacion = async(e) => {
        e.preventDefault();

        const correo = e.target.email.value;
        const contraseña = e.target.password.value;
        console.log(correo);
        /* Se crea el usuario en base de datos, la contraseña debe tener más de 8 caracteres */
        if (registrando) {
            try {
                await createUserWithEmailAndPassword(auth, correo, contraseña)
            } catch (error) {
                alert("La contraseña debe tener más de 8 caracteres")
            }
        }
        /* Se inicia sesión en la app, si hay un error en los datos mostramos un modal informando al usuario el error */
        else {
            try {
                await signInWithEmailAndPassword(auth, correo, contraseña)
            } catch (error) {
                alert("El correo o la contraseña son incorrectas")
            }
        }
    }



  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6'>
                <div className='padre'>
                    <img src={Logo} alt="" className='kudivet-logo' />
                    <h1>Iniciar sesión</h1>
                        <div>
                            <form className='formulario' onSubmit={functAutenticacion}>
                                <label className='label-form'>Correo electrónico</label>
                                <input type="text" placeholder='Correo electrónico' className='cajatexto' id='email' />
                                <label className='label-form'>Contraseña</label>
                                <input type="password" placeholder='Contraseña' className='cajatexto' id='password' />
                                <button className='btn-large btn-form'>{registrando ? "registrate" : "Inicia sesión"}</button>
                            </form>
                        </div>
                        <div className='wrap-btn'>
                            <p>{registrando ? "Si ya tienes cuenta" : "No tienes cuenta"}<button className='btn btn-link' onClick={() => setRegistrando(!registrando)}>{registrando ? "Inicia sesión" : "Registrate"}</button></p>
                        </div>
                </div>
            </div>
            <div className='col-md-6'>
            <img src={Image} alt="" className='tamaño-imagen' />
            </div>
        </div>
    </div>
  )
}
