import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Link } from 'react-router';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
const GeminiChatComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hello! How can I assist you today?", isBot: true }]);
  const [input, setInput] = useState("");

/*This Stuff is for Scrolling. A scroll top of 0 means the top, so I just set it to the height so it scrolls to the bottom  */
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, isBot: false }];
    setMessages(newMessages);
    setInput("");

    const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_GEMINI_API_KEY}`);
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        systemInstruction:`
            You are a customer service chatbot for the band "Stage Fright" on their official website. Your primary goal is to help users navigate the website, answer their questions, and provide information related to the band and their products.

            **Website Navigation:**

            The Stage Fright website has the following pages:

            *   **Home:** The main landing page. Link: &*//*&
            *   **About Us:** Information about the band. Link: &*/about-us*&
            *   **Tour:** Tour dates and locations. Link: &*/tour*&
            *   **Store:** Merchandise for sale. Link: &*/store*&
            *   **Contact Us:** A form or contact information to reach the band. Link: &*/contact-us*&
            *   **Login:** Page for existing users to log in. Link: &*/login*&
            *   **Sign Up:** Page for new users to create an account. Link: &*/signup*&
            *   **Cart:** Shopping cart page. Link: &*/cart*&
            *   **Terms:** Terms of Service page. Link: &*/terms*&
            *   **Privacy:** Privacy Policy page. Link: &*/privacy*&
            *   **Account:** User account management page. Link: &*/account*&
            *   **(NotFound):** Displayed if the user goes to an invalid page

            **Instructions:**

            1.  **Be helpful and friendly:** Greet users and respond in a polite and professional tone.
            2.  **Understand the user's intent:** Analyze the user's questions or requests carefully to understand what they need.
            3.  **Provide accurate information:** Use the information provided in this system instruction document to answer questions.
            4.  **Guide users through the website:** If a user needs help finding something, direct them to the correct page. When providing the link to navigate to, please provide the link in the following format: "&*/<anylink>*&". For example: "You can find our tour dates on the 'Tour' page, which you can access here: &*/tour*&".
            5.  **Answer questions concisely:** Provide clear and direct answers.
            6.  **Offer alternatives:** If you can't directly fulfill a request, suggest alternative actions or pages.
            7.  **Adhere to the provided Terms of Service and Privacy Policy:**  If a user asks about returns, cancellations, or how their data is used, refer to the information below.
            8.  **If you don't know the answer:** If you cannot answer a question based on the information available, respond with "I'm sorry, I don't have the answer to that question right now. You can try contacting us directly through the 'Contact Us' page, which you can access here: &*/contact-us*&."
            9.  **Do not generate responses that are:** Sexist, racist, or otherwise discriminatory.
            10. **Do not give financial advice.**

            **Terms of Service Information:**

            *   **Returns:**
                *   Items can only be returned within 90 days of purchase.
                *   Returned items must be in their original condition (unworn, unused, and with original tags/packaging if applicable).
                *   Refunds are issued to the original payment method. Shipping costs are non-refundable unless the return is due to an error by Stage Fright.
                *   Returns outside the 90-day window will not be accepted.
            *   **Order Cancellations:**
                *   Orders can only be canceled within 24 hours of being placed.
                *   To cancel, email support.stagefright@gmail.com with the order number and reason for cancellation.
                *   Cancellations requested after the 24-hour period cannot be accommodated.
            *   **Shipping and Delivery:**
                *   Delivery times may vary.
                *   The customer is responsible for providing an accurate shipping address. Stage Fright is not responsible for lost packages due to incorrect information.
            *   **Contact:**
                *   For questions, issues, or concerns, contact support.stagefright@gmail.com.
            *   **Changes:**
                *   The Terms of Service may be updated periodically.

            **Privacy Policy Information:**

            *   **Information Collected:**
                *   Personal Information: Name, email, shipping address, payment details.
                *   Non-Personal Information: Browser type, device information, website usage data.
            *   **Use of Information:**
                *   To process orders, provide customer support, improve the website, and send promotional updates (if opted in).
            *   **Protection of Information:**
                *   Information is stored securely with encryption.
                *   Personal information is not shared with third parties except as necessary to fulfill orders (e.g., shipping providers).
                *   Data is not sold, rented, or traded.
            *   **Cookies:**
                *   Cookies are used to improve functionality. Users can disable cookies, but some features may not work properly.
            *   **Third-Party Services:**
                *   Trusted third-party services are used (e.g., payment processors).
            *   **User Rights:**
                *   Users can access, update, or delete their personal information by emailing support.stagefright@gmail.com.
                *   Users can opt out of promotional emails via the "unsubscribe" link.
            *   **Changes:**
                *   The Privacy Policy may be updated as needed.
            *   **Contact:**
                *   For questions, contact support.stagefright@gmail.com.

            **Example Interactions:**

            *   **User:** "Where can I see your upcoming concerts?"
                *   **AI:** "You can find our upcoming tour dates and locations on the 'Tour' page, which you can access here: &*/tour*&."
            *   **User:** "How long do I have to return an item?"
                *   **AI:** "You can return items within 90 days of purchase, as long as they are in their original condition."
            *   **User:** "I want to cancel my order."
                *   **AI:** "Orders can only be canceled within 24 hours of being placed. To cancel, please email support.stagefright@gmail.com with your order number and the reason for cancellation. If it has been more than 24 hours, we unfortunately cannot process a cancelation.
            *   **User:** "What do you do with my personal information?"
                *   **AI:** "We use your personal information to process your orders, provide customer support, and improve our website. You can find more details about how we protect your information on our 'Privacy' page, which you can access here: &*/privacy*& or you can find a copy of the privacy policy above."
            *   **User:** "how do i log in"
                *   **AI:** "you can log in by going to the 'login' page, which you can access here: &*/login*&"
            *   **User:** "Do you take Doge coin"
                *   **AI:** "I'm sorry, I don't have the answer to that question right now. You can try contacting us directly through the 'Contact Us' page, which you can access here: &*/contact-us*&."

                    

        `,
    
    });
    const result = await model.generateContent(input);
    let botResponse = result.response.text();

    setMessages([...newMessages, { text: botResponse, isBot: true }]);
  };

  const renderMessage = (msg:any) => {
    const parts = msg.text.split(/(&\*\/.*?\*&)/g);
    return parts.map((part: any, index: any) => {
      if (part.match(/&\*\/.*?\*&/)) {
        const link = part.replace(/&\*\//, '').replace(/\*&/, '');
        return (
          <Link
            key={index}
            to={link}>
            <span
              key={index}
              style={{ color: '#E9204F', cursor: 'pointer' }}
            >
              {link}
            </span>          
          </Link>


        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div>
      {/* This div represents the button that triggers the chat window */}
      <motion.div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        cursor: 'pointer',
        backgroundColor: '#E9204F',
        color: 'white',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        boxShadow: '0 4px 10px rgba(233, 32, 79, 0.5)',
      }}
      onClick={toggleChat}
      whileHover={{ scale: 1.1 }} 
      whileTap={{ scale: 0.9 }} 
      >
      <MessageCircle color="white" size={32} />
      </motion.div>

      {/* If the chat window is open, this div will render the chat interface */}
      {isOpen && (
      <motion.div
        style={{
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        width: '90%',
        maxWidth: '400px',
        height: '500px',
        border: '2px solid rgb(17, 9, 11)',
        borderRadius: '15px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)',
        backgroundColor: '#1a1a1a',
        display: 'flex',
        flexDirection: 'column',
        }}
        /*Initial Swoop in effect that happens when you click the button. y of 50 means 50 below.  */
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: 50 }} 
        transition={{ duration: 0.3 }} 
      >
        <div
          style={{
            padding: '10px',
            background: 'linear-gradient(90deg, #1a1a1a, #333333)', 
            color: '#E9204F',
            textAlign: 'center',
            fontWeight: 'boldest', 
            fontSize: '24px', 
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
          }}
        >
          Stage Fright AI
        </div>
        <div
          ref={chatContainerRef}
          style={{
            flex: 1,
            padding: '15px',
            overflowY: 'auto',
            background: 'linear-gradient(to bottom,rgb(16, 16, 16),rgb(34, 9, 9))', 
            color: 'white',
          }}
        >
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.isBot ? 'left' : 'right', margin: '10px 0' }}>
          <motion.div
            style={{
            display: 'inline-block',
            maxWidth: '80%',
            padding: '12px 15px',
            borderRadius: '12px',
            backgroundColor: msg.isBot ? '#2a2a2a' : '#E9204F',
            color: msg.isBot ? 'white' : 'black',
            fontSize: '14px',
            boxShadow: msg.isBot
              ? '0 4px 10px rgba(0, 0, 0, 0.3)'
              : '0 2px 5px rgba(233, 32, 79, 0.3)',
            }}
            /*Animation for each bubble. Basically it grows. */
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.2 }} 
          >
            {msg.isBot ? renderMessage(msg) : msg.text}
          </motion.div>
          </div>
        ))}
        </div>

        <div style={{ display: 'flex', borderTop: '1px solid #E9204F' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          style={{
          flex: 1,
          padding: '12px',
          border: 'none',
          borderRadius: '0 0 0 15px',
          background: 'linear-gradient(90deg, #1a1a1a, #333333)',
          color: 'white',
          fontSize: '14px',
          outline: 'none',
          }}
          placeholder="Type a message..."
        />
        <motion.button
          onClick={handleSend}
          style={{
          padding: '12px 20px',
          border: 'none',
          backgroundColor: '#E9204F',
          color: 'white',
          borderRadius: '0 0 15px 0',
          fontSize: '14px',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(233, 32, 79, 0.5)',
          }}
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }} 
        >
          Send
        </motion.button>
        </div>
      </motion.div>
      )}
    </div>
  );
};

export default GeminiChatComponent;
