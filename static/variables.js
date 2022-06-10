const singleView = document.querySelector("#option-1");
const multiView = document.querySelector("#option-2");
const variableSelect = document.querySelector(".variable-select");
const variableName = document.querySelector(".variable-name");
const tdValue = document.querySelectorAll(".td-value");

let viewState = "single"

const toggleVariableSelect = (elem, visibility) => {
    elem.style.visibility = visibility
}

singleView.addEventListener("click", ()=> {
    if(viewState !== "single") {
        console.log("option-1 clicked");
        viewState = "single";
        toggleVariableSelect(variableSelect, "visible")
   };
})

multiView.addEventListener("click", ()=> {
    if(viewState !== "multi"){
        console.log("option-2 clicked")
        viewState = "multi";
        toggleVariableSelect(variableSelect, "hidden")
    };
})

const getVariableData = (variableObj, variable) => {
    let data = [];
    for(let i of variableObj) {
        if(Object.keys(i) == variable) {
            data.push(...Object.values(i));
        }
    }
    return data;
}

const unpackKeyValues = (data) => {
    const missing = data[0][0].missing.count;
    const missingProportion = data[0][0].missing.proportion;
    const distinct = data[0][1].distinct.count;
    const distinctProportion = data[0][1].distinct.proportion;
    const zero = data[0][2].zeros.count;
    const zeroProportion = data[0][2].zeros.proportion;
    const mean = data[0][5].stats.mean
    const min = data[0][5].stats.min
    const max = data[0][5].stats.max
    const std = data[0][5].stats.std

    return [distinct, distinctProportion, missing, missingProportion, zero, zeroProportion,
            mean, min, max, std]

}

const setOverviewValues = (variableObj, variable, tableValues) => {
    const _zip = (x, y) => Array(Math.max(x.length, y.length)).fill().map((_, i) => [x[i], y[i]])
    const data = getVariableData(variableObj, variable);
    const valueArray = unpackKeyValues(data);

    for(let [i, j] of _zip(tableValues, valueArray)) {
        i.innerHTML = j;
    }
}

function selectOnChange(val) {
    console.log(val.value);
    variableName.textContent = val.value;
    setOverviewValues(variables, val.value, tdValue)

}


