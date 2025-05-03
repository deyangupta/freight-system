import React from 'react';

interface ColumnMapperProps {
  columns: string[];
  mapping: Record<string, string>;
  onMappingChange: (source: string, target: string) => void;
}

const standardFields = ['origin', 'destination', 'rate', 'carrier', 'transit_time'];

const ColumnMapper: React.FC<ColumnMapperProps> = ({ columns, mapping, onMappingChange }) => {
  return (
    <div className="grid gap-4">
      <h2 className="text-lg font-semibold">Map Columns</h2>
      {columns.map((col, idx) => (
        <div key={idx} className="flex items-center gap-4">
          <span className="w-1/3">{col}</span>
          <select
            className="border rounded px-2 py-1 w-1/3"
            value={mapping[col] || ''}
            onChange={(e) => onMappingChange(col, e.target.value)}
          >
            <option value="">-- Select Field --</option>
            {standardFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default ColumnMapper;