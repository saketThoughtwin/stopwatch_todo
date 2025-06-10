import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Grid,
  IconButton,
  Badge,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchDummyData } from "../../features/dummyApi/dummyApi";
import { addToCart, removeFromCart } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const FetchApi = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { data, loading, error } = useSelector((state: RootState) => state.dummy);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [expandedDescriptions, setExpandedDescriptions] = useState<number[]>([]);

  useEffect(() => {
    dispatch(fetchDummyData());
  }, [dispatch]);

  const handleAddToCart = (product: any) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: 1,
      })
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const toggleDescription = (id: number) => {
    setExpandedDescriptions((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton color="primary" onClick={() => navigate("/cart")}>
            <Badge badgeContent={totalQuantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            🛒 Product List from FakeStore API
          </Typography>

          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {!loading && !error && Array.isArray(data) && (
            <Grid container spacing={4} mt={2}>
              {data.map((product) => {
                const isInCart = cartItems.some((item) => item.id === product.id);
                const isExpanded = expandedDescriptions.includes(product.id);

                return (
                  <Grid size={6} key={product.id}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        bgcolor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        height: "100%",
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        🛍️ {product.title}
                      </Typography>

                      <Box
                        component="img"
                        src={product.image}
                        alt={product.title}
                        sx={{
                          width: 120,
                          height: "auto",
                          borderRadius: 1,
                          objectFit: "contain",
                        }}
                      />

                      <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: isExpanded ? "none" : 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {product.description}
                      </Typography>

                      <Button
                        size="small"
                        onClick={() => toggleDescription(product.id)}
                        sx={{ textTransform: "none", alignSelf: "flex-start", pl: 0 }}
                      >
                        {isExpanded ? "See less" : "See more"}
                      </Button>

                      <Typography
                        variant="h6"
                        sx={{ color: "green", fontWeight: "bold", mt: 1 }}
                      >
                        💵 ${product.price.toFixed(2)}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        ⭐ Rating: {product.rating.rate} ({product.rating.count} reviews)
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        🏷️ Category: {product.category}
                      </Typography>

                      <Button
                        variant={isInCart ? "outlined" : "contained"}
                        color={isInCart ? "error" : "primary"}
                        onClick={() =>
                          isInCart
                            ? handleRemoveFromCart(product.id)
                            : handleAddToCart(product)
                        }
                      >
                        {isInCart ? "Remove from Cart" : "Add to Cart"}
                      </Button>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default FetchApi;
