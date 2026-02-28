import { useState } from 'react';
import { User, Lock, Bell, Palette, Shield, Save } from 'lucide-react';

const Settings = () => {
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo') || '{}');
    const [activeTab, setActiveTab] = useState('profile');
    const [saved, setSaved] = useState(false);

    const [profile, setProfile] = useState({
        name: 'Admin',
        email: adminInfo.email || 'admin@cosmic.com',
        role: 'Administrator'
    });

    const [notifications, setNotifications] = useState({
        newLead: true,
        statusChange: true,
        followUp: false,
        weeklyReport: true
    });

    const [appearance, setAppearance] = useState({
        theme: 'dark',
        accentColor: '#3b82f6',
        compactMode: false
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: <User size={18} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
        { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
        { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    ];

    return (
        <div className="page-container settings-page">
            <div className="settings-header">
                <h1 className="page-title" style={{ marginBottom: '0.25rem' }}>Settings</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Manage your account and application preferences.</p>
            </div>

            <div className="settings-layout">
                {/* Sidebar Tabs */}
                <div className="settings-tabs glass-panel">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`settings-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Panel */}
                <div className="settings-content glass-panel">
                    {activeTab === 'profile' && (
                        <div className="settings-section">
                            <h3 className="settings-section-title">Profile Information</h3>
                            <div className="profile-avatar-row">
                                <div className="settings-avatar">{profile.name.charAt(0)}</div>
                                <div>
                                    <div className="font-semibold text-white">{profile.name}</div>
                                    <div className="text-sm text-gray-400">{profile.role}</div>
                                </div>
                            </div>
                            <div className="settings-form-grid">
                                <div className="form-group">
                                    <label className="form-label">Display Name</label>
                                    <input className="form-input" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <input className="form-input" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Role</label>
                                    <input className="form-input" value={profile.role} disabled style={{ opacity: 0.6 }} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="settings-section">
                            <h3 className="settings-section-title">Notification Preferences</h3>
                            <p className="settings-section-desc">Choose what alerts you want to receive.</p>
                            {[
                                { key: 'newLead', label: 'New Lead Received', desc: 'Get notified when a new lead is added via the contact form.' },
                                { key: 'statusChange', label: 'Status Change', desc: 'Alert when a lead status changes in the pipeline.' },
                                { key: 'followUp', label: 'Follow-Up Reminders', desc: 'Reminders for scheduled follow-up dates.' },
                                { key: 'weeklyReport', label: 'Weekly Summary Report', desc: 'Receive a weekly digest of your pipeline activity.' },
                            ].map(({ key, label, desc }) => (
                                <div key={key} className="toggle-row">
                                    <div>
                                        <div className="toggle-label">{label}</div>
                                        <div className="toggle-desc">{desc}</div>
                                    </div>
                                    <div
                                        className={`toggle-switch ${notifications[key] ? 'on' : ''}`}
                                        onClick={() => setNotifications({ ...notifications, [key]: !notifications[key] })}
                                    >
                                        <div className="toggle-thumb" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="settings-section">
                            <h3 className="settings-section-title">Appearance</h3>
                            <p className="settings-section-desc">Customize the look and feel of your dashboard.</p>
                            <div className="form-group">
                                <label className="form-label">Current Theme</label>
                                <div className="theme-options">
                                    {['dark', 'midnight', 'ocean'].map(t => (
                                        <div
                                            key={t}
                                            className={`theme-option ${appearance.theme === t ? 'selected' : ''}`}
                                            onClick={() => setAppearance({ ...appearance, theme: t })}
                                        >
                                            <div className={`theme-preview theme-${t}`} />
                                            <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <label className="form-label">Accent Color</label>
                                <div className="accent-colors">
                                    {['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'].map(c => (
                                        <div
                                            key={c}
                                            className={`accent-dot ${appearance.accentColor === c ? 'selected' : ''}`}
                                            style={{ background: c }}
                                            onClick={() => setAppearance({ ...appearance, accentColor: c })}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="toggle-row mt-3">
                                <div>
                                    <div className="toggle-label">Compact Mode</div>
                                    <div className="toggle-desc">Reduce padding for a denser layout.</div>
                                </div>
                                <div
                                    className={`toggle-switch ${appearance.compactMode ? 'on' : ''}`}
                                    onClick={() => setAppearance({ ...appearance, compactMode: !appearance.compactMode })}
                                >
                                    <div className="toggle-thumb" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="settings-section">
                            <h3 className="settings-section-title">Security</h3>
                            <p className="settings-section-desc">Manage your password and session settings.</p>
                            <div className="security-info-card">
                                <Lock size={20} style={{ color: '#10b981' }} />
                                <div>
                                    <div className="toggle-label">JWT Session Active</div>
                                    <div className="toggle-desc">Your session token is valid for 30 days from last login.</div>
                                </div>
                            </div>
                            <div className="settings-form-grid mt-3">
                                <div className="form-group">
                                    <label className="form-label">Current Password</label>
                                    <input className="form-input" type="password" placeholder="••••••••" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">New Password</label>
                                    <input className="form-input" type="password" placeholder="Min. 8 characters" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Confirm Password</label>
                                    <input className="form-input" type="password" placeholder="Repeat new password" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="settings-footer-actions">
                        {saved && <span className="save-success-msg">✓ Changes saved!</span>}
                        <button className="btn btn-primary" onClick={handleSave}>
                            <Save size={16} /> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
