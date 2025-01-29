import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import useLogin from '../Auth/functions';
import { User, Mail, Phone, CreditCard, Bell, Shield, LogOut, Package, Guitar } from 'lucide-react';
import { get, getDatabase, push, ref, set, update } from 'firebase/database';

type Tab = {
    id: string;
    label: string;
    icon: React.ReactNode;
  };

const Account: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const {user} = useContext(UserContext);

    const [editing, setEditing] = useState(false);
    const [userData, setUserData] = useState<{
        name: string | null;
        email: string | null;
        phone: string | null;
    }>({
        name: null,
        email: null,
        phone: null,
    });

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    

    const {
        handleSignout,
    } = useLogin();

    const tabs: Tab[] = [
        { id: 'profile', label: 'Profile', icon: <User style={{ width: '20px', height: '20px' }} /> },
        { id: 'security', label: 'Security', icon: <Shield style={{ width: '20px', height: '20px' }} /> },
        { id: 'Orders', label: 'Orders', icon: <Package style={{ width: '20px', height: '20px' }} /> },
        { id: 'Tour', label: 'Tour', icon: <Guitar style={{ width: '20px', height: '20px' }} /> },
      ];

    useEffect(() => {
        if (user) {
            const database = getDatabase();
            const userRef = ref(database, "users/" + (user.email ? user.email.replace('.', ',') : ''));
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setUserData({
                        name: data.Name,
                        email: user.email,
                        phone: data.Phone,
                    });
                    setName(data.Name);
                    setEmail(data.email);
                    setPhone(data.Phone);

                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [user]);

    const updateUserData = () => {
        if (user) {
            const database = getDatabase();
            const userRef = ref(database, "users/" + (user.email ? user.email.replace('.', ',') : ''));
            update(userRef, {
                Name: name,
                Email: email,
                Phone: phone,
            }).then(() => {
                console.log("User data updated successfully.");
                setUserData({
                    name: name,
                    email: email,
                    phone: phone,
                });
            }).catch((error: any) => {
                console.error("Error updating user data: ", error);
            });
        }
    };

    const formatPhoneNumber = (phoneNumber: string) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]})-${match[2]}-${match[3]}`;
        }
        return phoneNumber;
    };
    

    

    return (
        <div style={containerStyle}>
            {user ? (
            <div style={cardStyle}>
                {/* Sidebar Navigation */}
                <div style={sidebarStyle}>
                <div style={profileHeaderStyle}>
                    <div>
                    <h2 style={{ margin: 0, fontSize: '16px' }}>{userData.name}</h2>
                    <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#A0A0A0' }}>{userData.email}</p>
                    </div>
                </div>
                <nav>
                    {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={tabStyle(activeTab === tab.id)}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                    ))}
                    <button
                    onClick={() => {
                        handleSignout();
                        window.location.href = `${import.meta.env.BASE_URL}/signin`;
                    }}
                    style={signOutButtonStyle}
                    >
                    <LogOut style={{ width: '20px', height: '20px' }} /> 
                    <span>Sign out</span>
                    </button>
                </nav>
                </div>

                {/* Main Content */}
                <div style={contentStyle}>
                {activeTab === 'profile' && (
                    <div>
                    <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Profile Information</h1>
                    <div>
                        {editing ? (
                        <div style={{ marginTop: '16px' }}>
                            <div style={infoCardStyle}>
                            <User style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                            <div>
                                <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#A0A0A0' }}>Full Name</p>
                                <input
                                type="text"
                                value={name || ''}
                                onChange={(e) => setName(e.target.value)}
                                style={inputStyle}
                                />
                            </div>
                            </div>
                            <div style={infoCardStyle}>
                            <Mail style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                            <div>
                                <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#A0A0A0' }}>Email Address</p>
                                <p style={{ margin: 0, fontWeight: 500 }}>{email || 'Not set'}</p>
                                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#FF4545' }}>Email address cannot be updated. Please contact us to learn more.</p>
                            </div>
                            </div>
                            <div style={infoCardStyle}>
                            <Phone style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                            <div>
                                <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#A0A0A0' }}>Phone Number</p>
                                <input
                                type="text"
                                value={phone || ''}
                                onChange={(e) => setPhone(e.target.value)}
                                style={inputStyle}
                                />
                            </div>
                            </div>
                            <button style={buttonStyle} onClick={() =>{ setEditing(false)
                            updateUserData()
                            }}>
                            Save
                            </button>
                            <button style={{ ...buttonStyle, backgroundColor: '#FF4545', marginLeft: '8px' }} onClick={() => setEditing(false)}>
                            Cancel
                            </button>
                        </div>
                        ) : (
                        <>
                            <div style={infoCardStyle}>
                            <User style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                            <div>
                                <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#A0A0A0' }}>Full Name</p>
                                <p style={{ margin: 0, fontWeight: 500 }}>{userData.name || 'Not set'}</p>
                            </div>
                            </div>
                            <div style={infoCardStyle}>
                            <Mail style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                            <div>
                                <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#A0A0A0' }}>Email Address</p>
                                <p style={{ margin: 0, fontWeight: 500 }}>{userData.email || 'Not set'}</p>
                            </div>
                            </div>
                            <div style={infoCardStyle}>
                            <Phone style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                            <div>
                                <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#A0A0A0' }}>Phone Number</p>
                                <p style={{ margin: 0, fontWeight: 500 }}>{userData.phone ? formatPhoneNumber(userData.phone) : 'Not set'}</p>
                            </div>
                            </div>
                            <button style={buttonStyle} onClick={() => setEditing(true)}>
                            Edit Profile
                            </button>
                        </>
                        )}
                    </div>
                    </div>
                )}
                {activeTab === 'Orders' && (
                    <div>
                    <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Billing & Payments</h1>
                    <p style={{ color: '#A0A0A0' }}>Manage your billing information and view payment history.</p>
                    </div>
                )}
                {activeTab === 'Tour' && (
                    <div>
                    <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Notification Settings</h1>
                    <p style={{ color: '#A0A0A0' }}>Control how you receive notifications.</p>
                    </div>
                )}
                {activeTab === 'security' && (
                    <div>
                    <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Security Settings</h1>
                    <p style={{ color: '#A0A0A0' }}>Manage your account security and privacy settings.</p>
                    </div>
                )}
                </div>
            </div>
            ) : (
            <div style={{ textAlign: 'center', color: '#A0A0A0' }}>
                <h1>Please login to view your account information.</h1>
            </div>
            )}
        </div>
    );
}

const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#121212',
    color: '#ffffff',
    padding: '32px',
    marginTop: '72px'
};

const cardStyle: React.CSSProperties = {
    backgroundColor: '#1E1E1E',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    minHeight: '600px'
};

const sidebarStyle: React.CSSProperties = {
    borderRight: '1px solid #333',
    padding: '24px'
};

const profileHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px'
};

const tabStyle = (isActive: boolean): React.CSSProperties => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: isActive ? '#2D2D2D' : 'transparent',
    color: isActive ? '#ffffff' : '#A0A0A0',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '8px',
    transition: 'all 0.2s ease',
    textAlign: 'left'
});

const contentStyle: React.CSSProperties = {
    padding: '32px'
};

const infoCardStyle: React.CSSProperties = {
    backgroundColor: '#2D2D2D',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
};

const buttonStyle: React.CSSProperties = {
    backgroundColor: '#007AFF',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #A0A0A0',
    backgroundColor: '#1E1E1E',
    color: '#ffffff',
    marginBottom: '8px'
};

const signOutButtonStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: 'transparent',
    color: '#FF4545',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '16px',
    textAlign: 'left'
};

export default Account;
