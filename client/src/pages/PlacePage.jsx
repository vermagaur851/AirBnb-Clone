import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";

function Placepage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-4 bg-gray-200 -mx-8 px-8 pt-8">
      <h2 className="text-2xl">{place?.title}</h2>
      <p className="text-sm">owner: <span className="font-semibold capitalize">{place.owner.name}</span></p>
      <AddressLink>{place?.address}</AddressLink>
      <PlaceGallery place={place}/>
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr] ">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn} <br />
          Check-out: {place.checkOut} <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t "></div>
      <div>
        <h2 className="font-semibold text-2xl">Extra Info</h2>
      </div>
      <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
        {place.extraInfo}
      </div>
    </div>
  );
}

export default Placepage;
