import { useState, useEffect, useContext } from 'react';
import { Package2, Ticket, Truck, CreditCard } from 'lucide-react';
import { getDatabase, ref, child, get, push, update, remove } from 'firebase/database';
import '../CSS/Payment.css';
import { UserContext } from '../App';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';

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

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  description: string;
  estimatedDays: string;
}

const Stripe = loadStripe("pk_test_51Qe5S5CO8wO6DXWdN3KxfnZkuMPBmDe7InvPf6S3IqFSCipI8osSsz2KDm3b8stNDa7jub7Jxw3hyrwIVmCwUzRv00jhdmhbtX")

function getSeatLabel(seatNumber: number): string {
  const rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const row = rows[Math.floor(seatNumber / 10)];
  const seat = (seatNumber % 10) + 1;
  return `Row ${row}, Seat ${seat}`;
}

function Payment() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [tourItems, setTourItems] = useState<TourItem[]>([]);
  const [clientSecret, setClientSecret] = useState("");
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const { user } = useContext(UserContext);

  const shippingOptions: ShippingOption[] = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: 9.99,
      description: 'Standard delivery',
      estimatedDays: '5-7 business days'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 19.99,
      description: 'Fast delivery',
      estimatedDays: '2-3 business days'
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      price: 29.99,
      description: 'Next day delivery',
      estimatedDays: '1 business day'
    }
  ];

  const [selectedShipping, setSelectedShipping] = useState<string>(shippingOptions[0].id);

  useEffect(() => {
    const database = getDatabase();
    if (user && user.email) {
      const cartRef = ref(database, "users/" + user.email.replace('.', ','));
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
          console.log(items);
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [user]);

  const displayCartItems = cartItems.length > 0 ? cartItems : cartItems;
  const displayTourItems = tourItems.length > 0 ? tourItems : tourItems;
  const [selectedShippingOption, setSelectedShippingOption] = useState<ShippingOption>(shippingOptions[0]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [ticketsTotal, setTicketsTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const newSelectedShippingOption = displayCartItems.length > 0 
      ? shippingOptions.find(option => option.id === selectedShipping)! 
      : { id: 'none', name: 'No Shipping', price: 0, description: '', estimatedDays: '' };
    setSelectedShippingOption(newSelectedShippingOption);

    const newSubtotal = displayCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setSubtotal(newSubtotal);

    const newTicketsTotal = displayTourItems.reduce((acc, ticket) => {
      const addOnTotal = (ticket.meet ? 50 : 0) + (ticket.backstage ? 100 : 0) + (ticket.lounge ? 75 : 0);
      const ticketPrice = (ticket.realPrice - addOnTotal) / ticket.selectedSeats.length;
      return acc + (ticketPrice * ticket.quantity) + addOnTotal;
    }, 0);
    setTicketsTotal(newTicketsTotal);

    const taxRate = 0.0825;
    const newTax = (newSubtotal + newTicketsTotal) * taxRate;
    setTax(newTax);

    const newTotal = newSubtotal + newSelectedShippingOption.price + newTicketsTotal + newTax;
    setTotal(newTotal);
  }, [selectedShipping, displayCartItems, displayTourItems]);



  function handleCheckout() {
        axios.post("https://stripepaymentintentrequest-n7ggeoi6nq-uc.a.run.app", {
            email: user?.email,
            amount: total*100
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
                return_url: `${window.location.origin}/BPA-435-Project/#/completion`,
                },
                redirect: "if_required",
            })
            .then(function(result){
    
                if(result.error){
                    toast.error(`Payment Failed: ${result.error.message}`, {
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
                }
                else if(result.paymentIntent && result.paymentIntent.status === "succeeded"){
                    setMessage("Payment succeeded!");
                    const database = getDatabase();
                    if (user && user.email) {

                        setShowCheckoutForm(false);

                        const orderRef = ref(database, `users/${user.email.replace('.', ',')}/orders`);
                        
                        if (cartItems.length > 0) {
                            push(orderRef, {
                                date: new Date().toLocaleDateString(),
                                total: total,
                                items: [...cartItems],
                                tours: [...tourItems]
                            }).catch((error: any) => {
                                console.error("Error adding item to Firebase:", error);
                            });
                        }

                        const toursRef = ref(database, `users/${user.email.replace('.', ',')}/tourOrders`);
                        if (tourItems.length > 0) {
                            push(toursRef, {
                                date: new Date().toLocaleDateString(),
                                total: total,
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
                        }

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

                        window.location.href = `${window.location.origin}/#/completion`;


    
    
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

  return (
    <div className="payment-container">
      <ToastContainer />
      <div className="payment-content">
        <h1 className="payment-title">Checkout</h1>
        
        <div className="payment-grid">
          {/* Order Summary */}
          <div className="payment-section payment-order-summary">
            <div className="payment-section-header">
              <CreditCard className="payment-icon" />
              <h2 className="payment-section-title">Order Summary</h2>
            </div>
            
            <div className="payment-summary">
              <div className="payment-summary-row">
                <span>Merchandise Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="payment-summary-row">
                <span>Shipping ({selectedShippingOption.name})</span>
                <span>${selectedShippingOption.price.toFixed(2)}</span>
              </div>
              <div className="payment-summary-row">
                <span>Tickets Subtotal</span>
                <span>${ticketsTotal.toFixed(2)}</span>
              </div>
              <div className="payment-summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="payment-summary-row payment-summary-row-total">
                <span>Total</span>
                <span className="payment-total-amount">${total.toFixed(2)}</span>
              </div>

                {!showCheckoutForm && (cartItems.length > 0 || tourItems.length > 0) && (
                  <button className="payment-button" onClick={handleCheckout}>
                    Complete Purchase
                  </button>
                )}
                {showCheckoutForm && clientSecret && Stripe && (
                <div style={{ width: "100%", maxWidth: "600px", padding: "30px", backgroundColor: "#09090b", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
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
                {showCheckoutForm && !clientSecret && (
                <div className="payment-loading-icon">
                  <div className="payment-spinner"></div>
                </div>
                )}
            </div>
          </div>

          <div className="payment-sections-container">
            {/* Merch Items Section */}
            {displayCartItems.length > 0 && (
              <div className="payment-section">
                <div className="payment-section-header">
                  <Package2 className="payment-icon" />
                  <h2 className="payment-section-title">Store Items</h2>
                </div>
                
                <div>
                  {displayCartItems.map((item) => (
                    <div key={item.key} className="payment-item">
                      <img src={item.imageUrl} alt={item.title} className="payment-item-image" />
                      <div className="payment-item-details">
                        <h3 className="payment-item-title">{item.title}</h3>
                        <p className="payment-item-description">{item.description}</p>
                        <p className="payment-item-meta">Size: {item.Size} | Color: {item.color}</p>
                        <p className="payment-item-meta">Quantity: {item.quantity}</p>
                        <p className="payment-item-price">${item.price}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="payment-shipping-options">
                    <div className="payment-shipping-header">
                      <Truck size={20} className="payment-icon" />
                      <h3 className="payment-shipping-title">Shipping Options</h3>
                    </div>
                    {shippingOptions.map((option) => (
                      <label key={option.id} className="payment-shipping-option">
                        <input
                          type="radio"
                          name="shipping"
                          value={option.id}
                          checked={selectedShipping === option.id}
                          onChange={(e) => {
                            setSelectedShipping(e.target.value);
                            setShowCheckoutForm(false); // Set showCheckoutForm to false when shipping method is changed
                          }}
                        />
                        <div className="payment-shipping-option-details">
                          <div className="payment-shipping-option-main">
                            <span className="payment-shipping-name">{option.name}</span>
                            <span className="payment-shipping-price">${option.price.toFixed(2)}</span>
                          </div>
                          <span className="payment-shipping-estimate">Estimated delivery: {option.estimatedDays}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tickets Section */}
            {displayTourItems.length > 0 && (
            <div className="payment-section">
              <div className="payment-section-header">
                <Ticket className="payment-icon" />
                <h2 className="payment-section-title">Tour Tickets</h2>
              </div>
              
              {displayTourItems.map((ticket) => {
                const addOnTotal = (ticket.meet ? 50 : 0) + (ticket.backstage ? 100 : 0) + (ticket.lounge ? 75 : 0);
                const ticketPrice = (ticket.realPrice - addOnTotal) / ticket.selectedSeats.length;
                return (
                  <div key={ticket.key} className="payment-ticket">
                    <h3 className="payment-ticket-venue">{ticket.place}</h3>
                    <p className="payment-ticket-date">{ticket.startDate}</p>
                    <p className="payment-ticket-address">{ticket.address}</p>
                    <div className="payment-ticket-seats">
                      {ticket.selectedSeats.map((seat, index) => (
                        <p key={index}>{getSeatLabel(seat)}</p>
                      ))}
                    </div>
                    <div className="payment-ticket-extras">
                      {ticket.backstage && <span className="payment-extra-tag">Backstage Pass ($100)</span>}
                      {ticket.meet && <span className="payment-extra-tag">Meet & Greet ($50)</span>}
                      {ticket.lounge && <span className="payment-extra-tag">Lounge Access ($75)</span>}
                    </div>
                    <p className="payment-ticket-price">
                      ${ticketPrice.toFixed(2)} per seat × {ticket.quantity} tickets
                    </p>
                  </div>
                );
              })}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;