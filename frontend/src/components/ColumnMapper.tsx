import React from 'react';

interface ColumnMapperProps {
  columns: string[];
  standerdColumn: any[];
  mapping: Record<string, string>;
  data: any[]; // Assuming data is an array of objects
  onMappingChange: (source: string, target: string) => void;
}

const ColumnMapper: React.FC<ColumnMapperProps> = ({ columns, mapping, data, standerdColumn, onMappingChange }) => {
  return (
    <div className="grid gap-4">
      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-sm text-left">
              {columns.map((header) => (
                <th key={header} className="px-4 py-3 border">
                  <p>{header}</p>
                  <div className="flex items-center gap-4">
                    {/* <span className="w-1/3">{header}</span> */}
                    <select
                      className="border rounded px-2 py-1"
                      value={mapping[header] || ''}
                      onChange={(e) => onMappingChange(header, e.target.value)}
                    >
                      <option value="">-- Select Field --</option>
                      {standerdColumn.map((field) => (
                        <option key={field.name} value={field.name}>
                          {field.label}
                        </option>
                      ))}
                      <option value={'Ignore'}>
                          {'Ignore'}
                        </option>
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
                    <td key={idx}>
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