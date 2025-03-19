import React from 'react';
import { Link } from 'react-router';
import '../CSS/Order_Completion.css';

const OrderCompletion: React.FC = () => {
  return (
    <div className="order-completion-container" style={{ fontFamily: 'Sansation', fontWeight: 700 }}>
      <div className="order-completion-content">
        <h1 className="order-completion-title">Order Successful!</h1>
        <p className="order-completion-message">
          Your order was successful. You can view your shipping details and tickets in the account page.
        </p>
        <Link to="/account" className="order-completion-link">
          Go to Account Page
        </Link>
      </div>
    </div>
  );
};

export default OrderCompletion;
