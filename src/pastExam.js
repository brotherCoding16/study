import React, { useState, useEffect } from 'react';
import "./home.css";
import "./das.css";
const PastExam = ({ pass }) => {
  const [iframeLinks, setIframeLinks] = useState([]);

  useEffect(() => {
    const fetchIframeLinks = async () => {
      try {
        const response = await fetch('path/to/iframe_links.json'); // Update with the path to your JSON file
        const data = await response.json();
        setIframeLinks(data);
      } catch (error) {
        console.error('Error fetching iframe links:', error);
      }
    };

    fetchIframeLinks();
  }, []);

  return (
    <div className='content_note'>
      <h2>Past Exams</h2>
      {iframeLinks
        .filter(link => pass === "afiqrcs15" || pass === link.pass)
        .map(link => (
          <iframe
            key={link.pass}
            src={link.iframeSrc}
            title={link.title}
            width="100%"
            height="250"
            frameBorder="0"
          ></iframe>
        ))}
    </div>
  );
};

export default PastExam;
