import { useParams } from "react-router-dom";
import { Form, Button, Card, Col, Row, InputGroup } from "react-bootstrap"
import React, { useState, useEffect } from 'react'
import categoryService from "./services/categoryService";
import productService from "./services/productService";
import supplierService from "./services/supplierService";
import { useNavigate, Link } from 'react-router-dom';



function Detail({ userLogedIn, createMode }) {
    let params = useParams();
    const navigate = useNavigate();

    const [test, setTest] = useState(false)

    const [errors, setErrors] = useState({
        description: "",
        unitPrice: "",
        stock: "",
        restock: "",
        discontinuous: "",
        supplierId: "",
        categoryId: "",
    })

    const [productState, setProductState] = useState({
        loaded: false,
        product: {
            id: null,
            description: "",
            unitPrice: 0.0,
            stock: "",
            restock: "",
            discontinuous: false,
            supplierId: 0,
            categoryId: 0,
        },
        message: "",
        error: null,
    })

    const [categoryState, setCategoryState] = useState({
        loaded: false,
        category: [],
        message: "",
        error: null,
    })

    const [supplierState, setSupplierState] = useState({
        loaded: false,
        supplier: [],
        message: "",
        error: null,
    })

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {

        console.log(errors)

        if (!createMode) {
            productService.getById(params.productId)
                .then(
                    (data) => {
                        setProductState({ loaded: true, product: data.payload })
                    },
                    (error) => {
                        console.log(error)
                        setProductState({ loaded: false, error: error })
                    }
                )
        }

        supplierService.getAll().then(
            (data) => {
                setSupplierState({ loaded: true, supplier: data.payload })
            },
            (error) => {
                console.log(error)
                setSupplierState({ loaded: false, error: error })
            }
        )

        categoryService.getAll().then(
            (data) => {
                setCategoryState({ loaded: true, category: data.payload })
            },
            (error) => {
                console.log(error)
                setCategoryState({ loaded: false, error: error })
            }
        )
    }, [])

    const handleDescription = (value) => {
        let product = productState.product
        product.description = value
        setProductState({ product: product })
    }

    const handlePrice = (value) => {
        let product = productState.product
        product.unitPrice = value
        setProductState({ product: product })
    }

    const handleStock = (value) => {
        let product = productState.product
        product.stock = value
        setProductState({ product: product })
    }

    const handleRestock = (value) => {
        let product = productState.product
        product.restock = value
        setProductState({ product: product })
    }

    const handleDiscontinuousSwitch = (value) => {
        setProductState(state => (state.product.discontinuous = value, state))
    }

    const handleCategorySelect = (value) => {
        let product = productState.product
        product.categoryId = value
        setProductState({ product: product })
    }

    const handleSupplierSelect = (value) => {
        let product = productState.product
        product.supplierId = value
        setProductState({ product: product })
    }

    const handleEditModeSwitch = () => {
        setEditMode(!editMode)
    }

    const handleUpdateClick = () => {
        productService.update(productState.product, productState.product.id)
            .then(
                () => {
                    alert("Producto actualizado correctamente")
                    setEditMode(false)
                },
                (error) => {
                    console.log(error)
                    alert("Error actualizando el producto")
                }
            )
    }

    const handleCreateClick = () => {
        console.log("product to create: "+JSON.stringify(productState.product))
        productService.create(productState.product)
            .then(
                (data) => {
                    console.log(data)
                    alert("Producto creado correctamente")
                    navigate("/")
                },
                (error) => {
                    let currentErrors = errors
                    Object.keys(error).map(key => {
                        //setErrors({...errors,[key]:error[key]})
                        currentErrors[key] = error[key]
                        
                    })
                    setErrors(currentErrors)
                    console.log(errors)
                    console.log("errors.unitPrice !== ''    ", errors.unitPrice !== "")
                    alert("Error creando el producto\n " + error)
                }
            )            
    }

    const testFunc = (form) => {
        console.log("errors.unitPrice !== ''    ", errors.unitPrice !== "")
        //setErrors({...errors,unitPrice: "asdasd"})
        console.log("errors: "+JSON.stringify(errors))
        console.log(test)
        setTest(!test)
    }

    /*if (!productState.loaded && !createMode) {
        return <h2>Cargando...</h2>
    } else {*/
        return (
            <Card>
                {createMode ?
                    <Card.Title className="ms-3">Crear nuevo producto</Card.Title>
                    :
                    <Card.Title className="ms-3">Detalle de producto</Card.Title>
                }
                <Card.Body>
                    <Form>
                        <Row>
                            <Form.Group as={Col} >
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control
                                    value={productState.product.description}
                                    disabled={!editMode && !createMode}
                                    onChange={(e) => handleDescription(e.target.value)}
                                ></Form.Control>
                                <Form.Control.Feedback type="invalid">Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>{errors.unitPrice}</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control
                                        value={productState.product.unitPrice}
                                        disabled={!editMode && !createMode}
                                        onChange={(e) => handlePrice(e.target.value)}
                                        isInvalid={test}
                                    />
                                    <Form.Control.Feedback>{errors.unitPrice}</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group >

                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Unidades en Stock</Form.Label>
                                <Form.Control
                                    value={productState.product.stock}
                                    disabled={!editMode && !createMode}
                                    onChange={(e) => handleStock(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Cantidad a reponer</Form.Label>
                                <Form.Control
                                    value={productState.product.restock}
                                    disabled={!editMode && !createMode}
                                    onChange={(e) => handleRestock(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip" >
                                <Form.Label></Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    id="autoSizingCheck"
                                    className="mt-3"
                                    label="Discontinuo?"
                                    defaultChecked={productState.product.discontinuous}
                                    disabled={!editMode}
                                    onChange={(e) => handleDiscontinuousSwitch(e.target.checked)}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Select
                                    disabled={(!categoryState.loaded || !editMode) && !createMode}
                                    value={productState.product.categoryId}
                                    onChange={(e) => handleCategorySelect(e.target.value)}
                                >
                                    {createMode && <option >Seleccione una opcion</option>}
                                    {categoryState.loaded ?

                                        categoryState.category.map(aCategory =>
                                            <option key={aCategory.id} value={aCategory.id}>{aCategory.description}</option>
                                        )
                                        : <option>Cargando...</option>
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Proveedor</Form.Label>
                                <Form.Select
                                    disabled={(!supplierState.loaded || !editMode) && !createMode}
                                    value={productState.product.supplierId}
                                    onChange={(e) => handleSupplierSelect(e.target.value)}
                                >
                                    {createMode && <option >Seleccione una opcion</option>}
                                    {supplierState.loaded ?
                                        supplierState.supplier.map(aSupplier =>
                                            <option key={aSupplier.id} value={aSupplier.id}>{aSupplier.company}</option>
                                        )
                                        : <option>Cargando...</option>
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        {!createMode && userLogedIn !== null && userLogedIn.role === "MANAGER" ?
                            <Form.Check className="mb-3"
                                type="switch"
                                id="custom-switch"
                                label="Editar?"
                                checked={editMode}
                                onClick={() => handleEditModeSwitch()}
                            />
                            : ""
                        }

                        <Button variant="secondary" className="me-5"
                            href="/products">
                            Regresar
                        </Button>
                        {editMode &&
                            <Button variant="primary" onClick={() => handleUpdateClick()}>
                                Actualizar
                            </Button>
                        }
                        {createMode &&
                            <Button variant="success" onClick={() => handleCreateClick()}>
                                Crear
                            </Button>
                        }
                        <Button variant="success" onClick={e => testFunc(e.currentTarget.parentNode)}>
                                Test
                            </Button>
                    </Form>




                </Card.Body>
            </Card>




        )
    //}
}

export default Detail