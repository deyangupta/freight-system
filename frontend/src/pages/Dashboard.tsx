import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { STANDARD_COLUMNS } from '../constants';
import Header from '../components/Header';
import Table from '../components/Table';
import FileUploadModal from '../components/UploadModal'; // ✅ Imported new modal component

const Dashboard: React.FC = () => {
  const [user] = useState('John');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [sheetData, setSheetData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/get-shipments');
        const { shipments } = response.data;
        setData(shipments);
      } catch (error) {
        console.error('Error fetching shipments:', error);
      }
    };

    fetchShipments();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setFileUploaded(true);

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
    if (mappedVal === 'Ignore') {
      setColumns((prev) => prev.filter((col) => col !== srcCol));
      return;
    }
    setMapping((prev) => ({ ...prev, [srcCol]: mappedVal }));
  };

  const handleSubmit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('mapping', JSON.stringify(mapping));

    try {
      const response = await axios.post('http://localhost:5001/api/files/upload', formData);
      const { shipments } = response.data;
      setData(shipments);
      setFile(null);
      alert('Upload successful!');
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert('Upload failed!');
    }
  };

  return (
    <div className="min-h-screen bg-[#d5d4c8] text-black p-6 relative">
      <Header user={user} showDropdown={showDropdown} setShowDropdown={setShowDropdown} />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Quotes</h2>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center border border-gray-400 rounded px-4 py-2 text-sm bg-white hover:bg-gray-100"
        >
          📁 Import file
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <Table columns={STANDARD_COLUMNS} data={data} />

      {showModal && (
        <FileUploadModal
          file={file}
          fileUploaded={fileUploaded}
          columns={columns}
          mapping={mapping}
          sheetData={sheetData}
          setShowModal={setShowModal}
          setFile={setFile}
          fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
          handleFileUpload={handleFileUpload}
          handleMappingChange={handleMappingChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Dashboard;