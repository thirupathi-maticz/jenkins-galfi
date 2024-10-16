import React, { useEffect, useMemo, useRef, useState } from "react";
import { Container, Button, Modal, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import bnb from "../Assets/bnb.png";
import eth from "../Assets/eth.png";
import { useSelector } from "react-redux";
import useContractProviderHook from "../services/ContractProviderhook";
import { useNavigate } from "react-router";
import { NumANdDotOnly, NumberOnly, isEmpty, toFixed } from "../shared/common";
import config from '../config'
import toast from "react-hot-toast";
import { BidApprove } from "../services/nft.api";
function Placeabid({ isEditBidModal, handleEditBidModal, bidder, bid, owner, item, owners ,onhide}) {

    const ref = useRef(null);

    const [once, setOnce] = useState(true)
    const { currency } = useSelector(state => state.LoginReducer)
    const { web3, accountAddress, coinBalance } = useSelector(state => state.LoginReducer.AccountDetails);
    const { NativeToken, sellerFees, buyerFees, buyerFeesNative, sellerFeesNative } = useSelector(state => state.LoginReducer.ServiceFees);
    const ContractCall = useContractProviderHook()
    const navigate = useNavigate()
    const { payload } = useSelector(state => state.LoginReducer.User)
    const [Btn, SetBtn] = useState('start')
    const [Error, SetError] = useState({})
    const [TokenQuantity, SetTokenQuantity] = useState('1')
    const [TokenBal, SetTokenBal] = useState()
    const [found, setfound] = useState({})
    const [FormValue, SetFormValue] = useState({
      TokenBidderAddress: accountAddress,
      // TokenOwner_Name   : owner.ProfileUrl,
      Category: item?.Category,
      NFTQuantity: isEmpty(bidder) ? 1 : bidder.NFTQuantity,
      TokenBidAmt: isEmpty(bidder) ? 0 : bidder.TokenBidAmt,
      NFTId: item?.NFTId,
      ContractAddress: item?.ContractAddress,
      ContractType: item?.ContractType,
      CollectionNetwork: item?.CollectionNetwork,
      CoinName: (isEmpty(owner?.CoinName) || owner?.PutOnSaleType !== "TimedAuction") ? isEmpty(bidder) ? currency?.filter(item => item.label !== config?.COIN_NAME)?.length > 0 ? currency.filter(item => item.label !== config?.COIN_NAME)[0].label : config?.COIN_NAME : bidder.CoinName : owner?.CoinName
    })
   
    useEffect(() => {
    
        BalanceCheck();
      }, [item, owner])
      useEffect(() => {
    
        BalanceCheck();
      }, [item, owner])
    useEffect(() => {
        const fd = owners?.find((element) => element.NFTOwner.toLowerCase() == accountAddress.toLowerCase());
        setfound(fd)
        BalCal(FormValue.CoinName)
      }, [FormValue.CoinName])
      const BalCal = async (data) => {
        let TokenBal = await ContractCall.Token_Balance_Calculation(Token_details.token_address, accountAddress)
        console.log("tokenbal", TokenBal, Token_details);
        SetTokenBal(TokenBal)
      }

      const Token_details = useMemo(() => {
        var data = currency?.filter(item => item.label === FormValue.CoinName)?.pop() ?? currency?.filter(item => item.label !== config?.COIN_NAME)?.pop()
    
        return {
          decimal: data?.decimal ?? 18,
          token_address: data?.address ?? config.DEADADDRESS
        }
      }, [FormValue.CoinName])

      const YouWillGet = useMemo(() => {
        return ContractCall.buy_bid_price_calculation(
          (FormValue.TokenBidAmt * FormValue.NFTQuantity).toString(),
           (Token_details.decimal.toString()),
            String(Token_details.token_address).toLowerCase() === String(NativeToken).toLowerCase() ? true : false)
      }, [FormValue.TokenBidAmt, FormValue.NFTQuantity])

      const Validation = async () => {
        var Error = {}
        if (isEmpty(FormValue.TokenBidAmt)) Error.TokenBidAmt = "Must Enter Bid Amount"
        if (isEmpty(FormValue.NFTQuantity)) Error.NFTQuantity = "Enter Valid Quantity"
        if (Number(FormValue.NFTQuantity) <= 0 || Number(FormValue.NFTQuantity) < 0) Error.NFTQuantity = "Enter Valid Quantity"
        if (!(Number(TokenBal) > 0)) Error.TokenBal = "insufficient balance"
        // if (owner.NFTPrice) {
        //   if (!(owner.NFTPrice <= FormValue.TokenBidAmt)) { Error.Minbid = `Enter a bid above the minimum ${owner.NFTPrice} ` }
        // }
        if (Number(FormValue.TokenBidAmt) <= 0 || Number(FormValue.TokenBidAmt) < 0) Error.TokenBidAmt = "Bid Amount Must be above  Zero ";
        else if (FormValue.ContractType == "1155" ) {
          if (Number(owner.NFTQuantity - (found ? found.NFTBalance : 0)) < Number(FormValue.NFTQuantity)) {
            Error.NFTQuantity = `Token Quantity Must be less than ${Number(owner.NFTQuantity - (found ? found.NFTBalance : 0))}`  
          }
    
        } else if (FormValue.ContractType == "721" ) {
          if (Number(owner.NFTBalance) < Number(FormValue.NFTQuantity)) {
            Error.NFTQuantity = "Token Quantity Must be less than token Available"
          }
        }
    
        else if (Number(FormValue.NFTQuantity) % 1 !== 0) Error.NFTQuantity = "Token Quantity Must be a Valid Count"
        if (ContractCall.Contract_Base_Validation()) Error.Wal = await ContractCall.Contract_Base_Validation()
        if (FormValue?.CoinName === bid?.CoinName) {
          let bigdata = owner.NFTPrice > bid.TokenBidAmt ? owner.NFTPrice : bid.TokenBidAmt
          if (!isEmpty(bid) &&  FormValue.PutOnSaleType === "TimedAuction" ) {
            if (FormValue.TokenBidAmt <= bid.TokenBidAmt) Error.TokenBidAmt = "Bid Must Be Greater Than " + bid.TokenBidAmt
          }
          else if (owner?.PutOnSaleType === "TimedAuction") {
            if (Number(FormValue.TokenBidAmt) < bigdata) Error.TokenBidAmt = "Minimum Bid is " + owner.NFTPrice
          }
        }
    
        if (TokenBal === 0) Error.TokenBal = `Not Enough Token in Your Wallet, your TokenBalance:${TokenBal}`
        return Error
      }



      const FormSubmit = async () => {
        const id = toast.loading('Approving Token on processing')
        SetError({})
        SetBtn('process')
        let error = await Validation()
        if (!isEmpty(error)) {
          setTimeout(() => {

            toast.dismiss(id)
            toast.error(Object.values(error)[0])

          }, 1500);
          SetBtn('error')
          SetError(error)
        }
        else {
          let allow = web3?.utils?.fromWei((await ContractCall.allowance_721_1155(Token_details.token_address, accountAddress)) ? String(await ContractCall.allowance_721_1155(Token_details.token_address, accountAddress)) : '0')
          var all = toFixed(allow)
          let cont = await ContractCall.approve_721_1155(Token_details.token_address, config.TradeContract, web3?.utils?.toWei(String(Number(YouWillGet) + Number(allow))))
          if (cont) {
            var _data = FormValue
            _data.HashValue = cont.HashValue
            _data.from = isEmpty(bidder) ? 'Bid' : 'Edit'
            _data.activity = isEmpty(bidder) ? 'Bid' : 'Edit'
            _data.EmailId = payload.EmailId
            _data.click = `${config?.FRONT_URL}/info/${item.CollectionNetwork}/${item.ContractAddress}/${owner.NFTOwner}/${owner.NFTId}`
    
            let Resp = await BidApprove(_data)
            if (Resp.status) {
                toast.dismiss(id)
                toast.success('Make offer for token Successfully')
              SetBtn('done')
              handleEditBidModal()
    
              setTimeout(() => {
                navigate('/')
              }, 1500);
              // navigate.push(`/galleria/user/profile/${payload?.CustomUrl}` )
            }
            else {
                toast.dismiss(id)
                toast.error('Transaction Failed')
              SetBtn('try')
            }
          }
          else {
            toast.dismiss(id)
            toast.error('Transaction Failed')
            SetBtn('try')
          }
    
        }
      }

      const onChange = async (e, data) => {
        SetBtn('start')
        let oii = (data === "price") ? e : e.target
    
        const { value, id, name } = oii
        let val = (data === "price") ? "CoinName" : id
        SetFormValue({ ...FormValue, ...{ [val]: data === "inp" ? (name === "NumDotOnly" ? NumANdDotOnly(value) : NumberOnly(value)) : value } })
        if (data === "price") {
          BalCal(value)
        }
      }
 


      async function BalanceCheck() {
       
      
        //   if (once) {

        //     let Nftbalance = await ContractCall.Current_NFT_Balance(owner, item);
        //     console.log("ownneerrsnftbusdasdynowbalittemmm", Nftbalance, "xx",owner?.NFTBalance, item.ContractType, owner?.NFTOwner);
    
    
        //     if ((Number(Nftbalance) !== Number(owner?.NFTBalance) && item?.ContractType === '1155') || (Nftbalance.toLowerCase() != owner?.NFTOwner.toLowerCase() && item?.ContractType === '721')) {
    
    
        //       toast.error("You won't buy at this moment please refresh you data");
        //       setTimeout(() => {
        //         navigate("/");
        //       }, 1000);
        //     }
    
        //   }
        
      
        // return () => { setOnce(false) }
    
      }


      const [placemodal, setPlacemodal] = useState(true);
      const [selectedValue, setSelectedValue] = useState({ img: bnb, name: "BNB" });
      { console.log("ddd", selectedValue); }
      const [tokens, setTokens] = useState([
          { img: bnb, name: "BNB" }, { img: eth, name: "ETH" }
      ])

    return (

        <div>
            <Modal show={placemodal} className="placemodal" size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onClick={() => {
                    onhide();
                    handleEditBidModal();
                }}></Modal.Header>
                <Modal.Body className='px-3 px-sm-5'>
                    <h4 className="heading text-center">{isEmpty(bidder) ? "Place a Bid" : "Edit a Bid"}</h4>
                    <p className="whtsclr mb-1 text-center">You are about to place a Bid for</p>
                    <p className="whtsclr fw-600 text-center">{item?.NFTName}</p>
                    <p className="whtsclr mb-1 text-center fw-300">our bid - {FormValue.TokenBidAmt} for each</p>
                    <div className="mb-3 mt-4">
                        <h5 className="whtsclr">Enter Your Bid</h5>
                        <input type="text" className="form-control inputs" 
                        id="TokenBidAmt" name="NumDotOnly" value={FormValue.TokenBidAmt} onChange={(e) => onChange(e, 'inp')} tabIndex={2} 
                        aria-required="true" required
                        />
                    </div>
                    {console.log("currencycurrency",currency)}
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic"  disabled={owner?.PutOnSaleType === "TimedAuction" ? true : false}  ref={ref}>
                                {/* <img src={selectedValue.img} className="img-fluid bnb" alt="img" />  */}
                                <p className="whtsclr mb-0 ms-2">{FormValue.CoinName ? FormValue.CoinName : "Token"}</p>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {/* {tokens.map((e, i) =>
                                    <Dropdown.Item onClick={() => setSelectedValue(e)}><img src={e.img} className="img-fluid bnb" alt="img" /> <p className="whtsclr mb-0 ms-2">{e.name}</p></Dropdown.Item>
                                )} */}

{
                      FormValue.PutOnSaleType !==
                      "FixedPrice" &&
                      currency?.filter((item) => item.label !== config?.COIN_NAME).map((val) =>
                      (
                        <Dropdown.Item 
                          onClick={(e) => {
                            SetBtn('start');
                            SetFormValue({
                              ...FormValue,
                              ...{ ["CoinName"]: val?.label },
                            });
                            setTimeout(() => {
                              ref.current?.click();
                            }, 0);
                          }}>

                          <div className="sort-filter">
                            <span>{val?.label}</span>
                          </div>
                          </Dropdown.Item>
                      )
                      )}

                            </Dropdown.Menu>
                        </Dropdown>
                        <p className="grayclr f-16 text-center mt-3 mb-0">Bids below this amount wont be allowed if you not
                            enter any amount we will consider as 0</p>
                    </div>
                    <div className="mb-3 mt-4">
                        <h5 className="whtsclr">Enter Quantity (1 available)</h5>
                        <input type="text" className="form-control inputs" 
                          id="NFTQuantity"
                          value={FormValue.NFTQuantity}
                          onChange={(e) => onChange(e, 'inp')}
                          disabled={owner.NFTBalance == '1' || owner.NFTBalance == 1 ? true : false}
                          name="NumOnly"
                          placeholder="Enter Quantity"
                          tabIndex={2} aria-required="true" required
                          />
                           {Error.NFTQuantity &&   <p className='text-danger mt-3 '>
                {Error.NFTQuantity}</p>}
                    </div>
                    <div>
                        <div className="d-flex justify-content-between"><p className="whtsclr f-18">Your Balance :</p><p className="whtsclr f-18 fw-600">{web3?.utils?.fromWei(coinBalance)}</p></div>
                        <div className="d-flex justify-content-between"><p className="whtsclr f-18">Your Bidding balance :</p><p className="whtsclr f-18 fw-600">{TokenBal} {FormValue?.CoinName}</p></div>
                        <div className="d-flex justify-content-between"><p className="whtsclr f-18">Service fee :</p><p className="whtsclr f-18 fw-600">{String(Token_details.token_address).toLowerCase() == String(NativeToken).toLowerCase() ? web3.utils.fromWei(String(buyerFeesNative)) : web3.utils.fromWei(String(buyerFees))}% {FormValue.CoinName}</p></div>
                        <div className="d-flex justify-content-between"><p className="whtsclr f-18">You will pay :</p><p className="whtsclr f-18 fw-600">{(YouWillGet)} {FormValue.CoinName}</p></div>
                    </div>

                    <div className="text-center pb-4"><Button className="explore mt-4"
                           disabled={Btn == 'error' || Btn === "process" || Btn === "done" ? true : false}
                           onClick={Btn == 'start' || Btn === "try" ? FormSubmit : null}
       
       
       
                         >{Btn === 'start' && (isEmpty(bidder) ? 'Place a bid' : 'Edit Bid')
                           || Btn === 'try' && 'Try-Again'
                           || Btn === 'error' && 'Error'
                           || Btn === 'done' && 'Done'
                           || Btn === 'process' && 'In-Progress'
                           }
                    </Button></div>

                    
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Placeabid;