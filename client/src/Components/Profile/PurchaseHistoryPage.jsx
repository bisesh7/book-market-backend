import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";

const products = [
  {
    id: 1,
    name: "bisesh",
    price: 500,
  },
];
const columns = [
  {
    dataField: "id",
    text: "Product ID",
  },
  {
    dataField: "name",
    text: "Product Name",
  },
  {
    dataField: "price",
    text: "Product Price",
  },
];

const PurchaseHistoryPage = () => {
  return (
    <BootstrapTable
      keyField="id"
      data={products}
      columns={columns}
      bootstrap4={true}
    />
  );
};

export default PurchaseHistoryPage;
