
import React, { useRef, useState, useCallback } from 'react';
import { UploadIcon, FileAudioIcon, CloseIcon } from './icons';

interface FileUploadProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  onFileClear: () => void;
  disabled: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ file, onFileSelect, onFileClear, disabled }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "audio/mpeg") {
        onFileSelect(droppedFile);
      } else {
        alert("Please drop an MP3 file.");
      }
      e.dataTransfer.clearData();
    }
  };
  
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  return (
    <div className="w-full">
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".mp3,audio/mpeg"
        disabled={disabled}
      />
      {!file ? (
        <label
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
            ${disabled ? 'bg-gray-800 border-gray-700 cursor-not-allowed' : 'bg-gray-800/50 border-gray-600 hover:bg-gray-800 hover:border-gray-500'}
            ${isDragging ? 'border-indigo-400 bg-gray-800' : ''}`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400">
            <UploadIcon className="w-10 h-10 mb-4" />
            <p className="mb-2 text-sm"><span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop</p>
            <p className="text-xs">MP3 files only</p>
          </div>
        </label>
      ) : (
        <div className="flex items-center justify-between w-full p-4 border-2 border-solid border-green-500/30 bg-green-900/20 rounded-lg">
          <div className="flex items-center space-x-4">
            <FileAudioIcon className="w-10 h-10 text-green-400 flex-shrink-0"/>
            <div className="text-sm">
              <p className="font-semibold text-gray-200 truncate max-w-xs">{file.name}</p>
              <p className="text-gray-400">{formatBytes(file.size)}</p>
            </div>
          </div>
          <button
            onClick={onFileClear}
            disabled={disabled}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
