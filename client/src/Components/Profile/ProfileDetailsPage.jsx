import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import { getFormattedDate } from "../../utils/getFormattedDate";

const ProfileDetailsPage = (props) => {
  const user = props.user ? props.user.user : null;

  const [leftSpace] = useState(3);
  const [rightSpace] = useState(12 - leftSpace);

  useEffect(() => {
    props.setPageTitle("Profile | Book-Market");
    // eslint-disable-next-line
  }, [props.setPageTitle]);

  return (
    <Fragment>
      <div className="shadow profile-detail">
        <Row>
          <Col md={leftSpace}>ID</Col>
          <Col md={rightSpace}>{user._id}</Col>
        </Row>
        <hr />
        <Row>
          <Col md={leftSpace}>Email</Col>
          <Col md={rightSpace}>{user.email}</Col>
        </Row>
        <hr />
        <Row>
          <Col md={leftSpace}>Phone Number</Col>
          <Col md={rightSpace}>{user.phoneNumber}</Col>
        </Row>
        <hr />
        <Row>
          <Col md={leftSpace}>Joined</Col>
          <Col md={rightSpace}>{getFormattedDate(user.registerDate)}</Col>
        </Row>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(ProfileDetailsPage);
