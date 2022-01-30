import Table from 'react-bootstrap/Table'
import React, { useState, useEffect } from 'react'
import { Card, Button, Badge } from 'react-bootstrap';
import userService from './services/userService';
import productService from './services/productService';
import orderService from './services/orderService';

function Orders({ userLogedIn }) {

    const [openOrder, setOpenOrder] = useState({
        orderLoaded: false,
        productsLoaded: false,
        order: {
            details: []
        }
    })

    const [closedOrders, setClosedOrders] = useState({
        ordersLoaded: false,
        productsLoaded: false,
        orders: []
    })

    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        if (userLogedIn != null && "id" in userLogedIn) {
            console.log("useEff")
            userService.getOrdersForUserId(userLogedIn.id, true)
                .then(
                    (response) => {
                        if (response.data.payload.length > 0) {
                            setOpenOrder({ orderLoaded: true, order: response.data.payload[0], productsLoaded: false })
                        } else {
                            setOpenOrder({ orderLoaded: false })
                        }

                    },
                    (error) => {
                        console.log(error)
                        setOpenOrder({ orderLoaded: false })
                    }
                )
            userService.getOrdersForUserId(userLogedIn.id, false)
                .then(
                    (response) => {
                        if (response.data.payload.length > 0) {
                            setClosedOrders({ ordersLoaded: true, orders: response.data.payload, productsLoaded: false })
                        } else {
                            setClosedOrders({ ordersLoaded: false })
                        }
                    },
                    (error) => {
                        console.log(error)
                        setClosedOrders({ orderLoaded: false })
                    }
                )
        }
    }, [userLogedIn, refresh])

    useEffect(() => {
        const completeOpenedDetails = async () => {
            if (openOrder.orderLoaded && openOrder.order?.id && !openOrder.productsLoaded) {
                let completedOpenedDetails = await getProductInfo(openOrder.order.details)
                let prevOpenedOrders = openOrder.order
                prevOpenedOrders.details = completedOpenedDetails
                setOpenOrder({ order: prevOpenedOrders, productsLoaded: true, orderLoaded: true })
            }
        }
        completeOpenedDetails()

    }, [openOrder])

    useEffect(() => {
        const completeClosedDetails = async () => {
            if (closedOrders.ordersLoaded && closedOrders.orders.length > 0 && !closedOrders.productsLoaded) {
                for (var i = 0; i < closedOrders.orders.length; i++) {
                    let completedDetails = await getProductInfo(closedOrders.orders[i].details)
                    let prevOrders = closedOrders.orders
                    prevOrders[i].details = completedDetails
                    setClosedOrders({ ordersLoaded: true, orders: prevOrders })
                }
                let prevOrders = closedOrders.orders
                setClosedOrders({ ordersLoaded: true, orders: prevOrders, productsLoaded: true })
            }
        }
        completeClosedDetails()

    }, [closedOrders.ordersLoaded])

    const getProductInfo = async (details) => {
        let newDetails = []
        let detail = {}
        for (var i = 0; i < details.length; i++) {
            detail = details[i]
            let product = await productService.getById(details[i].productId).then(response => response.payload)
            detail["product"] = product
            newDetails.push(detail)
        }
        return newDetails
        //setOpenOrder({ order: prevOrder, productsLoaded: true, orderLoaded: true })
    }

    const removeDetail = (id) => {
        orderService.deleteDetail(id).then(response => {
            console.log(response)
            let updatedDetails = []
            for (var i = 0; i < openOrder.order.details.length; i++) {
                if (openOrder.order.details[i].id !== id) {
                    updatedDetails.push(openOrder.order.details[i])
                }
            }
            let prevOrder = openOrder.order
            prevOrder.details = updatedDetails
            console.log(prevOrder)
            setOpenOrder({ order: prevOrder, productsLoaded: true, orderLoaded: true })
        })
    }

    const confirmPo = () => {
        orderService.confirm(openOrder.order, openOrder.order.id)
            .then(response => {
                console.log(response)
                if (response?.status === 200) {
                    setOpenOrder({
                        order: {
                            details: []
                        }, productsLoaded: false, orderLoaded: false
                    })
                    setClosedOrders({
                        orders: [], productsLoaded: false, ordersLoaded: false
                    })
                    setRefresh(true)
                }
            })
    }

    const deletePo = () => {
        for (var i = 0; i < openOrder.order.details.length; i++) {
            orderService.deleteDetail(openOrder.order.details[i].id).then()
        }
        let order = openOrder.order
        order.details = []
        order.isOpen = false
        orderService.update(order, order.id)
            .then(response => {
                if (response?.status === 200) {
                    setOpenOrder({ order: null, productsLoaded: false, orderLoaded: false })
                }
            })
    }




    return (
        <div>
            <Card>
                <Card.Body>
                    <Card>
                        <Card.Title className="ms-3 mt-2 mb-0">Carrito</Card.Title>
                        {!openOrder.orderLoaded ?
                            <Card.Body>Carrito vacio</Card.Body>
                            :
                            <Card.Body>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio unitario</th>
                                            <th>Precio suma</th>
                                            <th>Operaciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {openOrder.productsLoaded && openOrder.order.details.map((detail) => (
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
                                <Button className="me-2" variant="danger" size="sm" onClick={() => deletePo()}>Eliminar carrito</Button>
                                <Button variant="success" onClick={() => confirmPo()}>Confirmar compra</Button>
                            </Card.Body>
                        }
                    </Card>
                    <Card className="mt-3">
                        <Card.Title className="ms-3 mt-2 mb-0">Compras anteriores</Card.Title>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Cantidad de productos</th>
                                        <th>Fecha de compra</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {closedOrders.productsLoaded && closedOrders.orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.details.length}</td>
                                            <td>{order.created}</td>
                                            <td>
                                                {!order.isOpen && <Badge className="me-1" bg="success">Confirmada</Badge>}
                                                {order.delivered != null && <Badge bg="success">Entregada</Badge>}
                                            </td>
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