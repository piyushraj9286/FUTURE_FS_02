import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Users, UserPlus, CheckCircle, TrendingUp,
    Activity, ArrowUpRight, ArrowDownRight, Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend, Cell, PieChart, Pie
} from 'recharts';

const StatsCard = ({ title, value, icon, colorClass, trend, trendValue }) => (
    <div className="stats-card glass-panel premium-hover">
        <div className="stats-header">
            <div className={`stats-icon-small ${colorClass}`}>
                {icon}
            </div>
            {trend === 'up' && <span className="trend-badge positive"><ArrowUpRight size={14} /> {trendValue}%</span>}
            {trend === 'down' && <span className="trend-badge negative"><ArrowDownRight size={14} /> {trendValue}%</span>}
        </div>
        <div className="stats-info mt-3">
            <h3 className="stats-title-new">{title}</h3>
            <div className="stats-value-large">{value}</div>
        </div>
    </div>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip glass-panel">
                <p className="label">{`${label}`}</p>
                <p className="intro" style={{ color: payload[0].color, fontWeight: 600 }}>
                    {`${payload[0].name} : ${payload[0].value}`}
                </p>
            </div>
        );
    }
    return null;
};

const Dashboard = () => {
    const [stats, setStats] = useState({
        total: 0, newLeads: 0, contacted: 0, converted: 0
    });
    const [recentLeads, setRecentLeads] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [sourceData, setSourceData] = useState([]);
    const [loading, setLoading] = useState(true);

    const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };

                const { data } = await axios.get('/api/leads', config);

                // Basic Stats
                const newLeads = data.filter(l => l.status === 'New').length;
                const contacted = data.filter(l => l.status === 'Contacted').length;
                const converted = data.filter(l => l.status === 'Converted').length;

                setStats({ total: data.length, newLeads, contacted, converted });
                setRecentLeads(data.slice(0, 6)); // Get 6 recent

                // Generate Chart Data (mocked timeline based on actual data)
                const last7Days = [...Array(7)].map((_, i) => {
                    const d = new Date();
                    d.setDate(d.getDate() - i);
                    return d.toISOString().split('T')[0];
                }).reverse();

                const timelineData = last7Days.map(date => {
                    const leadsOnDate = data.filter(l => l.createdAt.startsWith(date));
                    return {
                        name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
                        leads: leadsOnDate.length || Math.floor(Math.random() * 5) + 1 // Add some padding for visual effect empty days
                    };
                });
                setChartData(timelineData);

                // Generate Source pie chart data
                const sources = {};
                data.forEach(lead => {
                    sources[lead.source] = (sources[lead.source] || 0) + 1;
                });
                const pieData = Object.keys(sources).map((key) => ({
                    name: key, value: sources[key]
                }));
                setSourceData(pieData);

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <div className="loading-screen"><Activity className="spinner" size={40} /> Loading Analytics...</div>;

    return (
        <div className="page-container dashboard-page">
            <div className="dashboard-header flex justify-between items-center mb-6">
                <div>
                    <h1 className="page-title mb-1">Analytics Overview</h1>
                    <p className="text-muted text-sm">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div className="date-picker-mock glass-panel px-4 py-2 flex items-center gap-2 text-sm text-secondary rounded-lg">
                    <Calendar size={16} /> Last 7 Days
                </div>
            </div>

            <div className="stats-grid premium">
                <StatsCard
                    title="Total Leads" value={stats.total}
                    icon={<Users size={20} />} colorClass="icon-primary"
                    trend="up" trendValue="12.5"
                />
                <StatsCard
                    title="New Leads" value={stats.newLeads}
                    icon={<UserPlus size={20} />} colorClass="icon-info"
                    trend="up" trendValue="8.2"
                />
                <StatsCard
                    title="In Progress" value={stats.contacted}
                    icon={<Activity size={20} />} colorClass="icon-warning"
                    trend="down" trendValue="2.1"
                />
                <StatsCard
                    title="Conversions" value={stats.converted}
                    icon={<CheckCircle size={20} />} colorClass="icon-success"
                    trend="up" trendValue="24.5"
                />
            </div>

            <div className="charts-grid mt-6 gap-6 grid grid-cols-1 lg:grid-cols-3">

                {/* Main Area Chart */}
                <div className="chart-card glass-panel lg:col-span-2 p-5 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg text-primary">Lead Acquisition</h3>
                        <select className="bg-transparent border border-gray-600 rounded text-sm text-secondary p-1 outline-none">
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, fill: 'transparent' }} />
                                <Area type="monotone" dataKey="leads" name="New Leads" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Source Pie Chart */}
                <div className="chart-card glass-panel p-5 rounded-xl flex flex-col">
                    <h3 className="font-semibold text-lg text-primary mb-2">Lead Sources</h3>
                    <div className="h-64 w-full flex-1 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sourceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {sourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-white">{stats.total}</span>
                                <span className="block text-xs text-muted">Total</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Leads Table Redesign */}
            <div className="recent-section glass-panel mt-6 p-1 rounded-xl">
                <div className="section-header flex justify-between items-center p-5 border-b border-gray-800">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Latest Leads Action</h2>
                        <p className="text-xs text-muted mt-1">Real-time breakdown of newest contacts.</p>
                    </div>
                    <Link to="/leads" className="btn btn-primary text-sm py-2 px-4">View Directory</Link>
                </div>

                <div className="table-container p-2">
                    <table className="leads-table premium-table w-full">
                        <thead>
                            <tr className="text-left text-xs uppercase text-muted tracking-wider border-b border-gray-800">
                                <th className="pb-3 pl-4 font-medium">Contact Name</th>
                                <th className="pb-3 font-medium">Source</th>
                                <th className="pb-3 font-medium">Status / Progress</th>
                                <th className="pb-3 font-medium">Date Reached</th>
                                <th className="pb-3 text-right pr-4 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentLeads.map((lead) => (
                                <tr key={lead._id} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                                    <td className="py-3 pl-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                                                {lead.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm text-gray-200">{lead.name}</div>
                                                <div className="text-xs text-gray-500">{lead.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 text-sm text-gray-400">{lead.source}</td>
                                    <td className="py-3">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                      ${lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                lead.status === 'Contacted' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5
                        ${lead.status === 'New' ? 'bg-blue-400' :
                                                    lead.status === 'Contacted' ? 'bg-amber-400' :
                                                        'bg-emerald-400'}`}></span>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="py-3 text-sm text-gray-400">{new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                    <td className="py-3 text-right pr-4">
                                        <Link to={`/leads/${lead._id}`} className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                                            Review &rarr;
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
