import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import bnb from "../Assets/bnb.png";
import eth from "../Assets/eth.png";
import { useSelector } from "react-redux";
import { isEmpty } from "../shared/common";
import toast from "react-hot-toast";
import config from '../config'
import useContractProviderHook from "../services/ContractProviderhook";
import { useNavigate } from "react-router";
import { BuyAccept } from "../services/nft.api";
function TransferTokenModal({ isTransferTokenModal, handleTransferTokenModal, owner, item , onhide}) {
    const { web3, accountAddress } = useSelector(
        (state) => state.LoginReducer.AccountDetails
      );
      const [once, setOnce] = useState(true)
      const { sellerFees } = useSelector((state) => state.LoginReducer.ServiceFees);
      const { payload } = useSelector((state) => state.LoginReducer.User);
      const [amount, setAmount] = useState("1");
      const [Address, SetAddress] = useState("");
      const [Quantity, SetQuantity] = useState(owner.TokenQuantity);
      const [Btn, SetBtn] = useState("start");
      const [Error, SetError] = useState("");
      const navigate = useNavigate()
      const ContractCall = useContractProviderHook()
    

      const Validation = async () => {
        console.log("transferrrtokennn", Address, "shdgasud", accountAddress)
        let tempadd = accountAddress
    
        if (isEmpty(Address)) return "User  Required";
        if (!web3.utils.isAddress(Address)) return "Enter Valid Transfer Address"
        if ((Number(owner.NFTBalance) > 1) && isEmpty(amount)) return "Quantity  Required";
        if (Number(amount) > Number(owner.NFTBalance))
          return "Token Quantity Must be less than " + owner.NFTBalance;
        if (Number(amount) <= 0 || Number(amount) < 0) {
          console.log("amonfotransfer", amount)
        
          return "Enter Valid Quantity"
        }
        if (Address.toLowerCase() == tempadd.toLowerCase()) {
          return "You Can't Transfer Token to Your Self";
    
        }
        if (await ContractCall.Contract_Base_Validation())
          return await ContractCall.Contract_Base_Validation();
      };


      const FormSubmit = async () => {


        const id = toast.loading("Transferring Your Token");
        SetError("");
        SetBtn("process");
        var error = await Validation();
        if (error) {
            toast.dismiss(id)
         toast.error('validation failed')
          SetBtn("error");
          SetError(error);
        } else {
          var data = {
            nftOwner: owner.NFTOwner,
            Address,
            NFTId: owner.NFTId,
            amount,
            datas: "0x0",
            ContractType: item.ContractType
          }
          let cont = await ContractCall.Transfer(data);
    
          if (cont) {
    
    
    
            let newOwner = {
              HashValue: cont.HashValue,
              NewTokenOwner: Address.toLowerCase(),
              NFTQuantity: amount === "" ? "1" : amount,
              NFTId: owner.NFTId,
              NFTOwner: owner.NFTOwner,
              PutOnSale: owner.PutOnSale,
              PutOnSaleType: owner.PutOnSaleType,
              activity: "Transfer",
              TP: 0,
              CN: ""
            }
            let Resp = await BuyAccept({ newOwner: newOwner, item: item });
            console.log("sdiuagsdia", Resp)
            if (Resp.status) {
                toast.dismiss(id)
                toast.success('Transferring Your Token Successfully')
         
              SetBtn("done");
              navigate(`/profiletabs/${payload?.CustomUrl}`);
            } else {
                toast.dismiss(id);
                toast.error("Transaction Failed")
              SetBtn("try");
            }
          } else {
      

toast.dismiss(id);
toast.error("Transaction Failed")

            SetBtn("try");
          }
        }
      };


    const [placemodal, setPlacemodal] = useState(true);
    const [selectedValue, setSelectedValue] = useState({ img: bnb, name: "BNB" });

    const [tokens, setTokens] = useState([
        { img: bnb, name: "BNB" }, { img: eth, name: "ETH" }
    ])

   
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
            <Modal show={placemodal} className="placemodal" size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onClick={() => {onhide();
                handleTransferTokenModal();}}></Modal.Header>
                <Modal.Body className='px-3 px-sm-5'>
                    <h4 className="heading text-center">Transfer Token</h4>
                    <p className="whtsclr mb-1 text-center">You are about to transfer token for</p>
                    <p className="whtsclr fw-600 text-center">{item.NFTName} </p>
                    <p className="whtsclr mb-1 text-center fw-300">You only own {" "+owner.NFTBalance +" "}quantity</p>
                    <div className="mb-3 mt-4">
                    {
                  (Number(owner.NFTBalance) > 1) && (
                    <>
                     
                        <input type="number" placeholder="Enter Quantity to Transfer" className="form-control inputs"  id="amount" name="NumOnly" tabIndex={2} 
                          // value={owner.NFTQuantity}
                          onChange={(e) => { setAmount(e.target.value); SetError(""); SetBtn("start") }}

                          required />

                  
                      <p className="text-danger  text-left">Please enter valid quantity (Max:{owner.NFTBalance})</p>
                    </>
                  )

                }

                        <h5 className="whtsclr">Enter Wallet Address </h5>
                        <input type="text" 
                          onChange={(e) => { SetAddress(e.target.value); SetError(""); SetBtn("start") }}
                          placeholder="Enter Wallet Address"className="form-control inputs" />
                    </div>
              
                    {Error && <p className="text-danger  text-left">{Error}</p>}
                    <div className="text-center pb-4"><Button className="explore mt-4" 
                    disabled={
                        Btn === "error" || Btn === "process" || Btn === "done"
                          ? true
                          : false
                      }
                    onClick={Btn === "start" || Btn === "try" ? FormSubmit : null}>
                        {(Btn === "start" && "Transfer") ||
                    (Btn === "try" && "Try-Again") ||
                    (Btn === "error" && "Error") ||
                    (Btn === "done" && "Done") ||
                    (Btn === "process" && "In-Progress")}</Button></div>

                    <div className="text-center pb-4"><Button className="explore mt-4" onClick={() => handleTransferTokenModal()}>Cancel</Button></div>

                    
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default TransferTokenModal;