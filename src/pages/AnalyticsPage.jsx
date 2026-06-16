import React, { useState } from 'react';
import api from '../services/api.js';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext.jsx';
import { ChartSkeleton } from '../components/LoadingSkeleton.jsx';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import {
  FiActivity,
  FiFileText,
  FiGrid,
  FiTrendingUp,
  FiRefreshCw
} from 'react-icons/fi';
import { motion } from 'framer-motion';

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage = () => {
  const { isDark } = useTheme();
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to analyze.');
      return;
    }

    try {
      setIsAnalyzing(true);
      const res = await api.post('/analysis/frequency', { text });
      if (res.data.success) {
        setAnalysis(res.data.analysis);
        toast.success('Frequency analysis generated!');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to analyze text.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Configure Chart Data
  const chartData = {
    labels: analysis ? Object.keys(analysis.letterCounts) : [],
    datasets: [
      {
        label: 'Character Count',
        data: analysis ? Object.values(analysis.letterCounts) : [],
        backgroundColor: isDark ? 'rgba(99, 102, 241, 0.75)' : 'rgba(99, 102, 241, 0.85)',
        borderColor: '#6366F1',
        borderWidth: 1.5,
        borderRadius: 6,
        hoverBackgroundColor: '#8B5CF6'
      }
    ]
  };

  // Configure Chart Options with responsive colors matching light/dark states
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
        titleColor: isDark ? '#FFFFFF' : '#0F172A',
        bodyColor: isDark ? '#94A3B8' : '#475569',
        borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: isDark ? '#64748B' : '#94A3B8',
          font: {
            family: 'Outfit',
            size: 11,
            weight: 'bold'
          }
        }
      },
      y: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          color: isDark ? '#64748B' : '#94A3B8',
          font: {
            family: 'Outfit',
            size: 11
          },
          precision: 0
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Workbench Input */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 lg:p-8 rounded-3xl shadow-sm space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-secondary/10 text-secondary rounded-2xl border border-secondary/20"><FiActivity className="w-5 h-5"/></div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Letter Frequency Analyzer</h2>
            <p className="text-xs text-slate-400">Compute letter density maps and plots</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Source Text for Analysis
          </label>
          <textarea
            rows="5"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text to perform frequency distribution calculations..."
            className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-primary dark:focus:border-primary-light text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all resize-none shadow-inner"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          {isAnalyzing ? (
            <>
              <FiRefreshCw className="w-4 h-4 animate-spin"/>
              <span>Computing Analysis...</span>
            </>
          ) : (
            <>
              <FiTrendingUp className="w-4 h-4"/>
              <span>Perform Frequency Analysis</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Analysis Results Display */}
      {isAnalyzing ? (
        <ChartSkeleton />
      ) : analysis ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Statistics widgets */}
          <div className="lg:col-span-1 space-y-6 flex flex-col justify-between">
            
            {/* Widget 1 */}
            <div className="glass-card p-6 rounded-2xl flex-1 flex flex-col justify-center border-l-4 border-primary">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Total Characters Analyzed
              </span>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                {analysis.totalCharacters}
              </h3>
              <p className="text-xs text-slate-500 mt-1">Includes whitespaces & special glyphs</p>
            </div>

            {/* Widget 2 */}
            <div className="glass-card p-6 rounded-2xl flex-1 flex flex-col justify-center border-l-4 border-secondary mt-6">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Total Alphabetic Letters
              </span>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                {analysis.totalLetters}
              </h3>
              <p className="text-xs text-slate-500 mt-1">A-Z letters isolated</p>
            </div>

            {/* Widget 3 */}
            <div className="glass-card p-6 rounded-2xl flex-1 flex flex-col justify-center border-l-4 border-accent mt-6">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Most Frequent Letter
              </span>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                {analysis.mostRepeatedChar !== 'N/A' ? `${analysis.mostRepeatedChar} (${analysis.mostRepeatedCount}x)` : 'None'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">High-density character hit</p>
            </div>

          </div>

          {/* Interactive Chart */}
          <div className="lg:col-span-2 glass-card p-6 rounded-2xl shadow-sm flex flex-col h-[380px]">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <FiGrid className="text-primary"/>
              <span>Character Density Histogram (A-Z)</span>
            </h3>
            <div className="flex-1 relative min-h-0">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Frequency Table */}
          <div className="lg:col-span-3 glass-card rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <FiFileText className="text-secondary w-5 h-5"/>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Density Matrix breakdown</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
                    <th className="p-4">Character</th>
                    <th className="p-4">Frequency Occurrence</th>
                    <th className="p-4">Percentage Density</th>
                    <th className="p-4">Visual Indicator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/50">
                  {analysis.frequencyTable
                    .filter((row) => row.count > 0)
                    .map((row) => (
                      <tr key={row.letter} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="p-4 font-extrabold text-slate-900 dark:text-white">{row.letter}</td>
                        <td className="p-4 font-semibold">{row.count} times</td>
                        <td className="p-4 font-semibold text-primary dark:text-primary-light">{row.percentage}%</td>
                        <td className="p-4 w-1/3 min-w-[150px]">
                          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
                              style={{ width: `${row.percentage}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  {analysis.frequencyTable.filter((row) => row.count > 0).length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-slate-400 font-semibold">
                        No letters (A-Z) detected in the analyzed text streams.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </motion.div>
      ) : (
        <div className="glass-card p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
          <FiActivity className="w-10 h-10 opacity-30 animate-pulse text-secondary" />
          <p className="text-sm font-semibold">Ready for frequency graphing.</p>
          <p className="text-xs text-slate-500">Provide a text input above and press Analyze to populate charts.</p>
        </div>
      )}

    </div>
  );
};

export default AnalyticsPage;
