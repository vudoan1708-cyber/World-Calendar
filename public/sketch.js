let calendarData = null, // variable to store the external data
    countryInfo = null, // variable to store information of a country
    lat, lon; // variables to store lat and lon values

let currentMonth = 0;

let holidays = [], // variable to store all the available holidays
    months = [], // variable to store the months
    days = [], // variable to store the days
    dates = [], // variable to store days and months
    descriptions = []; // variable to store descriptions for the holidays

// get year
let d = new Date(); 
let yearHTML = document.getElementById('chosenYear').innerHTML = d.getFullYear();

// chosen month
let chosenMonth = document.getElementById('chosenMonth');

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

      // support container
      support_wrapper = document.getElementById('support_wrapper');

      // support_button
      support_button = document.getElementById('support_button');

      // holiday description
      description_container = document.getElementById('description');

      // info container
      info_container = document.getElementById('info_container');

      // prevMonth button
      backMonth = document.getElementById('backMonth');

      // nextMonth button
      forwardMonth = document.getElementById('forwardMonth');

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


// this function is meant to not ask for any API call until user permits location access
// it will be initiated once, then will be looped forever inside the setTimeout function
// every 100 millisecond until geolocation is available
function init() {

    // start by geolocating user's location
    getGeolocation()
    .then(() => {
        loading = false;
    })

    // wait for a second and then, get data from the API
    .then(setTimeout(() => {

        // if loading is done and lat, lon values are true
        if (!loading && lat && lon) {
            
            // trigger the below function with country identified through geolocation, and current year
            getCalendar(countryInfo.prov, yearHTML)

            // pass data to calendarData
            .then(data => {
                calendarData = data;

                if (calendarData == undefined || calendarData == null || calendarData == '') {
                    document.body.style.visibility = 'hidden';
                    html.style.visibility = 'hidden';
                } else {
                    document.body.style.visibility = 'visible';
                    html.style.visibility = 'visible';
                }
            })

            // loop through the array and pass data to variables
            .then(() => {
                for (let i = 0; i < calendarData.response.holidays.length; i++) {

                    // pass data into the variable
                    holidays[i] = calendarData.response.holidays[i].name;
                    months[i] = calendarData.response.holidays[i].date.datetime.month;
                    days[i] = calendarData.response.holidays[i].date.datetime.day;
                    dates[i] = calendarData.response.holidays[i].date.iso;
                    descriptions[i] = calendarData.response.holidays[i].description;
                }
            })

            // catch error
            .catch(err => {
                console.log(err);
            })
        
        // otherwise
        } else if (!lat && !lon) {

            // wait for one second and call the init function again
            // if user has yet given permission for geolocation
            setTimeout(init, 1000);
        }
    }, 1000))
}

init();
 
// get the previous year
function prevYear() {
    yearHTML--;
    yearHTML = document.getElementById('chosenYear').innerHTML = yearHTML;

    // reload the api
    // pass data to get either the search value if applicable, or the original value from html
    getCalendar(searchCountry.value || countryInfo.prov, yearHTML)
            
    // pass data to calendarData
    .then(data => {
        calendarData = data;
    })

    // loop through the array and pass data to variables
    .then(() => {

        // check if the year is not available
        if (calendarData.response.holidays == undefined) {

            // hide the button
            backYear.style.visibility = 'hidden';
            yearHTML++;
            yearHTML = document.getElementById('chosenYear').innerHTML = yearHTML;
            return -1;
        } else {

            // show the next button
            forwardYear.style.visibility = 'visible';

            for (let i = 0; i < calendarData.response.holidays.length; i++) {
                
                // pass data into the variable
                holidays[i] = calendarData.response.holidays[i].name;
                months[i] = calendarData.response.holidays[i].date.datetime.month;
                days[i] = calendarData.response.holidays[i].date.datetime.day;
                dates[i] = calendarData.response.holidays[i].date.iso;
                descriptions[i] = calendarData.response.holidays[i].description;
            }
        }
    })
    return yearHTML;
}

// get the next year
function nextYear() {
    yearHTML++;
    yearHTML = document.getElementById('chosenYear').innerHTML = yearHTML;

   // reload the api
    // pass data to get either the search value if applicable, or the original value from html
    getCalendar(searchCountry.value || countryInfo.prov, yearHTML)
            
    // pass data to calendarData
    .then(data => {
        calendarData = data;
    })

    // loop through the array and pass data to variables
    .then(() => {
        // check if the year is available
        if (calendarData.response.holidays == undefined) {

            // hide the button
            forwardYear.style.visibility = 'hidden';
            yearHTML--;
            yearHTML = document.getElementById('chosenYear').innerHTML = yearHTML;
            return -1;
        } else {

            // show the prev button
            backYear.style.visibility = 'visible';

            for (let i = 0; i < calendarData.response.holidays.length; i++) {
                
                // pass data into the variable
                holidays[i] = calendarData.response.holidays[i].name;
                months[i] = calendarData.response.holidays[i].date.datetime.month;
                days[i] = calendarData.response.holidays[i].date.datetime.day;
                dates[i] = calendarData.response.holidays[i].date.iso;
                descriptions[i] = calendarData.response.holidays[i].description;
            }
        }
    })
    return yearHTML;
}

// clear the holidays display and show back the months display
function goBack() {

    // hide the country search bar if it's shown
    if (arrow.style.bottom == '18%') showSearchBar();

    // show the country search bar and button
    form.style.visibility = 'visible';

    // show the back and forwards year buttons
    backYear.style.visibility = 'visible';
    forwardYear.style.visibility = 'visible';

    // hide the back and forwards month buttons
    backMonth.style.visibility = 'hidden';
    forwardMonth.style.visibility = 'hidden';

    // hide back arrow button
    backBtn.style.visibility = 'hidden';

    // hide displayMonths container
    displayMonths.style.opacity = 0;

    displayMonths.style.visibility = 'hidden';

    // hide chosenMonth
    chosenMonth.style.display = 'none';

    // make the button container appear
    btnCentering.style.opacity = 1;
    btnCentering.style.visibility = 'visible';

    // change background back to default
    html.style.backgroundImage = 'linear-gradient(to right, rgb(104, 135, 123), rgb(44, 43, 43))';
}

// show support
function showSupport() {

    // if the wrapper is not shown
    if (support_wrapper.style.visibility != 'visible') {

        // display support container
        support_wrapper.style.visibility = 'visible';
        support_wrapper.style.opacity = 1;

        // change the text of the support button
        support_button.textContent = 'X';

    // otherwise
    } else {
        // hide support container
        support_wrapper.style.visibility = 'hidden';
        support_wrapper.style.opacity = 0;

        // change the text of the support button
        support_button.textContent = '?';
    }
}

// show search bar
function showSearchBar() {
    if (form.style.visibility != 'hidden') {
        if (arrow.style.bottom == 0) {
            form.style.top = '82%';
            arrow.innerHTML = 'v';
            arrow.style.bottom = '18%';
        } else if (arrow.style.bottom == '18%') {
            form.style.top = '100%';
            arrow.innerHTML = '^';
            arrow.style.bottom = '';
        }
    } else {
        if (arrow.style.bottom == 0) {
            description_container.style.top = '82%';
            arrow.innerHTML = 'v';
            arrow.style.bottom = '18%';
        } else if (arrow.style.bottom == '18%') {
            description_container.style.top = '100%';
            arrow.innerHTML = '^';
            arrow.style.bottom = '';
        }
    }
    
}

// get a country name code and change it to a full name
async function getCountry() {
    let name = searchCountry.value.toUpperCase();

    // in case where UK is inserted rather than GB
    if (name == 'UK') name = 'GB';

    const URL = `https://restcountries.eu/rest/v2/alpha/${name}`;
    const request = await fetch(URL);
    
    let countryFullName = await request.json();
    
    // add a country's native name
    let nativeName = countryFullName.nativeName;
    
    // add a country's full name to the variable
    countryFullName = countryFullName.name;

    changeCountry(countryFullName, nativeName);
}

// change country
function changeCountry(countryFullName, native) {

    // refresh the arrays
    holidays = [];
    months = [];
    days = [];
    dates = [];
    descriptions = [];

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

        // change html
        if(native != undefined || native != null || native != '')
            country.innerHTML = countryFullName + ' ' + '(' + native + ')';

        else country.innerHTML = countryFullName;

        // in case the search value is undefined because of incorrect type of input 
        if (countryFullName == undefined || native == undefined) {
            country.innerHTML = 'The country is not available or the search input type is incorrect' + '</br>' +
                                'Please refer to the Instruction (?) for further instruction'
        }

        // pass data to get different countries' result
        getCalendar(searchCountry.value, yearHTML)
            
            // pass data to calendarData
            .then(data => {
                calendarData = data;
            })

            // loop through the array and pass data to variables
            .then(() => {
                for (let i = 0; i < calendarData.response.holidays.length; i++) {
                    
                    // pass data into the variable
                    holidays[i] = calendarData.response.holidays[i].name;
                    months[i] = calendarData.response.holidays[i].date.datetime.month;
                    days[i] = calendarData.response.holidays[i].date.datetime.day;
                    dates[i] = calendarData.response.holidays[i].date.iso;
                    descriptions[i] = calendarData.response.holidays[i].description;
                }
            })
    }

    // hide the search container
    form.style.top = '100%';
    arrow.innerHTML = '^';
    arrow.style.bottom = '';
}

// Months
function getMonth(nMonth, incrementMonth) {

    // show the back and forwards month buttons
    backMonth.style.visibility = 'visible';
    forwardMonth.style.visibility = 'visible';
    
    // check if the passed month parameter is less than 13 and larger than 0
    if (nMonth < 13 && nMonth > 0) {

        // check if nextMonth or prevMonth button is pressed
        // if prevMonth button is pressed
        if (incrementMonth == -1) {

            // the latest month stored in currentMonth variable 
            // will be passed in as a parameter instead of a hard-coded number from HTML
            // and then, its value will be incrementally decreased
            nMonth = nMonth + incrementMonth;
            
            // reset the checking variable to do the job once
            incrementMonth = 0;
        }
        else if (incrementMonth == 1) {

            // the latest month stored in currentMonth variable
            // will be passed in as a parameter instead of a hard-coded number from HTML
            // and then, its value will be incrementally increased
            nMonth = nMonth + incrementMonth;
            
            // reset the checking variable to do the job once
            incrementMonth = 0;
        }

        // hide or show different buttons depending on different situations
        if (nMonth == 1) {
            backMonth.style.visibility = 'hidden';
        } else if (nMonth == 12) {
            forwardMonth.style.visibility = 'hidden';
        } else {
            
            // show the back and forwards month buttons
            backMonth.style.visibility = 'visible';
            forwardMonth.style.visibility = 'visible';
        }
    } 

    // collapse the country search bar if it's shown
    if (arrow.style.bottom == '18%') showSearchBar();

    // hide the country search bar and button
    form.style.visibility = 'hidden';

    // show description
    description_container.style.visibility = 'visible';

    // show displayMonth
    displayMonths.style.visibility = 'visible';

    // show chosenMonth
    chosenMonth.style.display = 'block';
    chosenMonth.innerHTML = nMonth;

    // remove the back and forwards year buttons
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
    btnCentering.style.visibility = 'hidden';


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
                description_container.innerHTML = descriptions[m];

                // show the description box
                description_container.style.top = '82%';
                arrow.innerHTML = 'v';
                arrow.style.bottom = '18%';
            })
        }
    }

    // assign the latest chosen month to a global variable
    currentMonth = nMonth;
}

async function recordPosition(position) {
    
    // get the latitude and longitude at user's location
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    const URL = `https://geocode.xyz/${lat},${lon}?geoit=json`;
    const request = await fetch(URL);
    countryInfo = await request.json();

    // get country's name where user is at and insert it into HTML div tag
    country.textContent = countryInfo.country;
}

async function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(recordPosition);
    }
}


async function getCalendar(COUNTRY, YEAR) {

    // login to calendarific to get API:
    // https://calendarific.com/login
    const API_KEY = '';
    
    let URL = `https://calendarific.com/api/v2/holidays?&api_key=${API_KEY}&country=${COUNTRY}&year=${YEAR}`;
    
    let response = await fetch(URL);
    calendarData = await response.json();
    return calendarData;
} 