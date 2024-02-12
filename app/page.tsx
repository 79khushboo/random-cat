"use client"; 
import Image from "next/image";
 import  React, { useState, useEffect } from "react";
 
 interface CatData {
  url: string;
  breeds?: { name: string }[];
}

export default function Home() {
  const [catData, setCatData] = useState<CatData | null>(null);

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
  }, []); 
  return (
    <div className="flex min-h-screen flex-col items-center ">
    <h1 className="  left-0 top-0 flex  w-full justify-center  ">Random Cat Data</h1>
   {catData && (
     <div>
       <img src={catData.url} alt="Random Cat" style={{ maxWidth: '100%' }} />
       <p>Breed: {catData.breeds?.[0]?.name || 'Unknown'}</p>
       
     </div>
   )}
 </div>
);
}
