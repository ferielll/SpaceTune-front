import React, { useState, useEffect } from 'react'
import { Controller, useForm } from "react-hook-form";
import { Input, HelperText, Label } from "@windmill/react-ui";
import axios from "axios";

import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
 import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import {
  
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,

  Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../icons'

import response from '../utils/demo/earTrainingData'
// make a copy of the data, for the second table
const response2 = response.concat([])



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height:600,
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  
};

function EarTraining() {
  
  const [open, setOpen] = React.useState(false);
  const [level, setLevel] = React.useState('beginner');
  const [name, setName] = React.useState('name');
  const [scale, setScale] = React.useState(0);
  const [chords, setChords] = React.useState(0);
  const [perfectPitch, setPerfectPitch] = React.useState(0);
const [earTrainingList,setEarTrainingList] = useState([]);

const handleChange=(event)=>{
  setLevel(event.target.value);

}
const deleteEarTraining=async (value,e)=>{



  try {
    await axios
      .delete("http://localhost:3000/spacetune/api/tools/deleteEarTraining/"+value)
      .then((res) => {
        fetchPosts()
console.log(res)
      })
}catch(err){
  console.log(err)
}}
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const submit=async ()=>{

    try {
      await axios
        .post("http://localhost:3000/spacetune/api/tools/createEarTraining", {
          name,
          level,
          scale,
          chords,
          perfectPitch,
        })
        .then((res) => {
          fetchPosts()

          console.log(res, "res");
          setOpen(false);
        });
    } catch (err) {
      console.log(err, "error");
    }
  }
  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1)
  const [pageTable2, setPageTable2] = useState(1)

  // setup data for every table
  const [dataTable1, setDataTable1] = useState([])
  const [dataTable2, setDataTable2] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChangeTable1(p) {
    setPageTable1(p)
  }

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  

  // on page change, load new sliced data
  // here you would make another server request for new data
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:3000/spacetune/api/tools/getEarTrainings");
      console.log(res)

      setEarTrainingList(res.data.content);
    };
  useEffect(() => {
  
    fetchPosts()

  }, []);

  return (
    <>
      <PageTitle>Ear Training Update</PageTitle>


<div className='mt-5'>


      <SectionTitle>List of Trainings</SectionTitle>
      <Button size="large" className='m-2' variant="contained"  onClick={handleOpen}> Add New Training</Button>
    
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Scale</TableCell>

              <TableCell>Chords</TableCell>
              <TableCell>Perfect Pitch</TableCell>

              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {earTrainingList.map((user, i) => (
              <TableRow key={i}>
               
                <TableCell>
                  <span className="text-sm"> {user.name}</span>
                </TableCell>
                <TableCell>
                <span className="text-sm"> {user.level}</span>
                </TableCell>
                <TableCell>
                <span className="text-sm"> {user.scale}</span>
                </TableCell>
                <TableCell>
                <span className="text-sm"> {user.chords}</span>
                </TableCell>
                <TableCell>
                <span className="text-sm"> {user.perfectPitch}</span>
                </TableCell>
            
                <TableCell>
                  <div className="flex items-center space-x-4">
                  
                    <Button layout="link" size="icon" aria-label="Delete" id={user._id} onClick={(e) =>deleteEarTraining(user._id,e)}>
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
       
      </TableContainer>


      
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="grid place-items-center">
        <TextField
          id="outlined-select-currency"
          select
          label="Level"
          onChange={handleChange}

          value={level}
          helperText="Please select training level"
        >
            <MenuItem key="1" value="beginner">
              Beginner
            </MenuItem>
            <MenuItem key="2" value="intermediate">
            Intermediate
            </MenuItem>
            <MenuItem key="3" value="advanced">
            Advanced
            </MenuItem>
          
        </TextField>
        <div className='mt-5'>
        <TextField id="outlined-basic" label="name" variant="outlined" 
                  value={name}
                  onChange={(e)=>setName(e.target.value)}

 />
        </div>
        <div className='mt-5'>
        <TextField id="outlined-basic" min={0}
  max={20} label="Scale Questions" variant="outlined" type="number"
  value={scale}
  onChange={(e)=>setScale(e.target.value)}
 />
        </div>
       
        <div className='mt-2'>
        <TextField id="outlined-basic" min={0}
  max={20} label="Chords Questions" variant="outlined"
  value={chords}
  onChange={(e)=>setChords(e.target.value)}
  />
        </div>

<div className='mt-2'>
<TextField id="outlined-basic" min={0}
  max={20} label="PitchPerfect Questions" variant="outlined"
  value={perfectPitch}
  onChange={(e)=>setPerfectPitch(e.target.value)}
  />
</div>
<div className='mt-5'>
<Button size="large" className='m-2' variant="contained"  onClick={submit}> Add New Training</Button>
</div>
   

        </Box>
      </Modal>
    </>
  )
}

export default EarTraining


export const NewEarTraining = ({ isModalOpen, closeModal }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      level: "",
      scale: "",
      chords: "",
      perfectPitch: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log("+++++")
    const { name, level, scale, chords, perfectPitch } = data;
    try {
      await axios
        .post("http://localhost:3000/spacetune/api/tools/createEarTraining", {
          name,
          level,
          scale,
          chords,
          perfectPitch,
        })
        .then((res) => {
          console.log(res, "res");
        });
    } catch (err) {
      console.log(err, "error");
    }
  };
  return (
    <div className='align-center'>


    </div>

  );
};
