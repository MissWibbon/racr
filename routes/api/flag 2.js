const axios = require("axios");

axios({
    "method":"GET",
    "url":"https://salnazi-country-codes-v1.p.rapidapi.com/api.php",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"salnazi-country-codes-v1.p.rapidapi.com",
    "x-rapidapi-key":"618de53724msh2ceae5240273222p1c1a6bjsn66021cfcc3ee"
    },"params":{
    "apiKey":"8923sa7aAS7s",
    "secret":"us7uS78sj"
    }
    })
    .then((response)=>{

        const countryData = {}



  
     function getFlags(item){

        countryData[item.country_name]= item.country_flag
      

     }
     
      response.data.forEach(getFlags)
      console.log(countryData["United States"])

    })
    .catch((error)=>{
      console.log(error)
    })


