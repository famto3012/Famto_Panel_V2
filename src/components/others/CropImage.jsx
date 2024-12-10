import { useState, useRef, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function CropImage({
  selectedImage,
  aspectRatio,
  onCropComplete,
  isOpen,
  onClose,
}) {
  const [imgSrc, setImgSrc] = useState(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [aspect, setAspect] = useState(aspectRatio || 1 / 1);

  useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(selectedImage);
    }
  }, [selectedImage]);

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function handleCropConfirm() {
    if (!imgRef.current || !completedCrop) return;

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    canvas.toBlob((blob) => {
      if (!blob) return;
      const croppedImageFile = new File(
        [blob],
        `${blob.size}-croppedImage.png`,
        { type: "image/png" }
      );
      onCropComplete(croppedImageFile);

      setImgSrc(null);
      setCrop(null);
      setCompletedCrop(null);
      handleClose();
    });
  }

  const handleClose = () => {
    setImgSrc(null);
    setCrop(null);
    setCompletedCrop(null);
  };

  return (
    selectedImage && (
      <DialogRoot
        open={isOpen}
        onInteractOutside={onClose}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <DialogContent>
          <DialogCloseTrigger onClick={onClose} />
          <DialogHeader className="text-[16px] font-[600]">
            Crop image
          </DialogHeader>
          <DialogBody>
            {!!imgSrc && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  style={{ maxWidth: "100%" }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              onClick={handleCropConfirm}
              className="h-[30px] w-[100px] bg-teal-500 text-white rounded-md mt-4"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    )
  );
}
