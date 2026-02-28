import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Eye, Trash2, Plus } from 'lucide-react';
import AddLeadModal from '../components/AddLeadModal';

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => { fetchLeads(); }, []);

    const fetchLeads = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.get('/api/leads', config);
            setLeads(data);
        } catch (error) {
            console.error('Error fetching leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteLead = async (id) => {
        if (window.confirm('Are you sure you want to delete this lead?')) {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                await axios.delete(`/api/leads/${id}`, config);
                setLeads(leads.filter(lead => lead._id !== id));
            } catch (error) {
                console.error('Error deleting lead:', error);
            }
        }
    };

    const handleLeadAdded = (newLead) => {
        setLeads([newLead, ...leads]);
    };

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="page-container">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h1 className="page-title" style={{ marginBottom: '0.25rem' }}>Lead Management</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{leads.length} total leads in your pipeline</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={18} /> Add Lead
                </button>
            </div>

            {showAddModal && (
                <AddLeadModal
                    onClose={() => setShowAddModal(false)}
                    onLeadAdded={handleLeadAdded}
                />
            )}

            <div className="leads-list-glass glass-panel">
                <div className="controls-bar">
                    <div className="search-box">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-input search-input"
                        />
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        {filteredLeads.length} result{filteredLeads.length !== 1 ? 's' : ''}
                    </div>
                </div>

                {loading ? (
                    <div className="loading-state">Loading leads...</div>
                ) : (
                    <div className="table-container">
                        <table className="leads-table full-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Contact Info</th>
                                    <th>Status</th>
                                    <th>Source</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeads.length === 0 ? (
                                    <tr><td colSpan="6" className="empty-message">No leads found.</td></tr>
                                ) : (
                                    filteredLeads.map((lead) => (
                                        <tr key={lead._id}>
                                            <td>
                                                <div className="lead-name-col">
                                                    <div className="lead-avatar" style={{ background: `hsl(${lead.name.charCodeAt(0) * 5 % 360},60%,50%)` }}>{lead.name.charAt(0)}</div>
                                                    <div className="lead-details">
                                                        <span className="name-text">{lead.name}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="contact-col">
                                                    <span>{lead.email || 'N/A'}</span>
                                                    <span className="phone-text">{lead.phone || 'N/A'}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge badge-${lead.status.toLowerCase()}`}>{lead.status}</span>
                                            </td>
                                            <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{lead.source}</td>
                                            <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <div className="actions-col">
                                                    <Link to={`/leads/${lead._id}`} className="icon-action-btn view-btn"><Eye size={18} /></Link>
                                                    <button onClick={() => deleteLead(lead._id)} className="icon-action-btn delete-btn"><Trash2 size={18} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leads;
