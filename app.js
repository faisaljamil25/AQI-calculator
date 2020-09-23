const pm = document.querySelector("#pm");
const so2 = document.querySelector("#so2");
const no2 = document.querySelector("#no2");
const selectOption = document.querySelector(".select-option");
const calculate = document.querySelector(".calculate");
const aqiResult = document.querySelector("#aqi-result");
const aqiCategory = document.querySelector("#aqi-category");
const sensitiveGroups = document.querySelector("#sensitive-groups");
const healthEffects = document.querySelector("#health-effects");
const cautionary = document.querySelector("#cautionary-statements");
const pmAnnual = 40;
const pmhour = 60;
const so2Annual = 50;
const so2hour = 80;
const no2Annual = 40;
const no2hour = 80;
let time = 'annual'

selectOption.addEventListener("input", function () {
    time = selectOption.value
})

calculate.addEventListener("click", function (event) {
    event.preventDefault()
    let pmValue = pm.value
    let so2Value = so2.value
    let no2Value = no2.value
    let aqi = Math.round(aqiCalculator(pmValue, so2Value, no2Value, time))
    if (aqi >= 0 && aqi <= 500) {
        aqiResult.style.color = 'black'
        aqiResult.style.fontWeight = 'bold'
        aqiResult.value = aqi
        aqiGroup(aqi)
    } else {
        alert("AQI out of range (0-500)")
    }
})

function aqiCalculator(pm, so2, no2, time) {
    let AQI;
    if (time === 'annual') {
        AQI = 100 / 3 * ((pm / pmAnnual) + (so2 / so2Annual) + (no2 / no2Annual))
    } else {
        AQI = 100 / 3 * ((pm / pmhour) + (so2 / so2hour) + (no2 / no2hour))
    }
    return AQI
}

function aqiGroup(aqi) {
    aqiCategory.style.fontWeight = 'bold'
    console.log(aqi)
    console.log(aqi <= 50)
    if (aqi >= 0 && aqi <= 50) {
        aqiCategory.style.color = 'black'
        aqiCategory.style.backgroundColor = '#00E000'
        aqiCategory.value = 'Good'
        sensitiveGroups.value = 'People with respiratory or heart disease, the elderly and children are the groups most at risk.'
        healthEffects.value = 'None'
        cautionary.value = 'None'
    } else if (aqi > 50 && aqi <= 100) {
        aqiCategory.style.color = 'black'
        aqiCategory.style.backgroundColor = '#FFFF00'
        aqiCategory.value = 'Moderate'
        sensitiveGroups.value = 'People with respiratory or heart disease, the elderly and children are the groups most at risk.'
        healthEffects.value = 'Unusually sensitive people should consider reducing prolonged or heavy exertion.'
        cautionary.value = 'Unusually sensitive people should consider reducing prolonged or heavy exertion.'
    } else if (aqi > 100 && aqi <= 150) {
        aqiCategory.style.color = 'white'
        aqiCategory.style.backgroundColor = '#FF7600'
        aqiCategory.value = 'Unhealthy for Sensitive Groups'
        sensitiveGroups.value = 'People with respiratory or heart disease, the elderly and children are the groups most at risk.'
        healthEffects.value = 'Increasing likelihood of respiratory symptoms in sensitive individuals, aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly.'
        cautionary.value = 'People with respiratory or heart disease, the elderly and children should limit prolonged exertion.'
    } else if (aqi > 150 && aqi <= 200) {
        aqiCategory.style.color = 'white'
        aqiCategory.style.backgroundColor = '#FF0000'
        aqiCategory.value = 'Unhealthy'
        sensitiveGroups.value = 'People with respiratory or heart disease, the elderly and children are the groups most at risk.'
        healthEffects.value = 'Increased aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly; increased respiratory effects in general population.'
        cautionary.value = 'People with respiratory or heart disease, the elderly and children should avoid prolonged exertion; everyone else should limit prolonged exertion.'
    } else if (aqi > 200 && aqi <= 300) {
        aqiCategory.style.color = 'white'
        aqiCategory.style.backgroundColor = '#990049'
        aqiCategory.value = 'Very Unhealthy'
        sensitiveGroups.value = 'People with respiratory or heart disease, the elderly and children are the groups most at risk.'
        healthEffects.value = 'Significant aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly; significant increase in respiratory effects in general population.'
        cautionary.value = 'People with respiratory or heart disease, the elderly and children should avoid any outdoor activity; everyone else should avoid prolonged exertion.'
    } else {
        aqiCategory.style.color = 'white'
        aqiCategory.style.backgroundColor = '#7E0023'
        aqiCategory.value = 'Hazardous'
        sensitiveGroups.value = 'People with respiratory or heart disease, the elderly and children are the groups most at risk.'
        healthEffects.value = 'Serious aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly; serious risk of respiratory effects in general population.'
        cautionary.value = 'Everyone should avoid any outdoor exertion; people with respiratory or heart disease, the elderly and children should remain indoors.'
    }
}