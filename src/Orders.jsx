import Table from 'react-bootstrap/Table'
import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Card, Button, Badge } from 'react-bootstrap';
import userService from './services/userService';

function Orders({ userLogedIn }) {

    const [orderState, setOrderState] = useState({
        loaded: false,
        orders: [],
        message: "",
        error: null,
    })


    useEffect(() => {
        if (userLogedIn != null && "id" in userLogedIn) {
            userService.getOrdersForUserId(userLogedIn.id)
                .then(
                    (data) => {
                        console.log(data)
                        setOrderState({ loading: false, orders: data.payload })
                    },
                    (error) => {
                        console.log(error)
                        setOrderState({ loading: true, error: error })
                    }
                )
        }

    }, [])

    /*
    if (!productState.loading && !done) {
        let item = {}
        let items = []
        productState.products.map((product) => {

            item = { value: product.id, label: product.description }
            items.push(item)
        })
        setOptions(items)
        console.log(options)
        setDone(true)
    }*/

    return (
        <div>
            <Card>
                <Card.Title className="ms-3 mt-2 mb-0">Ordenes</Card.Title>
                <Card.Body>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Cliente</Form.Label>
                                    <Form.Control placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Empleado</Form.Label>
                                    <Form.Control placeholder="Password" />
                                </Form.Group>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card>

                        <Card.Body>
                            <div className="d-flex">
                                <Button
                                    className="mb-3 ms-auto"
                                >Agregar producto</Button>



                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Cantidad de lineas</th>
                                        <th>Fecha</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderState.orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.details.length}</td>
                                            <td>{order.created}</td>
                                            <td>{order.isOpen ?
                                                <Badge bg="success">Abierto</Badge>
                                                :
                                                <Badge bg="danger">Cerrado</Badge>
                                            }</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Card.Body>

            </Card>





        </div>
    );
}

export default Orders