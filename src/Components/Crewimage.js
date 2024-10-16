import React, { useEffect, useState } from "react";
import { Container, Button } from 'react-bootstrap';
import crewimg from "../Assets/crewimg.png";
import { BsArrowRight } from "react-icons/bs";
import config from "../config"
import { LazyLoadImage } from "react-lazy-load-image-component";
import   PlaceholderImage from '../Assets/imageload.gif';
function Crewimage({product}) {

    console.log("props", product)


    return (

        <>

            <div className="pos">
                <div className="text-center">
                {/* <LazyLoadImage src={product?.NFTOrginalImage?.split(':')[0] == 'https' ? product?.NFTOrginalImage : `${config.IMG_URL}/nft/${product?.NFTCreator}/Original/NFT/${product?.NFTOrginalImage}`} 
             
                 effect="blur"
                 className="img-fluid crewimg"/> */}

{/* <LazyLoadImage src={product?.image_url.includes('https') ? product.image_url : `${config.IMG_URL +  product.image_url }`} 
key={product?.image_url}
placeholderSrc={product?.image_url.includes('https') ? product.image_url : `${config.IMG_URL +  product.image_url }`}
effect="blur"
className="img-fluid crewimg"/> */}
<img src={product?.image_url.includes('https') ? product.image_url : `${config.IMG_URL +  product.image_url }`}   alt="crew"   onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop if fallback image also fails
                    e.target.src = config.NOIMAGE; // Fallback image URL
                  }}   className="img-fluid crewimg"  />
                </div>
            </div>

        </>
    )
}

export default Crewimage