
const socket=io.connect('http://localhost');

//socket.on("toroom",function(data){console.log(data)})
    
window.onload=function(){
    
    //const livegames_socket=io.connect('http://localhost/livegames');
    
    
        //socket.emit("dis",{m:"diss"});
        // socket.emit("disconnect",function(){
        // socket.disconnect()}
        // );
    
        // socket.emit("dis"
    
        // );
    
        
    socket.emit("join",{room:"games"})
    
    const numbers=[0,1,2,3,4,5,6,7];
    const letters=["a","b","c","d","e","f","g","h"];
    var board=document.querySelector('.board');
    const sqrs= document.querySelectorAll('.sqr');
    const r8=[0,1,2,3,4,5,6,7];
    const play_btn=document.getElementById("board_side_play");
    const classbtn=document.querySelector(".btn");
    const promotion=document.querySelector(".promotion");
    const playbtn=document.getElementById("playbtn");
    const Fischer_random=document.getElementById("Fischer_random");
    const Standard=document.getElementById("Standard");
    let standard=true;
    let fischerandom=false;
    const livegames=document.getElementById('livegames');
    var livegamesbox=document.getElementById('livegamesbox');

    // livegames.addEventListener('click', eventhandler);
    // function eventhandler(){
    //     console.log('ask for livegames')
    //     // c=`<div id="livelist">
    //     // <div id="livelistbox">Live Games</div>
    //     // <div id="livelistsearch">search</div>
    //     // <div id="livelist_area"></div>
    //     // </div>` 
    //     // var template = ejs.render(c);
    //     // livegamesbox.innerHTML = template;
        
    //     // while(livegames.firstElementChild){livegames.firstElementChild.remove()}
    //     socket.emit('updatelivegames')
        
    // }
    // socket.on("livegames",function (data){
    //     console.log(data);
        
    //     // var livelist_area=document.getElementById('livelist_area');
        
    //     // var node = document.createElement("div");
    //     // var nodea=document.createElement("a");
    //     // nodea.href=data.link;
    //     // var textnode = document.createTextNode(`${data.name}`);         // Create a text node
    //     // nodea.appendChild(textnode);
    //     // node.appendChild(nodea)                 // Create a <li> node        // Append the text to <li>
    //     // livelist_area.appendChild(node);
    // })


    class Square{
  
        constructor(piece_name , color,letter, number,pImage="none", position="none",bright=false,lmbright=false,turn=false,already_moved=false,check=false){
        this.piece_name=piece_name;
        this.color=color;
        //  this.letter=letter;
        this.number=number;
        this.pImage=pImage;
        this.check=check;
        this.turn=turn;
        this.bright = bright;
        this.lmbright = lmbright;
        this.already_moved=already_moved;
        
            
  
        for (const j of numbers){
            if (letter==letters[j]){
                this.letter= j
            }
  
          }
                  
        if (letter in numbers){
              this.letter=letter
            }
  
        this.position= {x: 40+this.letter*(1190-366)/8, y:(40+(904-80)-this.number*(904-80)/8)-(904-80)/8};   
        }
    }
        
  
  
    a1= new Square("rook","white","a",0);
    b1= new Square("knight","white","b",0);
    c1= new Square("bishop","white","c",0);
    d1= new Square("queen","white","d",0);
    e1= new Square("king","white","e",0);
    f1= new Square("bishop","white","f",0);
    g1= new Square("knight","white","g",0);
    h1= new Square("rook","white","h",0);
  
    a2= new Square("pawn","white","a",1);
    b2= new Square("pawn","white","b",1);
    c2= new Square("pawn","white","c",1);
    d2= new Square("pawn","white","d",1);
    e2= new Square("pawn","white","e",1);
    f2= new Square("pawn","white","f",1);
    g2= new Square("pawn","white","g",1);
    h2= new Square("pawn","white","h",1);
  
    a3= new Square("none","none","a",2);
    b3= new Square("none","none","b",2);
    c3= new Square("none","none","c",2);
    d3= new Square("none","none","d",2);
    e3= new Square("none","none","e",2);
    f3= new Square("none","none","f",2);
    g3= new Square("none","none","g",2);
    h3= new Square("none","none","h",2);
    a4= new Square("none","none","a",3);
    b4= new Square("none","none","b",3);
    c4= new Square("none","none","c",3);
    d4= new Square("none","none","d",3);
    e4= new Square("none","none","e",3);
    f4= new Square("none","none","f",3);
    g4= new Square("none","none","g",3);
    h4= new Square("none","none","h",3);
    a5= new Square("none","none","a",4);
    b5= new Square("none","none","b",4);
    c5= new Square("none","none","c",4);
    d5= new Square("none","none","d",4);
    e5= new Square("none","none","e",4);
    f5= new Square("none","none","f",4);
    g5= new Square("none","none","g",4);
    h5= new Square("none","none","h",4);
    a6= new Square("none","none","a",5);
    b6= new Square("none","none","b",5);
    c6= new Square("none","none","c",5);
    d6= new Square("none","none","d",5);
    e6= new Square("none","none","e",5);
    f6= new Square("none","none","f",5);
    g6= new Square("none","none","g",5);
    h6= new Square("none","none","h",5);
  
    a7= new Square("pawn","black","a",6);
    b7= new Square("pawn","black","b",6);
    c7= new Square("pawn","black","c",6);
    d7= new Square("pawn","black","d",6);
    e7= new Square("pawn","black","e",6);
    f7= new Square("pawn","black","f",6);
    g7= new Square("pawn","black","g",6);
    h7= new Square("pawn","black","h",6);
  
    a8= new Square("rook","black","a",7);
    b8= new Square("knight","black","b",7);
    c8= new Square("bishop","black","c",7);
    d8= new Square("queen","black","d",7);
    e8= new Square("king","black","e",7);
    f8= new Square("bishop","black","f",7);
    g8= new Square("knight","black","g",7);
    h8= new Square("rook","black","h",7);
  
    
  
    var SL =[a1,b1,c1,d1,e1,f1,g1,h1,a2,b2,c2,d2,e2,f2,g2,h2,a3,b3,c3,d3,e3,f3,g3,h3,
        a4,b4,c4,d4,e4,f4,g4,h4,a5,b5,c5,d5,e5,f5,g5,h5,a6,b6,c6,d6,e6,f6,g6,h6,a7,b7,c7,d7,e7,f7,g7,h7,a8,b8,c8,d8,e8,f8,g8,h8]
  
  
    for (let i = 0; i < sqrs.length; i++){
    
          sqrs[i].piece_name= SL[i].piece_name;
          sqrs[i].color= SL[i].color;
          sqrs[i].number= SL[i].number;
          sqrs[i].pImage= SL[i].pImage;
          sqrs[i].check= SL[i].check;
          sqrs[i].turn= SL[i].turn;
          sqrs[i].bright= SL[i].bright;
          sqrs[i].lmbright= SL[i].lmbright;
          sqrs[i].already_moved= SL[i].already_moved;  
          sqrs[i].letter= SL[i].letter;
          sqrs[i].position= SL[i].position;
          sqrs[i].style.height=`${board.clientHeight/8}px`
          sqrs[i].style.width=`${board.clientWidth/8}px`
          // sqrs[i].pImage=new Image(0.125*board.offsetWidth,0.125*board.offsetHeight);
          
          // if (SL[i].piece_name!="none"){
          // sqrs[i].pImage=new Image(board.clientWidth/8-1,board.clientHeight/8-1);
          // sqrs[i].pImage.id="pieces"
          // sqrs[i].pImage.already_moved=false;
          // sqrs[i].pImage.src=`images/sprites/${SL[i].color+SL[i].piece_name}.png`;
          // sqrs[i].appendChild(sqrs[i].pImage);
          // sqrs[i].pImage.style.position="absolute";
          // sqrs[i].pImage.style.top="0%";
          // sqrs[i].pImage.style.left="0%";
                  
          // }       
          
          sqrs[i].position={bottom:`${(SL[i].number)*board.clientWidth/8}px` , left:`${SL[i].letter*board.clientWidth/8}px`}
          sqrs[i].style.bottom=sqrs[i].position.bottom;
          sqrs[i].style.left=sqrs[i].position.left;
  
          if (sqrs[i].number%2==0 && sqrs[i].letter%2==0){ 
          sqrs[i].style.background="yellowgreen";
          sqrs[i].BG="yellowgreen" 
          }else if (sqrs[i].number%2!=0 && sqrs[i].letter%2!==0){
          sqrs[i].style.background="yellowgreen";
          sqrs[i].BG="yellowgreen"
          }else{
          sqrs[i].style.background="white";
          sqrs[i].BG="white"
          }
  
          // sqrs[i].addEventListener("mousedown",()=>{console.log(sqrs[i].offsetLeft,sqrs[i].offsetTop)})
  
      }
  
  
  
    sqrs.forEach(sqr=>{if(sqr.color=="white"){sqr.turn=true}});
  
  
    var SL=[[],[],[],[],[],[],[],[]];
    for(let i=0;i<8;i++){for(let j=0;j<8;j++){
     sqrs.forEach(sqr=>{if(sqr.number==i&& sqr.letter==j){SL[i][j]=sqr}}
     )}};
     //lm_arrange(SL);
     //SL.forEach(s=>{s.forEach(sl=>{console.log(sl)})})
  
      
     let imgs;
     let draggeditem;
     let draggedparent;
     let game_type="fischerandom";
     let col;

    Fischer_random.addEventListener("click",function(){game_type="fischerandom"})
    Standard.addEventListener("click",function(){game_type="standard"});

    play_btn.addEventListener("click",e=>{
        //window.location.href = '/livegames/hi'        
        gamedata={gtype:`${game_type}`};
        socket.emit("game-request",gamedata);
        socket.on("game-request-result",function(data){
            if (data.result=="match"){
                col=data.col;
                room=data.room
                socket.emit('update',{sl:"a1" ,room:`${room}`})
                
            };
            if (data.result=="no match"){
                let colors=["white","black"]
                po=btn(e);
                gamedata.a1=po.a1; gamedata.b1=po.b1;gamedata.c1=po.c1;gamedata.d1=po.d1;gamedata.e1=po.e1;gamedata.f1=po.f1;gamedata.g1=po.g1;gamedata.h1=po.h1;
                gamedata.color=colors[Math.floor(Math.random() * colors.length)];
                col=gamedata.color;
                socket.emit("nomatch-positions",gamedata);
                
            }
        })
        classbtn.style.display="none";
        playbtn.style.display="block";
    })
  

    function btn(e){
          console.log(e.target);
          if(game_type=="standard"){
           
           
          }else if(game_type=="fischerandom"){
           
              for(let j=0;j<8;j++){
                  SL[0][j].piece_name="none"
                  //SL[i][j].firstelementChild.remove();
              }
              for(let j=0;j<8;j++){SL[7][j].piece_name="none"}            
              // var show = myShows[Math.floor(Math.random() * myShows.length)];
              let b1=[0,2,4,6];
              let b2=[1,3,5,7];
              let die=[0,1,2,3,4,5,6,7]
  
              SL[0][b1[Math.floor(Math.random() * b1.length)]].piece_name="bishop";
              SL[0][b2[Math.floor(Math.random() * b2.length)]].piece_name="bishop";
              while(true){ let queen=SL[0][die[Math.floor(Math.random() * die.length)]];
                              if(queen.piece_name=="none"){queen.piece_name="queen";break}};
  
              while(true){ let queen=SL[0][die[Math.floor(Math.random() * die.length)]];
                  if(queen.piece_name=="none"){queen.piece_name="knight";break}};
  
              while(true){ let queen=SL[0][die[Math.floor(Math.random() * die.length)]];
                  if(queen.piece_name=="none"){queen.piece_name="knight";break}};
  
              for (let i=0;i<8;i++){if (SL[0][i].piece_name=="none"){SL[0][i].piece_name="rook" ;break;}}
              for (let i=0;i<8;i++){if (SL[0][i].piece_name=="none"){SL[0][i].piece_name="king" ;break;}}
              for (let i=0;i<8;i++){if (SL[0][i].piece_name=="none"){SL[0][i].piece_name="rook" ;break;}}
             
              for (let i=0;i<8;i++){
                  SL[7][i].piece_name=`${SL[0][i].piece_name}`;
                 // SL[7][i].pImage.src=`images/sprites/${SL[7][i].color+ SL[7][i].piece_name}.png`;
              }
              for (let i=0;i<8;i++){
                 // SL[0][i].pImage.src=`images/sprites/${SL[0][i].color+ SL[0][i].piece_name}.png`;
              }
              //e.target.removeEventListener("buttondown",btn)
          }
          
          
  
          for (let i=0;i<8;i++){for (let j=0;j<8;j++){
                  if (SL[i][j].piece_name!="none"){
                  SL[i][j].pImage=new Image(board.clientWidth/8-1,board.clientHeight/8-1);
                  SL[i][j].pImage.id="pieces"
                  SL[i][j].pImage.already_moved=false;
                  SL[i][j].pImage.src=`staticassets/board/images/sprites/${SL[i][j].color+SL[i][j].piece_name}.png`;
                //   SL[i][j].appendChild(SL[i][j].pImage);
                  SL[i][j].pImage.style.position="absolute";
                  SL[i][j].pImage.style.top="0%";
                  SL[i][j].pImage.style.left="0%";
                          
                  }   
              }}
  
              
          imgs=document.querySelectorAll("#pieces");
          lm_arrange(SL);
        console.log(SL);
        let pos={a1:`${SL[0][0].piece_name}`,b1:`${SL[0][1].piece_name}`,c1:`${SL[0][2].piece_name}`,d1:`${SL[0][3].piece_name}`,e1:`${SL[0][4].piece_name}`,f1:`${SL[0][5].piece_name}`,g1:`${SL[0][6].piece_name}`,h1:`${SL[0][7].piece_name}`};
        return pos;
      }
  


 socket.on('roomlink',function(roomdata){
     //socket.disconnect();
     if (col=="black"){flip_board()};
     console.log(col);
    //  socket.disconnect();
    //  window.location.href = roomdata.link;
        socket.emit('reconnect',{hey:"hey"});
        // socket.on("new",function(){})
            console.log("in the room");
            SL[0][0].piece_name=roomdata.a1;SL[7][0].piece_name=roomdata.a1;
            SL[0][1].piece_name=roomdata.b1;SL[7][1].piece_name=roomdata.b1;
            SL[0][2].piece_name=roomdata.c1;SL[7][2].piece_name=roomdata.c1;
            SL[0][3].piece_name=roomdata.d1;SL[7][3].piece_name=roomdata.d1;
            SL[0][4].piece_name=roomdata.e1;SL[7][4].piece_name=roomdata.e1;
            SL[0][5].piece_name=roomdata.f1;SL[7][5].piece_name=roomdata.f1;
            SL[0][6].piece_name=roomdata.g1;SL[7][6].piece_name=roomdata.g1;
            SL[0][7].piece_name=roomdata.h1;SL[7][7].piece_name=roomdata.h1;
        
            //console.log(roomdata);
                for (let i=0;i<8;i++){for (let j=0;j<8;j++){
                        if (SL[i][j].piece_name!="none"){
                        SL[i][j].pImage=new Image(board.clientWidth/8-1,board.clientHeight/8-1);
                        SL[i][j].pImage.id="pieces"
                        SL[i][j].pImage.already_moved=false;
                        SL[i][j].pImage.src=`staticassets/board/images/sprites/${SL[i][j].color+SL[i][j].piece_name}.png`;
                        SL[i][j].appendChild(SL[i][j].pImage);
                        SL[i][j].pImage.style.position="absolute";
                        SL[i][j].pImage.style.top="0%";
                        SL[i][j].pImage.style.left="0%";
                                
                        }   
                    }}
                
                imgs=document.querySelectorAll("#pieces");
                lm_arrange(SL);
                legal_drag();
        socket.on('move_update',function(move_data){
            
            PGN_move_capture(move_data.i,move_data.j,move_data.i2,move_data.j2,move_data.pro)
            
        })
        
    });
  
 socket.on("newgame",function(d){
    console.log(d);
    
});
    
  
    
  //   console.log(SL[1][2].turn);
  //   console.log(SL[7][7].turn);
  
  
  
   function legal_drag(){
          
          imgs=document.querySelectorAll("#pieces");
          imgs.forEach(img=>{if(img.parentNode.turn==true){
              //console.log(img.parentNode);
             img.draggable=true;  
                  
              img.addEventListener("dragstart",dragstart);
                  
  
              img.addEventListener("dragend",function(){
  
                      // console.log("dragend");
                      setTimeout(function (){
                              img.style.display="block";
                      },0)
                  });
  
              }else{img.draggable=false}});
              
    }
  
   function dragstart(){
      draggeditem=this;
      draggedparent=this.parentNode;
      setTimeout(function(){
         
  
         sqrs.forEach(sqr=>{
                 sqr.BG1=sqr.BG;
                 sqr.style.background=`${sqr.BG}`;
                 });
         draggeditem.style.display="none";
         draggedparent.BG1="yellow";
         draggedparent.style.background="yellow";
         //console.log(draggedparent);
  
         sqrs.forEach(sqr=>{if(ifin(sqr,draggedparent.lm)){
             sqr.removeEventListener("drop",castle_handler);
             sqr.addEventListener("dragover",dragover);
             sqr.addEventListener("dragenter",dragenter);
             sqr.addEventListener("dragleave",dragleave);
             sqr.addEventListener("drop",move_capture);
             //sqr.style.background=rgba(76, 175, 80, 0.2);
  
             }else{
              sqr.removeEventListener("dragover",dragover);
              sqr.removeEventListener("dragenter",dragenter);
              sqr.removeEventListener("dragleave",dragleave);
              sqr.removeEventListener("drop",move_capture);
              sqr.removeEventListener("drop",castle_handler);
             }}
          )
          let k=draggedparent;
          
          //if king on b,c or d square (fischerandom) looking for rook to drop on _
          if(k.piece_name=="king" && k.queensidecastle==true && k.firstElementChild.already_moved==false){if(1<=k.letter && k.letter<=3){
              for(let r=k.letter;r>=0;r--){if(SL[k.number][r].piece_name=="rook" && SL[k.number][r].color==k.color){
                  console.log("kinggggg")
                  
                  SL[k.number][r].removeEventListener("drop",move_capture);
  
                  SL[k.number][r].addEventListener("dragover",dragover);
                  SL[k.number][r].addEventListener("dragenter",dragenter);
                  SL[k.number][r].addEventListener("dragleave",dragleave);
                  SL[k.number][r].addEventListener("drop",castle_handler);
  
                  }}
                }
                //_ if  
                if(SL[k.number][2].piece_name=="rook"){
                      
                      SL[k.number][2].removeEventListener("drop",move_capture);
                  
                      SL[k.number][2].addEventListener("dragover",dragover);
                      SL[k.number][2].addEventListener("dragenter",dragenter);
                      SL[k.number][2].addEventListener("dragleave",dragleave);
                      SL[k.number][2].addEventListener("drop",castle_handler);
                  }
  
  
              
              }else if(k.piece_name=="king" && k.kingsidecastle==true && k.firstElementChild.already_moved==false){if(5<=k.letter && k.letter<=7){
              for(let r=k.letter;r<=7;r++){if(SL[k.number][r].piece_name=="rook" && SL[k.number][r].color==k.color){
                  
                          console.log("kinggggg")
                  
                          SL[k.number][r].removeEventListener("drop",move_capture);
  
                          SL[k.number][r].addEventListener("dragover",dragover);
                          SL[k.number][r].addEventListener("dragenter",dragenter);
                          SL[k.number][r].addEventListener("dragleave",dragleave);
                          SL[k.number][r].addEventListener("drop",castle_handler);
  
                      }}
  
                  }
                  if(SL[k.number][6].piece_name=="rook"){
                      
                      SL[k.number][6].removeEventListener("drop",move_capture);
                  
                      SL[k.number][6].addEventListener("dragover",dragover);
                      SL[k.number][6].addEventListener("dragenter",dragenter);
                      SL[k.number][6].addEventListener("dragleave",dragleave);
                      SL[k.number][6].addEventListener("drop",castle_handler);
                  }
  
              }
          
  
       },0)}
  
   function dragleave (e) {
      //     console.log("dragleave");
             this.style.background=`${this.BG1}`;
    }
    function dragover (e) {
      e.preventDefault();
      this.style.background="blue";  
    }
    function dragenter(e) {
      e.preventDefault();
    }
  
 
      
    function copyLIST(LIS){
       let cp=[[],[],[],[],[],[],[],[]];
       for (let i=0;i<8;i++){for(let j=0;j<8;j++){cp[i][j]=copyObject(LIS[i][j])}}
       return cp;
    }
  
    function copyObject(obj){
      let newObj={};  
      newObj.piece_name=obj.piece_name;
      newObj.color=obj.color;
      newObj.letter= obj.letter;
      newObj.number=obj.number;
      newObj.pImage=obj.pImage;
      newObj.position=obj.position;
      newObj.turn=obj.turn;
      newObj.already_moved=obj.already_moved;
      newObj.check=obj.check;
      return newObj
    }
  
  
  
    function move_capture(e){
      e.preventDefault();
      console.log("drop");
      let trg;
      if(e.target.id=="pieces"){trg=e.target.parentNode}else{trg=e.target}
         
      let i=draggedparent.number;
      let j=draggedparent.letter;
      let drg=draggedparent;
      
      
      

      if ((trg.number==0 || trg.number==7) && draggedparent.piece_name=="pawn"){
          let color=drg.color;
          let letter=trg.letter;
          prom(color,letter,drg,trg);
        //   pause= [true,drg,trg];  
      }else{
        move_to_PGN(draggedparent,trg,pro=false)
        let move_data={i:`${i}`,j:`${j}`,i2:`${trg.number}`,j2:`${trg.letter}`,pro:false,PGN:pgnlist}
        move_socket_update(move_data);
      //capture after making en passant
      if (SL[i][j].piece_name == "pawn"){
          if (SL[i][j].number+1==trg.number && SL[i][j].letter+1==trg.letter && trg.piece_name=="none"){
              SL[i][j+1].piece_name="none";
              SL[i][j+1].color="none";
              SL[i][j+1].pImage="none";
              if (SL[i][j+1].firstElementChild!=null){SL[i][j+1].firstElementChild.remove()}
          }else if(SL[i][j].number+1==trg.number && SL[i][j].letter-1==trg.letter && trg.piece_name=="none"){
              SL[i][j-1].piece_name="none";
              SL[i][j-1].color="none";
              SL[i][j-1].pImage="none";
              if (SL[i][j-1].firstElementChild!=null){SL[i][j-1].firstElementChild.remove()} 
          }else if (SL[i][j].number-1 ==trg.number && SL[i][j].letter+1 ==trg.letter && trg.piece_name=="none"){
              SL[i][j+1].piece_name="none";
              SL[i][j+1].color="none";
              SL[i][j+1].pImage="none";
              if (SL[i][j+1].firstElementChild!=null){SL[i][j+1].firstElementChild.remove()}
          }else if (SL[i][j].number-1 == trg.number && SL[i][j].letter-1 == trg.letter && trg.piece_name=="none"){
              SL[i][j-1].piece_name="none";
              SL[i][j-1].color="none";
              SL[i][j-1].pImage="none";
              if (SL[i][j-1].firstElementChild!=null){SL[i][j-1].firstElementChild.remove()}
          }
          //promotion    
          
          
  
      //update rook position after castles
      
      }else if( SL[i][j].piece_name =="king"){  
          if (SL[i][j].number==0 || SL[i][j].number==7){
              if ((trg.letter-SL[i][j].letter)>1){
                  for(r of SL){for(rk of r){if (rk.piece_name=="rook"&&rk.number==SL[i][j].number&&rk.color==SL[i][j].color&&rk.letter>SL[i][j].letter){
                      SL[rk.number][5].appendChild(rk.firstElementChild);                
                      SL[rk.number][5].piece_name=rk.piece_name;
                      SL[rk.number][5].color=rk.color;                    
                      SL[rk.number][5].pImage=rk.pImage;
                      if(rk.letter!=5){                  
                          rk.piece_name="none";
                          rk.color="none";
                          rk.pImage="none";
                      }
                      break;
                      
                  }
                  }}
              }else if((trg.letter-SL[i][j].letter)<-1){
                  for(l of SL){for (lk of l){if (lk.piece_name=="rook"&&lk.number==SL[i][j].number&&lk.color==SL[i][j].color&&lk.letter<SL[i][j].letter){
                      SL[lk.number][3].append(lk.firstElementChild);                
                      SL[lk.number][3].piece_name=lk.piece_name;console.log( SL[lk.number][3]);
                      SL[lk.number][3].color=lk.color;                    
                      SL[lk.number][3].pImage=lk.pImage;
                      if(IDBKeyRange.letter!=3){                   
                          lk.piece_name="none";
                          lk.color="none";
                          lk.pImage="none";
                      }
                      break;
                  }
                  }}
              }
          }
      }
      
      // setTimeout(function(){
          if (trg.firstElementChild!=null && trg!=drg){
                  //console.log(trg.firstElementChild)
                  trg.firstElementChild.remove();
          }
          if (trg.id!=drg.id){
                  if(draggeditem.parentNode.piece_name=="king" || draggeditem.parentNode.piece_name=="rook"){draggeditem.already_moved=true}
                  trg.append(draggeditem);               
                  trg.style.background="yellow";
                  trg.piece_name=drg.piece_name;
  
                  trg.color=drg.color;                    
                  trg.pImage=drg.pImage;
                  sqrs.forEach(tg=>{
                  if (tg.color==drg.color){
                      tg.turn=false;
                      
                  }else if(tg.piece_name!="none" && tg.color!=drg.color){tg.turn=true}
                  });                    
                  drg.piece_name="none";
                  drg.color="none";
                  drg.pImage="none";
                 
                  //sqrs.forEach(sqr=>{console.log(sqr,sqr.turn)});                
          }
          
          
          
      // },0);
      lm_arrange(SL);
      in_check(SL);
      castles(SL);
      //sqrs.forEach(sqr=>{console.log(sqr,sqr.turn)});
      
      //en passant
      if (trg.piece_name == "pawn"){
          if (trg.number-SL[i][j].number>1){
              if (ifin(i+2,r8) && ifin(j-1,r8)){
                  if (SL[i+2][j-1].piece_name=="pawn" && SL[i+2][j-1].color!=trg.color){
                      SL[i+2][j-1].lm.push(SL[i+1][j])
                  }
              }
              if (ifin(i+2,r8) && ifin(j+1,r8)){
                  if (SL[i+2][j+1].piece_name=="pawn" && SL[i+2][j+1].color!=trg.color){
                      SL[i+2][j+1].lm.push(SL[i+1][j])
                  }
              }
          }else if (trg.number-SL[i][j].number<-1){
              if (ifin(i-2,r8) && ifin(j-1,r8)){
                  if (SL[i-2][j-1].piece_name=="pawn" && SL[i-2][j-1].color!=trg.color){
                      SL[i-2][j-1].lm.push(SL[i-1][j])
                  }
              }
              if (ifin(i-2,r8) && ifin(j+1,r8)){
                  if (SL[i-2][j+1].piece_name=="pawn" && SL[i-2][j+1].color!=trg.color){
                      SL[i-2][j+1].lm.push(SL[i-1][j])
                  }
              }
          }
      }
      console.log(SL);
      
  
      // //let LM=draggedparent.lm;
      // SL.forEach(s=>{s.forEach(sqr=>{//console.log(draggedparent);
      //     if(sqr.turn==true && sqr.piece_name!="none"){     
      //   sqr.lm.forEach(le=>{
      //     let copySL=copyLIST(SL);
      //     let le2=copySL[le.number][le.letter];
      //     let sqr2=copySL[sqr.number][sqr.letter];
      //   move_capture2(sqr2,le2,copySL);
      //   lm_arrange(copySL);
      //   in_check(copySL);
      //   //console.log(draggedparent2,le2);
      //   if(le2.check==true){ 
      //       for( let i = 0; i < sqr.lm.length; i++){ 
      //         if ( sqr.lm[i] == le) {
      //             sqr.lm[i]=[];
      //           //sqr.lm.splice(i, 1);
      //           //console.log(draggedparent.lm); 
      //         }
      //       }
      //   }
      //  })}})})
       lm_remove();
  
       legal_drag();
       checkmate(SL);
       //console.log(SL[0][4].firstElementChild.already_moved);
  
  
      }
      }
  
  
    function move_capture2(drg,trg,SL){
      let i=drg.number;
      let j=drg.letter;
  
      //capture after making en passant
      if (SL[i][j].piece_name == "pawn"){
          if (SL[i][j].number+1==trg.number && SL[i][j].letter+1==trg.letter && trg.piece_name=="none"){
              SL[i][j+1].piece_name="none";
              SL[i][j+1].color="none";
              SL[i][j+1].pImage="none";
              if (SL[i][j+1].firstElementChild!=null){SL[i][j+1].firstElementChild.remove()}
          }else if(SL[i][j].number+1==trg.number && SL[i][j].letter-1==trg.letter && trg.piece_name=="none"){
              SL[i][j-1].piece_name="none";
              SL[i][j-1].color="none";
              SL[i][j-1].pImage="none";
              if (SL[i][j-1].firstElementChild!=null){SL[i][j-1].firstElementChild.remove()} 
          }else if (SL[i][j].number-1 ==trg.number && SL[i][j].letter+1 ==trg.letter && trg.piece_name=="none"){
              SL[i][j+1].piece_name="none";
              SL[i][j+1].color="none";
              SL[i][j+1].pImage="none";
              if (SL[i][j+1].firstElementChild!=null){SL[i][j+1].firstElementChild.remove()}
          }else if (SL[i][j].number-1 == trg.number && SL[i][j].letter-1 == trg.letter && trg.piece_name=="none"){
              SL[i][j-1].piece_name="none";
              SL[i][j-1].color="none";
              SL[i][j-1].pImage="none";
              if (SL[i][j-1].firstElementChild!=null){SL[i][j-1].firstElementChild.remove()}
          }
          //promotion    
          
          if (trg.number==0 || trg.number==7){
              pause= [true,drg,trg];  
          }
  
      //update rook position after castles
      
      }else if( SL[i][j].piece_name =="king"){  
          if (SL[i][j].number==0 || SL[i][j].number==7){
              if ((trg.letter-SL[i][j].letter)>1){
                  SL.forEach(r=>{r.forEach(rk=>{if (rk.piece_name=="rook"&&rk.number==SL[i][j].number&&rk.color==SL[i][j].color&&rk.letter>SL[i][j].letter){
                      //SL[rk.number][5].appendChild(rk.firstElementChild);                
                      SL[rk.number][5].piece_name=rk.piece_name;
                      SL[rk.number][5].color=rk.color;                    
                      SL[rk.number][5].pImage=rk.pImage;                  
                      rk.piece_name="none";
                      rk.color="none";
                      rk.pImage="none"
                  }
                  })})
              }else if((trg.letter-SL[i][j].letter)<-1){
                  SL.forEach(r=>{r.forEach(rk=>{if (rk.piece_name=="rook"&&rk.number==SL[i][j].number&&rk.color==SL[i][j].color&&rk.letter<SL[i][j].letter){
                      //SL[rk.number][3].append(rk.firstElementChild);                
                      SL[rk.number][3].piece_name=rk.piece_name;
                      SL[rk.number][3].color=rk.color;                    
                      SL[rk.number][3].pImage=rk.pImage;                   
                      rk.piece_name="none";
                      rk.color="none";
                      rk.pImage="none"
                  }
                  })})
              }
          }
      }
      // setTimeout(function(){
          // if (trg.firstElementChild!=null && trg.id!=drg.id){
          //         trg.firstElementChild.remove();
          
          
                  //trg.append(draggeditem);                
                  //trg.style.background="yellow";
                  trg.piece_name=drg.piece_name;
                  trg.color=drg.color;                    
                  trg.pImage=drg.pImage;
                  SL.forEach(t=>{t.forEach(tg=>{
                  if (tg.color==drg.color){
                      tg.turn=false;
                  }else if(tg.piece_name!="none"){tg.turn=true;}
                  })});                    
                  drg.piece_name="none";
                  drg.color="none";
                  drg.pImage="none";
          
          
          
      // },0);
  
  
      // if (trg.piece_name == "pawn"){
      //     if (trg.number-SL[i][j].number>1){
      //         if (ifin(i+2,r8) && ifin(j-1,r8)){
      //             if (SL[i+2][j-1].piece_name=="pawn" && SL[i+2][j-1].color!=trg.color){
      //                 SL[i+2][j-1].lm.push(SL[i+1][j])
      //             }
      //         }
      //         if (ifin(i+2,r8) && ifin(j+1,r8)){
      //             if (SL[i+2][j+1].piece_name=="pawn" && SL[i+2][j+1].color!=trg.color){
      //                 SL[i+2][j+1].lm.push(SL[i+1][j])
      //             }
      //         }
      //     }else if (trg.number-SL[i][j].number<-1){
      //         if (ifin(i-2,r8) && ifin(j-1,r8)){
      //             if (SL[i-2][j-1].piece_name=="pawn" && SL[i-2][j-1].color!=trg.color){
      //                 SL[i-2][j-1].lm.push(SL[i-1][j])
      //             }
      //         }
      //         if (ifin(i-2,r8) && ifin(j+1,r8)){
      //             if (SL[i-2][j+1].piece_name=="pawn" && SL[i-2][j+1].color!=trg.color){
      //                 SL[i-2][j+1].lm.push(SL[i-1][j])
      //             }
      //         }
      //     }
      // }
  
      
    }
   
    function lm_arrange(SL){
      for (let r of SL){for (let sl of r){
          let i=sl.number;
          let j=sl.letter;
          sl.lm=[];
  
      // PAWN
          if(sl.piece_name=="pawn"){
              if(sl.color=="white"){
                  if (ifin(i+1,r8)){
                      if (SL[i+1][j].piece_name =="none"){
                          sl.lm.push(SL[i+1][j]);
                          if (i==1){
                              if (SL[i+2][j].piece_name =="none"){
                                  sl.lm.push(SL[i+2][j]);
                              }
                          }
                      }
                  }
                  if (ifin(i+1,r8) && ifin(j+1,r8)){        
                      if (SL[i+1][j+1].color=="black"){
                          sl.lm.push(SL[i+1][j+1]);
                      }
                  }
                  if (ifin(i+1,r8) && ifin(j-1,r8)){
                      if (SL[i+1][j-1].color=="black"){
                          sl.lm.push(SL[i+1][j-1]);
                      }
                  }
              }else if(sl.color=="black"){
  
                  if (ifin(i-1,r8)){
                      if (SL[i-1][j].piece_name =="none"){
                          sl.lm.push(SL[i-1][j]);
                          if (i==6){
                              if (SL[i-2][j].piece_name =="none"){
                                  sl.lm.push(SL[i-2][j]);
                              }
                          }
                      }
                  }
                  if (ifin(i-1,r8) && ifin(j+1,r8)){        
                      if (SL[i-1][j+1].color=="white"){
                          sl.lm.push(SL[i-1][j+1]);
                      }
                  }
                  if (ifin(i-1,r8) && ifin(j-1,r8)){
                      if (SL[i-1][j-1].color=="white"){
                          sl.lm.push(SL[i-1][j-1]);
                      }
                  }
  
  
  
              }
  
          };
  
       // ROOK
  
          if(sl.piece_name=="rook" || sl.piece_name=="queen" ){
              if(sl.color=="white"){
                  let k=i
                  let l=j
                  while (true){
                      k+=1
                      if (ifin(k,r8)){
                          if (SL[k][l].piece_name=="none"){
                              sl.lm.push(SL[k][l]);
                              continue;
                          }else if(SL[k][l].color=="black"){
                              sl.lm.push(SL[k][l]);
                              k=i,l=j;                            
                              break;                        
                          }else{
                              k=i,l=j;
                              break;}                        
                      }else{
                          k=i,l=j;
                          break}
                  }
                              
                  while (true){
                      k-=1
                      if (ifin(k,r8)){
                          if (SL[k][l].piece_name=="none"){
                              sl.lm.push(SL[k][l]);
                              continue;
                          }else if(SL[k][l].color=="black"){
                              sl.lm.push(SL[k][l]);
                              k=i,l=j;
                              break;                        
                          }else{
                              k=i,l=j;
                              break;}                        
                      }else{
                          k=i,l=j;
                          break;}
                  }
  
                  while (true){
                      l+=1
                      if (ifin(l,r8)){
                          if (SL[k][l].piece_name=="none"){
                              sl.lm.push(SL[k][l]);
                              continue;
                          }else if(SL[k][l].color=="black"){
                              sl.lm.push(SL[k][l]);
                              k=i,l=j;
                              break;                        
                          }else{
                              k=i,l=j;
                              break;}
                      }else{
                          k=i,l=j;
                          break;}
                  }
  
                  while (true){
                      l-=1
                      if (ifin(l,r8)){
                          if (SL[k][l].piece_name=="none"){
                              sl.lm.push(SL[k][l]);
                              continue;
                          }else if(SL[k][l].color=="black"){
                              sl.lm.push(SL[k][l]);
                              k=i,l=j;
                              break;                        
                          }else{
                              k=i,l=j;
                              break;}                        
                      }else{
                          k=i,l=j;
                          break;}
                  }
                  
              }else if(sl.color=="black"){
                  let k=i
                  let l=j
                  while (true){
                      k+=1
                      if (ifin(k,r8)){
                          if (SL[k][l].piece_name=="none"){
                              sl.lm.push(SL[k][l]);
                              continue;
                          }else if(SL[k][l].color=="white"){
                              sl.lm.push(SL[k][l]);
                              k=i,l=j;                            
                              break;                        
                          }else{
                              k=i,l=j;
                              break;}                        
                      }else{
                          k=i,l=j;
                          break}
                  }
                              
                  while (true){
                      k-=1
                      if (ifin(k,r8)){
                          if (SL[k][l].piece_name=="none"){
                              sl.lm.push(SL[k][l]);
                              continue;
                          }else if(SL[k][l].color=="white"){
                              sl.lm.push(SL[k][l]);
                              k=i,l=j;
                              break;                        
                          }else{
                              k=i,l=j;
                              break;}                        
                      }else{
                          k=i,l=j;
                          break;}
                  }
  
                  while (true){
                      l+=1
                      if (ifin(l,r8)){
                          if (SL[k][l].piece_name=="none"){
                              sl.lm.push(SL[k][l]);
                              continue;
                          }else if(SL[k][l].color=="white"){
                              sl.lm.push(SL[k][l]);
                              k=i,l=j;
                              break;                        
                          }else{
                              k=i,l=j;
                              break;}
                      }else{
                          k=i,l=j;
                          break;}
                  }
  
                  while (true){
                      l-=1
                      if (ifin(l,r8)){
                          if (SL[k][l].piece_name=="none"){
                              sl.lm.push(SL[k][l]);
                              continue;
                          }else if(SL[k][l].color=="white"){
                              sl.lm.push(SL[k][l]);
                              k=i,l=j;
                              break;                        
                          }else{
                              k=i,l=j;
                              break;}                        
                      }else{
                          k=i,l=j;
                          break;}
                  }
  
              }            
          };
  
  
  // KNIGHT
  
          if(sl.piece_name=="knight"){
              if(sl.color=="white"){
  
                  if (ifin(i+2,r8) && ifin(j+1,r8)){
                      if (SL[i+2][j+1].piece_name =="none" || SL[i+2][j+1].color=="black"){                    
                              sl.lm.push(SL[i+2][j+1]);
                      }
                  }
                  if (ifin(i+1,r8) && ifin(j+2,r8)){           
                      if (SL[i+1][j+2].piece_name =="none" || SL[i+1][j+2].color=="black"){                    
                              sl.lm.push(SL[i+1][j+2]);
                      }
                  }           
                  if (ifin(i-1,r8) && ifin(j+2,r8)){           
                      if (SL[i-1][j+2].piece_name =="none" || SL[i-1][j+2].color=="black"){                    
                              sl.lm.push(SL[i-1][j+2]);
                      }
                  }                  
                  if (ifin(i-2,r8) && ifin(j+1,r8)){           
                      if (SL[i-2][j+1].piece_name =="none" || SL[i-2][j+1].color=="black"){                    
                              sl.lm.push(SL[i-2][j+1]);
                      }
                  }       
                  if (ifin(i-2,r8) && ifin(j-1,r8)){           
                      if (SL[i-2][j-1].piece_name =="none" || SL[i-2][j-1].color=="black"){                    
                              sl.lm.push(SL[i-2][j-1]);
                      }
                  }  
                  if (ifin(i-1,r8) && ifin(j-2,r8)){           
                      if (SL[i-1][j-2].piece_name =="none" || SL[i-1][j-2].color=="black"){                    
                              sl.lm.push(SL[i-1][j-2]);
                      }
                  }
                  if (ifin(i+1,r8) && ifin(j-2,r8)){           
                      if (SL[i+1][j-2].piece_name =="none" || SL[i+1][j-2].color=="black"){                    
                              sl.lm.push(SL[i+1][j-2]);
                      }
                  }
                  if (ifin(i+2,r8) && ifin(j-1,r8)){           
                      if (SL[i+2][j-1].piece_name =="none" || SL[i+2][j-1].color=="black"){                    
                              sl.lm.push(SL[i+2][j-1]);
                      }
                  }
              }else if(sl.color=="black"){
                  if (ifin(i+2,r8) && ifin(j+1,r8)){
                      if (SL[i+2][j+1].piece_name =="none" || SL[i+2][j+1].color=="white"){                    
                              sl.lm.push(SL[i+2][j+1]);
                      }
                  }
                  if (ifin(i+1,r8) && ifin(j+2,r8)){           
                      if (SL[i+1][j+2].piece_name =="none" || SL[i+1][j+2].color=="white"){                    
                              sl.lm.push(SL[i+1][j+2]);
                      }
                  }           
                  if (ifin(i-1,r8) && ifin(j+2,r8)){           
                      if (SL[i-1][j+2].piece_name =="none" || SL[i-1][j+2].color=="white"){                    
                              sl.lm.push(SL[i-1][j+2]);
                      }
                  }                  
                  if (ifin(i-2,r8) && ifin(j+1,r8)){           
                      if (SL[i-2][j+1].piece_name =="none" || SL[i-2][j+1].color=="white"){                    
                              sl.lm.push(SL[i-2][j+1]);
                      }
                  }       
                  if (ifin(i-2,r8) && ifin(j-1,r8)){           
                      if (SL[i-2][j-1].piece_name =="none" || SL[i-2][j-1].color=="white"){                    
                              sl.lm.push(SL[i-2][j-1]);
                      }
                  }  
                  if (ifin(i-1,r8) && ifin(j-2,r8)){           
                      if (SL[i-1][j-2].piece_name =="none" || SL[i-1][j-2].color=="white"){                    
                              sl.lm.push(SL[i-1][j-2]);
                      }
                  }
                  if (ifin(i+1,r8) && ifin(j-2,r8)){           
                      if (SL[i+1][j-2].piece_name =="none" || SL[i+1][j-2].color=="white"){                    
                              sl.lm.push(SL[i+1][j-2]);
                      }
                  }
                  if (ifin(i+2,r8) && ifin(j-1,r8)){           
                      if (SL[i+2][j-1].piece_name =="none" || SL[i+2][j-1].color=="white"){                    
                              sl.lm.push(SL[i+2][j-1]);
                      }
                  }
  
  
              }
  
          };
  
          
  // BISHOP
  
          if(sl.piece_name=="bishop" || sl.piece_name=="queen"){
              if(sl.color=="white"){
                  let k=i
                  let l=j
                  while (true){
                      k+=1
                      l+=1
                      if (ifin(k,r8) && ifin(l,r8)){
                          if (SL[k][l].piece_name=="none"){
                              sl.lm.push(SL[k][l]);
                              continue;
                          }else if(SL[k][l].color=="black"){
                              sl.lm.push(SL[k][l]);
                              k=i,l=j;                            
                              break;                        
                          }else{
                              k=i,l=j;
                              break;}                        
                      }else{
                          k=i,l=j;
                          break}
                  }
                              
                  while (true){
                      k-=1;
                      l-=1;
                      if (ifin(k,r8) && ifin(l,r8)){
                          if (SL[k][l].piece_name=="none"){
                              sl.lm.push(SL[k][l]);
                              continue;
                          }else if(SL[k][l].color=="black"){
                              sl.lm.push(SL[k][l]);
                              k=i,l=j;
                              break;                        
                          }else{
                              k=i,l=j;
                              break;}                        
                      }else{
                          k=i,l=j;
                          break;}
                  }
  
                  while (true){
                      k-=1;
                      l+=1;
                      if (ifin(k,r8) && ifin(l,r8)){
                          if (SL[k][l].piece_name=="none"){
                              sl.lm.push(SL[k][l]);
                              continue;
                          }else if(SL[k][l].color=="black"){
                              sl.lm.push(SL[k][l]);
                              k=i,l=j;
                              break;                        
                          }else{
                              k=i,l=j;
                              break;}
                      }else{
                          k=i,l=j;
                          break;}
                  }
  
                  while (true){
                      k+=1;
                      l-=1;
                      if (ifin(k,r8) && ifin(l,r8)){
                          if (SL[k][l].piece_name=="none"){
                              sl.lm.push(SL[k][l]);
                              continue;
                          }else if(SL[k][l].color=="black"){
                              sl.lm.push(SL[k][l]);
                              k=i,l=j;
                              break;                        
                          }else{
                              k=i,l=j;
                              break;}                        
                      }else{
                          k=i,l=j;
                          break;}
                  }
                                    
  
              }else if(sl.color=="black"){
                          let k=i
                          let l=j
                          while (true){
                              k+=1
                              l+=1
                              if (ifin(k,r8) && ifin(l,r8)){
                                  if (SL[k][l].piece_name=="none"){
                                      sl.lm.push(SL[k][l]);
                                      continue;
                                  }else if(SL[k][l].color=="white"){
                                      sl.lm.push(SL[k][l]);
                                      k=i,l=j;                            
                                      break;                        
                                  }else{
                                      k=i,l=j;
                                      break;}                        
                              }else{
                                  k=i,l=j;
                                  break}
                          }
                                      
                          while (true){
                              k-=1;
                              l-=1;
                              if (ifin(k,r8) && ifin(l,r8)){
                                  if (SL[k][l].piece_name=="none"){
                                      sl.lm.push(SL[k][l]);
                                      continue;
                                  }else if(SL[k][l].color=="white"){
                                      sl.lm.push(SL[k][l]);
                                      k=i,l=j;
                                      break;                        
                                  }else{
                                      k=i,l=j;
                                      break;}                        
                              }else{
                                  k=i,l=j;
                                  break;}
                          }
          
                          while (true){
                              k-=1;
                              l+=1;
                              if (ifin(k,r8) && ifin(l,r8)){
                                  if (SL[k][l].piece_name=="none"){
                                      sl.lm.push(SL[k][l]);
                                      continue;
                                  }else if(SL[k][l].color=="white"){
                                      sl.lm.push(SL[k][l]);
                                      k=i,l=j;
                                      break;                        
                                  }else{
                                      k=i,l=j;
                                      break;}
                              }else{
                                  k=i,l=j;
                                  break;}
                          }
          
                          while (true){
                              k+=1;
                              l-=1;
                              if (ifin(k,r8) && ifin(l,r8)){
                                  if (SL[k][l].piece_name=="none"){
                                      sl.lm.push(SL[k][l]);
                                      continue;
                                  }else if(SL[k][l].color=="white"){
                                      sl.lm.push(SL[k][l]);
                                      k=i,l=j;
                                      break;                        
                                  }else{
                                      k=i,l=j;
                                      break;}                        
                              }else{
                                  k=i,l=j;
                                  break;}
                          }    
              }
  
          };
  
  
  // KING
          if(sl.piece_name=="king"){
              if(sl.color=="white"){
                  if (ifin(i+1,r8) && ifin(j,r8)){
                      if (SL[i+1][j].piece_name =="none" || SL[i+1][j].color=="black"){                    
                              sl.lm.push(SL[i+1][j]);
                      }
                  }
                  if (ifin(i+1,r8) && ifin(j+1,r8)){           
                      if (SL[i+1][j+1].piece_name =="none" || SL[i+1][j+1].color=="black"){                    
                              sl.lm.push(SL[i+1][j+1]);
                      }
                  }           
                  if (ifin(i+1,r8) && ifin(j-1,r8)){           
                      if (SL[i+1][j-1].piece_name =="none" || SL[i+1][j-1].color=="black"){                    
                              sl.lm.push(SL[i+1][j-1]);
                      }
                  }                         
                  if (ifin(i,r8) && ifin(j-1,r8)){           
                      if (SL[i][j-1].piece_name =="none" || SL[i][j-1].color=="black"){                    
                              sl.lm.push(SL[i][j-1]);
                      }
                  }  
                  if (ifin(i,r8) && ifin(j+1,r8)){           
                      if (SL[i][j+1].piece_name =="none" || SL[i][j+1].color=="black"){                    
                              sl.lm.push(SL[i][j+1]);
                      }
                  }
                  if (ifin(i-1,r8) && ifin(j,r8)){           
                      if (SL[i-1][j].piece_name =="none" || SL[i-1][j].color=="black"){                    
                              sl.lm.push(SL[i-1][j]);
                      }
                  }
                  if (ifin(i-1,r8) && ifin(j+1,r8)){           
                      if (SL[i-1][j+1].piece_name =="none" || SL[i-1][j+1].color=="black"){                    
                              sl.lm.push(SL[i-1][j+1]);
                      }
                  }                
                  if (ifin(i-1,r8) && ifin(j-1,r8)){           
                      if (SL[i-1][j-1].piece_name =="none" || SL[i-1][j-1].color=="black"){                    
                              sl.lm.push(SL[i-1][j-1]);
                      }
                  }
              }else if(sl.color=="black"){
                  if (ifin(i+1,r8) && ifin(j,r8)){
                      if (SL[i+1][j].piece_name =="none" || SL[i+1][j].color=="white"){                    
                              sl.lm.push(SL[i+1][j]);
                      }
                  }
                  if (ifin(i+1,r8) && ifin(j+1,r8)){           
                      if (SL[i+1][j+1].piece_name =="none" || SL[i+1][j+1].color=="white"){                    
                              sl.lm.push(SL[i+1][j+1]);
                      }
                  }           
                  if (ifin(i+1,r8) && ifin(j-1,r8)){           
                      if (SL[i+1][j-1].piece_name =="none" || SL[i+1][j-1].color=="white"){                    
                              sl.lm.push(SL[i+1][j-1]);
                      }
                  }                        
                  if (ifin(i,r8) && ifin(j-1,r8)){           
                      if (SL[i][j-1].piece_name =="none" || SL[i][j-1].color=="white"){                    
                              sl.lm.push(SL[i][j-1]);
                      }
                  }  
                  if (ifin(i,r8) && ifin(j+1,r8)){           
                      if (SL[i][j+1].piece_name =="none" || SL[i][j+1].color=="white"){                    
                              sl.lm.push(SL[i][j+1]);
                      }
                  }
                  if (ifin(i-1,r8) && ifin(j,r8)){           
                      if (SL[i-1][j].piece_name =="none" || SL[i-1][j].color=="white"){                    
                              sl.lm.push(SL[i-1][j]);
                      }
                  }
                  if (ifin(i-1,r8) && ifin(j+1,r8)){           
                      if (SL[i-1][j+1].piece_name =="none" || SL[i-1][j+1].color=="white"){                    
                              sl.lm.push(SL[i-1][j+1]);
                      }
                  }                
                  if (ifin(i-1,r8) && ifin(j-1,r8)){           
                      if (SL[i-1][j-1].piece_name =="none" || SL[i-1][j-1].color=="white"){                    
                              sl.lm.push(SL[i-1][j-1]);
                      }
                  }
  
  
              }
  
          };
  
  
      }}
  
  
     }
  
  
      function ifin(x,sl){
          for (let i=0; i<sl.length; i++){
              if (sl[i]==x){
                  return true;
              }else if(i==sl.length-1){return false};
          }
  
      }
      function castles2(SL){
          let kingsidecastle=true;
          let queensidecastle=true;
          SL.forEach(s =>{s.forEach(sl=> {if (sl.piece_name=="king" && (sl.number==0 || sl.number==7) && sl.firstElementChild.already_moved==false){     
              SL.forEach(r=>{r.forEach(rk=>{
              if (rk.piece_name=="rook" && rk.number==sl.number && rk.firstElementChild.already_moved==false){
                  
                      if (rk.letter>sl.letter){
                          for(let j=sl.letter+1; j<rk.letter;j++){if (SL[rk.number][j].piece_name!="none"){kingsidecastle=false}}
                          SL.forEach(e=>{e.forEach(en=>{if(en.piece_name!="none"&&en.color!=rk.color){en.lm.forEach(enlm=>{if(enlm.number==rk.number&&enlm.letter<rk.letter&&enlm.letter>=sl.letter){kingsidecastle=false}
                          })
                          }})})
                          if(kingsidecastle){sl.lm.push(SL[sl.number][6])} 
                          
                      }else if (rk.letter<sl.letter){
                          for(let j=rk.letter+1; j<sl.letter;j++){if (SL[rk.number][j].piece_name!="none"){queensidecastle=false}}
                          SL.forEach(e=>{e.forEach(en=>{if(en.piece_name!="none"&&en.color!=rk.color){en.lm.forEach(enlm=>{if(enlm.number==rk.number&&enlm.letter<=sl.letter&&enlm.letter>rk.letter){queensidecastle=false}
                          })
                          }})})
                          if(queensidecastle){sl.lm.push(SL[sl.number][2])}
                      }
  
              }
              }
              )}
          )}})})}
          
      
      function in_check(SL){
          let check=false;
          for (let i=0; i<8;i++){for(let j=0;j<8;j++){ if(SL[i][j].piece_name=="king"){
                for(let k=0;k<8;k++){for(let l=0;l<8;l++){if(SL[k][l].piece_name!="none"&&SL[k][l].color!=SL[i][j].color&&ifin(SL[i][j],SL[k][l].lm)){
                  check=true;
                  
                    }if(k==7 && l==7){SL[i][j].check=check; check=false}
                  }}
              }}}
          for (let i=0; i<8;i++){for(let j=0;j<8;j++){ if(SL[i][j].piece_name=="king"){
              for(let k=0;k<8;k++){for(let l=0;l<8;l++){if(SL[k][l].piece_name!="none"&&SL[k][l].color==SL[i][j].color){
                  SL[k][l].check=SL[i][j].check
              }}}
  
          }}}
      }
      function checkmate(LIS){
          let mate=true;
          let stalemate=true;
          LIS.forEach(li=>{li.forEach(lis=>{
              if(lis.turn==true && lis.check==true && lis.piece_name!="none"){
                  lis.lm.forEach(lim=>{if(lim.length!=0){mate=false;stalemate=false}})}
              if(lis.turn==true && lis.check==false && lis.piece_name!="none"){mate=false;
                  lis.lm.forEach(lim=>{if(lim.length!=0){stalemate=false}})}
          })});
          
          if (mate==true){console.log("check mate!")}else if(stalemate==true){console.log("stalemate!")
             for(s of SL){for (sl of SL){if(sl.turn==true|| sl.check==true){console.log(sl)}}}}
          //sqrs.forEach(sqr=>{if (sqr.color=="black"){console.log(sqr.lm)}})
  
      }
      function castles(SL){
          let kingsidecastle=true;
          let queensidecastle=true;
  
          for (let i=0; i<8; i++){for(let k=0; k<8; k++){
              if((SL[i][k].number==0 || SL[i][k].number==7) && SL[i][k].piece_name=="king" && SL[i][k].firstElementChild.already_moved==false){
                  for(let r=0;r<8;r++){if(SL[i][r].piece_name=="rook"&& SL[i][r].firstElementChild.already_moved==false&&SL[i][r].color==SL[i][k].color){
                      if(k>r && k>=2){
                         for(let p=2;p<=k;p++){if(SL[i][p].piece_name!="none"){if(SL[i][p]!=SL[i][k]&&SL[i][p]!=SL[i][r]){
                                queensidecastle=false;
                          }}}
  
                          if(r<2){for(let p=r;p<=3;p++){if(SL[i][p].piece_name!="none"){if(SL[i][p]!=SL[i][k]&&SL[i][p]!=SL[i][r]){
                              queensidecastle=false;
                          }}}}
  
                          if(queensidecastle==true){for(en of sqrs){if(en.piece_name!="none"&&en.color!=SL[i][k].color){
                               for(enlm of en.lm){if(enlm.number==i && enlm.letter>=2 && enlm.letter<=k){queensidecastle=false;}}
                          }}}
                          if(queensidecastle){SL[i][k].lm.push(SL[i][2]);SL[i][k].queensidecastle=true}else{SL[i][k].queensidecastle=false}
                      }else if(k>r && k<2){
                          for(let p=k;p<=2;p++){if(SL[i][p].piece_name!="none"){if(SL[i][p]!=SL[i][k]&&SL[i][p]!=SL[i][r]){
                              queensidecastle=false;
                          }}}
  
                          if(r<2){for(let p=r;p<=3;p++){if(SL[i][p].piece_name!="none"){if(SL[i][p]!=SL[i][k]&&SL[i][p]!=SL[i][r]){
                              queensidecastle=false;
                          }}}}
  
                          if(queensidecastle==true){for(en of sqrs){if(en.piece_name!="none"&&en.color!=SL[i][k].color){
                              for(enlm of en.lm){if(enlm.number==i && enlm.letter<=2 && enlm.letter>=k){queensidecastle=false;}}
                          }}}
                          if(queensidecastle){SL[i][k].lm.push(SL[i][2]);SL[i][k].queensidecastle=true}else{SL[i][k].queensidecastle=false} 
                      }else if(k<r && k<=6){
                          for(let p=k;p<=6;p++){if(SL[i][p].piece_name!="none"){if(SL[i][p]!=SL[i][k]&&SL[i][p]!=SL[i][r]){
                              kingsidecastle=false;
                          }}}
  
                          if(r>6){for(let p=5;p<=r;p++){if(SL[i][p].piece_name!="none"){if(SL[i][p]!=SL[i][k]&&SL[i][p]!=SL[i][r]){
                              kingsidecastle=false;
                          }}}}
  
                          if(kingsidecastle==true){for(en of sqrs){if(en.piece_name!="none"&&en.color!=SL[i][k].color){
                              for(enlm of en.lm){if(enlm.number==i && enlm.letter<=6 && enlm.letter>=k){kingsidecastle=false;}}
                          }}}
                          if(kingsidecastle){SL[i][k].lm.push(SL[i][6]);SL[i][k].kingsidecastle=true}else{SL[i][k].kingsidecastle=false} 
                      }else if(k<r && k>6){
                          for(let p=5;p<=k;p++){if(SL[i][p].piece_name!="none"){if(SL[i][p]!=SL[i][k]&&SL[i][p]!=SL[i][r]){
                              kingsidecastle=false;
                          }}}
                          if(kingsidecastle==true){for(en of sqrs){if(en.piece_name!="none"&&en.color!=SL[i][k].color){
                              for(enlm of en.lm){if(enlm.number==i && enlm.letter>=6 && enlm.letter<=k){kingsidecastle=false;}}
                          }}}
                          if(kingsidecastle){SL[i][k].lm.push(SL[i][6]);SL[i][k].kingsidecastle=true}else{SL[i][k].kingsidecastle=false}
                      }
  
  
                  }else if(SL[i][r].piece_name=="rook"){if(r<k){SL[i][k].queensidecastle=false}else if(r>k){SL[i][k].kingsidecastle=false}}
                  }
              }else if(SL[i][k].piece_name=="king"){SL[i][k].queensidecastle=false;SL[i][k].kingsidecastle=false}
  
  
  
          }}
      }
  
      function castle_handler(e){
          e.preventDefault();
          console.log("castle_handler")
          let rook;
          if(e.target.id=="pieces"){rook=e.target.parentNode}else{rook=e.target}
          
          let i=draggedparent.number;
          let j=draggedparent.letter;
          let king=draggedparent;
          let cking=copyObject(king);
          let crook=copyObject(rook);
          draggeditem.already_moved=true;
          rook.firstElementChild.already_moved=true;
          move_to_PGN(king,rook);
          let move_data={i:`${i}`,j:`${j}`,i2:`${rook.number}`,j2:`${rook.letter}`,pro:false,PGN:pgnlist}
          move_socket_update(move_data)
          if(king.letter<rook.letter){
  
              if(draggeditem.parentNode.piece_name=="king" || draggeditem.parentNode.piece_name=="rook"){draggeditem.already_moved=true}
  
              SL[i][5].append(rook.firstElementChild);               
              SL[i][5].style.background="yellow";
              SL[i][5].piece_name=crook.piece_name;
              SL[i][5].color=crook.color;                    
              SL[i][5].pImage=crook.pImage;
  
              // if (SL[i][6].firstElementChild!=null && SL[i][6].id!=king.id){
              //     SL[i][6].firstElementChild.remove();
              // }
              SL[i][6].append(draggeditem);               
              SL[i][6].style.background="yellow";
              SL[i][6].piece_name=cking.piece_name;
              SL[i][6].color=cking.color;                    
              SL[i][6].pImage=cking.pImage;
              sqrs.forEach(tg=>{
                  if (tg.color==draggedparent.color){
                      tg.turn=false;                   
                  }else if(tg.piece_name!="none" && tg.color!=draggedparent.color){tg.turn=true}
              });
              if(j!=6 && j!=5){                    
                  king.piece_name="none";
                  king.color="none";
                  king.pImage="none";
              }
              if(rook.letter!=6 && rook.letter!=5){
                  rook.piece_name="none";
                  rook.color="none";
                  rook.pImage="none";
              }
  
          }else if(king.letter>rook.letter){
              if(draggeditem.parentNode.piece_name=="king" || draggeditem.parentNode.piece_name=="rook"){draggeditem.already_moved=true}
  
              SL[i][3].append(rook.firstElementChild);               
              SL[i][3].style.background="yellow";
              SL[i][3].piece_name=crook.piece_name;
              SL[i][3].color=crook.color;                    
              SL[i][3].pImage=crook.pImage;
  
              // if (SL[i][6].firstElementChild!=null && SL[i][6].id!=king.id){
              //     SL[i][6].firstElementChild.remove();
              // }
              SL[i][2].append(draggeditem);               
              SL[i][2].style.background="yellow";
              SL[i][2].piece_name=cking.piece_name;
              SL[i][2].color=cking.color;                    
              SL[i][2].pImage=cking.pImage;
              sqrs.forEach(tg=>{
                  if (tg.color==draggedparent.color){
                      tg.turn=false;                   
                  }else if(tg.piece_name!="none" && tg.color!=draggedparent.color){tg.turn=true}
              });
              if(j!=3 && j!=2){                    
                  king.piece_name="none";
                  king.color="none";
                  king.pImage="none";
              }
              if(rook.letter!=3 && rook.letter!=2){
                  rook.piece_name="none";
                  rook.color="none";
                  rook.pImage="none";
  
              }
  
          }
          lm_arrange(SL);
          in_check(SL);
          castles(SL);
          lm_remove();
          legal_drag();
          checkmate(SL);
  
      }   
      
     function lm_remove(){
          SL.forEach(s=>{s.forEach(sqr=>{//console.log(draggedparent);
              if(sqr.turn==true && sqr.piece_name!="none"){     
          sqr.lm.forEach(le=>{
              let copySL=copyLIST(SL);
              let le2=copySL[le.number][le.letter];
              let sqr2=copySL[sqr.number][sqr.letter];
          move_capture2(sqr2,le2,copySL);
          lm_arrange(copySL);
          in_check(copySL);
          //console.log(draggedparent2,le2);
          if(le2.check==true){ 
              for( let i = 0; i < sqr.lm.length; i++){ 
                  if ( sqr.lm[i] == le) {
                      sqr.lm[i]=[];
                  //sqr.lm.splice(i, 1);
                  //console.log(draggedparent.lm); 
                  }
              }
          }
          })}})})
          
      }
      
      let destination;
      let source;
  
      function prom(colr,lettr,drg,trg){
  
         destination=trg;
         source=drg;
         console.log(colr);
         console.log(lettr)
         promotion.style.left=`${lettr*65}px`
         let pro_pieces=document.querySelectorAll(".pro");
  
         for (pp of pro_pieces){
             if (pp.firstElementChild!=null){pp.firstElementChild.remove()}
          pp.pImage=new Image(board.clientWidth/8-1,board.clientHeight/8-1);
          pp.pImage.already_moved=true;
          pp.pImage.src=`staticassets/board/images/sprites/${colr+pp.id}.png`;
          pp.pImage.id="pieces";
          pp.appendChild(pp.pImage);
          pp.pImage.style.position="absolute";
          pp.pImage.style.height="100%";
          pp.pImage.style.width="100%";
          pp.piece_name=`${pp.id}`;
          pp.color=colr;
                  
            
          }
         promotion.style.display="block";
         for(pp of pro_pieces){
           console.log(pp.firstElementChild,pp.piece_name,pp.color)     
           pp.addEventListener("click",prohandler)
          }
          window.addEventListener("click",function(e){
              if (e.target!=promotion){promotion.style.display="none"}})
  
          
            
          }
  
      function prohandler(e){
          let trg;
          if(e.target.id=="pieces"){trg=e.target.parentNode}else{trg=e.target}        
          // let i=draggedparent.number;
          // let j=draggedparent.letter;
          // let drg=draggedparent;
  
          if(trg.piece_name=="rook"){trg.firstElementChild.already_moved=true}
          if(destination.firstElementChild!=null){destination.firstElementChild.remove()}
          destination.append(trg.firstElementChild);               
          destination.style.background="yellow";
          destination.piece_name=trg.piece_name;
  
          destination.color=trg.color;                    
          destination.pImage=trg.pImage;
          sqrs.forEach(tg=>{
          if (tg.color==trg.color){
              tg.turn=false;
              
          }else if(tg.piece_name!="none" && tg.color!=trg.color){tg.turn=true}
          });

            let i=source.number;
            let j=source.letter;
            

          move_to_PGN(source,destination,pro=`${trg.piece_name[0].toUpperCase()}`)
          let move_data={i:`${i}`,j:`${j}`,i2:`${destination.number}`,j2:`${destination.letter}`,pro:`${destination.piece_name[0].toUpperCase()}`,PGN:pgnlist}
          move_socket_update(move_data)
          source.firstElementChild.remove();                    
          source.piece_name="none";
          source.color="none";
          source.pImage="none";
  
          promotion.style.display="none";
          
          lm_arrange(SL);
          in_check(SL);
          castles(SL);
          lm_remove();
          legal_drag();
          checkmate(SL);
        }

    
    function flip_board(){
        for(let i=0;i<sqrs.length; i++){
          sqrs[i].position={bottom:`${(7-sqrs[i].number)*board.clientWidth/8}px` , left:`${(7-sqrs[i].letter)*board.clientWidth/8}px`};
          sqrs[i].style.bottom=sqrs[i].position.bottom;
          sqrs[i].style.left=sqrs[i].position.left;
          console.log(sqrs[i]);
        }
    }
    
    
    

   function nextMove(drg,trg,promotion,){

    }


    function PGN_move_capture(i,j,i2,j2,pro=false,div=true){
        console.log("pgn_move_capture")
        sqrs.forEach(sqr=>{
            sqr.BG1=sqr.BG;
            sqr.style.background=`${sqr.BG}`;
            });
        
    //console.log("drop");
    i=Number(i);
    j=Number(j);
    i2=Number(i2);
    j2=Number(j2);
    let trg = SL[i2][j2];  
    //let i=draggedparent.number;
    //let j=draggedparent.letter;
    let drg=SL[i][j];
    
    if(div){move_to_PGN(drg,trg,pro)}

    //promotion
    for(let i=1;i<Capital.length;i++){
        if(pro==Capital[i]){
        pro={piece_name:pieces[i]}
        break; 
        }else if(pro==Capital[0]){pro={piece_name:"knight"}}
    }
    if ((trg.number==0 || trg.number==7) && drg.piece_name=="pawn"){
                console.log(trg);
                if(trg.firstElementChild!=null){trg.firstElementChild.remove()}
                //trg.pImage="none";
                trg.pImage=new Image(board.clientWidth/8-1,board.clientHeight/8-1);
                trg.pImage.id="pieces"
                trg.pImage.already_moved=true;
                console.log(pro.piece_name);
                trg.pImage.src=`staticassets/board/images/sprites/${SL[i][j].color+pro.piece_name}.png`;
                trg.appendChild(trg.pImage);
                trg.pImage.style.position="absolute";
                trg.pImage.style.top="0%";
                trg.pImage.style.left="0%";

        if(pro.piece_name=="rook"){trg.firstElementChild.already_moved=true}
        
        //trg.append(pro.firstElementChild);               
        trg.style.background="yellow";
        trg.piece_name=pro.piece_name;

        trg.color=drg.color;                    
        // trg.pImage=pro.pImage;
        sqrs.forEach(tg=>{
        if (tg.color==drg.color){
            tg.turn=false;
            
        }else if(tg.piece_name!="none" && tg.color!=drg.color){tg.turn=true}
        });
        
        drg.firstElementChild.remove();                    
        drg.piece_name="none";
        drg.color="none";
        drg.pImage="none";

        //promotion.style.display="none";
        lm_arrange(SL);
        in_check(SL);
        castles(SL);
        lm_remove();
        legal_drag();
        checkmate(SL); 
    }else if( drg.piece_name=="king" && drg.color==trg.color){
         PGN_castle_handler(drg,trg);
    }else{
    //capture after making en passant
    if (SL[i][j].piece_name == "pawn"){
        if (SL[i][j].number+1==trg.number && SL[i][j].letter+1==trg.letter && trg.piece_name=="none"){
            SL[i][j+1].piece_name="none";
            SL[i][j+1].color="none";
            SL[i][j+1].pImage="none";
            if (SL[i][j+1].firstElementChild!=null){SL[i][j+1].firstElementChild.remove()}
        }else if(SL[i][j].number+1==trg.number && SL[i][j].letter-1==trg.letter && trg.piece_name=="none"){
            SL[i][j-1].piece_name="none";
            SL[i][j-1].color="none";
            SL[i][j-1].pImage="none";
            if (SL[i][j-1].firstElementChild!=null){SL[i][j-1].firstElementChild.remove()} 
        }else if (SL[i][j].number-1 ==trg.number && SL[i][j].letter+1 ==trg.letter && trg.piece_name=="none"){
            SL[i][j+1].piece_name="none";
            SL[i][j+1].color="none";
            SL[i][j+1].pImage="none";
            if (SL[i][j+1].firstElementChild!=null){SL[i][j+1].firstElementChild.remove()}
        }else if (SL[i][j].number-1 == trg.number && SL[i][j].letter-1 == trg.letter && trg.piece_name=="none"){
            SL[i][j-1].piece_name="none";
            SL[i][j-1].color="none";
            SL[i][j-1].pImage="none";
            if (SL[i][j-1].firstElementChild!=null){SL[i][j-1].firstElementChild.remove()}
        }
        //promotion    
        
        

    //update rook position after castles
    
    }else if( SL[i][j].piece_name =="king"){
        console.log(SL[i][j].color,trg.color)  
        if (SL[i][j].number==0 || SL[i][j].number==7){
            if ((trg.letter-SL[i][j].letter)>1 || (trg.color==SL[i][j].color)){
                console.log("castles")
                for(r of SL){for(rk of r){if (rk.piece_name=="rook"&&rk.number==SL[i][j].number&&rk.color==SL[i][j].color&&rk.letter>SL[i][j].letter){
                    SL[rk.number][5].appendChild(rk.firstElementChild);                
                    SL[rk.number][5].piece_name=rk.piece_name;
                    SL[rk.number][5].color=rk.color;                    
                    SL[rk.number][5].pImage=rk.pImage;
                    if(rk.letter!=5){                  
                        rk.piece_name="none";
                        rk.color="none";
                        rk.pImage="none";
                    }
                    break;
                    
                }
                }}
            }else if((trg.letter-SL[i][j].letter)<-1 || (trg.color==SL[i][j].color)){
                console.log("castles")
                for(l of SL){for (lk of l){if (lk.piece_name=="rook"&&lk.number==SL[i][j].number&&lk.color==SL[i][j].color&&lk.letter<SL[i][j].letter){
                    SL[lk.number][3].append(lk.firstElementChild);                
                    SL[lk.number][3].piece_name=lk.piece_name;console.log( SL[lk.number][3]);
                    SL[lk.number][3].color=lk.color;                    
                    SL[lk.number][3].pImage=lk.pImage;
                    if(lk.letter!=3){                   
                        lk.piece_name="none";
                        lk.color="none";
                        lk.pImage="none";
                    }
                    break;
                }
                }}
            }
        }
    }
    // setTimeout(function(){
        if (trg.firstElementChild!=null && trg!=drg){
                //console.log(trg.firstElementChild)
                trg.firstElementChild.remove();
        }
        if (trg.id!=drg.id){
                if(drg.piece_name=="king" || drg.piece_name=="rook"){drg.firstElementChild.already_moved=true}
                trg.append(drg.firstElementChild);               
                trg.style.background="yellow";
                trg.piece_name=drg.piece_name;

                trg.color=drg.color;                    
                trg.pImage=drg.pImage;
                sqrs.forEach(tg=>{
                if (tg.color==drg.color){
                    tg.turn=false;
                    
                }else if(tg.piece_name!="none" && tg.color!=drg.color){tg.turn=true}
                });                    
                drg.piece_name="none";
                drg.color="none";
                drg.pImage="none";
                
                //sqrs.forEach(sqr=>{console.log(sqr,sqr.turn)});                
        }
        
        
        
    // },0);
    lm_arrange(SL);
    in_check(SL);
    castles(SL);
    //sqrs.forEach(sqr=>{console.log(sqr,sqr.turn)});
    
    //en passant
    if (trg.piece_name == "pawn"){
        if (trg.number-SL[i][j].number>1){
            if (ifin(i+2,r8) && ifin(j-1,r8)){
                if (SL[i+2][j-1].piece_name=="pawn" && SL[i+2][j-1].color!=trg.color){
                    SL[i+2][j-1].lm.push(SL[i+1][j])
                }
            }
            if (ifin(i+2,r8) && ifin(j+1,r8)){
                if (SL[i+2][j+1].piece_name=="pawn" && SL[i+2][j+1].color!=trg.color){
                    SL[i+2][j+1].lm.push(SL[i+1][j])
                }
            }
        }else if (trg.number-SL[i][j].number<-1){
            if (ifin(i-2,r8) && ifin(j-1,r8)){
                if (SL[i-2][j-1].piece_name=="pawn" && SL[i-2][j-1].color!=trg.color){
                    SL[i-2][j-1].lm.push(SL[i-1][j])
                }
            }
            if (ifin(i-2,r8) && ifin(j+1,r8)){
                if (SL[i-2][j+1].piece_name=="pawn" && SL[i-2][j+1].color!=trg.color){
                    SL[i-2][j+1].lm.push(SL[i-1][j])
                }
            }
        }
    }
    console.log(SL);
    

    // //let LM=draggedparent.lm;
    // SL.forEach(s=>{s.forEach(sqr=>{//console.log(draggedparent);
    //     if(sqr.turn==true && sqr.piece_name!="none"){     
    //   sqr.lm.forEach(le=>{
    //     let copySL=copyLIST(SL);
    //     let le2=copySL[le.number][le.letter];
    //     let sqr2=copySL[sqr.number][sqr.letter];
    //   move_capture2(sqr2,le2,copySL);
    //   lm_arrange(copySL);
    //   in_check(copySL);
    //   //console.log(draggedparent2,le2);
    //   if(le2.check==true){ 
    //       for( let i = 0; i < sqr.lm.length; i++){ 
    //         if ( sqr.lm[i] == le) {
    //             sqr.lm[i]=[];
    //           //sqr.lm.splice(i, 1);
    //           //console.log(draggedparent.lm); 
    //         }
    //       }
    //   }
    //  })}})})
    lm_remove();

    legal_drag();
    checkmate(SL);
    //console.log(SL[0][4].firstElementChild.already_moved);


    }
        
    }



    function PGN_castle_handler(drg,trg){
        
  
        let rook=trg
        
        let i=drg.number;
        let j=drg.letter;
        let king=drg;
        let cking=copyObject(king);
        let crook=copyObject(rook);
        drgi=drg.firstElementChild;
        drgi.already_moved=true;
        rook.firstElementChild.already_moved=true;
        if(king.letter<rook.letter){

            if(drgi.parentNode.piece_name=="king" || drgi.parentNode.piece_name=="rook"){drgi.already_moved=true}

            SL[i][5].append(rook.firstElementChild);               
            SL[i][5].style.background="yellow";
            SL[i][5].piece_name=crook.piece_name;
            SL[i][5].color=crook.color;                    
            SL[i][5].pImage=crook.pImage;

            // if (SL[i][6].firstElementChild!=null && SL[i][6].id!=king.id){
            //     SL[i][6].firstElementChild.remove();
            // }
            SL[i][6].append(drgi);               
            SL[i][6].style.background="yellow";
            SL[i][6].piece_name=cking.piece_name;
            SL[i][6].color=cking.color;                    
            SL[i][6].pImage=cking.pImage;
            sqrs.forEach(tg=>{
                if (tg.color==drg.color){
                    tg.turn=false;                   
                }else if(tg.piece_name!="none" && tg.color!=drg.color){tg.turn=true}
            });
            if(j!=6 && j!=5){                    
                king.piece_name="none";
                king.color="none";
                king.pImage="none";
            }
            if(rook.letter!=6 && rook.letter!=5){
                rook.piece_name="none";
                rook.color="none";
                rook.pImage="none";
            }

        }else if(king.letter>rook.letter){
            if(drgi.parentNode.piece_name=="king" || drgi.parentNode.piece_name=="rook"){drgi.already_moved=true}

            SL[i][3].append(rook.firstElementChild);               
            SL[i][3].style.background="yellow";
            SL[i][3].piece_name=crook.piece_name;
            SL[i][3].color=crook.color;                    
            SL[i][3].pImage=crook.pImage;

            // if (SL[i][6].firstElementChild!=null && SL[i][6].id!=king.id){
            //     SL[i][6].firstElementChild.remove();
            // }
            SL[i][2].append(drgi);               
            SL[i][2].style.background="yellow";
            SL[i][2].piece_name=cking.piece_name;
            SL[i][2].color=cking.color;                    
            SL[i][2].pImage=cking.pImage;
            sqrs.forEach(tg=>{
                if (tg.color==drg.color){
                    tg.turn=false;                   
                }else if(tg.piece_name!="none" && tg.color!=drg.color){tg.turn=true}
            });
            if(j!=3 && j!=2){                    
                king.piece_name="none";
                king.color="none";
                king.pImage="none";
            }
            if(rook.letter!=3 && rook.letter!=2){
                rook.piece_name="none";
                rook.color="none";
                rook.pImage="none";

            }

        }
        lm_arrange(SL);
        in_check(SL);
        castles(SL);
        lm_remove();
        legal_drag();
        checkmate(SL);

    }



    // function PGN_castle_handler(color,queenside=false,kingside=false){
        
    //     if (queenside){
    //         let rook;
    //         let king;
    //         for(sqr of sqrs){if (sqr.color==color && king.piece_name=="king"){

    //         for(j=king.letter;j>=0;j--){if (SL[king.number][j].piece_name=="rook" && SL[king.number][j].color==king.color){
    //             rook=SL[king.number][j];
    //             king=sqr
    //         }
    //         }          
    //         }}
    //             i=king.number;
    //             SL[i][3].append(rook.firstElementChild);               
    //             SL[i][3].style.background="yellow";
    //             SL[i][3].piece_name=rook.piece_name;
    //             SL[i][3].color=rook.color;                    
    //             SL[i][3].pImage=rook.pImage;
    
    //             // if (SL[i][6].firstElementChild!=null && SL[i][6].id!=king.id){
    //             //     SL[i][6].firstElementChild.remove();
    //             // }
    //             SL[i][2].append(king.firstElementChild);               
    //             SL[i][2].style.background="yellow";
    //             SL[i][2].piece_name=king.piece_name;
    //             SL[i][2].color=king.color;                    
    //             SL[i][2].pImage=king.pImage;
    //             sqrs.forEach(tg=>{
    //                 if (tg.color==king.firstElementChild.color){
    //                     tg.turn=false;                   
    //                 }else if(tg.piece_name!="none" && tg.color!=king.firstElementChild.color){tg.turn=true}
    //             });
    //             if(king.letter!=2 && king.letter!=3){                    
    //                 king.piece_name="none";
    //                 king.color="none";
    //                 king.pImage="none";
    //             }
    //             if(rook.letter!=2 && rook.letter!=3){
    //                 rook.piece_name="none";
    //                 rook.color="none";
    //                 rook.pImage="none";
    //             }

    //     }else if(kingside){
    //         let rook;
    //         let king;

    //         for(sqr of sqrs){if (sqr.color==color && sqr.piece_name=="king"){
    //             for(j=king.letter;j>=0;j--){if (SL[king.number][j].piece_name=="rook" && SL[king.number][j].color==king.color){
    //                 rook=SL[king.number][j];
    //                 king=sqr
    //         }

    //         let i=king.number;
    //         SL[i][5].append(rook.firstElementChild);               
    //         SL[i][5].style.background="yellow";
    //         SL[i][5].piece_name=rook.piece_name;
    //         SL[i][5].color=rook.color;                    
    //         SL[i][5].pImage=rook.pImage;

    //         // if (SL[i][6].firstElementChild!=null && SL[i][6].id!=king.id){
    //         //     SL[i][6].firstElementChild.remove();
    //         // }
    //         SL[i][6].append(king.firstElementChild);               
    //         SL[i][6].style.background="yellow";
    //         SL[i][6].piece_name=king.piece_name;
    //         SL[i][6].color=king.color;                    
    //         SL[i][6].pImage=king.pImage;
    //         sqrs.forEach(tg=>{
    //             if (tg.color==king.color){
    //                 tg.turn=false;                   
    //             }else if(tg.piece_name!="none" && tg.color!=king.color){tg.turn=true}
    //         });
    //         if(king.letter!=6 && king.letter!=5){                    
    //             king.piece_name="none";
    //             king.color="none";
    //             king.pImage="none";
    //         }
    //         if(rook.letter!=6 && rook.letter!=5){
    //             rook.piece_name="none";
    //             rook.color="none";
    //             rook.pImage="none";
    //         }
    //     }}
                
    //         }


    //     }

    //     lm_arrange(SL);
    //     in_check(SL);
    //     castles(SL);
    //     lm_remove();
    //     legal_drag();
    //     checkmate(SL);

    // }



    function move_socket_update(move_data){
        socket.emit('move_update',move_data)
        
    }



   

  // ////////////////////////////////////////////////////////////////////////////////////////// PGN spliter
  var replay_area=document.getElementById('replay_area');
  var PGNinput=document.getElementById('PGN_Area');
  var PGNbtn=document.getElementById('PGNbtn');
  const Capital=["K","Q","R","B","N"];
  pieces=["king","queen","rook","bishop","knight"];
 // const letters=["a", "b", "c", "d" ,"e", "f", "g", "h"];
  const numbs=[0,1,2,3,4,5,6,7,8,9];
  let pgnlist=[];
  

   function set_standard(){
    for (sqr of sqrs){
        sqr.piece_name="none"
        if (sqr.firstElementChild!=null){sqr.firstElementChild.remove()}   
    }
    // set board to standard position
    for (let j=0;j<8;j++){ 
        SL[1][j].piece_name="pawn";
        SL[0][j].color="white";
        SL[1][j].color="white";
        SL[6][j].piece_name="pawn";
        SL[6][j].color="black";
        SL[7][j].color="black";
    }
    SL[0][0].piece_name=SL[7][0].piece_name=SL[0][7].piece_name=SL[7][7].piece_name="rook";
    SL[0][1].piece_name=SL[7][1].piece_name=SL[0][6].piece_name=SL[7][6].piece_name="knight";
    SL[0][2].piece_name=SL[7][2].piece_name=SL[0][5].piece_name=SL[7][5].piece_name="bishop";
    SL[0][3].piece_name=SL[7][3].piece_name="queen";
    SL[0][4].piece_name=SL[7][4].piece_name="king";

    for (let i=0;i<8;i++){for (let j=0;j<8;j++){
        if (SL[i][j].piece_name!="none"){
            
        SL[i][j].pImage=new Image(board.clientWidth/8-1,board.clientHeight/8-1);
        SL[i][j].pImage.id="pieces"
        SL[i][j].pImage.already_moved=false;
        SL[i][j].pImage.src=`staticassets/board/images/sprites/${SL[i][j].color+SL[i][j].piece_name}.png`;
        SL[i][j].appendChild(SL[i][j].pImage);
        SL[i][j].pImage.style.position="absolute";
        SL[i][j].pImage.style.top="0%";
        SL[i][j].pImage.style.left="0%";
                
        }   
    }}
    lm_arrange(SL);
   }

  PGNbtn.addEventListener("click",function(e){
      console.log("pgnbtn");
      e.preventDefault;
      pgnlist=[];

    if(PGNinput.value){
        
      set_standard();
      obj={buf:`${PGNinput.value}`}
      text=obj.buf;
      text=cut(text);
      pl=PGN_list(text);
      console.log(pl);
      
    //   cc=`<div id="replaylist">
    //     </div>`
    //   bb=`<div class="replayitems">
    //     </div>` 
    //     var cctemplate = ejs.render(cc);
        
    //     replay_area.append(cctemplate);
    //     replaylist=document.getElementById('replaylist');
      let licc='';
      for (let i=0;i<pl.length; i++){

        cc=`<div class="replaylist">               
                    <div class="replay_move" id="${pl[i][0]}">${pl[i][0]}</div>
                    <%if ("${pl[i][1]}"!="undefined") { %>
                        <div class="replay_move" id="${pl[i][1]}">${pl[i][1]}</div>
                    <% } %>            
            </div>`
        licc=licc+cc;
       }

        var cctemplate = ejs.render(licc);
        replay_area.innerHTML=cctemplate;

        for (let i=0;i<pl.length; i++){
          if (pl[i][0]){
               w=document.getElementById(`${pl[i][0]}`);
               w.addEventListener("click",function(){
                   set_standard();
                   for (let k=0;k<=i;k++){
                       if(k==i){
                          if(ifin(pl[k][0][0],numbs)){
                                whi=white(pl[k][0],"white");
                                PGN_move_capture(whi.i,whi.j,whi.i2,whi.j2,whi.pro,div=false);
                            }else{bla=black(pl[k][0],"black");
                            PGN_move_capture(bla.i,bla.j,bla.i2,bla.j2,bla.pro,div=false);}
                       }else{
                            if(ifin(pl[k][0][0],numbs)){
                                whi=white(pl[k][0],"white");
                                PGN_move_capture(whi.i,whi.j,whi.i2,whi.j2,whi.pro,div=false);
                            }else{bla=black(pl[k][0],"black");
                            PGN_move_capture(bla.i,bla.j,bla.i2,bla.j2,bla.pro,div=false);}
                            if(pl[k][1]){
                                bla=black(pl[k][1],"black");
                                PGN_move_capture(bla.i,bla.j,bla.i2,bla.j2,bla.pro,div=false);
                            }
                       }
                        
                   }                  
                })
               
            }
          if (pl[i][1]){
              console.log(typeof(pl[i][1]))
                B=document.getElementById(`${pl[i][1]}`);
                B.addEventListener("click",function(){
                    set_standard();
                    for (let k=0;k<=i;k++){
                            if(ifin(pl[k][0][0],numbs)){
                                whi=white(pl[k][0],"white");
                                PGN_move_capture(whi.i,whi.j,whi.i2,whi.j2,whi.pro,div=false);
                            }else{bla=black(pl[k][0],"black");
                            PGN_move_capture(bla.i,bla.j,bla.i2,bla.j2,bla.pro,div=false);
                            }
                         if(pl[k][1]){
                            bla=black(pl[k][1],"black");
                            PGN_move_capture(bla.i,bla.j,bla.i2,bla.j2,bla.pro,div=false);
                        }
                    } 
                })
            }
        }
      
      //console.log(p);
      // let o="";
      // value=input.value//=`${input.value}`;
     // if (value[1]=='\xa0'){console.log("whitespace");}
      
      
      // out=`${obj.buf[2]+obj.buf[3]+obj.buf[4]}`;
      // //for (i of out){if(i=="\""){out[0]="X";console.log(out)}}
      // for (let i=0;i<text.length;i++){o=`${o+text[i]}`}
      // o[0]="1."
      // console.log(o);
      // convert(out);
      
      //console.log(value[1].trim().length);
  }})
  

  function move_to_PGN(drg,trg,pro=false){
    let Mov;
    let pn={color:drg.color}
    
    
    if(drg.piece_name!="pawn"){for (let i=0;i<pieces.length;i++){if(drg.piece_name==pieces[i]){pn.Capital=Capital[i];break;}}}
    
    for(sqr of sqrs){
        if(sqr.id!=drg.id && sqr.color==drg.color&& sqr.piece_name==drg.piece_name && ifin(trg,sqr.lm)){
            
            if(sqr.piece_name=="pawn"){//e7x
                pn.letter=drg.letter
                break;
            }else if(sqr.letter==drg.letter){//R7
                pn.number=drg.number;
                console.log("rook number")
                break;                
            }else if(sqr.number==drg.number){//Ree2
                pn.letter=drg.letter;
                console.log("rook letter")
                break;               
            }else{pn.letter=drg.letter;
                
                if(pn.letter){console.log("rook letter",pn.letter);}
                break;
            }            
        }
    }
    //castles
    if (drg.piece_name=="king" && ( (trg.letter-drg.letter)>1 || (drg.letter-trg.letter)>1 || (trg.color==drg.color) )){  
            if(trg.letter>drg.letter){
                Mov="O-O"
            }else{Mov="O-O-O"}
        
     //en passant     
    }else if(drg.piece_name=="pawn" && trg.piece_name=="none" && trg.letter!=drg.letter){
        if(pn.letter!=undefined){//e5xd6
            Mov=drg.id+"x"+trg.id;
        }else{ Mov= letters[drg.letter]+"x"+trg.id;
        }
    }else{

        if(pro){
        if(trg.piece_name!="none"){
            if(pn.number){ //e7xd8=Q
                Mov=drg.id+"x"+trg.id+"="+pro
            }else{//exd7=Q
                Mov=letters[drg.letter]+"x"+trg.id+"="+pro
            } 
        }else{//e8=Q
            Mov=letters[drg.letter]+trg.number+"="+pro
        }
        }else{
            if(trg.piece_name!="none" ){//x
                
                if(pn.letter!=undefined && drg.piece_name!="pawn"){//Rexd5
                    console.log("letter",sqr)
                Mov=pn.Capital+letters[pn.letter]+"x"+trg.id
                
                }else if(pn.number!=undefined && drg.piece_name!="pawn"){//R2xd5
                Mov=pn.Capital+pn.number+"x"+trg.id
                }else{
                    if(drg.piece_name=="pawn"){
                        if(pn.letter!=undefined){//e4xd5
                            Mov=letters[drg.letter]+drg.number+"x"+trg.id
                        }else{//exd5
                            Mov=letters[drg.letter]+"x"+trg.id}                    
                    }else{//Rxd5
                        Mov=pn.Capital+"x"+trg.id
                    }
                }
            }else{
                if(pn.letter!=undefined){//Red5
                    if(drg.piece_name=="pawn"){//ed5
                        Mov=letters[drg.letter]+trg.id
                        console.log("pawn letter triggered")
                    }else{Mov=pn.Capital+letters[drg.letter]+trg.id;
                        console.log("capital letter triggered")
                    }               
                }else if(pn.number!=undefined){//R3d5
                    Mov=pn.Capital+drg.number+trg.id;
                    console.log("capital number triggered")
                }else{
                    if(drg.piece_name=="pawn"){//ed5
                        Mov=trg.id
                    }else{//Rd5
                        Mov=pn.Capital+trg.id
                        console.log("nothing triggered")
                    }
                }
            }
        }

    }
        if(pgnlist.length==0 && drg.color=="white"){
            pgnlist.push([`1.${Mov}`])
            create_div_PGN(`1.${Mov}`)
        }else if(pgnlist.length==0 && drg.color=="black"){
            pgnlist.push([`${Mov}`])
            create_div_PGN(`${Mov}`)
        }else if(drg.color=="white"){
            pgnlist.push([`${pgnlist.length+1}`+'.'+ Mov])
            create_div_PGN(`${pgnlist.length}`+'.'+ Mov)
        }else if(drg.color=="black"){
            pgnlist[pgnlist.length-1].push(Mov)
            create_div_PGN(`${Mov}`)
        }
        // console.log(pgnlist);
  }


  function convert(o){
      o[0]="1."
      console.log(o);
  
  }
  
  
  function cut(pos){
    i=0;
    text=""
    while(i<pos.length){
      if(pos[i]=="["){
        for(let k=i;k<pos.length;k++){
          if(pos[k]=="]"){
            i=k+1;
            
          }
        }
        continue; 
      }
      if(pos[i]=="{"){
        for(let k=i;k<pos.length;k++){
          if(pos[k]=="}"){
            i=k+1;
            
          }
        } 
        continue;
      }
      text=text+pos[i];
  
      i++;
    }
    //console.log(text);
    return text;
  }
  
  
  function PGN_list(pos){
      console.log(pos);
    let z=0;  
    let i=0;
    let k;
    t="";
    r="";
    let pairs=[];

    z=skip(pos,z);

    if(ifin(pos[z],letters) || ifin(pos[z],Capital)){
        b="";
       e=next_full(pos,z);
       for (let j=z;j<=e;j++){b=b+pos[j]}
       s=""
       for (let j=0;j<b.length;j++){j=skip(b,j);if(b[j]){s=s+b[j]}}
       pairs.push([s]);
    }
    while(i<pos.length){
      let k;
      t="";
      r="";
      i=skip(pos,i);
      
        if(pos[i]=="."){
                if(ifin(pos[i-1],numbs)){
                if(ifin(pos[i-2],numbs)){
                    k=i-2
                }else{
                    k=i-1  //kie4
                }
                }
            i=i+1;
            i=skip(pos,i);//12. i
            i=next_full(pos,i);
            for (let j=k;j<=i;j++){t=t+pos[j]}
            s=""
            for (let j=0;j<t.length;j++){j=skip(t,j);if(t[j]){s=s+t[j]}}
            console.log(s);
            i=i+1
            i=skip(pos,i);
            b=i
            i=next_full(pos,i)
            if(pos[i]){
                    for (let j=b;j<=i;j++){r=r+pos[j]}
                    console.log(r);
                    let li=[s,r];
                    pairs.push(li);
            }else{let li=[s];pairs.push(li)}
        }
      i++
      
    }
    
    return pairs;
  }
  
  
  
  function skip(pos,i){
    while(i<pos.length && pos[i].trim().length==0){
        i+=1;
        }
        return i;
  }
  
  function next_full(pos,i){
    while(i<pos.length-1 && pos[i].trim().length!=0){
      i+=1
  
    }
    return i;
  }


 /////////////////////////////////////////////////////////////////////////////////////////////// PGN  PARSER 
//const Capital=["K","Q","R","B","N"];
pieces=["king","queen","rook","bishop","knight"];
//const letters=["a", "b", "c", "d" ,"e", "f", "g", "h"];
//const numbs=[1,2,3,4,5,6,7];


// function PGN_list(pos){
//   pgn=[];
//   let i=0;
//   while (i<pos.length){
//     if (ifin(pos[i],numbs)){ //1       
//         if(buf[i+1]=="."||(ifin(buf[i+1],numbs)&&(buf[i+2]=="."))){ //1.
//           let k=i
//           let white="";
//           let black="";
//           next(i);
//           while(pos[i].trim().length!=0){i++;}
//           for (let j=k;j<i;j++){white=`${white+pos[j]}`}
//           next(i);
//           let m=i;
//           while(pos[i]!="."||(pos[i-1]=="p"||pos[i-1]=="e")){i++}
//           i=i-2;
//           for(let j=m;j<=i;j++){black=`${black+pos[j]}`}
//           pgn.push([white,black])
//          }      
//     }
//     i++;
//   }
//   function next(i){
//     while(pos[i].trim().lenth==0){
//         i+=1}
//     }
//  return pgn;
// }
//i,j,i2,j2

function white(buf,color){
    let drg;
    let trg;
    // let color="white";
    let i=-1;
    let pn={color:color, promotion:false};// color,letter,piece_name,number,promotion
    let trgid;
    while(i<buf.length){
        i++;
        
        next(i);
            if (ifin(buf[i],numbs)){ //1
                if(buf[i+1]=="."){ //1.
                    i=i+2;
                    next(i);
                    if(ifin(buf[i],Capital)){ //R
                        if(ifin(buf[i+1],letters)){ // Re
                            if(ifin(buf[i+2],letters)){// Rea
                                for (let j=0;j<Capital.length;j++){if(Capital[j]==buf[i]){pn.piece_name=pieces[j]}}
                                
                                pn.letter=buf[i+1];
                                trgid=buf[i+2]+buf[i+3]; //Rea7
                                break;
                                }else if(ifin(buf[i+2],numbs)){ //Re7
                                    for (let j=0;j<Capital.length;j++){if(Capital[j]==buf[i]){pn.piece_name=pieces[j]}}
                                    
                                    trgid=buf[i+1]+buf[i+2];
                                    break;

                                }else if(buf[i+2]=="x"){//Rex
                                    for (let j=0;j<Capital.length;j++){if(Capital[j]==buf[i]){pn.piece_name=pieces[j]}}
                                    pn.letter=buf[i+1];
                                    trid=buf[i+3]+buf[i+4]
                                    
                                    break;

                                }
                        }else if(ifin(buf[i+1],numbs)){//R3
                            for (let j=0;j<Capital.length;j++){if(Capital[j]==buf[i]){pn.piece_name=pieces[j]}}
                            pn.number=buf[i+1];
                                if (buf[i+2]=="x"){//R3x
                                    trgid=buf[i+3]+buf[i+4]; //R3xe3
                                    
                                    break;
                                    
                                }else if(ifin(buf[i+2],letters)){//R3a
                                  
                                    trgid=buf[i+2]+buf[i+3];  //R3a3
                                    break;         
                                }
                        }else if(buf[i+1]=="x"){//Rx
                            for (let j=0;j<Capital.length;j++){if(Capital[j]==buf[i]){pn.piece_name=pieces[j]}}
                            
                            trgid=buf[i+2]+buf[i+3]
                            
                            break;
                        }

                    }else if(ifin(buf[i],letters)){//e
                        pn.piece_name="pawn";
                        pn.letter=buf[i];
                        if(buf[i+1]=="x"){//ex
                            
                            if(buf[i+4]=="="){//exd8=
                               
                               trgid=buf[i+2]+buf[i+3]; 
                               pn.promotion=buf[i+5];
                               break;
                            }else{//exd5
                               trgid= buf[i+2]+buf[i+3];
                               break;  
                            }
                        
                        }else if(ifin(buf[i+1],numbs)){//e4                            
                        
                            if(buf[i+2]=="x"){//e4x
                                if(buf[i+5]=="="){//e7xd8=
                                    pn.number=buf[i+1];
                                    trgid=buf[i+3]+buf[i+4];
                                    pn.promotion=buf[i+6];
                                    break;
                                }else{
                                pn.number=buf[i+1];
                                trgid=buf[i+3]+buf[i+4]
                                break;
                                }
                                
                            }else if(buf[i+2]=="="){//e8=
                                trgid=buf[i]+buf[i+1];
                                pn.promotion=buf[i+3];
                                break;

                            }else{trgid=buf[i]+buf[i+1];break;}
                        }             
                    }
                }
            }
        if(i>=buf.length || buf[i]==undefined){
            break;
        }
    }

    function next(i){
        i=skip(buf,i);
    }
    console.log(trgid,pn);
    wh=SLsquar(pn,trgid);
    return wh
}


function black(buf,color){
    let i=-1;
    let pn={color:color}; // color,letter,piece_name,number,promotion
    let trgid;
    while(i<buf.length){
        i++;
        next(i);
    if(ifin(buf[i],Capital)){ //R
        if(ifin(buf[i+1],letters)){ // Re
            if(ifin(buf[i+2],letters)){// Rea
                for (let j=0;j<Capital.length;j++){if(Capital[j]==buf[i]){pn.piece_name=pieces[j]}}
                
                pn.letter=buf[i+1];
                trgid=buf[i+2]+buf[i+3]; //Rea7
                break;
                }else if(ifin(buf[i+2],numbs)){ //Re7
                    for (let j=0;j<Capital.length;j++){if(Capital[j]==buf[i]){pn.piece_name=pieces[j]}}
                    
                    trgid=buf[i+1]+buf[i+2];
                    break;

                }else if(buf[i+2]=="x"){//Rex
                    for (let j=0;j<Capital.length;j++){if(Capital[j]==buf[i]){pn.piece_name=pieces[j]}}
                    pn.letter=buf[i+1];
                    trid=buf[i+3]+buf[i+4]
                    
                    break;

                }
        }else if(ifin(buf[i+1],numbs)){//R3
            for (let j=0;j<Capital.length;j++){if(Capital[j]==buf[i]){pn.piece_name=pieces[j]}}
            pn.number=buf[i+1];
                if (buf[i+2]=="x"){//R3x
                    trgid=buf[i+3]+buf[i+4]; //R3xe3
                    
                    break;
                    
                }else if(ifin(buf[i+2],letters)){//R3a
                  
                    trgid=buf[i+2]+buf[i+3];  //R3a3
                    break;         
                }
        }else if(buf[i+1]=="x"){//Rx
            for (let j=0;j<Capital.length;j++){if(Capital[j]==buf[i]){pn.piece_name=pieces[j]}}
            
            trgid=buf[i+2]+buf[i+3]
            
            break;
        }

    }else if(ifin(buf[i],letters)){//e
        pn.piece_name="pawn";
        pn.letter=buf[i];
        if(buf[i+1]=="x"){//ex
            
            if(buf[i+4]=="="){//exd8=
               
               trgid=buf[i+2]+buf[i+3]; 
               pn.promotion=buf[i+5];
               break;
            }else{//exd5
               trgid= buf[i+2]+buf[i+3];
               break;  
            }
        
        }else if(ifin(buf[i+1],numbs)){//e4                            
        
            if(buf[i+2]=="x"){//e4x
                if(buf[i+5]=="="){//e7xd8=
                    pn.number=buf[i+1];
                    trgid=buf[i+3]+buf[i+4];

                }else{
                pn.number=buf[i+1];
                trgid=buf[i+3]+buf[i+4]
                break;
                }
                
            }else if(buf[i+2]=="="){//e8=
                trgid=buf[i]+buf[i+1];
                pn.promotion=buf[i+3];
                break;

            }else{trgid=buf[i]+buf[i+1];break;}
        }             
    }
    if(i>=buf.length || buf[i]==undefined){
        break;
    }
  }
  
    function next(i){
        i=skip(buf,i);
    }
    console.log(trgid,pn);
    wh=SLsquar(pn,trgid);
    return wh
}



function SLsquar(pn,trgid){ //pn: color,letter,piece_name,number,promotion
  let piece_name;
  let trg;
  let drg;
  let pro=false;
  //for (let i=0;i<Capital.length;i++){if(Capital[i]==pn.piece_name){piece_name=pieces[i]}}
  for(sqr of sqrs){if(sqr.id==trgid){trg=sqr}}
  console.log(trg)
 
  if (pn.letter){
     for (sqr of sqrs){if(sqr.color==pn.color && sqr.piece_name==pn.piece_name && sqr.id[0]==pn.letter && ifin(trg,sqr.lm)){
         drg=sqr
     }}
   }else if(pn.number){
    for (sqr of sqrs){if(sqr.color==pn.color && sqr.piece_name==pn.piece_name && sqr.number==pn.number && ifin(trg,sqr.lm)){
        drg=sqr
    }}

   }else{
    for (sqr of sqrs){if(sqr.color==pn.color && sqr.piece_name==pn.piece_name && ifin(trg,sqr.lm)){
        drg=sqr
    }}
   }
   if(pn.promotion){
       pro=pn.promotion;
    }
   return {i:drg.number, j:drg.letter, i2:trg.number, j2:trg.letter, pro:pro};
}
  


function create_div_PGN(pgnMov){
        
        if (ifin(pgnMov[0],numbs)){
            let rpl = document.createElement("div");
            rpl.className="replaylist";
            let rpm = document.createElement("div");
            rpm.className="replay_move";
            rpm.id=`${pgnMov}`;
            rpm.innerHTML=`${pgnMov}`;
            rpl.appendChild(rpm);
            replay_area.appendChild(rpl);
         
        }else{

            let rpm = document.createElement("div");
            rpm.className="replay_move";
            rpm.id=`${pgnMov}`;
            rpm.innerHTML=`${pgnMov}`;
            if(replay_area.lastElementChild){
                let rpl=replay_area.lastElementChild;
                rpl.appendChild(rpm);
            }else{
                let rpl = document.createElement("div");
                rpl.className="replaylist";
                rpl.appendChild(rpm);
                replay_area.appendChild(rpl);
            }   
        }
  }

}