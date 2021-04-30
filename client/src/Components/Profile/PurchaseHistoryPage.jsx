import React, { useEffect } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  ColumnToggle,
  Search,
} from "react-bootstrap-table2-toolkit";
import { Col, Row } from "reactstrap";
import products from "../../data/products.json";
import paginationFactory from "react-bootstrap-table2-paginator";
import { getNPRFromDollar } from "../../utils/getNPRFromDollar";

const imageFormatter = (cell, row) => {
  return <img className="purchase-history-table-img" src={cell} alt={cell} />;
};

const priceFormatter = (cell, row) => {
  return <span>{getNPRFromDollar(cell.substring(1, cell.length))}</span>;
};

const columns = [
  {
    dataField: "id",
    text: "ID",
    sort: true,
    classes: "purchase-history-id",
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
    formatter: imageFormatter,
    classes: "purchase-history-image-column",
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
    formatter: priceFormatter,
  },
];

const defaultSorted = [
  {
    dataField: "id",
    order: "asc",
  },
];

const PurchaseHistoryPage = (props) => {
  useEffect(() => {
    props.setPageTitle("Purchase History | Book-Market");
    // eslint-disable-next-line
  }, [props.setPageTitle]);

  const { ToggleList } = ColumnToggle;
  const { SearchBar, ClearSearchButton } = Search;

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );

  const paginationOptions = {
    // pageStartIndex: 0,
    sizePerPage: 5,
    hideSizePerPage: true,
    // hidePageListOnlyOnePage: true,
    paginationSize: 3,
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    disablePageTitle: true,
    showTotal: true,
    paginationTotalRenderer: customTotal,
  };

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
                <ToggleList
                  className="btn-group-sm"
                  {...props.columnToggleProps}
                />{" "}
                <br />
              </Col>
              <Col>
                <div className="purchase-history-filter float-right">
                  <SearchBar
                    className="form-control-sm"
                    {...props.searchProps}
                  />
                  <ClearSearchButton
                    {...props.searchProps}
                    className="clear-search-button ml-3 btn-sm"
                  />
                </div>
              </Col>
            </Row>

            <BootstrapTable
              classes="purchase-history-table shadow mt-2"
              pagination={paginationFactory(paginationOptions)}
              {...props.baseProps}
            />
          </div>
        )}
      </ToolkitProvider>
    </div>
  );
};

export default PurchaseHistoryPage;
