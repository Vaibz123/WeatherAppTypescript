//const router=require("./router"); 
const express = require("express");

//const bodyParser = require('body-parser');
const app = express();
const port = 9999;
const request=require('request');



app.use(express.urlencoded({ extended: true }));

let ejs=require('ejs');
let city:string="Thane";
let apiKey:string=API_KEY;
let url_api:string=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;


app.set('view engine','ejs');

app.get("/", (req, res) => {
    
    res.render("index",{icon_url:"",temp_min:"",temp_max:"",city:"",country:"",description:"",temp:"",pressure:"",humidity:"",wind_speed:"",weather:""});
             
    });

app.post('/weather', function (req, res) {
    //console.log('Got body:', req.body);
    //res.sendStatus(200);
    let city=req.body.city;
    console.log("City",city);
    url_api=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    request(url_api,function(err,response,body){
    
        if(err){
            console.log('error',err);
            res.render("index",{icon_url:"",temp_min:"",temp_max:"",city:"",country:"",description:"",temp:"",pressure:"",humidity:"",wind_speed:"",weather:""});
    
            }
        else{
            let weather:JSON =JSON.parse(body);
            let city:string=req.body.city;
            let country:string=weather["sys"].country;
            let temp:number =weather["main"].temp;
            let pressure:number=weather["main"].pressure;
            let humidity:number=weather["main"].humidity;
            let temp_min:number=weather["main"].temp_min;
            let temp_max:number=weather["main"].temp_max;
            
            let wind_speed:number=weather["wind"].speed; 
            let description:string=weather["weather"][0].description;
            let icon:string=weather["weather"][0].icon;
            let icon_url:string=`http://openweathermap.org/img/wn/${icon}@2x.png`;
            console.log("Icon name",icon);
            //console.log("Weather[0]",weather["weather[0]"]);
            console.log("Description",description);
            console.log('Temperature',temp);
            console.log('Pressure',pressure);
            console.log('Humidity',humidity);
            console.log('Wind Speed',wind_speed);
            res.render("index",{icon_url:icon_url,temp_min:temp_min,temp_max:temp_max,city:city,country:country,description:description,weather:weather,temp:temp,pressure:pressure,humidity:humidity,wind_speed:wind_speed});

    
        }
        });
       // res.sendStatus(200);
  });

  app.listen(port, function() {
    console.log(`Server listening on port ${port}`);
  });
  
