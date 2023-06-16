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
    }else if(validateTime()){
      alert("Please Make sure start time is less then end time and time difference is not more then 12");
    }else if( workDescription.length < 8){
      alert("Work description should be greater then 8 characters");
      
    }else{
      postTimePeriod(hourObj);
    }
    

  };
  console.log(hourObj);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          onChange={handleHourObject}
          value={hourObj.employeeId}
          name="employeeId"
        >
          {employees.map((employee) => (
            <option value={employee.id} key={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>

        <select
          onChange={handleHourObject}
          value={hourObj.projectId}
          name="projectId"
        >
          {projects.map((project) => (
            <option value={project.id} key={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <label>start time</label>
        <input
          type="datetime-local"
          onChange={handleHourObject}
          value={hourObj.startTime}
          name="startTime"
        />
        <label>end time</label>
        <input
          type="datetime-local"
          onChange={handleHourObject}
          value={hourObj.endTime}
          name="endTime"
        />
        <label>Workdesc</label>
        <textarea
          placeholder="Work Description"
          onChange={handleHourObject}
          value={hourObj.workDescription}
          name="workDescription"
        >
          {" "}
        </textarea>
        <button type="submit">Submit Now</button>
      </form>
    </div>
  );
};

export default EnterWorkHour;
