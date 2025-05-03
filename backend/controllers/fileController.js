const fs = require('fs');
const XLSX = require('xlsx');
const { mapAndInsertData } = require('../utils/dataMapper');

exports.handleFileUpload = async (req, res) => {
  try {
    const mapping = JSON.parse(req.body.mapping);
    const filePath = req.file.path;

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    await mapAndInsertData(data, mapping);

    fs.unlinkSync(filePath);
    res.status(200).json({ message: 'File processed and data inserted successfully.' });
  } catch (error) {
    console.error('File processing error:', error);
    res.status(500).json({ error: 'Failed to process file' });
  }
};