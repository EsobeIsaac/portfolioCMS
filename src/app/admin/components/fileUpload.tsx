import React, { useState, useEffect, useCallback } from 'react';
import { IoMdCloudUpload } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa";

interface FileInputProps {
  label: string;
  name: string;
  onImageSelect: (file: File) => void;
  bannerImage: string | undefined;
}

const FileInput: React.FC<FileInputProps> = ({ label, name, onImageSelect, bannerImage}) => {
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(bannerImage);
  const [isPDF, setIsPDF] = useState<boolean>(false);

  useEffect(()=>{
    if(bannerImage?.indexOf('/raw/') !== -1) {
      setIsPDF(true)
    }
  })

  const handleFiles = useCallback((files: FileList) => {
    const file = files[0];
    const fileLink = URL.createObjectURL(file);
    
    if (file.type === 'application/pdf') {
      setIsPDF(true);
      setBackgroundImage(undefined);
    } else {
      setIsPDF(false);
      setBackgroundImage(fileLink);
    }

    onImageSelect(file);
  }, [onImageSelect]);

  useEffect(() => {
    const dragArea = document.getElementById('drag-area') as HTMLElement;
    const fileInput = document.getElementById(name) as HTMLInputElement;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        handleFiles(files);
        fileInput.files = files;
      }
    };

    if (dragArea && fileInput) {
      dragArea.addEventListener('dragover', handleDragOver);
      dragArea.addEventListener('drop', handleDrop);
    }

    return () => {
      if (dragArea) {
        dragArea.removeEventListener('dragover', handleDragOver);
        dragArea.removeEventListener('drop', handleDrop);
      }
    };
  }, [handleFiles, name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <div
        className="w-[100%] bg-slate-500 shadow-lg rounded-2xl text-center p-5 mt-1 text-white bg-no-repeat bg-center bg-cover"
        id="drag-area"
        style={{ backgroundImage: backgroundImage == undefined ? undefined : `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})` }}
      >
        <label htmlFor={name}>
          <input
            type="file"
            id={name}
            name={name}
            onChange={handleChange}
            hidden
            accept="image/*,application/pdf"
          />
          
          <IoMdCloudUpload className="text-[150px] w-fit mx-auto" />
          <h4 className="text-md font-semibold text-white mt-5">
            Drag and Drop File To Upload
          </h4>
          <div className="max-w-[200px] mx-auto py-2 px-10 bg-white text-slate-950 mt-5 hover:bg-slate-950 hover:text-white">
            Browse File
          </div>
        </label>
      </div>
    </>
  );
};

export default FileInput;
