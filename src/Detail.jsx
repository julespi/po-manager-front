import { useParams } from "react-router-dom";
import { Form, Button, Card, Col, Row, InputGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import categoryService from "./services/categoryService";
import productService from "./services/productService";
import supplierService from "./services/supplierService";
import { useNavigate } from "react-router-dom";

function Detail({ userLogedIn, createMode }) {
  let params = useParams();
  const navigate = useNavigate();

  const defaultErrors = {
    description: "",
    unitPrice: "",
    stock: "",
    restock: "",
    discontinuous: "",
    supplierId: "",
    categoryId: "",
  };
  const [errors, setErrors] = useState(defaultErrors);

  const [productState, setProductState] = useState({
    loaded: false,
    product: {
      id: null,
      description: "",
      unitPrice: 0.0,
      stock: "",
      restock: "",
      discontinuous: false,
      supplierId: "",
      categoryId: "",
    },
    message: "",
    error: null,
  });

  const [categoryState, setCategoryState] = useState({
    loaded: false,
    category: [],
    message: "",
    error: null,
  });

  const [supplierState, setSupplierState] = useState({
    loaded: false,
    supplier: [],
    message: "",
    error: null,
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!createMode) {
      productService.getById(params.productId).then(
        (data) => {
          setProductState({ loaded: true, product: data.payload });
        },
        (error) => {
          console.log(error);
          setProductState({ loaded: false, error: error });
        }
      );
    }

    supplierService.getAll().then(
      (data) => {
        setSupplierState({ loaded: true, supplier: data.payload });
      },
      (error) => {
        console.log(error);
        setSupplierState({ loaded: false, error: error });
      }
    );

    categoryService.getAll().then(
      (data) => {
        setCategoryState({ loaded: true, category: data.payload });
      },
      (error) => {
        console.log(error);
        setCategoryState({ loaded: false, error: error });
      }
    );
  }, []);

  const handleDescription = (value) => {
    let product = productState.product;
    product.description = value;
    setProductState({ product: product });
  };

  const handlePrice = (value) => {
    let product = productState.product;
    product.unitPrice = value;
    setProductState({ product: product });
  };

  const handleStock = (value) => {
    let product = productState.product;
    product.stock = value;
    setProductState({ product: product });
  };

  const handleRestock = (value) => {
    let product = productState.product;
    product.restock = value;
    setProductState({ product: product });
  };

  const handleDiscontinuousSwitch = (value) => {
    setProductState((state) => ((state.product.discontinuous = value), state));
  };

  const handleCategorySelect = (value) => {
    let product = productState.product;
    product.categoryId = value;
    setProductState({ product: product });
  };

  const handleSupplierSelect = (value) => {
    let product = productState.product;
    product.supplierId = value;
    setProductState({ product: product });
  };

  const handleEditModeSwitch = () => {
    setEditMode(!editMode);
  };

  const handlePurchase = () => {
    console.log("purchase");
  };

  const handleUpdateClick = () => {
    productService.update(productState.product, productState.product.id).then(
      () => {
        alert("Producto actualizado correctamente");
        setEditMode(false);
      },
      (error) => {
        console.log(error);
        alert("Error actualizando el producto");
      }
    );
  };

  const handleCreateClick = () => {
    setErrors(defaultErrors);
    console.log("product to create: " + JSON.stringify(productState.product));

    productService.create(productState.product).then(
      (data) => {
        console.log(data);
        alert("Producto creado correctamente");
        navigate("/");
      },
      (error) => {
        console.log(error);
        setErrors((prev) => ({ ...prev, ...error }));
      }
    );
  };

  /*if (!productState.loaded && !createMode) {
        return <h2>Cargando...</h2>
    } else {*/
  return (
    <Card>
      {createMode ? (
        <Card.Title className="ms-3">Crear nuevo producto</Card.Title>
      ) : (
        <Card.Title className="ms-3">Detalle de producto</Card.Title>
      )}
      <Card.Body>
        <Form>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                value={productState.product.description}
                disabled={!editMode && !createMode}
                onChange={(e) => handleDescription(e.target.value)}
                isInvalid={errors.description !== ""}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Precio</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  value={productState.product.unitPrice}
                  disabled={!editMode && !createMode}
                  onChange={(e) => handlePrice(e.target.value)}
                  isInvalid={errors.unitPrice !== ""}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.unitPrice}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Unidades en Stock</Form.Label>
              <Form.Control
                value={productState.product.stock}
                disabled={!editMode && !createMode}
                onChange={(e) => handleStock(e.target.value)}
                isInvalid={errors.stock !== ""}
              />
              <Form.Control.Feedback type="invalid">
                {errors.stock}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Cantidad a reponer</Form.Label>
              <Form.Control
                value={productState.product.restock}
                disabled={!editMode && !createMode}
                onChange={(e) => handleRestock(e.target.value)}
                isInvalid={errors.restock !== ""}
              />
              <Form.Control.Feedback type="invalid">
                {errors.restock}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
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
                isInvalid={errors.categoryId !== ""}
              >
                {createMode && (
                  <option value={123}>Seleccione una opcion</option>
                )}
                {categoryState.loaded ? (
                  categoryState.category.map((aCategory) => (
                    <option key={aCategory.id} value={aCategory.id}>
                      {aCategory.description}
                    </option>
                  ))
                ) : (
                  <option>Cargando...</option>
                )}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.categoryId}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Proveedor</Form.Label>
              <Form.Select
                disabled={(!supplierState.loaded || !editMode) && !createMode}
                value={productState.product.supplierId}
                onChange={(e) => handleSupplierSelect(e.target.value)}
                isInvalid={errors.supplierId !== ""}
              >
                {createMode && <option>Seleccione una opcion</option>}
                {supplierState.loaded ? (
                  supplierState.supplier.map((aSupplier) => (
                    <option key={aSupplier.id} value={aSupplier.id}>
                      {aSupplier.company}
                    </option>
                  ))
                ) : (
                  <option>Cargando...</option>
                )}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.supplierId}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          {!createMode &&
          userLogedIn !== null &&
          userLogedIn.role === "MANAGER" ? (
            <Form.Check
              className="mb-3"
              type="switch"
              id="custom-switch"
              label="Editar?"
              checked={editMode}
              onClick={() => handleEditModeSwitch()}
            />
          ) : (
            ""
          )}

          <Button variant="secondary" className="me-5" href="/products">
            Regresar
          </Button>
          {editMode && (
            <Button variant="primary" onClick={() => handleUpdateClick()}>
              Actualizar
            </Button>
          )}
          {createMode ? (
            <Button variant="success" onClick={() => handleCreateClick()}>
              Crear
            </Button>
          ) : (
            <Button variant="success" onClick={() => handlePurchase()}>
              Agregar a la OC
            </Button>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
  //}
}

export default Detail;
