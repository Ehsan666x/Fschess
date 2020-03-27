const alphabets=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
require('dotenv').config();
const jwt= require('jsonwebtoken');
var express=require('express');
var socket=require('socket.io');
var path=require('path');
var app=express();
var {indexrouter,getuserdata}=require('./routes/index');
var livegamesrouter=require('./routes/livegames');
var favicon=require('serve-favicon');
var cookie=require('cookie');

var server=app.listen(80,function(){
    console.log("port 80");
})

const connected_clients=[];

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(__dirname,'staticassets/layout')));

//app.use('/staticassets',express.static('staticassets')); 
//app.use(express.static('staticassets/layout'));
app.use('/staticassets',express.static(path.join(__dirname,'staticassets')));
app.use(favicon(__dirname + '/staticassets/images/favicon.ico'));
app.post('/message',indexrouter,send_notif);
app.use('/livegames',livegamesrouter); 
app.use('/',indexrouter);
//app.use('/favicon.io',function(req,res,next){res.send('no favicon')})


async function send_notif(data,req,res,next){//data={uname: "poki" ,message:"poki:32t467356_hi",time:32t467356,receiver:"essy"}
   console.log('send notif')
   for(s of connected_clients){
     console.log(s.username)
     if (s.username==data.receiver){
         
         console.log('s matches')
       s.emit('new_dm',data);
     }
   }
   res.status(200)
   res.json();
}




function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`Not Found`);
    console.log('what error')
    next(error);
}
  
function errorHandler(err, req, res, next) {
    res.status(500);
    res.json({
      message: err.message,
    });
    console.log(err); 
}
  
app.use(notFound);
app.use(errorHandler);


var io=socket(server);

var unrated_lobby=[1];
var rated_lobby=[1]
var room=[];

io.on('connection',function(s){
    console.log("socket connected",s.id);
    //console.log(io.sockets.clients())
    if(s.handshake.headers.cookie){s.username=cookie.parse(s.handshake.headers.cookie).uname}
    //console.log(s.username);
    connected_clients.push(s)
    // s.on('disconnect',function(){
    //     console.log("user left");
    //     if(s.roomname){for (let i=0;i<room.length;i++){if(room[i].roomname==s.roomname){room.splice(i,1)}}}
    //     for (let i=0;i<connected_clients.length;i++){if(connected_clients[i]==s){connected_clients.splice(i,1)}}
    //     console.log(connected_clients.length)
    // });   
 
     s.on('community_chat',function(data){
         console.log('comunity chat' +data.profile)
         if(data.otherprofile){
             s.to(data.profile).to(data.otherprofile).emit('profile_chat_broadcasted',data)
         }else{
             s.broadcast.to(data.profile).emit('profile_chat_broadcasted',data)
         }

     })     

 
     s.on("game-request",function(gamedata){
        if(s.handshake.headers.cookie){
            let token= cookie.parse(s.handshake.headers.cookie).Usession;
            let gtype= cookie.parse(s.handshake.headers.cookie).gtype;
            let grated= cookie.parse(s.handshake.headers.cookie).grated;
            let time_control=gamedata.time_control;
            let increment=gamedata.time_control.split('+')[1]
            let ip = s.request.connection.remoteAddress;
            console.log(ip);
                if(token){
                    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
                        if(err){
                            console.log('wrong token')                    
                        }else{
                            (async()=>{u=await getuserdata(user.username); return u})().then(u=>{
                                console.log(u.classic)
                                lobby_matcher2(s,{increment:increment,time_control:time_control,ip:ip,username:user.username,gtype:gamedata.gtype,grated:grated,rating:u.classic},rated_lobby)
                            }).catch(e=>{console.log(e)})
                            
                        }
                    })
                }else{lobby_matcher2(s,{increment:increment,time_control:time_control,ip:ip,username:undefined,gtype:gamedata.gtype,grated:'unrated'},unrated_lobby)}
            }
            //lobby_matcher(s,gamedata,unrated_lobby,false)        
            //s.on("disconnect",function(){updatecurrentgames();console.log("one user now disconnected")});
        }//
     )

    s.on('request_initials',function(data){ // own profile page
        if(data.username){
            console.log(data.username)
            s.join(data.username);
            for (r of room){if((r.d.u1==data.username || r.d.u2==data.username) && (s.request.connection.remoteAddress==r.ip1 ||s.request.connection.remoteAddress==r.ip2)){ // and if s.ip== u1.ip||u2.ip
                s.emit('initials',r.d)
                let data2;
                if(r.d.u1==data.username){data2=r.d.u2}else{data2=r.d.u1}
                //accept_move_update(s,data.username,data2)
            }}
        }else{
            s.join(data.roomname);
            for(r of room){if(r.d.roomname==data.roomname && (s.request.connection.remoteAddress==r.ip1 ||s.request.connection.remoteAddress==r.ip2)){ // and ip match
               s.emit('initials',r.d)
               //accept_move_update(s,data.roomname)
            }}
        }
    })
    s.on('request_profile_livegame',function(username){ // other profile page
        s.join(username); //for community chat and live games
        console.log(username)
        for(r of room){if(r.d.u1==username || r.d.u2==username){          
            s.emit('initials',r.d);
            break;
        }}
    })
    s.on('disconnect',function(){
        console.log("user left");
        //if(s.username){for (let i=0;i<room.length;i++){if(room[i].u1==s.username || room[i].u2==s.username){room.splice(i,1)}}}
        for (let i=0;i<connected_clients.length;i++){if(connected_clients[i]==s){connected_clients.splice(i,1)}}
        console.log(connected_clients.length)
    });

    s.on('move_update',function(move_data){
        if(move_data.otherprofile){
            
            for(r of room){if( (r.d && r.d.u1==move_data.profile) || (r.d&&r.d.u1==move_data.otherprofile)){
                if(!r.d.st){let st=new Date();r.d.st=st;r.d.t1=[st];r.d.t2=[st];move_data.mytime=st;move_data.othertime=st;move_data.st=st;
                }else{
                    move_data.st=r.d.st;
                    if(move_data.profile==r.d.u1){
                        r.d.t1.push(new Date())
                        //r.d.t1.push(new Date(new Date().getTime()-r.d.initials.increment*1000))
                        move_data.othertime=r.d.t1[r.d.t1.length-1];
                        move_data.mytime=r.d.t2[r.d.t2.length-1];
                    }else if(move_data.profile==r.d.u2){
                        r.d.t2.push(new Date())
                        //r.d.t2.push(new Date(new Date().getTime()-r.d.initials.increment*1000))
                        move_data.mytime=r.d.t1[r.d.t1.length-1];
                        move_data.othertime=r.d.t2[r.d.t2.length-1]; 
                        console.log(move_data.othertime)
                    }                 
                }
                s.to(move_data.profile).to(move_data.otherprofile).emit('move_update_broadcasted',move_data);
                r.d.PGN=move_data.PGN;
                break;              
            }}
        }else{           
            console.log("unrated broadcast" + move_data.roomname)
            for(r of room){if(r.d&&r.d.roomname==move_data.roomname){
                if(!r.d.st){let st=new Date();r.d.st=st;r.d.t1=[st];r.d.t2=[st];move_data.othertime=st;move_data.mytime=st;move_data.st=st;
                }else{
                    move_data.st=r.d.st; 
                    if(s.request.connection.remoteAddress==r.ip1){
                        //r.d.t1.push(new Date(new Date()+r.d.initials.increment*1000))
                        r.d.t1.push(new Date())
                        move_data.othertime=r.d.t1[r.d.t1.length-1];
                        move_data.mytime=r.d.t2[r.d.t2.length-1];        

                    }else if(s.request.connection.remoteAddress==r.ip2){
                        //r.d.t2.push(new Date(new Date()+r.d.initials.increment*1000) )
                        r.d.t2.push(new Date())
                        move_data.mytime=r.d.t1[r.d.t1.length-1];
                        move_data.othertime=r.d.t2[r.d.t2.length-1];
                    }
                }
                s.broadcast.to(move_data.roomname).emit('move_update_broadcasted',move_data);               
                r.d.PGN=move_data.PGN;
                break;
            }
        }}

    })
    

})

function lobby_matcher(s,gamedata,lobby,rated=true){
     //console.log(gamedata);
     let match=false;
     for(let i=0;i<lobby.length; i++){
         
         if(lobby[i].gtype==gamedata.gtype ){
             match=true;
             let col;
             if(lobby[i].color=="white"){col="black"}else{col="white"};
             s.emit("game-request-result",{result:"match",room:`${lobby[i].roomname}`,col:`${col}`})
             let roomn=lobby[i].roomname
            //  io.of(`/${room}/`).on("connection",function(sucket){
            //     console.log("livegames new socket");
                
            // })
             lobby[i].join(roomn);
             s.join(roomn);
             console.log("players joined");
             roomdata={
                 link:`http://localhost/${lobby[i].roomname}`,
                 gtype:`${lobby[i].gtype}`,
                 color:`${lobby[i].color}`,
                 roomname:`${lobby[i].roomname}`,
                 playercount:0,
                 a1:`${lobby[i].a1}`,
                 b1:`${lobby[i].b1}`,
                 c1:`${lobby[i].c1}`,
                 d1:`${lobby[i].d1}`,
                 e1:`${lobby[i].e1}`,
                 f1:`${lobby[i].f1}`,
                 g1:`${lobby[i].g1}`,
                 h1:`${lobby[i].h1}`,
                }
             newroom(roomdata);
             room.push({roomname:roomdata.roomname,link:roomdata.link});
             s.to(roomdata.roomname).on('move_update',function(move_data){
                 for(r of room){if(r.roomname==roomdata.roomname){r.PGN=move_data.PGN}}
                 s.broadcast.to(roomdata.roomname).emit('move_update',move_data)
                 //send_livegames(roomdata.roomname,move_data);
                });
            //  lobby[i].on('move_update',function(move_data){lobby[i].broadcast.emit('move_update',move_data)});
             lobby.splice(i, 1);

             
             
         }else if(i==lobby.length-1 && match==false){
             s.emit("game-request-result",{result:"no match"})
             s.on("nomatch-positions",function(nmp){
                 
                 s.roomname=randomroom();
                 rn=s.roomname;
                 s.color=nmp.color;
                 s.gtype=nmp.gtype;
                 s.a1=nmp.a1;
                 s.b1=nmp.b1;
                 s.c1=nmp.c1;
                 s.d1=nmp.d1;
                 s.e1=nmp.e1;
                 s.f1=nmp.f1;
                 s.g1=nmp.g1;
                 s.h1=nmp.h1;

                 lobby.push(s);
                 s.to(`${s.roomname}`).on('move_update',function(move_data){
                     console.log(s.roomname,"this is the room name")
                     for(r of room){if(r.roomname==roomdata.roomname){r.PGN=move_data.PGN}}
                     s.broadcast.to(s.roomname).emit('move_update',move_data);
                     //send_livegames(s.roomname,move_data);
                    });
                 console.log("new player added to lobby");

             })
         }
     }
}

 
function lobby_matcher2(s,gamedata,lobby){ //gamedata={gtype:..,grated:...}
    let match=false;
    
    if(gamedata.username){for(let i=0;i<lobby.length; i++){if(lobby[i].initials&&lobby[i].initials.u1==gamedata.username){lobby.splice(i,1)}}}
    
    for(let i=0;i<lobby.length; i++){
           
        if(lobby[i].initials && lobby[i].initials.gtype==gamedata.gtype && lobby[i].initials.time_control==gamedata.time_control ){
            console.log('match')
            match=true;
            let col2;
            if(lobby[i].initials.col1=="white"){col2="black"}else{col2="white"}
            let new_room;
            if(gamedata.username){
                
                new_room={d:{PGN:false,u1:lobby[i].username,u2:gamedata.username,rating1:lobby[i].initials.rating1,rating2:gamedata.rating,PGN:false,initials:lobby[i].initials,col1:lobby[i].initials.col1,col2:col2},ip2:gamedata.ip,ip1:lobby[i].initials.ip};               
                room.push(new_room);
                lobby[i].join(lobby[i].initials.u1)
                s.join(gamedata.username)
                newroom(lobby[i],s,new_room.d,new_room.d.u2,new_room.d.u1);
                //newroom(lobby[i],new_room.d.u1,new_room.d.u2);
                //accept_move_update(s,new_room.d.u2,new_room.d.u1);
                //accept_move_update(lobby[i],new_room.d.u1,new_room.d.u2);
                lobby.splice(i, 1);                    
                break;
            }else{//s.emit("game-request-result",{result:"match",username:undefined,roomname:lobby[i].roomname});
                
                new_room={d:{PGN:false,initials:lobby[i].initials ,roomname:lobby[i].initials.roomname,col1:lobby[i].initials.col1,col2:col2},ip2:gamedata.ip,ip1:lobby[i].initials.ip};
                room.push(new_room);
                s.join(lobby[i].initials.roomname);
                lobby[i].join(lobby[i].initials.roomname);
                newroom(lobby[i],s,new_room.d,new_room.d.roomname);
                //newroom(lobby[i],new_room.d,new_room.d.roomname);
                //accept_move_update(s,new_room.d.roomname);
                //accept_move_update(lobby[i],new_room.d.roomname);
                lobby.splice(i, 1);
                break;
            }           
           //  lobby[i].on('move_update',function(move_data){lobby[i].broadcast.emit('move_update',move_data)});                      
            
        }else if(i==lobby.length-1 && match==false) {
            
            if(gamedata.username){
                console.log('one')
                s.emit("game-request-result",{result:"no match",username:gamedata.username})            
                s.once("nomatch-positions",function(nmp){
                    console.log('two')                   
                    //s.roomname=randomroom();
                    s.username=nmp.username;
                    s.initials={increment:gamedata.increment,time_control:gamedata.time_control,rating1:gamedata.rating,u1:gamedata.username,ip:gamedata.ip,col1:nmp.color,gtype:nmp.gtype,a1:nmp.a1,b1:nmp.b1,c1:nmp.c1,d1:nmp.d1,e1:nmp.e1,f1:nmp.f1,g1:nmp.g1,h1:nmp.h1}
                    lobby.push(s);
                                        
                })
            }else{
                 let rname=randomroom();
                 s.emit("game-request-result",{result:"no match",username:undefined,roomname:rname})
                 s.once("nomatch-positions",function(nmp){
                    
                    s.initials={increment:gamedata.increment,time_control:gamedata.time_control,roomname:rname,ip:gamedata.ip,col1:nmp.color,gtype:nmp.gtype,a1:nmp.a1,b1:nmp.b1,c1:nmp.c1,d1:nmp.d1,e1:nmp.e1,f1:nmp.f1,g1:nmp.g1,h1:nmp.h1}
                    lobby.push(s);
                    console.log(lobby.length)
                })
            }
        }
    }
}



    
function randomroom(){
    let a="";
    for (let i=0;i<15;i++){
   let le= alphabets[Math.floor(Math.random() *alphabets.length)];
   a=`${a}`+`${le}`
    }
   return a;
}  

var name;
function newroom(s1,s2,d,data1,data2=false){

    //s.emit("game-request-result",{result:"match",username:undefined,roomname:lobby[i].roomname})
    //io.to(roomdata.roomname).emit("roomlink",roomdata);
    //io.to(new_room.roomname).emit("game-request-result",d)
    //io.emit("currentgames",{link:roomdata.link,name:roomdata.roomname});
    //app.use(`/${roomdata.roomname}`,express.static('JVS-chess'));  
    //roomdata.playercount=roomdata.playercount+1;
    //console.log(roomdata.playercount);
    //console.log("livegames new socket");
    // io.of(roomdata.roomname).on("move_update", function(data){
    
    // })
    if(data2){

        io.to(data1).to(data2).emit('initials',d);
    
        console.log('initials sent')
        //accept_move_update(s,data1,data2);
        //accept_move_update(s2,data1,data2);
    }else{
        d.color=d.col1
        s1.emit('initials',d)
        d.color=d.col2
        s2.emit('initials',d)
        //accept_move_update(s1,data1);
        //accept_move_update(s2,data1);
    }
    
    
} 

function accept_move_update(s,data1,data2=false){
    if(data2){ 
        s.in(data1).on('move_update',function(move_data){ // if (move_data.otherprofile)
            
            s.to(data1).to(data2).emit('move_update_broadcasted',move_data);
            for(r of room){if( (r.d && r.d.u1==data1) || (r.d&&r.d.u1==data2)){
                r.d.PGN=move_data.PGN;
               
                break;
            }}
        });
        
    }else{
        s.in(data1).on('move_update',function(move_data){
            s.broadcast.to(data1).emit('move_update_broadcasted',move_data);
            for(r of room){if(r.d&&r.d.roomname==data1){
                r.d.PGN=move_data.PGN;
                break;
            }}
        });
        
    }
}


          
// lgsl=[];  
const nsp = io.of('/livegames');
nsp.on('connection', function(s){
    // lgsl.push(lgsl);  
  s.emit('move',{m:"mov"});
    console.log("l........");
    s.on('updatelivegames',function(){
        s.emit("livegames",{r:room});
        s.on('joinrequest',function(data){
            console.log(data.room, "does this room name match?");
            s.join(data.room)})         
    })
    // s.on('disconnect',function(){
    //     for(let i=0;i<lgsl.length; i++){
    //         if (s==lgsl[i]){lgsl.splice(i, 1);}
    // }})    
});

 const gc=io.of('/general_chat');
 gc.on('connection',function(s){
    s.on('general_chat',function(data){
         console.log('gc rec')
         s.broadcast.emit('general_chat_broadcasted',data)
    })
 })




function send_livegames(roomname,move_data){
    io.of(`/livegames/${roomname}`).emit('move_update',move_data);
}

// io.to('/livegames').emit('hi',{h:'hi'})

io.on("reconnect",function(){
    console.log("reconnect")
// socket.join(name);
// socket.emit("roomdata",roomdata);

})

function updatelivegames(){
    io.emit("livegames",{r:room});
}



//next:
// handle errors => client side=> wrong argumets / empty fields

//               => server side=> wrong argumets/ empty fields (joi) => result.error =>error handler middleware res.json({er:err.message})
//                             => user or email already exists => err=new Error('already exists') => error handler middleware
//                             => wrong password =>  throw catch error 
//                             => wrong username => throw catch error
//                             => fail to read from db  => catch and send the error
//                             => fail to insert into db => catch and send the error

// token after login 


// get request to profile=>
// if (token){
//     read token
//       if(valid){
//          read username attributes,
//              if(username==profilename){
//                  render profile ejs with json attributes 
//                  => client get attributes update ejs, set attributes to cookies connect to socket.io 
//                  => server gets cookies from socket.io set username attribute to sockets
//               }else{
//                   render view only profile + logged in nav
//               }  
//       }else{
//       render view only profile + logged out nav
//       } 
//     
// }else{
//   render view only profile + logged out nav 
// }
//
//
//get request to homepage=>
// if (token){
//     read token
//       if(valid){
//              read  attributes      
//              render home ejs with json attributes 
//              => client get attributes update ejs, save attributes in cookies connect to socket.io 
//              => server gets cookies from socket.io set username attribute to sockets     
//                
//        }else{
//            render guess home
//        } 
//     
// }else{
//   render guess home 
// }
