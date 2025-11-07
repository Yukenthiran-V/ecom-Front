
import React, { useEffect, useState,Suspense } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { config } from "../api/Api";
import Categories from "./categories/Categories";
import SlideBanner from "./categories/BannerSlide";
import ProductCategories from "./categories/ProductCategories";
import { useDispatch,useSelector } from "react-redux";
import Cookies from "js-cookie";
import { addToCart, storeCartApi } from "../appRedux/cart/cartSlice";
import { use } from "react";

function Home(){
   const base_url=config.base_url;
    const [apiKey,setApiKey]=useState(null);
    const [products,setProducts]=useState([]);
    const [categoryList,setCategoryList]=useState([]);
    const [tempList,setTempList]=useState([]);
    const [userData,setUserData]=useState();
    const [favoriteProducts,setFavoriteProducts]=useState([]);
    const [cartProducts,setCartProducts]=useState([]);
    const dispatch=useDispatch();
    // debugger
      const userDataTest = useSelector((state) => state.user); // top-level hook
    console.log(useSelector((state) => state));
    console.log("userData: ");
    console.log(useSelector((state) => state.user));
  useEffect(() => {
 console.log("userData: "+ userDataTest);
    // you can perform side effects here if needed
  }, [userDataTest]);

    useEffect(()=>{
        const getUserData=Cookies.get("userData");
        if(getUserData){
          const parse_data=JSON.parse(getUserData);
          setUserData(parse_data);
          console.log(parse_data);
        }
    },[])


    
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
 if(apiKey!==null && apiKey!==undefined && apiKey!==""){
    try {
      const response = await fetch(`${base_url}/products/get`, {
        method: "POST",
        headers: {
         "Authorization":`Bearer ${apiKey}`,
        //  "Content-Type":"application/json"
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.message==="success") {
          setProducts(data.result);
          console.log("Products ");
          console.log(data.result);
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
 },[apiKey]);

 var images={
  beauty:"beauty_products.png",
  fragrances:"fragrence (2).png",
  skincare:"skin_products.png",
  mensshirts:"men_shirts (2).png",
  mensshoes:"skin_products.png",
  menswatches:"men watch.png",
  womensbags:"women_bag.png",
  womensdresses:"women_dress.png",
  womensjewellery:"jewallary.png",
  womensshoes:"women_shoes.png",
  womenswatches:"women_watch.png",
  sunglasses:"sunglasses.png",
  tops:"women_dress.png",
  furniture:"furniture.png",
  homedecoration:"home-decor.png",
  kitchenaccessories:"kitchen-Access.png",
  smartphones:"smartphone.png",
  laptops:"laptop.png",
  tablets:"tablets.png",
  mobileaccessories:"mobile_accessories.png",
  groceries:"grocerries.png"
}
 useEffect(()=>{
 
     const fetchCategory=async()=>{
         const response=await  fetch(base_url+"/products/categories",{
             method:"GET",
             headers:{
                 Authorization:`Bearer ${apiKey}`,
                "Content-Type":"application/json"
             }
         });
         if(response.ok){
         const data = await response.json();
         if(data.message==="success"){
           setTempList(data.result);
         }
     }
     }
     if(apiKey!==""&&apiKey!==null && apiKey!==undefined){
        fetchCategory();
     }
 },[apiKey])

 useEffect(()=>{
 if(tempList.length>0 && tempList!==null){
     tempList.forEach((ele,index) => {
     const removeSomeChar=ele.name.replace(" ","");
     if(removeSomeChar){
         const imageSelect =images[removeSomeChar.toLowerCase()];
     
         tempList.forEach((element,index) => {
             if(element.name.replace(" ","").toLowerCase()===removeSomeChar.toLowerCase()){
                 const updateList=tempList;
                updateList[index].image=imageSelect;
                setCategoryList(updateList.slice(0,8));
                console.log("updated image ")
                console.log(updateList);
 
             }
         });
     }
     })
 }
 },[tempList]);

 const showProductListByCategories=(e,category_name)=>{
  // category to go 
      //navigate to product list 
      // write code ...
      window.location.href="/categories/"+category_name.toLowerCase().replace(" ","_");
 }

 const handleClick=(e,id)=>{
  e.preventDefault();
   window.location.href=`/product?id=${id}`
 }

 useEffect(()=>{

 const getFavouriteProducts=async()=>{
 try{

      const token={token:userData.access_token}
  const response = await fetch(base_url+"/user/favourites",{
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
          setFavoriteProducts(data.result.map((fav)=>(fav.product_id)));
     }
  }
  else{
    console.log("response status in fav API : ", response)
  }

     }
     catch(err){
      console.log("error at get Fav product API  : "+err)
     }
 }
 const getCartProduct=async()=>{
  try{

      const token={token:userData.access_token}
  const response = await fetch(base_url+"/user/cart",{
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
         dispatch(storeCartApi(data.result));
          setCartProducts(data.result.map((cart)=>(cart.product_id)));
     }
  }
  else{
    console.log("response status in cart API : ", response)
  }

     }
     catch(err){
      console.log("error at get cart product API  : "+err)
     }
 }
 if(userData && apiKey){
  getFavouriteProducts();
  getCartProduct();
 }
  
 },[userData,apiKey])
  
 const added_cartProducts=useSelector((state)=>state.cart.items);

 useEffect(()=>{
  if(added_cartProducts && added_cartProducts.length>0){
    console.log("added cart products : ", added_cartProducts);
  }
},[added_cartProducts])

 const addToFavouriteProducts=async(product_id)=>{
     try{
      const checkingFav=favoriteProducts.includes(product_id);
      const token={token:userData.access_token,product_id}
      const url = !checkingFav?base_url+"/user/favourites/add":base_url+"/user/favourites/remove";
  
     
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
          setFavoriteProducts(data.result.map((fav)=>(fav.product_id)));
     }
  }
  else{
    console.log("response status in fav API : ", response)
  }

     }
     catch(err){
      console.log("error at add Fav product API  : "+err)
     }
 }

// 
 const addToCartProducts=async(product_id)=>{
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
            {/* search  bar */}
              <form className='mobile-search-btn w-100 px-4 my-2 '>
              <div className="  input-group d-flex  ">
              <input
                className="search form-control "
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn"
                style={{ backgroundColor: 'rgb(252, 184, 13)' }}
                type="submit"
              >
                <i className="bi bi-search"></i>
              </button>
              </div>
            </form>
       <SlideBanner />
       {/* <Categories /> */}
       <div className="container"  >
    
       <div className="row" style={{marginTop:"10px"}}>
       <div className="col-12">
         
       </div>
       <div className="col-12 d-flex justify-content-between">
          
            <h5>Categories</h5>
            <h5><a href="/categories" alt="">All Categories</a></h5>

           </div>
           <div className="d-flex">            {
            categoryList.map((category) => (
              <div className="" style={{borderRadius:"100%",width:"15%"}} key={category.id}> {/* Add a unique key here */}
                <div className="  w-100 mt-4 " >
                <div className=" p-3 "  data-name="category" style={{cursor:"pointer"}} 
                // onClick={(e)=>{showProductListByCategories()}}
                >
                <div style={
                  {
                    // width:"40%",
                    display:"flex",
                    justifyContent:"center"
                    } 
                }>
                  <img 
                    src={`/categories_img/${category.image}`}
                    alt={category?.name}
                    style={{ height: "60px", display:"inline-block",objectFit: "cover", cursor: "pointer" }}
                    loading="lazy" 
                    onClick={()=>window.location.href="/product-list/categories?="+category.name}
                  />
          
                  </div>
                  <p onClick={()=>window.location.href="/product-list/categories?="+category.name}
                  style={{alignContent: "center",textAlign:"center",fontWeight:"400"}}>{category.name}</p>
                </div>
                </div>
              </div>
            ))
          }
          </div>

                  </div>
       
         <div className="row" >
         <div className="col-12 mt-5 mb-3">
              <h5>Products</h5>
         </div>
         <Suspense fallback={<div>Loading...</div>}>
         {products?.map((product) => {
      // Check the conditions for filtering the products
      if (parseInt(product.id) % 5 === 0 && parseInt(product.id) <= 150) {
        return (
          <div key={product.id} className="col-6 col-md-3 col-lg-2 mb-4" >
          <div className="card h-100 p-2"   style={{cursor:"pointer"}}>
          <div style={{position:"relative",backgroundColor:"#efefef"}}>
          <div  style= {{position: "absolute",
          right: "5px",
          top:"5px"}}>
          <div 
          style={{
          height: "30px",
          width: "30px",
        
          display: "flex",
         justifyContent: "center",
          flexWrap: "wrap",
          alignContent: "center",
          background: "white",
          borderRadius: "99%",
          border:"1px solid #a39b9b"
          }}
          onClick={async()=>await addToFavouriteProducts(product.id)}>
          
            <i class={"bi bi-heart"+(favoriteProducts?.includes(product.id)?"-fill":"")} style={{color:(true?"red":""),position:'relative',top:"2px",fontSize:"18px"}}></i>
            
          </div>
         {!cartProducts?.includes(product?.id) ?
           <div style={{
          height: "30px",
          width: "30px",
        marginTop:"5px",
          display: "flex",
         justifyContent: "center",
          flexWrap: "wrap",
          alignContent: "center",
          background: "white",
          borderRadius: "99%",
             border:"1px solid #a39b9b"
          }}
           onClick={async()=>await addToCartProducts(product.id)}
          >
<svg xmlns="http://www.w3.org/2000/svg" height={18} width={18} shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512"><path fill-rule="nonzero" d="M73.31 114.66h84.97V97.37c0-26.79 10.95-51.14 28.59-68.77C204.51 10.96 228.86 0 255.65 0s51.15 10.96 68.78 28.6c17.64 17.63 28.6 41.98 28.6 68.77v17.29h85.66c5.14 0 9.8 2.13 13.16 5.49l.91 1.02c2.85 3.29 4.58 7.58 4.58 12.15v311.75c0 18.37-7.54 35.12-19.68 47.25-12.13 12.13-28.88 19.68-47.25 19.68H121.58c-18.33 0-35.08-7.55-47.24-19.7-12.14-12.1-19.68-28.83-19.68-47.23V133.32c0-5.14 2.1-9.82 5.47-13.19 3.36-3.36 8.04-5.47 13.18-5.47zm169.92 162.15c0-7.05 5.72-12.77 12.77-12.77s12.77 5.72 12.77 12.77v41.25h41.24c7.04 0 12.76 5.71 12.76 12.76s-5.72 12.77-12.76 12.77h-41.24v41.24c0 7.05-5.72 12.77-12.77 12.77s-12.77-5.72-12.77-12.77v-41.24h-41.24c-7.05 0-12.77-5.72-12.77-12.77s5.72-12.76 12.77-12.76h41.24v-41.25zm-61.21-162.15h147.27V97.37c0-20.23-8.29-38.64-21.64-51.99-13.35-13.34-31.76-21.64-52-21.64-20.23 0-38.65 8.3-51.99 21.64-13.35 13.35-21.64 31.76-21.64 51.99v17.29zm-23.74 46.06v-22.29H78.42v306.64c0 11.85 4.87 22.63 12.7 30.46 7.8 7.85 18.6 12.7 30.46 12.7h268.83c11.82 0 22.62-4.88 30.45-12.71 7.83-7.83 12.72-18.63 12.72-30.45V138.43h-80.55v22.54c8.81 4.48 14.85 13.63 14.85 24.18 0 14.99-12.15 27.13-27.13 27.13-14.98 0-27.14-12.14-27.14-27.13 0-10.88 6.42-20.27 15.68-24.59v-22.13H182.02v22.38c8.98 4.42 15.17 13.65 15.17 24.34 0 14.99-12.14 27.13-27.13 27.13-14.98 0-27.12-12.14-27.12-27.13 0-10.75 6.25-20.05 15.34-24.43z"/></svg>   
       </div>
       
          :
          <></>
         }
            </div>
            <img
              // src={product?.images?.[0]}
              src={product?.thumbnail}
              className="card-img-top"
              alt={product?.title}
              style={{ height: "auto", objectFit: "cover", cursor: "pointer",padding:"25px",paddingBottom:"30px" }}
              loading="lazy"
             
            />
            </div>
            <div className="card-body p-0" >
              <p className="card-title mt-2" style={{ fontSize: "1em",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontWeight:"500" }}>
               { product?.title}
              </p>

              <p className="card-text" style={{fontSize:"13px",color:"#666666"}}>{product?.brand?product?.brand:product.category}</p>
               <p>
        <span style={{textDecoration:"line-through"}}>{product.original_price} </span>
        <span className="text-danger">&nbsp;Offer {product.discountPercentage}%</span>
       </p>
            <div className="view-btn">
              <p className="card-text">
                <strong>&#8377; </strong>
                {parseInt(product?.price)}
              </p>

                <button className="btn btn-warning mr-3  px-2 py-1"  style={{display:"inline-block",position:"relative",right:"5px",bottom:"5px", fontSize:"13px"}} onClick={(e)=>handleClick(e,product.id)}>View</button>
              </div>
              <div className="product-card-button">
                {/* <button className="btn btn-light ml-3  " style={{display:"inline-block",backgroundColor:"#ffdd8a"}}>add to cart</button> */}
              </div>
              </div>
            </div>
          </div>
          
        );
      }
      return null; // Return null for non-matching products
    })}
    </Suspense>
         </div>
       </div>
       <Footer />
     </>
   );
}
export default Home;

// "images":[
  // "https://cdn.dummyjson.com/products/images/tops/Gray%20Dress/1.png",
  // "https://cdn.dummyjson.com/products/images/tops/Gray%20Dress/2.png",
  // "https://cdn.dummyjson.com/products/images/tops/Gray%20Dress/3.png",
  // "https://cdn.dummyjson.com/products/images/tops/Gray%20Dress/4.png