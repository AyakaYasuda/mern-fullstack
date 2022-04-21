import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../../shared/hooks/http-hook";
import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";

const UserPlaces = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const uid = useParams().uid;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${uid}`
        );

        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, uid]);

  const placeDeletedHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces =>
      prevPlaces.filter(place => place.id !== deletedPlaceId)
    );
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDelete={placeDeletedHandler} />
      )}
    </Fragment>
  );
};

export default UserPlaces;
