const form=document.getElementById('form');
const username=document.getElementById('username');
const password=document.getElementById('password');
const repeat_password=document.getElementById('repeat_password');
const error=document.getElementById('error');
const args=["a", "b", "c", "d", "e", "f", "g", "h","i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var Cargs=[];
args.forEach(element => {let e=element.toUpperCase();Cargs.push(e);});
const numbers =[1,2,3,4,5,6,7,8,9,0];
const API_URL='http://localhost/register';    
const login_url ='http://localhost/' ;  

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
    error.innerText='';
    
    message=[];

    if(password.value!=repeat_password.value){
        message.push('the two passwords dont match'
    )}

    if(username.value.length <5 || username.value.length>20){
        message.push('usename length is too short or too long')
    }

    if(password.value.length <5 || username.value.length>20){
        message.push('password length is too short or too long')
    }

    if(email.value.length>50){message.push('email is too long')}

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
        const body={username:username.value, email:email.value, psw:password.value}
        fetch(API_URL,{
            method: 'POST',
            body: JSON.stringify(body),
            headers:{'Content-Type':'application/json'}
        }).then(res=>{
              if(res.ok){return res.json()
              }
              return res.json().then(err=>{throw new Error(err.message)})
            }).then(data=>{
                //success register go to another page
                // render ejs?
                //window.location = login_url;
                console.log(data)
           }).catch(err=>{error.innerText=err})
    }
}