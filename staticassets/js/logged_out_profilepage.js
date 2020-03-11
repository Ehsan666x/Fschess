const notepad=document.getElementById('profile_notepad');
const description=document.getElementById('profile_description');
const description_cancel=document.getElementById('description_cancel');


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




function show_calendar(){
    document.getElementById('calendar_container').style.display='inline-flex';

}