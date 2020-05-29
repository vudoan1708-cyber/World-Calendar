let calendarData = null; // variable to store the external data

let holidays = [], // variable to store all the available holidays
    months = [], // variable to store the months
    days = [], // variable to store the days
    dates = [], // variable to store days and months
    descriptions = []; // variable to store descriptions for the holidays

let d = new Date(); // get year
let yearHTML = document.getElementById('chosenYear').innerHTML = d.getFullYear();

// boolean
let loading = true;

const jan = document.getElementById('jan'),
      feb = document.getElementById('feb'),
      mar = document.getElementById('mar'),
      apr = document.getElementById('apr'),
      may = document.getElementById('may'),
      jun = document.getElementById('jun'),
      jul = document.getElementById('jul'),
      aug = document.getElementById('aug'),
      sep = document.getElementById('sep'),
      oct = document.getElementById('oct'),
      nov = document.getElementById('nov'),
      dec = document.getElementById('dec'),

      btnCentering = document.getElementById('btnCentering');

      // info container
      info_container = document.getElementById('info_container');

      // prevYear button
      backYear = document.getElementById('backYear');

      // nextYear button
      forwardYear = document.getElementById('forwardYear');

      // country name
      country = document.getElementById('country');
      
      // back arrow button
      backBtn = document.getElementById('backBtn');
      
      // arrow
      arrow = document.getElementById('arrow');

      // form
      form = document.getElementById('form');

      // get html tags
      html = document.body.parentNode;

      // display holidays
      displayMonths = document.getElementById('displayMonths');
      displayAll = document.getElementById('displayAll');

let Holidays = 0; // variable to trigger/showcases each month data

getCalendar(country.textContent, yearHTML)

    // pass data to calendarData
    .then(data => {
        calendarData = data;
        console.log(calendarData);
    })

    // loop through the array and pass data to variables
    .then(() => {
        for (let i = 0; i < calendarData.response.holidays.length; i++) {

            // pass data into the variable
            holidays[i] = calendarData.response.holidays[i].name;
            months[i] = calendarData.response.holidays[i].date.datetime.month;
            days[i] = calendarData.response.holidays[i].date.datetime.day;
            dates[i] = calendarData.response.holidays[i].date.iso;
        }
    })
    .then(() => {
        loading = false;
    })
    .catch(err => {
        console.log(err);
    })

// get the previous year
function prevYear() {
    yearHTML--;
    yearHTML = document.getElementById('chosenYear').innerHTML = yearHTML;

    // check if the year is available
    if (calendarData.response.holidays.length == 0) {

        // hide the button
        backYear.style.visibility = 'hidden';
        yearHTML++;
        return -1;
    } else {
        // reload the api
        // pass data to get either the search value if applicable, or the original value from html
        getCalendar(searchCountry.value || country.textContent, yearHTML)
                
        // pass data to calendarData
        .then(data => {
            calendarData = data;
            console.log(calendarData);
        })

        // loop through the array and pass data to variables
        .then(() => {
            for (let i = 0; i < calendarData.response.holidays.length; i++) {
                
                // pass data into the variable
                holidays[i] = calendarData.response.holidays[i].name;
                months[i] = calendarData.response.holidays[i].date.datetime.month;
                days[i] = calendarData.response.holidays[i].date.datetime.day;
                dates[i] = calendarData.response.holidays[i].date.iso;
            }
        })
        return yearHTML;
    }
}

// get th next year
function nextYear() {
    yearHTML++;
    yearHTML = document.getElementById('chosenYear').innerHTML = yearHTML;

    // check if the year is available
    if (calendarData.response.holidays.length == 0) {

        // hide the button
        forwardYear.style.visibility = 'hidden';
        yearHTML--;
        return -1;
    } else {

        // reload the api
        // pass data to get either the search value if applicable, or the original value from html
        getCalendar(searchCountry.value || country.textContent, yearHTML)
                
        // pass data to calendarData
        .then(data => {
            calendarData = data;
            console.log(calendarData);
        })

        // loop through the array and pass data to variables
        .then(() => {
            for (let i = 0; i < calendarData.response.holidays.length; i++) {
                
                // pass data into the variable
                holidays[i] = calendarData.response.holidays[i].name;
                months[i] = calendarData.response.holidays[i].date.datetime.month;
                days[i] = calendarData.response.holidays[i].date.datetime.day;
                dates[i] = calendarData.response.holidays[i].date.iso;
            }
        })
        return yearHTML;
    }
}

// clear the holidays display and show back the months display
function goBack() {

    // hide the country search bar if it's shown
    if (arrow.style.bottom == '18%') showSearchBar();

    // show the back and forwards buttons
    backYear.style.visibility = 'visible';
    forwardYear.style.visibility = 'visible';

    // clear back arrow button
    backBtn.style.visibility = 'hidden';

    // clear displayMonths container
    displayMonths.style.opacity = 0;

    displayMonths.style.visibility = 'hidden';

    // make the button container appear
    btnCentering.style.opacity = 1;

    // change background back to default
    html.style.backgroundImage = 'linear-gradient(to right, rgb(104, 135, 123), rgb(44, 43, 43))';
}

// show search bar
function showSearchBar() {
    if (arrow.style.bottom == 0) {
        form.style.top = '82%';
        arrow.innerHTML = 'v';
        arrow.style.bottom = '18%';
    } else if (arrow.style.bottom == '18%') {
        form.style.top = '100%';
        arrow.innerHTML = '^';
        arrow.style.bottom = '';
    }
}

// change country
function changeCountry() {
    let messages = [];

    // if there is no inputted data
    if (searchCountry.value  === '' || searchCountry.value  == null) {

        // push elements into the array
        messages.push('Name needed');
    }

    // if the array variable is not empty
    if (messages.length > 0) {
        return false;

    // otherwise
    } else {
        // console.log(typeof(searchCountry.value));

        // change html 
        country.innerHTML = searchCountry.value.toUpperCase();

        // pass data to get different countries' result
        getCalendar(searchCountry.value, yearHTML)
            
            // pass data to calendarData
            .then(data => {
                calendarData = data;
                console.log(calendarData);
            })

            // loop through the array and pass data to variables
            .then(() => {
                for (let i = 0; i < calendarData.response.holidays.length; i++) {
                    
                    // pass data into the variable
                    holidays[i] = calendarData.response.holidays[i].name;
                    months[i] = calendarData.response.holidays[i].date.datetime.month;
                    days[i] = calendarData.response.holidays[i].date.datetime.day;
                    dates[i] = calendarData.response.holidays[i].date.iso;
                }
            })
    }

    // clear the search container
    form.style.top = '100%';
    arrow.innerHTML = '^';
    arrow.style.bottom = '';
}

// Months
function getMonth(nMonth) {

    // hide the country search bar if it's shown
    if (arrow.style.bottom == '18%') showSearchBar();

    // show display month
    displayMonths.style.visibility = 'visible';

    // remove the back and forwards buttons
    backYear.style.visibility = 'hidden';
    forwardYear.style.visibility = 'hidden';

    // remove previous span elements if applicable
    let remover = document.querySelectorAll('.li_Months');
    
    // check if the elements exist
    if(remover.length != 0) {
        
        // remove them
        for (let i = 0; i < remover.length; i++) {
            remover[i].remove();
        }
    }

    // show back arrow button
    backBtn.style.visibility = 'visible';

    let allHolidays = [],
        infoHolidays = [];

    // show displayMonths container
    displayMonths.style.opacity = 1;

    // make the button container disappear
    btnCentering.style.opacity = 0;


    for (let m = 0; m < months.length; m++) {

        if (Number(months[m]) == nMonth) {
            
            // create span elements
            allHolidays[m] = document.createElement('span');
            
            // assign class names to the span's
            allHolidays[m].className = 'li_Months'

            // write data to DOM 
            allHolidays[m].innerHTML = holidays[m];

            // append data to displayAll div tag
            displayAll.appendChild(allHolidays[m]);

            // show info when on hover
            allHolidays[m].addEventListener('mouseover', () => {
                console.log(dates[m]);
                infoHolidays[m] = document.createElement('div');

                // assign class names to the div's
                infoHolidays[m].className = 'info';

                // write data to DOM
                infoHolidays[m].innerHTML = dates[m];

                //append data to the info_container
                info_container.appendChild(infoHolidays[m]);
            });

            // hide info when not on hover
            allHolidays[m].addEventListener('mouseout', () => {

                // reset the array
                infoHolidays = [];

                // select all the div elements that contain holiday information
                let info_remover = document.querySelectorAll('.info');

                // check if there is data
                if (info_remover.length != 0) {
                    
                    // loop through the array
                    for(let j = 0; j < info_remover.length; j++) {

                        // remove them
                        info_remover[j].remove();
                    }
                }
            });

            // show detail info when clicked
            allHolidays[m].addEventListener('click', () => {
                console.log(m)
            })
        }
    }
}

async function getCalendar(COUNTRY, YEAR) {
    const API_KEY = 'ceb72a05fddad9bdead36d51cc4dd9de995aad5a';
    
    let URL = `https://calendarific.com/api/v2/holidays?&api_key=${API_KEY}&country=${COUNTRY}&year=${YEAR}`;
    
    let response = await fetch(URL);
    calendarData = await response.json();
    return calendarData;
} 