import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import NavbarComponent from "../NavbarComponent";
import ProfileDetailsPage from "./ProfileDetailsPage";
import ProfileTabsComponent from "./ProfileTabsComponent";
import PurchaseHistoryPage from "./PurchaseHistoryPage";
import { Helmet } from "react-helmet";
import axios from "axios";
import { connect } from "react-redux";
import UnauthorizedPageComponent from "../ErrorPages/UnauthorizedPageComponent";

const ProfileComponent = (props) => {
  // To know which tab user needs
  const [hash, setHash] = useState(props.location.hash);

  // To change the tab
  useEffect(() => {
    setHash(props.location.hash);
  }, [props.location.hash]);

  // Page title differs according to the tabs
  const [pageTitle, setPageTitle] = useState("Book-Market | Task");

  // Profile is protected route
  const user = props.user ? props.user.user : null;
  // If user refreshed the page, we need to know if session exists or not
  const [showProfile, setShowProfile] = useState(false);
  // This is for ux purpose. We redirect if session do not exist after 5 secs.
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // When user refreshes the page, store will be defaulted
    // Even though user session is checked in the navbar, it is in the child component
    // So we check here if user is null, while we are checking the session, we show an spinner.
    // If no session exists, we redirect to home
    if (!user) {
      axios
        .get("/api/user", {
          headers: {
            authorization: process.env.REACT_APP_API_KEY,
          },
        })
        .then((res) => {
          // Response given only if session exist i.e tokens are valid
          setShowProfile(true);
        })
        .catch((err) => {
          // If error then we redirect
          setShowProfile(false);
          setRedirect(true);
        });
    } else {
      // If page is not refreshed user exists.
      setShowProfile(true);
    }
  }, [user, showProfile]);

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <NavbarComponent {...props} />
      {showProfile ? (
        <Container fluid={true} className="mt-3">
          <Row>
            <Col md="3">
              <ProfileTabsComponent hash={hash} setHash={setHash} {...props} />
            </Col>
            <Col md="9">
              {hash === "#details" ? (
                <ProfileDetailsPage {...props} setPageTitle={setPageTitle} />
              ) : hash === "#purchase_history" ? (
                <PurchaseHistoryPage setPageTitle={setPageTitle} />
              ) : (
                <PurchaseHistoryPage setPageTitle={setPageTitle} />
              )}
            </Col>
          </Row>
        </Container>
      ) : (
        <UnauthorizedPageComponent {...props} redirect={redirect} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProfileComponent);
