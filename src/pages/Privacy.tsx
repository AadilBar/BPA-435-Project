import React from 'react';
import Footer from '../components/footer';

const Privacy: React.FC = () => {
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
            <h1 style={{ color: '#fff', textAlign: 'center', fontSize: '2.5em', marginBottom: '20px' }}>Privacy Policy</h1>
            <p style={{ color: '#fff', fontSize: '1.2em', marginBottom: '20px' }}>We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect the information you provide when visiting our website or placing an order.</p>
            <h2 style={{ color: '#fff', fontSize: '2em', marginBottom: '10px' }}>1. Information We Collect</h2>
            <ul style={{ color: '#fff', fontSize: '1.2em', marginBottom: '20px' }}>
                <li>Personal Information: When you place an order or contact us, we may collect personal information such as your name, email address, shipping address, and payment details.</li>
                <li>Non-Personal Information: We may also collect non-personal information like your browser type, device information, and website usage data to improve your experience on our site.</li>
            </ul>
            <h2 style={{ color: '#fff', fontSize: '2em', marginBottom: '10px' }}>2. How We Use Your Information</h2>
            <ul style={{ color: '#fff', fontSize: '1.2em', marginBottom: '20px' }}>
                <li>To process and fulfill your orders, including shipping and payment.</li>
                <li>To provide customer support and respond to your inquiries.</li>
                <li>To improve our website, products, and services.</li>
                <li>To send you updates about your order or promotional offers (only if you’ve opted in).</li>
            </ul>
            <h2 style={{ color: '#fff', fontSize: '2em', marginBottom: '10px' }}>3. How We Protect Your Information</h2>
            <ul style={{ color: '#fff', fontSize: '1.2em', marginBottom: '20px' }}>
                <li>Your information is stored securely, and we use encryption and other security measures to protect it.</li>
                <li>We do not share your personal information with third parties, except as necessary to fulfill your order (e.g., sharing your address with a shipping provider).</li>
                <li>We do not sell, rent, or trade your personal data.</li>
            </ul>
            <h2 style={{ color: '#fff', fontSize: '2em', marginBottom: '10px' }}>4. Cookies</h2>
            <p style={{ color: '#fff', fontSize: '1.2em', marginBottom: '20px' }}>Our website uses cookies to improve functionality and enhance your experience. Cookies allow us to track website usage and remember your preferences. You can disable cookies in your browser settings, but some features of the site may not work properly.</p>
            <h2 style={{ color: '#fff', fontSize: '2em', marginBottom: '10px' }}>5. Third-Party Services</h2>
            <p style={{ color: '#fff', fontSize: '1.2em', marginBottom: '20px' }}>We may use trusted third-party services (e.g., payment processors or analytics providers) to help run our website. These providers are only given the information necessary to perform their services and are required to protect your data.</p>
            <h2 style={{ color: '#fff', fontSize: '2em', marginBottom: '10px' }}>6. Your Rights</h2>
            <ul style={{ color: '#fff', fontSize: '1.2em', marginBottom: '20px' }}>
                <li>You have the right to access, update, or delete your personal information. To request changes, please email us at support.stagefright@gmail.com.</li>
                <li>You can opt out of receiving promotional emails by clicking the "unsubscribe" link at the bottom of any marketing email.</li>
            </ul>
            <h2 style={{ color: '#fff', fontSize: '2em', marginBottom: '10px' }}>7. Changes to This Policy</h2>
            <p style={{ color: '#fff', fontSize: '1.2em', marginBottom: '20px' }}>We may update this Privacy Policy as needed. Any changes will be posted on this page, and the updated policy will take effect immediately upon posting.</p>
            <h2 style={{ color: '#fff', fontSize: '2em', marginBottom: '10px' }}>8. Contact Us</h2>
            <p style={{ color: '#fff', fontSize: '1.2em', marginBottom: '20px' }}>If you have questions or concerns about this Privacy Policy, please reach out to us at support.stagefright@gmail.com.</p>
            <p style={{ color: '#fff', fontSize: '1.2em', marginBottom: '20px' }}>By using our website, you agree to the terms of this Privacy Policy. Thank you for trusting us with your information!</p>
        </div>
        <Footer />
        </>
    );
};

export default Privacy;