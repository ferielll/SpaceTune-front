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

function Order() {
  //New order
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  
  //fetch List Orders
  const [orders,setOrders ]= useState([]);
  const url = 'http://localhost:3000/spacetune/api/order/getAll';
  const getAllItems = () => {
    axios.get(url)
    .then((response)=>{
      const allItems = response.data;
      console.log(allItems);
     
      setOrders(allItems);
      
    })
    
  }
  

  useEffect(() => {
    getAllItems();
  }, []);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  async function deleteItem(selectedItem) {
    
    await axios.delete(
      `http://localhost:3000/spacetune/api/order/delete/${selectedItem._id}`
    );
   
    setShowDeleteModal(false);
    setSelectedItem(null);
    getAllItems();
  }


  return (
    <>
      <PageTitle>Order</PageTitle>
      {/* <!-- Cards --> */}
    
      <div className="grid gap-6 mb-5 md:grid-cols-2 xl:grid-cols-4">
         <InfoCard title="Total items" value={orders.length}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard> 
        {showDeleteModal && (
            <ConfirmModal
              title={`Are you sure to delete this order ?`}
              confirmButton="Delete"
              cancelButton="Cancel"
              onClickCancel={() => setShowDeleteModal(false)}
              onClickConfirm={() => deleteItem(selectedItem)}
            />
          )}
        {isModalOpen && (
          <NewOrder isModalOpen={isModalOpen} closeModal={closeModal} />
        )}
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Ref</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Date ordered</TableCell>
              <TableCell>totalMoney</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {
              orders.map((t, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <p className="font-semibold">{t._id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs">{t.userID.userName}</span>
                  </TableCell>
                  <TableCell>
                  <span className="text-sm">{formatDate(t.createdAt)}</span>
                    
                 
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{t.totalMoney}</span>
                  </TableCell>
                  {/* <TableCell>
                    <span className="text-sm">{t.user.userName}</span>
                  </TableCell> */}
                  <TableCell>
                    <div className="space-x-2">
                      <Button size="small" onClick={() => openModal()}>
                        detail
                      </Button>
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

export default Order;

export const NewOrder = ({ isModalOpen, closeModal }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      type: "",
      
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const { name, description, price, type } = data;
    console.log("I started working");
    try {
       await axios
      .post("http://localhost:3000/spacetune/api/order/create", {
        name,
        description,
        price,
        type,
       
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
      <ModalHeader>Add new item</ModalHeader>
      <ModalBody>
        <div>
          <Controller
            name="name"
            control={control}
            rules={{
              required: `Enter name of the order session.`,
            }}
            render={({ field, fieldState: { invalid, error } }) => (
              <Label {...field}>
                  <span>Name</span>
                <Input
                  className="mt-1"
                  valid={invalid ? false : true}
                  placeholder="Enter your name"
                />
                <HelperText valid={false}>{error && error.message}</HelperText>
              </Label>
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{
              required: `Please enter your description.`,
            }}
            render={({ field, fieldState: { invalid, error } }) => (
              <Label {...field}>
                <span>Description</span>
                <Input
                  className="mt-1"
                  valid={invalid ? false : true}
                  placeholder="Write description..."
                />
                <HelperText valid={false}>{error && error.message}</HelperText>
              </Label>
            )}
          />
          <Controller
            name="price"
            control={control}
            rules={{
              pattern: {
                value: /^[0-9]*$/i,
                message: "price should be number",
              },
            }}
            render={({ field, fieldState: { invalid, error } }) => (
              <Label {...field}>
                <span>Price</span>
                <Input
                  className="mt-1"
                  valid={invalid ? false : true}
                  placeholder="Enter price"
                />
                <HelperText valid={false}>{error && error.message}</HelperText>
              </Label>
            )}
          />
          <Controller
            name="type"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <Label {...field}>
                <span>Type</span>
                <Input
                  className="mt-1"
                  valid={invalid ? false : true}
                  placeholder="type"
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
