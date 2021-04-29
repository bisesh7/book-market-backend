import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import NavbarComponent from "../NavbarComponent";
import ProfileDetailsPage from "./ProfileDetailsPage";
import ProfileTabsComponent from "./ProfileTabsComponent";
import PurchaseHistoryPage from "./PurchaseHistoryPage";

const ProfileComponent = (props) => {
  const [hash, setHash] = useState(props.location.hash);

  useEffect(() => {
    setHash(props.location.hash);
  }, [props.location.hash]);

  return (
    <div>
      <NavbarComponent {...props} />
      <Container fluid={true} className="mt-3">
        <Row>
          <Col md="3">
            <ProfileTabsComponent hash={hash} setHash={setHash} {...props} />
          </Col>
          <Col md="9">
            {hash === "#details" ? (
              <ProfileDetailsPage {...props} />
            ) : hash === "#purchase_history" ? (
              <PurchaseHistoryPage />
            ) : (
              <ProfileDetailsPage />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileComponent;
