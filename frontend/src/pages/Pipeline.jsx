import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

const STATUSES = ['New', 'Contacted', 'Converted'];

const STATUS_CONFIG = {
    New: { color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.3)' },
    Contacted: { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)' },
    Converted: { color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.3)' },
};

const Pipeline = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dragging, setDragging] = useState(null);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.get('/api/leads', config);
            setLeads(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDragStart = (lead) => setDragging(lead);

    const handleDrop = async (status) => {
        if (!dragging || dragging.status === status) return;
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`/api/leads/${dragging._id}`, { status }, config);
            setLeads(prev => prev.map(l => l._id === dragging._id ? { ...l, status } : l));
        } catch (err) {
            console.error(err);
        } finally {
            setDragging(null);
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    const getLeadsByStatus = (status) => leads.filter(l => l.status === status);

    if (loading) return <div className="page-container">Loading pipeline...</div>;

    return (
        <div className="page-container">
            <div className="pipeline-page-header">
                <div>
                    <h1 className="page-title" style={{ marginBottom: '0.25rem' }}>Lead Pipeline</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        Drag &amp; drop leads between stages to update their status.
                    </p>
                </div>
                <div className="pipeline-total-badge">
                    {leads.length} total leads
                </div>
            </div>

            <div className="pipeline-board">
                {STATUSES.map(status => {
                    const cfg = STATUS_CONFIG[status];
                    const colLeads = getLeadsByStatus(status);
                    return (
                        <div
                            key={status}
                            className="pipeline-column"
                            onDrop={() => handleDrop(status)}
                            onDragOver={handleDragOver}
                        >
                            <div className="pipeline-column-header" style={{ borderTopColor: cfg.color }}>
                                <div className="pipeline-column-title-row">
                                    <span className="pipeline-column-title">{status}</span>
                                    <span
                                        className="pipeline-column-badge"
                                        style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
                                    >
                                        {colLeads.length}
                                    </span>
                                </div>
                            </div>

                            <div className="pipeline-cards-list">
                                {colLeads.length === 0 && (
                                    <div className="pipeline-empty">
                                        Drop leads here
                                    </div>
                                )}
                                {colLeads.map(lead => (
                                    <div
                                        key={lead._id}
                                        className={`pipeline-card glass-panel ${dragging?._id === lead._id ? 'dragging' : ''}`}
                                        draggable
                                        onDragStart={() => handleDragStart(lead)}
                                        onDragEnd={() => setDragging(null)}
                                    >
                                        <div className="pipeline-card-top">
                                            <div
                                                className="pipeline-card-avatar"
                                                style={{ background: `hsl(${lead.name.charCodeAt(0) * 5 % 360},60%,50%)` }}
                                            >
                                                {lead.name.charAt(0)}
                                            </div>
                                            <div className="pipeline-card-info">
                                                <div className="pipeline-card-name">{lead.name}</div>
                                                <div className="pipeline-card-email">{lead.email || 'No email'}</div>
                                            </div>
                                        </div>

                                        <div className="pipeline-card-meta">
                                            <span className="pipeline-card-source">{lead.source}</span>
                                            {lead.notes?.length > 0 && (
                                                <span className="pipeline-card-notes">{lead.notes.length} note{lead.notes.length > 1 ? 's' : ''}</span>
                                            )}
                                        </div>

                                        <div className="pipeline-card-footer">
                                            <span className="pipeline-card-date">
                                                {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </span>
                                            <Link
                                                to={`/leads/${lead._id}`}
                                                className="pipeline-card-view"
                                                onClick={e => e.stopPropagation()}
                                            >
                                                <Eye size={14} /> View
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Pipeline;
