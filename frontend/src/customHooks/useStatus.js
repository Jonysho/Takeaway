import { useState, useEffect } from 'react';
import moment from 'moment';

export const useStatus = () => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    const updateStatus = () => {
        const currentTime = moment();
        const startTime = moment().hour(0).minute(0); // 5 PM
        const endTime = moment().hour(22).minute(0); // 9 PM
        if (currentTime.isBetween(startTime, endTime)) {
            setStatus('Open');
        } else {
            setStatus('Closed');
        }
    };

    updateStatus(); // Initial status update

    // Update status every minute
    const interval = setInterval(updateStatus, 60000);

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  return status
}