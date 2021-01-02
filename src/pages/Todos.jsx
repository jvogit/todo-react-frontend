import CenterLayout from "components/layouts/CenterLayout";
import React, { useEffect, useRef, useState } from "react";
import { Grid, Cell, ALIGNMENT } from 'baseui/layout-grid';
import { ListItem, ListItemLabel } from "baseui/list";
import { arrayMove, arrayRemove, List } from "baseui/dnd-list";
import { connect } from "react-redux";
import ProfileItem from "components/profile/ProfileItem";
import { getWithToken, postWithToken } from "utils/Request";
import { H1, HeadingSmall } from "baseui/typography";
import { Button } from "baseui/button";
import {
  Checkbox,
  LABEL_PLACEMENT
} from "baseui/checkbox";
import { Spinner } from "baseui/spinner";

const TodoList = ({ date = "2021-01-02" }) => {
  const didMount = useRef(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ date, items: []});

  useEffect(() => {
    getWithToken("/api/todos", {
      date,
    })
    .then(res => {
      let new_data = {
        ...res.data,
        items: res.data.items ? res.data.items.map((item) => <TodoItem {...item} />) : [],
      };
      setData(new_data);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    } else if (!loading) {
      postWithToken("/api/todos", {
        date,
        items: data.items.map(item => item.props),
      })
    }
  }, [data]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{
          paddingRight: "20px",
        }}
        >
          <Spinner />
        </div>
        <HeadingSmall>Loading</HeadingSmall>
      </div>
    )
  }

  if (!Array.isArray(data.items) || !data.items.length) {
    return (
      <div
        style={{
          textAlign: "center",
        }}
      >
        <HeadingSmall>No results</HeadingSmall>
      </div>
    );
  }

  return (
    <List
      items={data.items}
      removable
      onChange={({ oldIndex, newIndex }) => {
        setData({
          ...data,
          items: newIndex == -1 
            ? arrayRemove(data.items, oldIndex) 
            : arrayMove(data.items, oldIndex, newIndex),
        });
      }}
    />
  )
}

const TodoItem = ({ completed, text, onChange }) => {
  const [textState, setText] = useState(text);
  const [completedState, setCompleted] = useState(completed);

  return (
    <div style={{
      display: "flex",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <Checkbox checked={completed} onChange={onChange} />
      <div>
        {text}
      </div>
      <Button />
    </div>
  )
}

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