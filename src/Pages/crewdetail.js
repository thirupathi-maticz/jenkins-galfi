import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Button, Accordion, Table} from 'react-bootstrap';
import Header from "../Layouts/header";
import Footer from "../Layouts/footer";
import crewimg from "../Assets/crewimg.png";
import eth from "../Assets/eth.png";
import matic from '../Assets/polygon.png'
import imgprof from "../Assets/imgprof.png";

import bidprofimg from "../Assets/bidprofimg.png";
import arrow from "../Assets/arrow.png";
import Crewcard from "../Components/crewcard";
import ImgAudVideo, { Name_showing, address_showing, switchnetwork } from "../shared/common";
import Placeabid from "../Components/placeabid";
import Buynow from "../Components/buynow";
import Changeprice from "../Components/changeprice";
import Stakemodals from "../Components/stakemodal";
import { Activitiesapi, Token_Info_Func, findOwners } from "../services/nft.api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import useContractProviderHook from "../services/ContractProviderhook";
import { isEmpty } from "../shared/common";
import config from '../config'
import moment from "moment";
import { chainIdCheck } from "../util/hooks/useWallet";
import TransferTokenModal from "../Components/transfermodal";
import AcceptBidModal from "../Components/AcceptBidModal";
import CancelBidModal from "../Components/CancelBidModal";
import CancelOrderModal from "../Components/cancelordermodal";
import { CollectionList } from "../Components/collection";
function Crewdetail(props) {
  // debugger
  const dispatch= useDispatch()
    const navigate= useNavigate()
const {network , Contract , Owner , Id } =  useParams();
const para = useParams()
console.log( "paraaa",para , Contract)
    const location = useLocation()
    const [activeTab, setActiveTab] = useState('details');
    const [InfoDetail, SetInfoDetail] = useState({});
    const [preload, setpreload] = useState(false);
    const [Contractstate, setContract] = useState("");
    const [TabName, SetTabName] = useState("All");
    const [ownersdatas, setownerdatas] = useState([]);
    const [Bidsdatas, setBidsrdatas] = useState([]);
    const [Tokens_Detail, SetTokens_Detail] = useState({});
    const [Tokens_Owner_Details, SetTokens_Owner_Details] = useState([]);
    const [TokenActivities, SetTokenActivities] = useState([]);
    const [Explores, SetExplore] = useState([]);
    const [btn, setbtn] = useState(false);
    const [BtnData, SetBtnData] = useState("start");
    const [OpenPopup, SetOpenPopup] = useState("");
    const [text, setText] = useState("");
    const [SendDet, SetSendDet] = useState({});

    const ContractCall = useContractProviderHook();
    const [Tokens, SetTokens] = useState({
        All: {
          loader: true,
          page: 1,
          list: [],
          ownerslist: [],
          bidslist: [],
          owner: {},
          myBid: {},
          highbid: {},
          myowner: {},
        },
      });

    // const [placemodal, setPlacemodal] = useState(false);
    // const [buynowmodal, setBuynowmodal] = useState(false);
    const [changepricemodal, setChangepricemodal] = useState(false);
    const [stakemodal, setStakemodal] = useState(false);

    const { accountAddress, web3 } = useSelector(
        (state) => state.LoginReducer.AccountDetails
      );
      const { Network } = useSelector(
        (state) => state.LoginReducer
      );
      
    const { payload, isAdmin } = useSelector((state) => state.LoginReducer.User);
   
    useEffect(() => {
   
      findOwner();

    }, [network, Contract, Owner, Id , accountAddress]);
    console.log("usususususu" , network , Contract , Owner, Id)

 

    const [isBidModal, setBidModal] = useState(false);
    const handleBidModal = () => {
      if (isEditBidModal == true) {
        SetOpenPopup("");
      }
      setBidModal(!isBidModal);
    };
    const [isEditBidModal, setEditBidModal] = useState(false);
    const handleEditBidModal = () => {
      if (isEditBidModal == true) {
        SetOpenPopup("");
      }
      setEditBidModal(!isEditBidModal);
    };
  
    const [isChangePriceModal, setChangePriceModal] = useState(false);
    const handleChangePriceModal = () => {
      if (isChangePriceModal === true) {
        SetOpenPopup("");
      }
      setChangePriceModal(!isChangePriceModal);
    };
  
    const [isTransferTokenModal, setTransferTokenModal] = useState(false);
    const handleTransferTokenModal = () => {
      if (isTransferTokenModal === true) SetOpenPopup("");
      setTransferTokenModal(!isTransferTokenModal);
    };
    const [isBurnTokenModal, setBurnTokenModal] = useState(false);
    const handleBurnTokenModal = () => {
      if (isBurnTokenModal === true) SetOpenPopup("");
  
      setBurnTokenModal(!isBurnTokenModal);
    };
    const [isCancelOrderModal, setCancelOrderModal] = useState(false);
    const handleCancelOrderModal = () => {
      if (isCancelOrderModal === true) {
        SetOpenPopup("");
      }
      setCancelOrderModal(!isCancelOrderModal);
    };



    const [isStakeOrderModal, setStakeOrderModal] = useState(false);
    const handleStakeOrderModal = () => {
      if (isStakeOrderModal === true) {
        SetOpenPopup("");
      }
      setStakeOrderModal(!isStakeOrderModal);
    };




    const [isAcceptBidModal, setAcceptBidModal] = useState(false);
    const handleAcceptBidModal = () => {
      if (isAcceptBidModal === true) SetOpenPopup("");
  
      setAcceptBidModal(!isAcceptBidModal);
    };
    const [isCancelBidModal, setCancelBidModal] = useState(false);
    const handleCancelBidModal = () => {
      if (isCancelBidModal === true) SetOpenPopup("");
  
      setCancelBidModal(!isCancelBidModal);
    };
    const [isDeleteSaleModal, setDeleteSaleModal] = useState(false);
    const handleDeleteSaleModal = () => {
      if (isDeleteSaleModal === true) SetOpenPopup("");
      setDeleteSaleModal(!isDeleteSaleModal);
    };
    const [isReportModal, setReportModal] = useState(false);
    const handleReportModal = () => {
      if (isReportModal === true) SetOpenPopup("");
  
      setReportModal(!isReportModal);
    };
    const [isBuyModal, setBuyModal] = useState(false);
    const handleBuyModal = () => {
      if (isBuyModal === true) SetOpenPopup("");
      setBuyModal(!isBuyModal);
    };
    const [isProceedBuyModal, setProceedBuyModal] = useState(false);
    const handleProceedBuyModal = () => {
      if (isProceedBuyModal === true) SetOpenPopup("");
      setProceedBuyModal(!isProceedBuyModal);
    };
    const [isPutonsaleModal, setPutonsaleModal] = useState(false);
  
    const handlePutonsaleModal = () => {
      if (isPutonsaleModal === true) SetOpenPopup("");
  
      setPutonsaleModal(!isPutonsaleModal);
    };
    const [isCalendarModal, setCalendarModal] = useState(false);
  
    const handleCalendarModal = () => {
      if (isCalendarModal === true) SetOpenPopup("");
  
      setCalendarModal(!isCalendarModal);
    };
   
    useEffect(() => {
   console.log("ksksksksksks")
      findOwner();
    }, []);


      useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
      if (OpenPopup === "createorder") {
        handlePutonsaleModal();
      }
      if (OpenPopup === "Cancel") {
        handleCancelOrderModal();
      }
      if (OpenPopup === "Bid") {
        handleEditBidModal();
      }
      if (OpenPopup === "stake") {
        handleStakeOrderModal();
      }


      if (OpenPopup === "Buy") {
        handleBuyModal();
      }
      if (OpenPopup === "Accept") {
        handleAcceptBidModal();
      }
      if (OpenPopup === "CancelBid") {
        handleCancelBidModal();
      }
      if (OpenPopup === "Report") {
        handleReportModal();
      }
      if (OpenPopup === "Transfer") {
        handleTransferTokenModal();
      }
  
      if (OpenPopup === "Burn") {
        handleBurnTokenModal();
      }
    }, [OpenPopup]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const [bidss, setBidss] = useState([
        { id: 1 }, { id: 2 }, { id: 3 }
    ]);
    const [topcollect, setTopcollect] = useState([
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }
    ]);





const Explore = async (data, tab) => {
    var page = data ? data : Tokens[TabName]?.page;
    let SendDATA = {
      TabName: tab ? tab : TabName,
      limit: 4,
      Owner: Owner,
      page: page ?? 1,
      from: "info",
      Contract: Contract,
      Id: Id?.toString(),
      MyAdd: accountAddress,
    };
    let Resp = await Token_Info_Func(SendDATA);

    console.log("detaillslzzsls",Resp?.data?.token[0]?.CollectionNetwork )
 


    setownerdatas(Resp?.data?.token[0]?.tokenowners_list);
    if (
        Resp?.data?.token[0] &&
      !isEmpty(Resp?.data?.token[0]?.Current_Owner)
    ) {

      
      if (TabName === "All") {
   
        SetTokens_Detail(Resp?.data?.token[0]);
        SetExplore(Resp?.data?.Explore);
        SetTokens_Owner_Details(Resp?.data?.token[0]?.tokenowners_list);
      }
console.log("sdhasdhas" ,Resp.data.token[0]?.CollectionNetwork ,config.COIN_NAME  )
      dispatch({
        type: "Network_section",
        Network_section: {
          Network: Resp?.data?.token[0]?.CollectionNetwork === config.COIN_NAME ? config.ETHCHAIN :config.BNBCHAIN,
        },
      })


      SetTokens({
        ...Tokens,
        ...{
          [TabName]: {
            list: [
              ...Tokens[TabName]?.list,
              ...(TabName === "owner"
                ? Resp?.data?.token[0]?.tokenowners_list
                : TabName === "bid"
                ? Resp?.data.Bid
                : []),
            ],
            loader:
              Resp.data?.token?.Count ===
              Tokens[TabName]?.list?.length + Resp?.data?.token.length
                ? false
                : true,
            page: Tokens[TabName].page,
            owner:
              TabName === "All"
                ? Array.isArray(Resp.data?.token[0].Current_Owner)
                  ? Resp?.data?.token[0]?.Current_Owner.pop()
                  : Resp?.data?.token[0]?.Current_Owner
                : Tokens["All"]?.owner,
            myowner:
              TabName === "All"
                ? Array.isArray(Resp?.token?.data[0].myowner)
                  ? Resp?.data?.token[0]?.myowner.pop()
                  : Resp?.data?.token[0]?.myowner[0]
                : Tokens["All"].myowner[0],
            myBid: Resp?.data?.myBid?.pop(),
            highbid: Resp?.data?.highBid[0],
          },
        },
      });
 
    } else {
      SetTokens({ [TabName]: { loader: true, page: 1, list: [] } });
    }
    setTimeout(() => {
      setpreload(true);
    }, 700);
  };

  const Activities = async () => {
    const SendDATA = {
      TabName: "TokenActivity",
      limit: 30,
      CustomUrl: payload?.CustomUrl,
      NFTOwner: payload?.WalletAddress,
      page: 1,
      from: "Activity",
      NFTid: Id,
    };
    let Resp = await Activitiesapi(SendDATA);
    if (Resp?.status) {
      SetTokenActivities(Resp?.data);
    }

    console.log("ssssaxasd", Resp);
  };

  const Bidsdata = async (data, tab) => {
    var page = data ? data : Tokens[TabName]?.page;
    const SendDATA = {
      TabName: "bid",
      limit: 4,
      Owner: Owner,
      page: page ?? 1,
      from: "info",
      Contract: Contract,
      Id: Id?.toString(),
      MyAdd: accountAddress,
    };
    let Resp = await Token_Info_Func(SendDATA);
    console.log("sodasidgasgd" ,  Resp?.data?.token[0])
    if (
      Resp?.data?.token[0] &&
      Resp?.data?.token[0]?.Current_Owner?.length > 0
    ) {
      setBidsrdatas(Resp?.data?.Bid);
    }
;
  };


  const findOwner = async () => {
    console.log("findownerapiress1")
    const data = {
        NFTCreator: Owner,
        ContractAddress: Contract,
        NFTId: Id,
      }
    const Resp = await findOwners(data);
console.log("findownerapiress" , Resp)
    if (Resp?.status) {
      setContract(Resp?.data?.ContractAddress);
      Explore();
      Activities();
      Bidsdata();
    } 

    
    else {
        toast.error(Resp?.message)
      Explore();
      Activities();
    }
  };

  // const POPUPACTION = ()=>{}
const POPUPACTION = useCallback(
    async (text, data, item) => {
      const chainId = await web3?.eth?.getChainId();
      var datas = await switchnetwork(Network)

      console.log("BuyxxxsCalling", datas,  Network);

      if (parseInt(chainId) !== parseInt(config.CHAIN_ID)) {
        // var correctchainid = (!config.chain_Id_List.includes(chainId)) ? config.CHAIN_ID : (!changechainid) ? chainId : changechainid

        await chainIdCheck(config.CHAIN_ID, web3);
      } else {
        setbtn(true);
        console.log("concoleofclick", data);
   
        if (accountAddress) {
          if (data === "Accept") {
            (async () => {
              let Statu = await ContractCall.GetApproveStatus(
                  Tokens_Detail?.ContractType === "721"
                  ? "Single"
                  : "Multiple",
                Tokens_Detail?.ContractAddress
              );
              // console.log("STATU", Statu)
              if (Statu == false || Statu == "error") {
                toast.warn("Need To Approve");

                SetBtnData("open");
                SetOpenPopup(data);
              } else {
                SetBtnData("error");
                SetOpenPopup(data);
                SetSendDet(item);
              }
            })();
          } else {
            console.log("iddddelse", data);
            setText(text);
            SetOpenPopup(data);
            SetSendDet(item);
          }
        } else {
          if (data === "Share") {
            setText(text);
            SetOpenPopup(data);
            SetSendDet(item);
          } else
            toast.error("Connect Your  Wallet ", {
              autoClose: 1000,
              closeButton: true,
              closeOnClick: true,
            });
        }
      }
    },
    [accountAddress, Tokens_Detail.ContractAddress]
  );


    return (
        <>
            {OpenPopup === "Bid" && SendDet &&
            <Placeabid onhide={() => setbtn(false)} 
            owners={ownersdatas}
            owner={Tokens[TabName]?.owner}
            bidder={!isEmpty(SendDet) ? SendDet : Tokens[TabName]?.myBid}
            isEditBidModal={isEditBidModal}
            handleEditBidModal={handleEditBidModal}
            OpenPopup={OpenPopup}
            bid={Tokens[TabName]?.highbid}
            item={{
              NFTId: Tokens_Detail?.NFTId,
              NFTName: Tokens_Detail?.NFTName,
              ContractAddress: Tokens_Detail?.ContractAddress,
              ContractType: Tokens_Detail?.ContractType,
              NFTRoyalty: Tokens_Detail?.NFTRoyalty,
              NFTCreator: Tokens_Detail?.NFTCreator,
              CollectionNetwork: Tokens_Detail?.CollectionNetwork,
              Category: Tokens_Detail?.Category,
              CompressedFile: Tokens_Detail?.CompressedFile,
              CompressedThumbFile: Tokens_Detail?.CompressedThumbFile,
              OriginalFile: Tokens_Detail?.OriginalFile,
              NFTPrice: Tokens[TabName]?.myowner?.NFTPrice,
            
              LazyStatus: Tokens_Detail?.LazyStatus,
              RandomName: Tokens_Detail?.RandomName,
              NonceHash: Tokens_Detail?.NonceHash,
              SignatureHash: Tokens_Detail?.SignatureHash,
              MetaData: Tokens_Detail?.MetaData,
            }}
            />}
            
            {OpenPopup === "createorder" && SendDet && (
          <Changeprice
            onhide={() => {
              setbtn(false);
            }}
            owner={SendDet}
            handlePutonsaleModal={handlePutonsaleModal}
            handleCalendarModal={handleCalendarModal}
            isPutonsaleModal={isPutonsaleModal}
            OpenPopup={handlePutonsaleModal}
            text={text}
            item={{
              NFTName: Tokens_Detail.NFTName,
              ContractAddress: Tokens_Detail.ContractAddress,
              ContractType: Tokens_Detail.ContractType,
              CollectionNetwork: Tokens_Detail.CollectionNetwork,

              CompressedFile: Tokens_Detail.CompressedFile,
              CompressedThumbFile: Tokens_Detail.CompressedThumbFile,
              OriginalFile: Tokens_Detail.OriginalFile,
              NFTCreator: Tokens_Detail.NFTCreator,
              NFTRoyalty: Tokens_Detail.NFTRoyalty,

              Category: Tokens_Detail.Category,
              NFTPrice: Tokens[TabName]?.myowner?.NFTPrice,
              CoinName: Tokens[TabName]?.myowner?.CoinName,
              PutOnSaleType: "FixedPrice",
              PutOnSale: true,
              ClockTime: "",
              LazyStatus: Tokens_Detail.LazyStatus,
              RandomName: Tokens_Detail.RandomName,
              NonceHash: Tokens_Detail.NonceHash,
              SignatureHash: Tokens_Detail.SignatureHash,
              MetaData: Tokens_Detail.MetaData,
            }}
          />
        )}

            {OpenPopup === "Buy"  && SendDet && <Buynow
              handleBuyModal={handleBuyModal}
              isBuyModal={isBuyModal}
              handleProceedBuyModal={handleBuyModal}
              owner={SendDet}
              OpenPopup={OpenPopup}
              ClosePopup={SetOpenPopup}
              item={{
                NFTId: Tokens_Detail?.NFTId,
                NFTName: Tokens_Detail?.NFTName,
                ContractAddress: Tokens_Detail?.ContractAddress,
                ContractType: Tokens_Detail?.ContractType,
                NFTRoyalty: Tokens_Detail?.NFTRoyalty,
                NFTCreator: Tokens_Detail?.NFTCreator,
                CollectionNetwork: Tokens_Detail?.CollectionNetwork,
                Category: Tokens_Detail?.Category,
            
                CompressedFile: Tokens_Detail?.CompressedFile,
                OriginalFile: Tokens_Detail?.OriginalFile,
                CompressedThumbFile: Tokens_Detail?.CompressedThumbFile,
                OriginalThumbFile: Tokens_Detail?.OriginalThumbFile,
                LazyStatus: Tokens_Detail?.LazyStatus,
                RandomName: Tokens_Detail?.RandomName,
                NonceHash: Tokens_Detail?.NonceHash,
                SignatureHash: Tokens_Detail?.SignatureHash,
                MetaData: Tokens_Detail?.MetaData,
              }}
            
            onhide={() => setbtn(false)} />}


{OpenPopup === "Accept" && SendDet && (
          <AcceptBidModal
            onhide={() => {
              setbtn(false);
            }}
            handleAcceptBidModal={handleAcceptBidModal}
            isAcceptBidModal={isAcceptBidModal}
            owner={Tokens[TabName]?.myowner}
            bidder={SendDet}
            OpenPopup={OpenPopup}
            bid={SendDet}
            approvestatus={BtnData}
            item={{
              NFTId: Tokens_Detail.NFTId,
              NFTName: Tokens_Detail.NFTName,
              ContractAddress: Tokens_Detail.ContractAddress,
              ContractType: Tokens_Detail.ContractType,
              NFTRoyalty: Tokens_Detail.NFTRoyalty,
              NFTCreator: Tokens_Detail.NFTCreator,
              CollectionNetwork: Tokens_Detail.CollectionNetwork,
              Category: Tokens_Detail.Category,
              CompressedFile: Tokens_Detail.CompressedFile,
              OriginalFile: Tokens_Detail.OriginalFile,
              CompressedThumbFile: Tokens_Detail.CompressedThumbFile,
              OriginalThumbFile: Tokens_Detail.OriginalThumbFile,
              LazyStatus: Tokens_Detail.LazyStatus,
              RandomName: Tokens_Detail.RandomName,
              NonceHash: Tokens_Detail.NonceHash,
              SignatureHash: Tokens_Detail.SignatureHash,
              MetaData: Tokens_Detail.MetaData,
            }}
            file={`${config.IMG_URL}/token/${Tokens_Detail.Creator}/Compressed/NFT/${Tokens_Detail.CompressedFile}`}
            type={
              Tokens_Detail.CompressedFile
                ? Tokens_Detail.CompressedFile?.includes(".webp")
                  ? "image"
                  : Tokens_Detail.CompressedFile.includes(".webm")
                  ? "video"
                  : "audio"
                : Tokens_Detail.CompressedFile
            }
            thumb={Tokens_Detail.CompressedThumbFile}
          />
        )}

{OpenPopup === "Transfer" && (
          <TransferTokenModal
          onhide={() => {
              setbtn(false);
            }}
            handleTransferTokenModal={handleTransferTokenModal}
            isTransferTokenModal={isTransferTokenModal}
            owner={SendDet}
            OpenPopup={OpenPopup}
            // closePop={closePop}

            item={{
              NFTId: Tokens_Detail.NFTId,
              NFTName: Tokens_Detail.NFTName,
              ContractAddress: Tokens_Detail.ContractAddress,
              ContractType: Tokens_Detail.ContractType,
              NFTRoyalty: Tokens_Detail.NFTRoyalty,
              NFTCreator: Tokens_Detail.NFTCreator,
              CollectionNetwork: Tokens_Detail.CollectionNetwork,
              Category: Tokens_Detail.Category,
              CompressedFile: Tokens_Detail.CompressedFile,
              OriginalFile: Tokens_Detail.OriginalFile,
              CompressedThumbFile: Tokens_Detail.CompressedThumbFile,
              OriginalThumbFile: Tokens_Detail.OriginalThumbFile,
        
              LazyStatus: Tokens_Detail.LazyStatus,
              RandomName: Tokens_Detail.RandomName,
              NonceHash: Tokens_Detail.NonceHash,
              SignatureHash: Tokens_Detail.SignatureHash,
              MetaData: Tokens_Detail.MetaData,
            }}
          />
        )}

{OpenPopup === "Cancel" && SendDet && (
            <CancelOrderModal
            onhide={() => {
              setbtn(false);
            }}
            handleCancelOrderModal={handleCancelOrderModal}
            isCancelOrderModal={isCancelOrderModal}
            owner={SendDet}
            types="Cancel"
            type={
              Tokens_Detail.CompressedFile
                ? Tokens_Detail.CompressedFile?.includes(".webp")
                  ? "image"
                  : Tokens_Detail.CompressedFile.includes(".webm")
                  ? "video"
                  : "audio"
                : Tokens_Detail.CompressedFile
            }
            item={{
              TokenName: Tokens_Detail.NFTName,
              ContractAddress: Tokens_Detail.ContractAddress,
              ContractType: Tokens_Detail.ContractType,
              CollectionNetwork: Tokens_Detail.CollectionNetwork,
              Category: Tokens_Detail.Category,
              NFTPrice: Tokens[TabName]?.myowner?.NFTPrice,
              CoinName: Tokens[TabName]?.myowner?.CoinName,
              NFTCreator: Tokens_Detail.NFTCreator,
              CompressedFile: Tokens_Detail.CompressedFile,
              OriginalFile: Tokens_Detail.OriginalFile,
              LazyStatus: Tokens_Detail.LazyStatus,
              RandomName: Tokens_Detail.RandomName,
              NonceHash: Tokens_Detail.NonceHash,
              SignatureHash: Tokens_Detail.SignatureHash,
              MetaData: Tokens_Detail.MetaData,
            }}
          />
        )}

{OpenPopup === "CancelBid" && SendDet && (
          <CancelBidModal
            onhide={() => {
              setbtn(false);
            }}
            handleCancelBidModal={handleCancelBidModal}
            isCancelBidModal={isCancelBidModal}
            bidder={SendDet}
            owner={Tokens[TabName]?.owner}
            item={{
              NFTId: Tokens_Detail.NFTId,
              NFTName: Tokens_Detail.NFTName,
              ContractAddress: Tokens_Detail.ContractAddress,
              ContractType: Tokens_Detail.ContractType,
              NFTRoyalty: Tokens_Detail.NFTRoyalty,
              NFTCreator: Tokens_Detail.NFTCreator,
              CollectionNetwork: Tokens_Detail.CollectionNetwork,
              Category: Tokens_Detail.Category,
              CompressedFile: Tokens_Detail.CompressedFile,
              OriginalFile: Tokens_Detail.OriginalFile,
              CompressedThumbFile: Tokens_Detail.CompressedThumbFile,
              OriginalThumbFile: Tokens_Detail.OriginalThumbFile,
              LazyStatus: Tokens_Detail.LazyStatus,
              RandomName: Tokens_Detail.RandomName,
              NonceHash: Tokens_Detail.NonceHash,
              SignatureHash: Tokens_Detail.SignatureHash,
              MetaData: Tokens_Detail.MetaData,
            }}
          />
        )}

{OpenPopup === "stake" && (
          <Stakemodals
           onhide={() => {
              setbtn(false);
            }}
            owner={SendDet}
            handleStakeOrderModal={handleStakeOrderModal}
            handleCalendarModal={handleCalendarModal}
            isStakeOrderModal={isStakeOrderModal}
            OpenPopup={handleStakeOrderModal}
            text={text}
            item={{
              NFTName: Tokens_Detail.NFTName,
              ContractAddress: Tokens_Detail.ContractAddress,
              ContractType: Tokens_Detail.ContractType,
              CollectionNetwork: Tokens_Detail.CollectionNetwork,

              CompressedFile: Tokens_Detail.CompressedFile,
              CompressedThumbFile: Tokens_Detail.CompressedThumbFile,
              OriginalFile: Tokens_Detail.OriginalFile,
              NFTCreator: Tokens_Detail.NFTCreator,
              NFTRoyalty: Tokens_Detail.NFTRoyalty,

              Category: Tokens_Detail.Category,
              NFTPrice: Tokens[TabName]?.myowner?.NFTPrice,
              CoinName: Tokens[TabName]?.myowner?.CoinName,
              PutOnSaleType: "FixedPrice",
              PutOnSale: true,
              ClockTime: "",
              LazyStatus: Tokens_Detail.LazyStatus,
              RandomName: Tokens_Detail.RandomName,
              NonceHash: Tokens_Detail.NonceHash,
              SignatureHash: Tokens_Detail.SignatureHash,
              MetaData: Tokens_Detail.MetaData,
            }}
          />
        )}


{console.log("Tokens_Detail" , Tokens_Detail)}
{/* {stakemodal && <Stakemodals onDismiss={() => setStakemodal(false)} />} */}
            {/* {changepricemodal && <Changeprice onDismiss={() => setChangepricemodal(false)} />}
             */}

            <div className="section_seven">
                <Header />

                <div className="innerpage">
                    <div className="container pt-5 pb-5">
                        <div className="row pb-4">
                            <div className="col-xl-4 col-xxl-3 mt-5">


                            {!isEmpty(InfoDetail) ? (
                          InfoDetail?.type === "audio" ? (
                            <ImgAudVideo
                              file={InfoDetail.metadata.animation_url}
                              type={"audio"}
                              thumb={InfoDetail.Image}
                              from="info"
                              ipfs={Tokens_Detail.NFTOrginalImageIpfs}
                              origFile={InfoDetail.metadata.animation_url}
                            />
                          ) : (
                            <iframe
                              style={{
                                background: "url(" + InfoDetail?.Image + ")",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "100% 100%",
                                maxHeight: 288,
                                minHeight: 288,
                                minWidth: "100%",
                                maxWidth: "100%",
                                borderRadius: 15,
                              }}
                              height="288"
                              width="288"
                              title="Iframe Example"
                              id="myiFrame"
                            ></iframe>
                          )
                        ) : (
                          <>
                          {console.log("sdahsdiasdisauuuu" , Tokens_Detail)}
                            <ImgAudVideo
                              file={`${ Tokens_Detail?.image_url?.includes('http') ? Tokens_Detail?.image_url  :  config.IMG_URL + Tokens_Detail?.image_url}`}
                              type={
                                Tokens_Detail?.image_url
                                  ? Tokens_Detail?.image_url?.includes(
                                      ".webp"
                                    )
                                    ? "image"
                                    : Tokens_Detail?.image_url.includes(
                                        ".webm"
                                      )
                                    ? "video"
                                    : Tokens_Detail?.image_url.includes(
                                        ".mp3"
                                      )
                                    ? "audio"
                                    : "glb"
                                  : Tokens_Detail.CompressedFile
                              }
                              thumb={ Tokens_Detail?.image_thumb_url?.includes('http') ? Tokens_Detail?.image_thumb_url :   config.IMG_URL + Tokens_Detail?.image_thumb_url} 

                              // thumb={`${ config.IMG_URL}/nft/${Tokens_Detail?.NFTCreator}/Compressed/NFT_THUMB/${Tokens_Detail?.CompressedThumbFile}`}
                              from="info"
                              origFile={`${Tokens_Detail?.image_url?.includes('http') ? Tokens_Detail?.image_url  :  config.IMG_URL + Tokens_Detail?.image_url }`}
                          
                              glb={Tokens_Detail}
                              ipfs={Tokens_Detail?.NFTOrginalImageIpfs}
                            />
                          </> )}
                                {/* // <img src={crewimg} className="img-fluid w-100" /> */}
                            </div>
                            <div className="col-xl-8 col-xxl-9 mt-5">
                     
                                <div className="crewdetail">
                                  
                                    <p className="crewmate mb-2 mt-2">{Tokens_Detail?.NFTName}{" "} </p>
                                    <p className="crewmate mb-2 mt-2"> ID : #{Tokens_Detail.NFTId}</p>
                                   { Tokens_Detail?.tokenowners_list  && <p className="crewmate fw-600">
                                    {console.log("xxxx" , Tokens_Detail)}
                                  {/* {Tokens_Detail?.tokenowners_list[0]?.NFTPrice} */}
                                    {console.log("kkkkkssx" ,Tokens_Detail.CollectionNetwork )}
                                    <img src={Tokens_Detail.CollectionNetwork === config.COIN_NAME  ?  eth : matic} className="img-fluid eth" /> { !Tokens_Detail?.tokenowners_list[0]?.PutOnSaleType === "UnlimitedAuction" ?   (Tokens_Detail?.tokenowners_list[0]?.NFTPrice + " "+  Tokens_Detail?.tokenowners_list[0]?.CoinName) : "UnlimitedAuction"}  </p>
}
                                 
                                    {Tokens[TabName]?.owner?.PutOnSaleType !==
                            "TimedAuction" &&
                            Tokens[TabName]?.owner?.NFTOwner ===
                              payload?.WalletAddress && (   <Button  onClick={() =>
                                POPUPACTION(
                                  "dummy",
                                  "Transfer",
                                  Tokens[TabName]?.owner
                                )
                              } > Transfer</Button> )}
                                 <p className="crewmate fw-600 mt-5">Description</p>
                                    <p className="crewtxt">
                                  {isEmpty(InfoDetail) && Tokens_Detail?.NFTDescription}</p>
{console.log('Tokens_DetailTokens_Detail' , Tokens_Detail)}
                                    <p className="crewtxt mb-1">By <span className="fw-600">{Tokens_Detail?.Creator_DisplayName ? Tokens_Detail?.Creator_DisplayName : Tokens_Detail?.NFTCreator}</span></p>
                                    {/* <p className="crewtxt">A female miner and former arvad citizen (Public safety officer)</p> */}

                                    <ul className="tab-list pt-4">
                                        <li className={activeTab === 'details' ? 'active' : 'tabtext'} onClick={() => handleTabClick('details')}><span>Details</span></li>
                                        <li className={activeTab === 'bids' ? 'active' : 'tabtext'} onClick={() => handleTabClick('bids')}><span>Bids</span></li>
                                        <li className={activeTab === 'history' ? 'active' : 'tabtext'} onClick={() => handleTabClick('history')}><span>History</span></li>
                                    </ul>

                                    {activeTab === 'details' &&
                                        <div>
                                            <div className="d-flex pt-3 pb-3">
                                            <img  className="img-fluid imgprof me-3"
                                         src={
                                             Tokens[TabName]?.owner?.Profile
                                  ? `${config.IMG_URL}/user/${Tokens[TabName]?.owner?.WalletAddress}/profile/${Tokens[TabName]?.owner?.Profile}`
                                         : config.NOIMAGE
                                             }
                                         alt="profile"
                                            />
                                                {/* <img src={imgprof} className="img-fluid imgprof me-3" /> */}
                                                <div><h5 className="whtsclr">Owner</h5><p className="crewtxt mb-0">
                                                {Tokens[TabName]?.owner?.DisplayName
                                    ? Name_showing(
                                        Tokens[TabName]?.owner?.DisplayName
                                      )
                                    : address_showing(
                                        Tokens[TabName]?.owner?.NFTOwner
                                      )}
                                      </p></div>
                                            </div>
                                            <div className="row">
                                              {/* {console.log(" Tokensxxxx" ,  Tokens[TabName])} */}
                                              {  Tokens_Detail?.NFTProperties?.length  && (Tokens_Detail?.NFTProperties.map((e, i) =>
                                                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-4">
                                                      {console.log("shdiasdhas" , e)}
                                                        <div className="property text-center py-3 px-2">
                                                            <p className="propclr mb-1">{Object.keys(e)[0]}</p>
                                                            <p className="percen mb-1">{Object.values(e)[0]}</p>
                                                            {/* <p className="propclr mb-1">Floor: {e.floor}</p> */}
                                                        </div>
                                                    </div>
                                                ) )}
                                            </div>
                                        </div>
                                    }
                                    {activeTab === 'bids' &&
                                        <>
                                        {console.log("Bidsdatas" , Bidsdatas)}
                                           {Bidsdatas?.length !== 0 ? <>
                                            {Bidsdatas?.map((e, i) =>
                                                <div className="property py-3 px-3 d-block d-sm-flex justify-content-between align-items-center mt-4">
                                                    <div className="d-flex mt-3">
                                                        <img src={bidprofimg} className="img-fluid bidprofimg me-3" />
                                                        <div><p className="crewtxt mb-2">Bid Placed by</p><h5 className="whtsclr">{e?.DisplayName
                                    ? Name_showing(e?.DisplayName)
                                    : address_showing(e?.TokenBidderAddress)}</h5>
                                                        <p className="crewtxt mb-0">Quantity : {e.NFTQuantity}</p>
                                                        <p> {moment(e?.updatedAt).fromNow()}</p></div>
                                                    </div>
                                                    <h4 className="whtsclr mb-0 mt-3">{e?.TokenBidAmt} {e?.CoinName}</h4>

                                                    {e.WalletAddress !==
                                    Tokens["All"]?.myowner?.WalletAddress &&
                                    Tokens["All"]?.myowner?.WalletAddress ===
                                      accountAddress &&
                                    new Date(
                                      Tokens[TabName]?.myowner?.EndClockTime
                                    ).getTime() < Date.now() && (
                                      <Button
                                        disabled={btn}
                                        className="tf-button btn_min_width_100"
                                        disableRipple
                                        onClick={() =>
                                          POPUPACTION("dummy", "Accept", e)
                                        
                                        }
                                      >
                                        Accept Offer
                                      </Button>
                                    )}


                                                </div>
                                            )  } </> : <div className="property py-3 px-3 d-block d-sm-flex justify-content-center align-items-center mt-4">
                                            <div className="d-flex mt-3">
                                                
                                              <h3 className="whtsclr text-center">No data found</h3>
                                            </div>
                                        
                                        </div>}
                                        </>
                                    }   
                                    {activeTab === 'history' &&<>
                                    <div className="content">
{/* 
                                    <div className="table-heading">
                        <div className="column">Event</div>
                        <div className="column">Price</div>
                        <div className="column">Form</div>
                        <div className="column">To</div>
                        <div className="column">Date</div>
                      </div> */}


                   


                      <div className="property py-4 px-3">
                      <div className="alltable">
                      <Table responsive> 
                        <thead>
                            <th>Event</th>
                            <th>Price</th>
                            <th>Form</th>
                            <th>To</th>
                            <th>Date</th>
                        </thead>
                        <tbody>
                        {/* <tr> */}
                    
                        {TokenActivities?.length !== 0 ? (
                             TokenActivities?.map((value, i) =>  
                               <tr>
          <td>    {value?.Activity}</td>
          <td>  {!isEmpty(value?.NFTPrice)
                                    ? value?.NFTPrice
                                    : "-/-"}{" "}
                                  <>{value?.CoinName && value?.CoinName}</>{" "}</td>
          <td>         {value?.From === "NullAddress"
                                      ? "-/-"
                                      : address_showing(value?.From)}</td>
          <td>  {value?.To === "NullAddress"
                                      ? "-/-"
                                      : address_showing(value?.To)}</td>
          <td> {moment(value?.updatedAt).fromNow()}</td> 
          </tr>
            )    
          
          ) : <h3 className="whtsclr">no data found</h3> }
      
                        </tbody>
                      </Table>
                      </div>
                      {console.log("tasda" , TokenActivities)}
                                        </div>


                                        </div>
                                    </>
                                    
                                    }
                                </div>
                                <div className="d-block d-sm-flex justify-content-center text-center pt-3">
                                   
                                    {location.state?.cardtype === 'stake' ? <>  <Button className="explore mt-4 me-0 me-sm-4" onClick={() => setChangepricemodal(true)}>Change Price</Button>
                                        {/* <Button className="explorefull mt-4" onClick={() => setStakemodal(true)} >Stake</Button> */}
                                    </>
                                        :
                                        <>
                                        
         {!isEmpty(Tokens?.[TabName]?.highbid?.WalletAddress) &&
                          Tokens[TabName]?.highbid?.WalletAddress !==
                            accountAddress &&
                          Tokens[TabName]?.owner?.WalletAddress ===
                            accountAddress &&
                          Tokens[TabName]?.myowner?.PutOnSaleType ===
                            "TimedAuction" &&
                          new Date(
                            Tokens[TabName]?.myowner?.EndClockTime
                          ).getTime() < Date.now() && (
                            <Button className="explore mt-4 me-0 me-sm-4"            
                            disabled={btn}  
                                onClick={() =>
                                    POPUPACTION(
                                      "dummy",
                                      "Accept",
                                      Tokens[TabName]?.highbid
                                    )
                                  } 
                             > Accept</Button>

                     
                          )}
{console.log("lllllllllllllx" ,
                           Tokens_Detail )}
                    {/* {!isEmpty(InfoDetail) && (
                          <button
                            className="tf-button btn_min_width_100"
                            onClick={() =>
                              navigate(`/list/${payload?.WalletAddress}/${Id}`)
                            }
                          >
                            List on Marketplace
                          </button>
                        )} */}



{isEmpty(InfoDetail) &&
                          (Tokens_Detail?.ContractType?.toString() === "721" ? (
// kamesh [0] added for
                            Tokens[TabName]?.myowner?.WalletAddress ===
                            accountAddress ?
                             (
                              Tokens[TabName]?.myowner?.PutOnSaleType ===
                              "FixedPrice" ? (
                                <Button className="explore mt-4 me-0 me-sm-4"
                                disabled={btn}
                             
                                 onClick={() =>
                                    POPUPACTION(
                                        "dummy",
                                        "Cancel",
                                        Tokens[TabName]?.myowner
                                      )
                                  }
                                 > Cancel Sale</Button>

                              ) : Tokens[TabName]?.myowner?.PutOnSaleType ===
                                  "NotForSale" ||
                                Tokens[TabName]?.myowner?.PutOnSaleType ===
                                  "UnlimitedAuction" ||
                                (Tokens[TabName]?.myowner?.PutOnSaleType ===
                                  "TimedAuction" &&
                                  new Date(
                                    Tokens[TabName]?.myowner.EndClockTime
                                  ).getTime() < Date.now()) ? (
<>
                                <Button className="explore mt-4 me-0 me-sm-4"
                                disabled={btn}
                             
                                 onClick={() =>
                                    POPUPACTION(
                                        "dummy",
                                        "createorder",
                                        Tokens[TabName]?.myowner
                                      )
                                  }
                                 >Put on Sale</Button>


                                <Button className="explore mt-4 me-0 me-sm-4"
                                disabled={btn}
                             
                                onClick={() => {setStakemodal(true)
                                  POPUPACTION(
                                    "dummy",
                                    "stake",
                                    Tokens[TabName]?.myowner
                                  )
                                }}
                                 >Stake</Button>


</>
                              ) : Tokens[TabName]?.myowner?.PutOnSaleType ===
                                  "TimedAuction" &&
                                new Date(Tokens[TabName]?.myowner?.ClockTime) >
                                  Date.now() ? (
                                <a
                                  href="#"
                                  className="tf-button btn_min_width_100"
                                >
                                  Auction Not Started Yet
                                </a>
                              ) : (
                                new Date(
                                  Tokens[TabName]?.myowner?.EndClockTime
                                ).getTime() > Date.now() && (
                                  <a
                                    href="#"
                                    className="tf-button btn_min_width_100"
                                  >
                                    Auction is Live
                                  </a>
                                )
                              )
                            ) : (
                              Tokens[TabName]?.owner &&
                              Tokens[TabName]?.owner?.WalletAddress !==
                                accountAddress &&
                              (Tokens[TabName]?.owner?.PutOnSaleType ===
                              "FixedPrice" ? (

                                <Button className="explore mt-4 me-0 me-sm-4"
                                disabled={btn}
                                //  onClick={() => setBuynowmodal(true)}
                                 onClick={() =>
                                    POPUPACTION(
                                        "dummy",
                                              "Buy",
                                              Tokens[TabName]?.owner
                                            )
                                  }
                                 >   Buy Now</Button>

                                // <button
                                //   disabled={btn}
                                //   className="tf-button mx-2"
                                //   onClick={() =>
                                //     POPUPACTION(
                                //       "dummy",
                                //       "Buy",
                                //       Tokens[TabName]?.owner
                                //     )
                                //   }
                                // >
                                //   Buy Now
                                // </button>
                              ) : 
                              (
                                Tokens[TabName]?.myBid?.WalletAddress ===
                                  accountAddress && (

                                    <Button className="explore mt-4 me-0 me-sm-4"
                                    disabled={btn}
                                    //  onClick={() => setBuynowmodal(true)}
                                     onClick={() =>
                                        POPUPACTION(
                                            "dummy",
                                            "CancelBid",
                                            Tokens[TabName]?.myBid
                                          )
                                      }
                                     >  Cancel Bid </Button>

                                )
                              ))
                            )



                          ) : Tokens[TabName]?.myowner?.WalletAddress ===
                            Tokens[TabName]?.owner?.WalletAddress ? (
                            <>
                              {Tokens[TabName]?.myowner?.PutOnSaleType ===
                                "FixedPrice" && (
                                    <Button className="explore mt-4 me-0 me-sm-4"
                                    disabled={btn}
                                    //  onClick={() => setBuynowmodal(true)}
                                     onClick={() =>
                                        POPUPACTION(
                                            "dummy",
                                            "Cancel",
                                            Tokens[TabName]?.myowner
                                          )
                                      }
                                     >  Cancel Sale </Button>

                     
                              )}
                              {Tokens[TabName]?.myBid?.WalletAddress ===
                              accountAddress ? (

                                <Button className="explore mt-4 me-0 me-sm-4"
                                disabled={btn}
                                //  onClick={() => setBuynowmodal(true)}
                                 onClick={() =>
                                    POPUPACTION(
                                              "dummy",
                                              "Bid",
                                              Tokens[TabName]?.myBid
                                            )
                                  }
                                 >  Edit Bid </Button>


        
                              ) : (
                                Tokens[TabName]?.myowner?.WalletAddress !==
                                  Tokens[TabName]?.owner?.WalletAddress && (

                                    <Button className="explore mt-4 me-0 me-sm-4"
                                    disabled={btn}
                                    //  onClick={() => setBuynowmodal(true)}
                                     onClick={() =>
                                        POPUPACTION("dummy", "Bid", {})
                                      }
                                     >  Bid Now </Button>

                       
                                )
                              )}
                            </>
                          ) : Tokens[TabName]?.owner?.PutOnSaleType ===
                            "FixedPrice" ? (

                                <Button className="explore mt-4 me-0 me-sm-4"
                                disabled={btn}
                                //  onClick={() => setBuynowmodal(true)}
                                 onClick={() =>
                                    POPUPACTION(
                                              "dummy",
                                              "Buy",
                                              Tokens[TabName].owner
                                            )
                                  }
                                 >  Buy Now </Button>

                          ) : (
                            Tokens[TabName]?.myBid?.WalletAddress ===
                              accountAddress && (

                                <Button className="explore mt-4 me-0 me-sm-4"
                                disabled={btn}
                                //  onClick={() => setBuynowmodal(true)}
                                 onClick={() =>
                                    POPUPACTION(
                                      "dummy",
                                      "CancelBid",
                                      Tokens[TabName]?.myBid
                                    )
                                  }
                                 >Cancel Bid</Button>


                 
                            )
                          ))}

{isEmpty(InfoDetail) &&
                          (Tokens_Detail?.ContractType?.toString() === "721" ? (
                            Tokens[TabName]?.myowner?.WalletAddress ===
                            accountAddress ? (
                              Tokens[TabName]?.myowner?.PutOnSaleType ===
                                "FixedPrice" && (
                                    <Button className="explore mt-4 me-0 me-sm-4" 
                                    disabled={btn}
                                    onClick={() => 
                                        POPUPACTION(
                                            "Change Price",
                                            "createorder",
                                            Tokens[TabName]?.myowner
                                          )
                                    }>            Change Price </Button>

      
                              )
                            ) : (
                              Tokens[TabName]?.owner?.WalletAddress !==
                                accountAddress &&
                              (Tokens[TabName]?.owner?.PutOnSaleType ===
                                "TimedAuction" &&
                              new Date(
                                Tokens[TabName].owner.EndClockTime
                              )?.getTime() < Date.now() ? (
                                <a href="#" className="tf-button">
                                  Auction End
                                </a>
                              ) : Tokens[TabName]?.highbid?.WalletAddress !==
                                  accountAddress &&
                                Tokens[TabName]?.owner?.WalletAddress ===
                                  accountAddress ? (
                                    <Button className="explore mt-4 me-0 me-sm-4" 
                                    disabled={btn}
                                    onClick={() => 
                                        POPUPACTION(
                                            "dummy",
                                            "Accept",
                                            Tokens[TabName]?.highbid
                                          )
                                    }>           Accept </Button>

                  
                              ) : Tokens[TabName]?.myBid?.WalletAddress ===
                                accountAddress ? (
                                    <Button className="explore mt-4 me-0 me-sm-4" 
                                    disabled={btn}
                                    onClick={() => 
                                        POPUPACTION(
                                            "dummy",
                                            "Bid",
                                            Tokens[TabName]?.myBid
                                          )
                                    }>           Edit Bid </Button>

                        
                              ) : new Date(Tokens["All"]?.owner?.EndClockTime) >
                                  Date.now() &&
                                new Date(Tokens["All"]?.owner?.ClockTime) >
                                  Date.now() ? (

                                    <Button className="explore mt-4 me-0 me-sm-4" 
                              
                                    >          Not Started Yet </Button>

                               
                              ) : (
                                <Button className="explore mt-4 me-0 me-sm-4" 
                                disabled={btn}
                                onClick={() => 
                                    POPUPACTION("dummy", "Bid", {})
                                }>         Bid now </Button>
                                
                              
                              ))
                            )
                          ) : ( Tokens[TabName]?.myowner?.WalletAddress && Tokens[TabName]?.myowner?.WalletAddress ===
                            Tokens[TabName]?.owner?.WalletAddress )? (
                            Tokens[TabName]?.owner?.PutOnSaleType ===
                            "FixedPrice" ? (
                                <Button className="explore mt-4 me-0 me-sm-4" 
                                disabled={btn}
                                onClick={() => 
                                    POPUPACTION(
                                        "Change Price",
                                    "createorder",
                                    Tokens[TabName]?.myowner
                                      )
                                }>     Change Price</Button>

                   
                            ) : (
                                <Button className="explore mt-4 me-0 me-sm-4" 
                                disabled={btn}
                                onClick={() => 
                                    POPUPACTION(
                                        "dummy",
                                        "createorder",
                                        Tokens[TabName]?.myowner
                                      )
                                }>   Put on Sale
                                
                             
                                </Button>

                      
                            )
                          ) : Tokens[TabName]?.owner?.WalletAddress !==
                              accountAddress &&
                            Tokens[TabName]?.highbid?.WalletAddress !==
                              accountAddress &&
                            Tokens[TabName]?.owner?.WalletAddress ===
                              accountAddress ? (
                                <Button className="explore mt-4 me-0 me-sm-4" 
                                disabled={btn}
                                onClick={() => 
                                    POPUPACTION(
                                        "dummy",
                                        "Accept",
                                        Tokens[TabName]?.highbid
                                      )
                                }>  Accept{" "}</Button>

                          ) : Tokens[TabName]?.myBid?.WalletAddress ===
                            accountAddress ? (
                                <Button className="explore mt-4 me-0 me-sm-4" 
                                disabled={btn}
                                onClick={() => 
                                    POPUPACTION(
                                        "dummy",
                                        "Bid",
                                        Tokens[TabName]?.myBid
                                      )
                                }>  Edit Bid{" "}</Button>

                          ) : (
                            <Button className="explore mt-4 me-0 me-sm-4" 
                            disabled={btn}
                            onClick={() => 
                                POPUPACTION("dummy", "Bid", {})
                            }> Bid Now{" "}
                            
                            {console.log("puonsalesda" , Tokens[TabName] , 
                            Tokens[TabName]?.owner?.WalletAddress )}
                            </Button>

                            
                          ))}

                       {console.log("Tokens_Detailxxxxx" , Tokens_Detail)}                  
                                        </>
                                    }
                                </div>
                            </div>
                        </div>


                  <CollectionList />
                    </div>



                </div>



                <Footer />
            </div>
        </>
    )
}

export default Crewdetail;