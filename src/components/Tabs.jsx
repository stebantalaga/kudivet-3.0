import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap";
import { useState } from 'react';
import CrudCliente from './CrudCliente';
import CrudPersonal from './CrudPersonal';
import CrudInventario from './CrudInventario';
import ResultadoBusqueda from './ResultadoBusqueda';
import Header from './Header';
import Form from './Form'



function AppTap() {

  const [valueEmoji, setValueEmoji] = useState('fruit');


  const[activeTab,setActiveTab] = useState("1");

  const cambiarTab = (numeroTab) =>{
    if(activeTab !== numeroTab){
      setActiveTab(numeroTab);
    }
  }

  return (
    <div className="AppTap">
      <Nav tabs>
        <NavItem>
          <NavLink 
          className={(activeTab=="1" ? "activeTab baseTab" : "baseTab" )}
          onClick={()=>cambiarTab("1")}>
            Clientes
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink 
          className={(activeTab=="2" ? "activeTab baseTab" : "baseTab" )}
          onClick={()=>cambiarTab("2")}>
            Personal
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink 
          className={(activeTab=="3" ? "activeTab baseTab" : "baseTab" )}
          onClick={()=>cambiarTab("3")}>
          Inventario
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink 
          className={(activeTab=="4" ? "activeTab baseTab" : "baseTab" )}
          onClick={()=>cambiarTab("4")}>
          Búsqueda
          </NavLink>
        </NavItem>
      </Nav>


      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <div className='container'>
            <br />
            <CrudCliente />
          </div>
        </TabPane>

        <TabPane tabId="2">
          <div className='container'>
            <br />
            <CrudPersonal />
          </div>
        </TabPane>

        <TabPane tabId="3">
          <div className='container'>
            <br />
            <CrudInventario />
          </div>
        </TabPane>

        <TabPane tabId="4">
          <div className='container'>
            <br />
            <Header />
            <Form setValueEmoji={setValueEmoji} />
            <br />
            <ResultadoBusqueda valueEmoji={valueEmoji} />
          </div>
        </TabPane>
       </TabContent>
    </div>
  );
}

export default AppTap;