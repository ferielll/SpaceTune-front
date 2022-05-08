import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { useUser } from "../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function UploadTracks() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("song", file);
    formData.append("name", name);
    formData.append("user", user._id);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post(
        "http://localhost:3000/spacetune/api/track/addTrack",
        formData
      );
      navigate("/app/entertainement/myTracks");
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };
  const updateName = async (e) => {
    setName(e.target.value);
    console.log("name", name);
  };

  return (
    <div>
      <Box component="span" enctype="multipart/form-data">
        <h1 className="text-5xl text-center"> Upload Track</h1>
        <div className="mt-20 text-center">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={updateName}
          />
        </div>
        <div className="mt-5 text-center">
          <TextField
            type="file"
            // name="uploaded_file"
            variant="outlined"
            onChange={saveFile}
          />
        </div>
        <div className="mt-5 text-center">
          <Button variant="contained" onClick={uploadFile}>
            Submit
          </Button>
        </div>
      </Box>
    </div>
  );
}
