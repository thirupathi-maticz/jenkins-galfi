import React, { useEffect, useState } from "react";
import { Container, Button, Accordion } from 'react-bootstrap';
import Footer from "../Layouts/footer";
import Header from "../Layouts/header";
import person from "../Assets/person.png";
import { useDispatch, useSelector } from "react-redux";
import * as yup from 'yup';
import toast from 'react-hot-toast'
import { editprofileapi } from "../services/user.api";
import  config from'../config' 
import borderss from "../Assets/roseborder.png";
import borderss1 from "../Assets/roseborder1.png";
import borderss2 from "../Assets/roseborder2.png";
import borderss3 from "../Assets/roseborder3.png";
import { useLocation, useNavigate } from "react-router";

function Profiledit() {
    const navigate = useNavigate();
    const location = useLocation();
    const defaultprofileimage = person;
    const { token, isAdmin } = useSelector(state => state.LoginReducer.User)
    const[CreateObjectURL,setCreateObjectURL]= useState(null);
    const [process , Setprocess]= useState(false);
    const [errorvalue, seterror] = useState({});
    const dispatch = useDispatch();
    const payload = location?.state
    useEffect(() => {
        setformData(initdata)
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);
    console.log("payxload",payload)

    const initdata ={
        DisplayName :  payload?.DisplayName ,
    WalletAddress : payload?.WalletAddress,
    WalletType : payload?.WalletType,
    CustomUrl : payload?.CustomUrl,
    Profile : payload?.Profile,
    EmailId : payload?.EmailId,
    Bio : payload?.Bio, 
    Facebook : payload?.Facebook,  
    Twitter : payload?.Twitter,
    Instagram : payload?.Instagram,
    Youtube : payload?.Youtube,
    }
    const [formData , setformData] = useState(initdata)
    function handleChange(e){
        const {id , value} = e.target
        setformData({...formData , [id] : value})
    }
    
    const addimage = (event) => {
        const { id, files } = event.target;
        let formata = { ...formData, ...{ ["Profile"] : files[0] } }
        setCreateObjectURL(URL?.createObjectURL(event?.target?.files[0]));
        setformData(formata)
        
    }

    const Editprofile = async()=>{
        const id = toast.loading("updating profile...")

        Setprocess(true)
        try {
            const schema = yup.object({
                DisplayName: yup.string().required('Name is required'),
                WalletAddress: yup.string().required('Wallet Address is required'),
                CustomUrl: yup.string().required('customurl required'),
                EmailId: yup.string().email('Invalid email format').required('Email is required'),
                Bio: yup.string().nullable(),
                Facebook: yup.string().url('Invalid URL format').nullable(),
                Twitter: yup.string().url('Invalid URL format').nullable(),
                Instagram: yup.string().url('Invalid URL format').nullable(),
                Youtube: yup.string().url('Invalid URL format').nullable(),
              });
              await  schema.validate(formData, { abortEarly: false })
    
    
    const resp = await editprofileapi(formData)

    if(resp.status){
    
    
        toast.dismiss(id)
        toast.success(resp?.message)
        console.log("ssxaasdasd",resp)
        dispatch({
            type: 'Register_Section',
            Register_Section: {
                User: {
                    payload: resp?.data,
                    token: resp.token ? resp.token : token
                }
            }
        })

    }
    navigate('/profiletabs/'+payload?.CustomUrl)
        } catch (error) {
            toast.dismiss(id)
            toast.error("validation error");
            console.error(error)
              const newErrors = {};
              error?.inner?.forEach((err) => {
                  newErrors[err.path] = err.message;
                });
                seterror(newErrors);
        }finally{
            toast.dismiss(id)
            Setprocess(false)
        }
    }
    return (

        <div className="section_seven">

            <Header />

            <div className="innerpage stars pos">
            <span></span>
             <span></span> 
            <span></span>
                <span></span>
                <div className="container pt-3 pt-sm-5">
                <div className="row">

                 <div className="col-md-4 col-xxl-3 mt-4 pos">
                       {/* <img src={borderss} className="img-fluid roseborder i1"/>
                    <img src={borderss1} className="img-fluid roseborder i2"/> */}
                    {/* <img src={borderss2} className="img-fluid roseborder i3"/>
                    <img src={borderss3} className="img-fluid roseborder i4"/> */}
                 <img src={CreateObjectURL ? CreateObjectURL :  formData.Profile ? `${ config.IMG_URL+'/user/'+ formData.WalletAddress +'/profile/'+formData.Profile}` : defaultprofileimage } className="img-fluid"/>
                    
                    <div className="pos">
                    <input type="file" onChange={addimage}className="form-control profinput opacity"/>
                    <Button className="explore uploadimg">Upload Image</Button>
                    </div>

                 </div>
                 <div className="col-md-8 col-xxl-9 mt-4">
                    <h4 className="whtsclr fw-600">Edit Profile</h4>
                    <p className="whtsclr f-18 mt-4 fw-600">Contact Details</p>

                  <div className="mb-4">
                  <p className="whtsclr mb-2">Full Name <tag className="redclr">*</tag></p>
                  <input type="text" className="form-control profinput" id="DisplayName"  value={formData?.DisplayName}  onChange={handleChange} placeholder="Names"/>
                  {errorvalue?.DisplayName && <tag className="text-danger">{errorvalue.DisplayName}</tag>} 
                  </div>

                  <div className="mb-4">
                  <p className="whtsclr mb-2">Custom Url <tag className="redclr">*</tag></p>
                  <input type="text" className="form-control profinput" id="CustomUrl" value={formData?.CustomUrl}  onChange={handleChange} placeholder="custom url"/>
                  {errorvalue?.CustomUrl && <tag className="text-danger">{errorvalue.CustomUrl}</tag>} 
                  </div>
                  <p className="whtsclr f-18 mt-4 fw-600">Contact Details</p>

                  <div className="mb-4">
                  <p className="whtsclr mb-2">Email Address <tag className="redclr">*</tag></p>
                  <input type="mail" className="form-control profinput" id="EmailId" value={formData?.EmailId} onChange={handleChange}  placeholder="Sample@gmail.com"/>
                  {errorvalue?.EmailId && <tag className="text-danger">{errorvalue.EmailId}</tag>} 
               
                  </div>

                  <div className="mb-4">
                  <p className="whtsclr mb-2">Bio </p>
                  <input type="text" className="form-control profinput" id="Bio" value={formData?.Bio} onChange={handleChange}  placeholder="Write something about yourself"/>
                  </div>

                  <div className="mb-4">
                  <p className="whtsclr mb-2">Youtube link </p>
                  <input type="text" className="form-control profinput"  id="Youtube" value={formData?.Youtube}  onChange={handleChange} placeholder="Youtube address"/>
                  {errorvalue?.Youtube && <tag className="text-danger">{errorvalue.Youtube}</tag>} 
                
                  </div>

                  <div className="mb-4">
                  <p className="whtsclr mb-2">Twitter link </p>
                  <input type="text" className="form-control profinput" id="Twitter"  value={formData?.Twitter}   onChange={handleChange} placeholder="twitter address"/>
                  {errorvalue?.Twitter && <tag className="text-danger">{errorvalue.Twitter}</tag>} 
              
                  </div>
                  <div className="mb-4">
                  <p className="whtsclr mb-2">facebook link </p>
                  <input type="text" className="form-control profinput" id="Facebook" value={formData?.Facebook} onChange={handleChange}  placeholder="facebook address"/>
                  {errorvalue?.Facebook && <tag className="text-danger">{errorvalue.Facebook}</tag>} 
              
                  </div>

                  <div className="mb-4">
                  <p className="whtsclr mb-2">Instagram link </p>
                  <input type="text" className="form-control profinput" id="Instagram" value={formData?.Instagram} onChange={handleChange} placeholder="instagram address"/>
                  {errorvalue?.Instagram && <tag className="text-danger">{errorvalue.Instagram}</tag>} 
              
                  </div>

                  <div className="text-center mt-5"><Button className="explore" onClick={Editprofile}>UPDATE</Button></div>

                  
                 </div>
              </div>
                </div>
             
            </div>

            <Footer/>
        </div>

    )
}

export default Profiledit;