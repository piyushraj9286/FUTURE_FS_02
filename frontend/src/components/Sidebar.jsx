import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, GitBranch, Settings } from 'lucide-react';
import './Layout.css';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <aside className="sidebar glass-panel">
            <div className="sidebar-header">
                <h2 className="logo">Cosmic<span>CRM</span></h2>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} end>
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/leads" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                            <Users size={20} />
                            <span>Leads</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/pipeline" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                            <GitBranch size={20} />
                            <span>Pipeline</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                            <Settings size={20} />
                            <span>Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button onClick={handleLogout} className="logout-btn">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
