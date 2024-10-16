import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Button, Accordion, Table } from 'react-bootstrap';
import Header from "../Layouts/header";
import Footer from "../Layouts/footer";
import stakeimg from "../Assets/crewimg.png";
import eth from "../Assets/eth.png";
import Gasprice from "../Components/gaspricemodal";

function Stakedetail(props) {

    const [avail, setAvail] = useState([
        { id: 1 }, { id: 2 }
    ]);
    const [gaspricemodal, setGaspricemodal] = useState(false);
    return (
        <>

         {gaspricemodal && <Gasprice onDismiss={()=>setGaspricemodal(false)}/>}
            <div className="section_seven">
                <Header />

                <div className="innerpage">
                    <div className="container pt-3 pt-sm-5 pb-5">
                        <div className="row pb-4">
                            <div className="col-xl-4 col-xxl-3 mt-5">
                                <img src={stakeimg} className="img-fluid w-100" />
                            </div>
                            <div className="col-xl-8 col-xxl-9 mt-5">
                                <div className="crewdetail">
                                    <p className="crewmate mb-2 mt-2">Crewmate #3140</p>
                                    <p className="crewmate fw-600">
                                        <img src={eth} className="img-fluid eth" /> 0.0332 ETH
                                    </p>
                                    <p className="crewmate fw-600 mt-5">Description</p>
                                    <p className="crewtxt">Ullamcorper quam ante vitae dolor. Donec ac ante et ligula commodo
                                        commodo id ac sem. Cras consectetur dui elit, at hendrerit velit</p>
                                    <div className="row stakelist pt-3">
                                        {/* <div className="d-flex gapss align-items-center mb-3"><h5 className="hfont mb-0">Staking duration</h5><p className="crewmate mb-0 fw-400 mb-0">7 Days</p></div>
                                        <div className="d-flex gapss align-items-center mb-3"><h5 className="hfont mb-0">SReward</h5><p className="crewmate mb-0 fw-400 mb-0">70 Tokens</p></div>
                                        <div className="d-flex gapss align-items-center mb-3"><h5 className="hfont mb-0">Requirement</h5><p className="crewmate mb-0 fw-400 mb-0">1 Public safety officer</p></div> */}
                                        <div className="col-md-6 col-xxl-4"><h5 className="hfont">Staking duration</h5></div>
                                        <div className="col-md-6 col-xxl-6"><p className="crewmate fw-400 mb-0">7 Days</p></div>
                                        <div className="col-md-6 col-xxl-4"><h5 className="hfont">Reward</h5></div>
                                        <div className="col-md-6 col-xxl-6"><p className="crewmate fw-400 mb-0">70 Tokens</p></div>
                                        <div className="col-md-6 col-xxl-4"><h5 className="hfont">Requirement</h5></div>
                                        <div className="col-md-6 col-xxl-6"><p className="crewmate fw-400 mb-0">1 Public safety officer</p></div>
                                    </div>
                                </div>
                                <Button className="explorefull mt-4" onClick={()=>setGaspricemodal(true)}>Stake</Button>
                            </div>
                        </div>

                        <div className="pt-5">
                            <h2 className="heading text-center pb-3 pb-sm-5">Available Pools </h2>
                            <div className="row">
                                {avail.map((e, i)=>
                                <div className="col-md-11 col-lg-6 mx-auto mx-lg-0 mt-4">
                                    <div className="availpool py-3 px-3 pos">
                                        <div className="row align-items-center">
                                            <div className="col-md-6">
                                                <img src={stakeimg} className="img-fluid w-100" />
                                            </div>
                                            <div className="col-md-6 text-center mt-4 mt-md-0">
                                                <h4 className="fhead">Staking duration</h4>
                                                <p className="whtsclr rewards fw-400 ">7 Days</p>
                                                <h4 className="fhead mt-2 mt-xl-4">Reward</h4>
                                                <p className="whtsclr rewards fw-400 ">70 Tokens</p>
                                                <h4 className="fhead mt-2 mt-xl-4">Requirement</h4>
                                                <p className="whtsclr rewards fw-400 ">level 1 space shuttle </p>
                                            </div>
                                        </div>
                                        <p className="whtsclr mb-0 slist">Stake</p>
                                    </div>
                                </div>
    )}
                            </div>

                            <div className="text-center mt-5"><Button className="explore">Load More</Button></div>


                        </div>





                    </div>

                </div>
                <Footer />
            </div>


        </>

    )
}
export default Stakedetail;