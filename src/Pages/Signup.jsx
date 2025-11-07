import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavabarLogo from '../component/NavbarLogo';
import {config} from "../api/Api";
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import GoogleLogo from '../assets/images/Google-icon.png';
import Cookies from 'js-cookie';

function Signup(){
    //Fullname  email  phone number date_of_birth gender  password confirm_password  check box agree terms
    const [formData,setFormData]=useState({});
    const [showPassword,setShowPassword]=useState(false);
    const [apiKey,setApiKey]=useState("");
    const base_url=config.base_url;
    const navigate = useNavigate();

    const [errors,setErrors]=useState({
        email:"",
    })
    
    const handleChange=(e)=>{
        const {name,value}=e.target;

       if(name==="firstName" || name==="lastName"){
         const cleanedName = value.replace(/[^a-zA-Z]/g, "");
         // setErrors({fullName:"errors invALID"})
         setFormData((data)=>({...data, [name]: cleanedName}));
       }
       if(name==="email"){
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(emailPattern.test(value)){
            setErrors((prevdata) => ({ ...prevdata, email: "valid" }));    
        }
        if(name==='password'){
          const password =btoa(e.target.value);
          setFormData((data)=>({...data, [name]: password}));
        }
        else{
            setErrors((prevdata) => ({ ...prevdata, email: "invalid" }));
        }
         setFormData((data) => ({ ...data, [name]: value }));

        }
        else{
         setFormData((data) => ({ ...data, [name]: value }));
        }

    }

    const handleShowPassword=()=>{
        setShowPassword(!showPassword);
    }

    useEffect(() => {
     (async function(){
        try {
          const reqData = { secret_key: "yukenthiran@soft.com", name: "uk" };
          const response = await fetch(`${base_url}/auth/api-key`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reqData),
          });
          const data = await response.json();
          if (data.message==="success") {
            setApiKey(data.result[0].api_key);
            console.log("Api key : "+data.result[0].api_key);
    
          }
        } catch (err) {
          console.log(err);
        }
      })();
      
    }, [base_url]);
    
    const handleSave=async(e)=>{
        e.preventDefault();
         formData.password=btoa(formData?.password);
        const {password,...form}=formData
       
        const signupData=JSON.stringify(form);
        sessionStorage.setItem("userData",signupData);
       
try{
        const response = await fetch(base_url+"/auth/signup",{
            method:"POST",
            headers:{
                "Authorization":`bearer ${apiKey}`,
                "Content-Type":"application/json"
            },          
            body:JSON.stringify(formData)
        });
        const data =await response.json();
        if(data.message==="success"){
            alert("signUp Sucessfully");
            navigate("/signup/otpverify");
        }
        else if(data.message==="alert"){
            alert("user Already Exists");
            navigate("/login")
        }
        else{
            return alert("error ")
        }
    }
    catch(err){
        console.log("error occured while signup api",err);
    }

    }
    

     const checkAccessToken=async(check_auth_code)=>{
      
    try {
      const res = await fetch(base_url+'/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':"Bearer "+apiKey
        },
        body: JSON.stringify({ code:check_auth_code }),
      });

      const data = await res.json();

      if (data.message==='success') {
        // console.log('User authenticated:', data.user);
          Cookies.set("userData",JSON.stringify(data.result[0]));
        window.location.href="/"
        // Handle successful authentication (e.g., store JWT or session)
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (err) {
      console.error('Error sending access token to backend:', err);
    }
     }
    
    const login = useGoogleLogin({

      onSuccess: async(tokenResponse) => {
              const tokenRes = tokenResponse;// Decode the token
      console.log('User Info:', tokenRes);

      // Extract the access token from the tokenRes JWT
      const check_auth_code = tokenRes?.code;

      if (check_auth_code) {
        // Send the access token to the backend for verification
        await checkAccessToken(check_auth_code);
      }
      },
      onError: () => {
        console.log('Login Failed');
      },
      flow: 'auth-code', // or 'auth-code' if you're using server-side flow
    });
    return (
      <>
        <NavabarLogo />
        <div className="container mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-9 col-md-4 border py-3 px-5 rounded">
              <h2 className="text-center">Sign Up</h2>
              <form onSubmit={handleSave}>
                <div className="mb-3">
                  <label for="firstName" class="form-label">
                    First name
                  </label>
                  <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                  {/* <div className="invalid-feedback">enter a valid name.   .. </div> */}
                </div>
                <div className="mb-3">
                  <label for="lastName" class="form-label">
                    Last name
                  </label>
                  <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                  {/* <div className="invalid-feedback">enter a valid name.   .. </div> */}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                  <div className="invalid-feedback">{errors?.email}</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone number
                  </label>
                  <input type="text" className="form-control" id="phone" name="phoneNumber" value={formData.phone} onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="text-center mb-3">
                  <button className="btn w-75 w-md-50 " style={{ backgroundColor: "rgb(252, 184, 13)" }} type="submit">
                    Verify your email
                  </button>
                </div>
              </form>

              {/* <GoogleLogin
        onSuccess={credentialResponse => {
          const decoded = jwtDecode(credentialResponse.credential);
          console.log("User Info:", decoded);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      /> */}
      <div className="d-flex align-items-center my-3">
  <hr className="flex-grow-1" />
  <span className="mx-2 text-muted">or</span>
  <hr className="flex-grow-1" />
</div>
      <div className='d-flex justify-content-center'>
      <button onClick={() => login()} style={{ padding: '10px 20px',border:"1px solid grey",borderRadius:"5px" }}>
      <img src={GoogleLogo} alt="" style={{height:"24px",width:"24px"}}/> &nbsp;Sign in with Google
    </button>
    </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Signup;