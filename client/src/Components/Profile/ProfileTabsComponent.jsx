import React, { useEffect } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import defaultProfilePicture from "../../statics/images/default-profile.png";

function ProfileTabsComponent(props) {
  const detailsClickHandler = (e) => {
    e.preventDefault();
    props.history.push("/profile#details");
  };

  const purchaseHistoryClickHandler = (e) => {
    e.preventDefault();
    props.history.push("/profile#purchase_history");
  };

  useEffect(() => {
    props.setHash(props.location.hash);
    //eslint-disable-next-line
  }, [props.location.hash]);

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-center">
        <img
          src={defaultProfilePicture}
          className="profile-picture"
          alt="Default-Profile-Pic"
        />
      </div>
      <div className="profile-tabs-links mx-auto mt-4">
        <Nav pills className="flex-column">
          <NavItem>
            <NavLink
              href="#"
              onClick={detailsClickHandler}
              active={props.hash === "#details" || props.hash === ""}
              className="profile-tab"
            >
              Details
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#"
              onClick={purchaseHistoryClickHandler}
              active={props.hash === "#purchase_history"}
              className="profile-tab"
            >
              Purchase History
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
}

export default ProfileTabsComponent;
