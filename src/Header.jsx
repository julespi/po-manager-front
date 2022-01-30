import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from "react";

function Header({ userLogedIn, logOutHandler, openPo }) {

  const [numProducts, setNumProducts] = useState("")

  useEffect(() => {
    if (openPo !== null && openPo.length > 0) {
      setNumProducts(openPo[0].details.length)
    }
  }, [openPo])


  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand className="ms-2">Gestor OC</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          {/* ----------- ORDENES -------------*/}

          {userLogedIn !== null && <>

            <Nav.Link as={Link} to="/cart">
              Carrito
              <Badge style={{ position: "absolute", top: "0.5rem", start: "0rem" }} pill bg="danger">
                {/*(openPo !== null && openPo.length > 0) ? numProducts : "0"*/}
                {numProducts}
              </Badge>
            </Nav.Link>
            <Nav.Link as={Link} to="/pos">Compras</Nav.Link>
            <Nav.Link as={Link} disabled to="/manage-employees">Empleados</Nav.Link>
            <Nav.Link as={Link} disabled to="/suppliers">Proveedores</Nav.Link>
          </>}
        </Nav>
        <Nav className="me-4">
          {userLogedIn === null ?
            <Nav.Link as={Link} to="login">Login</Nav.Link>
            :
            <NavDropdown title={userLogedIn.firstName} id="basic-nav-dropdown">
              <NavDropdown.Item disabled as={Link} to="profile">Perfil</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="cart">Carrito</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as={Link} to="/"
                onClick={logOutHandler}
              >Log out</NavDropdown.Item>
            </NavDropdown>
          }
        </Nav>
      </Navbar.Collapse>

    </Navbar>
  );
}

export default Header;