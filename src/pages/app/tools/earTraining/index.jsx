import React, { useState, useEffect } from 'react'
import axios from "axios";

import "./style.css"
import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useUser } from '../../../../hooks/useUser';
import DeleteIcon from '@mui/icons-material/Delete';
export default function EarTraining() {
  const navigate = useNavigate();
  const user=useUser()
  const [earTrainingList,setEarTrainingList] = useState([]);
  const [historyList,setHistoryList] = useState([]);
  const deleteEarTrainingHistory = async (id) => {
   await axios.delete("http://localhost:3000/spacetune/api/tools/deleteEarTrainingHistory/" + id);
   setHistoryList(historyList.filter(item => item._id !== id))

  }



 const [selection,setSelection]=useState()
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:3000/spacetune/api/tools/getEarTrainings");
      console.log(res)
  
      setEarTrainingList(res.data.content);
    };
    const fetchHistory = async () => {
      const res = await axios.get("http://localhost:3000/spacetune/api/tools/getEarTrainingHistory/"+user.user._id);
      console.log("++++++",res)
  
      setHistoryList(res.data.content);
    };
    fetchHistory()
    fetchPosts()

  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
   navigate("/app/tools/questions", { state: { scale:selection.scale,id:selection._id,chords:selection.chords,perfectPitch:selection.perfectPitch} });
  };
  const handleChange=(e)=>{
    setSelection(e.target.value)

  }
    return (
      <Box className="box grid place-items-center ">

      <div>
        <h2 className="text-7xl text-center m-2">Ear Training</h2>
        <p className="text-lg m-5">
          You will hear a sound 🔊 and you have to guess the result,
          choose a training from the list below
        </p>

        <div className='text-center'>
        <TextField
          id="outlined-select-currency"
          select
          label="select training"
          onChange={handleChange}

          value={selection}
          helperText="Please select training level"
          fullWidth
        >
          {earTrainingList.map((option) => (
           <div className='text-center'>
              <MenuItem key={option._id} value={option}>
              Name:{option.name} Level: {option.level}
            </MenuItem>
           </div>
          ))}
          
          
        </TextField>
        </div>

        <Button fullWidth variant="contained" type="submit" onClick={handleSubmit}>
          Get Started
        </Button>

        <h2 className="text-2xl text-center m-2">History</h2>
        <div className="text-center grid place-items-center ">
        <table class="table-auto text-center ">
  <thead>
    <tr>
      <th>Name</th>
      <th>Level</th>
      <th>Score</th>
      <th>Action</th>

    </tr>
  </thead>
  <tbody>
  {historyList.map((option) => (

    <tr>

      <td> {option.earTraining?.name}</td>
      <td>{option.earTraining?.level}</td>
      <td>{option.score}/{option.questions}</td>
<td>              <DeleteIcon onClick={(e)=>deleteEarTrainingHistory(option._id,e)} color="secondary" ></DeleteIcon>
</td>
    </tr>
   ))}
  
  </tbody>
</table>
        </div>

        
       
              </div>
              </Box>
    )
}