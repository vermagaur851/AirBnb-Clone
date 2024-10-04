import React, { useEffect } from "react";
import PhotoUploader from "../components/PhotoUploader";
import { useState } from "react";
import Perks from "../components/Perks";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/places/" + id).then((response) => {
        const { data } = response;
        setTitle(data.title);
        setAddress(data.address);
        setPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckOut(data.checkOut);
        setCheckIn(data.checkIn);
        setMaxGuests(data.maxGuests);
      });
    }
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(e) {
    e.preventDefault();

    const placeData = {
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    if (id) {
      // update
      console.log('photos');
      await axios.put("/places", {
        id,
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      setRedirect(true);
    } else {
      // new place
      console.log('videos');
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput("Title", "Should be short and catchy as in advertisement")}
        <input
          className="border border-gray-300 bg-gray-100"
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="eg. My lovely home"
        />
        {preInput("Address", "Address to your place")}
        <input
          className="border border-gray-300 bg-gray-100"
          type="text"
          placeholder="address"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
        />
        {preInput("Photos", "more = better")}
        <PhotoUploader photos={photos} onChange={setPhotos} />
        {preInput("Description", "Description of the Photos")}
        <textarea
          className="min-h-32 border border-gray-300 bg-gray-100"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Perks", "Select all the perks of ")}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra Info", "house rules, etc")}
        <textarea
          className="min-h-32 border border-gray-300 bg-gray-100"
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
          placeholder="Optional"
        />
        {preInput(
          "Check in&out time",
          "add check in and out times, remember to have time window for cleaning the room between guests"
        )}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3>Check in time</h3>
            <input
              className="mt-2 -mb-1 border border-gray-300 bg-gray-100"
              type="text"
              placeholder="11"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div>
            <h3>Check out time</h3>
            <input
              className="mt-2 -mb-1 border border-gray-300 bg-gray-100"
              type="text"
              placeholder="16"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
          <div>
            <h3>Max no. of Guests</h3>
            <input
              className="mt-2 -mb-1 border border-gray-300 bg-gray-100"
              type="number"
              placeholder="5"
              value={maxGuests}
              onChange={(ev) =>{
                setMaxGuests(parseInt(ev.target.value));
                console.log(maxGuests);
              } }
            />
          </div>
        </div>
        <div>
          <button onClick={savePlace} className="primary my-4">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlacesFormPage;
