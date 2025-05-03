import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import ColumnMapper from './components/ColumnMapper';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [sheetData, setSheetData] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheet];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setSheetData(json);
      setColumns(Object.keys(json[0] || {}));
    };
    reader.readAsArrayBuffer(uploadedFile);
  };

  const handleMappingChange = (srcCol: string, mappedVal: string) => {
    setMapping((prev) => ({ ...prev, [srcCol]: mappedVal }));
  };

  const handleSubmit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('mapping', JSON.stringify(mapping));

    try {
      await axios.post('http://localhost:5001/api/files/upload', formData);
      alert('Upload successful!');
    } catch (err) {
      console.error(err);
      alert('Upload failed!');
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Freight Rate Import</h1>

      <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} className="mb-4" />

      {columns.length > 0 && (
        <>
          <ColumnMapper columns={columns} mapping={mapping} standerdColumn={[]} data={sheetData} onMappingChange={handleMappingChange} />
          <button onClick={handleSubmit} className="mt-4 bg-blue-600 px-4 py-2 rounded">
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default App;