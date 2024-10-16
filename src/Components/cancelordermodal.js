import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Dropdown } from 'react-bootstrap';
import crewimg from "../Assets/crewimg.png";
import eth from "../Assets/eth.png";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import useContractProviderHook from "../services/ContractProviderhook";
import toast from "react-hot-toast";
import { BidApprove, CreateOrder } from "../services/nft.api";
import config from '../config'
import ImgAudVideo, { Name_showing } from "../shared/common";
function CancelOrderModal({ isCancelOrderModal, handleCancelOrderModal, owner, types, item,onhide }) {
    const [stakemodal, setStakemodal] = useState(true);
    const ContractCall = useContractProviderHook()
    const { web3, accountAddress } = useSelector(state => state.LoginReducer.AccountDetails);
    const { payload } = useSelector(state => state.LoginReducer.User)
    const [once, setOnce] = useState(true)
    const [SignButton, setSignButton] = useState("stop");
    const navigate = useNavigate()
    const [Btn, SetBtn] = useState('start')


    const Back_end = async (id, HashValue) => {
        owner.HashValue = HashValue
        owner.NFTPrice = 0
        owner.CoinName = ''
        owner.NFTId = owner.NFTId
        owner.PutOnSale = 'true'
        owner.PutOnSaleType = 'UnlimitedAuction'
        owner.activity = types === "Cancel" ? "CancelOrder" : "CancelAuction";
        owner.NFTOwner = accountAddress
        owner.Category = item.Category
        owner.EmailId = payload.EmailId
        owner.ContractType = item.ContractType
        owner.ContractAddress = item.ContractAddress
        owner.CollectionNetwork = item.CollectionNetwork
    
        let Resp = await CreateOrder(owner)
        if (Resp.status) {
          toast.dismiss(id)
          toast.success("Cancelled Your Order Successfully",)
          // toast.update(id, { render: "Cancelled Your Order Successfully", type: "success", isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
          SetBtn('done')
          handleCancelOrderModal()
          window.location.reload();
        }
        else {
            toast.dismiss(id)
            toast.error('Transaction Failed')
          SetBtn('try')
        }
      }



    const FormSubmit = async () => {
        SetBtn('process')
        const id = toast.loading('Cancelling')
        var error = await ContractCall.Contract_Base_Validation()
        if (error) {
        
            toast.dismiss(id)
            toast.error(error)
            // toast.update(id, { render: error, type: 'error', isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
          SetBtn('error')
        }
        else {
          if (types === "Cancel") {
            // console.log("owner.NFTId",owner.NFTId);
            let cont = await ContractCall.cancel_order_721_1155(owner.NFTId)
            console.log("contczzzzont", cont);
            if (cont) {
              await Back_end(id, cont.HashValue)
              handleCancelOrderModal()
            }
            else {
                toast.dismiss(id)
                toast.error('Transaction Failed')
            //   toast.update(id, { render: 'Transaction Failed', type: 'error', isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
              SetBtn('try')
            }
          }
          else {
            await Back_end(id, '')
          }
    
        }
      }
    useEffect(() => {
 
        BalanceCheck();
    }, [item, owner])

    async function BalanceCheck() {
     
       
            // if (once) {
            //     // let id = toast.loading("Checking balance....")
            //     let Nftbalance = await ContractCall.Current_NFT_Balance(owner, item);
            //     console.log("ownneerrsnftbusdasdynowbalittemmm", Nftbalance, owner?.NFTBalance, item.ContractType, owner?.NFTOwner);


            //     if ((Number(Nftbalance) !== Number(owner?.NFTBalance) && item?.ContractType === '1155') || (Nftbalance.toLowerCase() != owner?.NFTOwner.toLowerCase() && item?.ContractType === '721')) {


            //         toast.error("You won't buy at this moment please refresh you data");
            //         setTimeout(() => {
            //             navigate("/");
            //         }, 1000);
            //     }

            // }
        
      
        return () => { setOnce(false) }

    }

    return (

        <div>
            <Modal show={stakemodal}  className="placemodal" size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onClick={() => {handleCancelOrderModal()
            onhide()}}>Cancel Order </Modal.Header>
                <Modal.Body className='px-3 px-sm-5'>
                
                    <div className="text-center mt-3 mb-4">
                        {/* <img src={crewimg} className="img-fluid" /> */}
                    <ImgAudVideo
                  file={`${config?.IMG_URL}/nft/${item?.NFTCreator}/Compressed/NFT/${item?.CompressedFile}`}
                  // type={
                  //   item?.CompressedFile
                  //     ? item?.CompressedFile?.includes(".webp")
                  //       ? "image"
                  //       : item?.CompressedFile.includes(".webm")
                  //         ? "video"
                  //         : "audio"
                  //     : item?.CompressedFile
                  // }
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
                  // from="info"
                  origFile={`${config.IMG_URL}/nft/${item?.NFTCreator}/Original/NFT/${item?.OriginalFile}`}
                  className="img-fluid"
                />
                    </div>
                    <h4 className="whtsclr fw-600"> {Name_showing(item?.NFTName)}</h4>
                    {console.log("sdlagdugasudg" , item)}
                    <h6 className="whtsclr fw-600">   You are about to cancel order for {item?.NFTName} </h6>
                    <div className="d-flex justify-content-between pt-2">
                        <div><p className="whtsclr f-18 fw-600 mb-2">Price</p><p className="whtsclr f-18 fw-300 mb-2">{item?.NFTPrice} {item?.CoinName} 
                        {/* <img src={eth} className="img-fluid bnb ms-2" alt="img" /> ETH */}
                        </p></div>
                        
                    </div>

                    <div className="d-flex justify-content-center pb-4">
                        <Button className="explorefull mt-4 me-3"   onClick={Btn == 'start' || Btn === "try" ? FormSubmit : null}
                                            disabled={Btn === 'error' || Btn === "process" || Btn === "done" ? true : false} >{Btn === 'start' && 'Start'
                                            || Btn === 'try' && 'Try-Again'
                                            || Btn === 'error' && 'Error'
                                            || Btn === 'done' && 'Done'
                                            || Btn === 'process' && 'In-Progress'
                                            }</Button>
                        <Button className="explore mt-4" onClick={() => {handleCancelOrderModal();onhide(); } }>Cancel</Button>
                    </div>


                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CancelOrderModal;