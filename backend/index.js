require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');
const { getShipments } = require('./controllers/fileController');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/files', fileRoutes);

app.get('/api/get-shipments', getShipments);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));