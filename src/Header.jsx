import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function Header({ userLogedIn, logOutHandler }) {


  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand className="ms-2">Gestor OC</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/products">Productos</Nav.Link>
          
          <Nav.Link as={Link} to="/purchase-order">Orden de compra</Nav.Link>
          {userLogedIn !== null &&  <>
            <Nav.Link as={Link} to="/manage-employees">Empleados</Nav.Link>
            <Nav.Link as={Link} to="/suppliers">Proveedores</Nav.Link>
            </>}

        </Nav>
        <Nav className="me-4">
          {userLogedIn === null ?
            <Nav.Link as={Link} to="login">Login</Nav.Link>
            :
            <NavDropdown title={userLogedIn.firstName} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="profile">Perfil</NavDropdown.Item>
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