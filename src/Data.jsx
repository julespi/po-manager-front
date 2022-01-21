import Table from 'react-bootstrap/Table'
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import productService from './services/productService';
import SearchBar from './SearchBar';

function Data() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();


    const onRowClick = (id) => {
        console.log(id)
        navigate('/products/' + id);
    }



    useEffect(() => {
        completeTable(null)

    }, [])

    const completeTable = (description) => {
        if (description == null) {
            productService.getAll()
                .then(
                    (data) => {
                        setIsLoaded(true);
                        setProducts(data.payload);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }else{
            productService.getByDescription(description)
            .then(
                (data) => {
                    console.log(data.payload)
                    setIsLoaded(true);
                    setProducts(data.payload);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        }
    }


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Card>
                <Card.Title className="ms-3 mt-2">Listado de productos</Card.Title>
                <Card.Body>
                    <div className="d-flex">
                        <SearchBar onSubmitHandler={completeTable}/>
                        <Button className="mb-3 ms-auto" as={Link} to="/products/new">Nuevo</Button>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Descripcion</th>
                                <th>Precio Unitario</th>
                                <th>Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id} onClick={() => onRowClick(product.id)}>
                                    <td>{product.id}</td>
                                    <td>{product.description}</td>
                                    <td>{product.unitPrice}</td>
                                    <td>{product.stock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}

export default Data
