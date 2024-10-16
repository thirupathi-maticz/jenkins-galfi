import React, { useEffect, useState } from "react";
import { Container, Button, Accordion } from 'react-bootstrap';
import Header from "../Layouts/header";
import astroanunt from "../Assets/astronaunt.png";
import logo from "../Assets/logo.png";
import bannerblack from "../Assets/bannerblack.png";
import arrow from "../Assets/arrow.png";
import anime from "../Assets/anime.gif";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Collectioncard from "../Components/collectioncard";
import rightarrow from "../Assets/rightarrow.png";
import Crewcard from "../Components/crewcard";
import Planet from "../Assets/planet.png";
import spacestation from "../Assets/spacestation.png";
import Footer from "../Layouts/footer";
import { Link } from "react-router-dom";
import Carousels from "../Components/carousels";
import roadmaps from "../Assets/roadmap.png";
import constall from "../Assets/constallation1.gif";
import dot from "../Assets/dot.png";
import worlds from "../Assets/worlds.png";
import Lottie from "lottie-react";
import animee from "../Assets/Animation - 1706878291360.json";
import toast from "react-hot-toast";
import {  fetchcms } from "../services/cms.api";
import * as Yup from 'yup'
import { addSubcribe } from "../services/user.api";
import glogo from "../Assets/glogo.png";
import { CollectionList } from "../Components/collection";
import { Topnft } from "../Components/topnfts";

function Home() {
const [process , Setprocess]= useState(false)
const [cmshome,setcmshome]=useState("")
const [planet , SetPlanet] = useState("")
const [ faqList , setFaqList ] = useState([        
])
const [planetcms,setplanetcms]=useState([])
const [RoadmapList,setRoadmapList]=useState("")
const [errorvalue, seterror] = useState({});

    useEffect(() => {
        getcmsdata()

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);
const [email , setEmail]=useState("")
console.log("errorvalue",errorvalue)
    const getcmsdata = async () => {
        try{
            const cmsdata = await fetchcms();
console.log("sdhasgdags" , cmsdata.data)
            setFaqList(cmsdata?.data?.faqdata)
            setcmshome(cmsdata?.data?.cmsdata[2])
            setplanetcms(cmsdata?.data?.cmsdata[3])
            setRoadmapList(cmsdata?.data?.roadmapdata)
            SetPlanet(cmsdata?.data?.planetdata)
        }catch(err){
        console.error(err)
        }
    
    }

    const submitsubcribe = async (e) => {
        e.preventDefault();
        Setprocess(true)
        try{
            
            const submitsubcribeschema = Yup.object({
                email: Yup.string().email('Invalid email format').required('Email is required'),
              });
              
              await  submitsubcribeschema.validate({email : email}, { abortEarly: false })

const subs = await addSubcribe({email : email})
if(subs.status){
    setEmail("")
    toast.success("subscribed successfully")
}else{
    toast.error(subs.message)
}
console.log(subs)

        }catch(error){
            
            toast.error("validation error");
          console.error(error)
            const newErrors = {};
            error?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
              });
              seterror(newErrors);
        
        }finally{
            Setprocess(false)
        }
    
    }




    

    const [collectioncard, setCollectioncard] = useState([
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 },
    ]);

    const [crewcard, setCrewcard] = useState([
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }
    ]);

    const carouselItems = [
        { content: 'Item 1' },
        { content: 'Item 2' },
        { content: 'Item 3' }
        // Add more items as needed
    ];

    const [accordionOpen, setAccordionOpen] = useState();
    const toggleAccordion = (i) => {
        setAccordionOpen(i === accordionOpen ? null : i);
    };
    const [accordiontable, setAccordiontable] = useState([
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 },
    ]);
  

    const options = {
        items: 5,
        responsiveClass: true,
        loop: false,
        margin: 30,
        autoplay: false,
        dots: false,
        nav: true,
        navText: [`<img src=${rightarrow} class='leftside' />`, `<img src=${rightarrow} class='leftcaroimg' />`],
        // rewind: true,
        // slideBy: 4,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            991: {
                items: 3,
            },
            1199: {
                items: 3,
            },
            1200: {
                items: 3,
            },
            1400: {
                items: 4,
            },
            1800: {
                items: 5,
            }
        },
    };

 

    return (

        <div className="homeallsections">

            <Header />

            <div className="section_one banner pos">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-xxl--7 text-center">
                            <img src={astroanunt} className="img-fluid astroimg" alt="images" />
                            <Lottie animationData={animee} loop={true} className="animee" />
                            <img src={logo} className="img-fluid logo" alt="images" />
                            <img src={bannerblack} className="img-fluid bannerblack" alt="images" />
                            <a href="explore"><Button className="explore explorebtn">Explore</Button></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section_sec pt-5 pb-5 pos" id="second">
                <div className="container pos">
                    <img src={anime} className="img-fluid anime" />
                    <div className="row">
                        <div className="col-md-11 col-lg-10 col-xl-5">
                            <div className="py-5 px-1 px-sm-4 px-md-5 px-xl-4 px-xxl-5">
                                {console.log("sidgausgdyug",cmshome)}
                                <h2 className="heading pt-2 pt-sm-5 pt-xl-3 pt-xxl-5">{cmshome?.heading}  <img src={arrow} className="img-fluid" alt="images" /></h2>
                                <p className="subpara mt-4">
                               
                                <div dangerouslySetInnerHTML={ { __html: cmshome?.description }} />      
                                   
                              </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="section_three stars pt-5 pb-5 pos">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-xl-9 col-xxl-6 mx-auto text-center">
                            <h2 className="heading pt-2 pb-2">{planetcms?.heading}
                            </h2>
                            <p className="subpara">

                            <div dangerouslySetInnerHTML={ { __html: planetcms?.description }} /> 

                            </p>
                        </div>
                    </div>
                    <div className="pb-4"><Carousels data={planet}/></div>

                </div>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
{/* 
            <div className="section_four stars pt-5 pb-5 pos">
                <div className="container">
                    <h2 className="heading pt-5 pb-3">Collections <img src={arrow} className="img-fluid" alt="images" /></h2>

                    <OwlCarousel className='owl-theme' nav {...options}>
                        {collectioncard.map((e, i) =>
                            <div class='item'>
                                <Link to="/crewdetail" state={{ cardtype: "explore" }}><Collectioncard state={{ cardtype:"explore"}}/></Link>
a
                            </div>
                        )}
                    </OwlCarousel>
                    <div className="text-center mt-4 mb-5"><Button className="explore">Load More</Button></div>
                </div>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div> */}
            <CollectionList />

            <div className="section_five section_seven stars pt-5 pt-sm-0 pb-5 pos">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <h1 className="heading pt-3 text-center roadcenter">Roadmap</h1>
                <img src={constall} className="img-fluid constall" />
                <img src={worlds} className="img-fluid worlds" />
                <img src={glogo} className="img-fluid glogo" />
                <div className="f1 allf d-flex">
                    <img src={dot} className="img-fluid dot" />
                    <h1 className="fno mb-0 mx-2">1</h1>
                    <p className="subpara mb-0">
                    <div dangerouslySetInnerHTML={ { __html: RoadmapList[0]?.answer }} /> 
                        </p>
                </div>
                <div className="f2 allf d-flex">
                    <img src={dot} className="img-fluid dot" />
                    <h1 className="fno mb-0 mx-2">2</h1>
                    <p className="subpara mb-0">  <div dangerouslySetInnerHTML={ { __html: RoadmapList[1]?.answer }} /> </p>
                </div>
                <div className="f3 allf d-flex">
                    <img src={dot} className="img-fluid dot" />
                    <h1 className="fno mb-0 mx-2">3</h1>
                    <p className="subpara mb-0">  <div dangerouslySetInnerHTML={ { __html: RoadmapList[2]?.answer }} /> </p>
                </div>
                <div className="f4 allf d-flex">
                    <img src={dot} className="img-fluid dot" />
                    <h1 className="fno mb-0 mx-2">4</h1>
                    <p className="subpara mb-0">  <div dangerouslySetInnerHTML={ { __html: RoadmapList[3]?.answer }} /> </p>
                </div>
                <div className="para_list my-5 my-lg-0">
                    <h4 className="heading">{RoadmapList[4]?.question}</h4>
                    <p className="subpara bl mt-2"><div dangerouslySetInnerHTML={ { __html: RoadmapList[4]?.answer }} /></p>
                </div>
                <div className="container pb-4">
                    <div className="instr py-3 px-4 mt-3">
                        <p className="subpara mb-0">
                          
                        <div dangerouslySetInnerHTML={ { __html: RoadmapList[4]?.answer }} />
                  </p>
                    </div>
                </div>
            </div>

            {/* <div className="section_six section_seven stars pos pt-5 pb-5">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <div className="container">
                    <div className="d-block d-sm-flex align-items-center justify-content-between">
                        <h2 className="heading pt-1 pt-sm-5 pb-3">The Crew <img src={arrow} className="img-fluid" alt="images" /></h2>
                        <Link to="/explore" className="exa"><h5 className="heading pt-1 pt-sm-5 pb-1 pb-sm-3 text-end">Explore More</h5></Link>
                    </div>
                    <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3 row-cols-xxl-4 row-cols-xxxl-5">
                        {crewcard.map((e, i) =>
                            <div className="col mt-5">
                                <Link to="/crewdetail" state={{ cardtype: "explore" }}><Crewcard /></Link>
                            </div>
                        )}

                    </div>

                </div>

            </div> */}
<Topnft />
            <div className="section_seven sevensec stars pos pt-5 pb-5">
                <span></span>
                <span></span>
                <span></span>
                <div className="container">
                    <div>
                        <h2 className="heading pt-5 pb-3">Frequently asked Qusetions <img src={arrow} className="img-fluid" alt="images" /></h2>
                    </div>
                    <Accordion defaultActiveKey={1}>
                        {faqList.map((e, i) =>
                            <Accordion.Item eventKey={i + 1}>
                                <Accordion.Header onClick={() => toggleAccordion(i + 1)} className='me-0'>
                                    {accordionOpen === i + 1 ? <p className="whtsclr plus mb-0 me-3">-</p> : <p className="whtsclr plus mb-0  me-3">+</p>}     <h5 className="whtsclr mb-0">{e.question}</h5>
                                </Accordion.Header>
                                <Accordion.Body className='pt-0 pb-2'>
                                    <p className="subpara">
                                    <div dangerouslySetInnerHTML={ { __html: e.answer}} /> 
                                        </p>
                                </Accordion.Body>
                            </Accordion.Item>
                        )}
                    </Accordion>
                </div>
            </div>

            <div className="section_eight section_seven stars pos pt-5 pb-5">
                <span></span>
                <span></span>
                <div className="container pt-5 pb-4">

                    <div className="newsletter pos px-3 px-lg-0">
                        <img src={spacestation} className="img-fluid spacestation" alt="images" />
                        <div className="row align-items-center">
                            <div className="col-md-6 col-lg-6">
                                <img src={Planet} className="img-fluid" alt="images" />
                            </div>
                            <div className="col-md-6 col-lg-5 py-4 py-lg-0">
                                <h2 className="heading pb-4">Sign up for our newsletter
                                    to stay up to date</h2>
                                <input type="mail" className="form-control inputbox mb-3" value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                    seterror({})
                                    }} placeholder="Enter your Email" />
                                <Button className="explore mt-4" onClick={submitsubcribe}>Subscribe</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default Home;