import Geocode from 'react-geocode';


// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
Geocode.setLanguage("en");
Geocode.enableDebug();


function calculate(array) {
    var sum = 0;
    var count = array.length;
    for (var i = 0; i < count; i++) {
      sum += parseInt(array[i]);
    }
    return sum / count;
  }

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  

const request = require('request');


const Processes = {

    async get_lat_long(city, country) {
            return Geocode.fromAddress(`${city}, ${country}`).then(
                response => {
                console.log(response);
                const short_name = response.results[0].address_components[0].short_name;
                const { lat, lng } = response.results[0].geometry.location;
                
                const geo_details = {
                    city: short_name,
                    lat: lat,
                    lng: lng
                };
                return geo_details;
                },
                error => {
                console.error(error);
                return 'error'
                }
            );
    },



     async get_climate_data(geo_details) {

        const urlToFetch = `https://api.worldweatheronline.com/premium/v1/weather.ashx?q=${geo_details.lat},${geo_details.lng}&format=json&tp=24&num_of_days=7&key=${process.env.REACT_APP_WORLD_WEATHER_KEY}`; 
        
        try {
            const response = await fetch(urlToFetch);
            if(response.ok) {
              const result = await response.json();
              //const temp = result.data.weather[0].avgtempC;

              const min_week_temps = []
              for(let i=0; i<7; i++) {
                min_week_temps.push(result.data.weather[i].mintempC)
              }
              console.log(min_week_temps)
              
              const avg_min_week_temp = calculate(min_week_temps)
              console.log(avg_min_week_temp)
            
              const month = new Date().getMonth();
              console.log(month)
              const avg_min_month_temp = result.data.ClimateAverages[0].month[month].avgMinTemp;
              console.log(avg_min_month_temp);


              const temp_anomaly = avg_min_week_temp - avg_min_month_temp;
              console.log(temp_anomaly)

              
            const temp_details = {
                avg_min_week_temp: avg_min_week_temp,
                avg_min_month_temp: avg_min_month_temp,
                temp_anomaly: temp_anomaly
            };
            
            const details = {
                temp: temp_details,
                geo: geo_details
            }

              return details;
            }
            
          } catch(error) {
            console.log(error)
          }
        },
    



 one(postcode) {

  return new Promise((resolve, reject) => {
    request({
      uri: 'https://app.cors.bridged.cc/https://www.parsehub.com/api/v2/projects/t_8ztx8TSj6f/run',
      method: 'POST',
      form: {
        api_key: process.env.REACT_APP_PARSEHUB_KEY,
        start_url: `https://www.aph.gov.au/Senators_and_Members/Parliamentarian_Search_Results?q=${postcode}&sen=1&par=-1&gen=0&ps=12`
      }
    }, async function(err, resp, body) {
        if (!err) {
          const response = await JSON.parse(body)
          const run_token = await response.run_token
          console.log(run_token)
          return resolve(run_token)
        }
    })

})
},



 async two (postcode) {

const outcome = await Processes.one(postcode)

console.log('not ready')
return new Promise((resolve, reject) => {


 function loop(token) {
  request({
    uri: `https://cors-anywhere.herokuapp.com/https://www.parsehub.com/api/v2/runs/${outcome}`,
    method: 'GET',
    qs: {
      api_key: process.env.REACT_APP_PARSEHUB_KEY
    }
  }, async function(err, resp, body) {
  
    if (!err) {
   
      const response = await JSON.parse(body)
      const ready = response.data_ready
  
      if(ready === 1) {
        console.log('ready')
        return resolve(outcome)
      } else {
        sleep(5000)
        loop(token)
      }
  
  } else {
    console.log(err)
  }
  })
}

loop()

})

},

 async three (postcode) {
  const outcome = await Processes.two(postcode);
  return new Promise((resolve, reject) => {
    request({
      uri: `https://cors-anywhere.herokuapp.com/https://www.parsehub.com/api/v2/runs/${outcome}/data?api_key=${process.env.REACT_APP_PARSEHUB_KEY}&format=json`,
      method: 'GET',
      form: {
        api_key: process.env.REACT_APP_PARSEHUB_KEY,
        format: `json`
      }
    }, async function(err, resp, body) {
        if (!err) {
          const response = await JSON.parse(body)
          //const run_token = await response.run_token
         // console.log(response)

       
         const response_body = response.email
         let emails = ''
         const names = []

         for(let i= 0; i<response_body.length; i++) {

          if (i === response_body.length-1) {
            const email_var = response_body[i].url
           const email = email_var.replace("mailto:", "");
           emails += email

          } else {
            const email_var = response_body[i].url
            const email = email_var.replace("mailto:", "");
            emails += `${email}, `
          }
          const name = response_body[i].Name
          if (name !== 'Contact form') {
            names.push(name)
          }

         }

         const details = {
          emails: emails,
          names: names
         }

        return resolve(details);
        }
    })

})

},


async get_facts(temp) {
  return new Promise((resolve, reject) => {

    const facts_0_1 = ['An increased frequency and/or severity of extreme weather events including floods and droughts.',
 'Impacts on wildlife due to heat stress, drought and habitat changes, which have flow-on effects down the food chain.',
  'Sea level rise, leading to more coastal flooding, erosion and saltwater intrusion into freshwater wetlands.', 
  'SOURCE: The Climate Council.']
  const facts_1_2 = ['The risk of dengue fever among Australians increasing from 0.17 million people to 0.75–1.6 million.',
   'A 12–25% reduction in flow in the Murray River and Darling River basin.',
    'A 10% increase in diarrhoeal diseases among Aboriginal children in central Australia.', 
  'SOURCE: The CSIRO.']
  const facts_2_3 = ['97% of the Great Barrier Reef bleached annually.',
   'The forest fire danger indices in NSW and WA would grow by 10% and the forest fire danger indices in south, central and north-east Australia would increase by more than 10%.',
    'Wind speeds of tropical cyclones could intensify by 5 to 10%, and tropical cyclone rainfall could increase by 20–30%.',
  'SOURCE: The CSIRO.']
  const facts_3plus =['A 41% increase in global marine heatwave days per year!',
   'A 0.9% decrease in global GDP due to energy demand for heating and cooling!',
    'The average Oceania drought length increasing to 11 months!',
  'SOURCE: Carbon Brief.']

 
    if (temp < 1) {
      return resolve(facts_0_1)
    } else if (temp < 2) {
      return resolve(facts_1_2)
    } else if (temp <3) {
      return resolve(facts_2_3)
    } else if (temp > 3) {
      return resolve(facts_3plus)
    }
  


  })

},

async get_email_body (name, city, temp, facts) {


  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  return new Promise((resolve, reject) => {
    const new_line = '%0D%0A'

    const body = `Hi Senators. My name is ${capitalize(name)}.
    ${new_line}${new_line}I live in ${capitalize(city)} and am really concerned about the rising temperatures we are currently experiencing. 
    ${new_line}${new_line}Just this coming week, the forecasted minimum average temperature is ${temp.toFixed(2)} degrees higher than this month's usual average. 
    ${new_line}${new_line}If this temperature increase remains consistent, it will lead to: 
    ${new_line}#1: ${facts[0]}
    ${new_line}#2: ${facts[1]}
    ${new_line}#3: ${facts[2]}
    ${new_line}${new_line}${facts[3]}
    ${new_line}${new_line}The future of our nation is at risk if we do not act. I urge you to please make combating Climate Change a top priority.
    ${new_line}${new_line}Thanks, 
    ${new_line}${capitalize(name)}.
    `
    return resolve(body)
  })

}

    
 }


export default Processes;







