import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  HeaderNavigation,
  StyledNavigationList,
  StyledNavigationItem,
  ALIGN,
} from "baseui/header-navigation";
import { Avatar } from "baseui/avatar";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { StatefulMenu } from "baseui/menu";
import { Button, KIND } from "baseui/button";
import { ChevronDown } from "baseui/icon";
import { LOGOUT_REQUEST } from "utils/storeConsts";

export const LoginButton = () => {
  return (
    <Button>
      Login
    </Button>
  );
}

export const ProfileButton = ({ user, onLogout }) => {
  const history = useHistory();

  const ITEMS = [
    {
      label: "Todos",
      action: () => {
        history.push("/todos");
      },
    },
    {
      label: "Logout",
      action: () => {
        onLogout();
        window.location.reload();
      },
    },
  ];

  return (
    <StatefulPopover
      focusLock
      placement={PLACEMENT.bottomRight}
      content={({ close }) => (
        <StatefulMenu
          items={ITEMS}
          onItemSelect={({ item }) => {
            item.action();
            close();
          }}
          overrides={{ List: { style: { width: '138px' } } }}
        />
      )}
    >
      <Button
        type="button"
        kind={KIND.minimal}
        endEnhancer={ChevronDown}
        $style={{
          ":hover": {
            backgroundColor: "transparent",
          },
          ":active": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Avatar name={user.username} />
      </Button>
    </StatefulPopover>
  );
}

const HeaderNavBar = ({ user, logout }) => {

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
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          {user ? <ProfileButton user={user} onLogout={logout} /> : <LoginButton />}
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

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({ type: LOGOUT_REQUEST }),
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(HeaderNavBar);