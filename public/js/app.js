
const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
const messageThree=document.querySelector('#message-3')
const messagefour=document.querySelector('#message-4')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value;
        
      messageOne.textContent='Loading...'
      messageTwo.textContent=''   
      messageThree.textContent=''   
      messagefour.textContent=''
 
    fetch('/weather?address='+location).then(response=>{
         
            response.json().then((data)=>{
                if(data.error){
                    messageOne.textContent=data.error
                }
                else{
                    messageTwo.textContent=data.location
                    messageOne.textContent=data.temperature  
                    messageThree.textContent=data.weather_description  
                    messagefour.textContent=data.humidity   
                }
            })
    
})
})

 
 

