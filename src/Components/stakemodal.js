import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Dropdown } from 'react-bootstrap';
import crewimg from "../Assets/crewimg.png";
import eth from "../Assets/eth.png";
import config from '../config'
import ImgAudVideo from "../shared/common";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Stakenft } from "../services/nft.api";
function Stakemodals(props) {
const { isStakeOrderModal, handleStakeOrderModal, handleCalendarModal, owner, item, text, closePop, onhide } = props
    const [stakemodal, setStakemodal] = useState(true);
    const { payload, token } = useSelector((state) => state.LoginReducer.User);



const { Categorys } = useSelector((state) => state.LoginReducer);
console.log("sssssszzzxx",props)
const [btnstatus , setbtnstatus]= useState(false)
const handlesubmit = async  () => {
    const id = toast.loading("please wait...")
try{
    setbtnstatus(true)
    const  currentDate = new Date();
    const data ={
     nftid : owner?.NFTId,
     WalletAddress : payload?.WalletAddress ,
     poolID: "3",
     startDate : currentDate.toISOString(),
     endDate : new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000) , 
     lastRewardDay : new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000) , 
     totalStakeDays : '3',
     lastReward:'3',
     transcationhash: "demohash"
    } 

const result = await Stakenft(data)


if(result.status){
    toast.success(result.message)

}else{
    toast.error(result.message)
}
handleStakeOrderModal()
onhide()

}catch(error){
toast.error("please try later ")

}finally{
    setbtnstatus(false)
    toast.dismiss(id)
}




}



    return (

        <div>
            <Modal show={stakemodal}  className="placemodal" size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onClick={() => {
                  onhide()
                handleStakeOrderModal()
                }}></Modal.Header>
                <Modal.Body className='px-3 px-sm-5'>
                
                    <div className="text-center mt-3 mb-4">
                    
                    <ImgAudVideo
                  file={`${config?.IMG_URL}/nft/${item?.NFTCreator}/Compressed/NFT/${item?.CompressedFile}`}
                  type={
                    item?.CompressedFile
                      ? item?.CompressedFile?.includes(".webp")
                        ? "image"
                        : item?.CompressedFile.includes(".webm")
                          ? "video"
                          : "audio"
                      : item?.CompressedFile
                  }
                  thumb={`${config.IMG_URL}/nft/${item?.NFTCreator}/Compressed/NFT_THUMB/${item?.CompressedThumbFile}`}
                  // from="info"
                  origFile={`${config.IMG_URL}/nft/${item?.NFTCreator}/Original/NFT/${item?.OriginalFile}`}
                  className="img-fluid"
                  glb={item}
                  from="model"
                />
                    </div>
                    {console.log("itemitem" , item)}
                    <h4 className="whtsclr fw-600">{item?.NFTName} </h4>

                    <div className="d-flex justify-content-between pt-2">
                        <div><p className="whtsclr f-18 fw-600 mb-2">Reward per day</p><p className="whtsclr f-18 fw-300 mb-2">0.002 <img src={eth} className="img-fluid bnb ms-2" alt="img" /> ETH</p></div>
                        <div><p className="whtsclr f-18 fw-600 mb-2">Rewards %</p><p className="whtsclr f-18 fw-300 mb-2">0.2 %</p></div>
                    </div>

                    <div className="d-flex justify-content-center pb-4">
                        <Button className="explorefull mt-4 me-3" disabled={btnstatus} onClick={() => handlesubmit()}>Stake</Button>
                        <Button className="explore mt-4" onClick={() => {
                                 onhide()
                                 handleStakeOrderModal()
                        }}>Cancel</Button>
                    </div>


                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Stakemodals;