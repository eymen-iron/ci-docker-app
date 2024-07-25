import React, { useState} from 'react';

const NumberInput = ({ val, id, unit, setVal }) => {
  const [inputValue, setInputValue] = useState(val ? val : '');

  

  const handleInputChange = (e) => {
    let value = e.target.value;
    value = value.replace(',', '.');
    const floatValue = parseFloat(value);
    
    if (!isNaN(floatValue)) {
      setInputValue(floatValue);
      if (typeof setVal === 'function' && setVal) {
        setVal({
          value: floatValue,
          unit: unit,
          id: id
        });
      }
    } else {
      setInputValue(value);
      if (typeof setVal === 'function' && setVal) {
        setVal({
          value: value,
          unit: unit,
          id: id
        });
      }
    }
  };

  return (
    <input
      type="number"
      value={inputValue}
      onChange={handleInputChange}
      step="any" 
      className="table-input"
    />
  );
};

export default NumberInput;
