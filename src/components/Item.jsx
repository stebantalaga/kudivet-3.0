import { useState } from "react";


const Item = ({ raza, imagen, expectativa_vida, prevalencia_problemas_salud, origen, tamano, cuidados_especiales, colores_comunes, requisitos_ejercicio }) => {



return (
        <article className={`card-raza`}>
            <img className="mascota-imagen" src={imagen} alt={`Imagen de ${imagen}`} />
            <h5>{raza}</h5>
            <p><b>Expectativa de vida: </b>{expectativa_vida}</p>
            <p><b>Problemas de salud comunes: </b>{prevalencia_problemas_salud}</p>
            <p><b>Origen: </b>{origen}</p>
            <p><b>Tamaño: </b>{tamano}</p>
            <p><b>Cuidados especiales: </b>{cuidados_especiales}</p>
            <p><b>Colores más comunes: </b>{colores_comunes}</p>
            <p><b>Requisitos de ejercicio: </b>{requisitos_ejercicio}</p>
        </article>
    );
}
 
export default Item;