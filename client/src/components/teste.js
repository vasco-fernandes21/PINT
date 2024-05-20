import React, { useState } from 'react';
import api from './api/api';
function FileUpload() {
  const [file, setFile] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default FileUpload;