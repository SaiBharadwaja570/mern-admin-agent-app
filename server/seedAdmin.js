const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  try {
    const existing = await Admin.findOne({ email: 'saibharadwaja1000@gmail.com' });
    if (existing) {
      console.log('Admin already exists');
    } else {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = new Admin({
        email: 'saibharadwaja1000@gmail.com',
        password: hashedPassword
      });
      await admin.save();
      console.log('✅ Admin user created successfully');
    }
    process.exit();
  } catch (err) {
    console.error('❌ Error creating admin:', err);
    process.exit(1);
  }
});
