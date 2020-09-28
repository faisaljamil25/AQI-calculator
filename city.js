const city = document.querySelector("#city-input");
const submit = document.querySelector('.city-calculate')
const aqiResult = document.querySelector("#aqi-result");
const aqiCategory = document.querySelector("#aqi-category");
const sensitiveGroups = document.querySelector("#sensitive-groups");
const healthEffects = document.querySelector("#health-effects");
const cautionary = document.querySelector("#cautionary-statements");
const pollutantList = document.querySelector(".pollutant-list")
const aqiTable = document.querySelector(".aqi-table")
const resetBtn = document.querySelector(".reset-btn")
const nearBtn = document.querySelector(".near-btn")
const cityName = document.querySelector("#city-name")
let pollutants;

function capital_letter(str) {
    str = str.split(" ");
    for (let i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
}
async function cityAqi(url) {
    const response = await fetch(url);
    var data = await response.json();
    if (data.status === "ok") {
        const aqi = data.data.aqi
        if (aqi) {
            if (city.value === "") {
                cityName.innerText = data.data.city.name
            } else {

                cityName.innerText = capital_letter(city.value)
            }
            pollutants = data.data.iaqi
            addPollutant(pollutants)
            aqiResult.style.color = 'black'
            aqiResult.style.fontWeight = 'bold'
            aqiResult.value = aqi
            aqiGroup(aqi)
        }
    } else {
        alert("Enter correct City name")
    }
}

resetBtn.addEventListener("click", function () {
    pollutantList.innerText = ""
    aqiTable.style.display = 'none'
    aqiResult.value = ''
    aqiCategory.style.backgroundColor = '#fff'
    aqiCategory.value = ''
    sensitiveGroups.value = ''
    healthEffects.value = ''
    cautionary.value = ''
})

submit.addEventListener("click", function (event) {
    event.preventDefault()
    if (!(city.value === "")) {
        const url = `https://api.waqi.info/feed/${city.value}/?token=ffbaaf62c5629e2066224b39aa5488adcec16ed6`
        cityAqi(url)
    } else {
        alert("Enter name of the City")
    }
})

nearBtn.addEventListener("click", function (event) {
    event.preventDefault()
    city.value = ""
    const url = `https://api.waqi.info/feed/here/?token=ffbaaf62c5629e2066224b39aa5488adcec16ed6`
    cityAqi(url)
})


function aqiGroup(aqi) {
    aqiCategory.style.fontWeight = 'bold'
    if (aqi >= 0 && aqi <= 50) {
        aqiCategory.style.color = 'black'
        aqiCategory.style.backgroundColor = '#00CC00'
        aqiCategory.value = 'Good'
        sensitiveGroups.value = 'None'
        healthEffects.value = 'None'
        cautionary.value = 'None'
    } else if (aqi > 50 && aqi <= 100) {
        aqiCategory.style.color = 'black'
        aqiCategory.style.backgroundColor = '#66CC00'
        aqiCategory.value = 'Satisfactory'
        sensitiveGroups.value = 'Unusually sensitive people should consider reducing prolonged or heavy exertion.'
        healthEffects.value = 'Respiratory symptoms possible in unusually sensitive individuals, possible aggravation of heart or lung disease in people with cardiopulmonary disease and older adults.'
        cautionary.value = 'Unusually sensitive people should consider reducing prolonged or heavy exertion.'
    } else if (aqi > 100 && aqi <= 200) {
        aqiCategory.style.color = 'black'
        aqiCategory.style.backgroundColor = '#FFFF00'
        aqiCategory.value = 'Moderately Polluted'
        sensitiveGroups.value = 'Children, active adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else should limit prolonged outdoor exertion.'
        healthEffects.value = 'Increasing likelihood of respiratory symptoms in sensitive individuals, aggravation of heart or lung disease and premature mortality in people with cardiopulmonary disease and older adults.'
        cautionary.value = 'People with respiratory or heart disease, older adults and children should reduce prolonged exertion.'
    } else if (aqi > 200 && aqi <= 300) {
        aqiCategory.style.color = 'white'
        aqiCategory.style.backgroundColor = '#FF9900'
        aqiCategory.value = 'Poor'
        sensitiveGroups.value = 'Children, active adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else should limit prolonged outdoor exertion.'
        healthEffects.value = 'Increased aggravation of heart or lung disease and premature mortality in people with cardiopulmonary disease and older adults; increased respiratory effects in general population.'
        cautionary.value = 'People with respiratory or heart disease, older adults and children should avoid prolonged exertion; everyone else should limit prolonged exertion.'
    } else if (aqi > 300 && aqi <= 400) {
        aqiCategory.style.color = 'white'
        aqiCategory.style.backgroundColor = '#FF0000'
        aqiCategory.value = 'Very Poor'
        sensitiveGroups.value = 'Children, active adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else should limit prolonged outdoor exertion.'
        healthEffects.value = 'Significant aggravation of heart or lung disease and premature mortality in people with cardiopulmonary disease and older adults; significant increase in respiratory effects in general population.'
        cautionary.value = 'People with respiratory or heart disease, older adults and children should avoid any outdoor activity; everyone else should avoid prolonged exertion.'
    } else if (aqi > 400 && aqi <= 500) {
        aqiCategory.style.color = 'white'
        aqiCategory.style.backgroundColor = '#A52A2A'
        aqiCategory.value = 'Severe'
        sensitiveGroups.value = 'Everyone should avoid all physical activity outdoors.'
        healthEffects.value = 'Serious aggravation of heart or lung disease and premature mortality in people with cardiopulmonary disease and older adults; serious risk of respiratory effects in general population.'
        cautionary.value = 'Everyone should avoid any outdoor exertion; people with respiratory or heart disease, older adults and children should remain indoors and keep activity levels low.'
    } else {
        alert("Data not available at the moment.")
    }
}

function addPollutant(pollutants) {
    pollutantList.innerText = ""
    aqiTable.style.display = 'block'
    for (pollutant in pollutants) {
        if (pollutant === 'pm25') {
            pollutantRow("PM2.5", pollutants.pm25.v)
        } else if (pollutant === 'pm10') {
            pollutantRow("PM10", pollutants.pm10.v)
        } else if (pollutant === 'so2') {
            pollutantRow("SO2", pollutants.so2.v)
        } else if (pollutant === 'no2') {
            pollutantRow("NO2", pollutants.no2.v)
        } else if (pollutant === 'o3') {
            pollutantRow("O3", pollutants.o3.v)
        } else if (pollutant === 'co') {
            pollutantRow("CO", pollutants.co.v)
        }
    }
}

function pollutantRow(pollutant, aqi) {
    const newPollutant = document.createElement('tr')
    newPollutant.classList.add(pollutant)
    const pollutantName = document.createElement('th')
    pollutantName.innerText = pollutant
    pollutantName.classList.add(pollutant - name)
    newPollutant.appendChild(pollutantName)
    const pollutantAqi = document.createElement('th')
    pollutantAqi.innerText = Math.round(aqi)
    pollutantAqi.classList.add(pollutant - aqi)
    newPollutant.appendChild(pollutantAqi)
    pollutantList.appendChild(newPollutant)
}