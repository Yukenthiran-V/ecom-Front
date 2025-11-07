import React, { useEffect, useState, Suspense } from "react";
import Navbar from "../../component/Navbar";
import {config} from "../../api/Api";
import Cookies from 'js-cookie';


const UserList = React.lazy(() => import("./UserList"));


function ProductCategories() {
const [categoryList,setCategoryList]=useState([]);
const [tempList,setTempList]=useState([]);
const [apiKey,setApiKey]=useState("");

const base_url=config.base_url;
// women dress add top also 
var images={
    beauty:"beauty_products.png",
    fragrances:"fragrence (2).png",
    skincare:"skin_products.png",
    mensshirts:"men_shirts (2).png",
    mensshoes:"skin_products.png",
    menswatches:"men_watches.png",
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
    groceries:"grocerries.png",
    motorcycle:"motor_bikes.png",
    sportsaccessories:"sports_accessories.png",
    vehicle:"vehicle.png"
}
const imageKeys =Object.keys(images);
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
               setCategoryList(updateList);
               console.log("updated image ")
               console.log(updateList);

            }
        });
    }
    })
}
},[tempList])



const reqData = { secret_key: "yukenthiran@soft.com", name: "uk" }

useEffect(()=>{
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
  getApi();
},[])

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
 const [showList, setShowList] = useState(false);

  const handleClick = () => {
    setShowList(true); // Trigger loading
  };


    return(
        <>
           <Navbar />
        
           <div className="container">
           {/* <div className="row" style={{justifyContent: "center",marginTop:"10px"}}>
           <div>
            <h3>Categories</h3>
           </div>
           {
  categoryList.map((category) => (
    <div className="col-6 col-md-3" key={category.id}> {/* Add a unique key here */}
     {/* <div className="card w-85  mt-4">

        <img 
          src={`/categories_img/${category.image}`}
          className="card-img-top"
          alt={category?.name}
          style={{ height: "150px",width:"100%",objectPosition:"center", cursor: "pointer" }}
          loading="lazy" 
        />
<div className="my-2 text-center">
        <h5>{category.name}</h5>
        </div>
        </div>
        </div>
      
  ))
}
                  </div> */}
                    <div className="row justify-content-center " style={{marginTop:"10px"}}>
       <div className="col-12 mt-5">
          
            <h3 className="mb-5">Categories</h3>

  {/* <button onClick={handleClick}>Load Users</button>

      {showList && (
        <Suspense fallback={<p>Loading list...</p>}>
          <UserList />
        </Suspense>
      )} */}

           </div>
           
           {
  categoryList.map((category) => (
    <div className="card categories-card mb-3  me-3" style={{backgroundColor:'#e6e4e4ff',width:"15.4%"}} key={category.id}> {/* Add a unique key here */}
      <div className="h-100" style={{alignContent:"center"}} onClick={()=>window.location.href="/product-list/categories?="+category.name}>
      <div className=" p-3 "  data-name="category"style={{cursor:"pointer"}} 
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
          style={{ height: "60px", display:"inline-block",objectFit: "cover", cursor: "pointer" }}
          loading="lazy" 
        />

        </div>
        <p style={{alignContent: "center",textAlign:"center"}}>{category.name}</p>
      </div>
      </div>
    </div>
  ))
}
                  </div>
           </div>
        </>
    )
}
export default ProductCategories;