import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button, Paper, List, ListItem, ListItemText, IconButton, Divider, Checkbox } from "@mui/material";
import { Edit, Delete, CheckBox } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import { addTodo,editTodo,deleteTodo,toggleTodo } from "../../features/todos/todoSlice";
import { useDispatch, useSelector } from "react-redux";
const todolist = () => {
    const todos = useSelector((state: RootState)=>state.todos.todos);
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleAddOrEdit = () => {
        const trimmedInput = input.trim();
        if (!trimmedInput) return;
        if (isEditing && editId !== null) {
            dispatch(editTodo({id:editId, text:trimmedInput}))
            setIsEditing(false);
            setEditId(null);
        } else {
            dispatch(addTodo(trimmedInput));
        }
        setInput('')
    };
    const handleEdit = (id: number) => {
        const todo = todos.find((t)=>t.id ===id)
        if(todo){
            setInput(todo.text);
            setEditId(id);
            setIsEditing(true);
        }
        
      };
    const handleDelete = (id: number) => {
       dispatch(deleteTodo(id));
        if (isEditing && editId === id) {
            setIsEditing(false);
            setEditId(null);
            setInput('');
        }
    };
    const handleToggle = (id: number) => {
        dispatch(toggleTodo(id));
      };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>Todo List</Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <TextField
                        label={isEditing ? "Edit Task" : "Add a new task"}
                        variant="outlined"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" onClick={handleAddOrEdit}
                    > {isEditing ? "Update" : "Add"} </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                {
                    todos.length === 0 ? (
                        <Typography align="center" color="text.secondary">
                            No todos yet
                        </Typography>
                    ) : (
                        <List>
                            {todos.map((todo) => (
                                <ListItem key={todo.id}
                                    secondaryAction={<>
                                        <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}
                                            onClick={() => handleEdit(todo.id)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(todo.id)}>
                                            <Delete /></IconButton></>}>
                                            <Checkbox
                  edge="start"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  tabIndex={-1}
                />
                <ListItemText primary={
                    <span style={{textDecoration:todo.completed?"line-through":"none"}}>
                        {todo.text}
                    </span>
                } />
                                </ListItem>
                            ))}
                        </List>
                    )
                }

                <Button variant="outlined"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => navigate("/stopwatch")}> Go To Stopwatch</Button>

                <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => navigate("/task")}
                >
                Go To Task
                </Button>
                <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => navigate("/dummyapi")}
                >
                Go To API
                </Button>
            </Paper>

        </Container>
    )
}
export default todolist;