// Ejemplo de componente Home
import React from 'react';
import { Navbar } from './Navbar';

function Home() {
  return (
    <>
        <Navbar/>
    <div>
      <h1>¡Bienvenido a la página de inicio!</h1>
      {/* Contenido de la página de inicio */}
    </div>
    </>


    
  );
}

export default Home;
