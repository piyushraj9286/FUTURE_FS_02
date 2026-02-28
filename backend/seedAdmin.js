const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedAdmin = async () => {
    try {
        await Admin.deleteMany();

        const admin = await Admin.create({
            email: 'admin@cosmic.com',
            password: 'password123',
        });

        console.log('Admin user seeded:', admin.email);
        console.log('Use password "password123" to login.');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
