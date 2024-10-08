import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CheatSheetDetail = () => {
  const { id } = useParams();
  const [cheatSheet, setCheatSheet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheatSheet = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cheatsheets/${id}`
        );
        console.log(response.data); // Log the response for debugging
        setCheatSheet(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err); // Log any error for debugging
        setError("Failed to load cheat sheet");
        setLoading(false);
      }
    };
    fetchCheatSheet();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="cheat-sheet-detail">
      <h1>{cheatSheet.title}</h1>
      <pre>{cheatSheet.content}</pre> {/* Display the cheat sheet content */}
    </div>
  );
};

export default CheatSheetDetail;
