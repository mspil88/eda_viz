const singleView = document.querySelector("#option-1");
const multiView = document.querySelector("#option-2");
const variableSelect = document.querySelector(".variable-select");
const variableName = document.querySelector(".variable-name");
const tdValue = document.querySelectorAll(".td-value");
const wrapperDataSel = document.querySelector(".wrapper-data-sel")
const distPlotDiv = document.querySelector(".var-sum-4");

const variableContainer = document.querySelector(".variable-container");
const mainWindow = document.querySelector(".main-container");

let viewState = "single"

const toggleElemVisibility = (elem, visibility) => {
    try {
        elem.style.visibility = visibility
    } catch(err) {
        console.log(err);
    }
}

const removeVariableContainer = () => {
    try {
        const vc = document.querySelector(".variable-container");
        vc.remove()
    } catch(err) {
        console.log(err);
    }
}

const removeAllVariableContainers = () => {
    try {
        const vca = document.querySelectorAll(".variable-container");
        vca.forEach(container => container.remove());
    } catch(err) {
        console.log(err);
    }

}

singleView.addEventListener("click", ()=> {
    if(viewState !== "single") {
        console.log("option-1 clicked");
        viewState = "single";
        removeAllVariableContainers();
        toggleElemVisibility(variableSelect, "visible")
   };
})

multiView.addEventListener("click", ()=> {
    if(viewState !== "multi"){
        console.log("option-2 clicked")
        viewState = "multi";
        toggleElemVisibility(variableSelect, "hidden")
        removeVariableContainer();
        renderMultiple();
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
    height: 250,
    width: 240,
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
    console.log(dataTypeMap[val.value]);
    removeVariableContainer();

    const data_type = dataTypeMap[val.value];
    if(data_type === "numeric") {
        createVariableDiv(val.value);
        const variableDiv = document.querySelector(`.vc-${val.value}`);
        const vv = new VariableView(variableDiv, val.value, variables, data_type);
        vv.createVariableView(variables);
    } else if (data_type === "categorical") {
        createCategoricalVariableDiv(val.value);
        const variableDiv = document.querySelector(`.vc-${val.value}`);
        const vv = new CategoricalVariableView(variableDiv, val.value, variables, data_type);
        vv.createVariableView(variables);
    }

//    const vv = new VariableView(variableContainer, val.value, variables)
//    vv.createVariableView(variables);
    toggleElemVisibility(wrapperDataSel, "visible");
}


const createVariableDiv = (variable) => {
    div = document.createElement("div");
    div.className = `variable-container vc-${variable}`
    const s = `<div class="variable-sub-container var-sum">
            <h3 class="variable-name"></h3>
            <h4 class="variable-type"></h4>
            <div class="wrapper-data-sel">
            <button class="overview-btn overview-${variable}">Overview</button>
            <button class="stats-btn stats-${variable}">Stats</button>
        </div>
        </div>
        <div class="variable-sub-container var-sum-2">
            <table class="variable-table v1-${variable}">
                <tr>
                    <td class="td-label td-label-var">Distinct</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Distinct (%)</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Missing</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Missing (%)</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Zeros</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Zeros (%)</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>

            </table>
        </div>
        <div class="variable-sub-container var-sum-3">
            <table class="variable-table v2-${variable}">
                <tr>
                    <td class="td-label td-label-var">Mean</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Min</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Max</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">SD</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>


            </table>
        </div>

        <div class="variable-sub-container var-sum-${variable}">


        </div>`
    div.innerHTML = s;
    mainWindow.append(div);
}

const overviewTable = (variable) => {
    return [`<table class="variable-table v1-${variable}">
                <tr>
                    <td class="td-label td-label-var">Distinct</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Distinct (%)</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Missing</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Missing (%)</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Zeros</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Zeros (%)</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>

            </table>`,
        `<table class="variable-table v2-${variable}">
                <tr>
                    <td class="td-label td-label-var">Mean</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Min</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Max</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">SD</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>


            </table>`]
}

const statsTable = (variable) => {
    return [`<table class="variable-table v1-${variable}">
                <tr>
                    <td class="td-label td-label-var">Mean</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">STD</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Min</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Q25</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Median</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Q75</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>

            </table>`,
            `<table class="variable-table v2-${variable}">
                <tr>
                    <td class="td-label td-label-var">Max</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Range</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">IQR</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Skew</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Kurtosis</td>
                    <td class="td-value td-value-var  val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Sum</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>

            </table>`]
}

const overviewTableCat = (variable) => {
    return [`<table class="variable-table v1-${variable}">
                <tr>
                    <td class="td-label td-label-var">Distinct</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Distinct (%)</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Missing</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Missing (%)</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Zeros</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Zeros (%)</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>

            </table>`,
        `<table class="variable-table v2-${variable}">
                <tr>
                    <td class="td-label td-label-var">Mode</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Entropy</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>

            </table>`
    ]

}

const createCategoricalVariableDiv = (variable) => {
    div = document.createElement("div");
    div.className = `variable-container vc-${variable}`
    const s = `<div class="variable-sub-container var-sum">
            <h3 class="variable-name"></h3>
            <h4 class="variable-type"></h4>
            <div class="wrapper-data-sel">
            <button class="overview-btn overview-${variable}">Overview</button>
            <button class="stats-btn stats-${variable}">Stats</button>
        </div>
        </div>
        <div class="variable-sub-container var-sum-2">
            <table class="variable-table v1-${variable}">
                <tr>
                    <td class="td-label td-label-var">Distinct</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Distinct (%)</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Missing</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Missing (%)</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Zeros</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Zeros (%)</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>

            </table>
        </div>
        <div class="variable-sub-container var-sum-3">
            <table class="variable-table v2-${variable}">
                <tr>
                    <td class="td-label td-label-var">Mode</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>
                <tr>
                    <td class="td-label td-label-var">Entropy</td>
                    <td class="td-value td-value-var val-${variable}">-</td>
                </tr>

            </table>
        </div>

        <div class="variable-sub-container var-sum-${variable}">


        </div>`
    div.innerHTML = s;
    mainWindow.append(div);
}

const toggleOn = (elem) => {
    elem.style.backgroundColor = "#212121";
    elem.style.border = "none";
    elem.style.color = "white";
};

const toggleOff = (elem) => {
    elem.style.backgroundColor = "#fff";
    elem.style.border = "2px solid lightgrey";
    elem.style.color = "#808080";
};

class VariableView {
    constructor(root, variable, variableObj, dtype) {
        this.root = root;
        this.variable = variable;
        this.variableData = [];
        this.dtype = dtype;

        this.elem = {
            varName: root.querySelector(".variable-name"),
            varType: root.querySelector(".variable-type"),
            tableValues: root.querySelectorAll(".td-value"),
            chartContainer: root.querySelector(".var-sum-4"),
            tableContainer1: root.querySelector(".var-sum-2"),
            tableContainer2: root.querySelector(".var-sum-3"),
            overviewBtn: root.querySelector(`.overview-${this.variable}`),
            statsBtn: root.querySelector(`.stats-${this.variable}`),
            tableV1: root.querySelector(`.v1-${this.variable}`),
            tableV2: root.querySelector(`.v2-${this.variable}`)
        }

        this.elem.overviewBtn.addEventListener("click", event=> {
            toggleOn(this.elem.overviewBtn);
            toggleOff(this.elem.statsBtn);
            this.elem.tableV1.remove();
            this.elem.tableV2.remove();

            if(this.dtype === "numeric") {
                var [tbl1, tbl2] = overviewTable(this.variable);
            } else if(this.dtype === "categorical") {
                var [tbl1, tbl2] = overviewTableCat(this.variable);
            }

            this.elem.tableContainer1.innerHTML=tbl1;
            this.elem.tableContainer2.innerHTML=tbl2;
            this.setTableValues("overview");

        });

        this.elem.statsBtn.addEventListener("click", event=> {
            toggleOn(this.elem.statsBtn);
            toggleOff(this.elem.overviewBtn);
            this.elem.tableV1.remove();
            this.elem.tableV2.remove();
            const [tbl1, tbl2] = statsTable(this.variable);
            this.elem.tableContainer1.innerHTML=tbl1;
            this.elem.tableContainer2.innerHTML=tbl2;
            this.setTableValues("stats");
        });
    };

    setVarName() {
        this.elem.varName.innerHTML = this.variable;
        return this;
    }

    setVarType() {
        this.elem.varType.innerHTML = this.dtype;
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

    unpackStatsValues() {
        const mean = this.variableData[0][5].stats.mean
        const std = this.variableData[0][5].stats.std
        const min = this.variableData[0][5].stats.min
        const q25 = this.variableData[0][5].stats.Q25
        const median = this.variableData[0][5].stats.median
        const q75 = this.variableData[0][5].stats.Q75
        const max = this.variableData[0][5].stats.max
        const range = this.variableData[0][5].stats.range
        const iqr = this.variableData[0][5].stats.IQR
        const skew = this.variableData[0][5].stats.skew
        const kurtosis = this.variableData[0][5].stats.kurtosis
        const sum = this.variableData[0][5].stats.sum

        return [mean, std, min, q25, median, q75, max, range, iqr, skew, kurtosis, sum]
        }

    setOverviewTableValues() {
        const _zip = (x, y) => Array(Math.max(x.length, y.length)).fill().map((_, i) => [x[i], y[i]]);
        const [valueArray, plotValues] = this.unpackKeyValues(this.variableData);
        const [x, y] = plotValues
        const plotDiv = document.querySelector(`.var-sum-${this.variable}`);

//        Plotly.purge(plotDiv);
        createDistributionPlot(plotDiv, x, y, barPlotLayout, plotConfig);

        for(let [i, j] of _zip(this.elem.tableValues, valueArray)) {
           i.innerHTML = j;
        }
    return this;
    }

    setTableValues(tableType="stats") {
        const _zip = (x, y) => Array(Math.max(x.length, y.length)).fill().map((_, i) => [x[i], y[i]]);

        if(tableType === "stats") {
            var valueArray = this.unpackStatsValues(this.variableData);
        } else if((tableType === "overview")) {
            var [valueArray, ] = this.unpackKeyValues(this.variableData);
        }
        const newTableValues = document.querySelectorAll(`.val-${this.variable}`);

        for(let[i, j] of _zip(newTableValues, valueArray)) {
            i.innerHTML = j;
        }
    }

    createVariableView(variableObj) {
        this.setVarName().setVarType().getVariableData(variableObj).setOverviewTableValues();
    }
}

class CategoricalVariableView extends VariableView {
    constructor(root, variable, variableObj, dtype) {
        super(root, variable, variableObj, dtype);
    }

    unpackKeyValues() {
        const missing = this.variableData[0][0].missing.count;
        const missingProportion = this.variableData[0][0].missing.proportion;
        const distinct = this.variableData[0][1].distinct.count;
        const distinctProportion = this.variableData[0][1].distinct.proportion;
        const zero = this.variableData[0][2].zeros.count;
        const zeroProportion = this.variableData[0][2].zeros.proportion;
        const mode = this.variableData[0][5].stats.mode
        const entropy = this.variableData[0][5].stats.entropy
        const x = this.variableData[0][4].distribution.x
        const y = this.variableData[0][4].distribution.y


        return [[distinct, distinctProportion, missing, missingProportion, zero, zeroProportion,
                mode, entropy], [x, y]]
        }

}

varViews = []
const renderMultiple = () => {

    for(let i of variables) {
        variable = Object.keys(i)[0];
        console.log(variable);
        const data_type = dataTypeMap[variable];

        if(data_type === "numeric") {
            createVariableDiv(variable);
            const variableDiv = document.querySelector(`.vc-${variable}`);
            const vv = new VariableView(variableDiv, variable, variables, data_type);
            vv.createVariableView(variables);
            varViews.push({_var: variable, instance: vv});
        } else if (data_type === "categorical") {
            createCategoricalVariableDiv(variable);
            const variableDiv = document.querySelector(`.vc-${variable}`);
            const vv = new CategoricalVariableView(variableDiv, variable, variables, data_type);
            vv.createVariableView(variables);
            varViews.push({_var: variable, instance: vv});
    }}


}




