import { useState,useEffect } from 'react'
import {Box,Stack,TextField,Button, Typography} from '@mui/material';
import  { v4 as uuidv4 } from 'uuid';
import Card from './components/Card/Card';
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

  const handleDelete = (idToDelete) => {
    const newList = todoList.filter((item) => item.id !== idToDelete);
    setTodoList(newList);
  }
 return (
  <Box 
    sx={{
      width: '80%',
      height: '50%',
      p: 2,
      border: '1px solid black',
    }}>

    <Typography variant='h2' component={'h2'}>
      ToDo List
    </Typography>
    <Stack>
      <TextField
        placeholder= 'add item...'
        multiline
        autoFocus
        type='text'
        value={input}
        onChange= {(e) => setInput(e.target.value)}
        required
        sx={{
            width: '100%',
            mb: 2
        }}
      />
      <Button
        variant='contained'
        onClick={handleAdd}
        disabled={input.trim() === ''}
        sx={{
          width: '70px',
          mb: 2,
        }}
      >
        Add
      </Button>

      {todoList.length > 0 ? (
        todoList.map((item) => (
          <Card item={item} handleDelete={handleDelete}/>
        ))
      ) : (
        <Typography variant='h2' component={'h2'}>
          All Items Completed !!
        </Typography>
      )}
    </Stack>
  </Box>
 )

  
}

export default App
