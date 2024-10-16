import React, { useEffect, useState } from "react";
import { Container, Button, Table } from 'react-bootstrap';
import crewimg from "../Assets/crewimg.png";
import { BsArrowRight } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import config from '../config'
function Crewtablecard(props) {

    const navigate = useNavigate()
    const Crewlisted = (url) =>{      
       navigate(url, {state :{ cardtype: "explore"}} )
    }
    
    const[alltable, setAlltable] = useState({});
    
useEffect(()=>{
    setAlltable(props?.data)
},[props?.data])
console.log("alltablealltable" , alltable)

    return (

        <>

            <div className="pos crewtablelist">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>NFT</th>
                            <th>Current Price</th>
                           
                            <th>Last Sale</th>
                            <th>Owner</th>
                            <th>Time Listed</th>
                        </tr>
                    </thead> 
                    
                    <tbody>     
                        {alltable?.length  ?  alltable?.map((e,i)=>            
                        <tr onClick={()=>Crewlisted(`/crewdetail/${e?.CollectionNetwork +'/'+ e?.ContractAddress +'/'+ (e?.NFTOwner ? e?.NFTOwner : e?.NFTOwner )+ '/'+ e?.NFTId}`)}>
                            <td className="d-flex align-items-center">
                                <div className="crewborder d-flex align-items-center justify-content-center">
                                    {console.log("alltable--->" , e)}
                                    {/* <img src={e?.NFTOrginalImage.includes('http') ? e.NFTOrginalImage  :`${e.CompressedFile ? config.IMG_URL+'/nft/'+e.NFTCreator +'/Compressed/NFT/'+e.CompressedFile : config.IMG_URL+'/nft/'+e.NFTCreator +'/Original/NFT/'+e.NFTOrginalImage}`}  className="img-fluid" /> */}
                                    <img src={e?.NFTOrginalImage?.includes('http') ? e.NFTOrginalImage  :`${e.CompressedFile ? config.IMG_URL+'/nft/'+e.NFTCreator +'/Compressed/NFT/'+e.CompressedFile : config.IMG_URL+'/nft/'+e.NFTCreator +'/Original/NFT/'+e.NFTOrginalImage}`}  className="img-fluid"
                                     onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop if fallback image also fails
                    e.target.src = config.NOIMAGE; // Fallback image URL
                  }} 
                  alt ="crew"/>
                              
                                </div>
                                <h6 className="whtsclr fw-300 mb-0 ms-2">{e?.NFTName} </h6>
                            </td>
                            <td> <h6 className="whtsclr fw-300 mb-0">{e?.NFTPrice ? e?.NFTPrice +"  "+ e?.CoinName : "-/-"}</h6></td>
                            
                            <td><h6 className="whtsclr fw-300 mb-0">0.0232 ETH </h6></td>
                            {/* <td><h6 className="whtsclr fw-300 mb-0">{ props?.creatordetailes?.CreatorName[0] ? props?.creatordetailes?.CreatorName[0] : props?.creatordetailes?.CreatorName  } </h6></td> */}
                            <td><h6 className="grayclr fw-300 f-16 mb-0">{ props?.creatordetailes?.CreatorName ? props?.creatordetailes?.CreatorName : props?.creatordetailes?.Creatoraddress  }</h6></td>
                            <td><h6 className="grayclr fw-300 f-16 mb-0">{( e?.PutOnSaleType !== 'UnlimitedAuction')? (Date(e?.updatedAt)) : 'not yet listed' }</h6></td>
                        </tr>) : 
                           <tr >
                      
                           {/* <td className="d-flex align-items-center"> */}
                            
                               <h3 className="whtsclr fw-300 mb-0 ms-2">no data found</h3>
                           {/* </td> */}
                           {/* <td> <h6 className="whtsclr fw-300 mb-0">no data found</h6></td>
                           <td><h6 className="whtsclr fw-300 mb-0">no data found </h6></td>
                           <td><h6 className="whtsclr fw-300 mb-0">no data found</h6></td>
                           <td><h6 className="whtsclr fw-300 mb-0">no data found</h6></td>
                           <td><h6 className="grayclr fw-300 f-16 mb-0">no data found</h6></td> */}
                       </tr>
                        }
                    </tbody>
                </Table>
            </div>

        </>
    )
}

export default Crewtablecard;