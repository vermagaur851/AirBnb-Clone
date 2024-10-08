import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/_places").then((response) => {
      setPlaces(response.data);
    });
  });

  return (
    <div className="mt-8 grid gap-x-8 gap-y-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {places.length > 0 &&
        places.map((places,index) => (
          <Link key={index}
          to={'/places/'+places._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {places.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={
                    "http://localhost:3000/static/uploads/" + places.photos[0]
                  }
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold">{places.title}</h2>
            <h3 className="font-sm text-gray-500">{places.address}</h3>
            <div className="mt-1">
              <span className="font-bold">₹{places.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
}

export default IndexPage;
