import React, { useEffect, useState } from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
// import gal1 from "../Assets/gal1.gif";
// import gal2 from "../Assets/gal2.gif";
// import gal3 from "../Assets/gal3.gif";
import speedmeter from "../Assets/speedmeter.png";
import Lottie from "lottie-react";
import lotieee1 from "../Assets/pink.json";
import lotieee2 from "../Assets/blue_galaxy.json";
import lotieee3 from "../Assets/galaxy.json";
import { fetchcms } from "../services/cms.api";

function Carousel3D( props ) {
  const [data , SetPlanet] = useState("")
  const getcmsdata = async () => {
    try{
        const cmsdata = await fetchcms();
console.log("sdhasgdags" , cmsdata.data)
    
        SetPlanet(cmsdata?.data?.planetdata)
    }catch(err){
    console.error(err)
    }

}



  // console.log("props" , props)
// const [data , setdata ] = useState(props?.data) 

  const [goToSlide, setGoToSlide] = useState(0);
  const [planetdata , setplanetdata] = useState(data[0])
  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showNavigation, setShowNavigation] = useState(true);
  const [animationConfig, setAnimationConfig] = useState(config.gentle);
{/* <img src={gal3} alt="3" /> */}
{/* <Lottie animationData={lotieee} loop={true} /> */}
  const slides = [
    { key: 1, content: <Lottie animationData={lotieee1} loop={true} className="keyimage"/> },
    { key: 2, content: <Lottie animationData={lotieee2} loop={true} className="keyimage"/> },
    { key: 3, content: <Lottie animationData={lotieee3} loop={true} className="keyimage"/> },
  ].map((slide, index) => ({
    ...slide,
    onClick: () => setGoToSlide(index)
  }));


useEffect(() => {
 
  setplanetdata(data[goToSlide])

},[goToSlide , data])


useEffect(()=>{
  getcmsdata()
},[])
// useEffect(() => {
//   setdata(props?.data)
// },[ props?.data])

  return (

    <>

      <div className="allcarousel">
        <Carousel
          slides={slides}
          goToSlide={goToSlide}
          offsetRadius={offsetRadius}
          // showNavigation={showNavigation}
          animationConfig={animationConfig}
        />
      </div>

      <div className="row px-4 justify-content-center">
        <div className="col-md-5 col-lg-4 col-xl-3 col-xxl-2 d-flex justify-content-center justify-content-md-start mt-4">
          <div className="pos me-4">
            <img src={speedmeter} className="img-fluid speedimg" />
            <div className={`roundwht pos${goToSlide}`}></div>
          </div>
          <div className="mt-3">
            <div className="mb-4">
              <h1 className={`${goToSlide==0 ? "roseclr number mb-1": goToSlide==1 ? "greenclr  number mb-1": "yellowclr  number mb-1" }`} >{planetdata?.carbs }</h1>
              <p className={`${goToSlide==0 ? "roseclr numbertitle mb-0": goToSlide==1 ? "greenclr numbertitle mb-0": "yellowclr numbertitle mb-0" }`}>Maecenas at ex</p>
            </div>
            <div className="mb-4">
              <h1 className={`${goToSlide==0 ? "roseclr number mb-1": goToSlide==1 ? "greenclr  number mb-1": "yellowclr  number mb-1" }`}>{planetdata?.protein}</h1>
              <p className={`${goToSlide==0 ? "roseclr numbertitle mb-0": goToSlide==1 ? "greenclr numbertitle mb-0": "yellowclr numbertitle mb-0" }`}>Proin nec lacus</p>
            </div>
            <div className="mb-3">
              <h1 className={`${goToSlide==0 ? "roseclr number mb-1": goToSlide==1 ? "greenclr  number mb-1": "yellowclr  number mb-1" }`}>{planetdata?.fats}</h1>
              <p className={`${goToSlide==0 ? "roseclr numbertitle mb-0": goToSlide==1 ? "greenclr numbertitle mb-0": "yellowclr numbertitle mb-0" }`}>Proin nec lacus</p>
            </div>
          </div>
        </div>
        <div className="col-md-7 col-lg-4 col-xl-6 col-xxl-7 text-center mt-4">
          <h1 className="heading ms-1 ms-xxl-5 galtxt">Galaxy : {goToSlide==0 ?`${planetdata?.galaxy }`: goToSlide==1 ? `${planetdata?.galaxy }` : `${planetdata?.galaxy }`  }</h1>
        </div>
        <div className="col-md-8 col-lg-4 col-xl-3 col-xxl-3 mt-4">
          <h5 className="heading">{goToSlide === 0 ? `${planetdata?.sideheading }` : goToSlide==1 ?  `${planetdata?.sideheading }` :  `${planetdata?.sideheading }`}</h5>
          <p className="subpara">
            
          <div dangerouslySetInnerHTML={ { __html: planetdata?.sidedescription }} /></p>
        </div>
      </div>

    </>

  );
};

export default Carousel3D;
