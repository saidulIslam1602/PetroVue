/**
 * Data Export Modal - Lazy loaded component
 * Demonstrates advanced data export functionality
 */

import React, { useState } from 'react';

interface ProductionData {
  id: string;
  facilityId: string;
  timestamp: string;
  oilProduction: number;
  gasProduction: number;
  efficiency: number;
}

interface DataExportModalProps {
  data: ProductionData[];
  onClose: () => void;
}

const DataExportModal: React.FC<DataExportModalProps> = ({ data, onClose }) => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'excel'>(
    'csv'
  );
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      let content: string;
      let mimeType: string;
      let filename: string;

      switch (exportFormat) {
        case 'csv':
          content = convertToCSV(data);
          mimeType = 'text/csv;charset=utf-8;';
          filename = `production-data-${new Date().toISOString().split('T')[0]}.csv`;
          break;
        case 'json':
          content = JSON.stringify(data, null, 2);
          mimeType = 'application/json;charset=utf-8;';
          filename = `production-data-${new Date().toISOString().split('T')[0]}.json`;
          break;
        case 'excel':
          // In a real application, you'd use a library like xlsx
          content = convertToCSV(data);
          mimeType = 'application/vnd.ms-excel;charset=utf-8;';
          filename = `production-data-${new Date().toISOString().split('T')[0]}.xlsx`;
          break;
        default:
          throw new Error('Unsupported export format');
      }

      // Create and trigger download
      const blob = new Blob([content], { type: mimeType });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const convertToCSV = (data: ProductionData[]): string => {
    const headers = [
      'ID',
      'Facility ID',
      'Timestamp',
      'Oil Production (bbl/day)',
      'Gas Production (mcf/day)',
      'Efficiency (%)',
    ];
    const csvContent = [
      headers.join(','),
      ...data.map(row =>
        [
          row.id,
          row.facilityId,
          row.timestamp,
          row.oilProduction,
          row.gasProduction,
          row.efficiency,
        ].join(',')
      ),
    ].join('\n');

    return csvContent;
  };

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <h2>Export Production Data</h2>
          <button className='close-button' onClick={onClose}>
            ×
          </button>
        </div>

        <div className='modal-body'>
          <p>Export {data.length.toLocaleString()} production records</p>

          <div className='export-options'>
            <label>
              <input
                type='radio'
                value='csv'
                checked={exportFormat === 'csv'}
                onChange={e => setExportFormat(e.target.value as 'csv')}
              />
              CSV Format (.csv)
            </label>

            <label>
              <input
                type='radio'
                value='json'
                checked={exportFormat === 'json'}
                onChange={e => setExportFormat(e.target.value as 'json')}
              />
              JSON Format (.json)
            </label>

            <label>
              <input
                type='radio'
                value='excel'
                checked={exportFormat === 'excel'}
                onChange={e => setExportFormat(e.target.value as 'excel')}
              />
              Excel Format (.xlsx)
            </label>
          </div>
        </div>

        <div className='modal-footer'>
          <button
            className='export-button'
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting
              ? 'Exporting...'
              : `Export as ${exportFormat.toUpperCase()}`}
          </button>
          <button className='cancel-button' onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataExportModal;
