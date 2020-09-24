const concInput = document.querySelector("#conc");
const selectOption = document.querySelector(".select-option");
const calculate = document.querySelector(".calculate");
const aqiResult = document.querySelector("#aqi-result");
const aqiCategory = document.querySelector("#aqi-category");
const sensitiveGroups = document.querySelector("#sensitive-groups");
const healthEffects = document.querySelector("#health-effects");
const cautionary = document.querySelector("#cautionary-statements");
let pollutant = 'PM2.5';
const pollutantList = document.querySelector(".pollutant-list")
const aqiTable = document.querySelector(".aqi-table")
const resetBtn = document.querySelector(".reset-btn")
let pmAdded = false;
let so2Added = false;
let no2Added = false;
let aqi1 = 0;
let aqi2 = 0;
let aqi3 = 0;

selectOption.addEventListener("input", function () {
    pollutant = selectOption.value
})

resetBtn.addEventListener("click", function () {
    pollutant = 'PM2.5';
})

calculate.addEventListener("click", function (event) {
    event.preventDefault()
    let concValue = concInput.value
    if (concValue == "") {
        concValue = 0
    }
    let aqi = Math.round(aqiCalculator(pollutant, Number(concValue)))
    if (aqi >= 0 && aqi <= 500) {
        aqiTable.style.display = 'block'
        addPollutant(pollutant, concValue, aqi)
        aqiResult.style.color = 'black'
        aqiResult.style.fontWeight = 'bold'
        aqiResult.value = Math.max(aqi1, aqi2, aqi3)
        aqiGroup(Math.max(aqi1, aqi2, aqi3))
    } else {
        alert("AQI out of range (0-500)")
    }
})

function aqiCalculator(pollutant, concValue) {
    let AQI;
    switch (pollutant) {
        case 'PM2.5':
            if (concValue >= 0 && concValue <= 60) {
                AQI = 5 / 3 * concValue
            } else if (concValue > 60 && concValue <= 120) {
                AQI = 10 / 3 * (concValue - 30)
            } else {
                AQI = (10 * (concValue + 270)) / 13
            } break;
        case 'SO2':
            if (concValue >= 0 && concValue <= 80) {
                AQI = 5 / 4 * concValue
            } else if (concValue > 80 && concValue <= 380) {
                AQI = (concValue + 220) / 3
            } else {
                AQI = (concValue + 840) / 6
            } break;
        case 'NO2':
            if (concValue >= 0 && concValue <= 80) {
                AQI = 5 / 4 * concValue
            } else {
                AQI = concValue + 20
            } break;
    }
    return AQI
}

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
    } else if (aqi > 100 && aqi <= 150) {
        aqiCategory.style.color = 'black'
        aqiCategory.style.backgroundColor = '#FFFF00'
        aqiCategory.value = 'Moderately Polluted'
        sensitiveGroups.value = 'Children, active adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else should limit prolonged outdoor exertion.'
        healthEffects.value = 'Increasing likelihood of respiratory symptoms in sensitive individuals, aggravation of heart or lung disease and premature mortality in people with cardiopulmonary disease and older adults.'
        cautionary.value = 'People with respiratory or heart disease, older adults and children should reduce prolonged exertion.'
    } else if (aqi > 150 && aqi <= 200) {
        aqiCategory.style.color = 'white'
        aqiCategory.style.backgroundColor = '#FF9900'
        aqiCategory.value = 'Poor'
        sensitiveGroups.value = 'Children, active adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else should limit prolonged outdoor exertion.'
        healthEffects.value = 'Increased aggravation of heart or lung disease and premature mortality in people with cardiopulmonary disease and older adults; increased respiratory effects in general population.'
        cautionary.value = 'People with respiratory or heart disease, older adults and children should avoid prolonged exertion; everyone else should limit prolonged exertion.'
    } else if (aqi > 200 && aqi <= 300) {
        aqiCategory.style.color = 'white'
        aqiCategory.style.backgroundColor = '#FF0000'
        aqiCategory.value = 'Very Poor'
        sensitiveGroups.value = 'Children, active adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else should limit prolonged outdoor exertion.'
        healthEffects.value = 'Significant aggravation of heart or lung disease and premature mortality in people with cardiopulmonary disease and older adults; significant increase in respiratory effects in general population.'
        cautionary.value = 'People with respiratory or heart disease, older adults and children should avoid any outdoor activity; everyone else should avoid prolonged exertion.'
    } else {
        aqiCategory.style.color = 'white'
        aqiCategory.style.backgroundColor = '#A52A2A'
        aqiCategory.value = 'Severe'
        sensitiveGroups.value = 'Everyone should avoid all physical activity outdoors.'
        healthEffects.value = 'Serious aggravation of heart or lung disease and premature mortality in people with cardiopulmonary disease and older adults; serious risk of respiratory effects in general population.'
        cautionary.value = 'Everyone should avoid any outdoor exertion; people with respiratory or heart disease, older adults and children should remain indoors and keep activity levels low.'
    }
}

function addPollutant(pollutant, concValue, aqi) {
    if (pollutant == 'PM2.5') {
        if (!pmAdded) {
            pollutantRow(pollutant, concValue, aqi)
            aqi1 = aqi
            pmAdded = true
        } else {
            const pollutantChild = pollutantList.childNodes
            pollutantChild.forEach(function (child) {
                if (child.classList.contains('PM2.5')) {
                    child.childNodes[1].innerText = concValue + ' µg/m3'
                    child.childNodes[2].innerText = aqi
                    aqi1 = aqi
                }
            })
        }
    }
    if (pollutant == 'SO2') {
        if (!so2Added) {
            pollutantRow(pollutant, concValue, aqi)
            aqi2 = aqi
            so2Added = true
        } else {
            const pollutantChild = pollutantList.childNodes
            pollutantChild.forEach(function (child) {
                if (child.classList.contains('SO2')) {
                    child.childNodes[1].innerText = concValue + ' µg/m3'
                    child.childNodes[2].innerText = aqi
                    aqi2 = aqi
                }
            })
        }
    }
    if (pollutant == 'NO2') {
        if (!no2Added) {
            pollutantRow(pollutant, concValue, aqi)
            aqi3 = aqi
            no2Added = true
        } else {
            const pollutantChild = pollutantList.childNodes
            pollutantChild.forEach(function (child) {
                if (child.classList.contains('NO2')) {
                    child.childNodes[1].innerText = concValue + ' µg/m3'
                    child.childNodes[2].innerText = aqi
                    aqi3 = aqi
                }
            })
        }
    }
}

function pollutantRow(pollutant, concValue, aqi) {
    const newPollutant = document.createElement('tr')
    newPollutant.classList.add('new-pollutant')
    newPollutant.classList.add(`${pollutant}`)
    const pollutantName = document.createElement('th')
    pollutantName.innerText = pollutant
    pollutantName.classList.add(pollutant - name)
    newPollutant.appendChild(pollutantName)
    const pollutantConc = document.createElement('th')
    pollutantConc.innerText = concValue + ' µg/m3'
    pollutantConc.classList.add(pollutant - conc)
    newPollutant.appendChild(pollutantConc)
    const pollutantAqi = document.createElement('th')
    pollutantAqi.innerText = aqi
    pollutantAqi.classList.add(pollutant - aqi)
    newPollutant.appendChild(pollutantAqi)
    pollutantList.appendChild(newPollutant)
}
