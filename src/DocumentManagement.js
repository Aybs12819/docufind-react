// src/DocumentManagement.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

const DocumentManagement = () => {
  const { user } = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/documents');
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('document', selectedFile);

    try {
      const response = await axios.post('http://localhost:3001/api/upload-document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Document upload response:', response.data);
      fetchDocuments(); // Refresh the document list
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/search-documents?q=${searchTerm}`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error searching documents:', error);
    }
  };

  const handleDownload = (documentId) => {
    window.location.href = `http://localhost:3001/api/download-document/${documentId}`;
  };

  const isAuthorizedToEdit = user && (user.role === 'admin' || user.role === 'process-owner');

  return (
    <div>
      <h2>Document Management</h2>

      {/* Upload Section */}
      <div>
        <h3>Upload Document</h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      {/* Search Section */}
      <div>
        <h3>Search Documents</h3>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search documents"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Document List Section */}
      <div>
        <h3>Uploaded Documents</h3>
        <ul>
          {documents.map((document) => (
            <li key={document.id}>
              {document.name}
              <button onClick={() => handleDownload(document.id)}>Download</button>
              {isAuthorizedToEdit && <button>Edit</button>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DocumentManagement;
