var canvas = document.getElementById('myChart');
var ctx = document.getElementById('myChart').getContext('2d');
const chart_container = document.querySelector('.chart-container');
const chart_title = document.querySelector('.chart-title');
const day_limit_element = document.querySelector('.day-limit-input');

const check_specific_date_elememt = document.querySelector('.date-check');
var check_specific_date = false;

const specific_date_from_element = document.querySelector('.date-from');
const specific_date_to_element = document.querySelector('.date-to');



const country_input = document.querySelector('.country-input');
const country_entry_list = document.querySelector('.side-menu-countries');

var country_data = [];
var entry_limit=60;
var current_country = "China";

var chart;



class CountryData{

    constructor(name){
        this.name=name;
        this.data=[];
    }

}

function create_chart_label()
{
    let data_to_be_shown = country_data.filter(country=>country.name.toLowerCase() === current_country.toLowerCase())[0].data;
    let data_to_be_returned = data_to_be_shown.map(({date})=>date);
   

    if(check_specific_date)
    { 

        let date_from = new Date(specific_date_from_element.value);
        let date_to = new Date(specific_date_to_element.value);
        
        data_to_be_returned = data_to_be_shown.map(({date})=>
        {
            let current_date = new Date(date);
            if(current_date.getTime() >= date_from.getTime() && current_date.getTime() <= date_to.getTime())
           return date
        });
    }
    else
    data_to_be_returned = data_to_be_shown.map(({date})=>date);

    data_to_be_returned = data_to_be_returned.filter(item=>item!=undefined)


    return  data_to_be_returned
    .slice((data_to_be_returned.length - entry_limit) > 0 ? data_to_be_returned.length - entry_limit:0 );
}
function create_chart_dataset_confirmed()
{
    let data_to_be_shown = country_data
    .filter(country=>country.name.toLowerCase() === current_country.toLowerCase())[0].data;
    let data_to_be_shown_mapped = data_to_be_shown
    .map(({confirmed})=>confirmed);

    if(check_specific_date)
    { 

        let date_from = new Date(specific_date_from_element.value);
        let date_to = new Date(specific_date_to_element.value);
        
        data_to_be_shown_mapped = data_to_be_shown.map(({date,confirmed})=>
        {
            let current_date = new Date(date);
            if(current_date.getTime() >= date_from.getTime() && current_date.getTime() <= date_to.getTime())
           return confirmed
        });
    }
    else
    data_to_be_shown_mapped = data_to_be_shown.map(({confirmed})=>confirmed);

    data_to_be_shown_mapped = data_to_be_shown_mapped.filter(item=>item!=undefined)


    let ready_data = data_to_be_shown_mapped
    .slice((data_to_be_shown_mapped.length - entry_limit) > 0 ? data_to_be_shown_mapped.length - entry_limit:0 );    

    let dataset = {
        label:"Confirmed",
        borderColor: 'rgb(255, 99, 132)',
        data: ready_data
    }

    return  dataset
}
function create_chart_dataset_recovered()
{
    let data_to_be_shown = country_data
    .filter(country=>country.name.toLowerCase() === current_country.toLowerCase())[0].data;
    let data_to_be_shown_mapped = data_to_be_shown
    .map(({recovered})=>recovered);

    if(check_specific_date)
    { 

        let date_from = new Date(specific_date_from_element.value);
        let date_to = new Date(specific_date_to_element.value);
        
        data_to_be_shown_mapped = data_to_be_shown.map(({date,recovered})=>
        {
            let current_date = new Date(date);
            if(current_date.getTime() >= date_from.getTime() && current_date.getTime() <= date_to.getTime())
           return recovered
        });
    }
    else
    data_to_be_shown_mapped = data_to_be_shown.map(({recovered})=>recovered);

    data_to_be_shown_mapped = data_to_be_shown_mapped.filter(item=>item!=undefined)


    let ready_data = data_to_be_shown_mapped
    .slice((data_to_be_shown_mapped.length - entry_limit) > 0 ? data_to_be_shown_mapped.length - entry_limit:0 );
    
    let dataset = {
        label:"Recovered",
        borderColor: 'rgb(53, 164, 70)',
        data: ready_data
    }

    return  dataset
}
function create_chart_dataset_deaths()
{
    let data_to_be_shown = country_data
    .filter(country=>country.name.toLowerCase() === current_country.toLowerCase())[0].data;
    let data_to_be_shown_mapped = data_to_be_shown
    .map(({deaths})=>deaths);

    if(check_specific_date)
    { 

        let date_from = new Date(specific_date_from_element.value);
        let date_to = new Date(specific_date_to_element.value);
        
        data_to_be_shown_mapped = data_to_be_shown.map(({date,deaths})=>
        {
            let current_date = new Date(date);
            if(current_date.getTime() >= date_from.getTime() && current_date.getTime() <= date_to.getTime())
           return deaths
        });
    }
    else
    data_to_be_shown_mapped = data_to_be_shown.map(({deaths})=>deaths);

    data_to_be_shown_mapped = data_to_be_shown_mapped.filter(item=>item!=undefined)



    let ready_data = data_to_be_shown_mapped
    .slice((data_to_be_shown_mapped.length - entry_limit) > 0 ? data_to_be_shown_mapped.length - entry_limit:0 );
    
    let dataset = {
        label:"Deaths",
        borderColor: 'rgb(11, 11, 11)',
        data: ready_data
    }

    return dataset;
}

function create_chart_datasets()
{
    let datasets = [];
    
    
    datasets.push(create_chart_dataset_deaths());

   
    datasets.push(create_chart_dataset_confirmed());

  
    datasets.push(create_chart_dataset_recovered());

    return datasets;
}

function create_chart()
{

    chart_container.innerHTML = "";
    chart_container.innerHTML = `<canvas id="myChart"></canvas>`;

    canvas = document.getElementById('myChart');
    ctx = canvas.getContext('2d');

    chart = null;
    chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        
        // The data for our dataset
        data: {
            labels: create_chart_label(),
            datasets: create_chart_datasets()
        },
    
        // Configuration options go here
        options: {maintainAspectRatio: false}
    });
}


function set_day_limit(){
    let permitted_characters = "1234567890";

    let day_limit = day_limit_element.value;

    for(let i=0;i<day_limit.length;i++)
    {
        if(permitted_characters.indexOf(day_limit[i]) == -1)
            {
                return;
            }
    }

    if(day_limit.length > 4)
        entry_limit = 10000;
    else
        entry_limit = parseInt(day_limit);
    
}

day_limit_element.addEventListener('input',()=>{
    
    set_day_limit()
        create_chart();
})

country_input.addEventListener('input',refresh_country_list)

check_specific_date_elememt.addEventListener('change',()=>{
    check_specific_date_check()
    create_chart()
})

specific_date_from_element.addEventListener('change',()=>{
    check_specific_date_check()
    create_chart()
})

specific_date_to_element.addEventListener('change',()=>{
    check_specific_date_check()
    create_chart()
})

function check_specific_date_check(){
    if(check_specific_date_elememt.checked == true)
    check_specific_date = true;
    else
    check_specific_date = false;


}

function refresh_country_list(){
    let country_name = country_input.value.toLowerCase(); 

    let permitted_characters = "abcdefghijklmnoupqrstuvwxyz";
    
    for(let i =0;i<country_name.length;i++)
    {
        if(permitted_characters.indexOf(country_name[i]) == -1)
        {
            return;
        }
    }

    let countries_with_input_substring = country_data
    .filter(country=>country.name.toLowerCase().indexOf(country_name)!=-1)



    country_entry_list.innerHTML="";

    countries_with_input_substring
    .forEach(country=>{

        country_entry_list.innerHTML+=
        `
        <div class="side-menu-countries-entry" onclick="country_entry_onclick(this)">
              <div class="left">
                <span class="country-name">${country.name}</span>
              </div>
              <div class="right">
                <div>
                    <span class="country-description">Infected: </span>
                    <span class="country-infected">${country.data[country.data.length-1].confirmed}</span>
                  </div>
                  <div>
                    <span class="country-description">Recovered: </span>
                    <span class="country-infected">${country.data[country.data.length-1].recovered}</span>
                  </div>
                  <div>
                    <span class="country-description">Deaths: </span>
                    <span class="country-infected">${country.data[country.data.length-1].deaths}</span>
                  </div>
              </div>
          </div>
        `;
    //check for full match
    if(country.name.toLowerCase()===country_name.toLowerCase())
    {
        current_country = country_name
        chart_title.innerHTML = country.name;
        create_chart()
    }
    });

}


function country_entry_onclick(elem)
{
    country_input.value=elem.querySelector('.country-name').innerHTML;
    refresh_country_list()
}


fetch("https://pomber.github.io/covid19/timeseries.json")
  .then(response => response.json())
  .then(data => {
   
    
    let available_countries = Object.keys(data);
    available_countries.forEach(country=>{

        let new_country = new CountryData(country);

        data[country].forEach(({date, confirmed, recovered, deaths }) =>
        {
            if(confirmed!=0)
            new_country.data.push({date,confirmed,recovered,deaths})
        })
        
        country_data.push(new_country);
    })
    check_specific_date_check()
    set_day_limit()
    refresh_country_list()
    create_chart()

})















