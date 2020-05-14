const request=require('request')
const forecast=(latitude,longitute,callback)=>{

      const url ='http://api.weatherstack.com/current?access_key=1b5bbc9fcc5e3316dc580fbc91e09371&query='+latitude+','+longitute+'&units=f' 
      request({url:url,json:true},(error,{body}={})=>{
          if(error)
          callback('unable to connect the server !!',undefined)
          else if(body.error)
          callback('unable to find the location please try again')
          else{
              callback(undefined,{
                temperature: body.current.temperature,
                weather_description: body.current.weather_descriptions[0]
                 })
        

          }  
        

      })

}
module.exports=forecast