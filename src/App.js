import TodoList from "./components/TodoList";
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { useCallback, useState } from 'react';
import { v4 } from 'uuid';


function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState([]);

  const onTextInputChange = useCallback((e) =>{
    setTextInput(e.target.value);
  }, [])

  const onAddBtnClick = useCallback((e) =>{
    setTodoList ([...todoList, {id : v4(), name: textInput, isCompleted: false}]);

    setTextInput("");
  }, [textInput, todoList]);

  const onCheckBtnClick = useCallback ((id) =>{
    setTodoList(prevState => prevState.map(todo => todo.id === id ? { ...todo, isCompleted:true} : todo))
  });

  return (
    <>
      <h3>Todo need todo</h3>
      <Textfield name="add-todo" placeholder="them viec.." 
      elemAfterInput={<Button isDisabled={!textInput} 
      appearance="primary" onClick={onAddBtnClick}>Add</Button>} value={textInput} onChange={onTextInputChange}
      
      >
      </Textfield>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} />
    </>
  );
}

export default App;
