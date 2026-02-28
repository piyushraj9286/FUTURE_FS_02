import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Send, Calendar, Navigation } from 'lucide-react';

const LeadDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newNote, setNewNote] = useState('');
    const [statusUpdating, setStatusUpdating] = useState(false);

    useEffect(() => {
        fetchLead();
    }, [id]);

    const fetchLead = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.get(`/api/leads/${id}`, config);
            setLead(data);
        } catch (error) {
            console.error('Error fetching lead details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatusUpdating(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.put(`/api/leads/${id}`, { status: newStatus }, config);
            setLead({ ...lead, status: data.status });
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setStatusUpdating(false);
        }
    };

    const handleNoteSubmit = async (e) => {
        e.preventDefault();
        if (!newNote.trim()) return;

        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.put(`/api/leads/${id}`, { note: newNote }, config);
            setLead(data);
            setNewNote('');
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    if (loading) return <div className="page-container">Loading lead details...</div>;
    if (!lead) return <div className="page-container">Lead not found</div>;

    return (
        <div className="page-container">
            <div className="lead-header-actions">
                <button onClick={() => navigate('/leads')} className="back-btn">
                    <ArrowLeft size={18} /> Back to Leads
                </button>
            </div>

            <div className="lead-grid">
                <div className="lead-main-info glass-panel">
                    <div className="profile-header">
                        <div className="large-avatar">{lead.name.charAt(0)}</div>
                        <div>
                            <h2>{lead.name}</h2>
                            <p className="lead-subtitle">Added on {new Date(lead.createdAt).toLocaleDateString()}</p>
                        </div>

                        <div className="status-selector ms-auto">
                            <select
                                value={lead.status}
                                onChange={handleStatusChange}
                                disabled={statusUpdating}
                                className={`status-select ${lead.status.toLowerCase()}`}
                            >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Converted">Converted</option>
                            </select>
                        </div>
                    </div>

                    <div className="contact-details-grid">
                        <div className="detail-item">
                            <span className="label">Email Address</span>
                            <span className="value">{lead.email || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Phone Number</span>
                            <span className="value">{lead.phone || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Lead Source</span>
                            <span className="value">{lead.source}</span>
                        </div>
                    </div>

                    {lead.message && (
                        <div className="initial-message">
                            <h4>Initial Message</h4>
                            <p>{lead.message}</p>
                        </div>
                    )}
                </div>

                <div className="lead-notes glass-panel">
                    <h3>Activity & Notes</h3>

                    <div className="notes-list">
                        {lead.notes && lead.notes.length > 0 ? (
                            lead.notes.map((note, index) => (
                                <div key={index} className="note-card">
                                    <div className="note-date">
                                        {new Date(note.date).toLocaleString()}
                                    </div>
                                    <div className="note-text">{note.text}</div>
                                </div>
                            ))
                        ) : (
                            <p className="empty-notes">No notes added yet.</p>
                        )}
                    </div>

                    <form onSubmit={handleNoteSubmit} className="add-note-form">
                        <textarea
                            className="form-input"
                            rows="3"
                            placeholder="Add a note about this lead..."
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary" disabled={!newNote.trim()}>
                            <Send size={16} /> Add Note
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LeadDetails;
