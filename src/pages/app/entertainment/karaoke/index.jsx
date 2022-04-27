import { Button } from "@mui/material"
import axios from "axios"
import { useState } from "react"

export default function Karaoke() {
    const [search,setSearch]=useState("")
    const [video,setVideo]=useState(false)
    const onChange=(e)=>{
        setSearch(e.target.value)

    }
    const scrapeTabs=(e)=>{
        e.preventDefault();

        axios
        .post(
         "http://localhost:3000/spacetune/api/track/getvideo",{
             name:search
         }
        )
        .then(res => {
            console.log("tes",res)
            setVideo(res.data)
        })
        .catch(err => console.log(err));
    }
return (
    <div>
        <h1 className="text-center text-6xl">Karaoke Machine </h1>
        <div>
        <input
      type="search"
      className="
      text-center
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      id="exampleSearch"
      placeholder="Type song name"

      onChange={onChange}
      />
        </div>
        <Button fullWidth variant="contained" type="submit" onClick={scrapeTabs}>
          Search
        </Button>

        {video && <div className="text-center"> 
            
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.id}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>}
    </div>
)
}