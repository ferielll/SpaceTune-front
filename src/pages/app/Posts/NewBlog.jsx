import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../components/form/Input";
import { useLoading } from "../../../hooks/useLoading";
import { useUser } from "../../../hooks/useUser";
import TextField from "@mui/material/TextField";

function NewBlog({ isModalVisible, setModalVisible,refetch ,setRefetch }) {
  //helpers
  const { user } = useUser();
  const { isLoading, startLoading, stopLoading } = useLoading(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  

  const onSubmit = async (e) => {

    //startLoading();
    // const { subject, content, title,  username } = data;
    // const user = user._id.name;

    const formData = new FormData();
    formData.append("Image", file);
    formData.append("subject", subject);
    formData.append("content", content);
    formData.append("title", title);
    formData.append("fileName", fileName);
console.log("+++++")
    
    try {
      await axios
        .post("http://localhost:3000/spacetune/api/post/create", 
        formData
        )
        .then((res) => {
          console.log(res, "res");
          if (!res.data.success) {
            return;
          }
        });
        setRefetch(refetch+1);
      setModalVisible(false);
      
    } catch (err) {
      console.log(err, "error");
    }
    
    console.log('post',formData)
  };

  const updateSubject = async (e) => {
    setSubject(e.target.value);
    console.log("subject", subject);
  };

  const updateTitle = async (e) => {
    setTitle(e.target.value);
    console.log("title", title);
  };

  const updateContent = async (e) => {
    setContent(e.target.value);
    console.log("content", content);
  };

  return (
    <Modal
      title="Add new blog"
      visible={isModalVisible}
      width="350px"
      onCancel={() => setModalVisible(false)}
      centered
      footer={[
        <button
          onClick={onSubmit}
          className={` text-white text-sm font-medium py-1 px-4 mr-4 rounded-lg transition-duration-200
                           shadow-md bg-blue-600 `}
        >
          Confirm
        </button>,
      ]}
    >
      <div>
            <Input
            //  {...field}
              label="title"
              placeholder="title"
            //  hasError={invalid}
              //error={error && error.message}
              onChange={updateTitle}
            />
  
            <Input
            //  {...field}
              label="subject"
              placeholder="Write subject..."
              className="whitespace-pre-wrap"
            //  hasError={invalid}
             // error={error && error.message}
               onChange={updateSubject}
            />
     
            <Input
            //  {...field}
              label="content"
              type="text"
              placeholder="content"
            //  hasError={invalid}
             // error={error && error.message}
               onChange={updateContent}
            />
       
            <TextField
            type="file"
            label="Image"
            // name="uploaded_file"
            variant="outlined"
            onChange={saveFile}
          />
          
      </div>
    </Modal>
  );
}

export default NewBlog;
