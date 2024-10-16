import React, { useEffect, useState } from "react";
import { Container, Button } from 'react-bootstrap';
import crewimg from "../Assets/crewimg.png";
import { BsArrowRight } from "react-icons/bs";
import config from '../config'
function Crewcard(props) {
console.log("propssss", props.product)
if( props?.product){
    const { from , imageurl , price , coinname , nftname , putonsaletype , nftprice , nftid , owners , ipfs , image_url} = props?.product ;
console.log("dhsgdagsdga", props ,imageurl, image_url)

const addDefaultImg = ev => {
    ev.target.src = ipfs ;
 }


    return (
        (from === 'allgrid' || from === "limitgird") ? 
        <div className="crewcard pb-3 pt-3 pos">
        <div className="text-center">
        <img src={image_url  ? image_url : ipfs } className="img-fluid crewimg" loading="lazy"    onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop if fallback image also fails
                    e.target.src = config.NOIMAGE; // Fallback image URL
                  }} alt="crew" />
        </div>
       <p className="crewmate ms-2  ms-lg-2 ms-xl-2 ms-xxl-3 mb-0 mt-2">{nftname + " "} </p>
       <p className="crewmate ms-2 ms-lg-2 ms-xl-2 ms-xxl-3 fw-600">{nftprice ? nftprice : owners?.NFTPrice} {owners?.CoinName} </p>
       <p className="grayclr ms-2 ms-lg-2 ms-xl-2 ms-xxl-3 mb-0">{owners?.PutOnSaleType ? owners?.PutOnSaleType : putonsaletype} {" " +price ? price : owners?.NFTPrice+" "} {coinname ? coinname : owners?.CoinName}</p>
       {from === "stake"  ? <p className="whtsclr f-16 mb-0 ar_right stakep">Stake</p> :
       <BsArrowRight className="ar_right"/>}
    </div>

        : props?.product ?
        <>

            <div className="crewcard pb-3 pt-3 pos">
                <div className="text-center">
                <img src={image_url ? image_url : ipfs}  alt="crew" 
                 onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop if fallback image also fails
                    e.target.src = config.NOIMAGE; // Fallback image URL
                  }}
                className="img-fluid crewimg"/>
                </div>
               <p className="crewmate ms-2  ms-lg-2 ms-xl-2 ms-xxl-3 mb-0 mt-2">{nftname + " "} </p>
               <p className="crewmate ms-2 ms-lg-2 ms-xl-2 ms-xxl-3 fw-600">{nftprice} ETH</p>
               <p className="grayclr ms-2 ms-lg-2 ms-xl-2 ms-xxl-3 mb-0">{putonsaletype}: {" " +price +" "} {coinname}</p>
               {from === "stake"  ? <p className="whtsclr f-16 mb-0 ar_right stakep">Stake</p> :
               <BsArrowRight className="ar_right"/>}
            </div>

        </> : <>
    <div className="crewcard pb-3 pt-3 pos">
    <div className="text-center">
    <img src={crewimg} className="img-fluid crewimg"    onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop if fallback image also fails
                    e.target.src = config.NOIMAGE; // Fallback image URL
                  }} alt="crew"/>
    </div>
   <p className="crewmate ms-2  ms-lg-2 ms-xl-2 ms-xxl-3 mb-0 mt-2">Crewmate #3140</p>
   <p className="crewmate ms-2 ms-lg-2 ms-xl-2 ms-xxl-3 fw-600">0.0332 ETH</p>
   <p className="grayclr ms-2 ms-lg-2 ms-xl-2 ms-xxl-3 mb-0">Last sale: 0.03 WETH</p>
   {props.datas === "stake"  ? <p className="whtsclr f-16 mb-0 ar_right stakep">Stake</p> :
   <BsArrowRight className="ar_right"/>}
</div>
</>
    )
}
}



  



export default Crewcard