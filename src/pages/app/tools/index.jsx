import React from "react";
import { useState } from "react"
import Breadcrumb from "../../../components/Breadcrum";
import Drawer from "../../../Layout/Drawer";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import MetronomePage from "./metronome";
import Tuner from "./tuner";
import FallBackSuspense from "../../../components/FallBackSuspense";
import BeatMaker from "./beatMaker"
import PianoComponent from "./piano"

export default function Tools() {
  const [isOpen, setIsOpen] = useState(false)
  const navigation = [
    {
      name: "Metronome",
      to: "metronome",
      current: true

    },
    {
      name: "Guitar Tuner",
      to: "tuner",
      current: false

    },


    {
      name: "Tab generator",
      to: "tabgenerator",
      current: false

    },
    {
      name: "Ear training",
      to: "eartraining",
      current: false

    },
    {
      name: "Beat Maker",
      to: "beatmaker",
      current: false

    },
    ,
    {
      name: "Piano",
      to: "piano",
      current: false

    }]
  return (
    <div>

      <Breadcrumb title={"Tools"} setIsOpen={setIsOpen} isOpen={isOpen} />


      <div className="flex flex-row">

        <div className={`${isOpen ? 'w-1/12' : 'w-0'} flex flex-col`}>
          <Drawer isOpen={isOpen} setIsOpen={setIsOpen} navigation={navigation} />

        </div>
        <div className={`${isOpen ? 'w-11/12' : 'w-full'} flex flex-col p-1`}>
          <Suspense fallback={<FallBackSuspense />}>
            <Routes>
              <Route path="/metronome" element={<MetronomePage />}></Route>
              <Route path="/tuner" element={<Tuner />}></Route>
              <Route path="/beatmaker" element={<BeatMaker />}></Route>
              <Route path="/piano" element={<PianoComponent />}></Route>

            </Routes>
          </Suspense>
        </div>


      </div>
    </div>

  );
}
