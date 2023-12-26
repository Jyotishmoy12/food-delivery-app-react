
import ResturantCard from "./ResturantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
const Body = () => {
    // local state variable- super powerful variable
    const [listOfResturants, setListOfResturants] = useState([])
    const [searchText, setSearchText] = useState("") 
    const[filteredResturants, setFilteredResturants] = useState([])
    // reload the page
    useEffect(() => {
        getRestaurants();
      }, []);
    
      // async function getRestaurant to fetch Swiggy API data
      async function getRestaurants() {
        // handle the error using try... catch
        try {
          const response = await fetch("https://corsproxy.org/?https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D12.9351929%26lng%3D77.62448069999999%26page_type%3DDESKTOP_WEB_LISTING");
          const json = await response.json();
    
          // initialize checkJsonData() function to check Swiggy Restaurant data
          async function checkJsonData(jsonData) {
            for (let i = 0; i < jsonData?.data?.cards.length; i++) {
    
              // initialize checkData for Swiggy Restaurant data
              let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    
              // if checkData is not undefined then return it
              if (checkData !== undefined) {
                return checkData;
              }
            }
          }
    
          // call the checkJsonData() function which return Swiggy Restaurant data
          const resData = await checkJsonData(json);
    
          // update the state variable restaurants with Swiggy API data
          setListOfResturants(resData);
          setFilteredResturants(resData);
        } catch (error) {
          console.log(error);
        }
      }
    
    

    // let listOfResturantsJs =[
    //     {
    //         data: {
    //           id: "74453",
    //           name: "Domino's Pizza",
    //           cloudinaryImageId: "bz9zkh2aqywjhpankb07",
    //           cuisines: ["Pizzas"],
    //           costForTwo: 40000,
    //           deliveryTime: 45,
    //             avgRating: "4.5",
    //         },
    //       },
    //       {
    //         data: {
    //           id: "74454",
    //           name: "KFC",
    //           cloudinaryImageId: "bz9zkh2aqywjhpankb07",
    //           cuisines: ["Pizzas"],
    //           costForTwo: 40000,
    //           deliveryTime: 45,
    //             avgRating: "3.8",
    //         },
    //       },
    // ];

    // conditional rendering
    // if(listOfResturants.length===0){
    //     return <Shimmer/>;
    // }
    return listOfResturants.length===0? 
    <Shimmer/>:
    (
        <div>
            <div className="body">
                    <div className="filter">
                     <div className="search">
                      <input type="text" className="search-box" value={searchText} onChange={(e)=>{
                        // we want to update the search text
                        setSearchText(e.target.value)
                      }}/>
                      <button  onClick={()=>{
                        // filter the resturant cards and update the UI
                        // searchText
                        //console.log(searchText);

                       const filteredResturants = listOfResturants.filter((res)=>res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                       setFilteredResturants(filteredResturants)
                      }}>Search</button> 
                        </div>   
                        <button className="filter-btn" onClick={() => {
                            //Filter logic
                            const filteredList = listOfResturants.filter(
                                (res) => res.info.avgRating > 4.4
                            )
                            setFilteredResturants(filteredList)
                        }}>Top Rated Restaurants</button>
                    </div>
                    <div className="res-container">
                        {
                            filteredResturants.map(resturant => <ResturantCard key={resturant.info.id} resData={resturant} />)
                        }


                    </div>
                </div>
        </div>
    )
}

export default Body;