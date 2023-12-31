/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from "react-router-dom";
import { useCities } from "../context/CitiesContext";
import styles from "./CityItem.module.css";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({city}) {
  const { isLoading, currentCity, deleteCity } = useCities();
  const { emoji, cityName, date, id, position } = city;

  const handleClick = (e) => {
    e.preventDefault();
    deleteCity(id);
  };

  if(isLoading) return <Spinner />

return (
    <li >
      <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active']: ''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={e => handleClick(e)}>&times;</button>
    </Link>
    </li>
);
}

export default CityItem;
