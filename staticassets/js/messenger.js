



const m=document.getElementById("messenger");
const message_input=document.getElementById("message");
const receiver=document.getElementById("receiver");
const m_sidebar=document.getElementById('messenger_sidebar_container');
const messenger_body=document.getElementById('messenger_body');
const messenger_body_container=document.getElementById('messenger_body_container');
const message_notif=document.getElementById('message_notif');




const message_url ='http://localhost/message' ; 


const argus=["a", "b", "c", "d", "e", "f", "g", "h","i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var Carguments=[];
argus.forEach(element => {let e=element.toUpperCase();Carguments.push(e);});
const numbs =[1,2,3,4,5,6,7,8,9,0,'.','!','?'];

var DMs;
const new_dms=[];

async function show_messenger(){
    message_notif.style.display="none";
    m.style.display="block";
    if(!DMs){
        fetch('http://localhost/message').then(r=>{
            if(r.ok){return r.json()}
            return r.json().then(err=>{throw new Error(err.message)})
        }).then(m=>{
            if(m==null){DMs=[];return
            }else{
                
                DMs=m; //[ ["poki:763783_hi","essy:864732_whatsup?"],[...],[...] ]
                //console.log(DMs)
                attachdms(DMs);
            }
            
        }).catch(e=>{throw e})  
    }else{
    //    attachdms(DMs)
    }
  
  
}


function attachdms(mlist){ //[ ["poki","true","essy","true",["poki:763783_hi",essy:864732_whatsup?"]],[...],[...],"essy" ]
    m_sidebar.innerHTML='';
    messenger_body.innerHTML='';
    let ukookie=mlist[mlist.length-1];
    console.log(ukookie)
    for(ar of mlist){
        if(ar && typeof(ar)!='string'){
            let u1=ar[0];
            let u2=ar[2];
            let theaddresser;
            let arr=ar[4];           
            if(u1!=ukookie && u2==ukookie){theaddresser=u1}else if(u1==ukookie && u2!=ukookie){theaddresser=u2}
            // let arr_index=mlist.indexOf(arr);
            let arr_length=arr.length;
            //console.log(arr_length)
            let arr_last_rm = arr[arr.length-1];
            
            arr_content=message_parser(arr_last_rm);
            //if(ukookie!=arr_content[0]){ukookie=arr_content[0]}

            let new_div= document.createElement('div');
            new_div.className="side_dm";
            new_div.innerText=theaddresser;
            let new_span=document.createElement('span');
            new_span.className="notification"
            // new_span.innerText='new';
            new_div.appendChild(new_span);
            m_sidebar.appendChild(new_div);
            if((u1==ukookie && ar[1]==true)||(u2==ukookie && ar[3]==true)){new_span.style.display='none'}
            bind_message(new_div,ar,arr_length,ukookie,theaddresser);
            // new_div.addEventListener('click',function(e){
            //     console.log(this)
            //     if (messenger_body.firstChild){messenger_body.innerText='';messenger_body.removeChild}
            //      for(let i=0;i<arr_length;i++){
            //         let a_cont=message_parser(arr[i]);
            //         console.log(a_cont);
            //         let new_div= document.createElement('div');
            //         new_div.className="m_dm";
            //         new_div.innerText=`${a_cont[2]}`;
            //         messenger_body.appendChild(new_div);

            //      }
            // })
        }  
     } 
}

function bind_message(new_div,ar,arr_length,ukookie,theaddresser){
    // if(theaddresser){
    //     let ukname=document.createElement('div');
    //     ukname.innerText=theaddresser;
    //     ukname.style.background='white'
    //     messenger_body_container.appendChild(ukname); 
    // }
    let arr=ar[4];
    new_div.addEventListener('click',function(e){
        //console.log(this)
        if (messenger_body.firstChild){messenger_body.innerText='';messenger_body.removeChild}
        receiver.value=theaddresser;
         for(let i=0;i<arr_length;i++){
            let a_cont=message_parser(arr[i]);
            //console.log(a_cont);
            let new_div= document.createElement('div');
            new_div.className="m_dm";
            new_div.innerText=`${a_cont[2]}`;           

            let new_div_time=document.createElement('div');
            let time=new Date(a_cont[1]).toLocaleTimeString()+' '+new Date(a_cont[1]).toLocaleDateString();
            new_div_time.innerText=time;
            new_div_time.style.fontSize='10px'
            messenger_body.appendChild(new_div);
            new_div.appendChild(new_div_time);
            //console.log(ar[0],ar[1]);
            
           
            if(i==arr_length-1 && new_dms.length){
                //onsole.log('new_dms')
                for(dm of new_dms){
                    //console.log(dm)
                    if(dm[1]==theaddresser){
                        messenger_body.appendChild(dm[0])
                    }
                }
            }
            
         }
         if(ar[0]==ukookie){
            console.log(ar,ukookie)
            if(!ar[1] || ar[1]=='false'){
                console.log('fetching')
                change_read_status(ukookie,theaddresser,'u1read');
                ar[1]=true;
                new_div.innerHTML=theaddresser;
            }
        }else if(ar[2]==ukookie){
            console.log(ar,ukookie)
            if(!ar[3] || ar[3]=='false'){
                console.log('fetching')
                change_read_status(theaddresser,ukookie,'u2read')
                ar[3]=true;
                new_div.innerHTML=theaddresser;
            }
        }
    })
}


async function change_read_status(u1,u2,index){
    console.log('fetching..')
    fetch('http://localhost/message',{
        method:'PUT',
        body:JSON.stringify({u1:u1,u2:u2,index:index}),
        headers:{'Content-Type':'application/json'}
    }).then(async r=>{
            if(r.ok){
                for(arr of DMs){
                    if(arr[0]==u1 && arr[2]==u2 && index=='u1read'){
                       arr[1]=true;
                    }else if(arr[2]==u1 && arr[0]==u2 && index=='u2read'){
                        arr[3]=true
                    }
                }
                return r.json()
            }
            const err = await r.json();
        throw new Error('something went wrong');
        }).then(m=>{
            if(m){
                console.log('read');
            }
            
        }).catch(e=>{throw e}) 
}




function message_parser(arr_last_rm){
    let arr_last_m='';
    let arr_last_name='';
    let arr_last_time='';
    let j=0;
    let z=0;
    for(let i=0;i<arr_last_rm.length;i++){if(arr_last_rm[i]=="_"){
        j=i;
        break;
    }}
    for (let q=j+1;q<arr_last_rm.length;q++){
        arr_last_m=arr_last_m + arr_last_rm[q]
    }
    
    for(let i=0;i<arr_last_rm.length;i++){
        if(arr_last_rm[i]!=":"){
            arr_last_name=arr_last_name + arr_last_rm[i];
        }else{
            z=i     
            break;
        }
    }
    for(let i=z+1;i<j;i++){
        arr_last_time=arr_last_time+arr_last_rm[i]
    }
   // console.log(arr_last_time)
    arr_last_time=parseInt(arr_last_time,10);
    
    arr_last_m=arr_last_name+':  '+arr_last_m;
    return [arr_last_name,arr_last_time,arr_last_m]
}



function m_cloce(){
    m.style.display="none";
}

function change_color(){
    message_input.style.color="black";
}

function send_message(){
    message=[];
    if(receiver.value.length <1 || receiver.value.length>20){
        message.push('usename length is too short or too long')
    }

    if(message_input.value.length <1 || receiver.value.length>300){
        message.push('message_input length is too short or too long')
    }

    for(e of receiver.value){
        if( (!ifin(e,argus)) && (!ifin(e,Carguments)) && (!ifin(e,numbs)) ){
        message.push('unaccepted argus');
        break;     
        }
    }

    for(e of message_input.value){
        if( (!ifin(e,argus)) && (!ifin(e,Carguments)) && (!ifin(e,numbs)) ){
        message.push('unaccepted argus');
        break;     
        }
    }

    if(message.length!=0){
        message_input.style.color="red";
        message_input.value=message[0];
        
    }else{
        let time=new Date().getTime();
        const m={receiver:receiver.value, message:message_input.value,time:time}
        fetch(message_url,{
            method: 'POST',
            body: JSON.stringify(m),
            headers:{'Content-Type':'application/json'}
        }).then(result=>{
              if(result.status==200){console.log(result.status);return result}
              return result.json().then(er=>{throw er})
              
            }).then(r=>{
                
                let new_div= document.createElement('div');
                new_div.className="m_dm";
                let uname=get_cookies()['uname'];
                new_div.innerText=uname+":"+m.message;
                let new_div_time=document.createElement('div');
                let timestring=new Date(time).toLocaleTimeString()+' '+new Date(time).toLocaleDateString();
                new_div_time.innerText=timestring;
                new_div_time.style.fontSize='10px'
                messenger_body.appendChild(new_div);
                new_div.appendChild(new_div_time);
                message_input.value=" ";
                new_dms.push([new_div,m.receiver,true]) 
                
           }).catch(err=>{message_input.style.color="red"; message_input.value=err.message })
    }
}
socket.on('new_dm',function(data){ //data={uname: "poki" ,message:"poki:32t467356_hi",time:32t467356,receiver:"essy"}
        console.log(data);
        message_notif.style.display="block";
        let time=data.time;
        let new_div= document.createElement('div');
        new_div.className="m_dm";
        new_div.innerText=data.message;
        let new_div_time=document.createElement('div');
        let timestring=new Date(time).toLocaleTimeString()+' '+new Date(time).toLocaleDateString();
        new_div_time.innerText=timestring;
        new_div_time.style.fontSize='10px'
        new_div.appendChild(new_div_time);
        let m_list=document.querySelectorAll('.side_dm');
        for(element of m_list){if(element.innerText==data.uname){
            new_dms.push([new_div,data.uname,false]);
            break;
            }else if(element==m_list[m_list.length-1]){
                if(DMs){
                    let new_div2= document.createElement('div');
                    new_div2.className="side_dm";
                    new_div2.innerText=data.uname;
                    m_sidebar.appendChild(new_div2);
                        // ar=[ ["poki","true","essy","true",["poki:763783_hi",essy:864732_whatsup?"]]
                    let ar=[[data.uname,true,Myusername,false,[data.uname+":"+data.time+"_"+data.message]]]
                    let arr_length=1;
                    bind_message(new_div2,ar,arr_length,data.receiver,data.uname);
                }

                

            }
        }
         

})


