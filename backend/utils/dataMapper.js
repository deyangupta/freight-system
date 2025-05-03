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
        `INSERT INTO freight_rates (origin, destination, shipper, agent, pod, gp20, gp40, rate, carrier, type, remark1, remark2, remark3, transit_time)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
        [
          mappedRow.origin,
          mappedRow.destination,
          mappedRow.shipper,
          mappedRow.agent,
          mappedRow.pod,
          mappedRow.gp20,
          mappedRow.gp40,
          mappedRow.rate,
          mappedRow.carrier,
          mappedRow.type,
          mappedRow.remark1,
          mappedRow.remark2,
          mappedRow.remark3,
          mappedRow.transit_time,
        ]
      );
    }

    await client.query('COMMIT');
    const test = await client.query('SELECT * FROM freight_rates');
    return test.rows;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};