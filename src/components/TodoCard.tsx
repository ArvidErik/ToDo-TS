import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoCard = ({ index, todo, todos, setTodos }: Props) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  const removeTodo = () => {
    const newArr = [...todos].filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(newArr);
  };

  const checkTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todo-card ${snapshot.isDragging&&"drag"}`}
          ref={provided.innerRef}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todo-card-input"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <p className="todo-card-text underlined" ref={textRef}>
              {todo.todo}
            </p>
          ) : (
            <p className="todo-card-text" ref={textRef}>
              {todo.todo}
            </p>
          )}

          <div>
            <span
              className="icon"
              id="edit-icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <BiSolidEdit />
            </span>
            <span className="icon" id="delete-icon" onClick={removeTodo}>
              <MdDelete />
            </span>
            <span
              className="icon"
              id="check-icon"
              onClick={() => checkTodo(todo.id)}
            >
              <BsFillCheckCircleFill />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoCard;
