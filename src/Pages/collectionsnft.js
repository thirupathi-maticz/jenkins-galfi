import React, { useEffect, useState } from "react";
import { Container, Button, Accordion, Offcanvas, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import Header from "../Layouts/header";
import Footer from "../Layouts/footer";
import Crewcard from "../Components/crewcard";
import arrow from "../Assets/arrow.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import searchicon from "../Assets/searchicon.png";
// import Filterlist from "../Components/filterlist";
import { IoMdClose } from "react-icons/io";
import table1 from "../Assets/table1.png";
import table2 from "../Assets/table2.png";
import table3 from "../Assets/table3.png";
import table4 from "../Assets/table4.png";
import Crewtablecard from "../Components/crewtablecard";
import Crewimage from "../Components/Crewimage";
import Filterlist from "../Components/filterlist";
import { FaFilter } from "react-icons/fa";
import { CollectionByCreator } from "../services/collection.api";
import { useSelector } from "react-redux";
import { Name_showing } from "../shared/common";
import config from "../config";
import { CollectionList } from "../Components/collection";
import { SearchAction } from "../services/nft.api";
function CollectionNft() {
    const { Categorys } = useSelector((state) => state.LoginReducer);
    const { payload } = useSelector((state) => state.LoginReducer.User);
    const [startload, setstartload] = useState(false)
    const [status, setStatus] = useState(true)
    const [value, setvalue] = useState("")
    const init = {
        All: { loader: true, page: 1, list: [] },
    }
    const [Tokens, SetTokens] = useState({
        All: { loader: true, page: 1, list: [] },
    });
    console.log("TokensTokens", Tokens)
    console.log("kllk", payload?.CustomUrl)
    const [loadbtn, setload] = useState(true)

    const [filter, setFilter] = useState("recentcreated");
    var [filtershow, setFiltershow] = useState("Recently Created")
    const [searchresult, SetSearch] = useState([])
    const [CreateCollectionState, SetCreateCollectionState] = useState([]);
    const [CreateCollectionStateNFT, SetCreateCollectionStateNFT] =
        useState(init);
    const [loadmorevisible, Setloadmore] = useState(true)
    const [pages, setpage] = useState(1);
    const dsx = useParams()
    const router = useNavigate();

    let CollectionSymbol = dsx?.symbol



    const [TabName, SetTabName] = useState("All");


    useEffect(() => {
        Explore({ page: pages, status: true });
    }, [TabName]);


    useEffect(() => {
        Explore({ page: pages, filter: filter, status: true });
    }, [filter]);

    const CollectionByCreate = async () => {
        // console.log('fhbddghshgdh',data)
        var Senddata = {
            from: "collctiondetailonly",
            limit: 9,
            page: 1,
            symbol: CollectionSymbol,
            filter: filter
        };
        let Resp = await CollectionByCreator(Senddata);
        console.log("jdghsgdagsag", Resp);
        SetCreateCollectionState(Resp?.data[0]);

    };

    const Explore = async (data) => {
        console.log('fhbddghshgdh', data)
        var SendDATA = {
            from: "collctiondetails",
            TabName: data?.TabName ? data?.TabName : TabName, // for category 
            CustomUrl: payload?.CustomUrl ? payload?.CustomUrl : "",
            limit: 12,
            page: data?.page ? data.page : 1,
            collectionaddress: CollectionSymbol,
            filter: filter,
            keywords: data?.keywords ? data?.keywords : "",
            pricerange: data?.pricerange ? data.pricerange : false
        };
        let Resp = await CollectionByCreator(SendDATA);
        console.log("responsefromcollectionlist", SendDATA , Resp);


        if (Resp?.status) {
            console.log("datatatus",data.status , Resp)

            if (data.status) {
                SetTokens({

                    ...{
                        [TabName]: {
                            list: Resp.data ? Resp.data : [],

                            loader: (Resp?.data?.length === 0 || (SendDATA?.TabName === "usercollection" && Resp?.cursor == null)) ? false : true,
                            page: Tokens[TabName]?.page,
                            filter: filter
                        },
                    }
            });
            } else {
                // debugger;
                console.log("datatatusxx",data.status , Resp , {
                    ...Tokens,
                    ...{
                        [TabName]: {
                            list: Tokens[TabName]?.list ? [...Tokens[TabName]?.list, ...Resp.data] :  Resp.data ,
                  
                            loader: (Resp?.data?.length === 0 || (SendDATA?.TabName === "usercollection" && Resp?.cursor == null)) ? false : true,
                            page: Tokens[TabName]?.page,
                            filter: filter
                        },
                    },
                })

                SetTokens({
                    ...Tokens,
                    ...{
                        [TabName]: {
                            list: Tokens[TabName]?.list ? [...Tokens[TabName]?.list, ...Resp.data] :  Resp.data ,
                  
                            loader: (Resp?.data?.length === 0 || (SendDATA?.TabName === "usercollection" && Resp?.cursor == null)) ? false : true,
                            page: Tokens[TabName]?.page,
                            filter: filter
                        },
                    },
                });

            }

            setStatus(false)
        }

        if (Resp?.data?.length < 12) {
            console.log('lengthlength', Resp?.data)
            Setloadmore(false)
        }

        setstartload(false)
    };
    const LoadMore = () => {
        Tokens[TabName].page = Tokens[TabName].page + 1;
        // SetTokens(Tokens);
        Explore({ page: Tokens[TabName].page });
    };



    useEffect(() => {
        Explore({ page: 1, status: true })


        CollectionByCreate()

    }, [CollectionSymbol]);


    console.log(
        "CreateCollectionStateCreateCollectionState",
        CreateCollectionState
    );



    async function searchFunc(value) {

        const Resp = await SearchAction({
            keyword: value,
            limit: 100,
            page: 1,
            from: "search",
        });
        console.log("RespRxxxesp", Resp.data.token)
        if (Resp.status) {
            if (value === '') {
                return Explore({ status: true })
            }
            SetTokens(

                {
                    [TabName]: {
                        list: Resp.data.token,


                        page: Tokens[TabName]?.page,
                        filter: filter
                    },
                }
            );
            SetSearch(Resp.data.token);
        }
        setTimeout(() => {
            // setpageloader(true)
        }, 500);
    }


    const handleKeyDown = (event) => {

        if (event.key === 'Enter') {
            event.preventDefault();
            console.log("event-keyyy", event.key)
            setvalue(value)
        }
    }


    // ......................................................




    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [activeTab, setActiveTab] = useState('tablelist');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    const [selfilter, setSelfilter] = useState([]);
    const [accordionOpenss, setAccordionOpenss] = useState();
    const toggleAccordion = (i) => {
        setAccordionOpenss(i === accordionOpenss ? null : i);
    };
    const [accordiontabless, setAccordiontabless] = useState([
        { cat: "Class", filters: [{ name: "Miner", checked: false, num: "3404" }, { name: "Engineer", checked: false, num: "648" }], no: "5" },
        { cat: "Clothes", filters: [{ name: "Jacks", checked: false, num: "48" }, { name: "Polo", checked: false, num: "478" }], no: "31" },
        { cat: "Collection", filters: [{ name: "Printed", checked: false, num: "48" }, { name: "Checked", checked: false, num: "478" }], no: "3" },
        { cat: "Facial Feature", filters: [{ name: "Garnier", checked: false, num: "48" }, { name: "Axen", checked: false, num: "478" }], no: "7" },
        { cat: "Gender", filters: [{ name: "Male", checked: false, num: "48" }, { name: "Female", checked: false, num: "478" }], no: "22" },
        { cat: "Hair Color", filters: [{ name: "Brown", checked: false, num: "48" }, { name: "Black", checked: false, num: "478" }], no: "14" },
        { cat: "Hair Style", filters: [{ name: "Curly", checked: false, num: "48" }, { name: "straightening", checked: false, num: "478" }], no: "9" },
        { cat: "Headwear", filters: [{ name: "Top", checked: false, num: "48" }, { name: "Bottom", checked: false, num: "478" }], no: "18" },
        { cat: "Special Item", filters: [{ name: "Costly", checked: false, num: "48" }, { name: "Low", checked: false, num: "478" }], no: "10" },
    ]);
    { console.log("kkk", accordiontabless); }
    const [findarray, setfindarray] = useState([])
    // const [findarray , setfindarray] = useState({})

    const handlechange = (cat, name, e) => {
        { console.log("ghandlechangegg", name, cat); }
        // array 
        let searchdata = [...findarray];
        console.log("dshadsjhs", searchdata)
        if (name) {
            const existingIndex = searchdata.findIndex(item => JSON.stringify(item) === JSON.stringify(name)); 
                

            if (existingIndex === -1) {
                // If the object doesn't exist, add it to searchdata
                searchdata.push(name);
                setfindarray(searchdata); // Update the state with the modified searchdata
                console.log("Object added:", name);
            } else {
                // If the object already exists, remove it from searchdata
                searchdata.splice(existingIndex, 1);
                setfindarray(searchdata); // Update the state with the modified searchdata
                console.log("Object removed:", name);
            }

            // let daata = { ...searchdata, ...name }

            // searchdata.push(name)
            // setfindarray(searchdata)
            console.log("sdjshd", searchdata)

            // setfindarray(daata)
            Explore({ page: pages, TabName: TabName, keywords: searchdata , status : true  })
            // searchFunc({ value: searchdata, Classid: cat })
        }




        let array = accordiontabless
        let hari = array.map((list) => {
            if (list.cat == cat) {
                list.filters.map((names, i) => {
                    if (names.name == name) {
                        list.filters[i].checked = e.target.checked
                        if (e.target.checked == true) {
                            setSelfilter([...selfilter, { ...list.filters[i], cat: list.cat }])
                        }
                    }
                })
                return list
            }
            else {
                return list
            }
        }

        )
        setAccordiontabless(hari)
    }
    { console.log(selfilter, 'lll'); }
    const close = (name, cat) => {
        let array = accordiontabless
        let hari = array.map((list) => {
            if (list.cat === cat) {
                list.filters.map((names, i) => {
                    if (names.name === name) {
                        list.filters[i].checked = false
                        setSelfilter([...selfilter.filter((s) => s.name !== name)])
                        console.log("ooo", [...selfilter.filter((s) => s.name !== name)]);
                    }
                })
                return list
            }
            else {
                return list
            }
        }

        )
        setAccordiontabless(hari)
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [CollectionSymbol]);
    const Tabchangefun = (id) => {
        SetTabName(id)
        setpage(0)
    }
    const loadmorefetch=() => {
        
        // CollectionSymbol

    }

    return (

        <div className="section_seven">
            <Header />
            <div className="innerpage stars exploress">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <div className="container pt-3 pt-sm-5">
                    <h2 className="heading text-center pb-3 pb-sm-5">Collection : {Name_showing(CreateCollectionState?.CollectionName)}</h2>

                    <div className="allsearch row pb-3 justify-content-center">
                        <div className="col-sm-12 col-md-7 col-lg-6 col-xl-6 col-xxl-7 pos mt-3">
                            <input type="search" className="form-control profinput" placeholder="Search by nft name " onKeyDown={handleKeyDown} onChange={(e) => {
                                searchFunc(e.target.value);
                            }}
                            />
                            <img src={searchicon} className="img-fluid searchicon" />
                        </div>
                        <div className="col-sm-10 col-md-5 col-lg-3 col-xl-3 col-xxl-3 mt-3">
                            <Dropdown>
                                <DropdownToggle className="pricefilter">{filtershow}</DropdownToggle>
                                <DropdownMenu>
                                    {/* {pricefilter.map((e, i) =>
                                        <DropdownItem onClick={() => setSelectfilter(e)}>{e.name}</DropdownItem>
                                    )} */}

                                    <DropdownItem onClick={() => {
                                        setFilter("recentcreated"); setFiltershow("Recently Created")

                                    }}>Recently Created</DropdownItem>

                                    <DropdownItem onClick={() => {
                                        setFilter("recentlisted"); setFiltershow("Recently Listed")

                                    }}>Recently Listed</DropdownItem>

                                    <DropdownItem onClick={() => {
                                        setFilter("recentsold"); setFiltershow("Recently Sold")

                                    }}>Recently Sold</DropdownItem>

                                    <DropdownItem onClick={() => {
                                        setFilter("PriceLowToHigh"); setFiltershow("Low to High")

                                    }}>Low to High</DropdownItem>

                                    <DropdownItem onClick={() => {
                                        setFilter("PriceHighToLow"); setFiltershow("High to Low")

                                    }}>High to Low</DropdownItem>


                                    <DropdownItem onClick={() => {
                                        setFilter("oldest"); setFiltershow("Oldest")

                                    }}>Oldest</DropdownItem>


                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="col-9 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 mt-3">
                            <ul className="tableborders py-2 px-0">
                                <li className={activeTab === 'tablelist' ? 'active' : 'tabtext'} onClick={() => handleTabClick('tablelist')}><img src={table1} className="img-fluid tableimg" /></li>
                                <li className={activeTab === 'allgrid' ? 'active' : 'tabtext'} onClick={() => handleTabClick('allgrid')}><img src={table2} className="img-fluid tableimg" /></li>
                                <li className={activeTab === 'limitgird' ? 'active' : 'tabtext'} onClick={() => handleTabClick('limitgird')}><img src={table3} className="img-fluid tableimg" /></li>
                                <li className={activeTab === 'imagegrid' ? 'active' : 'tabtext'} onClick={() => handleTabClick('imagegrid')}><img src={table4} className="img-fluid tableimg" /></li>
                            </ul>
                        </div>
                    </div>


                    <div className="row pb-5 pt-3 pt-lg-5">
                        <div className="col-lg-4 col-xl-3 allsearch">
                            <div className="d-none d-lg-block">
                                {/* <Filterlist list={accordiontabless} toggleAccordion={toggleAccordion} handlechange={handlechange} /> */}
                                <Filterlist list={accordiontabless} explore={Explore} toggleAccordion={toggleAccordion} Tabchange={Tabchangefun} handlechange={handlechange} />


                            </div>
                        </div>
                        <div className="col-lg-8 col-xl-9">
                            <div className="text-end d-block d-lg-none mb-4 filterby"><Button onClick={handleShow} className="explorefull">Filter By <FaFilter /></Button></div>
                            <Offcanvas show={show} onHide={handleClose} className="allsearch exploress" placement="end">
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title className="heading">Filter</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Filterlist list={accordiontabless} toggleAccordion={toggleAccordion} handlechange={handlechange} />
                                </Offcanvas.Body>
                            </Offcanvas>

                            <div className="listflex">
                                {selfilter.map((e) =>
                                    <div className="listed d-flex align-items-center py-2 px-3">
                                        {/* {} */}
                                        <p className="whtsclr fw-200 mb-0 me-1">{e._id} :</p>
                                        <h5 className="whtsclr mb-0 me-2">{e.name}</h5>
                                        <IoMdClose className="closebtn" onClick={() => close(e.name, e.cat)} />
                                    </div>
                                )}
                            </div>

                            {activeTab === 'tablelist' &&
                                <>
                                    {<div className="mt-3">

                                        <Crewtablecard data={Tokens[TabName]?.list} creatordetailes={CreateCollectionState} /></div>
                                    }   </>
                            }

                            {activeTab === 'allgrid' &&
                                <div className="allgrid row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
                                    {console.log("allgriddataTokens", Tokens[TabName])}
                                    {Tokens[TabName]?.list.length ? Tokens[TabName]?.list?.map((e, i) =>
                                        // <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mt-5">
                                        <div className="col mt-5">
                                            {console.log("allgriddata" , e)}
                                            <Link to={`/crewdetail/${e?.CollectionNetwork +'/'+ e?.ContractAddress +'/'+ (e?.NFTOwner ? e?.NFTOwner : e?.Owners?.NFTOwner )+ '/'+ e?.NFTId}` }state={{ cardtype: "explore" }}><Crewcard 
                                            product={{
   "from" : activeTab , 
   "imageurl" : `${e?.CompressedFile?.includes('http') ? e.CompressedFile : e.CompressedFile ? config.IMG_URL+'/nft/'+e.NFTCreator +'/Compressed/NFT/'+e.CompressedFile : config.IMG_URL+'/nft/'+e.NFTCreator +'/Original/NFT/'+e.NFTOrginalImage}`
   , "price" : e.NFTPrice ,
    "coinname" :  e.CoinName ,
     "nftname" : e.NFTName , 
     "putonsaletype": e.PutOnSaleType ,
    "nftprice" : e.NFTPrice ,
     "nftid" : e.NFTId,
     "owners" : e.Owners,
     'ipfs' : e?.NFTOrginalImage?.includes('ipfs') ? e.NFTOrginalImage : '',
     "image_url" : `${e.image_url?.includes('https') ? e.image_url : config.IMG_URL + e.image_url}`

                                         }     }/></Link>
                                        </div>
                                    ) : <h4 className="whtsclr">no data found</h4>}
                                </div>
                            }

                            {activeTab === 'limitgird' &&
                                <>
                                    <div className="row">
                                    {
                                    
                                    Tokens[TabName]?.list.length   ? Tokens[TabName]?.list?.map((e, i) =>
                                            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-4 mt-5">
                                                {console.log('kkkkk' , e)}       
                                                       <Link to={`/crewdetail/${e?.CollectionNetwork +'/'+ e?.ContractAddress +'/'+( e?.NFTOwner ? e?.NFTOwner : e?.Owners?.NFTOwner) + '/'+ e?.NFTId}` }state={{ cardtype: "explore" }}><Crewcard product={{
   "from" : activeTab , 
   "imageurl" : `${e?.CompressedFile ? config.IMG_URL+'/nft/'+e.NFTCreator +'/Compressed/NFT/'+e.CompressedFile : config.IMG_URL+'/nft/'+e.NFTCreator +'/Original/NFT/'+e.NFTOrginalImage}`
   , "price" : e.NFTPrice ,
    "coinname" :  e.CoinName ,
     "nftname" : e.NFTName , 
     "putonsaletype": e.PutOnSaleType ,
    "nftprice" : e.NFTPrice ,
     "nftid" : e.NFTId,
     "owners" : e.Owners,
     'ipfs' : e?.NFTOrginalImage?.includes('ipfs') ? e.NFTOrginalImage : '',
     "image_url" : `${e?.image_url?.includes('https') ? e.image_url : config.IMG_URL + e.image_url}`
                                         }     } /></Link>
                                            </div>
                                        ) : <h4>no data found</h4>}
                                    </div>
                                </>
                            }


                            {activeTab === 'imagegrid' &&
                                <>
                                    <div className="row imagegrid">
                                        {TabName && Tokens[TabName]?.list.length !== 0 ? Tokens[TabName]?.list?.map((e, i) =>
                                            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mt-5">
                                                {console.log("sidguasgdyua" , e)}
                                                <Link to={`/crewdetail/${e?.CollectionNetwork +'/'+ e?.ContractAddress +'/'+ (e?.NFTOwner ? e?.NFTOwner : e?.Owners?.NFTOwner )+ '/'+ e?.NFTId}` } state={{ cardtype: "explore" }}>
                                                    <Crewimage product={e} creatordetailes={CreateCollectionState} /></Link>
                                            </div>
                                        ) : <h3 className="whtsclr"> no data found</h3>}
                                    </div>
                                </>
                            }


                            {loadmorevisible && (<div className="text-center mt-5"><Button className="explore" onClick={() => LoadMore()}>Load More</Button></div>)}
                        </div>
                    </div>

                    {/* <div className="collections pt-5 pb-3">
                        <h2 className="heading pt-4 pb-3">Top Collections <img src={arrow} className="img-fluid" alt="images" /></h2>
                   
                        <div className="row">
                            {topcollect.map((e, i) =>
                                <div className="col-md-6 col-lg-4 col-xl-4 col-xxl-3 mt-4">
                                    <Link to="/crewdetail" state={{ cardtype: "explore" }}><Crewcard /></Link>
                                </div>
                            )}
                            <div className="text-center mt-5"><Button className="explore">Load More</Button></div>

                        </div>

                    </div> */}
                    <CollectionList />
                </div>
            </div>
            <Footer />
        </div >

    )
}

export default CollectionNft