import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  ColumnToggle,
  Search,
} from "react-bootstrap-table2-toolkit";
import { Col, Row } from "reactstrap";

function priceFormatter(cell, row) {
  return <span>NPR {cell}</span>;
}

function footerPriceFormatter(column, colIndex, { text }) {
  return <span>NPR {text}</span>;
}

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
    // footer: "",
  },
  {
    dataField: "bookId",
    text: "Book ID",
    sort: true,
    // footer: "",
  },
  {
    dataField: "name",
    text: "Name",
    sort: true,
    // footer: "",
  },
  {
    dataField: "image",
    text: "Image",
    // footer: "",
  },
  {
    dataField: "quantity",
    text: "Quantity",
    sort: true,
    // footer: "",
  },
  {
    dataField: "total",
    text: "Total",
    sort: true,
    // formatter: priceFormatter,
    // footer: (columnData) => columnData.reduce((acc, item) => acc + item, 0),
    // footerFormatter: footerPriceFormatter,
  },
];

const defaultSorted = [
  {
    dataField: "id",
    order: "asc",
  },
];

const PurchaseHistoryPage = () => {
  const { ToggleList } = ColumnToggle;
  const { SearchBar, ClearSearchButton } = Search;

  return (
    <div className="purchase-history-table-container">
      <ToolkitProvider
        keyField="id"
        data={products}
        columns={columns}
        columnToggle
        defaultSorted={defaultSorted}
        search
        bootstrap4
        striped
        hover
        condensed
        noDataIndication="Table is Empty"
      >
        {(props) => (
          <div>
            <Row>
              <Col>
                <ToggleList {...props.columnToggleProps} /> <br />
              </Col>
              <Col>
                <div className="purchase-history-filter float-right">
                  <SearchBar {...props.searchProps} />
                  <ClearSearchButton
                    {...props.searchProps}
                    className="clear-search-button ml-3"
                  />
                </div>
              </Col>
            </Row>

            <BootstrapTable
              classes="purchase-history-table shadow"
              {...props.baseProps}
            />
          </div>
        )}
      </ToolkitProvider>
    </div>
  );
};

export default PurchaseHistoryPage;
