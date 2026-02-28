import { useState, useRef, useEffect } from 'react';
import { Bell as BellIcon, User as UserIcon, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate = useNavigate();

    const notifRef = useRef();
    const profileRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('adminInfo');
        navigate('/login');
    };

    return (
        <header className="topbar glass-panel">
            <div className="topbar-search">
                {/* Can implement global search here later */}
            </div>

            <div className="topbar-actions">
                <div className="dropdown-container" ref={notifRef}>
                    <button
                        className="action-btn"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <BellIcon size={20} />
                        <span className="notif-badge">3</span>
                    </button>

                    {showNotifications && (
                        <div className="dropdown-menu glass-panel">
                            <div className="dropdown-header">
                                <h4>Notifications</h4>
                            </div>
                            <div className="dropdown-content">
                                <div className="dropdown-item">
                                    <p>New lead from <strong>Emily Chen</strong></p>
                                    <span className="time">2 mins ago</span>
                                </div>
                                <div className="dropdown-item">
                                    <p>Meeting scheduled with <strong>Marcus</strong></p>
                                    <span className="time">1 hour ago</span>
                                </div>
                                <div className="dropdown-item">
                                    <p>Contract signed by <strong>Sarah</strong></p>
                                    <span className="time">Yesterday</span>
                                </div>
                            </div>
                            <div className="dropdown-footer">
                                <button>Mark all as read</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="dropdown-container" ref={profileRef}>
                    <div
                        className="user-profile"
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                    >
                        <div className="avatar">
                            <UserIcon size={20} />
                        </div>
                        <span>Admin</span>
                    </div>

                    {showProfileMenu && (
                        <div className="dropdown-menu profile-menu glass-panel">
                            <div className="dropdown-header">
                                <h4>admin@cosmic.com</h4>
                                <span className="role-text">Administrator</span>
                            </div>
                            <div className="dropdown-content">
                                <div className="dropdown-item clickable">
                                    <UserIcon size={16} />
                                    <span>My Profile</span>
                                </div>
                                <div className="dropdown-item clickable">
                                    <Settings size={16} />
                                    <span>Account Settings</span>
                                </div>
                                <div className="dropdown-divider"></div>
                                <div className="dropdown-item clickable danger" onClick={handleLogout}>
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Topbar;
