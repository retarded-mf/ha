import React, { useState } from 'react';
import { DocumentIcon } from './icons_temp';

interface ReportGeneratorProps {
    onGenerate: (inputText: string) => void;
    isLoading: boolean;
    initialData: string;
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ onGenerate, isLoading, initialData }) => {
    const [inputText, setInputText] = useState<string>(initialData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim() && !isLoading) {
            onGenerate(inputText);
        }
    };

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-700 h-full flex flex-col">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Source Document</h2>
            <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
                <label htmlFor="inputText" className="text-sm font-medium text-gray-400 mb-2">Paste financial summary or analysis here:</label>
                <textarea
                    id="inputText"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full flex-grow p-3 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-200 text-gray-200 placeholder-gray-500 resize-none"
                    placeholder="Provide source data..."
                    disabled={isLoading}
                    style={{ minHeight: '400px' }}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-4 w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating Analysis...
                        </>
                    ) : (
                        <>
                            <DocumentIcon />
                            Generate Extensive Report
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};
