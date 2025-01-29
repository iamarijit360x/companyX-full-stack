import { useState } from "react";
import Wrapper from "@/components/wrapper";
import { Card } from "@/components/ui/card";

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      
      // Additional validations
      if (selectedFile.type !== 'application/pdf') {
        alert('Only PDF files are allowed');
        return;
      }
      
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('File size should not exceed 10MB');
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    setIsUploading(true);
    try {
      const response = await fetch("http://localhost:3015/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
        setFile(null);
      } else {
        const errorText = await response.text();
        alert(`Failed to upload file: ${errorText}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Wrapper className="flex flex-col items-center justify-center">
      <main className="flex items-center justify-center h-[80vh]">
        <Card className="p-8 text-center">
          <h1 className="text-4xl font-extrabold mb-4">Welcome to Digital Solutions</h1>
          <p className="text-lg">Empowering your business with innovative digital solutions.</p>
          <input 
            type="file" 
            accept=".pdf" 
            onChange={handleFileChange} 
            className="mt-4"
          />
          <button 
            onClick={handleUpload} 
            disabled={!file || isUploading}
            className={`mt-2 p-2 rounded ${
              file && !isUploading 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isUploading ? 'Uploading...' : 'Upload PDF'}
          </button>
        </Card>
      </main>
    </Wrapper>
  );
};

export default Home;