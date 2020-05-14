const path=require('path')
const express=require('express')
const app=express()
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
//define patha for express config
  const  pathtodirectory=path.join(__dirname,'../public') 
  const viewsPath=path.join(__dirname,'../templates/views')
 const partialPath=path.join(__dirname,'../templates/partials')


  //setup handlebars engine and view locations
     app.set('views',viewsPath)
     app.set('view engine','hbs')
     hbs.registerPartials(partialPath)


     //setup static directory to serve
     app.use(express.static(pathtodirectory))

    
  app.get('',(req,res)=>{
    res.render('index',{
      title:'weather app',
      name:'Aadarsh Kumar '
    })
  })

  app.get('/about',(req,res)=>{
    res.render('about',{
      title:'About Me',
      name:'Aadarsh kumar'
    })
  })

  app.get('/help',(req,res)=>{
    res.render('help',{
      title:'help',
      name:'Aadarsh kumar'
    })
  })

    app.get('/weather',(req,res)=>{
      if(!req.query.address){
        return res.send({
          error:'address not found'
        })
      }

         geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
           if(error){
           return  res.send({error})
           }
             forecast(latitude,longitude,(error,{temperature,weather_description}={})=>{
               res.send({
                     temperature:temperature+' degree f',
                     weather_description:weather_description,
                     location
               })
             })

         })
    })

     app.get('/product',(req,res)=>{

       if(!req.query.search){
        return res.send({
           error:'search key not found'
         })
       }
       res.send({
         product:[]
       })

     })
       


    app.get('/help/*',(req,res)=>{
         res.render('404',{
               name:'Aadarsh kumar',
               errormassage:'help page for this is not found'
         })
    })
    app.get('*',(req,res)=>{
      res.render('404',{
          name:'Aadarsh kumar',
          errormassage:'Page not found'
      })
    })

  app.listen(3000,() =>{

         console.log('server is set upon port 3000')
    })