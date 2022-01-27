import Table from 'react-bootstrap/Table'
import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap';
import userService from './services/userService';
import productService from './services/productService';
import orderService from './services/orderService';

function Orders({ userLogedIn }) {

    const [orderState, setOrderState] = useState({
        orderLoaded: false,
        productsLoaded: false,
        order: {
            details: []
        }
    })


    useEffect(() => {
        if (userLogedIn != null && "id" in userLogedIn) {
            userService.getOrdersForUserId(userLogedIn.id, true)
                .then(
                    (response) => {
                        console.log(response.data.payload[0].details)
                        setOrderState({ orderLoaded: true, order: response.data.payload[0] })
                    },
                    (error) => {
                        console.log(error)
                        setOrderState({ orderLoaded: false })
                    }
                )
        }
    }, [userLogedIn])

    useEffect(() => {
        if (orderState.orderLoaded && !orderState.productsLoaded) {
            const getProductInfo = async () => {
                let details = orderState.order.details
                console.log(details.length)
                let newDetails = []
                let detail = {}
                for (var i = 0; i < details.length; i++) {
                    detail = details[i]
                    let product = await productService.getById(details[i].productId).then(response => response.payload)
                    detail["product"] = product
                    newDetails.push(detail)
                }
                let prevOrder = orderState.order
                prevOrder.details = newDetails
                setOrderState({ order: prevOrder, productsLoaded: true, orderLoaded: true })
            }
            getProductInfo()
        }

    }, [orderState])

    const removeDetail = (id) => {
        orderService.deleteDetail(id).then(response => {
            console.log(response)
            let updatedDetails = []
            for (var i = 0; i < orderState.order.details.length; i++) {
                if (orderState.order.details[i].id !== id) {
                    updatedDetails.push(orderState.order.details[i])
                }
            }
            let prevOrder = orderState.order
            prevOrder.details = updatedDetails
            console.log(prevOrder)
            setOrderState({ order: prevOrder, productsLoaded: true, orderLoaded: true })
        })
    }




    return (
        <div>
            <Card>
                <Card.Title className="ms-3 mt-2 mb-0">Carrito</Card.Title>
                <Card.Body>
                    <Card>

                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio unitario</th>
                                        <th>Precio suma</th>
                                        <th>Operaciones <Button variant="success" onClick={() => console.log(orderState)}>test</Button></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderState.productsLoaded && orderState.order.details.map((detail) => (
                                        <tr key={detail.id}>
                                            <td>{detail.id}</td>
                                            <td>{detail.product.description}</td>
                                            <td>{detail.quantity}</td>
                                            <td>$ {detail.unitSalePrice}</td>
                                            <td>$ {detail.quantity * detail.unitSalePrice}</td>
                                            <td>
                                                <Button
                                                    className="me-2"
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => removeDetail(detail.id)}
                                                >Remover</Button>
                                                <Button variant="warning" size="sm" disabled>Modificar</Button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Button className="me-2" variant="danger" size="sm">Eliminar carrito</Button>
                            <Button variant="success">Confirmar compra</Button>
                        </Card.Body>
                    </Card>
                </Card.Body>

            </Card>


        </div>
    );
}

export default Orders