import React, { useEffect, useState } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import { getNPRFromDollar } from "../../utils/getNPRFromDollar";
import { getPurchasedBooks } from "../../config/authAPI";
import { connect } from "react-redux";
import { getFormattedDate } from "../../utils/getFormattedDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { setBooks } from "../../Actions/actionBook";
// import paginationFactory from "react-bootstrap-table2-paginator";

const imageFormatter = (cell, row) => {
  return <img className="purchase-history-table-img" src={cell} alt={cell} />;
};

const priceFormatter = (cell, row) => {
  return <span>{getNPRFromDollar(cell.substring(1, cell.length))}</span>;
};

const dateFormatter = (cell) => {
  return <span>{getFormattedDate(cell)}</span>;
};

const columns = [
  {
    dataField: "SN",
    text: "S.N.",
    sort: true,
    classes: "purchase-history-id",
  },
  {
    dataField: "date",
    text: "Purchase date",
    sort: true,
    formatter: dateFormatter,
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
    dataField: "subTotalAmount",
    text: "Sub Total",
    sort: true,
    formatter: priceFormatter,
  },
  {
    dataField: "discount",
    text: "Discount",
    sort: true,
    formatter: priceFormatter,
  },
  {
    dataField: "usedCoupon",
    text: "Used Coupon",
    sort: true,
  },
  {
    dataField: "totalAmount",
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

  const [loading, setLoading] = useState(false);

  //If user refreshes the page we set the books
  useEffect(() => {
    props.setBooks((value) => {
      setLoading(value);
    });
    // eslint-disable-next-line
  }, [props.setBooks]);

  // const paginationOptions = {
  //   pageStartIndex: 0,
  //   sizePerPage: 5,
  //   hideSizePerPage: true,
  //   hidePageListOnlyOnePage: true,
  //   paginationSize: 3,
  //   firstPageText: "First",
  //   prePageText: "Back",
  //   nextPageText: "Next",
  //   lastPageText: "Last",
  //   disablePageTitle: true,
  //   showTotal: true,
  //   paginationTotalRenderer: customTotal,
  // };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    getPurchasedBooks(props.user.user._id)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          let products = [];
          let count = 1;
          for (let i = 0; i < res.data.booksPurchased.length; i++) {
            const bookPurchased = res.data.booksPurchased[i];
            for (let j = 0; j < bookPurchased.purchasedBooks.length; j++) {
              const purchasedBook = bookPurchased.purchasedBooks[j];

              const book = props.books.books.find(
                (book) => book.id === purchasedBook.bookId
              );

              products.push({
                _id: bookPurchased._id,
                SN: count,
                date: bookPurchased.date,
                subTotalAmount: "$" + bookPurchased.subTotalAmount.toString(),
                discount: "$" + bookPurchased.discount.toString(),
                totalAmount: "$" + bookPurchased.totalAmount.toString(),
                usedCoupon: bookPurchased.usedCoupon,
                bookId: purchasedBook.bookId,
                quantity: purchasedBook.quantity,
                name: book["name "],
                image: book.image,
              });
              count++;
            }
          }
          setProducts(products);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [props.books, props.user]);

  return (
    <div className="purchase-history-table-container">
      <BootstrapTable
        classes="purchase-history-table shadow mt-2"
        keyField="id"
        data={products}
        columns={columns}
        defaultSorted={defaultSorted}
        bootstrap4
        noDataIndication={
          loading ? (
            <span>
              <FontAwesomeIcon icon={faSpinner} spin />
            </span>
          ) : (
            "No purchase history available."
          )
        }
        // pagination={paginationFactory()}
        {...props.baseProps}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  books: state.books,
});

export default connect(mapStateToProps, { setBooks })(PurchaseHistoryPage);
