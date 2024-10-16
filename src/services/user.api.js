import { AppenData, apitrigger, axiosFunc } from "../shared/common";
import config from '../config'
import { Decryptdata } from "../shared/screatkeeper";

export const addSubcribe = async (data) => {
    return await apitrigger(`${config.BACK_URL}/user/newsletter` , "POST" , false , data)
}
export const GetUserCookieToken = () => {
   let token = document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        console.log('egfwafwer',parts)
        return parts[0] === "token" ? decodeURIComponent(parts[1]) : r
      }, '');
}

export const InitialConnect = async(data)=>{

  return await apitrigger(`${config.BACK_URL}/user/connect` , "POST" , false , data)
    
}


// export const createprofile = async(data)=>{

//   return await apitrigger(`${config.BACK_URL}/user/create` , "POST" , false , data)
    
// }

export const createprofileapi    =   async   (data)  =>  {
  // console.log("UserRegister is Calling",data)
  var formdata = AppenData(data)
  var senddata    =   {
      method  :   'post',
      url     :   `${config.BACK_URL}/user/create`,
      data    :   formdata[0],
      'headers': {
          'Content-Type': 'multipart/form-data',
         
        }
  }
  
  let Resp    =   await axiosFunc(senddata)
  Resp.data = Decryptdata(Resp.data)
  // console.log('resppp',Resp,senddata,data)
  return Resp.data
}




export const editprofileapi    =   async   (data)  =>  {



  var formdata = AppenData(data)
  var senddata    =   {
      method  :   'post',
      url     :   `${config.BACK_URL}/user/edit`,
      data    :   formdata[0],
      'headers': {
          'Content-Type': 'multipart/form-data',
          'Authorization' : `Bearer ${localStorage.getItem("token")}`
         
        }
  }
  
  let Resp    =   await axiosFunc(senddata)
  if(Resp?.status === false){
    return Resp
  }
  Resp.data = Decryptdata(Resp.data)

  return Resp.data



  


}

export const uploadprofileimage = async(data)=>{
  var formdata = AppenData(data)
  var senddata    =   {
      method  :   'post',
      url     :   `${config.BACK_URL}/user/profileimage`,
      data    :   formdata[0],
      'headers': {
          'Content-Type': 'multipart/form-data',
         
        }
  }
  
  let Resp    =   await axiosFunc(senddata)
  Resp.data = Decryptdata(Resp.data)
  // console.log('resppp',Resp,senddata,data)
  return Resp.data
}
export const fetchuserdataapi = async(CustomUrl)=>{

  return await apitrigger(`${config.BACK_URL}/user/getprofile/${CustomUrl}` , "GET" )

}