import { useState, useEffect, useContext } from 'react';
import { Box, Text, Image, Flex, Button, VStack, IconButton } from '@chakra-ui/react';
import { getDatabase, ref, child, get, remove, push, update } from "firebase/database";
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { MdDeleteForever } from "react-icons/md";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { UserContext } from "../App";
import { toast, ToastContainer } from "react-toastify";

const Stripe = loadStripe("pk_test_51Qe5S5CO8wO6DXWdN3KxfnZkuMPBmDe7InvPf6S3IqFSCipI8osSsz2KDm3b8stNDa7jub7Jxw3hyrwIVmCwUzRv00jhdmhbtX")

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
    const [clientSecret, setClientSecret] = useState("");
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
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
    const [priceCents, setPriceCents] = useState(0);

    useEffect(() => {
        const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tourTotal = tourItems.reduce((sum, item) => sum + item.realPrice * item.quantity, 0);
        const total = cartTotal + tourTotal;
        setTotalPrice(total);
        setPriceCents(total * 100);
    }, [cartItems, tourItems]);

    const calculatePrice = () => {
        const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tourTotal = tourItems.reduce((sum, item) => sum + item.realPrice * item.quantity, 0);
        const total = cartTotal + tourTotal;
        setTotalPrice(total);
        setPriceCents(total * 100);
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


    function handleCheckout() {
        axios.post("https://stripepaymentintentrequest-n7ggeoi6nq-uc.a.run.app", {
            email: user?.email,
            amount: priceCents
            }).then((result) => {
            if (result.status === 200) {
                setClientSecret(result.data.paymentIntent);
            } else {
                console.error("Failed to fetch payment intent");
            }
            }).catch((error) => {
            console.error("Error:", error);
            });
        setShowCheckoutForm(true);
    }



    function CheckoutForm() {
        const stripe = useStripe();
        const elements = useElements();
    
        const [message, setMessage] = useState<string | null>(null);
        const [isProcessing, setIsProcessing] = useState(false);
        const { user } = useContext(UserContext);
    
        const handleSubmit = async (e: { preventDefault: () => void; }) => {
            e.preventDefault();
    
            if (!stripe || !elements) {
                return;
            }
    
            setIsProcessing(true);
    
            await stripe.confirmPayment({
                elements,
                confirmParams: {
                return_url: `${window.location.origin}/BPA-435-Project/#/`,
                },
                redirect: "if_required",
            })
            .then(function(result){
    
                if(result.error){
                    setMessage(`Payment failed: ${result.error.message}`);
                }
                else if(result.paymentIntent){
                    setMessage("Payment succeeded!");
                    const database = getDatabase();
                    if (user && user.email) {

                        setShowCheckoutForm(false);
                        toast.success(`Payment Successful! You can view your order, shipping info, and tour tickets in the account page`, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            style: {
                                color: '#E9204F',
                                backgroundColor: '#2C2C2C', 
                            }
                        })

                        const orderRef = ref(database, `users/${user.email.replace('.', ',')}/orders`);
                        
                        if (cartItems.length > 0) {
                            push(orderRef, {
                                date: new Date().toLocaleDateString(),
                                total: totalPrice,
                                items: [...cartItems]
                            }).catch((error: any) => {
                                console.error("Error adding item to Firebase:", error);
                            });
                        }

                        const toursRef = ref(database, `users/${user.email.replace('.', ',')}/tourOrders`);
                        push(toursRef, {
                            items: [...tourItems]
                        }).catch((error: any) => {
                            console.error("Error adding item to Firebase:", error);
                        });

                        tourItems.forEach((tourItem) => {
                            const tourSeatsRef = ref(database, `${tourItem.place}`);
                            tourItem.selectedSeats.forEach((seat) => {
                                update(tourSeatsRef, {[seat]: true}).catch((error) => {
                                    console.error("Error updating seat reservation in Firebase:", error);
                                });
                            });
                        });


                        



                        const cartRef = ref(database, `users/${user.email.replace('.', ',')}/cart`);
                        remove(cartRef).catch((error) => {
                            console.error("Error removing item from Firebase:", error);
                        });
                        const tourRef = ref(database, `users/${user.email.replace('.', ',')}/tours`);
                        remove(tourRef).catch((error) => {
                            console.error("Error removing item from Firebase:", error);
                        });
                        setCartItems([]);
                        setTourItems([]);
      


    
    
                    } else {
                        setMessage("User information is missing.");
                    }
    
                }
                else{
                    setMessage("Payment failed for an unknown reason.");
                }
            });
    
            setIsProcessing(false);
        };
    
        return (
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element"  />
                <button 
                disabled={isProcessing || !stripe || !elements} 
                id="submit" 
                style={{ 
                    display: 'block', 
                    margin: '20px 0 0px 0', 
                    backgroundColor: '#E9204F', 
                    color: 'white', 
                    padding: '10px 20px', 
                    borderRadius: '5px' 
                }}
                >
                <span id="button-text">
                    {isProcessing ? "Processing ... " : "Pay now"}
                </span>
                </button>
                {message && <div id="payment-message">{message}</div>}
            </form>
        );
    }


    
    const getSeatLabel = (index: number) => {
        const rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
        const row = rows[Math.floor((index) / 10)]; 
        const seatNumber = ((index) % 10) + 1;      
        return `${row}${seatNumber}`;
    };

    return (
        <Box bg="#000000" color="white" minH="100vh" py={8} px={4} style={{paddingTop: '100px'}}>
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
                    {!showCheckoutForm && (cartItems.length > 0 || tourItems.length > 0) && (
                        <Button
                            as="a"
                            size="lg"
                            bg="#E9204F"
                            color="white"
                            _hover={{ bg: 'red.600' }}
                            w="full"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </Button>
                    )}
                    {showCheckoutForm && clientSecret && Stripe && (
                        <div style={{ width: "100%", maxWidth: "600px", padding: "30px", backgroundColor: "#000000", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
                            <Elements stripe={Stripe} options={{
                                clientSecret: clientSecret,
                                appearance: {
                                    theme: "night"
                                }
                            }}>
                                <CheckoutForm />
                            </Elements>
                        </div>
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
                                        src={`${import.meta.env.BASE_URL}/${item.imageUrl}`}
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
                                        {!item.title.toLowerCase().includes('vinyl') && (
                                            <>
                                                <Text>
                                                    <strong>Size:</strong> {item.Size}
                                                </Text>
                                                <Text>
                                                    <strong>Color:</strong> {item.color}
                                                </Text>
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
