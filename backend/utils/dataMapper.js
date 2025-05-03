const { pool } = require('../config/db');

exports.mapAndInsertData = async (data, mapping) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (const row of data) {
      const mappedRow = {};
      for (const [srcCol, destCol] of Object.entries(mapping)) {
        mappedRow[destCol] = row[srcCol] || null;
      }

      await client.query(
        `INSERT INTO freight_rates (origin, destination, rate, carrier, transit_time)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          mappedRow.origin,
          mappedRow.destination,
          mappedRow.rate,
          mappedRow.carrier,
          mappedRow.transit_time,
        ]
      );
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};