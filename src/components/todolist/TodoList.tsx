import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button, Paper, List, ListItem, ListItemText, IconButton, Divider } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const todolist = () => {
    const [todos, setTodos] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const navigate = useNavigate();
    const handleAddTodo = () => {
        const trimmedInput = input.trim();
        if (!trimmedInput) return;
        if (isEditing && editIndex !== null) {
            const updatedTodos = [...todos];
            updatedTodos[editIndex] = trimmedInput;
            setTodos(updatedTodos);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            setTodos([...todos, trimmedInput]);
        }
        setInput('')
    };
    const handleDelete = (index: number) => {
        const filteredData = todos.filter((_, i) => i !== index);
        setTodos(filteredData);
        if (isEditing && editIndex === index) {
            setIsEditing(false);
            setInput('');
        }
    };
    const handleEdit = (index: number) => {
        setInput(todos[index]);
        setEditIndex(index);
        setIsEditing(true);
    }

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
                    <Button variant="contained" color="primary" onClick={handleAddTodo}
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
                            {todos.map((todo, index) => (
                                <ListItem key={index}
                                    secondaryAction={<>
                                        <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}
                                            onClick={() => handleEdit(index)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                                            <Delete /></IconButton></>}>
                                    <ListItemText primary={todo} />
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
            </Paper>

        </Container>
    )
}
export default todolist;