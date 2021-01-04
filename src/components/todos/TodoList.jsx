import React, { useState, useEffect, } from "react";
import { arrayMove, arrayRemove, List } from "baseui/dnd-list";
import { deleteWithToken, getWithToken, requestWithToken } from "utils/Request";
import { HeadingSmall } from "baseui/typography";
import { Spinner } from "baseui/spinner";
import TodoItem from "./TodoItem";

const TodoList = ({ date = "2021-01-01" }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ date, items: [] });
  
  useEffect(() => {
    getWithToken("/api/todos", {
      date,
    })
      .then(res => {
        setData(res.data)
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const mapToComponent = (items) => {
    return items.map((item, index) => {
      return <TodoItem {...item} onUpdate={({ text, completed }) => {
        setData(prev_data => {
          let items = prev_data.items;
          items[index].text = text;
          items[index].completed = completed;

          return {
            ...prev_data,
            items,
          }
        })
      }} />
    })
  }

  const moveAndUpdate = (items, old_index, new_index) => {
    requestWithToken(new_index === -1 ? "DELETE" : "PUT", "/api/todos/items", {
      data: {
        ...items[old_index],
        index: new_index,
      }
    });
    let new_array = new_index === -1
      ? arrayRemove(items, old_index, new_index)
      : arrayMove(items, old_index, new_index);

    return new_array.map((item, index) => ({ ...item, index }));
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
      items={mapToComponent(data.items)}
      removable
      onChange={({ oldIndex, newIndex }) => {
        console.log(oldIndex + " " + newIndex);
        setData({
          ...data,
          items: moveAndUpdate(data.items, oldIndex, newIndex),
        });
      }}
    />
  )
}

export default TodoList;
