import { apitrigger, axiosFunc } from "../shared/common";
import config from '../config'
import { Decryptdata, Encryptdata } from "../shared/screatkeeper";


export const categoryList = async()=>{

    const senddata = {
        method: 'GET',
        url: `${config.BACK_URL}/category/categorylist`,
     
        'headers': {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }
    let Resp = await axiosFunc(senddata)

    return Resp.data


    return await apitrigger(`${config.BACK_URL}/category/categorylist` , "GET" , false )
}
export const GetNftCookieToken = () => {
   let token = document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        console.log('egfwafwer', parts)
        return parts[0] === "token" ? decodeURIComponent(parts[1]) : r
    }, '');
}


export const fetchmyitemlist = async(data) =>{
    console.log("dhsids" , data);
    // return await apitrigger(`${config.BACK_URL}/nft/myitemlist` , "POST" , false , data)

    const senddata = {
        method: 'POST',
        url: `${config.BACK_URL}/nft/myitemlist`,
        data:  data,
        'headers': {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }
    let Resp = await axiosFunc(senddata)

    return Resp.data
}

export const findOwners= async (data)=>{
    let datas = Encryptdata(data)
    const senddata = {
        method : 'GET',
        url    : `${config.BACK_URL}/nft/findOwners`,
        params:{data : datas}
       
    }
    // return await apitrigger(`${config.BACK_URL}/nft/findOwners` , "GET" , false , data)
    let Resp   = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    return Resp.data
}

export const Token_Info_Func = async (data) => {
    // let datas = Encryptdata(data)
    var senddata = {
        method: 'GET',
        url: `${config.BACK_URL}/nft/info`,
        params:  data
        // params: { data: datas }
    }
    let Resp = await axiosFunc(senddata)
    // Resp.data = Decryptdata(Resp.data)
console.log("infoinfo" , Resp)
    return Resp.data
}

export const Activitiesapi = async (data) => {

    console.log("sdagsda" , data)
    const encdata = Encryptdata(data)

    const senddata = {
        method: "GET",
        url: `${config.BACK_URL}/nft/activity`,
        params: { data: encdata }
    }
    let Resp = await axiosFunc(senddata)


    Resp.data = Decryptdata(Resp.data)
    return Resp.data
}


export const NftbalanceUpdate = async (data) => {
    const datas = Encryptdata(data)
    const senddata = {
        method: 'POST',
        url: `${config.BACK_URL}/nft/findupdatebalance`,
        data: { data: datas }
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)

    return Resp.data
}

export const BuyAccept = async (data) => {
    console.log("BuyAccept")

    let datas = Encryptdata(data)
    var senddata = {
        method: 'post',
        url: `${config.BACK_URL}/nft/BuyAccept`,
        data: { data: datas },
        'headers': {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    console.log("buyaxiosdatafdecrpt", Resp.data)

    return Resp.data
}

export const BidApprove = async (FormValue) => {
    let datas = Encryptdata(FormValue)


    const senddata = {
        method: 'post',
        url: `${config.BACK_URL}/nft/BidAction`,
        data: { data: datas },
        'headers': {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)
    return Resp.data
}

export const CreateOrder = async (data) => {
    let datas = Encryptdata(data)
    console.log("createorder")
    var senddata = {
        method: 'post',
        url: `${config.BACK_URL}/nft/CreateOrder`,
        data: { data: datas },
        'headers': {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }

    }
    let Resp = await axiosFunc(senddata)
    Resp.data = Decryptdata(Resp.data)

    return Resp.data
}

export const Token_List_Func = async (data) => {
    console.log("doasihdiuah")
    // let datas = Encryptdata(data)
    var senddata = {
        method: 'GET',
        url: `${config.BACK_URL}/nft/Tokenlistfunexplore`,
        params:  data
    }
    let Resp = await axiosFunc(senddata)
      Resp.data = Decryptdata(Resp.data)
    return Resp.data
}

export const SearchAction = async (data) => {
    var senddata = {
        method: 'GET',
        url: `${config.BACK_URL}/nft/SearchAction`,
        params: data,
   
    }
    let Resp = await axiosFunc(senddata)
    // Resp.data = Decryptdata(Resp?.data)

    return Resp.data
}

export const Stakenft = async (data) => {
    const datas = Encryptdata(data)
    const senddata = {
        method: 'POST',
        url: `${config.BACK_URL}/nft/stakenft`,
        data: { data: datas }
    }
    let Resp = await axiosFunc(senddata)
    // Resp.data = Decryptdata(Resp.data)

    return Resp.data
}