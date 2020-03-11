const form=document.getElementById('form');
const username=document.getElementById('username');
const password=document.getElementById('password');
const error=document.getElementById('error');
const args=["a", "b", "c", "d", "e", "f", "g", "h","i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var Cargs=[];
args.forEach(element => {let e=element.toUpperCase();Cargs.push(e);});
const numbers =[1,2,3,4,5,6,7,8,9,0];
const home_url ='http://localhost/' ;
const login_url= 'http://localhost/login/' ;  

function ifin(x,sl){
    for (let i=0; i<sl.length; i++){
        if (sl[i]==x){
            return true;
        }else if(i==sl.length-1){return false};
    }

}

form.addEventListener('submit',function(e){
    e.preventDefault();
    formhandle();
    
})

function formhandle(){
    message=[];
    if(username.value.length <5 || username.value.length>20){
        message.push('usename length is too short or too long')
    }

    if(password.value.length <5 || username.value.length>20){
        message.push('password length is too short or too long')
    }

    for(e of username.value){
        if( (!ifin(e,args)) && (!ifin(e,Cargs)) && (!ifin(e,numbers)) ){
        message.push('unaccepted arguments');
        break;     
        }
    }

    for(e of password.value){
        if( (!ifin(e,args)) && (!ifin(e,Cargs)) && (!ifin(e,numbers)) ){
        message.push('unaccepted arguments');
        break;     
        }
    }

    if(message.length!=0){
        error.innerText=message[0];
    }else{
        const body={username:username.value, psw:password.value}
        fetch(login_url,{
            method: 'POST',
            body: JSON.stringify(body),
            headers:{'Content-Type':'application/json'}
        }).then(res=>{
              if(res.ok){return res.json()
              }
              return res.json().then(err=>{throw new Error(err.message)})
            }).then(token=>{
                //save the token
                //localStorage.setItem('tokensession', JSON.stringify(token));
                //console.log(token)
                window.location = home_url;
           }).catch(err=>{error.innerText=err})
    }
}