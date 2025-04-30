require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Database Connected"))
  .catch(err => console.error("❌ Database Connection Failed", err));

const UserRouter = require('./routes/userRoutes');
app.use('/user', UserRouter);

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
