import React, { useState } from 'react';
import { Slider } from '../components';

const Wrapper = () => {
  const [sliderValue, setSliderValue] = useState(30);
  const [sliderValueMarks, setSliderValueMarks] = useState(50);
  const [rangeSliderValue, setRangeSlider] = useState([30, 80]);
  return (
    <div
      style={{
        width: 682,
        marginTop: 20,
        marginLeft: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <h3>Simple slider</h3>
      <Slider value={sliderValue} onChange={setSliderValue} />
      <br />
      <p>value : {sliderValue}</p>
      <h3>Slider with marks</h3>
      <Slider
        value={sliderValueMarks}
        marks={{
          10: 10,
          20: 20,
          30: 30,
          50: 50,
          60: 60,
          70: 70,
          80: 80,
        }}
        onChange={setSliderValueMarks}
      />
      <br />
      <p>value : {sliderValueMarks}</p>
      <h3>range slider</h3>
      <Slider range value={rangeSliderValue} onChange={setRangeSlider} />
      <p>
        {' '}
        value:
        {rangeSliderValue[0]} - {rangeSliderValue[1]}
      </p>
      <br />
      <h3>Disabled slider</h3>
      <Slider disabled range defaultValue={[20, 50]} />
    </div>
  );
};
export default {
  examle: <Wrapper />,
};
