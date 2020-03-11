

const chatbox=document.getElementById('chatbox');
const chat_send_area=document.getElementById('chat_send_area');
const chat_send=document.getElementById('chat_send');



function chat (){
 
    if(chat_send_area.value){
        let raw_time=new Date().getTime();
        let chat_time=new Date(raw_time).getHours()+":" + new Date(raw_time).getMinutes();
        let c=` <p class="p_message">
                <span class="chat_time">${chat_time} </span><span class="chat_username">${Myusername}:</span>
                <span class="chat_text">${chat_send_area.value}</span>
        </p>
        `
        let new_p=document.createElement('p');
        new_p.className="chat_message";
        var template = ejs.render(c);
        new_p.innerHTML=template;
        chatbox.appendChild(new_p);
        let m=chat_send_area.value
        
        socket.emit('community_chat',{profile:Myusername,otherprofile:other_room,message:m,time:chat_time})
        chat_send_area.value="";
    }
}

socket.on('profile_chat_broadcasted',function(data){
    let chat_time=data.time;
    let message=data.message;
    let uname=data.profile;
    let c=` <p class="p_message">
              <span class="chat_time">${chat_time} </span><span class="chat_username">${uname}:</span>
              <span class="chat_text">${message}</span>
     </p>
    `
    let new_p=document.createElement('p');
    new_p.className="chat_message";
    var template = ejs.render(c);
    new_p.innerHTML=template;
    chatbox.appendChild(new_p);
})
