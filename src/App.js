import TodoList from "./components/TodoList";
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { useCallback, useEffect, useState } from 'react';
import { v4 } from 'uuid';

const TODO_APP_STORAGE_KEY = 'TODO_APP';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  useEffect(() =>{
    const storageTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if(storageTodoList){
      setTodoList(JSON.parse(storageTodoList));
    }
  }, [])

  useEffect(() =>{
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList))
  }, [todoList])

  const onTextInputChange = useCallback((e) =>{
    setTextInput(e.target.value);
  }, [])

  const onAddBtnClick = useCallback((e) =>{
    setTodoList ([
      {id : v4(), name: textInput, isCompleted: false},
      ...todoList, 
    
    ]);

    setTextInput("");
  }, [textInput, todoList]);

  const onCheckBtnClick = useCallback ((id) =>{
    setTodoList(prevState => prevState.map(todo => todo.id === id ? { ...todo, isCompleted:true} : todo))
  });

  return (
    <>
      <h3>Todo </h3>
      <Textfield name="add-todo" placeholder="Add todo.." 
      elemAfterInput={<Button isDisabled={!textInput} 
      appearance="primary" onClick={onAddBtnClick}>Add</Button>} value={textInput} onChange={onTextInputChange}
      
      >
      </Textfield>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} />
    </>
  );
}

export default App;
