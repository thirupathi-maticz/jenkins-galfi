import React, { useEffect, useRef, useState } from "react";
import { Container, Button, Accordion, Offcanvas, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import Header from "../Layouts/header";
import Footer from "../Layouts/footer";
import { Link, useLocation } from "react-router-dom";



function Terms() {
const location = useLocation();
console.log("dhiashhdhshdh",location.state)
const [data , setdata] = useState({});
useEffect(() => {
    setdata(location.state)
},[location.state])
    return (

        <>

            <div className="section_seven">
                <Header />
                <div className="innerpage stars exploress">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div className="container pt-3 pt-sm-5">
                        <h2 className="heading text-center pb-3 pb-sm-5">Terms & Conditions</h2>
                        <div className="privacy">
                        <div className="subpara"  dangerouslySetInnerHTML={ { __html: data?.description }} />   



                        
                           
{/* 
                            <p className="subpara">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                <br /><br />
                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                <br /><br />
                                But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure.
                            </p> */}
                        </div>
                    </div>
                </div>
                <Footer />
            </div >


        </>


    )
}

export default Terms
