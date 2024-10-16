import React, { useEffect, useState } from "react";
import { Container, Button, Table } from 'react-bootstrap';
import crewimg from "../Assets/crewimg.png";
import { BsArrowRight } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import cardimg from "../Assets/cardimg.png";
import config from '../config';

function Colloctiontablecard(props) {

    const navigate = useNavigate();
    const Crewlisted = (CollectionSymbol) => {      
       navigate(`/stakelist/${CollectionSymbol}`, {state :{ cardtype: "explore"}} )
    }
    

   const data = props?.props

    return (

        <>

            <div className="pos crewtablelist">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>collection</th>
                            <th>Collection Name</th>
                            <th>CollectionType</th>
                          
                           
                            <th>Creator address</th>
                            {/* <th>Total Nfts</th> */}
                        </tr>
                    </thead>
                    <tbody>     
                        {data?.map((e,i)=>            
                        <tr onClick={()=>Crewlisted(e?.CollectionSymbol)}>
                        
                            <td className="d-flex align-items-center">
                                <div className="crewborder d-flex align-items-center justify-content-center">
                                <img src={ e?.CollectionProfileImage
                      ? `${config.IMG_URL + e?.image_url}`
                    : cardimg} className="img-fluid" alt="crewimg"/>
                                </div>  
                              
                            </td>
                            <td>  <h6 className="whtsclr fw-300 mb-0 ms-2">{e?.CollectionName} </h6></td>
                            <td> <h6 className="whtsclr fw-300 mb-0">{e?.CollectionType}</h6></td>                                      
                            <td><h6 className="whtsclr fw-300 mb-0">{e?.CollectionCreator} </h6></td>
                            {/* <td><h6 className="grayclr fw-300 f-16 mb-0">{e?.Tokensdata ? e?.Tokensdata?.totalnft : 0}</h6></td> */}
                        </tr>
                        )}
                    </tbody>
                </Table>
            </div>

        </>
    )
}

export default Colloctiontablecard;