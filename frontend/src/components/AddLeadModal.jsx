import { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const AddLeadModal = ({ onClose, onLeadAdded }) => {
    const [form, setForm] = useState({
        name: '', email: '', phone: '', source: 'Portfolio Contact Form', status: 'New', message: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name) { setError('Name is required.'); return; }
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.post('/api/leads', form, config);
            onLeadAdded(data);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add lead.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box glass-panel" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add New Lead</h2>
                    <button className="modal-close" onClick={onClose}><X size={20} /></button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="modal-grid">
                        <div className="form-group">
                            <label className="form-label">Full Name *</label>
                            <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            <input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 555 0000" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Source</label>
                            <select className="form-input" name="source" value={form.source} onChange={handleChange}>
                                <option>Portfolio Contact Form</option>
                                <option>LinkedIn Referral</option>
                                <option>Twitter/X</option>
                                <option>GitHub Profile</option>
                                <option>Direct Email</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <select className="form-input" name="status" value={form.status} onChange={handleChange}>
                                <option>New</option>
                                <option>Contacted</option>
                                <option>Converted</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <label className="form-label">Message / Notes</label>
                        <textarea className="form-input" name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Initial message from lead..." />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Lead'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLeadModal;
