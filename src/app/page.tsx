"use client";
import FileUpload from '@/components/FileUpload'

export default function Home() {
  const handleFileChange = (file: File | null) => {
    // Do something with the file, e.g., pass it to Langchain for processing
    console.log('Selected file:', file);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Text Extractor</h1>
      <FileUpload onFileChange={handleFileChange} />
    </div>
  );
}
