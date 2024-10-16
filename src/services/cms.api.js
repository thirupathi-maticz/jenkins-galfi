import { apitrigger, axiosFunc } from "../shared/common";
import config from '../config'

export const fetchcms =async () => {
return await apitrigger(`${config.BACK_URL}/cms/cmslist` , "GET")
}


export const Currency    =   async   (data)  =>  {
 
       return await apitrigger(`${config.BACK_URL}/cms/currencylist` , "GET")
    
}
export const USDPRICE = async (data) =>{
    var senddata ={
        'method': 'get',
        'url': `https://min-api.cryptocompare.com/data/price?fsym=${data}&tsyms=USD`,  
    }
    let Resp = await axiosFunc(senddata);
    
    return Resp.data?.USD;
}


export const TOKENPRICE = async (data) =>{
    var senddata ={
        'method': 'get',
        'url': `https://api.pancakeswap.info/api/v2/tokens/${data}`,  
    }
    let Resp = await axiosFunc(senddata);
    
    return Resp?.data?.data?.price;
}