// objects to represent each instrument
export const instruments = [
  { name: 'Clap', sound: "/DrumSamples/Claps/Clap1.wav", pattern: {0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false }, color: 'white' },
  { name: 'Hi-hat (open)', sound: "/DrumSamples/OpenHats/OpenHiHat01.wav", pattern: {0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false }, color: '#3f51b5' },
  { name: 'Hi-hat (closed)', sound: "/DrumSamples/ClosedHats/HiHat01.wav", pattern: {0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false }, color: 'white' },
  { name: 'Snare 2', sound: "/DrumSamples/AltSnare1/AltSD25.wav", pattern: {0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false }, color: '#3f51b5' },
  { name: 'Snare 1', sound: "/DrumSamples/MainSnare/Snare1.wav", pattern: {0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false },color: 'white' },
  { name: 'Kick', sound: "/DrumSamples/Kicks/KickDrum01.wav", pattern: {0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false }, color: '#3f51b5' },
  { name: 'Bassline', sound: "/BassSamples/HighE-BassNote.wav", pattern: {0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false }, color: 'white' }
]

 // returns different sound pointer depending on the position of the counter on the grid
 export function getBassNote(position) {
  if(position >= 14) {
    return "/BassSamples/G-BassNote.wav";  
  }
  if(position >= 12){
    return "/BassSamples/A-BassNote.wav";
  }
  if(position >= 10){
    return "/BassSamples/B-BassNote.wav";
  }
  if(position >= 8){
    return "/BassSamples/D-BassNote.wav";
  }
  if(position >= 6) {
    return "/BassSamples/HighE-BassNote.wav";   
  }
  if(position >= 4){
    return "/BassSamples/D-BassNote.wav";
  }
  if(position >= 2){
    return "/BassSamples/B-BassNote.wav";   
  }
  if(position >= 0){
    return "/BassSamples/HighE-BassNote.wav";  
  }
  return "/BassSamples/HighE-BassNote.wav";
}