
import React, { useState, useCallback } from 'react';
import { AppStatus } from './types';
import { transcribeAudio } from './services/gemini';
import FileUpload from './components/FileUpload';
import TranscriptOutput from './components/TranscriptOutput';
import { SpinnerIcon } from './components/icons';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setStatus(AppStatus.IDLE);
    setTranscript('');
    setErrorMessage('');
  };

  const handleFileClear = () => {
    setFile(null);
    setStatus(AppStatus.IDLE);
    setTranscript('');
    setErrorMessage('');
  };

  const handleTranscribe = useCallback(async () => {
    if (!file) {
      setErrorMessage('Please select a file first.');
      setStatus(AppStatus.ERROR);
      return;
    }

    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      setErrorMessage('An API Key must be set when running in a browser');
      setStatus(AppStatus.ERROR);
      return;
    }

    setStatus(AppStatus.LOADING);
    setErrorMessage('');
    setTranscript('');

    try {
      const result = await transcribeAudio(file);
      setTranscript(result);
      setStatus(AppStatus.SUCCESS);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      setErrorMessage(message);
      setStatus(AppStatus.ERROR);
    }
  }, [file]);
  
  const isLoading = status === AppStatus.LOADING;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Podcast to Transcript
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Convert your MP3 podcasts into formatted text with AI.
          </p>
        </header>

        <main className="space-y-6">
          <FileUpload
            file={file}
            onFileSelect={handleFileSelect}
            onFileClear={handleFileClear}
            disabled={isLoading}
          />

          {status === AppStatus.ERROR && (
            <div className="bg-red-900/30 border border-red-500/50 text-red-300 p-4 rounded-lg text-center">
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleTranscribe}
              disabled={!file || isLoading}
              className="flex items-center justify-center w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
            >
              {isLoading ? (
                <>
                  <SpinnerIcon className="w-6 h-6 mr-3" />
                  Transcribing...
                </>
              ) : (
                'Transcribe Audio'
              )}
            </button>
          </div>

          {status === AppStatus.SUCCESS && transcript && (
            <TranscriptOutput transcript={transcript} />
          )}
        </main>
        
        <footer className="text-center text-gray-500 text-sm">
            <p>Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
