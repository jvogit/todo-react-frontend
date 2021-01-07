import React, { useState } from "react";
import { Grid, Cell, } from 'baseui/layout-grid';
import { connect } from "react-redux";
import ProfileItem from "components/profile/ProfileItem";
import { HeadingSmall, } from "baseui/typography";
import TodoList from "components/todos/TodoList";
import { Button, KIND } from "baseui/button";

const Todos = ({ user, error, inProgress }) => {
  const [editing, setEditing] = useState(false);

  if (inProgress || error) {
    return null;
  }

  return (
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
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <HeadingSmall>01-01-2021 TODO</HeadingSmall>
            <Button 
              kind={KIND.minimal}
              onClick={() => setEditing(!editing)}
            >
              Edit
            </Button>
          </div>
          <div>
            <TodoList editing={editing} />
          </div>
        </div>
      </Cell>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    ...(state.auth),
  };
}

export default connect(mapStateToProps)(Todos);
