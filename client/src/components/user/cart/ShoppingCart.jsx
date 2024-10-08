import React, { useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { PlusIcon, MinusIcon, XMarkIcon, FaceFrownIcon } from "@heroicons/react/24/solid";
import useCart from '../../../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
    const {
        cartItems,
        isInitialLoading,
        isUpdating,
        fetchCartItems,
        updateCartItem,
        removeFromCart,
    } = useCart();

    const navigate = useNavigate();
    console.log(cartItems, 'cartItems from shopping cart');

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleQuantityChange = async (itemId, change) => {
        const status = change > 0 ? 'inc' : 'dec';
        await updateCartItem(itemId, status);
    };

    const handleRemoveItem = async (itemId) => {
        await removeFromCart(itemId);
    };

    const handleCheckout = () => {
        navigate('/user/checkout');
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const baseShipping = 50;
    const shipping = subtotal > 1000 ? 0 : baseShipping;
    const total = subtotal + shipping;

    if (isInitialLoading) {
        return <Typography>Loading cart items...</Typography>;
    }

    return (
        <div className={`container mx-auto px-4 ${cartItems.length > 0 ? 'py-16' : ''}`}>
            <div className="flex flex-col lg:flex-row gap-8">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col h-screen items-center justify-center w-full">
                        <FaceFrownIcon className="h-16 w-16 text-yellow-800 mb-4" />
                        <Typography variant="h5" className="text-center mb-2">
                            Your cart looks a bit empty...
                        </Typography>
                        <Typography variant="paragraph" className="text-center text-blue-gray-600 mb-4">
                            Let's add some exciting products to it and start shopping!
                        </Typography>
                        <Button
                            className="mt-4"
                            onClick={() => navigate('/user/products')}
                        >
                            Explore Products
                        </Button>
                    </div>
                ) : (
                    <>
                        <Card className="w-full lg:w-2/3 border border-gray-300 shadow-none">
                            <CardHeader floated={false} shadow={false} className="rounded-none">
                                <Typography variant="h4">Cart Items</Typography>
                            </CardHeader>
                            <CardBody>
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex items-center gap-4 py-4 border-b">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-24 h-24 rounded-lg object-cover"
                                        />
                                        <div className="flex-grow">
                                            <Typography variant="h6">{item.name}</Typography>
                                            <Typography color="blue-gray" className="font-medium">
                                                ₹{item.price * item.quantity}
                                            </Typography>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Tooltip content="Decrease Quantity">
                                                <Button
                                                    size="sm"
                                                    variant="outlined"
                                                    color="blue-gray"
                                                    className="rounded-full p-2"
                                                    onClick={() => handleQuantityChange(item._id, -1)}
                                                    disabled={isUpdating || item.quantity <= 1}
                                                >
                                                    <MinusIcon className="h-4 w-4" />
                                                </Button>
                                            </Tooltip>
                                            <Typography>{item.quantity}</Typography>
                                            <Tooltip content="Increase Quantity">
                                                <Button
                                                    size="sm"
                                                    variant="outlined"
                                                    color="blue-gray"
                                                    className="rounded-full p-2"
                                                    onClick={() => handleQuantityChange(item._id, 1)}
                                                    disabled={isUpdating}
                                                >
                                                    <PlusIcon className="h-4 w-4" />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                        <Tooltip content="Remove">
                                            <IconButton
                                                size="sm"
                                                variant="outlined"
                                                color="red"
                                                className="rounded-full p-2"
                                                onClick={() => handleRemoveItem(item._id)}
                                                disabled={isUpdating}
                                            >
                                                <XMarkIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                ))}
                            </CardBody>
                        </Card>
                        <Card className="w-full lg:w-1/3 lg:sticky lg:top-32 lg:self-start border border-gray-300 shadow-none">
                            <CardHeader floated={false} shadow={false} className="rounded-none">
                                <Typography variant="h4">Summary</Typography>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Typography>Subtotal</Typography>
                                        <Typography>₹{subtotal.toFixed(2)}</Typography>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <Typography>Shipping</Typography>
                                        <div className="flex items-center gap-2">
                                            {shipping === 0 ? (
                                                <>
                                                    <Typography className="line-through text-gray-500">
                                                        ₹{baseShipping.toFixed(2)}
                                                    </Typography>
                                                    <Typography className="text-green-500 font-mono text-sm">
                                                        FREE
                                                    </Typography>
                                                </>
                                            ) : (
                                                <Typography>₹{shipping.toFixed(2)}</Typography>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-between font-bold">
                                        <Typography>Total</Typography>
                                        <Typography>₹{total.toFixed(2)}</Typography>
                                    </div>
                                </div>
                                <Button
                                    fullWidth
                                    size="lg"
                                    className="mt-4"
                                    disabled={isUpdating || cartItems.length === 0}
                                    onClick={handleCheckout}
                                >
                                    Checkout
                                </Button>
                            </CardBody>
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
};

export default ShoppingCart;