import React from 'react';

interface ColumnMapperProps {
  columns: string[];
  standardColumn: any[];
  mapping: Record<string, string>;
  data: any[]; // Assuming data is an array of objects
  onMappingChange: (source: string, target: string) => void;
  resetMapping: () => void;
}

const ColumnMapper: React.FC<ColumnMapperProps> = ({ columns, mapping, data, standardColumn, onMappingChange, resetMapping }) => {
  return (
    <div className="grid gap-4">
      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <label className="text-sm font-medium text-blue-400">Please map fields with our standard field</label>
        <div className="flex justify-end mb-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => resetMapping()}
          >
            Reset
          </button>
        </div>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-sm text-left">
              {columns.map((header) => (
                <th key={header} className="px-4 py-3 border">
                  <p>{header}</p>
                    <div className="flex flex-col gap-2">
                    <select
                      className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={mapping[header] || ''}
                      onChange={(e) => onMappingChange(header, e.target.value)}
                    >
                      <option value="" disabled>
                      Map With
                      </option>
                      {standardColumn.map((field) => (
                      <option key={field.name} value={field.name}>
                        {field.label}
                      </option>
                      ))}
                      <option value="Ignore">Ignore</option>
                    </select>
                    </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-500">
                  No data has been added!
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} className="border-t">
                  {columns.map((col, idx) => (
                    <td className='text-center' key={idx}>
                      {row[col] || ''}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ColumnMapper;