import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "sentiment_analysis", label: "Sentiment analysis" },
  { value: "trend_following", label: "Trend following" },
  { value: "copy_trading", label: "Copy trading" },
];

const SelectFallBack = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
    // Handle the change as needed, for example, update state or call an API
    console.log(`Option selected:`, option);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "7px",
      height: "45px", // Set your desired border-radius here
    }),
    // You can also add styles for other parts of the select, like the menu:
    menu: (provided) => ({
      ...provided,
      borderRadius: "7px",
    }),
    // Add styles for other parts as needed
  };

  return (
    <div className="fallback-strategy-select mt-[30px]">
      <label
        className="text-primary font-[500] text-[16px] "
        htmlFor="strategy"
      >
        FALLBACK STRATEGY
      </label>
      <Select
        id="strategy"
        value={selectedOption}
        onChange={handleChange}
        options={options}
        className="basic-single mt-[10px] rounded-[7px] h-[45px]"
        classNamePrefix="select"
        styles={customStyles}
        placeholder="Strategy"
        isClearable
      />
    </div>
  );
};

export default SelectFallBack;
