import React, { useState } from 'react';
import { Card, Form, Row, Button } from 'react-bootstrap'
import userService from './services/userService';
import { useNavigate } from 'react-router-dom';



function Login({ logInHandler }) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const handlerClickInicioSesion = () => {
    let userToLogin = {
      email: email,
      password: password
    }
    userService.logIn(userToLogin)
      .then(
        (user) => {
          if (user == null) {
            alert("Credenciales incorrectas")
          } else {
            logInHandler(user)
            navigate('/');
          }
        },
        (error) => {
          console.log("Error fetching login credentials")
          logInHandler(null)
        }
      )
  }

  const onChangeEmail = (value) => {
    setEmail(value)
  }
  const onChangePassword = (value) => {
    setPassword(value)
  }


  return (
    <Row className="justify-content-md-center mt-5">
      <Card style={{ width: '25rem' }}>
        <Card.Body>
          <Form>
            <h3>Iniciar sesion</h3>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese email"
                onChange={(e) => onChangeEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                onChange={(e) => onChangePassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Recordarme" disabled />
            </Form.Group>
            <Button variant="primary" onClick={handlerClickInicioSesion}>
              Sign in
            </Button>
            <p className="forgot-password text-right">
              No pose un usuario aun? <a href="/signup" disabled>Registrese</a>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Row>
  )
}

export default Login;
