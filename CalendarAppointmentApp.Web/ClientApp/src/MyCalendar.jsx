// import React from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import moment from 'moment';

// const localizer = momentLocalizer(moment);

// const MyCalendar = (props) => (
//     <div style={{ height: 500, width: 1400, marginLeft: 150, marginTop: 100 }}>
//         <Calendar
//             localizer={localizer}
//             events={props.events}
//             startAccessor="start"
//             endAccessor="end"
//         />
//     </div>
// );

// export default MyCalendar;


import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button, Dialog } from '@mui/material';

function MyCalendar() {
    // Sample list of names
    //const names = ['','John', 'Jane', 'Alice', 'Bob', 'Charlie'];

    const [inputValue, setInputValue] = useState('');
    const [names, setNames] = useState([
       'John','Jane'
       ]);
    const [isTrue, setIsTrue] = useState(false);

    
    // const handleInputChange = (event, newInputValue) => {
    //     setInputValue(newInputValue ? newInputValue.toLowerCase() : '');
    //   };
      

      const handleAddName = () => {
        if (inputValue && !names.includes(inputValue)) {
          const updatedNames = [...names, inputValue];
          setNames(updatedNames);
          setInputValue('');
        }
      };

    // const handleInputChange = (event, newInputValue) => {
    //    if(names.includes(newInputValue)) {
    //     setInputValue(newInputValue);
    //    } else{
    //     setInputValue('');
    //    }
        

        // Check if the input value matches any name in the list
        // const isNameInList = names.includes(newInputValue);
        // if (isNameInList) {
        //     console.log(1);
        // } else {
        //     console.log(2);
        // }

        // Log if the name is in the list
        //console.log(`${newInputValue} ${isNameInList ? 'is' : 'is not'} in the list of names`);
        //check();

        // You can perform further actions based on whether the name is in the list or not
    //};

    const check = (event, inputValue) => {
        const isNameInList = names.includes(inputValue);
        if (isNameInList) {
            console.log(`${inputValue} is in the list of names`);
        } else {          
            console.log(`${inputValue} is not in the list of names`);
            setIsTrue(true)
        }
    }
    

    return (        
            <div>
              <Autocomplete
                //value={inputValue}
                onChange={(event, newValue) => setInputValue(newValue)}
                //getOptionLabel={option => option.label}
                //inputValue={inputValue}
                onInputChange={check}
                options={names}
                renderInput={(params) => <TextField {...params} label="Name" />}
              />
              <br></br><br></br><br></br>
              {isTrue && (
                <Button variant="contained" color="primary" onClick={handleAddName}>
                  Add "{inputValue}"
                </Button>
              )}

              {/* {!names.includes(inputValue) && inputValue && (
                <Button variant="contained" color="primary" onClick={handleAddName}>
                  Add "{inputValue}"
                </Button>
              )} */}
            </div>
          );
}

export default MyCalendar;


// import React, { useState } from 'react';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';

// function MyCalendar() {
//     const [inputValue, setInputValue] = useState('');
//     const [names, setNames] = useState(['','John', 'Jane', 'Alice', 'Bob', 'Charlie']); // Hardcoded names data
  
//     const customToLowerCase = (str) => {
//         return str.split('').map(char => {
//           const charCode = char.charCodeAt(0);
//           return (charCode >= 65 && charCode <= 90) ? String.fromCharCode(charCode + 32) : char;
//         }).join('');
//       };
    
//       const handleInputChange = (event, newInputValue) => {
//         setInputValue(newInputValue ? newInputValue.toLowerCase() : '');
//         setInputValue(customToLowerCase(newInputValue));
//       };
  
//     const handleSearch = () => {
//       if (inputValue && !names.includes(inputValue)) {
//         const confirmAdd = window.confirm(`"${inputValue}" not found. Do you want to add it?`);
//         if (confirmAdd) {
//           setNames([...names, inputValue]);
//           setInputValue('');
//         }
//       } else {
//         // Perform search or display results
//         console.log('Perform search or display results');
//       }
//     };


//     const toLowerCas = (str) => {
//         if (typeof str !== 'string') {
//           throw new TypeError('toLowerCase requires a string parameter');
//         }
      
//         let result = '';
//         for (let i = 0; i < str.length; i++) {
//           const charCode = str.charCodeAt(i);
//           if (charCode >= 65 && charCode <= 90) { // ASCII range for uppercase letters
//             result += String.fromCharCode(charCode + 32); // Convert uppercase to lowercase
//           } else {
//             result += str.charAt(i); // Keep non-uppercase characters unchanged
//           }
//         }
//         return result;
//       }
      

  
//     return (
//       <div>
//         <Autocomplete
//           value={inputValue}
//           onChange={(event, newValue) => setInputValue(newValue)}
//           inputValue={inputValue}
//           onInputChange={handleInputChange}
//           options={names}
//           renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
//         />
//         <Button variant="contained" color="primary" onClick={handleSearch}>
//           Search
//         </Button>
//       </div>
//     );
// }

// export default MyCalendar;
