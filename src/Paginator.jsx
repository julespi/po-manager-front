import React from "react"
import { Pagination } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

function Paginator({ paginationInfo, destinationPrefix }) {
  const navigate = useNavigate();
  const urlParam = "?page="


  const itemClickHandller = (text) => {
    if (text) {
      console.log(text)
      navigate(destinationPrefix + urlParam + (Number(text) - 1))

    }

  }

  return (
    <Pagination >

      {Array.from(Array(paginationInfo.totalPages), (e, i) => {
        return (
          <Pagination.Item
            key={i + 1}
            active={paginationInfo.currentPage === i}
            onClick={(e) => itemClickHandller(e.target.text)}
          >
            {i + 1}
          </Pagination.Item>
        )
      })}

    </Pagination >



  );
}

export default Paginator
