import MenuItem from '@mui/material/MenuItem';
import { CloudUploadOutlined } from "@material-ui/icons";
import { Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../components/form/Input";
import TextArea from "../../../components/form/textArea";
import { useLoading } from "../../../hooks/useLoading";
import { useUser } from "../../../hooks/useUser";
import Select, { SelectChangeEvent } from '@mui/material/Select';
function NewItem({ isModalVisible, setModalVisible,refetch ,setRefetch }) {
  //helpers
  const options = [
    { value: true, label: 'Used'},
    { value: false, label: 'New'},
    
   ];
   const default_value = 1;
  const { user } = useUser();
  const { isLoading, startLoading, stopLoading } = useLoading(false);
  // const [name, setName] = useState('');
  // const [type, setType] = useState('');
  // const [isUsed, setIsUsed] = useState(false);
  // const [description, setDescription] = useState('');
  // const [price, setPrice] = useState(0);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [condition, setCondition] = useState(false);
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  // const { handleSubmit, control } = useForm({
  //   defaultValues: {
  //     name: "",
  //     description: "",
  //     price: "",
  //     type: "",
  //     // isUsed: "",
  //   },
  //   mode: "onChange",
  // });

  //const history = useHistory();
  const onSubmit = async (data) => {
     startLoading();
    // const { name, description, price, type } = data;
    
    const formData = new FormData();
    formData.append("photos", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("fileName", fileName);
    formData.append("user", user._id);
    formData.append("isUsed", condition);
    try {
      await axios
        .post("http://localhost:3000/spacetune/api/shop/create", formData
        )
        .then((res) => {
          console.log(res, "res");
          if (!res.data.success) {
            
            stopLoading();
            return;
          }
        });
        setRefetch(refetch+1);
      stopLoading();
      setModalVisible(false);
      
      
    } catch (err) {
      console.log(err, "error");
    }
  };

  const updateName = async (e) => {
    setName(e.target.value);
    console.log("name", name);
  };

  const updateDescription = async (e) => {
    setDescription(e.target.value);
    console.log("description", description);
  };

  const updatePrice = async (e) => {
    setPrice(e.target.value);
    console.log("price", price);
  };

  const updateType = async (e) => {
    setType(e.target.value);
    console.log("type", type);
  };
  const handleChange = async (event) => {
    setCondition(event.target.value );
  };

  // const handleSubmit = async(e) => {
  //   e.preventDefault();
  //   const item = { name, type, isUsed,description,price,user };

  //   //startLoading();
    
  //   try {
  //     await axios
  //       .post("http://localhost:3000/spacetune/api/shop/create", {
  //         item,
  //       })
  //       .then((res) => {
  //         console.log(res, "res");
  //        /* if (!res.item.success) {
  //           //stopLoading();
  //           return;
  //         }*/
  //       });
  //    // stopLoading();
  //   } catch (err) {
  //     console.log(err, "error");
  //   }
  // }

  return (
    <Modal
      title="Add new Item"
      visible={isModalVisible}
      width="350px"
      onCancel={() => setModalVisible(false)}
      centered
      footer={[
        <Button
          loading={isLoading}
          onClick={onSubmit}
          className={` text-white text-sm font-medium py-1 px-4 mr-4 rounded-lg transition-duration-200
                           shadow-md bg-blue-600 `}
        >
          Confirm
        </Button>,
      ]}
    >
      <div>
            <Input
       
              label="Name"
              placeholder="name"
              onChange={updateName}
        
            />
         
            <TextArea           
              label="Description"
              placeholder="Write description..."
              className="whitespace-pre-wrap"
              onChange={updateDescription}
            />
   
            <Input
              label="Price"
              type="text"
              placeholder="price"
              onChange={updatePrice}
            />
         
     
            <Input label="Type" type="text" placeholder="type" onChange={updateType} />
            <Input
            type="file"
            label="Photo"
            // name="uploaded_file"
            variant="outlined"
            onChange={saveFile}
            /><br></br>

<Select
    labelId="Condition"
    id="demo-simple-select"
    value={condition}
    label="Condition"
    onChange={handleChange}
  >
    <MenuItem value={true}>Used</MenuItem>
    <MenuItem value={false}>New</MenuItem>
    
  </Select>
                    
      </div>
    </Modal>
  );
}
 
export default NewItem;