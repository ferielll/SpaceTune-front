import { Button, DatePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { useState } from "react";

const OnlineLesson = () => {
  const [selectedTime, setSelectedTime] = useState(undefined);
  const [description, setDescription] = useState("");

  function onChange(value, dateString) {
    setSelectedTime(dateString);
  }
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="flex flex-col bg-white max-w-lg px-6 py-4 rounded-lg shadow-md">
      <h1 className="font-semibold text-gray-700 text-lg mb-5">
        Add online lesson
      </h1>
      <div className="flex flex-col w-full relative">
        <label className="block mb-1 text-sm font-semibold text-gray-700">
          Descriptipn
        </label>
        <TextArea
          placeholder="Write description"
          onChange={(e) => handleDescription(e)}
        />
      </div>
      <div className="flex flex-col w-full relative">
        <label className="block mb-1 text-sm font-semibold text-gray-700">
          Date
        </label>
        <DatePicker showTime onChange={onChange} />
      </div>
    </div>
  );
};

export default OnlineLesson;
