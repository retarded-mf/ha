import React, { useState, useCallback } from 'react';
import { ReportGenerator } from './components/ControlPanel_temp';
import { ReportDisplay } from './components/SystemDashboard_temp';
import { generateFinancialReport } from './services/geminiService';
import { SAMPLE_DATA } from './myconstants';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = useCallback(async (inputText: string) => {
    if (!inputText.trim()) {
      setError("Input data cannot be empty.");
      return;
    }
    setIsLoading(true);
    setReport('');
    setError(null);
    try {
      const stream = generateFinancialReport(inputText);
      for await (const chunk of stream) {
        setReport(prev => prev + chunk);
      }
    } catch (err) {
      console.error("Error generating report:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-10 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-purple-300 drop-shadow">
        Agentic Financial Analyst
      </h1>
      <div className="max-w-4xl mx-auto space-y-8">
        <ReportGenerator onGenerate={handleGenerateReport} sampleData={SAMPLE_DATA} />
        {isLoading && <div className="text-cyan-300 text-center animate-pulse">Loading...</div>}
        {error && <div className="text-red-400 text-center">{error}</div>}
        <ReportDisplay report={report} />
      </div>
    </div>
  );
};

export default App;
