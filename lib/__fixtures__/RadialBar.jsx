/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import { Button, Typography } from '../components';
import { RadialBar } from '../components/RadialBar';

const percentage = {
  half: 50,
  full: 100,
};

const RadialBarDemo = () => {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('InProgress');

  const handleUploadClick = () => {
    const totalIntervals = 100;
    const intervalDuration = 15;

    let intervalCount = 0;

    const intervalId = setInterval(() => {
      setCurrentPercentage((prevPercentage) => {
        const newPercentage = prevPercentage + 1;

        intervalCount++;

        if (newPercentage >= 100 || intervalCount >= totalIntervals) {
          clearInterval(intervalId);
          if (newPercentage === 100) {
            setUploadStatus('success');
          }
        }

        return newPercentage;
      });
    }, intervalDuration);
  };

  const handleResetClick = () => {
    setCurrentPercentage(0);
  };

  return (
    <div>
      <RadialBar percentage={currentPercentage} status={uploadStatus} />
      <div
        style={{
          marginTop: '6px',
          display: 'flex',
          alignContent: 'space-around',
        }}
      >
        <Button
          variant="contained"
          size="small"
          color="neutral5"
          onClick={() => handleUploadClick()}
        >
          <Typography>Upload</Typography>
        </Button>
        <Button
          variant="contained"
          size="small"
          color="neutral5"
          onClick={() => handleResetClick()}
          style={{ marginLeft: '6px' }}
        >
          <Typography>Reset</Typography>
        </Button>
      </div>
    </div>
  );
};

export default {
  demo: RadialBarDemo,
  half: (
    <div>
      <RadialBar percentage={percentage.half} />
    </div>
  ),
  success: (
    <div>
      <RadialBar percentage={percentage.full} status="Success" />
    </div>
  ),
  failed: (
    <div>
      <RadialBar percentage={percentage.full} status="Failed" />
    </div>
  ),
};
