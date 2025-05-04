import React, { useRef } from 'react';
import { STANDARD_COLUMNS } from '../constants';
import ColumnMapper from './ColumnMapper';

interface UploadModalProps {
  file: File | null;
  fileUploaded: boolean;
  columns: string[];
  mapping: Record<string, string>;
  sheetData: any[];
  setShowModal: (val: boolean) => void;
  setFile: (file: File | null) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMappingChange: (srcCol: string, mappedVal: string) => void;
  handleSubmit: () => void;
  resetMapping: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({
  file,
  fileUploaded,
  columns,
  mapping,
  sheetData,
  setShowModal,
  setFile,
  fileInputRef,
  handleFileUpload,
  handleMappingChange,
  handleSubmit,
  resetMapping
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className={`bg-white rounded-lg p-6 w-full ${fileUploaded ? '' : 'max-w-lg'} max-h-[90vh] overflow-y-auto`}>
        <h3 className="text-lg font-semibold mb-4">Upload Necessary documents</h3>

        {!fileUploaded && (
          <div
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
            <p className="text-xs text-gray-500 mt-1">Upload permits and certificates. Use PDF/XLSX/CSV.</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {/* File list */}
        <div className="mt-4">
          <h4 className="font-medium text-sm mb-1">Uploaded Files</h4>
          <div className="bg-gray-100 px-4 py-2 rounded text-sm">
            {fileUploaded && file ? file.name : '📄 No File Uploaded yet'}
          </div>
        </div>

        {/* Column Mapper */}
        <div className="mb-10">
          {fileUploaded && (
            <ColumnMapper
              columns={columns}
              mapping={mapping}
              data={sheetData}
              resetMapping={resetMapping}
              standardColumn={STANDARD_COLUMNS}
              onMappingChange={handleMappingChange}
            />
          )}
        </div>

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
  );
};

export default UploadModal;