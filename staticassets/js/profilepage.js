const notepad=document.getElementById('profile_notepad');
const notepad_save = document.getElementById('notepad_save');
const notepad_cancel=document.getElementById('notepad_cancel');
const description=document.getElementById('profile_description');
const description_save=document.getElementById('description_save');
const description_cancel=document.getElementById('description_cancel');
const edit_description=document.getElementById('edit_description');
const edit_notepad=document.getElementById('edit_notepad');
const args=["a", "b", "c", "d", "e", "f", "g", "h","i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",'.']
var Cargs=[];
args.forEach(element => {let e=element.toUpperCase();Cargs.push(e);});
const numbers =[1,2,3,4,5,6,7,8,9,0];
const API_URL='http://localhost/editprofile';
var description_value='';
var notepad_value='';


function ifin(x,sl){
    for (let i=0; i<sl.length; i++){
        if (sl[i]==x){
            return true;
        }else if(i==sl.length-1){return false};
    }

}

function validation(data){
    for(e of data){
        if( (!ifin(e,args)) && (!ifin(e,Cargs)) && (!ifin(e,numbers)) ){
        return false  
        }
        if(e==data[data.length-1]){return true}
    }
}

function edit_note(){
    description_value=document.getElementById('profile_notepad').textContent;
    notepad.contentEditable='true';
    notepad_save.style.display='block';
    notepad_cancel.style.display='block';
    edit_notepad.style.display='none';
    notepad.focus();
}

function note_save(){
    notepad_save.style.display='none';
    notepad_cancel.style.display='none';
    edit_notepad.style.display='block';
    notepad.contentEditable='false';
    if(validation(notepad.textContent)){
        let data={notepad:notepad.textContent};
        
        fetch(API_URL,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type':'application/json'}
        }).then(res=>{
            if(res.ok){return res.json()
            }
            return res.json().then(err=>{throw new Error(err.message)})
            }).then(data=>{
                console.log('data saved')
        }).catch(err=>{console.log(err)})
    }else{throw new Error('please enter letters or numbers')}   
}

function note_cancel(){
    
    notepad_save.style.display='none';
    notepad_cancel.style.display='none';
    edit_notepad.style.display='block';
    notepad.contentEditable='false';
    document.getElementById('profile_notepad').textContent=description_value;
    
    
}

function edit_des(){
    notepad_value=document.getElementById('profile_description').textContent;
    description.contentEditable='true';
    description_save.style.display='block';
    description_cancel.style.display='block';
    edit_description.style.display='none';
    description.focus();

}
function des_save(){
    description_save.style.display='none';
    description_cancel.style.display='none';
    description.contentEditable='false';
    edit_description.style.display='block';

    if(validation(description.textContent)){
        let data={description:description.textContent};
        fetch(API_URL,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type':'application/json'}
        }).then(res=>{
            if(res.ok){return res.json()
            }
            return res.json().then(err=>{throw new Error(err.message)})
            }).then(data=>{
                console.log('data saved')
        }).catch(err=>{console.log(err)})
    }else{throw new Error('please enter letters or numbers')}
}

function des_cancel(){
    
    description_save.style.display='none';
    description_cancel.style.display='none';
    description.contentEditable='false';
    edit_description.style.display='block';
    document.getElementById('profile_description').textContent=notepad_value;
    
}


function show_calendar(){
    document.getElementById('calendar_container').style.display='inline-flex';

}