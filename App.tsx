import React, { useState, useCallback } from 'react';
import { ReportGenerator } from './components/ControlPanel_temp';
import { ReportDisplay } from './components/SystemDashboard_temp';
import { generateFinancialReport } from './services/geminiService';
import { SAMPLE_DATA } from './constants';

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
    <div>
      <h1>Agentic Financial Analyst</h1>
      <ReportGenerator onGenerate={handleGenerateReport} sampleData={SAMPLE_DATA} />
      {isLoading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ReportDisplay report={report} />
    </div>
  );
};

export default App;
