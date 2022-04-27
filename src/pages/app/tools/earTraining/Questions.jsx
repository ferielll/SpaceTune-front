import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { Howl, Howler } from 'howler';
import { getBassNote } from "../piano/instruments";
import { useEffect, useState } from "react";
import {scaleQuestion,perfectPitchQuestion,chordsQuestion} from "./question"
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import {useUser} from "../../../../hooks/useUser"
const Questions = () => {
    const navigate = useNavigate();
    const user=useUser()
    const location = useLocation();
let data=location.state

const questions=[]
if(data.scale!=0)
for(let i=0;i<data.scale;i++){
    let random=Math.floor(Math.random()*5)
    
    questions.push(scaleQuestion(random))
}
if(data.chords!=0)
for(let i=0;i<data.chords;i++){
    let random=Math.floor(Math.random()*6)

    questions.push(chordsQuestion(random))
}
if(data.perfectPitch!=0)
for(let i=0;i<data.perfectPitch;i++){
    let random=Math.floor(Math.random()*4)

    questions.push(perfectPitchQuestion(random))
}

const [questionIndex, setQuestionIndex] = useState(0);
const [score, setScore] = useState(0);

let handleClickAnswer = async (e) => {
    if (e.target.textContent === questions[questionIndex]?.correctAnswer) {
        setScore(score+1)   
       }
    if (questionIndex + 1 < questions?.length) {
        setQuestionIndex(questionIndex + 1);
      } else {

        
          await axios
            .post("http://localhost:3000/spacetune/api/tools/addEarTrainingHistory", {
              user:user.user._id,
              score:score,
              questions:questions?.length,
              earTraining:data.id
            })
            .then((res) => {
              navigate("/app/tools/eartraining",{state:{score:score,id:data.id}});

            });
      
    }

}
let hearAgain =(e)=>{
    let sound = new Howl({
        src:questions[questionIndex]?.sound,
        html5: true,
      });
         sound.play();
}


useEffect(() => {
    hearAgain()
  }, [ questionIndex]);


    return (
        <>
     <Box className="box grid place-items-center ">
      <Typography variant="h4">Question {questionIndex + 1} ({questions[questionIndex]?.question}) </Typography>
      <Typography mt={5}>
      <Button onClick={hearAgain} variant="outlined">
        Hear Again
          </Button>
      </Typography>
      {questions[questionIndex]?.answers.map((data,index) => (
        <Box mt={2} key={index}>
          <Button onClick={handleClickAnswer} variant="contained">
            {data}
          </Button>
        </Box>
      ))}
      <Box mt={5}>
        Score: {score} / {questions.length}
      </Box>
      

    </Box>
        </>
    )
}

export default Questions;