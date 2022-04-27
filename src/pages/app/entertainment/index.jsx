import React, { useState } from "react";
import { Fragment } from "react";
import Breadcrumb from "../../../components/Breadcrum";
import Drawer from "../../../Layout/Drawer"
import LikedTracks from "./likedTracks";
import MyTracks from "./myTracks";
import TracksList from "./trackList";
import UploadTracks from "./uploadTracks";
import detailTracks from "./detailTracks/detailTracks";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import FallBackSuspense from "../../../components/FallBackSuspense"

export default function Entertainment() {
  const [isOpen, setIsOpen] = useState(false)
  const navigation = [
    {
      name: "Home",
      to: "RandomTracks",
      current: true

    },
    {
      name: "Upload Tracks",
      to: "uploadtracks",
      current: false

    },
    {
      name: "My Tracks",
      to: "myTracks",
      current: false

    },
    {
      name: "Liked Tracks",
      to: "likedTracks",
      current: false

    },
]
  return (
    <div>

    <Breadcrumb title={"Entertainement"} setIsOpen={setIsOpen} isOpen={isOpen} />


    <div className="flex flex-row">

      <div className={`${isOpen ? 'w-1/12' : 'w-0'} flex flex-col`}>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen} navigation={navigation} />

      </div>
      <div className={`${isOpen ? 'w-11/12' : 'w-full'} flex flex-col p-1`}>
        <Suspense fallback={<FallBackSuspense />}>
          <Routes>
            <Route path="/RandomTracks" element={<TracksList />}></Route>
            <Route path="/uploadtracks" element={<UploadTracks />}></Route>
            <Route path="/myTracks" element={<MyTracks />}></Route>
            <Route path="/likedTracks" element={<LikedTracks />}></Route>
            <Route path="/track/:trackId" element={<detailTracks />}></Route>
          </Routes>
        </Suspense>
      </div>


    </div>
  </div>
  );
}
