import { useEffect, useRef, useState } from "react";
import arrow from "../Assets/arrow.png";
import Collectioncard from "./collectioncard";
import { Link } from "react-router-dom";

import rightarrow from "../Assets/rightarrow.png";
import { Button } from "react-bootstrap";
import OwlCarousel from 'react-owl-carousel';
import { useSelector } from "react-redux";
import { CollectionByCreator } from "../services/collection.api";



export const CollectionList = () => {
    
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
    const [collectioncard, setCollectioncard] = useState([
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 },
    ]);
    




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

      const {Categorys } = useSelector((state) => state.LoginReducer);
      var [filter,setFilter] = useState("PLTH");

      useEffect(() => {
        // if (typeof Collectionsdata[TabName] == "undefined") {
          Collectionsdata[TabName] = { page: 1, list: [], loader: false };
          Setcollectionsdata(Collectionsdata);
          CollectionByCreate(1, TabName);
        // }
      }, [TabName,filter]);

const CollectionByCreate = async (page,tab) => {
    var SendDATA = {
        from:"collctionpage",
        TabName:  'collection',
        limit:  12,
        page: page ?? 1,
        Categoryname:tab?tab:TabName,
        filter:filter

      }
      console.log("SendDATASendDATA",SendDATA);
    //   let Resp = await Token_MyList_Func(SendDATA);
          let Resp = await CollectionByCreator(SendDATA);

    if(Resp?.data){
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
    }
    const LoadMore = () => {
      Collectionsdata[TabName].page = Collectionsdata[TabName].page + 1;
      Setcollectionsdata(Collectionsdata)
      CollectionByCreate(Collectionsdata[TabName].page,TabName)
    
    
    };

    return (


<div className="section_four stars pt-5 pb-5 pos">
<div className="container">
    <h2 className="heading pt-5 pb-3">Collections <img src={arrow} className="img-fluid" alt="images" /></h2>
    {Collectionsdata[TabName]?.list?.length !== 0 ?
    <OwlCarousel className='owl-theme' nav {...options}>
        { Collectionsdata[TabName]?.list?.map((val, i) =>
            <div class='item'>
                {console.log("sdoahsidugaiusgd" , val)}
                <Link to={`/nftlist/${val?.CollectionSymbol}` } state={{ cardtype: "explore" }}><Collectioncard state={{ cardtype:"explore"}} props={val} /></Link>

            </div>
        )}
    </OwlCarousel> : <h4 className="whtsclr">no data found </h4>}
    {/* <div className="text-center mt-4 mb-5"><Button className="explore">Load More</Button></div> */}
</div>
<span></span>
<span></span>
<span></span>
<span></span>
</div>

    )
}
