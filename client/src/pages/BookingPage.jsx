import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import { differenceInCalendarDays, format } from "date-fns";

function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((res) => {
        const foundBooking = res.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  });

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl items-center flex justify-between">
        <div>
          <h2 className="text-2xl mb-2">Your booking information:</h2>
          <div className="flex gap-1">
            <svg
              className="mt-1"
              fill="black"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
            >
              <path d="M6 .278a.768.768 0 01.08.858 7.208 7.208 0 00-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 01.81.316.733.733 0 01-.031.893A8.349 8.349 0 018.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 016 .278zM4.858 1.311A7.269 7.269 0 001.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 005.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
            </svg>
            {differenceInCalendarDays(
              new Date(booking.checkOut),
              new Date(booking.checkIn)
            )}{" "}
            Nights:
            <div className="flex gap-1 items-center ml-2">
              <svg fill="gray" viewBox="0 0 16 16" height="0.8em" width="0.8em">
                <path d="M8 7a.5.5 0 01.5.5V9H10a.5.5 0 010 1H8.5v1.5a.5.5 0 01-1 0V10H6a.5.5 0 010-1h1.5V7.5A.5.5 0 018 7z" />
                <path d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5zM1 4v10a1 1 0 001 1h12a1 1 0 001-1V4H1z" />
              </svg>
              {format(new Date(booking.checkOut), "yyyy-mm-dd")}
            </div>
            &rarr;
            <div className="flex gap-1 items-center">
              <svg fill="gray" viewBox="0 0 16 16" height="0.8em" width="0.8em">
                <path d="M5.5 9.5A.5.5 0 016 9h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5z" />
                <path d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5zM1 4v10a1 1 0 001 1h12a1 1 0 001-1V4H1z" />
              </svg>
              {format(new Date(booking.checkOut), "yyyy-mm-dd")}
            </div>
          </div>
        </div>
        <div className="bg-primary p-4 text-white rounded-2xl">
          <div>Total price :</div>
          <div className="text-3xl">₹{booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}

export default BookingPage;
