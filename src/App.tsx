import React from "react";
import { ThemeProvider, createTheme, CssBaseline, Container, Paper } from "@mui/material";
import TodoList from "./components/todolist/TodoList";
import StopWatch from "./components/stopwatch/StopWatch";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Playground from "./components/playground/Playground";
import Task from "./components/task/Task";
import FetchApi from "./components/fetchapi/FetchApi";
import CartPage from "./components/cartpage/CartPage";
const theme = createTheme({
  palette: {
    mode: "light", // Ensures light background
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
          <Router >
          <Container sx={{ mt: 5 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/stopwatch" element={<StopWatch />} />
              <Route path="/task" element={<Task />} />
              <Route path="/dummyapi" element={<FetchApi />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
         {/* <Playground />
           */}
        </Paper>
      </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
