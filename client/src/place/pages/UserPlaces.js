import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import dummyPlaceImage from "../../assets/images/dummy-place.jpg";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl: dummyPlaceImage,
    address: "20 W 34th St, New York, NY 10001, United States",
    location: {
      lat: 40.7484445,
      lng: -73.9878531,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Emp State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl: dummyPlaceImage,
    address: "20 W 34th St, New York, NY 10001, United States",
    location: {
      lat: 40.7484445,
      lng: -73.9878531,
    },
    creator: "u2",
  },
];

const UserPlaces = () => {
  const uid = useParams().uid;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === uid);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
