import { useState, useEffect } from 'react';

const useCheckScreenSize = (screenSize) => {
  // Initialize the state based on the screen size parameter
  const [isBelowThreshold, setIsBelowThreshold] = useState(window.innerWidth < screenSize);

  useEffect(() => {
    const handleResize = () => {
      setIsBelowThreshold(window.innerWidth < screenSize);
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenSize]);

  return isBelowThreshold;
};

export default useCheckScreenSize;
