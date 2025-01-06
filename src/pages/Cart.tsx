import { useState, useEffect } from 'react';
import { Box, Text, Image, Flex, Button, VStack } from '@chakra-ui/react';
import { getDatabase, ref, child, get } from "firebase/database";
import useLogin from '../Auth/functions';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const Stripe = loadStripe("pk_test_51Qe5S5CO8wO6DXWdN3KxfnZkuMPBmDe7InvPf6S3IqFSCipI8osSsz2KDm3b8stNDa7jub7Jxw3hyrwIVmCwUzRv00jhdmhbtX")

const CartPage = () => {
    // Sample data for demonstration
    // const [cartItems, setCartItems] = useState([
    //     {
    //         image: 'https://via.placeholder.com/100',
    //         name: 'Item 1',
    //         description: 'Description of item 1',
    //         size: 'M',
    //         color: 'Red',
    //         price: 29.99,
    //     },
    //     {
    //         image: 'https://via.placeholder.com/100',
    //         name: 'Item 2',
    //         description: 'Description of item 2',
    //         size: 'L',
    //         color: 'Black',
    //         price: 49.99,
    //     },
    // ]);
    interface CartItem {
        imageUrl: string;
        title: string;
        description: string;
        size: string;
        color: string;
        price: number;
        quantity: number;
    }
    
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [clientSecret, setClientSecret] = useState("");
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);

    const {
        user,
      } = useLogin();

    useEffect(() => {
        const database = getDatabase();
        if (user && user.email) {
            const cartRef = ref(database, "users/" + user.email.replace('.', ',') );
            get(child(cartRef, "/cart/")).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const items = (Object.values(data) as CartItem[]).map((item: CartItem) => ({
                        title: item.title,
                        description: item.description,
                        size: item.size,
                        color: item.color,
                        price: item.price,
                        quantity: item.quantity,
                        imageUrl: item.imageUrl
                    }));
                    setCartItems(items);
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [user]);


    const [totalPrice, setTotalPrice] = useState(0);
    const [priceCents, setPriceCents] = useState(0);

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.price, 0);
        setTotalPrice(total);
        setPriceCents(total * 100);
    }, [cartItems]);


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

    return (
        <Box bg="#000000" color="white" minH="100vh" py={8} px={4}>
            <Box textAlign="center" mb={6}>
                <Text fontSize="3xl" color="#E9204F" fontWeight="bold">Your Cart</Text>
            </Box>

            <Flex alignItems="flex-start" gap={8}>
                <VStack align="stretch" flex="2">
                    {cartItems.length === 0 ? (
                        <Text fontSize="xl" color="white" textAlign="center">
                            Your cart is empty.
                        </Text>
                    ) : (
                        cartItems.map((item, index) => (
                            <Flex
                                key={index}
                                bg="gray.800"
                                p={4}
                                borderRadius="md"
                                alignItems="flex-start"
                                gap={4}
                            >
                                <Image
                                    src={`${import.meta.env.BASE_URL}/${item.imageUrl}`}
                                    alt={item.title}
                                    boxSize="200px"
                                    objectFit="cover"
                                    borderRadius="md"
                                />
                                <Box flex="1">
                                    <Text fontSize="lg" fontWeight="bold" color="#E9204F">
                                        {item.title}
                                    </Text>
                                    <Text>{item.description}</Text>
                                    <Text>
                                        <strong>Size:</strong> {item.size}
                                    </Text>
                                    <Text>
                                        <strong>Color:</strong> {item.color}
                                    </Text>
                                </Box>
                                <Text fontSize="lg" fontWeight="bold" color="white">
                                    ${item.price.toFixed(2)}
                                </Text>
                            </Flex>
                        ))
                    )}
                </VStack>

                <Box flex="1" textAlign="right" bg="gray.900" p={4} borderRadius="md" maxW="400px" ml="auto">
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>
                        Total: ${totalPrice.toFixed(2)}
                    </Text>
                    {!showCheckoutForm && cartItems.length > 0 && (
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
            </Flex>

        </Box>
    );
};

export default CartPage;
