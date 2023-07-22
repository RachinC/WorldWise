/* eslint-disable react/prop-types */
import React from 'react';
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../context/CitiesContext";

function CountryList() {
    const {cities, isLoading} = useCities();
    if(isLoading) return <Spinner />;
    if(!cities.length) return <Message message={"There are no country data to display!!!"}/>

    const countries = cities.reduce((acc, city) => {
    if(!acc.map(el => el.country).includes(city.country)) {
        return [...acc, {country: city.country, emoji: city.emoji}];
    }
    else {
        return acc;
    }
    }, []);

    return(<ul className={styles.countryList}>
        {countries.map(country => <CountryItem country={country} key={country.country}/>)}
    </ul>)
}

export default CountryList;
