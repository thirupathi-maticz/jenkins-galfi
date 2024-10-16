import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Dropdown } from 'react-bootstrap';
import crewimg from "../Assets/crewimg.png";
import eth from "../Assets/eth.png";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import useContractProviderHook from "../services/ContractProviderhook";
import toast from "react-hot-toast";
import { BidApprove } from "../services/nft.api";
import config from '../config'
import ImgAudVideo from "../shared/common";
function CancelBidModal({ isCancelBidModal, handleCancelBidModal, owner, bidder, item,onhide }) {

    const [stakemodal, setStakemodal] = useState(true);
    const [once, setOnce] = useState(true)
    const [Btn, SetBtn] = useState('start')
    const ContractCall = useContractProviderHook()
    const { web3, accountAddress } = useSelector(state => state.LoginReducer.AccountDetails);
    const { payload } = useSelector(state => state.LoginReducer.User)
    const [show9, setShow9] = useState(true);
    const navigate = useNavigate()

    const FormSubmit = async () => {
        SetBtn('process')
        const id = toast.loading('Cancel Your order')
        var error = await ContractCall.Contract_Base_Validation()
        // console.log("adasdasdasdsadasdasdasd",error)
        if (error) {
            toast.update(id, { render: error, type: 'error', isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
            SetBtn('error')
        }
        else {
            // console.log('biiddd',bidder,item);
            var FormValue = {
                TokenBidderAddress: accountAddress,
                NFTQuantity: bidder.NFTQuantity,
                NFTId: item.NFTId,
                ContractAddress: item.ContractAddress,
                ContractType: item.ContractType,
                CollectionNetwork: item.CollectionNetwork,
                from: 'Cancel',
                activity: 'CancelBid',
                Category: item.Category,
                EmailId: payload.EmailId,
                click: `${config.FRONT_URL}/info/${item.CollectionNetwork}/${item.ContractAddress}/${owner.NFTOwner}/${owner.NFTId}`

            }
            console.log('gsfgsfg', FormValue, bidder)
            let Resp = await BidApprove(FormValue)
            console.log('dksfgsdhkg', Resp)
            if (Resp.status) {
                toast.update(id, { render: 'Cancelled Bid Successfully', type: 'success', isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
                SetBtn('done')
                // handleClose();
                handleCancelBidModal()
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                // push(`/galleria/user/profile/${payload?.CustomUrl}`)
            }
            else {
                toast.update(id, { render: 'Transaction Failed', type: 'error', isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
                SetBtn('try')
            }
        }

    }
    useEffect(() => {
 
        BalanceCheck();
    }, [item, owner])

    async function BalanceCheck() {
     
       
            if (once) {
                // let id = toast.loading("Checking balance....")
                let Nftbalance = await ContractCall.Current_NFT_Balance(owner, item);
                console.log("ownneerrsnftbusdasdynowbalittemmm", Nftbalance, owner?.NFTBalance, item.ContractType, owner?.NFTOwner);


                if ((Number(Nftbalance) !== Number(owner?.NFTBalance) && item?.ContractType === '1155') || (Nftbalance.toLowerCase() != owner?.NFTOwner.toLowerCase() && item?.ContractType === '721')) {


                    toast.error("You won't buy at this moment please refresh you data");
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                }

            }
        
      
        return () => { setOnce(false) }

    }

    return (

        <div>
            <Modal show={stakemodal}  className="placemodal" size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onClick={() => {handleCancelBidModal();onhide(); }}>Cancel Bid </Modal.Header>
                <Modal.Body className='px-3 px-sm-5'>
                
                    <div className="text-center mt-3 mb-4">
                        {/* <img src={crewimg} className="img-fluid" /> */}
                    <ImgAudVideo
                  file={item?.CompressedFile.includes("http") ? item?.CompressedFile :`${config?.IMG_URL}'/'${item?.CompressedFile}`}
                  type={
                    item?.CompressedFile
                      ? item?.CompressedFile?.includes(".webp")
                        ? "image"
                        : item?.CompressedFile.includes(".webm")
                          ? "video" : item?.CompressedFile.includes(".mp3") ?
                           "audio"  : "glb"
                     :   item?.CompressedFile
                  }
                  glb={item}
                  from="model"
                  thumb={`${config.IMG_URL}/nft/${item?.NFTCreator}/Compressed/NFT_THUMB/${item?.CompressedThumbFile}`}
                  
                  origFile={`${config.IMG_URL}/nft/${item?.NFTCreator}/Original/NFT/${item?.OriginalFile}`}
                  className="img-fluid"
                />
                    </div>
                    {console.log("sdagsudgas" , item)}
                    <h4 className="whtsclr fw-600">{item.NFTName + " #" + item?.NFTId} </h4>

                    {/* <div className="d-flex justify-content-between pt-2">
                        <div><p className="whtsclr f-18 fw-600 mb-2">Reward per day</p><p className="whtsclr f-18 fw-300 mb-2">0.002 <img src={eth} className="img-fluid bnb ms-2" alt="img" /> ETH</p></div>
                        <div><p className="whtsclr f-18 fw-600 mb-2">Rewards %</p><p className="whtsclr f-18 fw-300 mb-2">0.2 %</p></div>
                    </div> */}

                    <div className="d-flex justify-content-center pb-4">
                        <Button className="explorefull mt-4 me-3"   onClick={Btn == 'start' || Btn === "try" ? FormSubmit : null}
                                            disabled={Btn === 'error' || Btn === "process" || Btn === "done" ? true : false} >{Btn.toLowerCase() === 'start' && 'Start'
                                            || Btn === 'try' && 'Try-Again'
                                            || Btn === 'error' && 'Error'
                                            || Btn === 'done' && 'Done'
                                            || Btn === 'process' && 'In-Progress'
                                            }</Button>
                        <Button className="explore mt-4" onClick={() => {handleCancelBidModal();
                            onhide(); } }>Cancel</Button>
                    </div>


                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CancelBidModal;