import { useState, useEffect, useContext } from 'react';
import { Box, Text, Image, Flex, Button, VStack, IconButton } from '@chakra-ui/react';
import { getDatabase, ref, child, get, remove } from "firebase/database";
import { MdDeleteForever } from "react-icons/md";

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
    const [selectedSeatsLabels, setSelectedSeatsLabels] = useState<string[]>([]);
    const { user } = useContext(UserContext);


    useEffect(() => {
        const database = getDatabase();
        if (user && user.email) {
            const cartRef = ref(database, "users/" + user.email.replace('.', ',') );
            get(child(cartRef, "/cart/")).then((snapshot) => {
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
            get(child(cartRef, "/tours/")).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const items = Object.entries(data).map(([key, item]) => {
                        const tourItem = item as TourItem;
                        const selectedSeatsLabels = tourItem.selectedSeats.map(seat => getSeatLabel(seat));
                        setSelectedSeatsLabels(selectedSeatsLabels);
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
                const cartItemRef = ref(database, `users/${user.email.replace('.', ',')}/cart/${cartItems[index].key}`);
                remove(cartItemRef).catch((error) => {
                    console.error("Error removing item from Firebase:", error);
                });
                setCartItems(updatedCartItems);


            } else {
                const updatedTourItems = [...tourItems];
                updatedTourItems.splice(index, 1);
                setTourItems(updatedTourItems);

                const tourItemRef = ref(database, `users/${user.email.replace('.', ',')}/tours/${tourItems[index].key}`);
                remove(tourItemRef).catch((error) => {
                    console.error("Error removing item from Firebase:", error);
                });
            }
            calculatePrice();
        }
    }



    
    const getSeatLabel = (index: number) => {
        const rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
        const row = rows[Math.floor((index) / 10)]; 
        const seatNumber = ((index) % 10) + 1;      
        return `${row}${seatNumber}`;
    };

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
                        <Link
                            to="/payment">
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
                                <Flex
                                    key={index}
                                    bg="gray.800"
                                    p={4}
                                    borderRadius="md"
                                    alignItems="flex-start"
                                    gap={4}
                                    w="full"
                                    flexDirection={{ base: "column", md: "row" }}
                                >
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        boxSize={{ base: "100%", md: "200px" }}
                                        objectFit="cover"
                                        borderRadius="md"
                                    />
                                    <Box flex="1">
                                        <Text fontSize="lg" fontWeight="bold" color="#E9204F">
                                            {item.title}
                                        </Text>
                                        <Text>{item.description}</Text>
                                        {!item.title.toLowerCase().includes('vinyl') && !item.title.toLowerCase().includes('candle') && !item.title.toLowerCase().includes('sticker') && !item.title.toLowerCase().includes('bag') && (
                                            <>
                                                {!item.title.toLowerCase().includes('phone') && <Text>
                                                    <strong>Size:</strong> {item.Size}
                                                </Text>}
                                                {!item.title.toLowerCase().includes('socks') && <Text>
                                                    <strong>Color:</strong> {item.color}
                                                </Text>}
                                            </>
                                        )}
                                        <Text>
                                            <strong>Quantity:</strong> {item.quantity}
                                        </Text>
                                    </Box>
                                    <Text fontSize="lg" fontWeight="bold" color="white">
                                        ${item.price.toFixed(2)}
                                    </Text>
                                    <IconButton onClick={() => { handleRemoveItem(index, 'cart') }}>
                                        <MdDeleteForever />
                                    </IconButton>
                                </Flex>
                            ))}
                            {tourItems.length === 0 ? (
                                <Text fontSize="xl" color="white" textAlign="center">
                                    You have no tours booked.
                                </Text>
                            ) : (
                                tourItems.map((item, index) => (
                                    <Flex
                                        key={index}
                                        bg="gray.800"
                                        p={4}
                                        borderRadius="md"
                                        alignItems="flex-start"
                                        gap={4}
                                        w="full"
                                        flexDirection={{ base: "column", md: "row" }}
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
                                                <Text>
                                                    <strong>Selected Seats:</strong> {selectedSeatsLabels.join(", ")}
                                                </Text>
                                            )}
                                            {(item.backstage || item.meet || item.lounge) && (
                                                <Text>
                                                    <strong>Add Ons:</strong> {item.backstage && "Backstage Access"} {item.meet && "Meet & Greet"} {item.lounge && "Lounge Access"}
                                                </Text>
                                            )}
                                        </Box>
                                        <Text fontSize="lg" fontWeight="bold" color="white">
                                            ${item.realPrice.toFixed(2)}
                                        </Text>
                                        <IconButton onClick={() => { handleRemoveItem(index, 'tour') }}>
                                            <MdDeleteForever />
                                        </IconButton>
                                    </Flex>
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
