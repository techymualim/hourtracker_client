/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import {
  fetchEmployees,
  fetchProjects,
  postTimePeriod,
} from "../api/workerApi";

const EnterWorkHour = () => {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employee, setEmployee] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const { employeeId, projectId, startTime, endTime, workDescription } =
      hourObj;

    if (
      startTime.length == 0 &&
      endTime.length == 0 &&
      workDescription.length == 0
    ) {
      alert("Please Fill The Form!");
    } else if (validateTime()) {
      alert(
        "Please Make sure start time is less then end time and time difference is not more then 12"
      );
    } else if (workDescription.length < 8) {
      alert("Work description should be greater then 8 characters");
    } else {
      postTimePeriod(hourObj);
    }
  };
  const handleClearFields = () => {
    setHourObj({
      employeeId: '',
      projectId: '',
      startTime: '',
      endTime: '',
      workDescription: ''
    });
  };
  return (
    <div  className="bg-white rounded-md shadow-lg p-6 mt-8">
    <h1 className="text-2xl font-bold mb-6">Time Tracking Form</h1>
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
  
      <div className="flex flex-col">
        <label htmlFor="workDescription" className="text-gray-700 mb-1 font-medium">
          Work Description
        </label>
        <textarea
          id="workDescription"
          placeholder="Enter work description"
          onChange={handleHourObject}
          value={hourObj.workDescription}
          name="workDescription"
          className="form-textarea block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        ></textarea>
      </div>
  
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          Submit Now
        </button>
        <button
          type="button"
          onClick={handleClearFields}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          Clear Fields
        </button>
      </div>
    </form>
  </div>
  
  );
};

export default EnterWorkHour;
