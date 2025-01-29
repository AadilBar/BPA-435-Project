import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import useLogin from '../Auth/functions';
import { User, Mail, Phone, Shield, LogOut, Package, Guitar, Home } from 'lucide-react';
import { get, getDatabase, ref, update } from 'firebase/database';
import { toast, ToastContainer } from 'react-toastify';
import QRCode from "react-qr-code";
import Footer from '../components/footer';

type Tab = {
    id: string;
    label: string;
    icon: React.ReactNode;
  };

const Account: React.FC = () => {

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

    interface Orders {
        date: string;
        items: CartItem[];
        total: number;
    }


    interface tourOrders {
        date: string;
        items: TourItem[];
    }
    
    const [activeTab, setActiveTab] = useState('profile');
    const {user} = useContext(UserContext);
    const [orders, setOrders] = useState<Orders[]>([]);
    const [tourOrders, setTourOrders] = useState<tourOrders[]>([]);

    const [editing, setEditing] = useState(false);
    const [userData, setUserData] = useState<{
        name: string | null;
        email: string | null;
        phone: string | null;
        address: string | null;
    }>({
        name: null,
        email: null,
        phone: null,
        address: null,
    });

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
    

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
                        address: data.Address,
                    });
                    setName(data.Name);
                    setEmail(data.email);
                    setPhone(data.Phone);

                }
            }).catch((error) => {
                console.error(error);
            });

            const ordersRef = ref(database, "users/" + (user.email ? user.email.replace('.', ',') + "/orders" : ''));
            get(ordersRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const ordersItems = (Object.values(data) as Orders[]).map((item: Orders) => ({
                        date: item.date,
                        items: item.items,
                        total: item.total,
                    }));
                    console.log(ordersItems);
                    console.log(orders)
                    setOrders(ordersItems);
                }
            }).catch((error) => {
                console.error(error);
            });

            const toursRef = ref(database, "users/" + (user.email ? user.email.replace('.', ',') + "/tourOrders" : ''));
            get(toursRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const toursItems = (Object.values(data) as tourOrders[]).map((item: tourOrders) => ({
                        date: item.date,
                        items: item.items,
                    }));
                    setTourOrders(toursItems);
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
                Address: userData.address,
            }).then(() => {
                console.log("User data updated successfully.");
                setUserData({
                    name: name,
                    email: email,
                    phone: phone,
                    address: userData.address,
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

    
    const getSeatLabel = (index: number) => {
        const rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
        const row = rows[Math.floor((index) / 10)]; 
        const seatNumber = ((index) % 10) + 1;      
        return `${row}${seatNumber}`;
    };
    

    
    const {
        handlePasswordChange,
        handleUpdatePassword
    } = useLogin();

    const updatePassword = () => {
        if (newPassword === confirmNewPassword) {
            handleUpdatePassword().then(() => {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
                toast.success(`Password Change Successful!`, {
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
            }).catch((error) => {
                console.error("Error updating password: ", error);
            });
        } else {
            console.error("Passwords do not match.");
        }
    };

    return (
        <>
        <div style={containerStyle}>
            <ToastContainer />
            {user ? (
            <div style={cardStyle}>

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
                            <div style={infoCardStyle}>
                                <Home style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                                <div>
                                    <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#A0A0A0' }}>Address</p>
                                    <input
                                    type="text"
                                    value={userData.address || ''}
                                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
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
                            <div style={infoCardStyle}>
                                <Home style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                                <div>
                                    <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#A0A0A0' }}>Address</p>
                                    <p style={{ margin: 0, fontWeight: 500 }}>{userData.address || 'Not set'}</p>
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
                    <>
                        {orders.length > 0 ? (
                            orders.map((order, orderIndex) => (
                                <div key={orderIndex} style={{ marginBottom: '24px' }}>
                                    <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Order Date: {order.date}</h2>
                                    <p style={{ fontSize: '16px', color: '#A0A0A0' }}>Awaiting shipping info</p>
                                    {order.items.map((item, itemIndex) => (
                                        <div key={itemIndex} style={infoCardStyle}>
                                            <img
                                                src={`${import.meta.env.BASE_URL}/${item.imageUrl}`}
                                                alt={item.title}
                                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#E9204F' }}>{item.title}</p>
                                                <p>{item.description}</p>
                                           {!item.title.toLowerCase().includes('vinyl') && !item.title.toLowerCase().includes('candle') && !item.title.toLowerCase().includes('sticker') && !item.title.toLowerCase().includes('bag') && (
                                                   <>
                                                       {!item.title.toLowerCase().includes('phone') && <p>
                                                           <strong>Size:</strong> {item.Size}
                                                       </p>}
                                                       {!item.title.toLowerCase().includes('socks') && <p>
                                                           <strong>Color:</strong> {item.color}
                                                       </p>}
                                                   </>
                                               )}
                                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                            </div>
                                            <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>${item.price.toFixed(2)}</p>
                                        </div>
                                    ))}
                                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginTop: '16px' }}>Total: ${order.total.toFixed(2)}</h3>
                                </div>
                            ))
                        ) : (
                            <p>No orders found.</p>
                        )}
                    </>
                )}

                {activeTab === 'Tour' && (
                    <>                                    <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Tour Dates:</h2>
                        {tourOrders.length > 0 ? (
                            tourOrders.map((tourOrder, tourOrderIndex) => (
                                <div key={tourOrderIndex} style={{ marginBottom: '24px' }}>

                                    {tourOrder.items.map((item, itemIndex) => (
                                        <div key={itemIndex} style={infoCardStyle}>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#E9204F' }}>{item.place}</p>
                                                <p><strong>Address:</strong> {item.address}</p>
                                                <p><strong>Start Date:</strong> {item.startDate}</p>
                                                <p><strong>End Date:</strong> {item.endDate}</p>
                                                <p><strong>Seats:</strong> {item.selectedSeats.map(getSeatLabel).join(', ')}</p>
                                                <p style={{ fontSize: '12px', color: '#A0A0A0', marginTop: '8px' }}>Scan this code at the venue for admission</p>
                                            </div>

                                            <QRCode 
                                                value={`Email: ${userData.email}, Place: ${item.place}, Start Date: ${item.startDate}, End Date: ${item.endDate}, Seats: ${item.selectedSeats.join(', ')}`} 
                                                size={128} 
                                                bgColor="#ffffff" 
                                                fgColor="#000000" 
                                                level="Q" 
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <p>No tour orders found.</p>
                        )}
                    </>
                )}
                {activeTab === 'security' && (
                    <div>
                    <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Security Settings</h1>
                    <p style={{ color: '#A0A0A0' }}>Manage your account security and privacy settings.</p>
                    <div style={{ marginTop: '16px' }}>
                        <div style={infoCardStyle}>
                        <Shield style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                        <div>
                            <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#A0A0A0' }}>Current Password</p>
                            <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            style={inputStyle}
                            />
                        </div>
                        </div>
                        <div style={infoCardStyle}>
                        <Shield style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                        <div>
                            <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#A0A0A0' }}>New Password</p>
                            <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => {setNewPassword(e.target.value); handlePasswordChange(e)}}
                            style={inputStyle}
                            />
                        </div>
                        </div>
                        <div style={infoCardStyle}>
                        <Shield style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                        <div>
                            <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#A0A0A0' }}>Confirm New Password</p>
                            <input
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            style={inputStyle}
                            />
                        </div>
                        </div>
                        <button style={buttonStyle} onClick={updatePassword}>
                        Update Password
                        </button>
                    </div>
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
        <Footer/>
        </>
    );
}

const containerStyle: React.CSSProperties = {
    minHeight: '80vh',
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
