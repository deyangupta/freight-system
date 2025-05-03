const { pool } = require('../config/db');

exports.getShipments = async () => {
  const client = await pool.connect();
  try {
    const response = await client.query('SELECT * FROM freight_rates');
    return response.rows;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};