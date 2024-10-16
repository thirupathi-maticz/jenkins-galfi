import React, { useEffect, useState } from "react";
import { Container, Button } from 'react-bootstrap';
import cardimg from "../Assets/cardimg.png";
import config from "../config"
import { Name_showing } from "../shared/common";
function Collectioncard({props}) {

    const {
        CollectionProfileImage,
        DisplayName,
        CollectionSymbol,
        CollectionName,
        field,
        Collectionsnft,
        NFTS,
        Tokensdata,
        from ,
        image_url,
        total_supply
      } = props;
console.log("jsjjsjsjs" , props )
    return (
        from === 'imagegrid' ? 
        <div className="pos">
        <div className="text-center">
        <img src={ CollectionProfileImage
                    ? `${config.IMG_URL + image_url }`
                    : cardimg} className="img-fluid crewimg"/>

        {/* <img src={product?.NFTOrginalImage?.split(':')[0] == 'https' ? product?.NFTOrginalImage : `${config.IMG_URL}/nft/${product?.NFTCreator}/Original/NFT/${product?.NFTOrginalImage}`} className="img-fluid crewimg"/> */}
        </div>
    </div>
     : 
        <div className="collectioncard">
            <div className="text-center">
             <img src={ CollectionProfileImage
                    ? `${config.IMG_URL + image_url }`
                    : cardimg} className="img-fluid cardimg"/></div>

             <h4 className="cardtitle mx-3">   {Name_showing(CollectionName ? CollectionName : DisplayName)}</h4>
             <div className="d-flex justify-content-between mx-3">
              
                <div> 
                    {/* <div>
                    <p className="titleclr mb-2">Floor</p>
                    <p className="noclr">{Tokensdata?.floorprice ? Tokensdata?.floorprice : 0}</p>
                </div> */}
                <div>
                    {/* <p className="titleclr mb-2">Total volume</p> */}
                    <p className="titleclr mb-2">Total Assets</p>
                    <p className="noclr">{total_supply ? total_supply  : "unknown" }</p>
                </div>  </div> 
             </div>
        </div>
    )
}

export default Collectioncard;