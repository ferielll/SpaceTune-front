import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import LightBox from "../../../../components/LightBox";
import useLightBox from "../../../../hooks/useLightBox";


export default function TabGenerator() {
  const lightBox = useLightBox();

  const [search,setSearch]=useState('');
  const [tab,setTab]=useState();
  const [loading,setLoading]=useState(false);
  const [success,setSuccess]=useState(false)
  const handleSubmit=async (e)=>{

    const res = await axios.post("http://localhost:3000/spacetune/api/tools/fetchTab",{name:search});
    if(res.data.success==false)
    {
      setSuccess(false)
      setTab(null);

    }else {
      setTab(res.data.content.photo);
setSuccess(true)
    }
  
  }
    return (<div className="metronome text-center" >
    <h2 className="text-3xl">Type the name of the song</h2>


    <div className="flex justify-center mt-10">
  <div className="mb-3 xl:w-96">
    <input
      type="search"
      className="
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
      onChange={(e)=>setSearch(e.target.value)}
    />
 <Button fullWidth variant="contained" type="submit" onClick={handleSubmit}>
          Search
        </Button>
        {lightBox.isLightBoxOpen && tab && (
                    <LightBox
                      images={"http://localhost:3000/"+tab}
                      {...lightBox}
                      closePortal={lightBox.close}
                    />
                  )}
        {tab && <img src={"http://localhost:3000/"+tab} alt="tab" className="w-full h-auto"     onClick={lightBox.open} />}
        {!success && <p className="text-lg m-5"> Tabs not found</p>}
          </div>
</div>


    





</div>)
}