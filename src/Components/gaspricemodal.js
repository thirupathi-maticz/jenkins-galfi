import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Dropdown } from 'react-bootstrap';
import crewimg from "../Assets/crewimg.png"

function Gasprice(props) {

    const [gaspricemodal, setGaspricemodal] = useState(true);
    const [gasstep, setGasstep] = useState(1)

    return (

        <div>
            <Modal show={gaspricemodal} className="placemodal" size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onClick={() => props.onDismiss()}></Modal.Header>
                <Modal.Body className='px-3 px-sm-5'>

                    {gasstep === 1 &&
                        <>
                            <h4 className="heading text-center">WIthdraw GAL Tokens </h4>
                            <p className="whtsclr mb-3 text-center">Unstake available after:-</p>

                            <p className="whtsclr f-18 mb-0 mt-4">0 GAL Available</p>
                            <div className="mb-3 mt-2 pos">
                                <p className="text-uppercase whtsclr text_eth1 mb-0">GAL</p>
                                <p className="text-uppercase whtsclr text_ethss secpos mb-0">Max</p>
                                <input type="text" className="form-control inputs" placeholder="0" />
                            </div>

                            <div className="d-flex justify-content-center pb-4">
                                <Button className="explore mt-3 me-3" onClick={() => props.onDismiss()}>Cancel</Button>
                                <Button className="explorefull mt-3 me-3" onClick={()=>setGasstep(2)}>Confirm</Button>
                            </div>
                        </>}

                    {gasstep === 2 &&
                        <>
                        <div className="success_tick">
                            <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                                <g stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                    <path class="circle" d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z" />
                                    <path class="tick" d="M6.5 13.5L10 17 l8.808621-8.308621" />
                                </g>
                            </svg>

                            <h5 className="whtsclr text-center mt-4 mb-4">Stake Successfull</h5>
                            </div>
                        </>
                    }



                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Gasprice;