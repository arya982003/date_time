// import React, { useState, useEffect } from "react";
// import moment from "moment-timezone";
// import "./Layout.css";

// const Layout = () => {
//   const [currentDate, setCurrentDate] = useState(moment());
//   const [selectedTimezone, setSelectedTimezone] = useState("Asia/Kolkata");
//   const [availability, setAvailability] = useState({});
//   const [jsonData, setJsonData] = useState([]);

//   useEffect(() => {
//     fetch("./data.json")
//       .then((response) => response.json())
//       .then((data) => setJsonData(data))
//       .catch((error) => console.error("Error loading JSON data", error));
//   }, []);

//   useEffect(() => {
//     const initialAvailability = {};
//     jsonData.forEach((data) => {
//       const dateTime = moment.tz(`${data.Date} ${data.Time}`, selectedTimezone);
//       const day = dateTime.format("ddd D MMM");
//       const hour = dateTime.hour();
//       initialAvailability[`${day}-${hour}`] = true;
//     });
//     setAvailability(initialAvailability);
//   }, [jsonData, selectedTimezone]);
  

//   const handlePreviousWeek = () => {
//     setCurrentDate((prevDate) => prevDate.clone().subtract(7, "days"));
//   };

//   const handleNextWeek = () => {
//     setCurrentDate((prevDate) => prevDate.clone().add(7, "days"));
//   };

//   const handleTimezoneChange = (e) => {
//     setSelectedTimezone(e.target.value);
//   };

//   const handleAvailabilityChange = (day, hour) => {
//     setAvailability((prevAvailability) => {
//       const key = `${day}-${hour}`;
//       const updatedAvailability = { ...prevAvailability, [key]: !prevAvailability[key] };
//       return updatedAvailability;
//     });
//   };

//   const generateDaysOfWeek = () => {
//     const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//     const todayIndex = currentDate.day();
//     const mondayDate = currentDate
//       .clone()
//       .subtract(todayIndex === 0 ? 6 : todayIndex - 1, "days")
//       .startOf("day");
//     const daysOfWeek = days.map((day, index) => {
//       const currentDay = mondayDate.clone().add(index, "days");
//       const formattedDate = currentDay.format("ddd D MMM");
//       return {
//         day: formattedDate,
//         isPast: currentDay.isBefore(moment().startOf("day")),
//       };
//     });
//     return daysOfWeek;
//   };
  

// const generateGrid = () => {
//     const daysOfWeek = generateDaysOfWeek();
//     const hoursArray = generateHoursArray();
  
//     return (
//       <div className="grid-container">
//         <table>
//           <thead>
//             <tr>
//               {daysOfWeek.map((day, index) => (
//                 <th key={index} className={day.isPast ? "past" : ""}>
//                   {day.day}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {hoursArray.map((hour) => (
//               <tr key={hour}>
//                 {daysOfWeek.map((day, index) => {
//                   const timeSlotKey = `${day.day}-${hour}`;
//                   const isPast = day.isPast;
//                   const isChecked =
//                     availability[timeSlotKey] ||
//                     jsonData.some(
//                       (data) =>
//                         moment(data.Date).isSame(moment(currentDate).add(index, "days"), "day") &&
//                         moment(data.Time, "HH:mm").hour() === hour
//                     );
  
                 
//                     return (
//                     <td key={timeSlotKey} className={isPast ? "past" : ""}>
//                       {isPast ? (
//                         <span>Past</span>
//                       ) : (
//                         <>
//                           <input
//                             type="checkbox"
//                             checked={isChecked}
//                             onChange={() => handleAvailabilityChange(day.day, hour)}
//                           />
//                           <br />
//                           {formatTimeInTimezone(day.day, hour, index)}
//                         </>
//                       )}
//                     </td>
//                   );
//                 })}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };
  

//   const generateHoursArray = () => {
//     const hoursArray = [];
//     for (let i = 8; i <= 23; i++) {
//       hoursArray.push(i);
//     }
//     return hoursArray;
//   };

//   const formatTimeInTimezone = (day, hour, dayIndex) => {
//     const timezone = selectedTimezone;
//     const dateTime = moment(currentDate)
//       .startOf("week")
//       .add(dayIndex, "days")
//       .hours(hour);
//     return dateTime.tz(timezone).format("HH:mm");
//   };

//   return (
//     <div>
//       <div className="firstbox">
//         <button onClick={handlePreviousWeek}>Previous</button>
//         <span>{currentDate.format("dddd, D MMMM YYYY")}</span>
//         <button onClick={handleNextWeek}>Next</button>
//       </div>
//       <div className="alloptions">
//         <label>Select Timezone:</label>
//         <select value={selectedTimezone} onChange={handleTimezoneChange}>
//           <option value="Asia/Kolkata">India (IST)</option>
//           <option value="Europe/London">London (GMT)</option>
//         </select>
//       </div>
//       {generateGrid()}
//     </div>
//   );
// };

//export default Layout;



import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import "./Layout.css";
import jsonData from "./data.json";

const Layout = () => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [selectedTimezone, setSelectedTimezone] = useState("Asia/Kolkata");
    const [checkboxValues, setCheckboxValues] = useState({});
  
    useEffect(() => {
      console.log("Data from data.json:", jsonData);
  
      const initialCheckboxValues = {};
  
      jsonData.events.forEach((data) => {
        const dateTime = moment.tz(`${data.Date} ${data.Time}`, selectedTimezone);
        const day = dateTime.format("ddd D MMM");
        const hour = dateTime.hour();
        const key = `${day}-${hour}`;
  
        initialCheckboxValues[key] = initialCheckboxValues[key] || false; 
      });
  
      setCheckboxValues(initialCheckboxValues);
    }, [selectedTimezone]); 

  const handlePreviousWeek = () => {
    setCurrentDate((prevDate) => prevDate.clone().subtract(7, "days"));
  };

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => prevDate.clone().add(7, "days"));
  };

  const handleTimezoneChange = (e) => {
    setSelectedTimezone(e.target.value);
  };

  const generateDaysOfWeek = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const todayIndex = currentDate.day();
    const mondayDate = currentDate
      .clone()
      .subtract(todayIndex === 0 ? 6 : todayIndex - 1, "days")
      .startOf("day");
    const daysOfWeek = days.map((day, index) => {
      const currentDay = mondayDate.clone().add(index, "days");
      const formattedDate = currentDay.format("ddd D MMM");
      return {
        day: formattedDate,
        isPast: currentDay.isBefore(moment().startOf("day")),
      };
    });
    return daysOfWeek;
  };

  const handleCheckboxChange = (day, hour) => {
    const key = `${day}-${hour}`;
    setCheckboxValues((prevCheckboxValues) => {
      const updatedCheckboxValues = { ...prevCheckboxValues, [key]: !prevCheckboxValues[key] };
      return updatedCheckboxValues;
    });
  }

  const generateGrid = () => {
    const daysOfWeek = generateDaysOfWeek();
    const hoursArray = generateHoursArray();

    return (
      <div className="grid-container">
        <table>
          <thead>
            <tr>
              {daysOfWeek.map((day, index) => (
                <th key={index} className={day.isPast ? "past" : ""}>
                  {day.day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hoursArray.map((hour) => (
              <tr key={hour}>
                {daysOfWeek.map((day, index) => {
                  const timeSlotKey = `${day.day}-${hour}`;
                  const isPast = day.isPast;

                  // Update isChecked based on data from jsonData
                  const isChecked = checkboxValues[timeSlotKey] || false;

                  return (
                    <td key={timeSlotKey} className={isPast ? "past" : ""}>
                      {isPast ? (
                        <span>Past</span>
                      ) : (
                        <>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCheckboxChange(day.day, hour)}
                          />
                          <br />
                          {formatTimeInTimezone(day.day, hour, index)}
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


  const generateHoursArray = () => {
    const hoursArray = [];
    for (let i = 8; i <= 23; i++) {
      hoursArray.push(i);
    }
    return hoursArray;
  };

  const formatTimeInTimezone = (day, hour, dayIndex) => {
    const timezone = selectedTimezone;
    const dateTime = moment(currentDate)
      .startOf("week")
      .add(dayIndex, "days")
      .hours(hour);
    return dateTime.tz(timezone).format("HH:mm");
  };

  return (
    <div>
      <div className="firstbox">
        <button onClick={handlePreviousWeek}>Previous</button>
        <span>{currentDate.format("dddd, D MMMM YYYY")}</span>
        <button onClick={handleNextWeek}>Next</button>
      </div>
      <div className="alloptions">
        <label>Select Timezone:</label>
        <select value={selectedTimezone} onChange={handleTimezoneChange}>
          <option value="Asia/Kolkata">India (IST)</option>
          <option value="Europe/London">London (GMT)</option>
        </select>
      </div>
      {generateGrid()}
    </div>
  );
};

export default Layout;
