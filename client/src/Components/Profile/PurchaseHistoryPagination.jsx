import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PurchaseHistoryPagination = (props) => {
  const { activePage, numberOfPages, setActivePage } = props;

  const pageNumberClickHandler = (e, pageNumber) => {
    e.preventDefault();
    if (pageNumber >= 1 && pageNumber <= numberOfPages) {
      setActivePage(pageNumber);
    }
  };

  const getPaginationItems = () => {
    let paginationItems = [];
    for (let i = 1; i <= numberOfPages; i++) {
      paginationItems.push(
        <PaginationItem
          onClick={(e) => {
            pageNumberClickHandler(e, i);
          }}
          active={activePage === i}
        >
          <PaginationLink href={`/profile#purchase_history/${i}`}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return paginationItems;
  };

  return (
    <div>
      <Pagination aria-label="Page navigation example">
        <PaginationItem
          onClick={(e) => {
            pageNumberClickHandler(e, 1);
          }}
          hidden={activePage === 1}
        >
          <PaginationLink first href={`/profile#purchase_history/1`} />
        </PaginationItem>
        <PaginationItem
          onClick={(e) => {
            pageNumberClickHandler(e, activePage - 1);
          }}
          hidden={activePage === 1}
        >
          <PaginationLink
            previous
            href={`/profile#purchase_history/${activePage - 1}`}
          />
        </PaginationItem>
        {getPaginationItems()}
        <PaginationItem
          onClick={(e) => {
            pageNumberClickHandler(e, activePage + 1);
          }}
          hidden={activePage === numberOfPages}
        >
          <PaginationLink
            next
            href={`/profile#purchase_history/${activePage + 1}`}
          />
        </PaginationItem>
        <PaginationItem
          onClick={(e) => {
            pageNumberClickHandler(e, numberOfPages);
          }}
          hidden={activePage === numberOfPages}
        >
          <PaginationLink
            last
            href={`/profile#purchase_history/${numberOfPages}`}
          />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default PurchaseHistoryPagination;
