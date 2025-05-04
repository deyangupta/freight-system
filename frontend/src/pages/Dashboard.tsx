import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import ColumnMapper from '../components/ColumnMapper';
import { STANDARD_COLUMNS } from '../constants';
import Header from '../components/Header';
import Table from '../components/Table';

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
        console.log('Response:', response.data);
        const { shipments } = response.data;
        setData(shipments);
      } catch (error) {
        console.error('Error fetching shipments:', error);
      }
    };

    fetchShipments();
  }, [])

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
      console.log('deyan test json', json)
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
      console.log('Response:', response.data);
      const { shipments } = response.data;
      setData(shipments);
      setFile(null)
      alert('Upload successful!');
      setShowModal(false)
    } catch (err) {
      console.error(err);
      alert('Upload failed!');
    }
  };

  return (
    <div className="min-h-screen bg-[#d5d4c8] text-black p-6 relative">
      {/* Header */}
      <Header user={user} showDropdown={showDropdown} setShowDropdown={setShowDropdown}/>

      {/* Title + Import File Button */}
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

      {/* Table */}
      <Table
        columns={STANDARD_COLUMNS}
        data={data} 
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className={`bg-white rounded-lg p-6 w-full ${fileUploaded ? '' : 'max-w-lg'} max-h-[90vh] overflow-y-auto`}>
            <h3 className="text-lg font-semibold mb-4">Upload Necessary documents</h3>

            { !fileUploaded && <div
              onClick={() => fileInputRef.current?.click()}
              className="border-dashed border-2 border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50"
            >
              <svg
                className="w-12 h-12 text-blue-500 mb-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <p className="text-sm">Click or drag file to this area to upload</p>
              <p className="text-xs text-gray-500 mt-1">Please upload all necessary permits and certificates for this customer. Ensure files are in PDF format for optimal compatibility.</p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>}

            {/* File list */}
            <div className="mt-4">
              <h4 className="font-medium text-sm mb-1">Uploaded Files</h4>
              <div className="bg-gray-100 px-4 py-2 rounded text-sm">
                {fileUploaded && file ? file.name : '📄 No File Uploaded yet'}
              </div>
            </div>
            {/* Column Mapper */}
            <div className='mb-10'>
              {fileUploaded && (
                <ColumnMapper
                  columns={columns}
                  mapping={mapping}
                  data= {sheetData}
                  standardColumn={STANDARD_COLUMNS}
                  onMappingChange={handleMappingChange}
                />
              )}
            </div>

            {/* Submit Button */}

            {/* Buttons */}
            <div className="sticky bottom-0 left-0 right-0 bg-white flex justify-end mt-6 space-x-2 p-4 shadow-md">
              <button
              onClick={() => {
                setShowModal(false);
                setFile(null);
              }}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded"
              >
              Cancel
              </button>
              <button
              className="px-4 py-2 bg-black text-white hover:bg-gray-800 text-sm rounded"
              onClick={handleSubmit}
              >
              Process Shipments
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;