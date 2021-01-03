import React, { useState, useEffect, useRef, } from "react";
import { Button } from "baseui/button";
import {
  Checkbox
} from "baseui/checkbox";
import { deleteWithToken, postWithToken, requestWithToken } from "utils/Request";

const TodoItem = ({ id, completed, text, onUpdate }) => {
  const didMount = useRef(false);
  const [textState, setTextState] = useState(text);
  const [completedState, setCompletedState] = useState(completed);

  useEffect(() => {
    setTextState(text);
    setCompletedState(completed);
  }, [completed, text]);

  useEffect(() => {
    if (didMount.current) {
      onUpdate({ id, text: textState, completed: completedState });
      requestWithToken("PUT", "/api/todos/items", {
        data: {
          id,
          text: textState,
          completed: completedState,
        }
      });
    }
    else didMount.current = true;
  }, [textState, completedState]);

  return (
    <div style={{
      display: "flex",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <Checkbox checked={completedState} onChange={(e) => {
        setCompletedState(e.target.checked);
      }} />
      <div>
        {textState}
      </div>
      <Button />
    </div>
  )
}

export default TodoItem;
