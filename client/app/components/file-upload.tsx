"use client"
import { Upload } from 'lucide-react'
import React from 'react'

const FileUpload: React.FC = () => {

    const buttonClickHandler = () => {
        // Handle button click event here
        console.log("Button clicked!");
        const e = document.createElement("input");
        e.type = "file";
        e.accept = "application/pdf";
        e.click();
        e.onchange = async (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                console.log("Selected file:", file);
                const formData = new FormData();
                formData.append("pdf", file);
                // Send the form data to the server
                const response = await fetch("http://localhost:8000/upload/pdf", {
                    method: "POST",
                    body: formData,
                });
                console.log("Response:", response);
            }
        };
    }
    return (
        <div className='flex items-center justify-center p-4 bg-slate-900 text-white rounded-lg shadow-2xl border-white border-2'>
            <div onClick={buttonClickHandler} className='flex flex-col items-center justify-center w-full h-full'>
                <h3 className='font-bold mb-4'>Upload PDF File</h3>
                <Upload />
            </div>
        </div>
    )
}

export default FileUpload
