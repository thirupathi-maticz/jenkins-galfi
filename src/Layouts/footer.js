import React, { useEffect, useState } from "react";
import { Container, Button } from 'react-bootstrap';
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { fetchcms } from "../services/cms.api";


function Footer() {
const [terms , setterms] = useState("")
const [about , setabout] = useState("")
  const getcmsdata = async () => {
    try{
        const cmsdata = await fetchcms();
console.log("sdhasgdags" , cmsdata.data.cmsdata[0] )
setterms(cmsdata.data.cmsdata[0])
setabout(cmsdata.data.cmsdata[1])

  
    }catch(err){
    console.error(err)
    }

}


useEffect(() => {
  getcmsdata()
},[])

  return (

    <div className="footerall py-4 py-sm-5">
      <div className="container py-3 py-sm-3 py-md-3 py-lg-4">
        <div className="row align-items-center">
          <div className="col-lg-3 col-xl-3 mt-4 text-center text-lg-start">
           <Link to="/"><img src={logo} className="img-fluid footerlogo" alt="images" /></Link>
          </div>
          <div className="col-lg-7 col-xl-6 titles text-center mt-4">
             <Link to="/">Home</Link>
             <Link to="/explore">Explore</Link>
             {/* <Link to="/aboutus">about us</Link> */}
             <Link to="/aboutus" state={about}>About</Link>
           
             <Link to="/terms" state={terms}>term and conditions</Link>
             {/* <Link to="/terms">Terms</Link> */}
          </div>
          <div className="col-lg-2 col-xl-3 socialicons mt-4 text-center text-lg-end">
            <a href="https://twitter.com/" target="_blank"><BsTwitterX/></a>
            <a href="https://www.instagram.com/" target="_blank"><FaInstagram/></a>
            <a href="https://www.facebook.com/" target="_blank"><FaFacebookF/></a>
          </div>
        </div>

      </div>
      <p className="whtsclr copyright pt-3 mb-0">Copyright @ 2024 Galfi. All Rights Reserved</p>
    </div>
  )
}

export default Footer;