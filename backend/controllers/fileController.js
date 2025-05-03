const fs = require('fs');
const XLSX = require('xlsx');
const { mapAndInsertData } = require('../utils/dataMapper');
const { getShipments } = require('../utils/getShipments');

exports.handleFileUpload = async (req, res) => {
  try {
    const mapping = JSON.parse(req.body.mapping);
    const filePath = req.file.path;

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const row = await mapAndInsertData(data, mapping);

    fs.unlinkSync(filePath);
    res.status(200).json({ message: 'File processed and data inserted successfully.', shipments : row });
  } catch (error) {
    console.error('File processing error:', error);
    res.status(500).json({ error: 'Failed to process file' });
  }
};

exports.getShipments = async (req, res) => {  
  try {
    const row = await getShipments();
    res.status(200).json({ message: 'data fetched successfully.', shipments : row });
  } catch (error) {
    console.error('database error:', error);
    res.status(500).json({ error: 'Failed to get records' });
  }
}