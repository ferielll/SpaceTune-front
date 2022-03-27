import React, { useEffect } from "react";
import Breadcrumb from "../../../components/Breadcrum";
import AllItemsList from "./AllItemsList";
import NewItemsList from "./NewItemsList";
import UsedItemsList from "./UsedItemsList";
import { useState } from "react"

import Drawer from "../../../Layout/Drawer";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import FallBackSuspense from "../../../components/FallBackSuspense";
//import NewItem from "./NewItem";

export default function Shop() {

  const [isOpen, setIsOpen] = useState(false)
  const navigation = [
    {
      name: "New Items",
      to: "newitems",
      current: true

    },
    {
      name: "Used Items",
      to: "useditems",
      current: false

    },]
  return (
    <div>
      
      <Breadcrumb title={"Shop"} setIsOpen={setIsOpen} isOpen={isOpen} />


      <div className="flex flex-row">

        <div className={`${isOpen ? 'w-1/12' : 'w-0'} flex flex-col`}>
          <Drawer isOpen={isOpen} setIsOpen={setIsOpen} navigation={navigation} />

        </div>
        <div className={`${isOpen ? 'w-11/12' : 'w-full'} flex flex-col p-1`}>
          <Suspense fallback={<FallBackSuspense />}>
            <Routes>
              <Route path="/" element={<AllItemsList />}></Route>
              <Route path="/newitems" element={<NewItemsList />}></Route>
              <Route path="/useditems" element={<UsedItemsList />}></Route>
            </Routes>
          </Suspense>
        </div>


      </div>
    </div>

  );
}