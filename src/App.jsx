import { useState,useEffect } from 'react'
import {Box,Stack,TextField,Button, Typography} from '@mui/material';
import  { v4 as uuidv4 } from 'uuid';
import Card from './components/Card/Card';
import './App.css'

const pageSize = 3;


function App() {
 const [todoList, setTodoList] = useState([]);
 const [input,setInput] = useState('');
 const [currPage,setCurrPage] = useState(1);
 const totalPages = todoList.length ? Math.ceil(todoList.length/pageSize) : 1;
 const startInx = (currPage-1) *pageSize;
 const endInx = startInx + pageSize;
 const currList = todoList.slice(startInx,endInx);

 const handlePrev = () => {
    if(currPage > 1) {
      setCurrPage((prev)=>  prev-1);
    }
  };

  const handleNext = () => {
    if(currPage < totalPages) {
      setCurrPage((prev)=> prev+1);
    }
  };

 useEffect(() => {
    localStorage.setItem('list', JSON.stringify(todoList));
  },[todoList])


  useEffect(() => {
    const prevTodo = JSON.parse(localStorage.getItem('list'));
    setTodoList(prevTodo);
  },[])

  useEffect(() => {
    if(totalPages < currPage && currPage > 1){
      setCurrPage((prev) => prev - 1);
    }
  },[totalPages,currPage])

  
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
      height: 'max-content',
      p: 2,
      border: '1px solid black',
      borderRadius: 2,  
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

      {todoList.length === 0 ? (
        <Typography 
          variant='h4'
          component={'h4'}
        >
          No ToDo's Add one 
        </Typography>
      ) : (
        currList.length > 0 ? (
        currList.map((item) => (
          <Card item={item} handleDelete={handleDelete} key={item.id}/>
        ))
      ) : null )}

      <Stack
        direction={'row'}
        justifyContent={'space-evenly'}
      >
        <Button
          variant='contained'
          onClick={handlePrev}
        >
          Prev
        </Button>
        <Button
          variant='outlined'
        >
          {currPage}
        </Button>
        <Button
          variant='contained'
          onClick={handleNext}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  </Box>
 )

  
}

export default App
