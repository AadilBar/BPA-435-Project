import { useState, useEffect, useContext } from 'react';
import { Box, Text, Image, Flex, Button, VStack, IconButton } from '@chakra-ui/react';
import { getDatabase, ref, child, get, remove, runTransaction } from "firebase/database";
import { MdDeleteForever } from "react-icons/md";
import { motion } from "framer-motion"; 

import { UserContext } from "../App";
import { ToastContainer } from "react-toastify";
import { Link } from 'react-router';


const CartPage = () => {
    interface CartItem {
        key: string;
        imageUrl: string;
        title: string;
        description: string;
        Size: string;
        color: string;
        price: number;
        quantity: number;
    }
    interface TourItem {
        key: string;
        place: string;
        quantity: number;
        realPrice: number;
        address: string;
        startDate: string;
        endDate: string;
        backstage: boolean;
        meet: boolean;
        lounge: boolean;
        selectedSeats: number[];
    }
    
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [tourItems, setTourItems] = useState<TourItem[]>([]);
    const { user } = useContext(UserContext);


    useEffect(() => {
        const database = getDatabase();
        if (user && user.email) {
            const cartRef = ref(database, "users/" + user.email.replace('.', ',') );
            get(child(cartRef, "/cart/items/")).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const items = Object.entries(data).map(([key, item]) => {
                        const cartItem = item as CartItem;
                        return {
                            key: key,
                            title: cartItem.title,
                            description: cartItem.description,
                            Size: cartItem.Size,
                            color: cartItem.color,
                            price: cartItem.price,
                            quantity: cartItem.quantity,
                            imageUrl: cartItem.imageUrl
                        };
                    });
                    setCartItems(items);
                }
            }).catch((error) => {
                console.error(error);
            });
            get(child(cartRef, "/tours/items")).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const items = Object.entries(data).map(([key, item]) => {
                        const tourItem = item as TourItem;
                        return {
                            key: key,
                            place: tourItem.place,
                            address: tourItem.address,
                            startDate: tourItem.startDate,
                            endDate: tourItem.endDate,
                            realPrice: tourItem.realPrice,
                            quantity: tourItem.quantity,
                            selectedSeats: tourItem.selectedSeats,
                            backstage: tourItem.backstage,
                            meet: tourItem.meet,
                            lounge: tourItem.lounge
                        };

                    });
                    setTourItems(items);
                }
            }).catch((error) => {
                console.error(error);
            });
            
        }
    }, [user]);



    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tourTotal = tourItems.reduce((sum, item) => sum + item.realPrice, 0);
        const total = cartTotal + tourTotal;
        setTotalPrice(total);
    }, [cartItems, tourItems]);

    const calculatePrice = () => {
        const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tourTotal = tourItems.reduce((sum, item) => sum + item.realPrice, 0);
        const total = cartTotal + tourTotal;
        setTotalPrice(total);
    }



    function handleRemoveItem(index: number, type: 'cart' | 'tour') {
        const database = getDatabase();
        if (user && user.email) {
            if (type === 'cart') {
                const updatedCartItems = [...cartItems];
                updatedCartItems.splice(index, 1);

                const cartItemRef = ref(database, `users/${user.email.replace('.', ',')}/cart/items/${cartItems[index].key}`);
                remove(cartItemRef).catch((error) => {
                    console.error("Error removing item from Firebase:", error);
                });

                const totalItemsRef = ref(database, `users/${user.email.replace('.', ',')}/cart/totalItems`);
                runTransaction(totalItemsRef, (currentValue) => {
                    return (currentValue || 0) - 1;
                });
            
                setCartItems(updatedCartItems);


            } else {
                const updatedTourItems = [...tourItems];
                updatedTourItems.splice(index, 1);
                setTourItems(updatedTourItems);

                const tourItemRef = ref(database, `users/${user.email.replace('.', ',')}/tours/items/${tourItems[index].key}`);
                remove(tourItemRef).catch((error) => {
                    console.error("Error removing item from Firebase:", error);
                });

                const tourTotalItemsRef = ref(database, `users/${user.email.replace('.', ',')}/tours/totalItems`);
                runTransaction(tourTotalItemsRef, (currentValue) => {
                    return (currentValue || 0) - 1;
                });
            }
            calculatePrice();
        }
    }



    
    const getSeatLabel = (index: number) => {
        const rows = "ABC"; // Only rows A, B, and C
        const row = rows[Math.floor((index) / 10)]; 
        const seatNumber = ((index) % 10) + 1;      
        return `Row ${row}, Seat ${seatNumber}`;
    };

    const MotionFlex = motion(Flex); 

    return (
        <Box bg="#09090b" color="white" minH="100vh" py={8} px={4} style={{paddingTop: '100px'}}>
            <ToastContainer />
            <Box textAlign="center" mb={6}>
                <Text fontSize="3xl" color="#E9204F" fontWeight="bold">Your Cart</Text>
            </Box>

            <Flex alignItems="flex-start" gap={8} flexDirection={{ base: "column", md: "row" }}>
                <Box 
                    textAlign="center" 
                    bg="gray.900" 
                    p={4} 
                    borderRadius="md" 
                    w={{ base: "100%", md: "400px" }} 
                    mb={{ base: 4, md: 0 }}
                    maxW={{ base: "100%", md: "500px" }} 
                    ml={{ base: "0", md: "auto" }}
                    order={{ base: 1, md: 2 }}
                >
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>
                        Total: ${totalPrice.toFixed(2)}
                    </Text>
                    {(cartItems.length > 0 || tourItems.length > 0) && (
                        <Link to="/payment">
                            <Button
                                as="a"
                                size="lg"
                                bg="#E9204F"
                                color="white"
                                _hover={{ bg: 'red.600' }}
                                w="full"
                            >
                                Checkout
                            </Button>
                        </Link>
                    )}
                </Box>

                <VStack align="stretch" flex="2" gap={4} order={{ base: 2, md: 1 }}>
                    {(cartItems.length === 0 && tourItems.length === 0) ? (
                        <Text fontSize="xl" color="white" textAlign="center">
                            Your cart is empty.
                        </Text>
                    ) : (
                        <>
                            {cartItems.map((item, index) => (
                                <MotionFlex
                                    key={index}
                                    bg="gray.800"
                                    p={4}
                                    borderRadius="md"
                                    alignItems="flex-start"
                                    gap={4}
                                    w="full"
                                    flexDirection={{ base: "column", md: "row" }}
                                    initial={{ opacity: 0, y: 20 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    exit={{ opacity: 0, y: -20 }} 
                                    transition={{ duration: 0.3 }} 
                                    whileHover={{ scale: 1.02, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" }} 
                                >
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        boxSize={{ base: "100%", md: "150px" }}
                                        objectFit="cover"
                                        borderRadius="md"
                                    />
                                    <Box flex="1">
                                        <Text fontSize="lg" fontWeight="bold" color="#E9204F">
                                            {item.title}
                                        </Text>
                                        <Text>{item.description}</Text>
                                        <Text className="payment-item-meta">Size: {item.Size} | Color: {item.color}</Text>
                                        <Text className="payment-item-meta">Quantity: {item.quantity}</Text>
                                        <Text className="payment-item-price">${item.price.toFixed(2)}</Text>
                                    </Box>
                                    <IconButton 
                                        onClick={() => { handleRemoveItem(index, 'cart') }}
                                        _hover={{
                                            transform: "scale(1.2)",
                                            boxShadow: "0px 0px 10px 2px rgba(233, 32, 79, 0.8)",
                                            color: "#E9204F"
                                        }}
                                    >
                                        <MdDeleteForever />
                                    </IconButton>
                                </MotionFlex>
                            ))}
                            {tourItems.length === 0 ? (
                                <Text fontSize="xl" color="white" textAlign="center">
                                    You have no tours booked.
                                </Text>
                            ) : (
                                tourItems.map((item, index) => (
                                    <MotionFlex
                                        key={index}
                                        bg="gray.800"
                                        p={4}
                                        borderRadius="md"
                                        alignItems="flex-start"
                                        gap={4}
                                        w="full"
                                        flexDirection={{ base: "column", md: "row" }}
                                        initial={{ opacity: 0, y: 20 }} 
                                        animate={{ opacity: 1, y: 0 }} 
                                        exit={{ opacity: 0, y: -20 }} 
                                        transition={{ duration: 0.3 }} 
                                        whileHover={{ scale: 1.02, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" }} 
                                    >
                                        <Box flex="1">
                                            <Text fontSize="lg" fontWeight="bold" color="#E9204F">
                                                {item.place}
                                            </Text>
                                            <Text>{item.address}</Text>
                                            <Text>
                                                <strong>Start Date:</strong> {item.startDate}
                                            </Text>
                                            <Text>
                                                <strong>End Date:</strong> {item.endDate}
                                            </Text>
                                            <Text>
                                                <strong>Quantity:</strong> {item.quantity}
                                            </Text>
                                            {item.selectedSeats.length > 0 && (
                                                <>

                                                    <div className="payment-ticket-seats">
                                                    <Text><strong>Selected Seats:</strong></Text>
                                                        {item.selectedSeats.map((seat, index) => (
                                                            <p key={index}>{getSeatLabel(seat)}</p>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                            {(item.backstage || item.meet || item.lounge) && (
                                                <div className="payment-ticket-extras">
                                                    {item.backstage && <span className="payment-extra-tag">Backstage Pass ($100)</span>}
                                                    {item.meet && <span className="payment-extra-tag">Meet & Greet ($50)</span>}
                                                    {item.lounge && <span className="payment-extra-tag">Lounge Access ($75)</span>}
                                                </div>
                                            )}
                                            <Text className="payment-ticket-price">
                                                ${item.realPrice.toFixed(2)}
                                            </Text>

                                        </Box>
                                        <IconButton 
                                            onClick={() => { handleRemoveItem(index, 'tour') }}
                                            _hover={{
                                                transform: "scale(1.2)",
                                                boxShadow: "0px 0px 10px 2px rgba(233, 32, 79, 0.8)",
                                                color: "#E9204F"
                                            }}
                                        >
                                            <MdDeleteForever />
                                        </IconButton>
                                    </MotionFlex>
                                ))
                            )}
                        </>
                    )}
                </VStack>
            </Flex>
        </Box>
    );
};

export default CartPage;
