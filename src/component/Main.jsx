import React,{useState,useEffect} from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import mygif from "../video/original-d60d413c84eccffc35858f0b778c14a0.mp4";
import { useDispatch,useSelector } from 'react-redux';
import { addToTodayPlanList, removeItemFromTodayPlanList } from '../states/reducers';



const MainPage = () => {

  const dispatch=useDispatch();
  const todayPlanList = useSelector((state) => state.todayPlan.todayPlanList);

// the async storage 



  const [inputText,setInputText]=useState('');
  const handleAddClick = () => {
    if (inputText.trim() !== '') {
      dispatch(addToTodayPlanList({ planfortoday: inputText }));
      setInputText(''); // Clear the input field after adding the item
    }
  };



// when the delete button is clicked , I want to dispatch the 
const handleDeleteClick = (id) => {
  console.log('Before dispatching action');
  dispatch(removeItemFromTodayPlanList(id));
  console.log('After dispatching action');
};


useEffect(() => {
  const storedData = localStorage.getItem('todayPlanList');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    parsedData.forEach((item) => {
      dispatch(addToTodayPlanList({ 
        planfortoday: item.planfortoday,
        id: item.id, // Make sure to include the id
        time: item.time, // Include the time property
      }));
    });
  }
}, [dispatch]);

// stre the data 

useEffect(() => {
  localStorage.setItem('todayPlanList', JSON.stringify(todayPlanList));
}, [todayPlanList]);


  return (
    <Container
      maxWidth="large"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      /*   justifyContent: 'center', */
        height: '100vh', // Make sure the container takes full height of the viewport
        width:'100%',
        gap:'2rem',
        position: 'relative',
      marginTop: '8rem'
      }}
    >

              {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover', // Ensure the video covers the entire container
          zIndex: -1, // Place the video behind other elements
          top: 0, // Add this line to set the top position
        }}
      >
        <source src={mygif} type="video/mp4" />
      </video>

    <Box component="div">
        <Typography variant="h3">Today's Plan</Typography>
    </Box>
      <Box
        component="form"
        className="w-full max-w-md flex  flex-row  gap-5 items-center justify-center"
        // Use Tailwind CSS classes to center the form
      >
       <TextField
          required
          id="outlined-required"
          label="Required"
          placeholder="Enter the activity you want to keep track of"
          fullWidth // Make the TextField take the full width
          sx={{ width: '100%'}} // Set the width to 100%
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-14 w-20 rounded "
          onClick={handleAddClick}
        >
          Add
        </button>
      </Box>
      <Box component="div" className="w-full max-w-md">
        <List sx={{ width: '100%' }}>
          {todayPlanList.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                backgroundColor: 'lightcoral',
                width: '100%',
                marginLeft: { xs: 0, md: 0 },
                mb: 2,
              }}
            >
              <ListItemText primary={item.planfortoday} />
              <ListItemText primary={new Date(item.time).toLocaleTimeString()} />
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon onClick={() => handleDeleteClick(item.id)} />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default MainPage;
