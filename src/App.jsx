import React from 'react';
import { IniciarSesion } from './components/IniciarSesion';
import { Registrar } from './components/Registrar';
import { Header } from './components/header';
import { Body } from './components/Body';
import { Planeta } from './components/Planeta';
import { Itinerario } from './components/Itinerario';
import { SeleccionPlaneta } from './components/SeleccionPlaneta';
import { Tutorial } from './components/Tutorial';
import { Preparar } from './components/Preparar';
import { Antes_de_ingresar } from './components/Antes_de_ingresar';
import { Condiciones } from './components/Condiciones';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Game2D } from './components/Game2D';

import "./styles/Body_general.css"


function App() {
  return (
    <>
    <BrowserRouter>
      <Header/>
      <Body/>
      <Routes>
      <Route path='/' Component={Body}/>
        <Route path='/login' Component={IniciarSesion}/>
        <Route path='/registro' Component={Registrar}/>
        <Route path='/inicio' Component={Preparar}/>
        <Route path='/antes_de_ingresar' Component={Antes_de_ingresar}/>
        <Route path='/SeleccionDePlaneta' Component={SeleccionPlaneta}/>
        <Route path='/tutorial' Component={Tutorial}/>
        <Route path='/itinerario' element={<Itinerario />}/>
        <Route path='/condiciones' Component={Condiciones}/>
        <Route path='/juego' element={<Game2D/>}/>
      </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App
