// components/FileUpload.tsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onFileChange: (file: File | null, processedData: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const [processedData, setProcessedData] = useState<any>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;

      if (file) {
        try {
          const formData = new FormData();
          formData.append('file', file);

          const response = await fetch('http://localhost:8000/extract', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            console.log('Response:', response);

          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  return (
    <div className="file-upload-container">
      <div
        {...getRootProps()}
        className={`border p-4 text-center ${isDragActive ? 'bg-gray-200' : ''}`}
      >
        <input {...getInputProps()} />
        <p>Drag & drop a PDF file here, or click to select one</p>
      </div>

      {processedData && (
        <div>
          <h2>Processed Data</h2>
          <pre>{JSON.stringify(processedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
