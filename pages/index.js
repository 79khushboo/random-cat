
import React, { useState, useEffect } from 'react';

const index = () => {
  const [catData, setCatData] = useState(null);

  useEffect(() => {
    const fetchRandomCatData = async () => {
      try {
        // Fetch random cat ID and image
        const response = await fetch('https://api.thecatapi.com/v1/images/search?has_breeds=1');
        const data = await response.json();

        // Fetch complete details of the cat with ID
        const catId = data[0]?.id;
        const detailsResponse = await fetch(`https://api.thecatapi.com/v1/images/${catId}`);
        const detailsData = await detailsResponse.json();

        setCatData(detailsData);
      } catch (error) {
        console.error('Error fetching cat data:', error);
      }
    };

    fetchRandomCatData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <h1>Random Cat Data</h1>
      {catData && (
        <div>
          <img src={catData.url} alt="Random Cat" style={{ maxWidth: '100%' }} />
          <p>Breed: {catData.breeds?.[0]?.name || 'Unknown'}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default index;
