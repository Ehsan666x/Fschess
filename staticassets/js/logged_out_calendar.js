

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < firstDay) ||(date>daysInMonth) ) {
                let cell = document.createElement("td");
                cell.id='table_data';
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            // else if (date > daysInMonth) {
            //     break;
            // }

            else {
                let cell = document.createElement("td");
                cell.className='table_data';
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }

        tbl.appendChild(row); // appending each row into calendar body.
        
    }
    td_event_listener();
}


const pricevalue= document.getElementById("calendar_price_value");
const calendar_comments_value=document.getElementById("calendar_comments_value");
const calendar_classes_value=document.getElementById("calendar_classes_value");

let calendar={Jan :{3:'4:00-5:00 Alezsd765','29c':'class review',29:'7:00-8:30 bob7767'},Mar:{21:'coach'}};
localStorage.setItem('calendar',JSON.stringify(calendar));





function calendar_close_window(){
    document.getElementById('calendar_container').style.display='none';
}

function td_event_listener(){
    let td_list=document.querySelectorAll('.table_data');
    console.log(td_list)
    for (let i=0;i<td_list.length;i++){
        let calendar_localstorage=JSON.parse(localStorage.getItem('calendar'));
        let a=monthAndYear.innerText;
        a=a[0]+a[1]+a[2];
        if(calendar_localstorage && calendar_localstorage[a] && calendar_localstorage[a][td_list[i].innerText] ){
            td_list[i].style.backgroundColor = "red";
        }
        td_list[i].addEventListener('click', function(){
            
            td_click(td_list[i],td_list);
           
        })
    }
}

function td_click(element,list){
    for (e of list){
        e.style.opacity=0.5;
    }
    element.style.opacity=1;
    calendar_classes_value.innerText="";
    calendar_comments_value.innerText="";
    let calendar_localstorage=JSON.parse(localStorage.getItem('calendar'));
    let a=monthAndYear.innerText;
    a=a[0]+a[1]+a[2];
    if(calendar_localstorage && calendar_localstorage[a] && calendar_localstorage[a][element.innerText] ){
        let classes = calendar_localstorage[a][element.innerText];
        calendar_classes_value.innerText=classes;

        if(calendar_localstorage[a][element.innerText+'c']){
            let comment= calendar_localstorage[a][element.innerText+'c'];
            calendar_comments_value.innerText=comment;
        }
    }
    console.log(element.innerText)
}

