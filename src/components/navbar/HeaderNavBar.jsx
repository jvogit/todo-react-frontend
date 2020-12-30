import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  HeaderNavigation,
  StyledNavigationList,
  StyledNavigationItem,
  ALIGN,
} from "baseui/header-navigation";
import { Button } from "baseui/button";

export const LoginButton = () => {
  return (
    <Button>
      Login
    </Button>
  );
}

export const ProfileButton = () => {

}

export const HeaderNavBar = ({ user }) => {
  return (
    <HeaderNavigation
      $style={{
        paddingTop: "0px",
        paddingBottom: "0px",
        paddingLeft: "12%",
        paddingRight: "12%",
      }}
    >
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>
          <Link to="/" style={{ textDecoration: "inherit", color: "inherit", }}>
            <h1>TODO</h1>
          </Link>
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center}/>
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <LoginButton />
        </StyledNavigationItem>
      </StyledNavigationList>
    </HeaderNavigation>
  )
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(HeaderNavBar);