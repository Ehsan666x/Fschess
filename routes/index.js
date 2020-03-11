require('dotenv').config();
var express=require('express');
const multer=require('multer');
var router=express.Router();
var bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt= require('jsonwebtoken')
const { Pool } = require('pg')
const pool = new Pool({
    "host": "localhost",
    "port": 5432,
    "user":"postgres",
    "password" : "EAfree",
    "database" : "fschess",
    "max": 20,
    "connectionTimeoutMillis" : 0,
    "idleTimeoutMillis": 0
})
var cookie=require('cookie');

const login_schema = Joi.object({
    username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(2).max(20) .required(), 
    psw: Joi.string().min(5).max(50).required()

});

const reg_schema = Joi.object({
    username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(2).max(20) .required(),
    psw: Joi.string().min(5).max(50).required(),
    email: Joi.string().trim().email().required()
});

const editprofile_schema = Joi.object({
    description: Joi.string().trim().regex(/(^[a-zA-Z0-9_]*$)/),
    notepad: Joi.string().trim().regex(/(^[a-zA-Z0-9_]*$)/)
});

/////////////////////////////////////////////////////////////////

router.get('/',authenticateToken,function(req,res,next){
    
    if(req.user && req.user.username){
            res.setHeader("set-cookie",[`uname=${req.user.username}`]) //user.username
            // login page
              let text=  `select username as username,description as description,blitz as blitz,
              rapid as rapid,fide as fide,class_note as class_note,classic as classic,
              next_classes as next_classes,
              null as message,null as user1,null as user2,null as u1read,null as u2read
              from users where username=$1
              
              union all select user1 as username,null as description,null as blitz,
              null as rapid,null as fide,null as class_note,null as classic,
              null as next_classes,message as message,user1 as user1,user2 as user2,
              u1read as u1read,u2read as u2read from dms where user1=$1
              
              union all select user2 as username,null as description,null as blitz,
              null as rapid,null as fide,null as class_note,null as classic,
              null as next_classes,message as message,user1 as user1,user2 as user2,
              u1read as u1read,u2read as u2read from dms where user2=$1`;
            const query = {
                text: text,
                values: [req.user.username],
            }           
            ;(async () => {
                const {rows} = await pool.query(query)
                //console.log(rows) // [{id:..,email:...,..}]
                console.log(rows.length)
                return rows
                
              })().catch(err =>
                setImmediate(() => { 
                  throw err
                })
              ).then(rows=>{
                //console.log(rows)
                let read=true;
                  for (row of rows){
                      if(row.user1==req.user.username){if(!row.u1read){read=false;break}
                      }else if(row.user2==req.user.username){if(!row.u2read){read=false;break}}
                    }
                  //console.log(rows)
                  if(rows[0]){
                    rows[0].mread=read
                    return rows[0]
                  }
              })
              .then(user=>{
                if(user){
                    ejs_attributes={username:user.username,mread:user.mread}//username:user.username,discription:user.discription,blitz:user.blitz,fide:user.fide,rapid:user.rapid,mnotif:user.mnotif}
                    res.render('index',ejs_attributes)
                }else{
                    res.render('logged_out_index')
                } 

              })
            
            //render a logged in front page with user
    }else{
    res.render('logged_out_index')
    }
    
})



router.get('/profiles',authenticateToken,function(req,res,next){
    if(req.user && req.user.username){
        res.setHeader("set-cookie",[`uname=${req.user.username}`]) //user.username
        // login page
        const query = {
            text: 'SELECT * FROM users WHERE username=$1',
            values: [req.user.username],
        } 
        ;(async () => {
            const { rows } = await pool.query(query)
            //console.log(rows)
            return rows[0]
          })().catch(err =>
            setImmediate(() => { 
              console.log('catched error')  
              throw err
            })
          ).then(founduser=>{
            if(founduser){
                
                res.render('profile_index')
            }else{
                res.render('logged_out_index')
            }
          })
        
        
        
    }else{
        res.render('profile_index')
    }
    
})
 

function mid(req,res,next){next()}

router.get('/login',function(req,res,next){
    res.render('login')
    
})
router.get('/register',mid,function(req,res,next){
    
      res.render('register')
      //next()
})

router.get('/message',getMessages)

router.get('/:id',authenticateToken,function(req,res,next){

    if(req.params.id!='favicon.ico'){let parid=req.params.id;
        //console.log(parid);
        if(req.user && req.user.username){// we are logged in 
          let text=  `select username as username,description as description,blitz as blitz,
              rapid as rapid,fide as fide,class_note as class_note,classic as classic,
              next_classes as next_classes,
              null as message,null as user1,null as user2,null as u1read,null as u2read
              from users where username=$1
              
              union all select user1 as username,null as description,null as blitz,
              null as rapid,null as fide,null as class_note,null as classic,
              null as next_classes,message as message,user1 as user1,user2 as user2,
              u1read as u1read,u2read as u2read from dms where user1=$1
              
              union all select user2 as username,null as description,null as blitz,
              null as rapid,null as fide,null as class_note,null as classic,
              null as next_classes,message as message,user1 as user1,user2 as user2,
              u1read as u1read,u2read as u2read from dms where user2=$1`;
            //console.log(req.user)
           //res.setHeader("set-cookie",[`uname=${req.user.username}; httponly`]) //user.username
           //res.render('index');
            // login page
            //console.log("hi") 
            (async () => {
                const { rows } = await pool.query(text, [parid]) //rows={username:...,id:...,...}
                //console.log(rows)
                return rows
              })().catch(err =>
                setImmediate(() => { 
                  console.log('catched error')  
                  throw err
                })
              ).then(rows=>{
                let read=true;
                  for (row of rows){
                      if(row.user1==req.user.username){if(row.u1read==false){read=false;break}
                      }else if(row.user2==req.user.username){if(row.u2read==false){read=false;break}}
                    }
                  //console.log(rows)
                  if(rows[0]){
                    rows[0].mread=read
                    return rows[0]
                  }}
              ).then(r=>{
                //console.log(r)
                if(r){
                    if(parid==req.user.username){
                        ejs_attributes={username:req.user.username,description:r.description,blitz:r.blitz,rapid:r.rapid,role:r.role,fide:r.fide,classic:r.classic,note:r.class_note,mread:r.mread}
                        res.setHeader("set-cookie",[`uname=${req.user.username}`])
                        res.render('profile_index',ejs_attributes)
                    }else{
                      (async () => {
                        const { rows } = await pool.query('SELECT * FROM users WHERE username=$1', [parid]) //rows={username:...,id:...,...}
                        //console.log(rows)
                        return rows[0]
                      })().catch(err =>
                        setImmediate(() => { 
                          console.log('catched error')  
                          throw err
                        })
                      ).then(r=>{
                        ejs_attributes={username:req.user.username,description:r.description,blitz:r.blitz,rapid:r.rapid,role:r.role,fide:r.fide,classic:r.classic,note:r.class_note,mread:r.mread}
                        res.setHeader("set-cookie",[`uname=${req.user.username}`])                        
                        res.render('not_profile_index',ejs_attributes);  
                      })
                                    
                    }
                }else{
                    next(new Error('The page does not exist'))
                }
              })      
            
        }else{// we are logged out

            (async () => {
                const { rows } = await pool.query('SELECT username FROM users WHERE username = $1', [parid])
                //console.log(rows[0])
                return rows[0] //rows=[{username:something}]
              })().catch(err =>
                setImmediate(() => { 
                  throw err
                })
              ).then(r=>{
                if(r){
                    res.render('logged_out_profile_index')
                    
                }else{
                    console.log(parid,req.params)
                    next(new Error('The page does not exist'))
                }
              })
            
        }
        
    }
    
})

// router.get('/livegames',function(req,res){
//     res.render('livegames_index')
// })
// router.get('/:id',function(req,res){
//     res.render('livegames_index') 
// })



async function getMessages(req,res,next){
  let token=get_cookies(req)['Usession'];
  let ucookie=get_cookies(req)['uname'];
  let tuser;
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err){res.redirect('http://localhost/login')}else{tuser=user.username}
  })
  if(ucookie && tuser==ucookie){
    try {
        
      const query = {
            text: ' select * from dms where user1=$1 union all select * from dms where user2=$1 ',
            values: [ucookie],
      };
      (async () => {
          const {rows} = await pool.query(query)
          //console.log(rows)
          let mlist=[]
          for(m of rows){mlist.push([m.user1,m.u1read,m.user2,m.u2read,m.message])} //[ ["poki","essy",["poki:763783_hi","essy:864732_whatsup?"]],[...],[...] ]
          mlist.push(ucookie)
          return mlist
          
          
        })().catch(err =>
          setImmediate(() => { 
            throw err
          })
        ).then(li=>{
          if(li==null || li){
            //console.log(li)
              res.json(li)
            
          }else {
              res.status(422);
              let error= new Error('something went wrong');
              next(error);          
            }
      })

    
      
  } catch (error) {
      res.status(500);
      //err=new Error('Unable to login');
      next(error);
  }

  }else{
    res.status(404);
    res.redirect('http://localhost/login')}
}


var get_cookies = function(request) {
    var cookies = {};
    //console.log(request.headers.cookie)
    request.headers.cookie && request.headers.cookie.split(';').forEach(function(cookie) {
      var parts = cookie.match(/(.*?)=(.*)$/)
      cookies[ parts[1].trim() ] = (parts[2] || '').trim();
    });
    return cookies;
};

router.get('/cookies',function(req,res,next){
    iocookie=get_cookies(req)['de']
    console.log(iocookie);
    res.send(iocookie);
})



function authenticateToken(req,res,next){
    
    const authHeder= get_cookies(req)['Usession'];
    //console.log('from here')
    // get refresh token in cookie
    const token = authHeder;
    if (!token){
        next()
    }else{
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err){
                console.log('wrong token')
                next()
            }else{
                console.log('U token correct')
                req.user=user;
                next()
                

            }

        })

    }
    
}

async function insert (req,res,next){
    console.log("here")
    try {
          const hashed = await bcrypt.hash(req.body.psw, 12);
          const query = {
              text: 'INSERT INTO users(username,psw,email,role,active) VALUES($1, $2, $3 ,$4 ,$5)',
              values: [req.body.username,hashed,req.body.email,"user",true]
          }
          // 
          const insertedUser = await pool.query(query, (err, r) => {
              if (!err) {
                  //res.json()
              }else{
                  //res.status(500); 
                  error= new Error('already exists');
                  next(error);
              //throw err
            }
          })
          //createTokenSendResponse(insertedUser, res, next);
    } catch (error) {
      res.status(500);
      next(error);
    }
}


async function edit_profile(req,res,next){
    const token= get_cookies(req)['Usession'];
    await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err){
            next()
        }else{
            
            req.user=user;
            
            try {
                let query;
                //console.log(req.body)
                // console.log(user.username)
                if(req.body.description){
                    
                    query = {
                        text: 'UPDATE users SET description=$1 WHERE username=$2',
                        values: [JSON.stringify(req.body.description),user.username]
                    }
                    
                }else if(req.body.notepad){
                    query = {
                        text: 'UPDATE users SET class_note=$1 WHERE username=$2',
                        values: [JSON.stringify(req.body.notepad),user.username]
                    }
                }
                //console.log(query);
                pool.query(query           
                  ).then(r=>{
                      if(r){
                          res.json(r)
                      }else{
                        throw new Error('something went wrong')
                      }}).catch(err =>{
                          next(err)
                      }) 
                // const insertedUser = pool.query(query, (err, res) => {
                //     if (!err) {
                //         res.json()
                //     }else{throw new Error('something went wrong')}
                // })
                //createTokenSendResponse(insertedUser, res, next);
            } catch (error) {
                res.status(500);
                next(error);
            }  

        }

    })
    
    
    
}

function createTokenSendResponse (payload,user, res, next){
   
    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1024h'}, (err, token) => {
        if (err) {
          res.status(422);
          const error = new Error('Unable to login');
          next(error);
        } else {
        // login all good
          res.setHeader("set-cookie",[`Usession=${token};Path=/; httponly`]);
          res.json(user)
        }
      },
    );
};


async function login (req,res,next){
    try {
        
        const query = {
              text: 'SELECT * FROM users WHERE username=$1',
              values: [req.body.username],
        };
        //console.log(req.body.username); 
        // const founduser = await pool.query(query, (err, u) => {
        //       if (!err) {
        //           return u
        //       }
        // })
        (async () => {
            const {rows} = await pool.query(query)
            //console.log(rows)
            return rows[0]
            
          })().catch(err =>
            setImmediate(() => { 
              throw err
            })
          ).then(user=>{
            if(user.username){
                bcrypt.compare(req.body.psw,user.psw).then(result=>{
                    if (result) {
                        let payload={id:user.id, username:user.username, email:user.email}
                        createTokenSendResponse(payload,user, res, next);
                    } else {
                        res.status(422);
                        throw new Error('Unable to login');
                    }

                })
                
            }else {
                res.status(422);
                throw new Error('Unable to login');
            }
        })

        // if(founduser){
        //     const comp = await bcrypt.compare(
        //     req.body.password,
        //     founduser.rows[1]
        //     );
        //     if (comp) {
        //         let payload={id:founduser.rows[0], username:founduser.rows[1], email:founduser.rows[3]}
        //         createTokenSendResponse(payload, res, next);
        //       } else {
        //         res.status(422);
        //         throw new Error('Unable to login');
        //       }
        // }else {
        //     res.status(422);
        //     throw new Error('Unable to login');
        // }
        
    } catch (error) {
        res.status(500);
        //err=new Error('Unable to login');
        next(error);
    }
}


//defaultErrorMessage ? new Error(defaultErrorMessage) : 
function reg_validate(req,res,next){
    const result = reg_schema.validate(req.body);
    if (!result.error) {
      next();
    } else {
      const error = result.error;
      //res.status(422);
      next(error);
      
    }
}

function login_validate(req,res,next){
    const result = login_schema.validate(req.body);
    if (!result.error) {
      next();
    } else {
      const error = result.error;
      res.status(422);
      next(error);
    
    }
}
//defaultErrorMessage ? new Error(defaultErrorMessage) :
function editprofile_validation(req,res,next){
    
    const result = editprofile_schema.validate(req.body);
    if(!result.error){
        next();
    } else{
        const error =  result.error;
      res.status(422);
      next(error);
    }
}


// const storage=multer.diskStorage({
//   destination:'./staticassets/images/profile_pics',
//   filename: function(req,file,cb){
//      cb(null,'uploads.JPEG')
//   }
// })
// const upload=multer({
//   storage:storage

// }).single('infile');

async function save_pic(req,res,picfilename,ucookie){
  const storage=multer.diskStorage({
    destination:'./staticassets/images/profile_pics',
    filename: function(req,file,cb){
       cb(null,picfilename)
    }
  })
  const upload=multer({
    storage:storage
  
  }).single('infile');

  upload(req,res,(err)=>{ 
    if(err){res.send('error oops!')
    }else{res.redirect(`http://localhost/${ucookie}`)}
  })
}


async function send_notif(data){//data={uname: "poki" ,message:"poki:32t467356_hi",time:32t467356,receiver:"essy"}
   for(s of connected_clients){
     if (s.username==data.receiver){
       s.emit('new_dm',data);
     }
   }
}

router.post('/profiles',async (req,res)=>{
  

  let ucookie=get_cookies(req)['uname']
  if(ucookie){
    let picfilename=`${ucookie}.JPEG`
    save_pic(req,res,picfilename,ucookie);
    // upload(req,res,(err)=>{ 
    //   if(err){res.send('error oops!')
    //   }else{res.redirect(`http://localhost/${ucookie}`)}
    // })
    
  }else{
    res.redirect(`http://localhost/login`);
  } 
  
  console.log('uploaded')
  
})

router.post('/register',reg_validate, insert )


router.post('/login',login_validate, login)


router.post('/editprofile',editprofile_validation,edit_profile)

router.post('/message',authenticateToken,async function(req,res,next){

    //  query={
    //    text='select * from users inner join dms on user1=username and user1=$1 and user2=$2 union all select * from users inner join dms on user2=username and user1=$2 and user2=$1'
    //  }

    if(req.user && req.user.username){// we are logged in
      
        try {
            const username=req.user.username;
            const receiver=req.body && req.body.receiver;
            const message=req.body && req.body.message;
            const time=req.body && req.body.time;
            let data={uname:username,message:username+":"+message,time:time,receiver:receiver}
            // let data={uname:username,message:username+":"+time+"_"+message,time:time,receiver:receiver} 
            const query0={
              text:'SELECT * FROM users WHERE username=$1',
              values:[receiver]
            }
            const query = {
                text: 'SELECT * FROM dms WHERE (user1=$1 AND user2=$2) UNION ALL SELECT * FROM dms where (user1=$2 AND user2=$1)',
                values: [username,receiver]
            } 
            ;(async () => {
                const { rows } = await pool.query(query0)
                return rows[0]
              })().catch(err =>
                setImmediate(() => {
                  res.status(500)
                  res.json({message:'something went wrong'})  
                  throw err
                })
              ).then(r=>{
                if(!r){
                    //console.log(r)
                    res.status(404)
                    res.json({message:'user does not exist'})
                }else{ //search in dms
                  
                  (async () => {
                    const { rows } = await pool.query(query)
                    return rows[0]
                  })().catch(err =>
                    setImmediate(() => {
                      res.status(500)
                      res.json({message:'something went wrong'}) 
                      throw err
                    })
                  ).then(r=>{
                    if(!r){ // insert new rows in dms
                      let query1={
                        text: 'INSERT INTO dms (user1,user2,message,u1read,u2read) VALUES($1, $2, $3 ,$4 ,$5)',
                        values:[username,receiver,JSON.stringify([username+":"+time+"_"+message]),true,false]
                      }
                      const insertm = pool.query(query1,(err,r)=>{
                        if (err){res.status(500),res.json({message:'something went wrong'})
                        }else{next(data)}
                      })
                    }else{ //add message
                      //console.log(r)
                      r.message.push(`${username}:${time}_${message}`);
                      if(r.user1==username){r.u1read=true;r.u2read=false}else if(r.user2==username){r.u2read=true;r.u1read=false}
                      let query2={
                        text:'UPDATE dms SET message=$1,u1read=$2,u2read=$3 WHERE id in (SELECT id FROM dms WHERE (user1=$4 AND user2=$5) UNION ALL SELECT id FROM dms where (user1=$5 AND user2=$4))',
                        values:[JSON.stringify(r.message),r.u1read,r.u2read,username,receiver]
                      }
                      pool.query(query2,(err,re)=>{
                        if(err){
                          res.status(500); res.json({message:'something went wrong'})
                        }else{next(data)}
                      })

                    } 
                  }) 
                    
                }
              })
            //createTokenSendResponse(insertedUser, res, next);
      } catch (error) {
        res.status(500);
        res.json(error);
      }
    }else{
      res.status(500)
      res.redirect(`http://localhost/login`);
    }
})

router.put('/message',async function(req,res,next){
  const token= get_cookies(req)['Usession'];
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err){
            next()
        }else{
          //console.log(req.body)
          let data=req.body;
          if(data.u1==user.username || data.u2==user.username){
            try{
              let query={
                text: `UPDATE dms SET ${data.index}=true WHERE user1=$1 AND user2=$2 `,
                values: [data.u1,data.u2]
              }
              pool.query(query           
                ).then(r=>{
                    if(r){
                        res.json(r)
                    }else{
                      throw new Error('something went wrong')
                    }}).catch(err =>{
                        res.status(500)
                        next(err)
                    }) 
  
            }catch(error){
              res.status(500)
               next(error)
            }
          }
          
        }

  })
})

getuserdata=async function (username){
      
              let u;
              const query = {
                text: 'SELECT * FROM users WHERE username=$1',
                values: [username]
            } 
            ;let user = await (async () => {
                const { rows } = await pool.query(query)
                //console.log(rows)
                return rows[0]
              })().catch(err =>
                setImmediate(() => { 
                  console.log('catched error')
                  u=false;  
                  //throw err
                })
              ).then(founduser=>{
                if(founduser){
                    
                  u=founduser
                }else{
                  u=false
                }
                return u
              })
          return user

}
      
      



module.exports={indexrouter:router,getuserdata:getuserdata}
