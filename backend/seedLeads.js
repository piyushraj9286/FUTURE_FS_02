const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Lead = require('./models/Lead');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const sampleLeads = [
    {
        name: 'Emily Chen',
        email: 'emily.chen@example.com',
        phone: '555-0101',
        source: 'Portfolio Contact Form',
        status: 'New',
        message: 'I saw your futuristic portfolio and would love to hire you for a frontend project.',
        notes: [{ text: 'Initial contact via website', date: new Date(Date.now() - 86400000 * 2) }],
        createdAt: new Date(Date.now() - 86400000 * 2)
    },
    {
        name: 'Marcus Johnson',
        email: 'marcus.j@example.com',
        phone: '555-0102',
        source: 'LinkedIn Referral',
        status: 'Contacted',
        message: 'Looking for a full-stack developer to build a SaaS MVP.',
        notes: [{ text: 'Scheduled a discovery call for next Tuesday', date: new Date(Date.now() - 86400000) }],
        createdAt: new Date(Date.now() - 86400000 * 5)
    },
    {
        name: 'Sarah Williams',
        email: 'swilliams@techcorp.com',
        phone: '555-0103',
        source: 'Portfolio Contact Form',
        status: 'Converted',
        message: 'We need a React expert to revamp our internal dashboard.',
        notes: [
            { text: 'Sent proposal', date: new Date(Date.now() - 86400000 * 10) },
            { text: 'Contract signed! Starting project next week.', date: new Date(Date.now() - 86400000 * 2) }
        ],
        createdAt: new Date(Date.now() - 86400000 * 15)
    },
    {
        name: 'David Lee',
        email: 'david.lee.design@example.com',
        phone: '555-0104',
        source: 'Twitter/X',
        status: 'New',
        message: 'Love your UI animations! Can we collaborate on a client project?',
        createdAt: new Date(Date.now() - 86400000 * 1)
    },
    {
        name: 'Jessica Taylor',
        email: 'jtaylor@startup.io',
        phone: '555-0105',
        source: 'Portfolio Contact Form',
        status: 'Contacted',
        message: 'We are building a Web3 platform and need a futuristic landing page.',
        notes: [{ text: 'Emailed portfolio examples and pricing sheet.', date: new Date() }],
        createdAt: new Date(Date.now() - 86400000 * 3)
    },
    {
        name: 'Alex Martinez',
        email: 'alex.m@example.com',
        phone: '555-0106',
        source: 'GitHub Profile',
        status: 'New',
        message: 'Saw your open source contributions. Are you available for freelance work?',
        createdAt: new Date()
    },
    {
        name: 'Rachel Green',
        email: 'rachel@fashiontech.com',
        phone: '555-0107',
        source: 'Portfolio Contact Form',
        status: 'Converted',
        message: 'Need an e-commerce site with a highly interactive 3D product viewer.',
        notes: [{ text: 'Project completed successfully.', date: new Date(Date.now() - 86400000 * 30) }],
        createdAt: new Date(Date.now() - 86400000 * 60)
    },
    {
        name: 'Tom Wilson',
        email: 'twilson@logistics.net',
        phone: '555-0108',
        source: 'Direct Email',
        status: 'Contacted',
        message: 'Looking to rebuild our legacy CRM system.',
        notes: [{ text: 'Waiting for their technical requirements document.', date: new Date(Date.now() - 86400000 * 4) }],
        createdAt: new Date(Date.now() - 86400000 * 7)
    },
    {
        name: 'Nina Patel',
        email: 'nina.patel@example.com',
        phone: '555-0109',
        source: 'Portfolio Contact Form',
        status: 'New',
        message: 'Can you help us build a responsive React Native app?',
        createdAt: new Date(Date.now() - 86400000 * 0.5)
    },
    {
        name: 'Chris Evans',
        email: 'chris.e@agency.com',
        phone: '555-0110',
        source: 'LinkedIn Referral',
        status: 'Converted',
        message: 'Need extra hands for a 3-month contract building a fintech dashboard.',
        notes: [{ text: 'Onboarded as contractor.', date: new Date(Date.now() - 86400000 * 45) }],
        createdAt: new Date(Date.now() - 86400000 * 50)
    },
    {
        name: 'Olivia Brown',
        email: 'olivia.b@example.com',
        phone: '555-0111',
        source: 'Portfolio Contact Form',
        status: 'Contacted',
        message: 'We loved your sleek dark mode design. How much for a similar 5-page site?',
        notes: [{ text: 'Sent estimated quote of $3k-$5k.', date: new Date(Date.now() - 86400000) }],
        createdAt: new Date(Date.now() - 86400000 * 3)
    },
    {
        name: 'Daniel Garcia',
        email: 'dgarcia@example.com',
        phone: '555-0112',
        source: 'Twitter/X',
        status: 'New',
        message: 'Do you offer mentorship or code reviews?',
        createdAt: new Date(Date.now() - 86400000 * 1.5)
    },
    {
        name: 'Sophia Davis',
        email: 'sophia.d@innovate.io',
        phone: '555-0113',
        source: 'Portfolio Contact Form',
        status: 'Converted',
        message: 'We need an interactive map visualization dashboard.',
        notes: [{ text: 'Final payment received.', date: new Date(Date.now() - 86400000 * 10) }],
        createdAt: new Date(Date.now() - 86400000 * 40)
    },
    {
        name: 'Michael Clark',
        email: 'mclark@example.com',
        phone: '555-0114',
        source: 'Direct Email',
        status: 'Contacted',
        message: 'Urgent task: fix a bugs in our existing React application.',
        notes: [{ text: 'Requested access to their GitHub repo to review the codebase first.', date: new Date(Date.now() - 10000000) }],
        createdAt: new Date(Date.now() - 86400000 * 2)
    },
    {
        name: 'Ava Rodriguez',
        email: 'ava.r@example.com',
        phone: '555-0115',
        source: 'Portfolio Contact Form',
        status: 'New',
        message: 'Interested in a modern website redesign for our bakery.',
        createdAt: new Date(Date.now() - 86400000 * 0.2)
    },
    {
        name: 'James Lewis',
        email: 'jlewis@enterprise.com',
        phone: '555-0116',
        source: 'LinkedIn Referral',
        status: 'Contacted',
        message: 'Looking for a consultant to advise on frontend architecture.',
        notes: [{ text: 'Had initial 30min intro call. They will discuss internally and get back to me.', date: new Date(Date.now() - 86400000 * 5) }],
        createdAt: new Date(Date.now() - 86400000 * 8)
    },
    {
        name: 'Isabella Young',
        email: 'isabella.y@example.com',
        phone: '555-0117',
        source: 'Portfolio Contact Form',
        status: 'Converted',
        message: 'Need a custom WordPress theme developed from Figma designs.',
        notes: [{ text: 'Theme deployed to production.', date: new Date(Date.now() - 86400000 * 20) }],
        createdAt: new Date(Date.now() - 86400000 * 35)
    },
    {
        name: 'William King',
        email: 'wking@example.com',
        phone: '555-0118',
        source: 'GitHub Profile',
        status: 'New',
        message: 'Saw your Node.js backend repo. Do you have time to build a custom API for us?',
        createdAt: new Date(Date.now() - 86400000 * 1.8)
    },
    {
        name: 'Mia Wright',
        email: 'mia.wright@example.com',
        phone: '555-0119',
        source: 'Twitter/X',
        status: 'Contacted',
        message: 'How long would a Next.js migration take for a medium-sized blog?',
        notes: [{ text: 'Asked for their current tech stack and traffic volume.', date: new Date(Date.now() - 86400000 * 2) }],
        createdAt: new Date(Date.now() - 86400000 * 4)
    },
    {
        name: 'Benjamin Scott',
        email: 'bscott@example.com',
        phone: '555-0120',
        source: 'Portfolio Contact Form',
        status: 'New',
        message: 'Just saying hi! Love the anti-gravity theme of your website.',
        createdAt: new Date(Date.now() - 86400000 * 0.1)
    }
];

const seedLeads = async () => {
    try {
        await Lead.deleteMany(); // Clear existing leads first
        await Lead.insertMany(sampleLeads);

        console.log('20 Sample Leads seeded successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedLeads();
