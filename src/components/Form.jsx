/* eslint-disable no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { React, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import Spinner from "./Spinner";
import useURLPosition from "../hooks/useURLPosition";
import Message from "./Message";
import { useCities } from "../context/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useURLPosition();
  const {isLoading, addCity} = useCities();
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if(!lat & !lng) return;
    const fetchCityData= async () => {
      try {
      setLoading(true);
      setError("");
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if(!data.countryCode) throw new Error("Could not locate selected place. Please click somewhere else.");
        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      }
      catch(err) {
        setError(err.message)
      }
      finally {
        setLoading(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);

  if(!lat &!lng) return <Message message="Start by clicking somewhere on the map" />
  if (loading || isLoading) return <Spinner />
  if (error) return <Message message={error}/>

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {lat, lng},
    };

    await addCity(newCity);
    navigate("/app/cities");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker 
          id="date"
          selected={date}
          dateFormat={'dd/MM/yyyy'}
          onChange={(date) => setDate(date)}/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={'primary'}>Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
