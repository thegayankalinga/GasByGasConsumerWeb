import React from 'react';
import Select from 'react-select';

const cityOptions = [
  { value: 'New York', label: 'New York' },
  { value: 'Los Angeles', label: 'Los Angeles' },
  { value: 'Chicago', label: 'Chicago' },
  { value: 'Houston', label: 'Houston' },
  { value: 'Phoenix', label: 'Phoenix' },
];

const SelectableCity = ({name, onCitySelect }) => { 
  const handleChange = (selectedOption) => {
    onCitySelect(selectedOption); 
  };

  return (
    <div>
      <Select 
        options={cityOptions} 
        onChange={handleChange} 
        placeholder="Select City"
        name={name}  
      /> 
    </div>
  );
};

export default SelectableCity;