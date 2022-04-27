import React from 'react'

import { Howl, Howler } from 'howler';
//import useState
import { useState } from 'react';

import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import { getBassNote } from './instruments'
import "./styles.css"
export default function PianoComponent() {
  const [buttonText, setButtonText] = useState("Record");

    const firstNote = MidiNumbers.fromNote('c3');
    const lastNote = MidiNumbers.fromNote('f5');
    const keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: firstNote,
      lastNote: lastNote,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });


var eventTimes = [];
var isRecording = false;
var source = '';
var recordArray = [];
var eventTimes = [];
function checkRecord(){
  if(isRecording === true){
      recordArray.push(source);
  }
}
const record =()=>{
  
  isRecording = !isRecording;

console.log(isRecording)
  if (isRecording === true){
      recordArray = [];
  }else{
  }
}
const play=()=>{
  var timeoutRange = 0;
    var timeout = 0;
    var oldDateTime = 0;
    var sound = new Audio(recordArray[0]);
    sound.play();
    for (let index = 1; index < recordArray.length; index++) {
        timeout = eventTimes[index] - eventTimes[index-1];
        timeoutRange = timeout + oldDateTime;
        oldDateTime = timeoutRange;
        setTimeout(function(){
            var sound2 = new Audio(recordArray[index]);
            sound2.play();
        },timeoutRange);
    }
    isRecording = false;
    eventTimes = [];
}

    return (
      <div className='container'>
        <h1 className='text-center'>Simple Piano
        <div className="robot1"></div>
</h1>
      
<button onClick={record} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">🔴</button>
<button onClick={play} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" >▶️</button>

<p className='text-center'>
  Press keys or use your mouse to play a melody 🎵
  we believe in you ❤️
</p>
        

 <Piano
 className="PianoDarkTheme"
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(midiNumber) => {
            let sound = new Howl({
                src: getBassNote(midiNumber),
                html5: true,
              });
              source = getBassNote(midiNumber);

              var eventTime = new Date().getTime();
    eventTimes.push(eventTime);
    checkRecord();
              sound.play(); 
        }}
        stopNote={(midiNumber) => {
            console.log(midiNumber)
        }}
        width={1000}
        keyboardShortcuts={keyboardShortcuts}
      />
      </div>
     
    );
}