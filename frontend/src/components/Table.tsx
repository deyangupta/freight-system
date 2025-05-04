import React from 'react';

const Table = ({ columns, data }: { columns: { name: string, label: string }[], data: any[] }) => (
  <div className="overflow-x-auto bg-white rounded shadow">
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-100 text-sm text-left">
          {columns.map((header) => (
            <th key={header.name} className="px-4 py-3 border">{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="text-center py-6 text-gray-500">
              No data has been added!
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr key={i} className="border-t">
              {columns.map((col) => (
                <td key={col.name} className="text-center text-gray-500 px-4 py-2 border ">{row[col.name] || ''}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default Table;