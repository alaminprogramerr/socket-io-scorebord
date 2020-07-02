window.onload=()=>{
    let loginPage =document.getElementById('loginPage')
    const logOutBtn =document.getElementById('logOutBtn')
    const name=document.getElementById('name')
    const score=document.getElementById('score')
    const position=document.getElementById('name')


    
    name.innerHTML=localStorage.getItem('game_token')
    
    
    
    
    logOutBtn.onclick=(()=>{
        window.localStorage.removeItem('game_token')
        loginPage.click()
    })
    if(!window.localStorage.getItem('game_token')){
        loginPage.click()
    }

    



    


}