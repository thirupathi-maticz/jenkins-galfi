import axios from "axios";
import Config from "../config"
import { Encryptdata, Decryptdata } from "./screatkeeper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import React, {
  useState,

} from "react";
// import { MediaRenderer } from "@thirdweb-dev/react";
import   PlaceholderImage from '../Assets/imageload.gif'
import config from '../config'
import { connectWallet } from "../util/hooks/useWallet";
import { Currency, TOKENPRICE, USDPRICE } from "../services/cms.api";

export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0) ||
  (typeof value === "string" && value === "0") ||
  (typeof value === "number" && value === 0);


export const address_showing = (item) => {
  if (item && item.toString().length > 10) {
    var slice_front = item.slice(0, 9);
    var slice_end = item.slice(item.length - 9, item.length - 1);
    return slice_front + "...." + slice_end;
  } else return item;
};
export const Name_showing = (item) => {
  if (item && item.toString().length > 15) {
    var slice_front = item.slice(0, 14);
    return slice_front + "....";
  } else return item;
};

export const copydata = (data) => {
  var copyText = data;
  console.log("COPYDATA", data);
  navigator?.clipboard?.writeText(copyText);
  //toast.success("Copied Successfully")
  return copyText;
};

export const NumANdDotOnly = (dta) => {
  const  data = dta.toString();
  const str = data
    ? data.includes(".")
      ? data.split(".").length >= 3
        ? (data.split(".")[0] + "." + data.split(".")[1]).toString()
        : data
      : data
    : data;
  return str.toString().replace(Config.NumDigitOnly, "");
};

export const NumberOnly = (data) => {
  return data.toString().replace(Config.NumberOnly, "");
};



function getFileExtension(filename) {
  return filename?.split('.').pop();
}

export const AppenData = (data) => {
  
  var formdata = new FormData()
  var SendDta = Object.entries(data).map((item) => {
      if (Array.isArray(item[1])) {
          var come = item[1].map((data) => {
              if (data?.type && data?.size) {
                  //file
                  formdata.append(item[0], data)
              }
              else {
                  formdata.append(item[0], Encryptdata(data))

              }
              return formdata
          })
          return come

      }
      else {
      
          if (  getFileExtension(item[1]?.name) == 'glb' || (item[1]?.type && item[1]?.size)) {
              //file type
              formdata.append(item[0], item[1])
          }
          else {
              formdata.append(item[0], Encryptdata(item[1]))

          }
          return formdata
      }
  })
  return SendDta
}


// Common Axios Function
export const axiosFunc = async (data) => {
  try {
    let Resp = await axios(data);
   
    return Resp;
  } catch (e) {
    console.error("error", e);
    return { status: false , message : "try again " };
  }
};

export function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
}
export const ImgValidation = (data,img) =>{
  let { type , size } = data
  // console.log('aaaa',data)
  if(img === 'thumb')
      {
          if(!type?.includes('image')) return 'File Must be Image'
          if(size >= 1024 * 1024 * 5) return 'File Must be Less than 5 Mb'
      }   
  else{
      if(img === 'pro') if(size >= 1024 * 1024 * 48) return 'File Must be Less than 50 Mb'
      else if(size >= 1024 * 1024 * 48) return 'File Must be Less than 50 Mb'

  }
}
export default function ImgAudVideo({
  file,
  type,
  classname,
  thumb,
  origFile,
  from,
  noimg,
  page,
  glb,
  ipfs
}) {
  // console.log("fileeeeeee",file,type)
  var [Check,setCheck] = useState(false)
  const Audioaction =()=>{
    var aud = document.getElementById("nftaudio");
    if(Check==false){
      aud.play();
      setCheck(!Check)
    }
    else{
      aud.pause();
      setCheck(!Check)
    }
  }
console.log("imazzgasss" , file , "type" , type , 'ipfs' , ipfs)
  return file ? (
    type === "image" ? (
      <LazyLoadImage
      
        src={file ? file :  ipfs }
        alt="img"
        className="img-fluid"
        onContextMenu="return false;"
        onError={e => {
          e.target.onerror = null; // Prevent infinite loop if fallback image also fails
                    e.target.src = config.NOIMAGE; 
        }}
      />
    ) : type === "video" ? (
      <video
        loop={true}
        controlsList="nodownload"
        className="w-100"
        autoPlay={true}
        controls = {page ? false  : true }
        muted =  
        {page ? true  : true }
        poster={thumb}
        onContextMenu="return false;"
        type="video/*"
        src={file ? file :  ipfs  }
        onError={event => {
          event.target.src = origFile
        }}
      >
      </video>
    ) : type === "audio" ? (
      <>
        {" "}
        <img src={thumb} alt="favicon" onClick={Audioaction} className={classname} />
        <audio
          controlsList="nodownload"
          id="nftaudio" className="auid_pos_cen w-100"
          controls 
          src={file}
        >
        </audio>
      </>
    ) :  (

      <img
      // PlaceholderSrc={PlaceholderImage}
        src={file ? file : ipfs  }
        alt="img"
        className="img-fluid"
        onContextMenu="return false;"
        onError={e => {
          e.target.onerror = null; // Prevent infinite loop if fallback image also fails
                    e.target.src = config.NOIMAGE; }}
     
      />
    //   < MediaRenderer style={from == "model" && {objectFit:"cover", objectPosition:"center"}}  autoPlay={true} preload={`${config.IMG_URL}/nft/${glb?.NFTCreator}/Compressed/NFT_THUMB/${glb?.CompressedThumbFile}`} src={from == "model" ? `${config.IMG_URL}/nft/${glb?.NFTCreator}/Compressed/NFT_THUMB/${glb?.CompressedThumbFile}` : config.IPFS + glb?.NFTOrginalImageIpfs}  poster={config.IPFS + glb?.NFTOrginalImageIpfs}   controls={true}   height={from == "model" ?  "100%" : "100%"}  width={from == "model" ? "100%" :"100%"} alt={"loading"}/>

    )
  ) : (
   <img src={noimg} alt="noimg" className={classname} />

  ) 
 


  
}
export  const DateTimeForm = (date,datealone,timealone,ampm) => {

  try{
    if(datealone){
      return `${MinuteHourFormat(new Date(date)?.getDate())}/${MinuteHourFormat(new Date(date)?.getMonth()+1)}/${MinuteHourFormat(new Date(date)?.getFullYear())}`
    }
    else if(timealone){
      if(ampm){
        return `${MinuteHourFormat(new Date(date)?.getHours() > 12 ? new Date(date)?.getHours() - 12 : new Date(date)?.getHours()) }:${MinuteHourFormat(new Date(date)?.getMinutes())} ${new Date(date)?.getHours() >= 12 ? 'p.m' : 'a.m' }`
      }
      else{
        return `${MinuteHourFormat(new Date(date)?.getHours())}:${MinuteHourFormat(new Date(date)?.getMinutes())} `
      }
    }
    else if(ampm){
      return `${MinuteHourFormat(new Date(date)?.getDate())}/${MinuteHourFormat(new Date(date)?.getMonth()+1)}/${MinuteHourFormat(new Date(date)?.getFullYear())}, ${new Date(date)?.getHours()}:${new Date(date)?.getMinutes() } ${new Date(date)?.getHours() >= 12 ? 'p.m' : 'a.m'} `
    }
    return `${new Date(date)?.getDate()}:${new Date(date)?.getMonth()+1}:${new Date(date)?.getFullYear()},${new Date(date)?.getHours()}:${new Date(date)?.getMinutes()} `
  }
  catch(err){
    return "No Date"
  }
}
export const MinuteHourFormat = (data) => {
  return ((Number(isEmpty(data) ? 0 : data ) < 10 ? '0' : '')+data)
}



export const apitrigger = async (url, method, isauthenticate, data) => {
    console.log(data, "apitrigger")
    const payload = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
    };
    if (isauthenticate) {
        payload.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    }
    if (method !== "GET" && data) {
        payload.body = JSON.stringify({ data: Encryptdata(data) })
    }
    let response = await fetch(url, payload);
 
    response = await response.json();
    response = Decryptdata(response)
    console.log("sdjghasdgasg" ,response )
    return response;
}

// export const getImgFromURL = async (req) => {
//   console.log("img url come 1")
//   var additionalFile = "public/nftImg/" + req.ownerAddress;
//   var metaimg = req.imgurl;
//   var buffer=req.buffer;
//   var url = metaimg;
//   try{
//  console.log("buffer",buffer)

//    fs.mkdir(additionalFile, { recursive: true }, function (err) {
//     sharp(buffer, { animated: true })
//       .webp({ quality: 80 })
//       .toFile(additionalFile + '/' + req.imgurlType)
//       .then(async (data) => {
//         console.log("img url come 2")
//         return true;
//       })
//       .catch(error => {
//         let errorstr = error.toString();
//         if (errorstr == "Error: Input buffer contains unsupported image format") {
//           ffmpeg(url)
//             .setStartTime('00:00:01')
//             .setDuration(5)
//             .output(additionalFile + "/" + req.imgurlType)
//             .on('end', function (err) {
//               return true;
//             })
//             .on('error', function (err) {
//               return false;
//             }).run();
//          }
//       });
//   });
// }
// catch(e){
//     return false
// }
// }
export const getcurrency=async (chainid)=>{
  // const {Network} = useSelector((state)=>state.LoginReducer)
  console.log("NETWORKssddsds",chainid);
  let Resp = await Currency();
    
        if (Resp?.status) {
          var sen = [];
          //--> msg to data 
          var bnb=Resp?.data.filter((item)=> item.ChainId == Config?.BNBCHAIN)
          var eth=Resp?.data.filter((item)=> item.ChainId == Config?.ETHCHAIN)
          console.log('aaaaaaasssssssssssssssssssssssssaa',sen,bnb,eth)
          var bnbdatas = await Promise.all(
            bnb[0]?.CurrencyDetails ||
              []?.map(async (data) => {
                if (data.label === "BNB" || data.label === "ETH")
                  var USD = await USDPRICE(data.label);
                else var USD = await TOKENPRICE(data.address);
                sen.push({
                  value: data.value,
                  label: data.label,
                  address: data.address,
                  usd: USD ? USD : 0,
                  decimal: data.decimal,
                });
              })
          );
          var ethdatas = await Promise.all(
            eth[0]?.CurrencyDetails ||
              []?.map(async (data) => {
                if (data.label === "BNB" || data.label === "ETH")
                  var USD = await USDPRICE(data.label);
                else var USD = await TOKENPRICE(data.address);
                sen.push({
                  value: data.value,
                  label: data.label,
                  address: data.address,
                  usd: USD ? USD : 0,
                  decimal: data.decimal,
                });
              })
          );
          console.log('aaaaaaasssssssssssssssssssssssss',sen,bnbdatas,ethdatas,chainid)
          return({
            type: "Register_Section",
            Register_Section: {
              currency : chainid === Config.BNBCHAIN ?  bnbdatas : ethdatas 
            },
          });
        }
}

export const switchnetwork=async(chainid,switched)=>{
  // const dispatch=useDispatch()
  var obj= await connectWallet(localStorage.getItem("walletConnectType"),chainid,"switched")
  console.log("localStorage.getItem",localStorage.getItem("walletConnectType"),chainid,"switched");
  // }else{
    // var obj= await connectWallet(localStorage.getItem("walletConnectType"),e)
  // }
  console.log("OOOOBBJJ",obj)
  const chainId = await obj.web3.eth.getChainId();
  
  if(chainId === chainid){
   var currency=await  getcurrency(chainid)
    return({
      status : true,
      data : {
      type: "Account_Section",
      Account_Section: {AccountDetails:obj}
      
      },
      currency : currency
  })
  }
  else{
    return ({status :false,msg  : " Please switch network"})
  }
}