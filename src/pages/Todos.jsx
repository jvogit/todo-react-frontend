import CenterLayout from "components/layouts/CenterLayout";
import React, { useEffect, useState } from "react";
import { Grid, Cell, ALIGNMENT } from 'baseui/layout-grid';
import { connect } from "react-redux";
import ProfileItem from "components/profile/ProfileItem";
import { getWithToken } from "utils/Request";

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
}

const TodoItem = ({  }) => {

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
        <Cell span={[4, 8, 4]}>
          <div style={{
            width: "100%",
          }}>
            Yes
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