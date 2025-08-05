import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon, DownloadIcon } from './icons';

interface TranscriptOutputProps {
  transcript: string;
}

const TranscriptOutput: React.FC<TranscriptOutputProps> = ({ transcript }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
    setCopied(true);
  };

  const handleDownload = () => {
    const blob = new Blob([transcript], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-6 relative">
      <h2 className="text-xl font-semibold mb-4 text-indigo-300">Generated Transcript</h2>
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={handleDownload}
          title="Download as Markdown"
          className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 transition-all duration-200"
        >
          <DownloadIcon className="w-5 h-5" />
        </button>
        <button
          onClick={handleCopy}
          title="Copy to Clipboard"
          className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 transition-all duration-200"
        >
          {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
        </button>
      </div>
      <div className="max-h-[50vh] overflow-y-auto pr-4">
        <p className="text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
          {transcript}
        </p>
      </div>
    </div>
  );
};

export default TranscriptOutput;