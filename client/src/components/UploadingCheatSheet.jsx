import React, { useState } from "react";
import axios from "axios";
import "./UploadCheatSheet.css";

const UploadingCheatSheet = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/cheatsheets", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setTitle("");
      setFile(null);
      alert("Cheat sheet uploaded successfully!");
    } catch (error) {
      console.error("There was an error uploading the cheat sheet!", error);
    }
  };

  return (
    <div className="container">
      <h1>Upload Cheat Sheet</h1>
      <form className="upload-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="file">File</label>
        <input type="file" id="file" onChange={handleFileChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadingCheatSheet;
