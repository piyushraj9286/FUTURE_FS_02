import { Link } from 'react-router-dom';
import {
    ArrowRight, Sparkles, Shield, Zap, Database,
    Users, TrendingUp, BarChart2, CheckCircle, Star,
    ChevronRight, Activity
} from 'lucide-react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-wrapper">

            {/* NAV */}
            <nav className="home-navbar">
                <div className="nav-logo">Cosmic<span>CRM</span></div>
                <div className="nav-links">
                    <a href="#features" className="nav-link">Features</a>
                    <a href="#stats" className="nav-link">Analytics</a>
                    <a href="#testimonials" className="nav-link">Reviews</a>
                    <Link to="/login" className="btn-nav-outline">Sign In</Link>
                    <Link to="/login" className="btn-nav-primary">Get Started <ArrowRight size={16} /></Link>
                </div>
            </nav>

            {/* HERO */}
            <section className="hero">
                <div className="hero-badge">
                    <Sparkles size={14} /> Trusted by 500+ Agencies
                </div>
                <h1 className="hero-heading">
                    Manage Every Lead.<br />
                    <span className="gradient-text">Close Every Deal.</span>
                </h1>
                <p className="hero-desc">
                    Cosmic CRM is the command center for your client pipeline—beautifully designed, lightning fast, and built for professionals who never miss a follow-up.
                </p>
                <div className="hero-actions">
                    <Link to="/login" className="btn-hero-primary">
                        Launch Dashboard <ArrowRight size={18} />
                    </Link>
                    <a href="#features" className="btn-hero-ghost">
                        See How It Works <ChevronRight size={16} />
                    </a>
                </div>
                <div className="hero-trust">
                    <div className="trust-avatars">
                        {['E', 'M', 'S', 'D', 'J'].map((l, i) => (
                            <div key={i} className="trust-avatar" style={{ background: `hsl(${i * 40 + 200},70%,55%)` }}>{l}</div>
                        ))}
                    </div>
                    <p><span>2,000+</span> leads managed this month</p>
                </div>

                {/* STATS STRIP */}
                <div className="hero-stats-strip" id="stats">
                    <div className="stat-item">
                        <span className="stat-num">98%</span>
                        <span className="stat-label">Client Satisfaction</span>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <span className="stat-num">3x</span>
                        <span className="stat-label">Faster Follow-ups</span>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <span className="stat-num">45%</span>
                        <span className="stat-label">Higher Conversion</span>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <span className="stat-num">24/7</span>
                        <span className="stat-label">Activity Tracking</span>
                    </div>
                </div>

                {/* FLOATING DASHBOARD MOCKUP */}
                <div className="dashboard-mockup">
                    <div className="mockup-topbar">
                        <div className="mockup-dots">
                            <span className="mdot mdot-red" /><span className="mdot mdot-yellow" /><span className="mdot mdot-green" />
                        </div>
                        <div className="mockup-title">CosmicCRM Dashboard</div>
                    </div>
                    <div className="mockup-body">
                        <div className="mockup-sidebar">
                            {['Dashboard', 'Leads', 'Pipeline', 'Analytics'].map((item, i) => (
                                <div key={i} className={`mockup-nav-item ${i === 0 ? 'active' : ''}`}>{item}</div>
                            ))}
                        </div>
                        <div className="mockup-content">
                            <div className="mockup-cards">
                                {[['Total Leads', '247', '#3b82f6'], ['Converted', '89', '#10b981'], ['Pipeline', '56', '#f59e0b']].map(([label, val, color], i) => (
                                    <div key={i} className="mockup-card" style={{ borderTopColor: color }}>
                                        <div className="mockup-card-val" style={{ color }}>{val}</div>
                                        <div className="mockup-card-label">{label}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="mockup-chart-area">
                                <div className="mockup-chart-bars">
                                    {[60, 80, 45, 90, 70, 100, 65].map((h, i) => (
                                        <div key={i} className="mockup-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="features-wrap" id="features">
                <div className="section-head">
                    <div className="section-tag">Core Features</div>
                    <h2 className="section-heading">Everything You Need to <span className="gradient-text">Scale</span></h2>
                    <p className="section-sub">From first contact to closed deal — track it all in one place.</p>
                </div>
                <div className="features-list">
                    {[
                        { icon: <Users size={24} />, title: 'Smart Lead Management', desc: 'Capture, organize and prioritize leads automatically from your portfolio contact form.', color: '#3b82f6' },
                        { icon: <Activity size={24} />, title: 'Live Pipeline View', desc: 'Drag-and-drop Kanban board to visualize exactly where every deal stands in your pipeline.', color: '#8b5cf6' },
                        { icon: <TrendingUp size={24} />, title: 'Analytics & Reports', desc: 'Beautiful charts and reports to help you understand your conversion rates and improve results.', color: '#10b981' },
                        { icon: <Shield size={24} />, title: 'Enterprise Security', desc: 'JWT-based sessions and bcrypt-hashed passwords keep your business data fully protected.', color: '#f59e0b' },
                        { icon: <Zap size={24} />, title: 'Instant Notifications', desc: 'Real-time alerts for new leads, status changes, and upcoming follow-ups on your dashboard.', color: '#ef4444' },
                        { icon: <Database size={24} />, title: 'MERN Stack Power', desc: 'Built on MongoDB, Express, React, and Node.js — a battle-tested, high-performance stack.', color: '#06b6d4' },
                    ].map(({ icon, title, desc, color }, i) => (
                        <div className="feature-tile glass-card" key={i}>
                            <div className="feature-tile-icon" style={{ background: `${color}18`, color }}>{icon}</div>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* PIPELINE PREVIEW */}
            <section className="pipeline-preview-section">
                <div className="pipeline-text">
                    <div className="section-tag">Visual Pipeline</div>
                    <h2 className="section-heading">Your Deals, <span className="gradient-text">Always in Sight</span></h2>
                    <p className="section-sub">See every lead's journey from initial contact to closed deal – organized in a slick Kanban board.</p>
                    <ul className="pipeline-benefits">
                        {['Track deal status at a glance', 'Drag & drop between stages', 'Add notes and follow-up dates', 'Filter by source or status'].map((b, i) => (
                            <li key={i}><CheckCircle size={18} color="#10b981" /> {b}</li>
                        ))}
                    </ul>
                    <Link to="/login" className="btn-hero-primary" style={{ display: 'inline-flex', marginTop: '2rem' }}>
                        Try Pipeline View <ArrowRight size={18} />
                    </Link>
                </div>
                <div className="pipeline-board-mockup glass-card">
                    {[
                        { col: 'New', color: '#3b82f6', leads: ['Emily Chen', 'David Lee'] },
                        { col: 'Contacted', color: '#f59e0b', leads: ['Marcus J.', 'Olivia B.'] },
                        { col: 'Converted', color: '#10b981', leads: ['Sarah W.', 'Chris E.'] },
                    ].map(({ col, color, leads }, i) => (
                        <div key={i} className="pipeline-col">
                            <div className="pipeline-col-header" style={{ borderTopColor: color }}>
                                <span className="pipeline-col-title">{col}</span>
                                <span className="pipeline-col-count" style={{ background: `${color}20`, color }}>{leads.length}</span>
                            </div>
                            {leads.map((name, j) => (
                                <div key={j} className="pipeline-lead-card">
                                    <div className="pipeline-lead-avatar" style={{ background: `hsl(${i * 60 + j * 30 + 200},70%,55%)` }}>{name.charAt(0)}</div>
                                    <span>{name}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="testimonials-section" id="testimonials">
                <div className="section-head">
                    <div className="section-tag">Testimonials</div>
                    <h2 className="section-heading">Loved by <span className="gradient-text">Freelancers</span></h2>
                </div>
                <div className="testimonials-grid">
                    {[
                        { name: 'Sarah K.', role: 'UI/UX Designer', text: 'CosmicCRM changed how I manage my portfolio leads. I used to lose clients — now I never miss a follow-up.', stars: 5 },
                        { name: 'Alex M.', role: 'Full-Stack Developer', text: 'The pipeline view alone is worth it. I can see exactly where all my deals are. Absolutely love the dark theme!', stars: 5 },
                        { name: 'Nina P.', role: 'Product Designer', text: 'Setup was less than 10 minutes and it works perfectly with my existing contact form. Super impressed.', stars: 5 },
                    ].map(({ name, role, text, stars }, i) => (
                        <div key={i} className="testimonial-card glass-card">
                            <div className="stars">
                                {[...Array(stars)].map((_, j) => <Star key={j} size={16} fill="#f59e0b" color="#f59e0b" />)}
                            </div>
                            <p className="testimonial-text">"{text}"</p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">{name.charAt(0)}</div>
                                <div>
                                    <div className="t-name">{name}</div>
                                    <div className="t-role">{role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA BANNER */}
            <section className="cta-section">
                <div className="cta-glow" />
                <h2>Ready to Build Your Pipeline?</h2>
                <p>Login and start managing your leads like a pro — in under 2 minutes.</p>
                <Link to="/login" className="btn-hero-primary">
                    Open Dashboard <ArrowRight size={18} />
                </Link>
            </section>

            {/* FOOTER */}
            <footer className="home-footer-new">
                <div className="footer-logo">Cosmic<span>CRM</span></div>
                <p>© {new Date().getFullYear()} CosmicCRM. Built for portfolio professionals.</p>
            </footer>
        </div>
    );
};

export default Home;
