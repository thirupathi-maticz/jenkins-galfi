import React, { useEffect, useState } from "react";
import { Container, Button, Modal } from 'react-bootstrap';
import meta from "../Assets/meta.png";
import meta2 from "../Assets/base.png";
import meta3 from "../Assets/walletcon.png";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from "react-router-dom";
// import toast from 'react-hot-toast'
import toast from 'react-hot-toast';
import { useWeb3React } from '@web3-react/core';
import {connectWallet} from '../util/hooks/useWallet'
import { GetNftCookieToken } from "../services/nft.api";
import { GetUserCookieToken, InitialConnect } from "../services/user.api";
import { isEmpty } from "../shared/common";
function Walletmodal(props) {
    const {userdata} = useSelector(state => state.LoginReducer)
    const [walletmodal, setWalletmodal] = useState(true);
    const { referralLink } = useParams();
    const [updatePage, setUpdatePage] = useState(true)
    const [dataa, setDataa] = useState({})
    const [accDetail,setAccDetail]=useState({})
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector(state => state.LoginReducer.User)

    const initialConnectWallet = async (type,title) => {
        console.log("vvaaaav",window.ethereum,window.web3)
                const id=toast.loading( type +"Connecting")
                    let accountDetails = await connectWallet(type)
                    console.log("111sdasda11",accountDetails,type,window.ethereum)
                    if (!isEmpty(accountDetails)) {
                        const resp = await setWalletAddress('InitialConnect', accountDetails?.accountAddress, type,id)
                        console.log("resp",resp)
                        setAccDetail(accountDetails)
                        console.log("dasdgas",resp)
                        if (resp?.status) {
                            toast.dismiss(id)
                            toast.success(resp?.message)
                            // toast.update(id, { render: resp.msg, type: resp.success, autoClose: 1000, isLoading: false, closeButton: true, closeOnClick: true })
                            dispatch({
                                type: "Account_Section",
                                Account_Section: { AccountDetails: accountDetails }
                            })
                            // --> multi network
                            const chainid = await accountDetails.web3.eth.getChainId();
                            dispatch({
                              type: "Network_section",
                              Network_section: {
                                  Network: chainid
                              },
                          })
                          
                            localStorage.setItem('token' , resp?.token)
                            props.onDismiss()
                            navigate("/")
                        }
                      
        
                    }
                    else{
                        toast.dismiss(id)
                 toast.error('try again')
                }}


            const setWalletAddress = async (type, walletAddress, walletType,id) => {
               
                if (walletAddress) {
                    const NewMethod = {
                        Type: type,
                        WalletAddress: walletAddress,
                        WalletType: walletType,
                    };
         
                
                    let Resp = await InitialConnect(NewMethod);
               

                console.log("Connectwallet" , Resp)

                    if(Resp.status){
                        
                            dispatch({
                                type: 'Register_Section',
                                Register_Section: {
                                    User: {
                                        payload: Resp.data,
                                        token: Resp.token ? Resp.token : token
                                    }
                                }
                            })
                            document.cookie = 'token' + "=" + Resp?.token + ";" + ";path=/";
                            GetNftCookieToken();
                            GetUserCookieToken();
                       
                            return Resp
                        

                    }


                    if(!Resp.status){
                        if(Resp.message === 'createaccount'){
                            setDataa(Resp?.data)
                            navigate(`/createprofile`,{ state: {newaccountdata :  NewMethod} })
                        }
                        
                    }
                }
            }



    return (

        <div className=''>
            <Modal show={walletmodal} className="walletmodal" size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton  onClick={() => props.onDismiss()}></Modal.Header>
                <Modal.Body className='px-3 px-sm-5'>
                   <h3 className="heading text-center">Connect your wallet</h3>
                   <p className="intertxt text-center">Connect with one of available wallet providers</p>
                  
                  <div className="row pb-5 justify-content-center">
                    <div className="col-md-6 col-lg-4 mt-4">
                        <div className="metawallet py-4 px-3" onClick={()=>{
                              initialConnectWallet(  "MetaMask" )}}>
                             <h5 className="wallettxt mb-3">MetaMask</h5>
                             <img src={meta} className="img-fluid metaimg"/>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mt-4">
                        <div className="metawallet py-4 px-3"  onClick={()=>{
                              initialConnectWallet(  "TrustWallet" )}}>
                             <h5 className="wallettxt mb-3">TrustWallet</h5>
                             <img src={meta2} className="img-fluid metaimg"/>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mt-4">
                        <div className="metawallet py-4 px-3" 
                        onClick={()=>{
                            initialConnectWallet("WalletConnect")}}>
                                                             <h5 className="wallettxt mb-3">WalletConnect</h5>
                             <img src={meta3} className="img-fluid metaimg"/>
                        </div>
                    </div>
                  </div>
             
                </Modal.Body>
            </Modal>
        </div>

    )
}

export default Walletmodal;