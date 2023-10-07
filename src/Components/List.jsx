import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './List.css';

export const List = () => {

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const addTodo = () => {
        if (newTodo.length > 0) {
            let newTodos = [...todos, newTodo];
            setNewTodo('');
            setTodos(newTodos);
        }
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') addTodo();
    }

    const onDeleteHandler = (todoString) => {
        let newList = todos.filter((todo) => {
            return todo !== todoString;
        });
        setTodos(newList);
    }

    const onEditHandler = (todoString, newString) => {
        let newList = todos.map((todo) => {
            return todo === todoString ? newString : todo;
        })
        setTodos(newList);
    }

    return (
        <div className='container'>
            <h3>TODO LIST</h3>
            <span>Enter a todo item: </span>
            <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} onKeyDown={(handleEnter)}/>
            <FontAwesomeIcon icon={faPlus} onClick={addTodo} />
            <div className='list-container'>
                {todos.map((todo) => {
                    return <TodoDisplayItem
                                key={todo}
                                todo={todo}
                                onDeleteHandler={onDeleteHandler}
                                onEditHandler= {onEditHandler}
                            />
                })}
            </div>
        </div>
    )
}

const TodoDisplayItem = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [editString, setEditString] = useState('');

    const handleEditClick = () => {
        props.onEditHandler(props.todo, editString);
        setShowEdit(false);
        setEditString('');
    }

    const buttonDisabled = editString.length === 0 || editString === '';

    return (
        <div className='todo-list-item'>
            <button onClick={() => props.onDeleteHandler(props.todo)}>X</button>
            <span className='todo-label'>{props.todo}</span>
            <button onClick={() => setShowEdit(!showEdit)}>{showEdit ? 'CANCEL' : 'EDIT'}</button>
            {showEdit &&
                <>
                    <input value={editString} onChange={(e) => setEditString(e.target.value)} />
                    <button onClick={handleEditClick} disabled={buttonDisabled}>UPDATE</button>
                </>
            }
        </div>
    )
}