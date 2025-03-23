import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Link } from 'react-router';
import { MessageCircle } from 'lucide-react';

const GeminiChatComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hello! How can I assist you today?", isBot: true }]);
  const [input, setInput] = useState("");

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
      <div 
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
        }}
        onClick={toggleChat}
      >
        <MessageCircle color="white" size={32} />
      </div>
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '90%', // Adjust width based on screen size
            maxWidth: '400px', // Default max width
            height: '500px',
            border: '1px solid #000',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            backgroundColor: '#09090b',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ flex: 1, padding: '10px', overflowY: 'auto', color: 'white' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.isBot ? 'left' : 'right', margin: '10px 0' }}>
                <div 
                  style={{
                    display: 'inline-block',
                    padding: '10px',
                    borderRadius: '10px',
                    backgroundColor: msg.isBot ? '#333' : '#E9204F',
                    color: msg.isBot ? 'white' : 'black',
                    fontSize: '14px',
                  }}
                >
                  {msg.isBot ? renderMessage(msg) : msg.text}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid #000' }}>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '0 0 0 10px', backgroundColor: '#333', color: 'white', fontSize: '14px' }} 
              placeholder="Type a message..."
            />
            <button 
              onClick={handleSend} 
              style={{ padding: '10px', border: 'none', backgroundColor: '#E9204F', color: 'black', borderRadius: '0 0 10px 0', fontSize: '14px' }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiChatComponent;
