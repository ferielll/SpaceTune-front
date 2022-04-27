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
const [selected , setSelected] = useState(null);
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
                  <NewOrder isModalOpen={isModalOpen} closeModal={closeModal}  selected={selected}/>
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
                      <Button size="small" onClick={() => {openModal();
                        setSelected(t)}}>
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

export const NewOrder = ({ isModalOpen, closeModal, selected }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  console.log("this is selected",selected)
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {/* <ModalHeader>{selected._id} details</ModalHeader> */}
      <ModalBody>
        <div>
          <h1>User : {selected.userID.userName}</h1><br></br>
         <h1>Total Money : {selected.totalMoney}</h1><br></br>
          <h1>Date Ordered : {formatDate(selected.createdAt)}</h1><br></br>
          <h1>Items</h1>
          <br></br>
          {
              selected.orderItems.map((t, i) => (
                <div key={i}>
                  <h2>{t._id} : {t.name}</h2>
                </div>))}

        </div>
      </ModalBody>
      <ModalFooter>
        <div className="hidden sm:block">
          <Button layout="outline" onClick={closeModal}>
            Close
          </Button>
        </div>
        
      </ModalFooter>
    </Modal>
  );
};
