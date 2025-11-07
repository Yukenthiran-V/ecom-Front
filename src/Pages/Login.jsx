import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavabarLogo from '../component/NavbarLogo';
import {config} from "../api/Api";
import { useDispatch,useSelector } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleLogo from '../assets/images/Google-icon.png';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
 logout} from '../appRedux/user/userSlice';
import Cookies from 'js-cookie';


function Login(){

    const [apiKey,setApiKey]=useState("");
    const [loginData,setLoginData]=useState({});
    const navigate=useNavigate();
    const base_url=config.base_url;
    const dispatch =useDispatch();

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setLoginData((prevdata)=>({...prevdata,[name]:value}));
    }


      
          const reqData = { secret_key: "yukenthiran@soft.com", name: "uk" }
          const getApi = async()=>{
            try {
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
          }
          useEffect(()=>{
          if(reqData){
           getApi();
           }          
      },[])
        
const HandleLogin = async (e) => {
  e.preventDefault();
  const loginInfo = {
    email: loginData.email,
    password: btoa(loginData.password),
  };

  try {
    dispatch(loginRequest());

    const response = await fetch(base_url + "/auth/login", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();

    if (data.message === "success") {
      const userData = data.result[0];
      const { password, ...filter } = userData;
      const convertJSON = JSON.stringify(filter);
      dispatch(loginSuccess(filter));
      Cookies.set("userData", convertJSON);
      navigate("/");
    } else if (data.message === "alert1") {
      dispatch(loginFailure(data.result));
      alert(data.result);
    } else if (data.message === "alert2") {
      dispatch(loginFailure(data.result));
      alert(data.result);
    } else {
      dispatch(loginFailure("Unknown error"));
      alert("Unexpected server response");
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
    alert("Network error: " + error.message);
  }
};


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

    const googleLogin = useGoogleLogin({

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
        <div className='container mt-5'>
         <div className='row   d-flex justify-content-center'>
            <div className='col-md-4 p-5 rounded-4 border'>
                <h2 className="text-center">Login</h2>
                <form onSubmit={HandleLogin} >
                <div className='mb-3'>
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input 
                    type="email"
                    name="email"
                    id="email"
                    placeholder=""
                    autoComplete='off' 
                    className="form-control"
                    value={loginData.email}
                    onChange={handleChange}
                    />
                </div>
                 <div className='mb-3'>
                    <label className="form-label">Password</label>
                    <input
                    type='password'
                    style={{}}
                    className="form-control"
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    />
                    </div>
                    <div className='d mb-3'>
                        <p>Don't have an account?&nbsp;
                        
                        <a href="/signup" className="text-decoration-none" style={{display:"inline",color:"blue"}}>
                         Create Account
                        </a></p>
                        
                    </div>
                   <div className='text-center '>
                    <button 
                    type="submit"
                    className="btn  w-25 w-md-25"                  
                    style={{backgroundColor:"rgb(252, 184, 13)"}}
                    >Login</button>
                    </div>
                </form>

                 <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1" />
                  <span className="mx-2 text-muted">or</span>
                  <hr className="flex-grow-1" />
                </div>
                      <div className='d-flex justify-content-center'>
                      <button onClick={() => googleLogin()} style={{ padding: '10px 20px',border:"1px solid grey",borderRadius:"5px" }}>
                      <img src={GoogleLogo} alt="" style={{height:"24px",width:"24px"}}/> &nbsp;Sign in with Google
                    </button>
                    </div>
            </div>
            </div>
        </div>
        </>
    );
}
export default Login;


// home.jsx any improvement modern ui 