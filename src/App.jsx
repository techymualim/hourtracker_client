/* eslint-disable react/prop-types */

import { useState } from 'react';
import './App.css'
import EnterWorkHour from './components/EnterWorkHour'
import ReportWorkHour from './components/ReportWorkHour'


const WorkHourSelection = ({ onSelectOption }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelectOption(option);
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="space-x-4">
        <button
          onClick={() => handleOptionSelect('enter')}
          className={`py-2 px-4 rounded-md transition duration-300 ${
            selectedOption === 'enter'
              ? 'bg-indigo-500 text-white hover:bg-indigo-600'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          Enter Work Hour
        </button>
        <button
          onClick={() => handleOptionSelect('report')}
          className={`py-2 px-4 rounded-md transition duration-300 ${
            selectedOption === 'report'
              ? 'bg-indigo-500 text-white hover:bg-indigo-600'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          Report Work Hour
        </button>
      </div>
    </div>
  );
};


const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Work Hour Management</h1>
      <WorkHourSelection onSelectOption={handleOptionSelect} />
      {selectedOption === 'enter' && <EnterWorkHour />}
      {selectedOption === 'report' && <ReportWorkHour />}
    </div>
  );
};

export default App;