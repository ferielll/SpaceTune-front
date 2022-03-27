import Light from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

export default function LightBox({
  images = [],
  photoIndex,
  isLightBoxOpen,
  closePortal,
  setPhotoIndex,
}) {
  if (!isLightBoxOpen) {
    return null;
  }
  if (typeof images === "string") {
    return (
      <Light
        mainSrc={images}
        onCloseRequest={closePortal}
      />
    );
  }
  return (
    <Light
      mainSrc={images[photoIndex]}
      nextSrc={images[(photoIndex + 1) % images.length]}
      prevSrc={images[(photoIndex + images.length - 1) % images.length]}
      onCloseRequest={closePortal}
      onMovePrevRequest={() =>
        setPhotoIndex((photoIndex + images.length - 1) % images.length)
      }
      onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
    />
  );
}
