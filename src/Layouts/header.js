import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, Offcanvas, Dropdown } from 'react-bootstrap';
import { Link, NavLink,useNavigate, useHistory } from "react-router-dom";
import logo from "../Assets/logo.png";
import $ from "jquery";
import Walletmodal from "../Components/walletmodal";
import profimg from "../Assets/profimg.png";
import config from '../config'
import { useDispatch, useSelector } from "react-redux";
import { address_showing, isEmpty } from "../shared/common";
import { GetNftCookieToken, categoryList } from "../services/nft.api";
import { GetUserCookieToken, InitialConnect } from "../services/user.api";
import { connectWallet, getServiceFees } from "../util/hooks/useWallet";
import toast from 'react-hot-toast';
// import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import headsideimg from "../Assets/headsideimg.png";
import { Currency, USDPRICE } from "../services/cms.api";

function Header() {
    const wallet = useSelector((state) => state.LoginReducer.AccountDetails);
    const { payload, token } = useSelector((state) => state.LoginReducer.User);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("lklk",wallet , payload , token)



    const [walletmodal, setWalletmodal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userdata , Setuserdata] = useState(payload)
    useEffect(()=>{
      Setuserdata(payload)
    },[payload?.profile_url])
    const toggleMenu = () => {
        const getWindowWidth = window.innerWidth
        console.log("windn", getWindowWidth, menuOpen)
        if (getWindowWidth < 992) {

            setMenuOpen(false)
        } else { setMenuOpen(false) }
    };

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if ($(this).scrollTop()) {
            $(".navbar").addClass("fixedTop");
        } else {
            $(".navbar").removeClass("fixedTop");
        }
        if (scroll >= 100) {
            $(".fixedTop").addClass('scroll');
            $("#scroll-top").addClass('show');
        }
        else {
            $(".fixedTop").removeClass('scroll');
            $("#scroll-top").removeClass('show');
        }
    });


    useEffect(() => {
      storecategory()
        getInitialSeviceFee();
        if (
          localStorage.getItem("walletConnectType") &&
          wallet.accountAddress === ""
        ) {
          initialConnectWallet(localStorage.getItem("walletConnectType"));
        }

        CurrencyList()
   
      }, [wallet.accountAddress]);


      const getInitialSeviceFee = async () => {
        console.log("wallet?.accountAddress", wallet?.accountAddress);
        const fees = await getServiceFees(wallet?.accountAddress);
        console.log("getServiceFees", fees);
        if (fees) {
          dispatch({
            type: "ServiceFees",
            ServiceFees_Section: {
              ServiceFees: fees,
            },
          });
        }
      };


      const storecategory = async()=>{
        const data = await  categoryList()
        console.log("storecategory", data)
        dispatch({
          type: "Register_Section",
          Register_Section: {
            Categorys: data?.data,
          },
        });
      }

      
      const CurrencyList = async () => {
        let Resp = await Currency();
        
    console.log("sdghagsdiagsid" , Resp)
        if (Resp?.status) {
          let sen = [];
    
          await Promise?.all(
            Resp?.data.map(async (data) => {
              if (!data?.deleted) {
                // if (data.label == "BNB") var USD = await USDPRICE(data.label);
                // else var USD = await TOKENPRICE(data.address);
                const USD = await USDPRICE(data?.label);
                sen.push({
                  value: data?.value,
                  label: data?.label,
                  address: data?.address,
                  usd: USD ? USD : 0,
                  decimal: data?.decimal,
                });
              }
            })
          );
    
          dispatch({
            type: "Register_Section",
            Register_Section: {
              currency: sen,
            },
          });
        }
      };
      const initialConnectWallet = async (type,title) => {
        console.log("vvaaaav",window.ethereum,window.web3)
                const id=toast.loading( type +"Connecting")

                    let accountDetails = await connectWallet(type)
                    console.log("111sdasda11",accountDetails,type,window.ethereum)
                    if (!isEmpty(accountDetails)) {
                        const resp = await setWalletAddress('InitialConnect', accountDetails?.accountAddress, type,id)
                        console.log("resp",resp)
                       
                        console.log("dasdgas",resp)
                        if (resp?.status) {
                            // toast.dismiss(id)
                            toast.success(resp?.message ,  {
                                id: id,
                              })
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
                           
                           
                        }
                      
        
                    }
                    else{
                        // toast.dismiss(id)
                 toast.error('try again' ,  {
                    id: id,
                  })
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
                           
                            navigate(`/createprofile`,{ state: {newaccountdata :  NewMethod} })
                        }
                        
                    }
                }
            }


    const walletDisconnect = async () => {
        setShowDropdown(false)
        localStorage.clear();
        dispatch({
          type: "Account_Section",
          Account_Section: {
            AccountDetails: {
              accountAddress: "",
              tokenBalance: 0,
              coinBalance: 0,
            },
          },
        });
        dispatch({
          type: "Register_Section",
          Register_Section: {
            User: {},
          },
        });
        // window.location.reload();
        document.cookie = "token" + "=" + "" + ";" + ";path=/";
        GetNftCookieToken();
        GetUserCookieToken();
    
        navigate("/");
    
  
      };

    return (
        <>
            {walletmodal && <Walletmodal onDismiss={() => setWalletmodal(false)} />}
            <div className="header">             
                <Navbar key="lg" expand="lg" className="navscroll">
                <img src={headsideimg} className="img-fluid headsideimg"/>
                    <Container>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} onClick={() => setMenuOpen(!menuOpen)} />
                        {console.log("payloadpayload" , userdata?.WalletAddress )}
                        {!userdata?.WalletAddress ?
                            <Button className="walletbtn d-block d-lg-none" onClick={() => { setWalletmodal(true) }}>Connect Wallet</Button>
                            : <Dropdown className="d-block d-lg-none" onMouseLeave={() => setShowDropdown(false)}
                                onMouseOver={() => setShowDropdown(true)}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="d-flex align-items-center"><h6 className="heading mb-0 me-2">0x2....1sdf <img src={profimg} className="profimg ms-2" /> </h6></Dropdown.Toggle>
                                <Dropdown.Menu className='pt-3 pb-0  px-3 drops' show={showDropdown}>
                                    <Link to={`${"/profiletabs/"+ userdata?.CustomUrl}`}>Profile</Link>
                                    <Link onClick={() => walletDisconnect() }>Disconnect</Link>
                                </Dropdown.Menu>
                            </Dropdown>}
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-lg`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                            placement="end"
                            restoreFocus={false}
                            show={menuOpen}
                            onHide={() => setMenuOpen(!menuOpen)}
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                                    <Link to="/" onClick={() => toggleMenu()}> <img src={logo} className="img-fluid mobilelogo" alt="images" /></Link></Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="me-auto align-items-center">
                                    <NavLink to="/" activeClassName="active" onClick={() => toggleMenu()}>Home</NavLink>
                                    <NavLink to="/explore" activeClassName="active" onClick={() => toggleMenu()}>Explore</NavLink>
                               {/* {userdata?.WalletAddress &&     <NavLink to="/stakes" activeClassName="active" onClick={() => toggleMenu()}>Stake</NavLink>} */}
                                  {userdata?.WalletAddress &&      <NavLink to={`${"/profiletabs/"+ userdata?.CustomUrl}`} activeClassName="active" onClick={() => toggleMenu()}>My Item</NavLink>
                           }   </Nav>

                                {!userdata?.WalletAddress ?
                                    <div className="text-center mt-3 mt-lg-0"><Button className="walletbtn" onClick={() => { setWalletmodal(true) }}>Connect Wallet</Button></div> :
                                    <Dropdown onMouseLeave={() => setShowDropdown(false)}
                                        onMouseOver={() => setShowDropdown(true)}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="d-flex align-items-center"><h6 className="heading mb-0 me-2">{userdata?.DisplayName ? userdata?.DisplayName :  address_showing(userdata?.WalletAddress)} 
                                        {console.log("payloaddd" , userdata)}
                                        <img alt="profile" src={userdata?.profile_url ? config.IMG_URL +'/'+userdata?.profile_url : userdata?.Profile ? config.IMG_URL+'/user/' +userdata?.WalletAddress +'/profile/'+userdata?.Profile : profimg} className="profimg ms-2" /> </h6></Dropdown.Toggle>
                                        <Dropdown.Menu className='pt-3 pb-0  px-3' show={showDropdown}>
                                            {/* <Dropdown.Item href="/profiletabs">Profile</Dropdown.Item>
                                            <Dropdown.Item onClick={() => { localStorage.clear(); window.location.reload() }}>Disconnect</Dropdown.Item> */}
                                            <Link to={`${"/profiletabs/"+ userdata?.CustomUrl}`}>Profile</Link>

                                          <Link onClick={() => { walletDisconnect()}}>Disconnect</Link>

                                        </Dropdown.Menu>
                                    </Dropdown>
                                }

                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            </div>
        </>
    )
}

export default Header;