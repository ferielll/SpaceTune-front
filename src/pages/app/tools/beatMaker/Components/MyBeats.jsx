import IconButton from '@mui/material/IconButton';
import PlayCircle from '@mui/icons-material/PlayCircle';
import HighlightOff from '@mui/icons-material/HighlightOff';
const MyBeats = (props) => {
    return (
      <div className="bg-black rounded-lg border border-gray-200 text-white text-center p-2">
<h2>My Beats</h2>

<div className="flex flex-col p-2 ">
  <div className="flex">
      <p>first beat</p>
       
      <div>
      <IconButton color="primary" aria-label="upload picture" component="span">
          <PlayCircle />
        </IconButton>
      </div>

      <div>
      <IconButton color="error" >
          <HighlightOff />
        </IconButton>
      </div>
  </div>

  <div className="flex">
      <p>second beat</p>

      <div>
      <IconButton color="primary" aria-label="upload picture" component="span">
          <PlayCircle />
        </IconButton>
      </div>

      <div>
      <IconButton color="error" >
          <HighlightOff />
        </IconButton>
      </div>

  </div>
  <div className="flex">
      <p>third beat</p>
      <div>
      <IconButton color="primary" aria-label="upload picture" component="span">
          <PlayCircle />
        </IconButton>
      </div>

      <div>
      <IconButton color="error" >
          <HighlightOff />
        </IconButton>
      </div>
  </div>

</div>
      </div>)
}
export default MyBeats;