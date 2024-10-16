import React, { useEffect, useMemo, useRef, useState } from "react";
import { Container, Button, Modal, Dropdown } from 'react-bootstrap';
import crewimg from "../Assets/crewimg.png";
import toast from "react-hot-toast";
import ImgAudVideo, { NumANdDotOnly, isEmpty } from "../shared/common";
import config from "../config"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useContractProviderHook from "../services/ContractProviderhook";
import moment from "moment";
import { CreateOrder } from "../services/nft.api";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
// import Menu from "react-select/dist/declarations/src/components/Menu";
import { Menu } from '@headlessui/react'
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
function Changeprice({ isPutonsaleModal, handlePutonsaleModal, handleCalendarModal, owner, item, text, closePop, onhide }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [typetab, setTypetab] = useState(true)
  const[boxopen , setboxopen] = useState(false)
  const [changepricemodal, setChangepricemodal] = useState(true);


  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);


  const [listchecked, setListchecked] = useState(true);
  const [fixedprice, setFixedprice] = useState(true);
  const [propertieslist, setPropertieslist] = useState(false);
  const [tokenfixed, setTokenfixed] = useState("Token");
  const [tokentimed, setTokentimed] = useState("Token");
  const [BtnData, SetBtnData] = useState("start");
  const [TokenBtn, SetTokenBtn] = useState("start");
  const [FormValue, SetFormValue] = useState(item);
  const [ValidateError, SetValidateError] = useState({});
  const [showTabs, setShowTabs] = useState(false);
  const [showCalender, setCalenderShow] = useState(false);
  const [OpenPopup, SetOpenPopup] = useState("");


  const handleClosecalender = () => setCalenderShow(false)

  const navigate = useNavigate();
  const [once, setOnce] = useState(true)
  const { currency } = useSelector((state) => state.LoginReducer);
  const { payload } = useSelector((state) => state.LoginReducer.User);
  const { web3 } = useSelector((state) => state.LoginReducer.AccountDetails);
  const { NativeToken, sellerFees, buyerFees, buyerFeesNative, sellerFeesNative } = useSelector((state) => state.LoginReducer.ServiceFees);
  const ContractCall = useContractProviderHook();

  const startingdate = [
    { value: "List Immediately", label: "List Immediately" },
    { value: "Scheduled Listing", label: "Scheduled Listing" },
  ];
  const enddate = [
    { value: "1 day", label: "1 day" },
    { value: "2 days", label: "2 days" },
    { value: "Scheduled Listing", label: "Scheduled Listing" },
  ];
  const [startDateState, setStartDateState] = useState();
  const [endDateState, setEndDateState] = useState();

  const handleStartDateChange = date => {
    setStartDateState(date);

  };

  const handleEndDateChange = date => {
    setEndDateState(date);
  };
  const [SignButton, setSignButton] = useState("stop");
  useEffect(() => {
    if (!FormValue?.CoinName) {
      SetFormValue({
        ...FormValue,
        ...{ ["CoinName"]: currency[0]?.label ?? config?.COIN_NAME },
      });
    }

    SetFormValue({ ...FormValue, ...{ ["EmailId"]: payload?.EmailId } });
  }, [currency]);

  var validEnd = function (current) {
    return current.isAfter(
      FormValue.ClockTime ? new Date(FormValue.ClockTime) : undefined
    );
  };
  var validStart = function (current) {
    var yesterday = moment().subtract(1, "day");
    return current.isAfter(yesterday);
  };
  const DateSelection = (e, data) => {
    if (data == "start") {
      if (e.value === "List Immediately")
        SetFormValue({
          ...FormValue,
          ...{
            // ["ClockTime"]: moment(new Date()).format("YYYY-MM-DD HH:mm:ss a"),
            ["ClockTime"]: new Date(),
          },
        });
      else if (e.value === "Scheduled Listing") {
        setCalenderShow(true);
        SetOpenPopup("ClockTime");
      }
    } else {
      if (e.value === "1 day") {
        // console.log('dateeeee',FormValue.ClockTime,moment(FormValue.ClockTime).toDate())
        if (FormValue.ClockTime === "") {
          SetFormValue({
            ...FormValue,
            ...{
              ["EndClockTime"]: new Date(
                new Date().setDate(new Date().getDate() + 1)
              ),
            },
          });
        } else {
          SetFormValue({
            ...FormValue,
            ...{
              ["EndClockTime"]: new Date(
                new Date(FormValue.ClockTime).setDate(
                  new Date(FormValue.ClockTime).getDate() + 1
                )
              ),
            },
          });
        }
      } else if (e.value === "2 days") {
        if (FormValue.ClockTime === "") {
          SetFormValue({
            ...FormValue,
            ...{
              ["EndClockTime"]: new Date(
                new Date().setDate(new Date().getDate() + 2)
              ),
            },
          });
        } else {
          SetFormValue({
            ...FormValue,
            ...{
              ["EndClockTime"]: new Date(
                new Date(FormValue.ClockTime).setDate(
                  new Date(FormValue.ClockTime).getDate() + 2
                )
              ),
            },
          });
        }
      } else if (e.value === "Scheduled Listing") {

        SetOpenPopup("EndClockTime");
      }
    }
  };
  const TokenApproveCall = async () => {
    SetTokenBtn("process");
    const id = toast.loading("Approve Processing");
    const cont = await ContractCall.SetApproveStatus(
      FormValue.ContractType === 721 || FormValue.ContractType === "721"
        ? "Sinle"
        : "Multiple",
      FormValue.ContractAddress
    );
  console.log("cont->", cont)
    if (cont) {
      toast.success("Approved Successfully");
    } else {
      toast.error("Approved Failed");
    }


    if (cont.status) {
      SetTokenBtn("done");
      SetBtnData("process");
    } else {
      SetTokenBtn("try");
    }
    toast.dismiss(id);
  };
  const onSelectChange = (e, data) => {
    SetBtnData("start");

    const id = "CoinName";
    //console("ada", e,id)
    const { label, value } = e;
    SetFormValue({ ...FormValue, ...{ [id]: value } });

  };
  const FormSubmit = async (signhash, RandomName, NonceHash) => {
    const id = toast.loading("Validating Form");
 try {
  SetBtnData("process");

  
  var Error = Validation(FormValue);
  if (isEmpty(Error)) {

    let Respc = await ContractCall.Contract_Base_Validation();
    if (!Respc) {
      
      let Statu = await ContractCall.GetApproveStatus(
        FormValue.ContractType === 721 || FormValue.ContractType === "721"
          ? "Single"
          : "Multiple",
        FormValue.ContractAddress
      );
      console.log("Resxpc--->", Statu)
      if (Statu === true) {

        SetBtnData("process");
 
        toast.success("Ready To Place Order");

        ListCall()
      } else {

        SetBtnData("open");
     
        toast.success("Get Approve");


      }
    } else {
      SetBtnData("error");
      SetValidateError(Respc);
    }

  } else {
    setTimeout(() => {
    
      toast.error("validation error");
    }, 700);

    SetBtnData("error");
    SetValidateError(Error);
  }
 } catch (error) {
  toast.dismiss(id)
 }
  };
  const Validation = (data) => {
    let ValidateError = {};
    const { NFTPrice, CoinName, PutOnSaleType, ClockTime, EndClockTime, NFTQuantity, ContractType } = data;
    if (
      (PutOnSaleType === "FixedPrice" || PutOnSaleType === "TimedAuction") &&
      isEmpty(NFTPrice)
    )
      ValidateError.NFTPrice = "Token Price Required";
    if (
      (PutOnSaleType === "FixedPrice" || PutOnSaleType === "TimedAuction") &&
      !CoinName
    )
      ValidateError.CoinName = "CoinName Required";
    if (PutOnSaleType === "TimedAuction" && !ClockTime)
      ValidateError.ClockTime = "ClockTime Required";
    if (PutOnSaleType === "TimedAuction" && !EndClockTime)
      ValidateError.EndClockTime = "EndClockTime Required";

    return ValidateError;
  };
  // console.log("FormValueFormValue", FormValue);

  async function ListCall() {
    const id = toast.loading("Listing Processing");
    // debugger
    console.log("FormValueFormValue", FormValue);
    if (FormValue.PutOnSaleType === "FixedPrice") {
      var error = await ContractCall.Contract_Base_Validation();
      if (error) {
        console.log("FormValueeeeeFormValue", error);
        toast.dismiss(id);
        toast.error(error);



      }
      else {
        const cont = await ContractCall.place_order_721_1155(
          owner?.NFTId,
          web3?.utils?.toWei(FormValue.NFTPrice?.toString()),
          FormValue.ContractAddress,
          Number(FormValue.ContractType),
          "data"
        );
        console.log("conffft", cont)
        if (cont) {
          let _data = FormValue;
          _data.NFTOwner = payload.WalletAddress;
          _data.HashValue = cont.HashValue;
          _data.NFTId = owner.NFTId;
          _data.activity = "PutOnSale";
          _data.NFTQuantity = owner.NFTBalance
          _data.click = `${config.FRONT_URL}/info/${FormValue.CollectionNetwork}/${FormValue.ContractAddress}/${owner.NFTOwner}/${owner.NFTId}`;
          // debugger

          BackCall(id, _data);
        } else {
          toast.dismiss(id);
          toast.error("Transaction Failed");


          SetBtnData("try");
        }
      }
    } else {
      console.log("FormValueFormValue", FormValue);
      let _data = FormValue;
      _data.NFTOwner = payload.WalletAddress;
      _data.HashValue = "";
      _data.NFTId = owner.NFTId;
      _data.activity = "Change Price";
      _data.click = `${config.FRONT_URL}/crewdetails/${FormValue.CollectionNetwork}/${FormValue.ContractAddress}/${owner.NFTOwner}/${owner.NFTId}`;

      BackCall(id, _data);
    }
  }
  const BackCall = async (id, _data) => {
    let Resp = await CreateOrder(_data);
    if (Resp.status) {

      toast.dismiss(id)
      toast.success("Listed Successfully")

      SetBtnData("done");
      navigate(`/profiletabs/${payload?.CustomUrl}`);
    } else {

      toast.dismiss(id)
      toast.error("Transaction Failed")

      SetBtnData("try");
    }
  };
  const onChange = (e) => {
    SetValidateError({})
    const { files, value, id } = e.target;
    SetBtnData("start");

    SetFormValue({ ...FormValue, ...{ [id]: NumANdDotOnly(value) } });

  };
  const YouWillGet = useMemo(() => {
    return ContractCall.price_calculation(FormValue?.NFTPrice, FormValue?.NFTRoyalty, String(FormValue.ContractAddress).toLowerCase() == String(NativeToken).toLowerCase() ? true : false);
  }, [FormValue?.NFTPrice, FormValue]);

  const setClockValue = (data, date) => {
    SetFormValue({
      ...FormValue,
      ...{ [data]: new Date(date) },
    });
  };
  const CloseModal = () => {
    SetOpenPopup("");
  };


  useEffect(() => {
    setTypetab(true)
    BalanceCheck();
  }, [item, owner]);

  async function BalanceCheck() {

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
      <Modal show={changepricemodal} className="placemodal" size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton onClick={() => {
          handlePutonsaleModal()
          onhide()
        }}></Modal.Header>
        <Modal.Body className='px-3 px-sm-5'>
          {console.log("llxxxll", item)}
          <p className="whtsclr mb-1 text-center">{text === "Change Price" ? "Change Price" : <>  Put on Sale</>}</p>
          <p className="whtsclr fw-600 text-center">{item?.NFTName} </p>
          <div className="text-center mt-3 mb-4">
            {/* <img src={crewimg} className="img-fluid" /> */}


            <ImgAudVideo
              file={ item.CompressedFile.includes('http') ? item?.CompressedFile :  `${config?.IMG_URL}/nft/${item?.NFTCreator}/Compressed/NFT/${item?.CompressedFile}`}
              type={
                item?.CompressedFile
                  ? item?.CompressedFile?.includes(".webp")
                    ? "image"
                    : item?.CompressedFile.includes(".webm")
                      ? "video" : item?.CompressedFile.includes(".mp3") ?
                        "audio" : "glb"
                  : item?.CompressedFile
              }
              thumb={`${config.IMG_URL}/nft/${item?.NFTCreator}/Compressed/NFT_THUMB/${item?.CompressedThumbFile}`}
              origFile={`${config.IMG_URL}/nft/${item?.NFTCreator}/Original/NFT/${item?.OriginalFile}`}
              className="img-fluid"
              glb={item}
              from="model"

            />
          </div>
          <div className="pricetypebtnsec">
            <button className={typetab ? "btn tabbtn active" : "btn tabbtn"} onClick={() => setTypetab(true)}>
              Fixed Price
            </button>
            {/* <button className={!typetab ? "btn tabbtn active" : "btn tabbtn"} onClick={() => setTypetab(false)}>
              TImed Auction
            </button> */}

          </div>
          <div className="mb-3 mt-4 pos">
            <p className="grayclr f-16 text-center mt-2 mb-0"> Your Item will be available to purchase immediately</p>
            {/* <p className="text-uppercase whtsclr text_eth mb-0">ETH</p> */}
            <div className='row selecttokenrow mt-2'>
              <div className="col-md-7 mb-2">
              <input type="text" className="form-control inputs" required placeholder="Price e.g.10"
               value={FormValue.NFTPrice} onChange={onChange} id="NFTPrice" />
              </div>
              {/* manoj select */}
              <div className="col-md-5 mb-2">
            
            
            
              <Select
              classNamePrefix="reactselect"
              defaultValue={selectedOption}
              onChange={(e) => {
                // setboxopen(!boxopen)
                console.log(e);
                SetFormValue({
                  ...FormValue,
                  ...{ ["CoinName"]: e?.label },
                });
              }}
              options={currency}
           
            />
              </div>


{/* <Menu as="div" className="dropdown">
                                <Menu.Button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false" ref={ref}>

                                  <span className="inner">{FormValue.CoinName ? FormValue.CoinName : "Token"}</span>
                                </Menu.Button>
                                <Menu.Items as="div" className="dropdown-menu-new" aria-labelledby="dropdownMenuButton">

                                  {
                                    FormValue.PutOnSaleType ===
                                    "FixedPrice" &&
                                    currency?.map((val) =>
                                    (
                                      <a as={"button"} className="dropdown-item"
                                        onClick={(e) => {
                                          SetFormValue({
                                            ...FormValue,
                                            ...{ ["CoinName"]: val?.label },
                                          });
                                    
                                        }}>

                                        <div className="sort-filter">
                                          <span>{val?.label}</span>
                                        </div>
                                      </a>
                                    )
                                    )}

                                </Menu.Items>
                              </Menu> */}

            </div>
           
           
            <p className="grayclr f-16 text-center mt-2 mb-0">Price must be less than the actual price 0.1</p>



            {(FormValue.PutOnSaleType === "FixedPrice" ||
              FormValue.PutOnSaleType === "TimedAuction") &&
              ValidateError.NFTPrice && (
                // <p className="error_ms">
                //   {ValidateError.NFTPrice}

                // </p>
                <p className='text-danger mt-3'>
                  {ValidateError.NFTPrice}
                </p>
              )}

          </div>
          {!typetab &&
            <div className="timedauctionsec row">
              <div className="col-md-6 mb-3">
                <p className="labelname">Starting date</p>
                <DatePicker
                  selected={startDateState}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDateState}
                  endDate={endDateState}
                  placeholderText="From"
                  showIcon={true}
                />
              </div>
              <div className="col-md-6 mb-3">
                <p className="labelname">Expiry date</p>
                <DatePicker
                  selected={endDateState}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={startDateState}
                  endDate={endDateState}
                  minDate={startDateState}
                  placeholderText="To"
                  showIcon={true}
                />
              </div>

            </div>
          }
          {/* new div */}
          <div>

            {ValidateError.EndClockTime && (
              <span className="text-danger img-file">
                {ValidateError.EndClockTime}
              </span>
            )}
          </div>
          <div>
            <div className="d-flex justify-content-between"><p className="whtsclr f-18">Seller service fee :</p><p className="whtsclr f-18 fw-600">{String(FormValue.ContractAddress).toLowerCase() == String(NativeToken).toLowerCase() ? web3.utils.fromWei(String(sellerFeesNative)) : web3.utils.fromWei(String(sellerFees))} %</p></div>
            <div className="d-flex justify-content-between"><p className="whtsclr f-18">You will get :</p><p className="whtsclr f-18 fw-600">{(Number(YouWillGet)).toFixed(4) ?? 0}</p></div>
          </div>

          <div className="d-flex justify-content-center pb-4">
            {BtnData === "open" && <Button className="explorefull mt-3 me-3" disabled={
              TokenBtn === "process" || TokenBtn === "done" ? true : false
            }
              onClick={
                TokenBtn === "start" || TokenBtn === "try"
                  ? TokenApproveCall
                  : null
              }
            >{TokenBtn === "start" && "Approve"}
              {TokenBtn === "process" && "In-Progress"}
              {TokenBtn === "try" && "Try-Again"}
              {TokenBtn === "done" && "Done"}</Button>}


            <Button className="explorefull mt-3 me-3"
              disabled={
                BtnData === "process" || BtnData === "done" || BtnData === "open" ? true : false
              }
              onClick={BtnData === "start" ? FormSubmit : ""}

            > {(BtnData === "start" || BtnData === "open") && (text === "Change Price" ? "Change Price" : "Put on Sale ")}
              {BtnData === "process" && "processing"}
              {BtnData === "done" && "Done"}
              {BtnData === "try" && "Try-Again"}
              {BtnData === "error" && "Error"}</Button>



          </div>


        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Changeprice;