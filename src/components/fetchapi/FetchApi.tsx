import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchDummyData } from "../../features/dummyApi/dummyApi";

const FetchApi = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.dummy);

  useEffect(() => {
    dispatch(fetchDummyData());
  }, [dispatch]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", py: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Dummy Post Data
          </Typography>

          {loading && (
            <Typography align="center" sx={{ mt: 3 }}>
              <CircularProgress />
            </Typography>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {!loading && !error && Array.isArray(data) && (
            <List>
              {data.map((post) => (
                <ListItem
                  key={post.id}
                  alignItems="flex-start"
                  sx={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    mb: 3,
                    borderBottom: "1px solid #ddd",
                    pb: 2,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    📌 {post.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    📝 {post.body}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    🧑 User ID: {post.userId} | 🆔 Post ID: {post.id}
                  </Typography>
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default FetchApi;
