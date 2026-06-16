import React, { useState, useEffect } from 'react';
import api from '../services/api.js';
import toast from 'react-hot-toast';
import { TableSkeleton } from '../components/LoadingSkeleton.jsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  FiClock,
  FiSearch,
  FiFilter,
  FiTrash2,
  FiDownload,
  FiRefreshCw,
  FiLock,
  FiUnlock,
  FiFileText
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [cipherFilter, setCipherFilter] = useState('');
  const [isDeleting, setIsDeleting] = useState(null); // stores ID of record being deleted

  const fetchHistory = async (searchVal = '', filterVal = '') => {
    try {
      setLoading(true);
      let query = [];
      if (searchVal.trim()) query.push(`search=${encodeURIComponent(searchVal)}`);
      if (filterVal) query.push(`cipherType=${encodeURIComponent(filterVal)}`);
      
      const queryString = query.length > 0 ? `?${query.join('&')}` : '';
      const res = await api.get(`/history${queryString}`);
      if (res.data.success) {
        setHistory(res.data.history);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load encryption history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchHistory();
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    fetchHistory(val, cipherFilter);
  };

  const handleFilterChange = (e) => {
    const val = e.target.value;
    setCipherFilter(val);
    fetchHistory(search, val);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record from your vault logs?')) {
      return;
    }

    try {
      setIsDeleting(id);
      const res = await api.delete(`/history/${id}`);
      if (res.data.success) {
        setHistory((prev) => prev.filter((item) => item._id !== id));
        toast.success('Record deleted successfully.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete history record.');
    } finally {
      setIsDeleting(null);
    }
  };

  // Export history as a text file
  const exportTxt = () => {
    if (history.length === 0) {
      toast.error('No history records to export.');
      return;
    }

    let fileContent = `=== CIPHERVAULT HISTORY REPORT ===\n`;
    fileContent += `Exported At: ${new Date().toLocaleString()}\n`;
    fileContent += `Total Logs Count: ${history.length}\n`;
    fileContent += `==========================================\n\n`;

    history.forEach((item, index) => {
      fileContent += `LOG #${index + 1}\n`;
      fileContent += `Date: ${new Date(item.createdAt).toLocaleString()}\n`;
      fileContent += `Algorithm: ${item.cipherType}\n`;
      fileContent += `Operation: ${item.actionType.toUpperCase()}\n`;
      if (item.cipherType === 'Caesar Cipher') {
        fileContent += `Shift Key: ${item.key}\n`;
      }
      fileContent += `Original Text: ${item.originalText}\n`;
      fileContent += `Result Text: ${item.resultText}\n`;
      fileContent += `------------------------------------------\n\n`;
    });

    const element = document.createElement('a');
    const file = new Blob([fileContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `ciphervault-history-export-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('History logs .txt export completed!');
  };

  // Export history as PDF document using jspdf-autotable
  const exportPdf = () => {
    if (history.length === 0) {
      toast.error('No history records to export.');
      return;
    }

    try {
      const doc = new jsPDF('landscape');
      
      // Header styling
      doc.setFillColor(15, 23, 42); // slate 900
      doc.rect(0, 0, 300, 30, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('CIPHERVAULT SECURE LOG HISTORY', 20, 20);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`Total Records: ${history.length}`, 220, 15);
      doc.text(`Export Date: ${new Date().toLocaleString()}`, 220, 22);

      // Define table structure
      const tableHeaders = [['Date/Time', 'Algorithm', 'Action', 'Key', 'Original Text', 'Result Text']];
      const tableData = history.map((item) => [
        new Date(item.createdAt).toLocaleString(),
        item.cipherType,
        item.actionType.toUpperCase(),
        item.cipherType === 'Caesar Cipher' ? item.key : '-',
        item.originalText.length > 50 ? `${item.originalText.slice(0, 47)}...` : item.originalText,
        item.resultText.length > 50 ? `${item.resultText.slice(0, 47)}...` : item.resultText
      ]);

      // Call autoTable generator
      autoTable(doc, {
        head: tableHeaders,
        body: tableData,
        startY: 40,
        theme: 'grid',
        styles: {
          fontSize: 9,
          font: 'Helvetica'
        },
        headStyles: {
          fillColor: [99, 102, 241],
          textColor: [255, 255, 255]
        },
        columnStyles: {
          0: { cellWidth: 35 },
          1: { cellWidth: 30 },
          2: { cellWidth: 20 },
          3: { cellWidth: 15 },
          4: { cellWidth: 80 },
          5: { cellWidth: 80 }
        }
      });

      doc.save(`ciphervault-vault-history-${Date.now()}.pdf`);
      toast.success('History logs .pdf export completed!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate PDF export.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-3xl shadow-sm overflow-hidden"
    >
      
      {/* Search and Filter Panel */}
      <div className="p-6 lg:p-8 border-b border-slate-200 dark:border-slate-800 space-y-4">
        
        {/* Title row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl border border-primary/20"><FiClock className="w-5 h-5"/></div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Vault Transaction History</h2>
              <p className="text-xs text-slate-400">Search and audit all cryptographic logs</p>
            </div>
          </div>
          
          {/* Action triggers */}
          <div className="flex gap-2">
            <button
              onClick={exportTxt}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs shadow-sm"
            >
              <FiFileText className="w-4 h-4"/>
              <span>Export TXT</span>
            </button>
            <button
              onClick={exportPdf}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-950 dark:bg-slate-100 hover:bg-slate-900 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-semibold text-xs shadow-sm"
            >
              <FiDownload className="w-4 h-4"/>
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Input filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          
          {/* Search Input */}
          <div className="sm:col-span-2 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by input text or output result..."
              className="w-full pl-11 pr-4 py-3 bg-slate-100/50 hover:bg-slate-100 focus:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 dark:focus:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl outline-none text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-colors"
            />
          </div>

          {/* Cipher Filter */}
          <div className="relative">
            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
            <select
              value={cipherFilter}
              onChange={handleFilterChange}
              className="w-full pl-11 pr-4 py-3 bg-slate-100/50 hover:bg-slate-100 focus:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 dark:focus:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl outline-none text-sm text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
            >
              <option value="">All Algorithms</option>
              <option value="Caesar Cipher">Caesar Cipher</option>
              <option value="ROT13">ROT13 Cipher</option>
              <option value="Reverse Cipher">Reverse Cipher</option>
            </select>
          </div>

        </div>

      </div>

      {/* History table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-6"><TableSkeleton rows={4} /></div>
        ) : history.length === 0 ? (
          <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
            <FiClock className="w-10 h-10 opacity-30 text-primary animate-pulse" />
            <p className="text-sm font-semibold">No records found matching filters.</p>
            <p className="text-xs text-slate-500">Add log entries by executing ciphers in the workshop page.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
                <th className="p-4">Date & Time</th>
                <th className="p-4">Algorithm</th>
                <th className="p-4">Operation</th>
                <th className="p-4 text-center">Key</th>
                <th className="p-4">Source Text Input</th>
                <th className="p-4">Result Output</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/50 font-medium">
              {history.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 whitespace-nowrap text-slate-500 dark:text-slate-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="p-4 whitespace-nowrap font-bold text-slate-900 dark:text-white">
                    {item.cipherType}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                      item.actionType === 'encrypt'
                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                        : 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20'
                    }`}>
                      {item.actionType === 'encrypt' ? <FiLock className="w-3 h-3"/> : <FiUnlock className="w-3 h-3"/>}
                      <span>{item.actionType}</span>
                    </span>
                  </td>
                  <td className="p-4 text-center whitespace-nowrap font-semibold">
                    {item.cipherType === 'Caesar Cipher' ? (
                      <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono font-bold">
                        {item.key}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-bold">-</span>
                    )}
                  </td>
                  <td className="p-4 max-w-xs truncate font-mono text-slate-600 dark:text-slate-400" title={item.originalText}>
                    {item.originalText}
                  </td>
                  <td className="p-4 max-w-xs truncate font-mono text-primary dark:text-primary-light" title={item.resultText}>
                    {item.resultText}
                  </td>
                  <td className="p-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={isDeleting === item._id}
                      className="p-2 text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 rounded-lg transition-colors focus:outline-none disabled:opacity-45"
                      title="Delete Record"
                    >
                      {isDeleting === item._id ? (
                        <FiRefreshCw className="w-4 h-4 animate-spin"/>
                      ) : (
                        <FiTrash2 className="w-4 h-4"/>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </motion.div>
  );
};

export default HistoryPage;
