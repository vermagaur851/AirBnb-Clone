import React, { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios
      .get("/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length &&
          bookings?.map((booking) => (
            <Link
              as={"div"}
              to={`${booking._id}`}
              className="flex m-2 cursor-pointer gap-4 bg-gray-200 rounded-2xl overflow-hidden"
              key={booking._id}
            >
              <div className="w-52">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 grow md:flex-col md:justify-between">
                <h2 className="text-xl pb-2">{booking.place.title}</h2>
                <div className="flex border pt-3 border-t-gray-400 flex-col md:w-full md:text md:flex-row justify-between gap-1">
                  <div className="flex items-center text-gray-500">
                    <svg
                      fill="black"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                    >
                      <path d="M6 .278a.768.768 0 01.08.858 7.208 7.208 0 00-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 01.81.316.733.733 0 01-.031.893A8.349 8.349 0 018.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 016 .278zM4.858 1.311A7.269 7.269 0 001.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 005.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                    </svg>
                    <div className="flex items-center gap-1">
                      <span className="text-black">
                        {differenceInCalendarDays(
                          new Date(booking.checkOut),
                          new Date(booking.checkIn)
                        )}
                        Nights:{" "}
                      </span>
                      <svg
                        fill="gray"
                        viewBox="0 0 16 16"
                        height="0.8em"
                        width="0.8em"
                      >
                        <path d="M8 7a.5.5 0 01.5.5V9H10a.5.5 0 010 1H8.5v1.5a.5.5 0 01-1 0V10H6a.5.5 0 010-1h1.5V7.5A.5.5 0 018 7z" />
                        <path d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5zM1 4v10a1 1 0 001 1h12a1 1 0 001-1V4H1z" />
                      </svg>
                      {format(new Date(booking.checkIn), "yyyy-mm-dd")}
                      &rarr;
                      <svg
                        fill="gray"
                        viewBox="0 0 16 16"
                        height="0.8em"
                        width="0.8em"
                      >
                        <path d="M5.5 9.5A.5.5 0 016 9h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5z" />
                        <path d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5zM1 4v10a1 1 0 001 1h12a1 1 0 001-1V4H1z" />
                      </svg>
                      {format(new Date(booking.checkOut), "yyyy-mm-dd")}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg
                      viewBox="0 0 64 64"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                    >
                      <path
                        fill="white"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        strokeWidth={2}
                        d="M61 44v11H1V15h60v11M6 9h48v6M6 9a5 5 0 00-5 5"
                      />
                      <path
                        fill="gray"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        strokeWidth={2}
                        d="M43.125 26c-4.972 0-9 4.029-9 9a9 9 0 009 9H63V26H43.125z"
                      />
                      <path
                        fill="black"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        strokeWidth={2}
                        d="M47 35 A3 3 0 0 1 44 38 A3 3 0 0 1 41 35 A3 3 0 0 1 47 35 z"
                      />
                    </svg>
                    Total Price:
                    <span className="font-semibold md:mr-2">
                      ₹{booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default BookingsPage;
