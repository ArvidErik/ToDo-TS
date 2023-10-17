import React, { useRef } from 'react'
import { Todo } from '../model'
import { BiSolidEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { ifError } from 'assert'

type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoCard = ({todo, todos, setTodos}:Props) => {

  const textRef = useRef<HTMLParagraphElement>(null)
  const cardRef = useRef<HTMLFormElement>(null)


  const removeTodo = () => {

    const newArr = [...todos].filter((t)=>{
        return t.id !== todo.id
    })
    setTodos(newArr)
  }

  const checkTodo = () => {

    if (textRef.current?.classList.contains("underlined")) {
        textRef.current?.classList.remove("underlined")
        cardRef.current?.classList.remove("lighter")
    } else {
        textRef.current?.classList.add("underlined")
        cardRef.current?.classList.add("lighter")
    }
  }


  return (
    <form className='todo-card' ref={cardRef}>
        <p className='todo-card-text' ref={textRef}>{todo.todo}</p>

        <div>
            <span className="icon" id='edit-icon'>
                <BiSolidEdit/>
            </span>
            <span className="icon" id='delete-icon' onClick={removeTodo}>
                <MdDelete/>
            </span>
            <span className="icon" id='check-icon' onClick={checkTodo}>
                <BsFillCheckCircleFill/>
            </span>
        </div>
    </form>
  )
}

export default TodoCard