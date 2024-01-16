
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await fetch('http://localhost:3000/api/extract', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const result = await response.json();
            console.log('Extracted text:', result.text);
            onFileChange(file);
          } else {
            console.error('Error extracting text:', response.statusText);
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
        'application/pdf': ['.pdf']
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
    </div>
  );
};

export default FileUpload;
