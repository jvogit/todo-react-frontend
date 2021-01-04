import React, { useState, useEffect, } from "react";
import { arrayMove, arrayRemove, List } from "baseui/dnd-list";
import { getWithToken, postWithToken, requestWithToken } from "utils/Request";
import { HeadingSmall } from "baseui/typography";
import { StyledSpinnerNext as Spinner } from "baseui/spinner";
import TodoItem from "./TodoItem";
import { Button, KIND } from "baseui/button";
import { Plus } from "baseui/icon";

const TodoList = ({ date = "2021-01-01" }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getWithToken("/api/todo", {
      date,
    })
      .then(res => {
        setItems(mapToComponent(res.data.items));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [date]);

  const mapToComponent = (items) => {
    return items.map((item) => {
      return <TodoItem {...item} />
    })
  }

  const addItem = () => {
    postWithToken("/api/todo/item", {
      date,
      text: "Add a TODO",
      completed: false,
    })
    .then(res => {
      setItems(prev => [...prev, <TodoItem {...res.data} />]);
    });
  }

  const moveAndUpdate = (items, old_index, new_index) => {
    let id = items[old_index].props.id;
    requestWithToken(
      new_index === -1
        ? "DELETE"
        : "PUT",
      `/api/todo/item/${id}/index`,
      {
        data: {
          index: new_index,
        }
      });

    let new_array = new_index === -1
      ? arrayRemove(items, old_index, new_index)
      : arrayMove(items, old_index, new_index);

    return new_array;
  }

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

  return (
    <React.Fragment>
      <List
        items={items}
        removable
        onChange={({ oldIndex, newIndex }) => {
          setItems(moveAndUpdate(items, oldIndex, newIndex));
        }}
      />
      <Button 
        $style={{
          width: "100%",
        }}
        kind={KIND.minimal}
        onClick={addItem}
      >
        <Plus /> {"Add an item"}
      </Button>
    </React.Fragment>
  )
}

export default TodoList;
