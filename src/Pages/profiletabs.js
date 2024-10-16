import React, { useEffect, useState } from "react";
import { Container, Button, Accordion } from 'react-bootstrap';
import Header from "../Layouts/header";
import Footer from "../Layouts/footer";
import bannerimg from "../Assets/bannerimage.png";
import person from "../Assets/person.png";
import { Link, useLocation  , useParams } from "react-router-dom";
import Crewcard from "../Components/crewcard";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { fetchmyitemlist } from "../services/nft.api";
import { fetchuserdataapi } from "../services/user.api";
import config from '../config'

function Profiletabs() {
    const dispatch = useDispatch();
    const { payload, token } = useSelector((state) => state.LoginReducer.User);
    const { customurl } = useParams();
const [Page , setPage]= useState(1)
const [Tokens, SetTokens] = useState({ 'onsale': { 'loader': true, page: 1, list: [] } })
    const [userProfile, setUserProfile] = useState({})
    const [nfts , Setnfts] = useState([])
    const [Loader , setLoader]= useState(true)
    const localtion = useLocation();
    console.log("history" ,customurl) 
    const [activeTab, setActiveTab] = useState('onsale');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const [ownedcard, setOwnedcard] = useState([
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }
    ]);
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    useEffect(() => {
        fetchuserdata()
       
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        if(userProfile?.WalletAddress){
            fetchprofiletabs()
        }
    },[userProfile , Page , activeTab , Tokens[activeTab]?.page ])


const fetchuserdata = async()=>{
   const resp = await fetchuserdataapi(customurl)
   dispatch({
    type: 'Register_Section',
    Register_Section: {
        User: {
            payload: resp?.data,
            token: resp.token ? resp.token : token
        }
    }
})
console.log("llll", resp)
   setUserProfile(resp?.data)
}

    const fetchprofiletabs = async () => {

const data = {
    TabName : activeTab , 
    limit : 10,
    CustomUrl : customurl,
    WalletAddress:userProfile?.WalletAddress,
    NFTOwner : userProfile?.WalletAddress,
    page :  Tokens[activeTab]?.page ?  Tokens[activeTab]?.page : 1 ,
    from : "myitem",
    collectionfrom : "",
    CollectionSymbol : "",
    filter : "LatestDrops",
    Categoryname : "All",
    Type : "",
    status : "All"
}

        const resp = await fetchmyitemlist(data)
console.log("daosgdagdia" ,resp.data)
    if(resp?.data.length < 10 ){
        setLoader(false)
    }
       

            SetTokens({
    ...Tokens, ...{
        [activeTab]: {
            list: data?.page === 1 ?  resp?.data : [...Tokens[activeTab].list , ...resp?.data],
            loader:  resp?.data?.length < 10 ? false : true ,
            page: Tokens[activeTab]?.page ? Tokens[activeTab]?.page : 1,
           
        }
    }
})

     
    }

    const changepage =()=>{
// const pa = Tokens[activeTab]?.page + 1 
// SetTokens( ...Tokens , ...{ [activeTab] : { ...Tokens[activeTab] , page : pa } } )
const updatedPage = Tokens[activeTab]?.page + 1;
const updatedToken = { ...Tokens[activeTab], page: updatedPage };
const updatedTokens = { ...Tokens, [activeTab]: updatedToken };
SetTokens(updatedTokens);
    }
    const defaultimage = person

console.log("sdhssssihda" , Tokens)

    return (

        <div className="section_seven">

            <Header />

            <div className="innerpage stars owned">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <div className="pos mt-4 mt-sm-5">
                {userProfile?.WalletAddress === payload?.WalletAddress &&  <Link to="/profiledit" state={userProfile} style={{ color: "#000" }}><div className="editback"><MdEdit /> Edit</div></Link>}
                    <img src={bannerimg} className="img-fluid bimg" />
                    <div className="container profileback py-3 py-md-3 py-lg-5 px-3 px-md-3 px-lg-5">
                        <div className="row align-items-end text-center text-md-start">
                            <div className="col-md-4 col-lg-4 col-xl-3 col-xxl-3 mt-3">
                            {console.log("prooooo" , userProfile)}
                                <div className="pos inner_wrap"> <img src={` ${userProfile?.profile_url ? config.IMG_URL + userProfile?.profile_url : person  }`} className="img-fluid person" /></div>
                                {/* <input type="file" onChange={handleChange} /> <Button>Edit</Button> */}
                            </div>
                            <div className="col-md-8 col-lg-8 col-xl-9 col-xxl-9 mt-3"> 
                            {/* <h3 className="whtsclr">{userProfile?.DisplayName ? userProfile?.DisplayName : userProfile?.WalletAddress }</h3>
                            <p className="whtsclr fw-300 f-18 mb-0">{userProfile?.WalletAddress}</p> */}
                            <div className="row textleft">
                            <div className="col-sm-8 col-md-6 col-lg-8 col-xl-8 col-xxl-6 mt-3">
                               <h3 className="whtsclr">{userProfile?.DisplayName ? userProfile?.DisplayName : userProfile?.WalletAddress }</h3>
                               <p className="whtsclr fw-300 f-16 mb-0">{userProfile?.WalletAddress}</p>
                                </div>
                                { userProfile?.Bio &&
                                <div className="col-sm-4 col-md-6 col-lg-4 col-xl-4 col-xxl-5 mt-3">
                                <p class="whtsclr mb-1 fw-600">Bio</p>
                                <p className="whtsclr fw-300 f-16 mb-0">{userProfile?.Bio}</p>
                                </div>}
                                { userProfile?.EmailId &&
                                <div className="col-sm-4 col-md-6 col-lg-4 col-xl-4 col-xxl-5 mt-3">
                                <p class="whtsclr mb-1 fw-600">Email</p>
                                <p className="whtsclr fw-300 f-16 mb-0">{userProfile?.EmailId}</p> 
                                </div>}
                                { userProfile?.CustomUrl &&
                                <div className="col-sm-4 col-md-6 col-lg-4 col-xl-4 col-xxl-5 mt-3">
                                <p class="whtsclr mb-1 fw-600">custom url </p>
                                <p className="whtsclr fw-300 f-16 mb-0">{userProfile?.CustomUrl}</p>
                                </div>}
                                { userProfile?.Twitter &&
                                <div className="col-sm-4 col-md-6 col-lg-4 col-xl-4 col-xxl-5 mt-3">
                                <p class="whtsclr mb-1 fw-600">Twitter</p>
                                <p className="whtsclr fw-300 f-16 mb-0">{userProfile?.Twitter}</p> 
                                </div> }                          
                                { userProfile?.Instagram && <div className="col-sm-4 col-md-6 col-lg-4 col-xl-4 col-xxl-5 mt-3">
                                <p class="whtsclr mb-1 fw-600">Instagram</p>
                                <p className="whtsclr fw-300 f-16 mb-0">{userProfile?.Instagram}</p>
                                </div>}
                             {userProfile?.Facebook &&    <div className="col-sm-4 col-md-6 col-lg-4 col-xl-4 col-xxl-5 mt-3">
                                <p class="whtsclr mb-1 fw-600">Facebook</p>
                                <p className="whtsclr fw-300 f-16 mb-0">{userProfile?.Facebook}</p>
                                </div>}
                                {userProfile?.Youtube && <div className="col-sm-4 col-md-6 col-lg-4 col-xl-4 col-xxl-5 mt-3">
                                <p class="whtsclr mb-1 fw-600">Youtube</p>
                                <p className="whtsclr fw-300 f-16 mb-0">{userProfile?.Youtube}</p> 
                                </div>}
                            </div>
                            {/* <p className="whtsclr fw-300 f-18 mb-0">{userProfile?.Bio}</p>
                            <p className="whtsclr fw-300 f-18 mb-0">{userProfile?.EmailId}</p> 
                            <p className="whtsclr fw-300 f-18 mb-0">{userProfile?.CustomUrl}</p>
                            <p className="whtsclr fw-300 f-18 mb-0">{userProfile?.Twitter}</p> 
                             <p className="whtsclr fw-300 f-18 mb-0">{userProfile?.Instagram}</p>
                             <p className="whtsclr fw-300 f-18 mb-0">{userProfile?.Facebook}</p>
                             <p className="whtsclr fw-300 f-18 mb-0">{userProfile?.Youtube}</p> */}
                            </div>
                        </div>
                        {/* <div className="editback"><MdEdit/> Edit</div> */}
                    </div>
                </div>

                <div className="container pt-4">    
                    <ul className="tab-list pt-4 mb-0">
                        <li className={activeTab === 'onsale' ? 'active' : 'tabtext'} onClick={() => handleTabClick('onsale')}>On sale</li>
                        <li className={activeTab === 'owned' ? 'active mx-2 mx-sm-4' : 'tabtext mx-2 mx-sm-4'} onClick={() => handleTabClick('owned')}>Owned</li>
                        {/* <li className={activeTab === 'stake' ? 'active' : 'tabtext'} onClick={() => handleTabClick('stake')}>Stake</li> */}
                    </ul>
                    {activeTab === 'owned' &&
                        <>

                            <div className="row">
                                {Tokens[activeTab]?.list.length ? 

                                Tokens[activeTab]?.list.map((e, i) =>
                                    <div className="col-md-6 col-lg-4 col-xl-4 col-xxl-3 mt-5">
                                        <Link to={`/crewdetail/${e.CollectionNetwork + '/'+ e.ContractAddress + '/'+ e.NFTOwner + '/'+ e.NFTId}`} state={{cardtype:"explore"}}>
                                        {console.log("lxlxlxx" , e)}
                                        {/* <Link to="/crewdetail" state={{cardtype:"explore"}}> */}
                                            <Crewcard 
                                        product={{
                                            "from" : activeTab , 
                                            "imageurl" : `${e?.image_url?.includes('/nft/') ? config.IMG_URL +'/'+ e?.image_url : e?.image_url?.includes('http') ? e?.image_url : e?.NFTThumpImage?.includes('http') ? e?.NFTThumpImage : config?.IMG_URL +'/'+ e?.NFTThumpImage}`,
                                             "price" : e.NFTPrice ,
                                             "coinname" :  e.CoinName ,
                                              "nftname" : e.NFTName , 
                                              "putonsaletype": e.PutOnSaleType ,
                                             "nftprice" : e.NFTPrice ,
                                              "nftid" : e.NFTId , 
                                           "image_url" : `${e?.image_url?.includes('https') ? e.image_url : config.IMG_URL + e.image_url}`

                                        }
                                        }
                                        />
                                        </Link>
                                    </div>
                                ) 
                                
                                :
                                <h3 className="text-center whtsclr">No NFT Found</h3>
                                }


                          { Tokens['owned']?.loader  &&   <div className="text-center mt-5"><Button className="explore" onClick={()=> changepage()} >Load More</Button></div>
 } </div>
                        </>
                    }

                    {/* {activeTab === 'stake' &&
                        <>
                            <div className="row">
                                {ownedcard.map((e, i) =>
                                    <div className="col-md-6 col-lg-4 col-xl-4 col-xxl-3 mt-5">
                                        <Link to="/crewdetail" state={{cardtype:"explore"}}><Crewcard /></Link>
                                    </div>
                                )}
                                <div className="text-center mt-5"><Button className="explore">Load More</Button></div>

                            </div>
                        </>
                    } */}

                    {activeTab === 'onsale' &&
                        <>
                            <div className="row">
                            {Tokens[activeTab]?.list.length ? 
                                Tokens[activeTab]?.list.map((e, i) =>
                                    <div className="col-md-6 col-lg-4 col-xl-4 col-xxl-3 mt-5">
                                        {console.log("kklsks", e)}
                                        <Link to={`/crewdetail/${e.CollectionNetwork + '/'+ e.ContractAddress + '/'+ e.NFTOwner + '/'+ e.NFTId}`} state={{cardtype:"explore"}}>
                                     
                                        <Crewcard 
                                        product={{
                                            "from" : activeTab , 
                                            "imageurl" : `${e?.image_url?.includes('https') ? e.image_url  : config.IMG_URL + e.image_url}`
                                            , "price" : e.NFTPrice ,
                                             "coinname" :  e.CoinName ,
                                              "nftname" : e.NFTName , 
                                              "putonsaletype": e.PutOnSaleType ,
                                             "nftprice" : e.NFTPrice ,
                                              "nftid" : e.NFTId,
                                              'ipfs' : e?.NFTOrginalImage?.includes('ipfs') ? e.NFTOrginalImage : '',
                                               "image_url" : `${e?.image_url?.includes('https') ? e.image_url  : config.IMG_URL + e.image_url}`
                                        
                                            }
                                        }
                                        />
                                        </Link>
                                    </div>
                                ) : 
                                <h3 className="text-center whtsclr">No NFT Found</h3>
                                }
                               {  Tokens['onsale']?.loader  &&  <div className="text-center mt-5"><Button className="explore" onClick={()=>  changepage()}>Load More</Button></div>}
                            </div>
                        </>
                    }

                </div>


            </div>
            <Footer />
        </div>

    )
}

export default Profiletabs;