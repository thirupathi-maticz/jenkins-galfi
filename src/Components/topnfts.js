import { Link, useParams } from "react-router-dom";
import Crewcard from "./crewcard";
import arrow from "../Assets/arrow.png";
import { Token_List_Func } from "../services/nft.api";
import { useEffect, useRef, useState } from "react";
import config from '../config'

export const Topnft = ()=>{


    const [loadingstate, setLoadingstate] = useState(true);
    const [show, setShow] = useState(false);
    const [filter, setFilter] = useState("recentcreated");
    var [filtershow, setFiltershow] = useState("Recently Created");
  
    // const { Categorys } = useSelector((state) => state.LoginReducer);
    const { payload } = "";
    // useSelector((state) => state.LoginReducer.User);
    const { Category } = useParams();
  
    const [TabName, SetTabName] = useState("All");
    var LikeForwardRef = useRef();
    const [LikedTokenList, setLikedTokenList] = useState([]);
    const [Tokens, SetTokens] = useState({
      All: { loader: true, page: 1, list: [] },
    });
    const Tabname = (newValue) => {
      SetTabName(newValue);
    };
  
    useEffect(() => {
      if (Category) {
        if (Category !== TabName) {
          SetTabName(Category);
          Explore(1, Category);
        }
      } else {
        Explore();
      }
    },[]);
    // [Category]
    useEffect(() => {
      // if (typeof Tokens[TabName] == "undefined") {
      if (
        typeof Tokens[TabName] == "undefined" ||
        Tokens[TabName].filter !== filter
      ) {
        Tokens[TabName] = { page: 1, list: [], loader: false };
        SetTokens(Tokens);
        Explore(1, TabName);
      }
    }, []);
    // [TabName, filter]
  
    const Explore = async (data, tab) => {
      setLoadingstate(true);
      var page = data ? data : Tokens[TabName]?.page;
      var SendDATA = {
        TabName: tab ? tab : TabName,
        limit: 6,
        ProfileUrl: payload?.ProfileUrl ? payload.ProfileUrl : "",
        CustomUrl : payload?.ProfileUrl ? payload.ProfileUrl : "",
        page: page ?? 1,
        from: "Explore",
        filter: filter,
      };
      let Resp = await Token_List_Func(SendDATA);
      console.log("Respsdasxzzxxxxzdadsh" , SendDATA)
      if (Resp?.data) {
        SetTokens({
          ...Tokens,
          ...{
            [TabName]: {
              list: [...Tokens[TabName].list, ...Resp.data],
  
              loader:
                Resp.data.length === 0 ||
                (SendDATA.TabName === "usercollection" && Resp.cursor == null)
                  ? false
                  : true,
              page: Tokens[TabName].page,
              filter: filter,
            },
          },
        });
        setLoadingstate(false);
      } else
        SetTokens({
          ...Tokens,
          ...{
            [TabName]: {
              list: Tokens[TabName].list,
              loader: false,
              page: Tokens[TabName].page,
              filter: filter,
            },
          },
        });
      setLoadingstate(false);
      console.log("Respxsdasdadsh" , Resp?.data)
    };
  
    const LoadMore = () => {
      Tokens[TabName].page = Tokens[TabName].page + 1;
      SetTokens(Tokens);
      Explore(Tokens[TabName].page);
    };
    function LikeList(data) {
      setLikedTokenList(data);
    }



    return (

<div className="section_six section_seven stars pos pt-5 pb-5">
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
        {Tokens[TabName]?.list.length &&  Tokens[TabName]?.list?.map((e, i) =>
            <div className="col mt-5">
              {console.log("eee" , e)}
                <Link to={`/crewdetail/${e.CollectionNetwork + '/'+ e.ContractAddress + '/'+ e.NFTOwner + '/'+ e.NFTId}`}  state={{ cardtype: "explore" }}><Crewcard    
                product={{
                                 "image_url": `${ e?.image_url?.includes('http') ? e?.image_url : config.IMG_URL + e?.image_url}`,        
                                            "imageurl" : `${e.CompressedFile ? config.IMG_URL+'/nft/'+e.NFTCreator +'/Compressed/NFT/'+e?.CompressedFile : config.IMG_URL+'/nft/'+e?.NFTCreator +'/Original/NFT/'+e?.NFTOrginalImage}`,
                                            'ipfs' : e.openSeaUrl ? e.NFTOrginalImageIpfs : e.NFTOrginalImageIpfs,
                                             "price" : e?.NFTPrice ,
                                             "coinname" :  e?.CoinName ,
                                              "nftname" : e?.NFTName , 
                                              "putonsaletype": e?.PutOnSaleType ,
                                             "nftprice" : e?.NFTPrice ,
                                              "nftid" : e?.NFTId
                                        }
                                        }/></Link>
            </div>
        )}

    </div>

</div>

</div>

    )
}
