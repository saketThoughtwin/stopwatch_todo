import React, { useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Container,
    IconButton,
    Stack,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Divider,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { removeFromCart, updateQuantity, emptyCart } from "../../features/cart/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { Snackbar, Alert } from "@mui/material";
const CartPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [confirmRemoveId, setConfirmRemoveId] = useState<number | null>(null);
    const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const handleConfirmRemove = (id: number) => {
        setConfirmRemoveId(id);
    };

    const handleRemove = () => {
        if (confirmRemoveId !== null) {
            dispatch(removeFromCart(confirmRemoveId));
            setConfirmRemoveId(null);
        }
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        dispatch(updateQuantity({ id, quantity }));
    };

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                🛒 Your Cart
            </Typography>

            {cartItems.length === 0 ? (
                <Typography>No items in the cart.</Typography>
            ) : (
                <>
                    <Stack spacing={3}>
                        {cartItems.map((item) => (
                            <Paper
                                key={item.id}
                                sx={{
                                    p: 3,
                                    position: "relative",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                }}
                            >
                                {/* Delete Icon */}
                                <IconButton
                                    sx={{ position: "absolute", top: 8, right: 8 }}
                                    onClick={() => handleConfirmRemove(item.id)}
                                >
                                    <DeleteIcon color="error" />
                                </IconButton>

                                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                    <Box
                                        component="img"
                                        src={item.image}
                                        alt={item.title}
                                        sx={{ width: 80, height: 80, objectFit: "contain" }}
                                    />
                                    <Box>
                                        <Typography fontWeight="bold">{item.title}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Price: ${item.price.toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Quantity Selector */}
                                <FormControl size="small" sx={{ width: 120 }}>
                                    <InputLabel>Quantity</InputLabel>
                                    <Select
                                        label="Quantity"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(item.id, Number(e.target.value))
                                        }
                                    >
                                        {[1, 2, 3, 4, 5].map((qty) => (
                                            <MenuItem key={qty} value={qty}>
                                                {qty}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Total for this item */}
                                <Typography fontWeight="medium">
                                    Total: ${(item.price * item.quantity).toFixed(2)}
                                </Typography>
                            </Paper>
                        ))}
                    </Stack>

                    <Divider sx={{ my: 4 }} />

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" fontWeight="bold">
                            🧾 Total Price: ${totalPrice.toFixed(2)}
                        </Typography>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => setShowCheckoutDialog(true)}
                        >
                            Checkout
                        </Button>
                    </Box>
                </>
            )}

            {/* Remove Confirm Dialog */}
            <Dialog
                open={confirmRemoveId !== null}
                onClose={() => setConfirmRemoveId(null)}
            >
                <DialogTitle>Are you sure you want to remove this item?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setConfirmRemoveId(null)}>Cancel</Button>
                    <Button color="error" onClick={handleRemove}>
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Checkout Dialog */}
            <Dialog
                open={showCheckoutDialog}
                onClose={() => setShowCheckoutDialog(false)}
            >
                <DialogTitle>
                    Confirm Checkout? Your total is ${totalPrice.toFixed(2)}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setShowCheckoutDialog(false)}>Cancel</Button>
                    <Button
                        color="primary"
                        onClick={() => {
                            setShowCheckoutDialog(false);
                            dispatch(emptyCart());
                            setToastMsg("✅ Order placed successfully!");
                            setToastOpen(true);
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={toastOpen}
                autoHideDuration={3000}
                onClose={() => setToastOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity="success" variant="filled" onClose={() => setToastOpen(false)}>
                    {toastMsg}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CartPage;
