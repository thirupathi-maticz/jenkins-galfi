import React, { useEffect, useState } from "react";
import { Container, Button, Accordion } from 'react-bootstrap';
import Footer from "../Layouts/footer";
import Header from "../Layouts/header";
import person from "../Assets/person.png";
import { useLocation, useNavigate } from "react-router";
import * as yup from 'yup';
import toast from 'react-hot-toast'
import { createprofileapi } from "../services/user.api";
function CreateProfile() {
    const[CreateObjectURL,setCreateObjectURL]= useState(null)
const [process , Setprocess]= useState(false);
const [errorvalue, seterror] = useState({});
const naviagate = useNavigate();
const defaultprofileimage = person;
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);
const location = useLocation();
const [newaccount , setAccDetail]= useState(location.state.newaccountdata)
const initdata ={
    DisplayName : "",
WalletAddress : newaccount.WalletAddress,
WalletType : newaccount.WalletType,
CustomUrl : "",
Profile : "",
EmailId : "",
Bio : "" ,
Facebook : "" , 
Twitter : "" ,
Instagram : "" , 
Youtube : ""
}
const [formData , setformData] = useState(initdata)

function handleChange(e){
    const {id , value} = e.target
    setformData({...formData , [id] : value})
}

const addimage = (event) => {
    const { id, files } = event.target;
    let formata = { ...formData, ...{ ["Profile"] : files[0] } }
    setCreateObjectURL(URL.createObjectURL(event.target.files[0]));
    setformData(formata)
}

const createprofile = async()=>{
    const id = toast.loading("creating profile...")
    Setprocess(true)
    try {
        const schema = yup.object({
            DisplayName: yup.string().required('Name is required'),
            WalletAddress: yup.string().required('Wallet Address is required'),
            WalletType: yup.string().required('Wallet Type is required'),
            CustomUrl: yup.string().required('customurl required'),
            EmailId: yup.string().email('Invalid email format').required('Email is required'),
            Bio: yup.string().nullable(),
            Facebook: yup.string().url('Invalid URL format').nullable(),
            Twitter: yup.string().url('Invalid URL format').nullable(),
            Instagram: yup.string().url('Invalid URL format').nullable(),
            Youtube: yup.string().url('Invalid URL format').nullable(),
          });
          await  schema.validate(formData, { abortEarly: false })


const resp = await createprofileapi(formData)
console.log("sdahsdas",resp)
if(resp.status){


    toast.dismiss(id)
    toast.success("created successfully")
    naviagate('/')
}
      
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
console.log("location" , location.state)
    return (

        <div className="section_seven">

            <Header />

            <div className="innerpage">
                <div className="container pt-5">
                <div className="row">
                {/* <div className="pos">
                    <input type="file" onChange={addimage}className="form-control profinput opacity"/>
                    <Button className="explore uploadimg">Upload Image</Button>
                    </div> */}
                 <div className="col-md-8 col-xxl-9 mt-4">
                    <h4 className="whtsclr fw-600">Create Profile</h4>
                    <p className="whtsclr f-18 mt-4 fw-600">Contact Details</p>
                    <div className="mb-4">
                    
                    <p className="whtsclr mb-2">Wallet Address <span className="redclr">*</span></p>
                    <input type="text" className="form-control profinput"
                     value ={newaccount.WalletAddress} disabled={false} placeholder="address"/>
                    </div>
                  <div className="mb-4">
                    
                  <p className="whtsclr mb-2">Full Name <span className="redclr">*</span></p>
                  <input type="text" className="form-control profinput" id="DisplayName"onChange={handleChange} placeholder="Names"/>
                  {errorvalue?.DisplayName && <span className="text-danger">{errorvalue.DisplayName}</span>} 
                  </div>

                  <div className="mb-4">
                  <p className="whtsclr mb-2">Custom Url <span className="redclr">*</span></p>
                  <input type="text" className="form-control profinput" id="CustomUrl"onChange={handleChange} placeholder="custom url"/>
                  {errorvalue?.CustomUrl && <span className="text-danger">{errorvalue.CustomUrl}</span>} 
                  </div>
                  <p className="whtsclr f-18 mt-4 fw-600">Contact Details</p>

                  <div className="mb-4">
                  <p className="whtsclr mb-2">Email Address <span className="redclr">*</span></p>
                  <input type="mail" className="form-control profinput"   id="EmailId"onChange={handleChange} placeholder="Sample@gmail.com"/>
                  {errorvalue?.EmailId && <span className="text-danger">{errorvalue.EmailId}</span>} 
                  </div>

                  <div className="mb-4">
                  <p className="whtsclr mb-2">Bio </p>
                  <input type="text" className="form-control profinput"  id="Bio" onChange={handleChange} placeholder="Write something about yourself"/>
                  {errorvalue?.Bio && <span className="text-danger">{errorvalue.Bio}</span>} 
                 
                  </div>

                  <div className="mb-4">
                  <p className="whtsclr mb-2">Youtube link </p>
                  <input type="text" className="form-control profinput"  id="Youtube" onChange={handleChange} placeholder="Youtube address"/>
                  {errorvalue?.Youtube && <span className="text-danger">{errorvalue.Youtube}</span>} 
                  </div>

                  <div className="mb-4">
                  <p className="whtsclr mb-2">Twitter link </p>
                  <input type="text" className="form-control profinput"  id="Twitter" onChange={handleChange} placeholder="twitter address"/>
                  {errorvalue?.Twitter && <span className="text-danger">{errorvalue.Twitter}</span>} 
               
                  </div>
                  <div className="mb-4">
                  <p className="whtsclr mb-2">facebook link </p>
                  <input type="text" className="form-control profinput" id="Facebook" onChange={handleChange}   placeholder="facebook address"/>
                  {errorvalue?.Facebook && <span className="text-danger">{errorvalue.Facebook}</span>} 
                
                  </div>

                  <div className="mb-4">
                  <p className="whtsclr mb-2">Instagram link </p>
                  <input type="text" className="form-control profinput"  id="Instagram" onChange={handleChange}   placeholder="instagram address"/>
                  {errorvalue?.Instagram && <span className="text-danger">{errorvalue.Instagram}</span>} 
               
                  </div>

                  <div className="text-center mt-5"><Button className="explore" disabled={process} onClick={createprofile}>
                    Create Profile</Button></div>

                  
                 </div>
              </div>
                </div>
             
            </div>

            <Footer/>
        </div>

    )
}

export default CreateProfile;