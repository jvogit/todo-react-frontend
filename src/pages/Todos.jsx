import CenterLayout from "components/layouts/CenterLayout";
import React from "react";
import { Grid, Cell, } from 'baseui/layout-grid';
import { connect } from "react-redux";
import ProfileItem from "components/profile/ProfileItem";
import { H1, } from "baseui/typography";
import TodoList from "components/todos/TodoList";

const Todos = ({ user, error, inProgress }) => {

  if (inProgress || error) {
    return null;
  }

  return (
    <CenterLayout>
      <Grid>
        <Cell span={[4, 8, 4]}>
          <ProfileItem user={user} />
        </Cell>
        <Cell span={[4, 8, 8]}>
          <div style={{
            marginTop: "20px",
            width: "100%",
          }}>
            <div style={{
              textAlign: "center",
            }}>
              <H1>Todos</H1>
            </div>
            <div>
              <TodoList />
            </div>
          </div>
        </Cell>
      </Grid>
    </CenterLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    ...(state.auth),
  };
}

export default connect(mapStateToProps)(Todos);
