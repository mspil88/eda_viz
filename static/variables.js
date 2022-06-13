const singleView = document.querySelector("#option-1");
const multiView = document.querySelector("#option-2");
const variableSelect = document.querySelector(".variable-select");
const variableName = document.querySelector(".variable-name");
const tdValue = document.querySelectorAll(".td-value");
const wrapperDataSel = document.querySelector(".wrapper-data-sel")
const distPlotDiv = document.querySelector(".var-sum-4");

const variableContainer = document.querySelector(".variable-container");


let viewState = "single"

const toggleElemVisibility = (elem, visibility) => {
    elem.style.visibility = visibility
}

singleView.addEventListener("click", ()=> {
    if(viewState !== "single") {
        console.log("option-1 clicked");
        viewState = "single";
        toggleElemVisibility(variableSelect, "visible")
   };
})

multiView.addEventListener("click", ()=> {
    if(viewState !== "multi"){
        console.log("option-2 clicked")
        viewState = "multi";
        toggleElemVisibility(variableSelect, "hidden")
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
    const x = data[0][4].distribution.x
    const y = data[0][4].distribution.y

    return [[distinct, distinctProportion, missing, missingProportion, zero, zeroProportion,
            mean, min, max, std], [x, y]]

}

const barPlotTrace = (x, y) => {
    return [{x: x,
             y: y,
             type: 'bar',
             marker: {
                color: 'rgba(219, 112, 147, 0.7)'}}]
}

const barPlotLayout = {
    autosize: true,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    showlegend:false,
    height: 300,

//    width: 300,
}

const plotConfig = {responsive: true, displayModeBar: false}

const createDistributionPlot = (plotElem, x, y, barLayout, plotConfig) => {
    const barTrace = barPlotTrace(x, y);
    Plotly.newPlot(plotElem, barTrace, barLayout, plotConfig);
}


let chartFlag = false;

const setOverviewValues = (variableObj, variable, tableValues) => {
    const _zip = (x, y) => Array(Math.max(x.length, y.length)).fill().map((_, i) => [x[i], y[i]])
    const data = getVariableData(variableObj, variable);
    const [valueArray, plotValues] = unpackKeyValues(data);
    const [x, y] = plotValues
    console.log(`x values ${x}`)
    console.log(`y values ${y}`)

    Plotly.purge(distPlotDiv);

    for(let [i, j] of _zip(tableValues, valueArray)) {
        i.innerHTML = j;
    }

    createDistributionPlot(distPlotDiv, x, y, barPlotLayout, plotConfig);
}

function selectOnChange(val) {
    console.log(val.value);

    const vv = new VariableView(variableContainer, val.value, variables)
    vv.createVariableView(variables);
    toggleElemVisibility(wrapperDataSel, "visible");
}

class VariableView {
    constructor(root, variable, variableObj) {
        this.root = root;
        this.variable = variable;
        this.variableData = []

        this.elem = {
            varName: root.querySelector(".variable-name"),
            tableValues: root.querySelectorAll(".td-value"),
            chartContainer: root.querySelector(".var-sum-4"),
        }


    };

    setVarName() {
        this.elem.varName.innerHTML = this.variable;
        return this;
    }

    getVariableData(variableObj) {
        for(let i of variableObj) {
            if(Object.keys(i) == this.variable) {
                this.variableData.push(...Object.values(i))
            }
        }
        return this;
    }

    unpackKeyValues() {
        const missing = this.variableData[0][0].missing.count;
        const missingProportion = this.variableData[0][0].missing.proportion;
        const distinct = this.variableData[0][1].distinct.count;
        const distinctProportion = this.variableData[0][1].distinct.proportion;
        const zero = this.variableData[0][2].zeros.count;
        const zeroProportion = this.variableData[0][2].zeros.proportion;
        const mean = this.variableData[0][5].stats.mean
        const min = this.variableData[0][5].stats.min
        const max = this.variableData[0][5].stats.max
        const std = this.variableData[0][5].stats.std
        const x = this.variableData[0][4].distribution.x
        const y = this.variableData[0][4].distribution.y

        return [[distinct, distinctProportion, missing, missingProportion, zero, zeroProportion,
                mean, min, max, std], [x, y]]
        }

    setOverviewTableValues() {
        const _zip = (x, y) => Array(Math.max(x.length, y.length)).fill().map((_, i) => [x[i], y[i]]);
        const [valueArray, plotValues] = this.unpackKeyValues(this.variableData);
        const [x, y] = plotValues

        Plotly.purge(distPlotDiv);
        createDistributionPlot(distPlotDiv, x, y, barPlotLayout, plotConfig);

        for(let [i, j] of _zip(this.elem.tableValues, valueArray)) {
           i.innerHTML = j;
        }
    return this;
    }

    createVariableView(variableObj) {
        this.setVarName().getVariableData(variableObj).setOverviewTableValues();
    }
}

