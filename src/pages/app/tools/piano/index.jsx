import React from 'react'

import { Howl, Howler } from 'howler';


import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import { getBassNote } from './instruments'
import "./styles.css"
export default function PianoComponent() {
    const firstNote = MidiNumbers.fromNote('c3');
    const lastNote = MidiNumbers.fromNote('f5');
    const keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: firstNote,
      lastNote: lastNote,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });
  
    return (
      <div className='container'>
        <h1 className='text-center'>Simple Piano
        <div className="robot1"></div>
</h1>

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