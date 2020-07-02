window.onload=()=>{
    let errors=[]
    const name=document.getElementById("name")
    const email=document.getElementById("email")
    const password=document.getElementById("password")

    
    const nameError=document.getElementById("nameError")
    const emailError=document.getElementById("emailError")
    const passwordError=document.getElementById("passwordError")
    const successMassage=document.getElementById("successMassage")
    const errorMassage=document.getElementById("errorMassage")

    nameError.style.display='none'
    emailError.style.display='none'
    passwordError.style.display='none'
    successMassage.style.display='none'
    errorMassage.style.display='none'

    const regBtn=document.getElementById('regBtn')
    regBtn.onclick=(event)=>{
        console.log(name.value,email.value,password.value)
        event.preventDefault()
        
        nameError.style.display='none'
        emailError.style.display='none'
        passwordError.style.display='none'
        successMassage.style.display='none'
        errorMassage.style.display='none'
        
        const obj={name:name.value,email:email.value,password:password.value}
        axios.post('http://localhost:5000/register', obj)
        .then(res=>{
            successMassage.style.display="block"
            console.log(res.data)
        })
        .catch(err=>{
            let incommingError=err.response.data
            console.log(incommingError)

            if(incommingError.name){
                nameError.style.display='block'
            }
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