import CenterLayout from "components/layouts/CenterLayout";
import React, { useEffect, useState } from "react";
import { Grid, Cell, ALIGNMENT } from 'baseui/layout-grid';
import { ListItem, ListItemLabel } from "baseui/list";
import { connect } from "react-redux";
import ProfileItem from "components/profile/ProfileItem";
import { getWithToken } from "utils/Request";
import { H1 } from "baseui/typography";
import { Button } from "baseui/button";
import {
  Checkbox,
  LABEL_PLACEMENT
} from "baseui/checkbox";

const TodoList = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    getWithToken("/api/todos", {
      date: new Date().toLocaleDateString("en-CA"),
    })
    .then(response => {
      console.log(response);
      setData(response);
    })
  }, []);

  return (
    <ul
      style={{ padding: "0" }}
    >
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </ul>
  )
}

const TodoItem = ({  }) => {
  return (
    <ListItem>
        <div style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <Checkbox />
          <div>
            Test
          </div>
          <Button />
        </div>
    </ListItem>
  )
}

const Todos = ({ user, error, inProgress }) => {

  if ( inProgress || error ) {
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
              alignSelf: "center",
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