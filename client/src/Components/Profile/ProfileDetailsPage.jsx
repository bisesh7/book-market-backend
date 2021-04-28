import React, { useState } from "react";
import { Col, Row } from "reactstrap";

const ProfileDetailsPage = () => {
  const [leftSpace] = useState(3);
  const [rightSpace] = useState(12 - leftSpace);

  return (
    <div className="shadow profile-detail">
      <Row>
        <Col md={leftSpace}>ID</Col>
        <Col md={rightSpace}>608646c859656e249ff5e8a0</Col>
      </Row>
      <hr />
      <Row>
        <Col md={leftSpace}>Email</Col>
        <Col md={rightSpace}>bisesh.shakya@gmail.com</Col>
      </Row>
      <hr />
      <Row>
        <Col md={leftSpace}>Phone Number</Col>
        <Col md={rightSpace}>9887055069</Col>
      </Row>
    </div>
  );
};

export default ProfileDetailsPage;
