import React, { useEffect, useMemo, useState } from "react";
import { Container, Button, Modal, Dropdown } from 'react-bootstrap';
import crewimg from "../Assets/crewimg.png";
import eth from "../Assets/eth.png";
import { Name_showing, address_showing, isEmpty } from "../shared/common";
import toast from "react-hot-toast";
import { BidApprove } from "../services/nft.api";
import { useSelector } from "react-redux";
import useContractProviderHook from "../services/ContractProviderhook";
import { useNavigate } from "react-router";
import config from '../config'
function AcceptBidModal({ isAcceptBidModal, handleAcceptBidModal, bidder, owner, item, approvestatus, onhide }) {

    const [stakemodal, setStakemodal] = useState(true);
    const [once, setOnce] = useState(true)
    const { currency } = useSelector(state => state.LoginReducer)
    const { web3, accountAddress, coinBalance } = useSelector(state => state.LoginReducer.AccountDetails);
    const { NativeToken, sellerFees, buyerFees, buyerFeesNative, sellerFeesNative } = useSelector(state => state.LoginReducer.ServiceFees);
    const ContractCall = useContractProviderHook()
    const navigate = useNavigate()
    // console.log('accepppttt',item)
    const { payload } = useSelector(state => state.LoginReducer.User)
    const [Btn, SetBtn] = useState('start')
    const [Error, SetError] = useState({})
    const [TokenQuantity, SetTokenQuantity] = useState('1')
    const [TokenBal, SetTokenBal] = useState(0)
    const [show6, setShow6] = useState(true);
    const [TokenBtn, SetTokenBtn] = useState("start");
    const handleClose6 = () => setShow6(false);
    const token_address = (currency)?.filter(item => item.label == bidder?.CoinName)?.pop()?.address ?? '0x7CAB80ce0E55F46378E493B584eE61aD68878f11'
    const [SignButton, setSignButton] = useState("stop");

    useEffect(() => {
        BalCal(token_address)
      }, [])

      const BalCal = async (data) => {
        let TokenBal = await ContractCall.Token_Balance_Calculation(data ?? token_address, bidder?.TokenBidderAddress)
        SetTokenBal(TokenBal)
      }



  const YouWillGet = useMemo(() => {
    return ContractCall.price_calculation((bidder?.TokenBidAmt * TokenQuantity).toString(),
      item.NFTRoyalty,
      String(token_address).toLowerCase() == String(NativeToken).toLowerCase() ? true : false)
  }, [bidder?.TokenBidAmt, TokenQuantity])


  const Validation = async () => {
    console.log("invalidationaccept", typeof Number(TokenQuantity))
    var Error = {}

    if (Number(TokenQuantity) <= 0) Error.TokenQuantity = "Must Select Atleast One Token";
    if (isEmpty(TokenQuantity)) Error.TokenQuantity = "Must Select Atleast One Token";
    if (Number(TokenQuantity) % 1 !== 0) Error.TokenQuantity = "Token Quantity Must Be Valid";
    if (await ContractCall.Contract_Base_Validation()) Error.Wal = await ContractCall.Contract_Base_Validation()



    if (!isEmpty(TokenQuantity)) {
      if ((TokenQuantity * bidder?.TokenBidAmt) > web3.utils.fromWei(String(await ContractCall.allowance_721_1155(token_address, bidder?.TokenBidderAddress) ? await ContractCall.allowance_721_1155(token_address, bidder?.TokenBidderAddress) : 0))) Error.Wal = "Bidder Doesn't have enough Allowance"
      if ((TokenQuantity * bidder?.TokenBidAmt) > TokenBal) Error.TokenQuantity = "Bidder Doesn't have enough Balance"
      if ((TokenQuantity > bidder?.Pending)) Error.TokenQuantity = `Token Quantity Must Be less Than ${bidder?.Pending}`
    }

    return Error

  }



  const Convertusd = (price, coinname) => {
    var usdcueency = currency.filter((item) => item.value == coinname)[0]?.usd
    var finalusdprice = (usdcueency * price).toFixed(2)
    return finalusdprice
  }

  const TokenApproveCall = async () => {

    SetTokenBtn("process");
    const id = toast.loading("Approve Processing");
    const cont = await ContractCall.SetApproveStatus((item.ContractType == 721 || item.ContractType == "721") ? 'Sinle' : 'Multiple', item.ContractAddress);
    // toast.update(id, {
    //   render: cont ? "Approved Successfully" : "Approved Failed",
    //   type: cont ? "success" : "error",
    //   isLoading: false,
    //   autoClose: 1000,
    //   closeButton: true,
    //   closeOnClick: true
    // });
    if(cont){
      toast.success("Approved Successfully");

    }else{
      toast.error("Approved Failed");
    }
    if (cont.status) {
      SetTokenBtn("done");
      SetBtn('start')
    } else SetTokenBtn("try");

    toast.dismiss(id);
  };



  const FormSubmit = async () => {
    const id = toast.loading('Accepting Token on processing')
  
try{


    SetError({})
    SetBtn('process')
    var error = await Validation()
    if (!isEmpty(error)) {
      toast.error(Object.values(error)[0])
      // toast.update(id, { render: Object.values(error)[0], type: 'error', isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
      SetBtn('error')
      SetError(error)
    }
    else {
      toast.success("Ready To Place Order")
      // toast.update(id, { render: 'Ready To Place Order', type: 'success', isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
      let cont = await ContractCall.accept_721_1155(bidder?.CoinName,
        bidder?.TokenBidderAddress,
        [item.NFTId, web3.utils.toWei(String(bidder?.TokenBidAmt * TokenQuantity)), TokenQuantity, bidder?.ContractType],
        bidder?.ContractAddress)

      console.log("sdasaxhdgsuuuuh", owner?.NFTPrice, bidder?.NFTPrice, bidder)

      if (cont) {
        var FormValue = {
          TokenBidderAddress: bidder?.TokenBidderAddress,
          NFTQuantity: TokenQuantity,
          NFTId: item.NFTId,
          ContractAddress: item.ContractAddress,
          CollectionNetwork: item.CollectionNetwork,
          ContractType: item.ContractType,
          from: 'accept',
          item: item,
          newOwner: {
            HashValue: cont.HashValue,
            NewTokenOwner: bidder?.TokenBidderAddress,
            NFTQuantity: TokenQuantity,
            NFTId: item.NFTId,
            NFTOwner: owner?.NFTOwner,
            PutOnSale: owner?.PutOnSale,
            PutOnSaleType: owner?.PutOnSaleType,
            TP: owner.PutOnSaleType == "FixedPrice" ? owner?.NFTPrice : bidder?.TokenBidAmt,
            CN: owner.PutOnSaleType == "FixedPrice" ? owner?.CoinName : bidder?.CoinName,
            activity: 'Accept',
            Category: item.Category,
            New_EmailId: bidder?.EmailId,
            Old_EmailId: payload?.EmailId,
            click: `${config.FRONT_URL}/info/${item.CollectionNetwork}/${item.ContractAddress}/${bidder?.TokenBidderAddress}/${owner?.NFTId}`
          }
        }
        let Resp = await BidApprove(FormValue)
        if (Resp.status) {
          toast.success('Accepting Token Successfully')
          // toast.update(id, { render: 'Accepting Token Successfully', type: 'success', isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
          SetBtn('done')
          navigate(`/profiletabs/${payload?.CustomUrl}`);
        }
        // else {
        //   toast.update(id, { render: 'Ready To Place Order', type: 'success', isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
        //   let cont = await ContractCall.accept_721_1155(bidder?.CoinName,
        //     bidder?.TokenBidderAddress,
        //     [item.NFTId, web3.utils.toWei(String(bidder?.TokenBidAmt * TokenQuantity)), TokenQuantity, bidder?.ContractType],
        //     bidder?.ContractAddress)

        //   if (cont) {
        //     var FormValue = {
        //       TokenBidderAddress: bidder?.TokenBidderAddress,
        //       NFTQuantity: TokenQuantity,
        //       NFTId: item.NFTId,
        //       ContractAddress: item.ContractAddress,
        //       CollectionNetwork: item.CollectionNetwork,
        //       ContractType: item.ContractType,
        //       from: 'accept',
        //       item: item,
        //       newOwner: {
        //         HashValue: cont.HashValue,
        //         NewTokenOwner: bidder?.TokenBidderAddress,
        //         NFTQuantity: TokenQuantity,
        //         NFTId: item.NFTId,
        //         NFTOwner: owner?.NFTOwner,
        //         PutOnSale: owner?.PutOnSale,
        //         PutOnSaleType: owner?.PutOnSaleType,
        //         TP: owner?.PutOnSaleType == "FixedPrice" ? owner?.NFTPrice : bidder?.NFTPrice,
        //         CN: owner?.PutOnSaleType == "FixedPrice" ? owner?.CoinName : bidder?.CoinName,
        //         USD: Convertusd(owner.PutOnSaleType == "FixedPrice" ? owner?.NFTPrice : bidder?.NFTPrice, owner.PutOnSaleType == "FixedPrice" ? owner?.CoinName : bidder?.CoinName),
        //         activity: 'Accept',
        //         Category: item.Category,
        //         New_EmailId: bidder?.EmailId,
        //         Old_EmailId: payload?.EmailId,
        //         click: `${config.FRONT_URL}/info/${item.CollectionNetwork}/${item.ContractAddress}/${bidder?.TokenBidderAddress}/${owner?.NFTId}`
        //       }
        //     }
        //     let Resp = await BidApprove(FormValue)
        //     if (Resp.success == 'success') {
        //       toast.update(id, { render: 'Accepting Token Successfully', type: 'success', isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
        //       SetBtn('done')
  
        //     }
        //     else {
        //       toast.update(id, { render: 'Transaction Failed', type: 'error', isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
        //       SetBtn('try')
        //     }
        //   }
        //   else {
        //     toast.update(id, { render: 'Transaction Failed', type: 'error', isLoading: false, autoClose: 1000, closeButton: true, closeOnClick: true })
        //     SetBtn('try')
        //   }


        // }
      }
      else {
      
        toast.error("Transaction Failed")
        SetBtn('try')
      }


    }
  }catch(err){

  }finally{
    toast.dismiss(id)
  }
  }
  const onChange = async (e, data) => {
    SetError({})
    SetBtn('start')
    SetTokenQuantity(e.target.value)
  }


  useEffect(() => {

    BalanceCheck();
  }, [item, owner])



  async function BalanceCheck() {
    // SetMintbtn("process");
 
    //   if (once) {
 
    //     let Nftbalance = await ContractCall.Current_NFT_Balance(owner, item);
    //     console.log("ownneerrsnftbusdasdynowbalittemmm", Nftbalance, owner?.NFTBalance, item.ContractType, owner?.NFTOwner);


    //     if ((Number(Nftbalance) !== Number(owner?.NFTBalance) && item?.ContractType === '1155') || (Nftbalance.toLowerCase() != owner?.NFTOwner.toLowerCase() && item?.ContractType === '721')) {


    //       toast.error("You won't buy at this moment please refresh you data");
    //       setTimeout(() => {
    //         navigate.push("/");
    //       }, 1000);
    //     }

    //   }
    

    return () => { setOnce(false) }

  }


    return (

        <div>
            <Modal show={stakemodal}  className="placemodal" size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onClick={() =>{handleAcceptBidModal(); onhide();} }></Modal.Header>
                <Modal.Body className='px-3 px-sm-5'>
                
                    <div className="text-center mt-3 mb-4"></div>
                    <h4 className="whtsclr fw-600"> {Name_showing(item.NFTName)} </h4>
                    <div className="d-flex justify-content-between">
                        <div><p className="whtsclr f-18 fw-300 mb-2">from</p><p className="whtsclr f-18 fw-600">{address_showing(bidder?.TokenBidderAddress)}</p></div>
                        <div><p className="whtsclr f-18 fw-300 mb-2"></p><p className="whtsclr f-18 fw-600">{bidder?.TokenBidAmt + ' ' + bidder?.CoinName} for {Number(TokenQuantity)} edition(s)</p></div>
                    </div>
<div>
<p className="whtsclr f-18 fw-300 mb-2">Quantity</p>
<input type="nubmer" placeholder="Enter Quantity" className="style-1 acpt_bid_inp" id="TokenQuantity"

value={TokenQuantity} onChange={(e) => onChange(e, 'inp')}
disabled={owner?.NFTBalance == '1' || owner?.NFTBalance == 1 ? true : false}


name="TokenQuantity" tabIndex={2} aria-required="true" required />
{Error.TokenQuantity && <p className='text-danger mt-3 text_error_danger'>{Error.TokenQuantity}</p>}
</div>

                    {Error.TokenQuantity && <p className='text-danger mt-3 text_error_danger'>{Error.TokenQuantity}</p>}
                    <div className="d-flex justify-content-between pt-2">
                        <div><p className="whtsclr f-18 fw-600 mb-2">You will get</p><p className="whtsclr f-18 fw-300 mb-2">{YouWillGet} {bidder?.CoinName} </p></div>
                        <div><p className="whtsclr f-18 fw-600 mb-2">Service fee</p><p className="whtsclr f-18 fw-300 mb-2">{String(token_address).toLowerCase() == String(NativeToken).toLowerCase() ? web3.utils.fromWei(String(buyerFeesNative)) : web3.utils.fromWei(String(buyerFees))}% {bidder?.CoinName} </p></div>
                        <div><p className="whtsclr f-18 fw-600 mb-2">Royalty fee </p><p className="whtsclr f-18 fw-300 mb-2">{item.NFTRoyalty}%</p></div>
                    </div>

                    <div className="d-flex justify-content-center pb-4">
                        <Button className="explorefull mt-4 me-3"
                            onClick={(TokenBtn === 'start' || TokenBtn === 'try') ? TokenApproveCall : null}
                        
                        >   {TokenBtn === 'start' && 'Approve'}
                        {TokenBtn === 'process' && 'In-Progress'}
                        {TokenBtn === 'try' && 'Try-Again'}
                        {TokenBtn === 'done' && 'Done'}</Button>

                        <Button className="explore mt-4"
                         disabled={Btn == 'error' || Btn === "process" || Btn === "done" ? true : false}
                         onClick={(Btn == 'start' || Btn === "try") ? FormSubmit : null}
                         >{Btn == 'start' && 'Accept Bid'
                        || Btn == 'try' && 'Try-Again'
                        || Btn == 'error' && 'Error'
                        || Btn == 'done' && 'Done'
                        || Btn == 'process' && 'In-Progress'
                        || Btn == "putonsale" && "List"
                      }</Button>


                        <Button className="explore mt-4" onClick={() => {handleAcceptBidModal(); onhide(); }}>Cancel</Button>
                    </div>


                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AcceptBidModal;