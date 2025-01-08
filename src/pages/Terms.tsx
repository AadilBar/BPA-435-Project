import React from 'react';
import Footer from '../components/footer';

const Terms: React.FC = () => {
    return (
        <>
        <div style={{ 
            padding: '20px', 
            fontFamily: 'Sansation', 
            fontWeight: '700',
            lineHeight: '1.6', 
            maxWidth: '800px', 
            margin: '50px auto', 
            color: '#fff', 
            borderRadius: '8px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
        }}>
            <h1 style={{ color: '#fff', textAlign: 'center', fontSize: '2.5em', marginBottom: '20px' }}>Terms of Service</h1>
            <p style={{ color: '#fff', fontSize: '1.2em', marginBottom: '20px' }}>Welcome to our Stage Fright's official website! By using this site and placing an order, you agree to the following terms:</p>
            <h2 style={{ color: '#fff', fontSize: '2em', marginBottom: '10px' }}>1. Returns</h2>
            <ul style={{ color: '#fff', fontSize: '1.2em', marginBottom: '20px' }}>
                <li>Items can only be returned within 90 days of purchase.</li>
                <li>Returned items must be in their original condition (unworn, unused, and with original tags/packaging if applicable).</li>
                <li>Refunds for returned items will be issued to the original payment method. Shipping costs are non-refundable unless the return is due to our error (e.g., wrong or defective item).</li>
                <li>Returns outside the 90-day window will not be accepted.</li>
            </ul>
            <h2 style={{ color: '#fff', fontSize: '2em', marginBottom: '10px' }}>2. Order Cancellations</h2>
            <ul style={{ color: '#fff', fontSize: '1.2em', marginBottom: '20px' }}>
                <li>Orders can only be canceled within 24 hours of being placed.</li>
                <li>To cancel your order, you must email our support team at support.stagefright@gmail.com with your order number and the reason for cancellation.</li>
                <li>Cancellations requested after the 24-hour period cannot be accommodated as the order may already be processed or shipped.</li>
            </ul>
            <h2 style={{ color: '#fff', fontSize: '2em', marginBottom: '10px' }}>3. Shipping and Delivery</h2>
            <ul style={{ color: '#fff', fontSize: '1.2em', marginBottom: '20px' }}>
                <li>We strive to ship all orders promptly, but delivery times may vary based on location and shipping method.</li>
                <li>Please ensure your shipping address is accurate when placing your order, as we are not responsible for lost packages due to incorrect information.</li>
            </ul>
            <h2 style={{ color: '#fff', fontSize: '2em', marginBottom: '10px' }}>4. Contact Us</h2>
            <p style={{ color: '#fff', fontSize: '1.2em', marginBottom: '20px' }}>For any questions, issues, or concerns regarding your order, please reach out to us at support.stagefright@gmail.com. We’re here to help!</p>
            <h2 style={{ color: '#fff', fontSize: '2em', marginBottom: '10px' }}>5. Changes to These Terms</h2>
            <p style={{ color: '#fff', fontSize: '1.2em', marginBottom: '20px' }}>We may update these Terms of Service from time to time. Please check back periodically to stay informed of any changes.</p>
            <p style={{ color: '#fff', fontSize: '1.2em', marginBottom: '20px' }}>By using our website and placing an order, you acknowledge that you have read and agree to these terms. Thank you for supporting our band!</p>
        </div>
        <Footer />
        </>
    );
};

export default Terms;