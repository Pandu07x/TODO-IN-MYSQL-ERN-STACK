import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login";
import Index from ".";
export default function Rou(){
    return(
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/todo" element={<Index />} />
            </Routes>
        </BrowserRouter>
    )
    
}