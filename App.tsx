import React, { useState, useCallback } from 'react';
import { ReportGenerator } from './components/ControlPanel_temp';
import { ReportDisplay } from './components/SystemDashboard_temp';
import { generateFinancialReport } from './services/geminiService';
import { SAMPLE_DATA } from './constants';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [report, setReport] = useState<string>('');
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-6">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                            Agentic Financial Analyst
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                            Transform raw financial data into comprehensive investment reports with AI-powered analysis
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                AI-Powered Analysis
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Real-time Generation
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Professional Reports
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <ReportGenerator onGenerate={handleGenerateReport} isLoading={isLoading} initialData={SAMPLE_DATA} />
                    </div>
                    <div className="space-y-6">
                        <ReportDisplay report={report} isLoading={isLoading} error={error} />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-gray-400">
                        <p>&copy; 2024 Agentic Financial Analyst. Powered by AI technology.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
