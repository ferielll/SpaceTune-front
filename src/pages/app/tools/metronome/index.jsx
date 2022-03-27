
import Metronome from '@kevinorriss/react-metronome'
import "./style.css"
export default function MetronomePage() {
    return (<div className=" metronome">
        <h1 className='text-center'>Metronome</h1>
        <p className='text-center'>A great instrumentalist can perform a piece of music at a wide variety of tempos ⏱.
         To truly control your instrument  🎹 🥁 , you must be able to play a passage just as compellingly at rapid speed as you might
          at a languid speed, and vice versa. For centuries, musicians have practiced playing at a variety of tempos by using a device 
          known as a metronome.</p>
    <Metronome  maxBpm="300 " />
</div>)
}