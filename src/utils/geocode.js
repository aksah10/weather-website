const request=require('request')

const geocode=(address,callback)=>{
    const url='http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWFkYXJzaDAwNyIsImEiOiJjazl5cHV3dGwwcnRmM2Z0ZXZyM3BwN3c4In0.cD5xQECLmUAGnmFg-ZXexg&limit=1'
    request({url:url,json:true},(error,{body}={})=>{
      if(error)
        callback('unable to connect to the server !!',undefined)
         else if(body.features.length===0)
            callback('location not found. Please try again',undefined)
            else
            {
                     callback(undefined,{
                         latitude: body.features[0].center[1],
                         longitude: body.features[0].center[0],
                         location:'Location : '+ body.features[0].place_name

                     })
             }
           
      })
   }

   module.exports=geocode