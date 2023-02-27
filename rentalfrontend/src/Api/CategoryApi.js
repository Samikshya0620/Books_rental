import { useEffect, useState } from "react";
import http from "../services/httpService";
import config from "../config.json"

const apiEndpoint = config.apiUrl + "ctgapi"

export const ApiCategories = [
  {
    title: "Self Help",
    src: require("../assets/categoryimg/Selfhelp.jpg"),
    categoryvalue: 'selfhelp'
  },
  {
    title: "Romance",
    src: require("../assets/categoryimg/Romance.png"),
    categoryvalue:"romance"
  },
  {
    title: "Thriller",
    src: require("../assets/categoryimg/Thriller.png"),
    categoryvalue:"thriller",
  },
];
export const Categories = () => {
  const [loading, setloading] = useState(true);
  const getCategories = async () =>{
   const categories =  await http.get(apiEndpoint);
   console.log(categories);
   if(loading){
    setloading(false)
   }
  }
  useEffect(()=> {
    getCategories()

  },[loading])
}