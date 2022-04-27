import React, { useState, useEffect, useMemo } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import InfoCard from "../components/Cards/InfoCard";
import PageTitle from "../components/Typography/PageTitle";
import { Input, HelperText, Label } from "@windmill/react-ui";
import { CartIcon} from "../icons";
import { Controller, useForm } from "react-hook-form";
import RoundIcon from "../components/RoundIcon";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import axios from "axios";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
} from "@windmill/react-ui";
import { TextareaField } from "evergreen-ui";

function Blogs() {
  //New shop
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  
  
  //fetch List Blogs
  const [blogs,setBlogs ]= useState([]);
  const url = 'http://localhost:3000/spacetune/api/post/getAll';
  const getAllItems = () => {
    axios.get(url)
    .then((response)=>{
      const allItems = response.data;
      console.log(allItems);
     
      setBlogs(allItems);
      
    })
    
  }
  

  useEffect(() => {
    getAllItems();
  }, []);


  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  async function deleteItem(selectedItem) {
    
    await axios.delete(
      `http://localhost:3000/spacetune/api/post/delete/${selectedItem._id}`
    );
   
    setShowDeleteModal(false);
    setSelectedItem(null);
    getAllItems();
  }

  
  return (
    <>
      <PageTitle>Blogs</PageTitle>
      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-5 md:grid-cols-2 xl:grid-cols-4">
         <InfoCard title="Total items" value={blogs.length}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard> 
        {showDeleteModal && (
            <ConfirmModal
              title={`Are you sure to delete "${selectedItem.title}" ?`}
              confirmButton="Delete"
              cancelButton="Cancel"
              onClickCancel={() => setShowDeleteModal(false)}
              onClickConfirm={() => deleteItem(selectedItem)}
            />
          )}

        {isModalOpen && (
          <NewBlog isModalOpen={isModalOpen} closeModal={closeModal} />
        )}
      </div>
      <h1
        className="w-1/6 text-blue font-semibold cursor-pointer p-3"
        onClick={() => openModal()}
      >
        + Add new item
      </h1>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Title</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>User</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {
              blogs.map((t, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <p className="font-semibold">{t.title}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs">{t.subject}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{t.content}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{t.user}</span>
                  </TableCell>
                  <TableCell>
                    <div className="space-x-2">
                      <Button
                        className="bg-red-500"
                        size="small"
                        onClick={() => {
                          setShowDeleteModal(true);
                          setSelectedItem(t);
                        }}
                      >
                        delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TableFooter></TableFooter>
      </TableContainer>
    </>
  );
}

export default Blogs;

export const NewBlog = ({ isModalOpen, closeModal }) => {
    const { handleSubmit, control } = useForm({
      defaultValues: {
        title: "",
        subject: "",
        content: "",
        
      },
      mode: "onChange",
    });
  
    const onSubmit = async (data) => {
      const { title, subject, content } = data;
      console.log("I started working");
      try {
         await axios
        .post("http://localhost:3000/spacetune/api/post/create", {
            title,
            subject,
            content,
        })
          .then((res) => {
            console.log(res, "res");
          });
      } catch (err) {
        console.log(err, "error");
      }
    };
    return (
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Add new blog</ModalHeader>
        <ModalBody>
          <div>
            <Controller
              name="title"
              control={control}
              rules={{
                required: `Enter title of the blog.`,
              }}
              render={({ field, fieldState: { invalid, error } }) => (
                <Label {...field}>
                    <span>Title</span>
                  <Input
                    className="mt-1"
                    valid={invalid ? false : true}
                    placeholder="Enter your title"
                  />
                  <HelperText valid={false}>{error && error.message}</HelperText>
                </Label>
              )}
            />
            <Controller
              name="subject"
              control={control}
              rules={{
                required: `Please enter your subject.`,
              }}
              render={({ field, fieldState: { invalid, error } }) => (
                <Label {...field}>
                  <span>Subject</span>
                  <Input
                    className="mt-1"
                    valid={invalid ? false : true}
                    placeholder="Write subject..."
                  />
                  <HelperText valid={false}>{error && error.message}</HelperText>
                </Label>
              )}
            />
            <Controller
              name="content"
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <Label {...field}>
                  <span>Content</span>
                  <TextareaField
                    className="mt-1"
                    valid={invalid ? false : true}
                    placeholder="content"
                  />
                  <HelperText valid={false}>{error && error.message}</HelperText>
                </Label>
              )}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={handleSubmit(onSubmit)}>Confirm</Button>
          </div>
        </ModalFooter>
      </Modal>
    );
  };
  