import React, { useEffect, useMemo, useState } from "react";
import { Container, Button, Modal, Dropdown } from 'react-bootstrap';
import crewimg from "../Assets/crewimg.png"
import toast from "react-hot-toast";
import ImgAudVideo, { Name_showing, address_showing, isEmpty } from "../shared/common";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useContractProviderHook from "../services/ContractProviderhook";
import config from '../config'
import { BuyAccept } from "../services/nft.api";
function Buynow({ isBuyModal, handleBuyModal, handleProceedBuyModal, owner, item, OpenPopup, onhide }) {


    const [buynowmodal, setBuynowmodal] = useState(true);
    const [counter, setCounter] = useState(1);

    const incrementCounter = () => {
      setCounter(counter + 1);
    };
  
    const decrementCounter = () => {
      if (counter !== 0) {
        setCounter(counter - 1);

      }
    };

    useEffect(() => {
        SetNFTQuantity(counter)
        SetBtn("start");
        SetBtn("start");
        SetApp_Btn("start")
        console.log("countxxer", counter)
    }, [counter])

    //..............
    const [once, setOnce] = useState(true)
    const { currency } = useSelector((state) => state.LoginReducer);
    const { web3, web3p, accountAddress, coinBalance } = useSelector(
      (state) => state.LoginReducer.AccountDetails
    );
    const { NativeToken, sellerFees, buyerFees, buyerFeesNative, sellerFeesNative } = useSelector(
      (state) => state.LoginReducer.ServiceFees);
    const ContractCall = useContractProviderHook();
    const navigate = useNavigate();
  
    const [Error, SetError] = useState("");
    const [NFTQuantity, SetNFTQuantity] = useState("1");
    const [TokenBalance, SetTokenBalance] = useState("0");
    const [show10, setShow10] = useState(false);
    // const handleClose10 = () => closePop();
    const [App_Btn, SetApp_Btn] = useState('start')
  
    const [proceedtopayment, setProceedtopayment] = useState(false);
    const { payload } = useSelector((state) => state.LoginReducer.User);
    const [Btn, SetBtn] = useState("start");
    console.log("owner, item", owner, item);



    const decimal =
    currency
      ?.filter(
        (item) =>
          item.label ===
          (owner.CoinName == "PancakeSwap Token" ? "CAKE" : owner.CoinName)
      )
      ?.pop()?.decimal ?? 18;
  const token_address =
    currency
      ?.filter(
        (item) =>
          item.label ===
          (owner.CoinName == "PancakeSwap Token" ? "CAKE" : owner.CoinName)
      )
      ?.pop()?.address ?? config.DEADADDRESS;

  const YouWillGet = useMemo(() => {
    return ContractCall.buy_bid_price_calculation(
      (owner.NFTPrice * Number(NFTQuantity)).toString(),
      decimal.toString(), String(NativeToken).toLowerCase() == String(token_address).toLowerCase() ? true : false
    );
  }, [owner.TokenPrice, NFTQuantity]);

  const Validation = async () => {
    console.log("efrawefrawrw", NFTQuantity);
    const re = /[0-9]/;
    var error = {};
    if (Number(owner.NFTBalance) > 1 && isEmpty(NFTQuantity))
      return "Token Quantity Required";
    //  else if (owner.NFTBalance > 1 && NFTQuantity.match(re))
    //    return "Token Quantity must be in number";
    else if (Number(owner.NFTBalance) > 1 && (Number(owner.NFTBalance) < Number(NFTQuantity)))
      return (error.NFTQuantity =
        "NFT Quantity should be less than " + owner.NFTBalance);
    if (
      owner.CoinName !== config.COIN_NAME &&
      Number(owner.TokenPrice) * Number(NFTQuantity) > Number(TokenBalance)
    )
      return "Insufficient Balance";
    else return await ContractCall.Contract_Base_Validation();
  };
  const FormSubmit = async () => {

    const id = toast.loading("Approve processing");
    SetError("");
    SetBtn("process");
    var error = await Validation();
    console.log("error on Validation", error);
    if (error) {
        toast.dismiss(id);
        toast.error(error);

      SetBtn("error");
      SetError(error);
    } else {
      let cont = await ContractCall.approve_721_1155(
        token_address,
        config.TradeContract,
        web3p.utils.toWei(YouWillGet.toString())
      );

      if (cont) {
        toast.dismiss(id);
        toast.success("Approved Successfully");
  
        SetBtn("done");


        // if (owner.HashValue == "not yet minted") {
        //   SetApp_Btn("init");
        // } else {
          SetApp_Btn("start");

        // }
      } else {
        toast.dismiss(id);
        toast.error("Approved Failed");
    
        SetBtn("try");
      }
    }
  };
  const Convertusd = (price, coinname) => {
    const usdcueency = currency.filter((item) => item.value == coinname)[0]?.usd
    const finalusdprice = (usdcueency * price).toFixed(2)
    return finalusdprice
  }
  useEffect(() => {
    (async () => {
      const TokenBalance = await ContractCall.Token_Balance_Calculation(
        token_address,
        accountAddress
      );
      // console.log('tokkkeeeenballl',TokenBalance)
      SetTokenBalance(TokenBalance ? TokenBalance : 0);
    })();
  }, [TokenBalance]);

  const _Buy = async () => {
    // debugger;
    console.log("sdbjfsd");
    SetApp_Btn("process");
    // console.log('ghgdhdg',NFTQugetServiceFeesantity)
    const id = toast.loading("Purchasing Token on processing");
    var error = await Validation();
console.log("errorerrors" , error)
    console.log("web3p.utils.toWei(YouWillGet.toString())", web3p.utils.toWei(YouWillGet.toString()), owner.CoinName);
    SetError(error);
    if (isEmpty(error)) {

console.log("popoppp",owner.CoinName , owner.NFTOwner ,  web3p.utils.toWei(String(owner.NFTPrice * NFTQuantity)) , [
    owner.NFTId,
    web3p.utils.toWei(String(owner.NFTPrice * NFTQuantity)),
    NFTQuantity,
    item.ContractType,
  ]  , item.ContractAddress,  )

      let cont = await ContractCall.buy_721_1155( web3p.utils.toWei(YouWillGet.toString()),
        owner.CoinName === "PancakeSwap Token" ? "CAKE" : owner.CoinName,
        owner.NFTOwner,
        [
          owner.NFTId,
          web3p.utils.toWei(String(owner.NFTPrice * NFTQuantity)),
          NFTQuantity,
          item.ContractType,
        ],
        item.ContractAddress
      );


      if (cont) {
        let newOwner = {
          HashValue: cont.HashValue,
          NewTokenOwner: accountAddress,
          NFTQuantity: NFTQuantity,
          NFTId: owner.NFTId,
          NFTOwner: owner.NFTOwner,
          PutOnSale: owner.PutOnSale,
          PutOnSaleType: owner.PutOnSaleType,
          activity: "Buy",
          TP: owner.NFTPrice,
          CN: owner.CoinName,
          USD: Convertusd(owner.NFTPrice, owner.CoinName),
          click: `${config.FRONT_URL}/info/${item.CollectionNetwork}/${item.ContractAddress}/${accountAddress}/${owner.NFTId}`,
        };
        let Resp = await BuyAccept({ newOwner: newOwner, item: item });

        console.log("disagduagsd" , Resp)
        if (Resp.status) {
            toast.dismiss(id);
            toast.success("Approving Token Successfully");

      
          SetApp_Btn("done");
          navigate(`/profiletabs/${payload?.CustomUrl}`);
        } else {
            toast.dismiss(id);
            toast.error("Transaction Failed");

    
          SetApp_Btn("try");
        }
      } else {
        toast.dismiss(id);
        toast.error("Transaction Failed");
       
        SetApp_Btn("try");
      }
    } else {
        toast.dismiss(id);
        toast.error("Validation failed");

     
    }
  };


  const onChange = (e) => {

    var numberRegex = /^\d+$/;
    console.log("vallll", e.target.value);
    if (numberRegex.test(e.target.value) || e.target.value == "") {
      SetNFTQuantity(e.target.value);
      SetError("");
      SetBtn("start");
      SetApp_Btn("start")
    } else {
      SetError("Token Quantity must be in number");
      SetBtn("start");
    }
  };




  useEffect(() => {
    BalanceCheck();
  }, [item, owner]);

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



    return (

        <div>
            <Modal show={buynowmodal} className="placemodal" size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onClick={() => {
                     handleBuyModal();
                     onhide();

                }}></Modal.Header>
                <Modal.Body className='px-3 px-sm-5'>
                    <h4 className="heading text-center">Checkout</h4>
                    <div className="text-center mt-3 mb-4">
                      {/* <img src={crewimg} className="img-fluid" /> */}
                    
                    <ImgAudVideo
                  file={item?.CompressedFile.includes('http') ? item?.CompressedFile  : `${config?.IMG_URL}/nft/${item?.NFTCreator}/Compressed/NFT/${item?.CompressedFile}`}
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
                    <div className="d-flex justify-content-between">
                        <div><p className="whtsclr f-18 fw-300 mb-2">Seller</p><p className="whtsclr f-18 fw-600">{Name_showing(owner.DisplayName ? owner.DisplayName : owner.NFTOwner)}</p></div>
                        <div><p className="whtsclr f-18 fw-300 mb-2">Buyer</p><p className="whtsclr f-18 fw-600">{address_showing(payload?.DisplayName ? payload?.DisplayName : payload.WalletAddress)}</p></div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
                    { (owner.NFTBalance === '1')  && <>  <h5 className="whtsclr fw-600 mb-0">Quantity</h5>
                       <div className="numberborder d-flex justify-content-between align-items-center"   >
                       {/* disabled={owner.NFTBalance === '1' || owner.NFTBalance === 1 ? true : false} */}
                           <h4 className="whtsclr py-2 px-3 mb-0 brr" onClick={decrementCounter}>-</h4>
                           <h5 className="whtsclr py-2 px-3 mb-0">{counter}</h5>
                           <h4 className="whtsclr py-2 px-3 mb-0 bll" onClick={ incrementCounter}>+</h4>
                        </div> </> }
                    </div>
                    <div>
                        <div className="d-flex justify-content-between"><p className="whtsclr f-18">Your Balance :</p><p className="whtsclr f-18 fw-600">{owner.CoinName !== "MATIC"
                      ? TokenBalance
                      : web3p.utils.fromWei(coinBalance.toString())}{" "}
                      {owner.CoinName}</p></div>
                        <div className="d-flex justify-content-between"><p className="whtsclr f-18">Service fee :</p><p className="whtsclr f-18 fw-600">{String(token_address).toLowerCase() == String(NativeToken).toLowerCase() ? web3.utils.fromWei(String(buyerFeesNative)) : web3.utils.fromWei(String(buyerFees))}% {owner.CoinName}</p></div>
                        <div className="d-flex justify-content-between"><p className="whtsclr f-18">You need to pay :</p><p className="whtsclr f-18 fw-600">{YouWillGet} {owner.CoinName}</p></div>
                    </div>

                    <div className="d-flex justify-content-center pb-4">
                    {owner.CoinName == config.COIN_NAME ? null :         <Button className="explore mt-4" 
                     disabled={
                        Btn == "error" || Btn === "process" || Btn === "done"
                          ? true
                          : false
                      }
                      onClick={Btn === "start" || Btn === "try" ? FormSubmit : null}
                        >{(Btn === "start" && "Approve") ||
                        (Btn === "try" && "Try-Again") ||
                        (Btn === "error" && "Error") ||
                        (Btn === "done" && "Done") ||
                        (Btn === "process" && "In-Progress")}</Button> }




                        <Button className="explorefull mt-4 me-3"
                           disabled={
                            App_Btn === "done" || App_Btn === "error" || App_Btn === "process"
                              ? true
                              : false
                          }
                          onClick={_Buy}
    
                     
                        >
                        
                        
                        
                        {(App_Btn === "start" && "Proceed to payment") ||
                            (App_Btn === "try" && "Try-Again") ||
                            (App_Btn === "error" && "Error") ||
                            (App_Btn === "done" && "Done") ||
                            (App_Btn === "process" && "In-Progress") ||
                            (App_Btn === "init" && "Proceed to payment")}</Button>



                        <Button className="explore mt-4" onClick={() => {
                              handleBuyModal();
                              onhide();
                        }}>Cancel</Button>
                    </div>


                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Buynow;