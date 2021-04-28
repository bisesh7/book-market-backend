import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";

const products = [
  {
    id: 1,
    bookId: 1,
    name: "Bamity",
    image: (
      <img
        className="purchase-history-table-img"
        src="http://dummyimage.com/250x250.png/cc0000/ffffff"
        alt="bamity"
      />
    ),
    quantity: 1,
    total: 400,
  },
  {
    id: 2,
    bookId: 3,
    name: "Fixflex",
    image: (
      <img
        className="purchase-history-table-img"
        src="http://dummyimage.com/250x250.png/5fa2dd/ffffff"
        alt="fixflex"
      />
    ),
    quantity: 2,
    total: 645,
  },
  {
    id: 3,
    bookId: 6,
    name: "Fix San",
    image: (
      <img
        className="purchase-history-table-img"
        src="http://dummyimage.com/250x250.png/dddddd/000000"
        alt="fixflex"
      />
    ),
    quantity: 8,
    total: 2457,
  },
];

const columns = [
  {
    dataField: "id",
    text: "ID",
    sort: true,
  },
  {
    dataField: "bookId",
    text: "Book ID",
    sort: true,
  },
  {
    dataField: "name",
    text: "Name",
    sort: true,
  },
  {
    dataField: "image",
    text: "Image",
  },
  {
    dataField: "quantity",
    text: "Quantity",
    sort: true,
  },
  {
    dataField: "total",
    text: "Total",
    sort: true,
  },
];

const defaultSorted = [
  {
    dataField: "id",
    order: "asc",
  },
];

const PurchaseHistoryPage = () => {
  return (
    <div className="purchase-history-table shadow">
      <BootstrapTable
        keyField="id"
        data={products}
        columns={columns}
        bootstrap4
        striped
        hover
        condensed
        noDataIndication="Table is Empty"
        defaultSorted={defaultSorted}
      />
    </div>
  );
};

export default PurchaseHistoryPage;
