import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Pages/home";
import Crewpage from "./Pages/crewdetail"
import Profiletabs from "./Pages/profiletabs";
import Profiledit from "./Pages/profiledit";
import CreateProfile from "./Pages/createprofile"
import Explore from "./Pages/explore";
import Stakes from "./Pages/stakes";
import CollectionNft from "./Pages/collectionsnft";
import CollectionstakeNft from "./Pages/collectionstakenft";
import Stake from "./Pages/stake";
import { ToastContainer } from "react-toastify";
import Aboutus from "./Pages/aboutus";
import Terms from "./Pages/terms";
import Stakedetail from "./Pages/stakedetails";

function App() {
  return (

    <div className="allsections">
  
    <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crewdetail/:network/:Contract/:Owner/:Id" element={<Crewpage />} />
       
          <Route path="/stakedetail" element={<Stakedetail />} />
          <Route path="/profiletabs/:customurl" element={<Profiletabs  />} />
          <Route path="/profiledit" element={<Profiledit />} />
          <Route path="/createprofile" element={<CreateProfile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/stakes" element={<Stakes />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/nftlist/:symbol" element={<CollectionNft />} />
          <Route path="/stakelist/:symbol" element={<CollectionstakeNft />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/terms" element={<Terms />} />
        </Routes> 
      </BrowserRouter>
    
      </div>

  );
}

export default App;