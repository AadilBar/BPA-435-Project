import React, { useContext, useEffect, useState } from 'react';
import '../CSS/Account.css';
import { UserContext } from '../App';
import useLogin from '../Auth/functions';
import { User, Mail, Phone, Shield, LogOut, Package, Home, Ticket } from 'lucide-react';
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
        { id: 'Tour', label: 'Tour', icon: <Ticket style={{ width: '20px', height: '20px' }} /> },
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
        <div className="account-container">
            <ToastContainer />
            {user ? (
            <div className="account-card">

                <div className="account-sidebar">
                    <div className="account-profile-header">
                        <div>
                        <h2>{userData.name}</h2>
                        <p>{userData.email}</p>
                        </div>
                    </div>
                    <nav className="account-nav">
                        {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`account-tab ${activeTab === tab.id ? 'account-tab-active' : ''}`}

                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                        ))}
                        <button
                            onClick={() => {
                                handleSignout();
                                window.location.href = `#/login`;
                            }}
                            className="account-sign-out-button"
                            >
                            <LogOut style={{ width: '20px', height: '20px'}} /> 
                            <span>Sign out</span>
                        </button>
                    </nav>
                </div>

                <div className="account-content">
                {activeTab === 'profile' && (
                    <div>
                    <h1>Profile Information</h1>
                    <div>
                        {editing ? (
                        <div>
                            <div className="account-info-card">
                            <User style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                            <div>
                                <p>Full Name</p>
                                <input
                                type="text"
                                value={name || ''}
                                onChange={(e) => setName(e.target.value)}
                                className="account-input"
                                />
                            </div>
                            </div>
                            <div className="account-info-card">
                            <Mail style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                            <div>
                                <p>Email Address</p>
                                <p>{email || 'Not set'}</p>
                                <p style={{ color: '#FF4545', fontSize: '14px' }}>Email address cannot be updated. Please contact us to learn more.</p>
                            </div>
                            </div>
                            <div className="account-info-card">
                            <Phone style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                            <div>
                                <p>Phone Number</p>
                                <input
                                type="text"
                                value={phone || ''}
                                onChange={(e) => setPhone(e.target.value)}
                                className="account-input"
                                />
                            </div>
                            </div>
                            <div className="account-info-card">
                                <Home style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                                <div>
                                    <p>Address</p>
                                    <input
                                    type="text"
                                    value={userData.address || ''}
                                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                                    className="account-input"
                                    />
                                </div>
                            </div>
                            <button className="account-button" onClick={() => { setEditing(false); updateUserData(); }}>
                            Save
                            </button>
                            <button className="account-button" style={{ backgroundColor: '#FF4545', marginLeft: '8px' }} onClick={() => setEditing(false)}>
                            Cancel
                            </button>
                        </div>
                        ) : (
                        <>
                            <div className="account-info-card">
                            <User style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                            <div>
                                <p>Full Name</p>
                                <p>{userData.name || 'Not set'}</p>
                            </div>
                            </div>
                            <div className="account-info-card">
                            <Mail style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                            <div>
                                <p>Email Address</p>
                                <p>{userData.email || 'Not set'}</p>
                            </div>
                            </div>
                            <div className="account-info-card">
                            <Phone style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                            <div>
                                <p>Phone Number</p>
                                <p>{userData.phone ? formatPhoneNumber(userData.phone) : 'Not set'}</p>
                            </div>
                            </div>
                            <div className="account-info-card">
                                <Home style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                                <div>
                                    <p>Address</p>
                                    <p>{userData.address || 'Not set'}</p>
                                </div>
                            </div>
                            <button className="account-button" onClick={() => setEditing(true)}>
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
                                        <div key={itemIndex} className="account-info-card">
                                            <img
                                                src={item.imageUrl}
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
                                        <div key={itemIndex} className="account-info-card">
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
                        <div className='account-info-card'>
                        <Shield style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                        <div>
                            <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#A0A0A0' }}>Current Password</p>
                            <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className='account-input'
                            />
                        </div>
                        </div>
                        <div className='account-info-card'>
                        <Shield style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                        <div>
                            <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#A0A0A0' }}>New Password</p>
                            <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => {setNewPassword(e.target.value); handlePasswordChange(e)}}
                            className='account-input'
                            />
                        </div>
                        </div>
                        <div className='account-info-card'>
                        <Shield style={{ width: '24px', height: '24px', color: '#A0A0A0' }} />
                        <div>
                            <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#A0A0A0' }}>Confirm New Password</p>
                            <input
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className='account-input'
                            />
                        </div>
                        </div>
                        <button className='account-button' onClick={updatePassword}>
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

export default Account;
