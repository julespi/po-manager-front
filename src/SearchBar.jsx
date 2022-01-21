import React, { useState } from 'react'
import { InputGroup, FormControl, SplitButton, Dropdown } from 'react-bootstrap';

function SearchBar({onSubmitHandler}) {

  const [searchValue, setSearchValue] = useState("")

  const onChangeSearchValueHandler = (value) => {
    setSearchValue(value)
  }

  return (
    <>
      <InputGroup className="mb-3">
        <FormControl 
        aria-label="Text input with dropdown button"
        placeholder='Ingrese descripcion del producto que desea buscar'
        value={searchValue}
        onChange={(e) => onChangeSearchValueHandler(e.target.value)}
        />
        <SplitButton
          variant="outline-secondary"
          title="Buscar"
          id="segmented-button-dropdown-2"
          alignRight
          onClick={() => onSubmitHandler(searchValue)}
        >
          <Dropdown.Item active >productos</Dropdown.Item>
          <Dropdown.Item >Proveedor</Dropdown.Item>
          <Dropdown.Item >Categoria</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#">Separated link</Dropdown.Item>
        </SplitButton>
      </InputGroup>
    </>

  )
}

export default SearchBar