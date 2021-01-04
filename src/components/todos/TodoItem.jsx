import React, { useState, useEffect, useRef, } from "react";
import {
  Checkbox
} from "baseui/checkbox";
import { requestWithToken } from "utils/Request";
import { Input } from "baseui/input";
import { Button, KIND, SHAPE, SIZE } from "baseui/button";
import { Check, ChevronLeft } from "baseui/icon";

const TodoItem = ({ id, completed, text, onUpdate }) => {
  const [textState, setTextState] = useState(text);
  const [completedState, setCompletedState] = useState(completed);
  const inputRef = useRef(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setTextState(text);
    setCompletedState(completed);
  }, [completed, text]);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const doUpdates = ({ text = textState, completed = completedState }) => {
    setTextState(text);
    setCompletedState(completed);
    onUpdate({ id, text, completed });
    requestWithToken("PUT", "/api/todos/items", {
      data: {
        id,
        text,
        completed,
      }
    });
  };

  return (
    <div style={{
      display: "flex",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
    }}>
      <div
        style={{
          paddingRight: "10px",
        }}
      >
        <Checkbox checked={completedState} onChange={(e) => {
          setCompletedState(e.target.checked);
          doUpdates({ completed: e.target.checked });
        }} />
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        {!editing
          ? textState
          : <Input inputRef={inputRef} value={textState} onChange={(e) => setTextState(e.target.value)}/>
        }
      </div>
      <div>
        <Button
          kind={KIND.minimal}
          shape={SHAPE.circle}
          size={SIZE.mini}
          onClick={() => {
            if (editing) {
              doUpdates({});
            }
            setEditing(!editing);
          }}
        >
          {!editing ? <ChevronLeft /> : <Check />}
        </Button>
      </div>
    </div>
  )
}

export default TodoItem;
