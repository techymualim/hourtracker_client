/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import {
  fetchEmployees,
  fetchProjects,
  fetchWorkhourTransactions,
} from "../api/workerApi";

const ReportWorkHour = () => {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [workData, setWorkhoursTrans] = useState([{}]);
  const [hourObj, setHourObj] = useState({
    employeeId: 1,
    projectId: 1,
    startTime: "",
    endTime: "",
    workDescription: "",
  });
  const handleHourObject = (e) => {
    console.log("test");
    console.log(e.target.value);
    setHourObj((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    fetchEmployees().then((res) => setEmployees(res.data));
    fetchProjects().then((res) => setProjects(res.data));
  }, []);

  const validateTime = () => {
    const startTime = new Date(hourObj.startTime);
    const endTime = new Date(hourObj.endTime);

    // Check if end time is before or equal to start time
    if (endTime < startTime) {
      alert("End time cannot be before or equal to start time.");
      return false;
    }

    // Calculate time difference in milliseconds
    const timeDifference = endTime - startTime;
    const twelveHoursInMilliseconds = 12 * 60 * 60 * 1000; // 12 hours = 12 * 60 minutes * 60 seconds * 1000 milliseconds

    // Check if time range is larger than 12 hours
    if (timeDifference > twelveHoursInMilliseconds) {
      alert("Time range cannot be larger than 12 hours.");
      return false;
    }

    return false;
  };
  const calculateTotalWorkHours = () => {
    let totalHours = 0;

    workData.forEach((work) => {
      const startTime = new Date(work.startTime);
      const endTime = new Date(work.endTime);
      const elapsedHours = (endTime - startTime) / (1000 * 60 * 60); // Convert milliseconds to hours
      totalHours += elapsedHours;
    });

    return totalHours;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { employeeId, projectId, startTime, endTime } = hourObj;

    if (startTime.length == 0 && endTime.length == 0) {
      alert("Please Fill The Form!");
    } else if (validateTime()) {
      alert(
        "Please Make sure start time is less then end time and time difference is not more then 12"
      );
    } else {
      fetchWorkhourTransactions(hourObj).then((res) =>
        setWorkhoursTrans(res.data)
      );
    }
  };
  const totalWorkHours = calculateTotalWorkHours();

  const getEmployeeNameById = (id) => {
    const employee = employees.find((employee) => employee.id === id);
    return employee ? employee.name : "";
  };
  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">Time Tracking App</h1>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label htmlFor="employeeId" className="text-gray-700 mb-1 font-medium">
          Select Employee
        </label>
        <select
          id="employeeId"
          onChange={handleHourObject}
          value={hourObj.employeeId}
          name="employeeId"
          className="form-select block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        >
          {employees.map((employee) => (
            <option value={employee.id} key={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>
  
      <div className="flex flex-col">
        <label htmlFor="projectId" className="text-gray-700 mb-1 font-medium">
          Select Project
        </label>
        <select
          id="projectId"
          onChange={handleHourObject}
          value={hourObj.projectId}
          name="projectId"
          className="form-select block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        >
          {projects.map((project) => (
            <option value={project.id} key={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
  
      <div className="flex flex-col">
        <label htmlFor="startTime" className="text-gray-700 mb-1 font-medium">
          Start Time
        </label>
        <input
          type="datetime-local"
          id="startTime"
          onChange={handleHourObject}
          value={hourObj.startTime}
          name="startTime"
          className="form-input block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
  
      <div className="flex flex-col">
        <label htmlFor="endTime" className="text-gray-700 mb-1 font-medium">
          End Time
        </label>
        <input
          type="datetime-local"
          id="endTime"
          onChange={handleHourObject}
          value={hourObj.endTime}
          name="endTime"
          className="form-input block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
  
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          Submit Now
        </button>
      </div>
    </form>
  
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Work History</h2>
      <table className="w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Employee ID</th>
            <th className="py-2 px-4 text-left">Project ID</th>
            <th className="py-2 px-4 text-left">Start Time</th>
            <th className="py-2 px-4 text-left">End Time</th>
            <th className="py-2 px-4 text-left">Work Description</th>
          </tr>
        </thead>
        <tbody>
          {workData.map((work, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-4">{getEmployeeNameById(work.employeeId)}</td>
              <td className="py-2 px-4">{work.projectId}</td>
              <td className="py-2 px-4">{work.startTime}</td>
              <td className="py-2 px-4">{work.endTime}</td>
              <td className="py-2 px-4">{work.workDescription}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
    <div className="mt-4 text-gray-700">
      <p className="text-lg font-semibold">Total Work Hours: {totalWorkHours}</p>
    </div>
  </div>
  

  );
};

export default ReportWorkHour;
