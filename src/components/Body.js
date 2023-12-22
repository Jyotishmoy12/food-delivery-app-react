
import ResturantCard from "./ResturantCard";
import resList from "../utils/mockData";
import { useState, useEffect } from "react";

const Body = () => {
    // local state variable- super powerful variable
    const [listOfResturants, setListOfResturants] = useState([])
    // reload the page
    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
        )

        const json = await data.json();
        console.log(json.data.cards[2].card.card.gridElements.infoWithStyle.restaurants
        )
        setListOfResturants(
            json.data.cards[2].card.card.gridElements.infoWithStyle.restaurants
        );
        //setListOfResturants(json.data.cards)
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

    return (
        <div>
            {listOfResturants.length === 0 ? <p>loading</p> :



                <div className="body">
                    <div className="filter">
                        <button className="filter-btn" onClick={() => {
                            //Filter logic
                            const filteredList = listOfResturants.filter(
                                (res) => res.info.avgRating > 4.4
                            )
                            setListOfResturants(filteredList)
                        }}>Top Rated Restaurants</button>
                    </div>
                    <div className="res-container">
                        {
                            listOfResturants.map(resturant => <ResturantCard key={resturant.info.id} resData={resturant} />)
                        }


                    </div>
                </div>
            }
        </div>
    )
}

export default Body;