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
import { PeopleIcon } from "../icons";
import { Controller, useForm } from "react-hook-form";
import RoundIcon from "../components/RoundIcon";
import { useQuery } from "react-query";
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

function Training() {
  //New training
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  //pagination
  //states
  const [currentPage, setCurrentPage] = useState(1);
  let pagination = { page: currentPage, limit: 8 };
  const onChange = async (page) => {
    setCurrentPage(page);
  };
  //fetch List Trainings
  const { data, isLoading, refetch } = useQuery(["FETCHDAT"], () =>
    axios
      .get(
        `http://localhost:3000/spacetune/api/formation/getAll?pagination=${JSON.stringify(
          pagination
        )}&sort=${JSON.stringify(1)}`
      )
      .then((res) => res.data)
  );
  const trainings = useMemo(() => {
    if (isLoading) return [];
    return data?.docs;
  }, [data, isLoading]);

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  console.log(data, "data");
  return (
    <>
      <PageTitle>Training</PageTitle>
      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-5 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total trainings" value={data?.totalDocs}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
        {isModalOpen && (
          <NewTraining isModalOpen={isModalOpen} closeModal={closeModal} />
        )}
      </div>
      <h1
        className="w-1/6 text-white font-semibold cursor-pointer p-3"
        onClick={() => openModal()}
      >
        + Add new training
      </h1>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              trainings?.map((t, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <p className="font-semibold">{t.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs">{t.type}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{t.createdAt}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{t.teacher.userName}</span>
                  </TableCell>
                  <TableCell>
                    <div className="space-x-2">
                      <Button size="small" onClick={() => openModal()}>
                        edit
                      </Button>
                      <Button
                        className="bg-red-500"
                        size="small"
                        onClick={() => openModal()}
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

export default Training;

export const NewTraining = ({ isModalOpen, closeModal }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      type: "",
      image: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const { name, description, price, type, image } = data;
    try {
      await axios
        .post("http://localhost:3000/spacetune/api/formation/create", {
          name,
          description,
          price,
          type,
          image,
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
      <ModalHeader>Add new training</ModalHeader>
      <ModalBody>
        <div>
          <Controller
            name="name"
            control={control}
            rules={{
              required: `Enter name of the training session.`,
            }}
            render={({ field, fieldState: { invalid, error } }) => (
              <Label {...field}>
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
          <Button onClick={() => handleSubmit(onSubmit)}>Confirm</Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
