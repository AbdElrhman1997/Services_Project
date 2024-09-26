import React from "react";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import Posts from "./Pages/Posts";
import Embroidery from "./Pages/Embroidery";
import Employment from "./Pages/Employment";
import Courses from "./Pages/Courses";
import Products from "./Pages/Products";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./App.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import LanguageToggle from "./Components/LanguageToggle";

function App() {
  const { i18n } = useTranslation();
  const defaultRoute = i18n.language === "ar" ? "/ar" : "/en";
  const location = useLocation();

  // Pages where the header and footer should be hidden
  const hideHeaderFooterRoutes = [
    "/en/login",
    "/en/register",
    "/ar/login",
    "/ar/register",
  ];

  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
    location.pathname
  );

  return (
    <div className="App">
      {!shouldHideHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Navigate to={defaultRoute} replace />} />
        <Route path="/ar" element={<Home />} />
        <Route path="/en" element={<Home />} />
        <Route path="/:lang/services" element={<Services />} />
        <Route path="/:lang/posts" element={<Posts />} />
        <Route path="/:lang/embroidery" element={<Embroidery />} />
        <Route path="/:lang/employment" element={<Employment />} />
        <Route path="/:lang/courses" element={<Courses />} />
        <Route path="/:lang/products" element={<Products />} />
        <Route path="/:lang/register" element={<Register />} />
        <Route path="/:lang/login" element={<Login />} />
      </Routes>
      <LanguageToggle />
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
