import Container from 'react-bootstrap/Container';
import Header from './Header'
import Data from './Data'
import Detail from './Detail'
import Login from "./Login"
import Orders from './Orders'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PurchaseOrder from "./PurchaseOrder";
import { useState } from 'react';


function App() {

  const [user, setUser] = useState(null)

  const logInHandler = (userLogedIn) => {
    console.log(userLogedIn)
    setUser(userLogedIn)
  }

  const logOutHandler = () => {
    setUser(null)
  }

  return (
    <BrowserRouter>
      <Header userLogedIn={user} logOutHandler={logOutHandler}/>
      <Container className="my-3">
        <Routes>
          <Route path="" element={<Data/>} />
          <Route path="products/:productId" element={<Detail userLogedIn={user} createMode={false}/>} />
          <Route path="products/new" element={<Detail userLogedIn={user} createMode={true}/>} />
          <Route path="login" element={<Login logInHandler={logInHandler}/>} />
          <Route path="suppliers" element={<div>Lista de proveedores</div>} />
          <Route path="purchase-order" element={<PurchaseOrder />} />
          <Route path="orders" element={<Orders />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>404!</p>
              </main>
            }
          />
        </Routes>
      </Container>
      {/*<Footer />*/}
    </BrowserRouter>
  )
}

export default App;


