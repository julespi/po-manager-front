import Table from 'react-bootstrap/Table'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Card, Button, Modal } from 'react-bootstrap';
import Select from 'react-select'
import productService from './services/productService';
import supplierService from './services/supplierService';
import categoryService from './services/categoryService';

function PurchaseOrder() {

    const [show, setShow] = useState(false);

    const handleAddProduct = () => {
        setShow(true);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /*const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]*/
    const [options, setOptions] = useState([])
    const [done, setDone] = useState(false)

    const [productState, setProductState] = useState({
        loading: true,
        products: [],
        message: "",
        error: null,
    })

    const [categoryState, setCategoryState] = useState({
        loading: true,
        category: [],
        message: "",
        error: null,
    })

    const [supplierState, setSupplierState] = useState({
        loading: true,
        supplier: [],
        message: "",
        error: null,
    })


    useEffect(() => {

        productService.getAll()
            .then(
                (data) => {
                    setProductState({ loading: false, products: data.payload })
                },
                (error) => {
                    console.log(error)
                    setProductState({ loading: true, error: error })
                }
            )

        supplierService.getAll().then(
            (data) => {
                setSupplierState({ loading: false, supplier: data.payload })
            },
            (error) => {
                console.log(error)
                setSupplierState({ loading: true, error: error })
            }
        )

        categoryService.getAll().then(
            (data) => {
                setCategoryState({ loading: false, category: data.payload })
            },
            (error) => {
                console.log(error)
                setCategoryState({ loading: true, error: error })
            }
        )
    }, [])

    if (!productState.loading && !done) {//} && !categoryState.loading && !supplierState.loading){
        let item = {}
        let items = []
        productState.products.map((product) => {

            item = { value: product.id, label: product.description }
            items.push(item)
        })
        setOptions(items)
        console.log(options)
        setDone(true)
    }

    return (
        <div>
            <Card>
                <Card.Title className="ms-3 mt-2 mb-0">Nueva orden de compra</Card.Title>
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
                                    onClick={() => handleAddProduct()}
                                >Agregar producto</Button>



                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Producto</th>
                                        <th>Proveedor</th>
                                        <th>Cantidad</th>
                                        <th>Precio unitario</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>°</td></tr>
                                    {/*products.map(product => (
                            <tr key={product.id} onClick={() => onRowClick(product.id)}>
                                <td>{product.id}</td>
                                <td>{product.description}</td>
                                <td>{product.unitPrice}</td>
                                <td>{product.stock}</td>
                            </tr>
                        ))*/}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Card.Body>

            </Card>




            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <Select options={options} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email"
                            placeholder="name@example.com"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PurchaseOrder