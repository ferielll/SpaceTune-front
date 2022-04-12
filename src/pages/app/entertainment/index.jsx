import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrum";
import Drawer from "../../../Layout/Drawer"
import UploadTracks from "./UploadTracks";

export default function Entertainment() {
  const [isOpen, setIsOpen] = useState(false)
  const navigation = [
    {
      name: "Upload Tracks",
      to: "uploadtracks",
      current: true

    },
    {
      name: "Karaoke",
      to: "karaoke",
      current: false

    },
]
  return (
    <div>
      <Breadcrumb title={"Entertainment"} />
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} navigation={navigation} />
      <div className="w-2/4 container mx-auto">
      <UploadTracks />
      </div>
    </div>
  );
}
