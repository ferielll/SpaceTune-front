
import "./style.css"
import Button from '@mui/material/Button';

export default function EarTraining() {
    return (<div className="text-white bg-black eartraining text-center p-5 mt-5 h-[70vh] rounded-lg">
   <h2 className="text-4xl	">Scales Quiz</h2>
   <p className="text-xl p-4">
   In this exercise, you will hear a 
   scale 🎵
   . Your goal is to identify the name of the scale that you heard 👂. 
   </p>
   <h2 className="p-5">0 of 0 correct</h2>
   <Button variant="outlined">Hear Again</Button>
   <h2 className="text-4xl p-5	">Choices</h2>
   <div class="flex flex-col space-y-4 pt-10">
  <div className="item">Major 😀</div>
  <div className="item">Natural Minor 😔</div>
  <div className="item">Harmonic Minor 👳</div>
</div>
     
</div>)
}