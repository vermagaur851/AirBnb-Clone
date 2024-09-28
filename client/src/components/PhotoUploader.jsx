import React from "react";
import axios from "axios";
import { useState } from "react";

function PhotoUploader({photos,onChange}) {
  const [photoLink, setPhotoLink] = useState("");
  async function addPhotosByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post("upload-by-link", {
      Link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  async function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();
    data.set("photos", files);
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    await axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filename } = response;
        onChange((prev) => {
          return [...prev, filename];
        });
      });
  }
  return (
    <>
      <div className="flex gap-2">
        <input
          className="border border-gray-300 bg-gray-100"
          type="text"
          placeholder={`Add photo using a link ....jpg`}
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
        />
        <button
          onClick={addPhotosByLink}
          className="bg-gray-200 px-4 m-auto p-2 rounded-2xl"
        >
          Add&nbsp;photo
        </button>
      </div>

      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {photos?.length > 0 &&
          photos.map((link, index) => (
            <div key={index} className="flex h-32">
              <img
                src={`http://localhost:3000/static/uploads/${link}`}
                alt={link}
                className="rounded-2xl w-full object-cover"
              />
            </div>
          ))}
        <label className="h-32 cursor-pointer flex gap-1 justify-center items-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 ">
          <input onChange={uploadPhoto} type="file" className="hidden" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
}

export default PhotoUploader;
