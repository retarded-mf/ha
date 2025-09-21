import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';

interface ReportDisplayProps {
    report: string;
    isLoading: boolean;
    error: string | null;
}

export const ReportDisplay: React.FC<ReportDisplayProps> = ({ report, isLoading, error }) => {
    const reportContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to the bottom as new content streams in
    useEffect(() => {
        if (reportContainerRef.current) {
            reportContainerRef.current.scrollTop = reportContainerRef.current.scrollHeight;
        }
    }, [report]);
    
    const htmlReport = report ? marked(report) as string : '';

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-700 h-full flex flex-col">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Generated Report</h2>
            <div ref={reportContainerRef} className="overflow-y-auto flex-grow bg-gray-900/70 p-4 rounded-md border border-gray-700">
                {isLoading && !report && (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                             <svg className="animate-spin mx-auto h-10 w-10 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="mt-4 text-gray-400">Generating report, this may take a moment...</p>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="text-red-400">
                        <h3 className="font-bold">An Error Occurred</h3>
                        <p>{error}</p>
                    </div>
                )}
                {report && (
                    <div
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: htmlReport }}
                    />
                )}
                 {!isLoading && !report && !error && (
                     <p className="text-gray-500">The generated report will appear here.</p>
                 )}
            </div>
        </div>
    );
};
