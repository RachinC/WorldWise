import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {

  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>} >
              <Route index element={<Navigate replace to="cities" />}/> 
              <Route path="cities" element={<CityList />}/>
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList/>} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
}
export default App;
