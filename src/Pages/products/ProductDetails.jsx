
import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import { useSelector,useDispatch } from "react-redux";
import { config } from "../../api/Api";
import Cookies from "js-cookie";
import { usePaymentGateway } from "../../hooks/usePaymentGateway";
import { First } from "react-bootstrap/esm/PageItem";
import { loginSuccess } from '../../appRedux/user/userSlice';



function ProductInfo(){
   const base_url=config.base_url;
    const [apiKey,setApiKey]=useState(null);
    const [product,setProduct]=useState([]);
    const [categoryList,setCategoryList]=useState([]);
    const [tempList,setTempList]=useState([]);
    const [productId,setProductId]=useState("");
    const [productImages,setProductImages]=useState([]);
    const {handlePayment}= usePaymentGateway();
    const [userData, setUserData] = useState(null);
    const dispatch=useDispatch();
  const userData_store = useSelector((state) => state.user.user);
  

    useEffect(() => {
      const getData = Cookies.get("userData");
      if (getData !== null && getData !== "" && getData !== undefined) {
        const parsedData = JSON.parse(getData);
        if(userData_store){
        setUserData(userData_store);
        }
        else{
             dispatch(loginSuccess(parsedData));
          setUserData(parsedData);
        }
      }
    }, [userData_store]);
    
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
}, []);

useEffect(()=>{
  async function fetchProduct(){
 if((apiKey!==null && apiKey!==undefined && apiKey!=="")&&(productId)){
    try {
      const response = await fetch(`${base_url}/products/details`, {
        method: "POST",
        headers: {
         "Authorization":`Bearer ${apiKey}`,
         "Content-Type":"application/json"
        },
        body:JSON.stringify({id:productId})
      });
      if (response.ok) {
        const data = await response.json();
        if (data.message==="success") {
          setProduct(data.result[0]);
          console.log("Product ");
          console.log(data.result[0]);
          const images=JSON.parse(data.result[0].images);
          setProductImages(images)

        }
      } else {
        console.log("ERROR: Occured while fetching products");
        console.log("check api ");
      }
    } catch (err) {
      console.log(err);
    }

  };
}
fetchProduct();
 },[apiKey,productId]);


 useEffect(()=>{
    const params= new URLSearchParams(window.location.search);
    setProductId(params.get("id"));
    console.log("id: "+params.get("id"));
 },[])
 
const [loaded, setLoaded] = useState(false);
const [clickedImg, setClickedImg] = useState(0);

   const startPayment = (e,product) => {
    e.preventDefault();
    if(!userData){
      window.location.href="/login";
      return;
    }

    const productDetails = {
      product_id: product.id,
      product_name: product.title,
      product_price: product.price,
      product_image: product.thumbnail,
    };
    const userDetails={
      first_name: userData.first_name,
      last_name:userData.last_name,
      email: userData.email,
      contact: userData.phone_number || ""
    }
    handlePayment(apiKey,productDetails,userDetails);
  };

   const addToCartProducts=async(e,product_id)=>{
    e.preventDefault();
     try{
      // const checkingcart=cartProducts.includes(product_id);
      const token={token:userData.access_token,product_id}
      // const url = !checkingcart?base_url+"/add_favourites":base_url+"/remove_favourites";
       const url = base_url+"/user/cart/add"
     
  const response = await fetch(url,{
    method:"POST",
    headers:{
      Authorization:"Bearer "+apiKey,
      "Content-Type":"application/json"
    },
    body:JSON.stringify(token)
  });

  if(response.ok){
     //get user all favourite peroducts
     const data = await  response.json();
     if(data.message==="success"){
          setCartProducts(data.result.map((cart)=>(cart.product_id)));
     }
  }
  else{
    console.log("response status in cart API : ", response)
  }

     }
     catch(err){
      console.log("error at add cart product API  : "+err)
     }
 }


   return (
     <>
       <Navbar />
     
    

    {/* product Screen  */}
    <div className="container">
    <div className="row my-5">

    {/* product images */}
    <div className="col-lg-6 ">
<div style={{borderRadius:"5px",border: "1px solid rgb(205, 204, 204)",height:"100%",position:"relative",padding:"10px"}}>

    <div style={{height:"100%",display:"flex",justifyContent:"center"}}>

      <img src={productImages[clickedImg]} className="mobile-product-image" alt={product.title} style={{width:"70%",height:"70%"}} />
      
    </div>

    <div className="product-small-img mt-3 d-flex" style={{position:"absolute",  bottom:"10px",left:"10px"}}>
       {
        productImages?.map((img,index)=>(
            <Fragment key={index}>
            <div style={{borderRadius:"5px",border: "1px solid rgb(205, 204, 204)",display:"inline-block",marginRight:"15px"}}>
            <picture>
  <source srcSet={img} type="image/webp" />
  <img src={img} className="mx-4 my-3"  alt={product.title+"index"} onClick={()=>setClickedImg(index)} onLoad={() => setLoaded(true)} style={{ opacity: loaded ? 1 : 0,
        transition: "opacity 0.2s ease-in-out",width:"90px",height:"90px",borderRadius:"5px",display:"inline-block"}} loading="lazy" />
</picture>
        </div>
            </Fragment>
        ))
     
      }
    </div>
    </div>
     </div>

     <div className="col-lg-6">
     {/* product title */}
     <div className="product-title ">
      <h2>{product.title}</h2>
     </div>

     {/* brand */}
       <div>
        <h5 style={{color:"grey"}}>{product.brand}</h5>
       </div>

    {/* description  */}
    <div >
      <p style={{textAlign:'justify'}}>{product.description}</p>
    </div>

    {/* availability status  */}
    <div className="mt-3">
      <p>
        Availability Status: &nbsp;
        <span className={product.availabilityStatus === "In Stock" ? "text-success" : "text-danger"}>
          {product.availabilityStatus}
        </span>
      </p>
      </div>

      {/* stocks quantity */}
      
      <div className="mt-3">
      <p>
         Available :&nbsp;
        <span className={product.stock<5?"text-danger":"text-success"}>{product.stock}</span>
        &nbsp;
        </p>
        </div>


  {/* warranty */}
       <div className="mt-3">
        warranty: {product?.warrantyInformation}
       </div>
       {/* shipping */}
     <div className="mt-3">
       {product?.shippingInformation }
       </div>
       {/* returnPolicy */}
      <div className="mt-3">
      Return Policy: {product?.returnPolicy}
       </div>

    {/* price */}
    <div className="mt-5">
      <p>
      Original Price : &nbsp;
        <span style={{textDecoration:"line-through"}}>{product.original_price} </span>
        <span className="text-danger">&nbsp;Offer {product.discountPercentage}%</span>
        <br/>
        <br/>
        Discount Price :<span className="text-success"> {product.price}</span>
      </p>
     </div>

     {/* add to  cart */}

      <div className="mt-5 d-flex justify-content-between">
      <button className="btn mx-1" style={{backgroundColor:"rgb(252, 184, 13)",width:"40%"}}  onClick={async(e)=>await addToCartProducts(e,product.id)} >Add to Cart</button>
      <button className="btn mx-1" style={{backgroundColor:"rgb(252, 184, 13)",width:"40%"}} onClick={(e)=>startPayment(e,product)}>Buy now</button>
      </div>
    </div>

</div>
</div>

      </>
   );
}
export default ProductInfo;

