import { useState,useEffect } from 'react'
import {Box,Stack,TextField,Button} from '@mui/material';
import  { v4 as uuidv4 } from 'uuid';

import './App.css'

function App() {
 const [todoList, setTodoList] = useState([]);
 const [input,setInput] = useState('');

 useEffect(() => {
    localStorage.setItem('list', JSON.stringify(todoList));
  },[todoList])


  useEffect(() => {
    const prevTodo = JSON.parse(localStorage.getItem('list'));
    setTodoList(prevTodo);
  },[])


  const handleAdd = () =>{
    if(input.trim() !== ''){
      const newItem = {
        title: input.trim(),
        id: uuidv4(),
      };

      setTodoList([...todoList,newItem]);
      setInput('');
    }
  };

 return (
  <Box>
    <Stack>
      <TextField
        placeholder= 'add item...'
        multiline
        type='text'
        value={input}
        onChange= {(e) => setInput(e.target.value)}
        required
        sx={{
            width: 500,
            mb: 2
        }}
      />
      <Button
        variant='contained'
        onClick={handleAdd}
        sx={{
          width: '70px'
        }}
      >
        Add
      </Button>
    </Stack>
  </Box>
 )

  
}

export default App
