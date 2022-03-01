import React, { useState } from "react";
import Loader from "../../components/Loader";
import ConfirmModal from "../../components/Modal/ConfirmModal";

export default function Test() {
  const [isOpen, setisOpen] = useState(false);
  return (
    <div>
      <button onClick={(e) => setisOpen(e)}>Click me</button>
      {isOpen && (
        <ConfirmModal
          title="ok"
          content="ok"
          cancelButton="hahaha"
          confirmButton="u can do it"
          onClickCancel={() => setisOpen(false)}
          onClickConfirm={() => console.log("alo i'am confirm btn")}
        />
      )}
      <Loader size={27} />
    </div>
  );
}
