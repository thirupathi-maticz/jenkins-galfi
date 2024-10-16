import React, { useEffect, useRef, useState } from "react";
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
import { Token_List_Func } from "../services/nft.api";
import { useSelector } from "react-redux";
import config from '../config' 
import { CollectionByCreator } from "../services/collection.api";
import Collectioncard from "../Components/collectioncard";
import Colloctiontablecard from "../Components/collectiontablecard";
import { CollectionList } from "../Components/collection";
function Explore() {

    const [startload , setstartload] = useState(false)
const [datahere,setdata] = useState([])
    const ref = useRef(null);
    const ref1 = useRef(null);
    var init = {
        All:undefined,
      }
      const [Collectionsdata,Setcollectionsdata ] = useState(init);
      const [limit,Setlimit] = useState(12);
      const [TabName, SetTabName] = useState("All");
      const [value,setvalue] = useState('owned');


      const { payload,isAdmin } = useSelector(state => state.LoginReducer.User)

    //   const {category } = useSelector((state) => state.category);

      var [filter,setFilter] = useState("recentlycreated");

      useEffect(() => {
        // if (typeof Collectionsdata[TabName] == "undefined") {
          Collectionsdata[TabName] = { page: 1, list: [], loader: false };
          Setcollectionsdata(Collectionsdata);
          CollectionByCreate(1, TabName);
        // }
      }, [TabName,filter]);

const CollectionByCreate = async (page,tab) => {
    setstartload(true)

    var SendDATA = {
        from:"collctionpage",
        TabName:  'collection',
        limit:  20,
        page: page ?? 1,
        Categoryname:tab ? tab: TabName,
        filter:filter

      }
      
      
    //   let Resp = await Token_MyList_Func(SendDATA);
          let Resp = await CollectionByCreator(SendDATA);
          console.log("SendDATASendDAxxxxTA",Resp);


    if(Resp?.data){
        setdata(Resp?.data)
      Setcollectionsdata({
    
        ...Collectionsdata,
        ...{
          [TabName]: {
            list: Collectionsdata[TabName]?.list ?  [...Collectionsdata[TabName]?.list, ...Resp?.data] : Resp?.data,
            page: Collectionsdata[TabName]?.page,
            loader: (Resp.data.length < 12 ? false : true)
    
          },
        },
      })
    
    };

    setstartload(false)

    }
    const LoadMore = () => {
      Collectionsdata[TabName].page = Collectionsdata[TabName].page + 1;
      Setcollectionsdata(Collectionsdata)
      CollectionByCreate(Collectionsdata[TabName].page,TabName)
    
    
    };


    const [searchQuery, setSearchQuery] = useState('');












    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [activeTab, setActiveTab] = useState('tablelist');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const [explores, setExplores] = useState([
        { id: 1, }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }
    ]);
    const [topcollect, setTopcollect] = useState([
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }
    ]);

    const [selectfilter, setSelectfilter] = useState({ name: "Price Low to High" });
    const [pricefilter, setPricefilter] = useState([
        { name: "Price Low to High" }, { name: "Price High to Low" }, { name: "Recently Listed" }, { name: "Best Offer" },
        { name: "Highest last sale" }, { name: "Recently sold" }, { name: "Recently created" }, { name: "Most viewed" },
        { name: "Oldest" }, { name: "Most favorited" }, { name: "Ending soon" }, { name: "Recently received" },
    ]);

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
    const handlechange = (name, cat, e) => {
        { console.log("ggg", e.target.checked, name, cat); }
        let array = accordiontabless
        let hari = array.map((list) => {
            if (list.cat === cat) {
                list.filters.map((names, i) => {
                    if (names.name === name) {
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
                    if (names.name == name) {
                        list.filters[i].checked = false
                        setSelfilter([...selfilter.filter((s) => s.name != name)])
                        console.log("ooo", [...selfilter.filter((s) => s.name != name)]);
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
    }, []);


    const handleSearch = (searchValue) => {

        
        const filteredList = datahere.filter(item => {
            if (searchValue.trim() === '') {
                return true;
            }
            return item.CollectionName.toLowerCase().includes(searchValue.toLowerCase()); 
        });

        Setcollectionsdata({
            ...Collectionsdata,
            [TabName]: {
                list: filteredList,
                page: 1,
                loader: filteredList.length < 12 ? false : true
            }
        });
    };




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
                    <h2 className="heading text-center pb-3 pb-sm-5"> Explore Collection</h2>

                    <div className="allsearch row pb-3 justify-content-center">
                        <div className="col-sm-12 col-md-7 col-lg-6 col-xl-6 col-xxl-7 pos mt-3">
      
      
                            <input type="search" className="form-control profinput" placeholder="Search by name or trait"  onChange={(e) => {


  setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
  }
                            }
                            />
                            <img src={searchicon} className="img-fluid searchicon" />
                        </div>
                        <div className="col-sm-10 col-md-5 col-lg-3 col-xl-3 col-xxl-3 mt-3">
                            {/* <Dropdown>
                                <DropdownToggle className="pricefilter">{selectfilter.name}</DropdownToggle>
                                <DropdownMenu>
                                    {pricefilter.map((e, i) =>
                                        <DropdownItem onClick={() => setSelectfilter(e)}>{e.name}</DropdownItem>
                                    )}
                                </DropdownMenu>
                            </Dropdown> */}
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
                        {/* <div className="col-lg-4 col-xl-3 allsearch">
                            <div className="d-none d-lg-block">
                            <Filterlist list={accordiontabless} toggleAccordion={toggleAccordion} handlechange={handlechange} />
                            </div>
                        </div> */}
                        <div className="col-lg-12 col-xl-12">
                            <div className="text-end d-block d-lg-none mb-4 filterby"><Button onClick={handleShow}  className="explorefull">Filter By <FaFilter /></Button></div>               
                            {/* <Offcanvas show={show} onHide={handleClose} className="allsearch exploress"  placement="end">
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title className="heading">Filter</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Filterlist list={accordiontabless} toggleAccordion={toggleAccordion} handlechange={handlechange} />                             
                                </Offcanvas.Body>
                            </Offcanvas> */}

                            {/* <div className="listflex">
                                {selfilter.map((e) =>
                                    <div className="listed d-flex align-items-center py-2 px-3">
                                        <p className="whtsclr fw-200 mb-0 me-1">{e.cat} :</p>
                                        <h5 className="whtsclr mb-0 me-2">{e.name}</h5>
                                        <IoMdClose className="closebtn" onClick={() => close(e.name, e.cat)} />
                                    </div>
                                )}
                            </div> */}

                            {activeTab === 'tablelist' &&
                                <>
                                   <div className="mt-3">
                                   { Collectionsdata[TabName]?.list.length  ? 
                                    <Colloctiontablecard 
                                     props={Collectionsdata[TabName]?.list}
                                   /> : <h3 className="text-center">No Collection Found</h3>} </div> 
                                </>
                            }

                            {activeTab === 'allgrid' &&
                                <div className="allgrid row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
                                    { Collectionsdata[TabName]?.list.length  ?  Collectionsdata[TabName]?.list?.map((e, i) =>
                                        // <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mt-5">
                                        <div className="col mt-5">
                                            {console.log("jshkajdak" , e    )}
                                            <Link to={`/nftlist/${e?.CollectionSymbol}` }  state={{ cardtype: "explore" }}><Collectioncard 
    props={{...e ,    "from" : activeTab}}


                                             
                                             /></Link>  
                                        </div>
                                    ) : <h3 className="text-center">No Collection Found</h3> }
                                </div>
                            }

                            {activeTab === 'limitgird' &&
                                <>
                                    <div className="row">
                                    { Collectionsdata[TabName]?.list.length  ?  Collectionsdata[TabName]?.list?.map((e, i) =>
                                            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mt-5">
                                                <Link to={`/nftlist/${e?.CollectionSymbol}` } state={{ cardtype: "explore" }}>
                                                    
                                                    <Collectioncard
                                              props={{...e ,    "from" : activeTab}}
                                                /></Link>
                                            </div>
                                        )  : <h3 className="text-center">No Collection Found</h3>  }
                                    </div>
                                </>
                            }


                            {activeTab === 'imagegrid' &&
                                <>
                                    <div className="row imagegrid">
                                    { Collectionsdata[TabName]?.list.length  ? Collectionsdata[TabName]?.list?.map((e, i) =>
                                            <div className="col-md-6 col-lg-6 col-xl-4 col-xxl-3 mt-5">
                                           
                                                <Link to={`/nftlist/${e?.CollectionSymbol}` } state={{ cardtype: "explore" }}>
                                                    <Collectioncard
                                                    // {from : activeTab}
                                                props={{...e ,    "from" : activeTab}}
                                                /></Link>
                                            </div>
                                        ) : <h3 className="text-center">No Collection Found</h3> }
                                    </div>
                                </>
                            }


{Collectionsdata[TabName]?.loader &&     <div className="text-center mt-5"><Button className="explore"  onClick={()=>LoadMore()}>Load More</Button></div>
                   }    </div>
                    </div>




                    <CollectionList />
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

                </div>
            </div>
            <Footer />
        </div >

    )
}

export default Explore