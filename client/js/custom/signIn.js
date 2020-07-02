window.onload=()=>{
    const email=document.getElementById("email")
    const password=document.getElementById("password")
    const homeBtn=document.getElementById("home")
    
    const emailError=document.getElementById("emailError")
    const passwordError=document.getElementById("passwordError")
    const errorMassage=document.getElementById("errorMassage")

    emailError.style.display='none'
    passwordError.style.display='none'
    errorMassage.style.display='none'
    const logBtn=document.getElementById('logBtn')
    logBtn.onclick=(event)=>{
        
        emailError.style.display='none'
        passwordError.style.display='none'
        errorMassage.style.display='none'
        event.preventDefault()
        const obj={name:name.value,email:email.value,password:password.value}
        axios.post('http://localhost:5000/login', obj)
        .then(res=>{
            window.localStorage.setItem('game_token',res.data.token)
            homeBtn.click()
        })
        .catch(err=>{
            let incommingError=err.response?err.response.data :{}
            console.log(incommingError)

            if(incommingError.email){
                emailError.style.display='block'
            }
            if(incommingError.password){
                passwordError.style.display='block'
            }
            if(incommingError.massage){
                errorMassage.style.display='block'
                errorMassage.innerHTML=incommingError.massage
                console.log(incommingError.massage)
            }
        })
    }
    

}