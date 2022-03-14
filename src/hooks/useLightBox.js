import { useState } from "react";

export default function useLightBox() {
  const [isLightBoxOpen, setLightBoxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const open = () => setLightBoxOpen(true);
  const close = () => {
    setLightBoxOpen(false);
    setPhotoIndex(0);
  };
  return {
    isLightBoxOpen,
    setLightBoxOpen,
    photoIndex,
    setPhotoIndex,
    open,
    close,
  };
}
