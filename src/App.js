import React, { useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Box, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, id: Date.now() }]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
    setNewTodo(todo.text);
  };

  const handleUpdateTodo = () => {
    setTodos(todos.map(todo => todo.id === currentTodo.id ? { ...todo, text: newTodo } : todo));
    setNewTodo('');
    setIsEditing(false);
  };

  return (
    <Container className='container' maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        To-Do List
      </Typography>
      
      {/* Input and button container */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 2 }}>
        <TextField
          label="New Task"
          variant="outlined"
          fullWidth
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button
          variant="contained"
          color={isEditing ? 'warning' : 'primary'}
          onClick={isEditing ? handleUpdateTodo : handleAddTodo}
          size="large"
          sx={{ height: '50px' }} // Making the button larger for better visibility
        >
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </Box>

      {/* To-Do List */}
      <List sx={{ marginTop: 4 }}>
        {todos.map((todo, index) => (
          <React.Fragment key={todo.id}>
            <ListItem 
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }} // Ensures proper spacing and alignment
            >
              <ListItemText 
                primary={todo.text} 
                sx={{ 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  whiteSpace: 'nowrap',
                  maxWidth: '70%', // Adjust this width to fit your design
                }} 
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}> {/* Ensure icons are in a flex container */}
                <IconButton 
                  edge="end" 
                  onClick={() => handleEditTodo(todo)} 
                  sx={{ color: 'blue', '&:hover': { color: 'darkblue' }, marginRight: 0.5 }} // Added margin to create space
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  edge="end" 
                  onClick={() => handleDeleteTodo(todo.id)} 
                  sx={{ color: 'red', '&:hover': { color: 'darkred' } }} // Hover effect for Delete icon
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
            {/* Add a Divider after each item except the last one */}
            {index < todos.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default App;
