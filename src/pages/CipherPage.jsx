import React, { useState } from 'react';
import api from '../services/api.js';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';
import {
  FiLock,
  FiUnlock,
  FiCopy,
  FiTrash2,
  FiDownload,
  FiRefreshCw,
  FiSliders,
  FiArrowRight,
  FiFileText
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const CipherPage = () => {
  const [text, setText] = useState('');
  const [cipherType, setCipherType] = useState('Caesar Cipher');
  const [shiftKey, setShiftKey] = useState(3);
  const [result, setResult] = useState('');
  const [lastAction, setLastAction] = useState(''); // 'encrypt' or 'decrypt'
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClear = () => {
    setText('');
    setResult('');
    setLastAction('');
    toast.success('Fields cleared.');
  };

  const handleCopy = () => {
    if (!result) {
      toast.error('Nothing to copy!');
      return;
    }
    navigator.clipboard.writeText(result);
    toast.success('Result copied to clipboard!');
  };

  const executeCrypt = async (action) => {
    if (!text.trim()) {
      toast.error('Please enter some text to process.');
      return;
    }

    try {
      setIsProcessing(true);
      let endpoint = '';
      const payload = { text };

      // Map endpoints
      if (cipherType === 'Caesar Cipher') {
        endpoint = action === 'encrypt' ? '/encrypt/caesar' : '/decrypt/caesar';
        payload.shift = shiftKey;
      } else if (cipherType === 'ROT13') {
        endpoint = action === 'encrypt' ? '/encrypt/rot13' : '/decrypt/rot13';
      } else if (cipherType === 'Reverse Cipher') {
        endpoint = action === 'encrypt' ? '/encrypt/reverse' : '/decrypt/reverse';
      }

      const res = await api.post(endpoint, payload);
      if (res.data.success) {
        setResult(res.data.result);
        setLastAction(action);
        toast.success(`Text ${action}ed successfully!`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Cryptographic processing failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Download output as text file
  const downloadTxt = () => {
    if (!result) {
      toast.error('Perform an operation first to generate output.');
      return;
    }
    const element = document.createElement('a');
    const file = new Blob([
      `=== CIPHERVAULT REPORT ===\n`,
      `Algorithm: ${cipherType}\n`,
      `Action: ${lastAction.toUpperCase()}\n`,
      cipherType === 'Caesar Cipher' ? `Shift Key: ${shiftKey}\n` : '',
      `Timestamp: ${new Date().toLocaleString()}\n`,
      `==========================\n\n`,
      `ORIGINAL TEXT:\n${text}\n\n`,
      `RESULT TEXT:\n${result}\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `ciphervault-${cipherType.replace(/\s+/g, '-').toLowerCase()}-${lastAction}-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('.txt file download started!');
  };

  // Download output as PDF document
  const downloadPdf = () => {
    if (!result) {
      toast.error('Perform an operation first to generate output.');
      return;
    }

    try {
      const doc = new jsPDF();
      
      // Document header styling
      doc.setFillColor(15, 23, 42); // Dark slate
      doc.rect(0, 0, 220, 40, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('CIPHERVAULT REPORT', 20, 26);
      
      // Metadata listing
      doc.setTextColor(51, 65, 85); // Slate 700
      doc.setFontSize(11);
      doc.setFont('Helvetica', 'normal');
      
      const metaY = 55;
      doc.text(`Algorithm: ${cipherType}`, 20, metaY);
      doc.text(`Operation: ${lastAction.toUpperCase()}`, 20, metaY + 8);
      if (cipherType === 'Caesar Cipher') {
        doc.text(`Shift Key Used: ${shiftKey}`, 20, metaY + 16);
      }
      doc.text(`Generated At: ${new Date().toLocaleString()}`, 110, metaY);

      // Divider line
      doc.setDrawColor(226, 232, 240); // Slate 200
      doc.line(20, metaY + 22, 190, metaY + 22);

      // Section texts splitting for word wrapping
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(13);
      doc.text('ORIGINAL TEXT INPUT', 20, metaY + 32);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      const splitText = doc.splitTextToSize(text, 170);
      doc.text(splitText, 20, metaY + 40);

      const offsetResultY = metaY + 45 + (splitText.length * 5);

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(51, 65, 85);
      doc.text('RESULT TEXT OUTPUT', 20, offsetResultY);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(99, 102, 241); // Indigo color for result
      const splitResult = doc.splitTextToSize(result, 170);
      doc.text(splitResult, 20, offsetResultY + 8);

      // Save document
      const filename = `ciphervault-${cipherType.replace(/\s+/g, '-').toLowerCase()}-${lastAction}.pdf`;
      doc.save(filename);
      toast.success('.pdf report download started!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate PDF report.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Workbench panel */}
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card p-6 lg:p-8 rounded-3xl flex flex-col justify-between shadow-sm"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl border border-primary/20"><FiSliders className="w-5 h-5"/></div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Workspace Configuration</h2>
              <p className="text-xs text-slate-400">Set cipher parameters and raw texts</p>
            </div>
          </div>

          {/* Cipher Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Cryptographic Algorithm
            </label>
            <select
              value={cipherType}
              onChange={(e) => setCipherType(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-primary dark:focus:border-primary-light text-sm text-slate-700 dark:text-slate-200 transition-all cursor-pointer font-semibold shadow-sm"
            >
              <option value="Caesar Cipher">Caesar Cipher</option>
              <option value="ROT13">ROT13 Cipher</option>
              <option value="Reverse Cipher">Reverse Cipher</option>
            </select>
          </div>

          {/* Caesar Shift Key */}
          {cipherType === 'Caesar Cipher' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2 overflow-hidden"
            >
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Shift Key (0-25)
              </label>
              <input
                type="number"
                min="0"
                max="25"
                value={shiftKey}
                onChange={(e) => setShiftKey(Math.max(0, Math.min(25, parseInt(e.target.value, 10) || 0)))}
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-primary dark:focus:border-primary-light text-sm text-slate-700 dark:text-slate-200 transition-all"
              />
            </motion.div>
          )}

          {/* Input Text */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Source Text Input
            </label>
            <textarea
              rows="6"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your raw text here..."
              className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-primary dark:focus:border-primary-light text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all resize-none shadow-inner"
            />
          </div>
        </div>

        {/* Action triggers */}
        <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
          <button
            onClick={handleClear}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-slate-700/30 transition-all shadow-sm"
          >
            <FiTrash2 className="w-4 h-4"/>
            <span className="hidden sm:inline">Clear</span>
          </button>
          
          <button
            onClick={() => executeCrypt('encrypt')}
            disabled={isProcessing}
            className="col-span-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all"
          >
            {isProcessing && lastAction === 'encrypt' ? (
              <FiRefreshCw className="w-4 h-4 animate-spin"/>
            ) : (
              <FiLock className="w-4 h-4"/>
            )}
            <span>Encrypt</span>
          </button>

          <button
            onClick={() => executeCrypt('decrypt')}
            disabled={isProcessing}
            className="col-span-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold text-xs hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all"
          >
            {isProcessing && lastAction === 'decrypt' ? (
              <FiRefreshCw className="w-4 h-4 animate-spin"/>
            ) : (
              <FiUnlock className="w-4 h-4"/>
            )}
            <span>Decrypt</span>
          </button>
        </div>
      </motion.div>

      {/* Output Panel */}
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card p-6 lg:p-8 rounded-3xl flex flex-col justify-between shadow-sm relative overflow-hidden"
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-secondary/10 text-secondary rounded-2xl border border-secondary/20"><FiFileText className="w-5 h-5"/></div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Cryptographic Results</h2>
                <p className="text-xs text-slate-400">Output text stream logs</p>
              </div>
            </div>

            {lastAction && (
              <span className={`text-[10px] uppercase font-extrabold px-3 py-1 rounded-full border ${
                lastAction === 'encrypt'
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                  : 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20'
              }`}>
                {lastAction}ed
              </span>
            )}
          </div>

          {/* Results Output Block */}
          <div className="relative">
            <textarea
              readOnly
              rows="8"
              value={result}
              placeholder="Output will display here after encryption or decryption..."
              className="w-full p-4 bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none text-sm font-semibold text-primary dark:text-primary-light placeholder:text-slate-400 dark:placeholder:text-slate-700 resize-none shadow-inner"
            />
            {result && (
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-lg shadow-sm transition-colors"
                title="Copy to Clipboard"
              >
                <FiCopy className="w-4 h-4"/>
              </button>
            )}
          </div>
        </div>

        {/* Download Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
          <button
            onClick={downloadTxt}
            disabled={!result}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <FiDownload className="w-4 h-4"/>
            <span>Download .TXT</span>
          </button>
          
          <button
            onClick={downloadPdf}
            disabled={!result}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950 hover:bg-slate-900 dark:hover:bg-slate-200 font-bold text-xs disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <FiDownload className="w-4 h-4"/>
            <span>Download .PDF</span>
          </button>
        </div>
      </motion.div>

    </div>
  );
};

export default CipherPage;
