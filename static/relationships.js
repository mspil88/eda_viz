const corrBtns = document.querySelectorAll(".corr-btn");
const correlationPlot = document.querySelector(".correlation-plot-container");

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

const toggleOffRemainder = (elem, btns) => {
    for(let i of corrBtns) {
        if(i.className.split(" ")[1] !== elem) {
            toggleOff(i);
        }
    }
}

//too repetitive
function controlCorrelationView() {
    const btnElem = this.className.split(" ")[1];
    if(btnElem === "pearson") {
        toggleOn(this);
        toggleOffRemainder(btnElem);
        renderCorrelationPlot(obj, btnElem)
    } else if(btnElem === "spearman") {
        toggleOn(this);
        toggleOffRemainder(btnElem);
        renderCorrelationPlot(obj, btnElem)
    } else if(btnElem === "kendall") {
        toggleOn(this);
        toggleOffRemainder(btnElem);
        renderCorrelationPlot(obj, btnElem)
    } else if(btnElem === "cramer") {
        toggleOn(this);
        toggleOffRemainder(btnElem);
        renderCorrelationPlot(obj, btnElem)
    }

}

corrBtns.forEach((btn) => {
    btn.addEventListener("click", controlCorrelationView);
})



const createCorrelationData = (obj) => {
    const x = Object.keys(obj);
    const y = x;
    let z = []

    for(let [k, v] of Object.entries(obj)) {
        z.push(Object.values(v))
    }
    return [x, y, z]
}









const renderCorrelationPlot = (obj, corrType) => {

    const [x_ax, y_ax, z_ax] = createCorrelationData(obj[corrType]);

    const correlationTrace =
        [{z: z_ax,
        x: x_ax,
        y: y_ax,
        colorscale: 'Greys',
        type: 'heatmap',
        hoverongaps: false}]

    const plotConfig = {responsive: true, displayModeBar: false}
    Plotly.newPlot(correlationPlot, correlationTrace, config=plotConfig);

}

const scatterRow1 = Array.from(document.querySelector(".scatter-row1").children);
const scatterRow2 = Array.from(document.querySelector(".scatter-row2").children);
const scatterPlotContainer = document.querySelector(".scatter-plot-container");

const boxRow1 = Array.from(document.querySelector(".box-row1").children);
const boxRow2 = Array.from(document.querySelector(".box-row2").children);
const boxPlotContainer = document.querySelector(".box-plot-container");

let scatterVars = ['','']
let boxVars = ['', '']

class RelationshipViewer {
    constructor(root) {
        this.root = root;
        this.relationship = ['', ''];
    }
}

//there's a bug here to be fixed
const checkVariables = (container) => {
    if((container[0] === '') && (container[1] !== '')) {
        container[0] = container[1];
    } else if((container[0] !== '') && (container[1] === '')) {
        container[1] = container[0];
    }
}

const scatterLayout = (x, y) => {
    return {
        xaxis: {
            title: {text: x}
        },
        yaxis: {
            title: {text: y}
        },
    }
}

function controlScatterView1() {
    const btnElem = this.className.split(" ")[1];
    const variable = btnElem.split("-")[1];
    scatterVars[0] = variable;
    console.log(`clicked ${btnElem}`)
    toggleOn(this);
    toggleOffScatter(btnElem, scatterRow1);
    checkVariables(scatterVars);
    console.log(scatterVars);
    const tr = scatterPlotTrace(sObj.scatterplot_data[scatterVars[0]], sObj.scatterplot_data[scatterVars[1]]);
    layout = scatterLayout(scatterVars[0], scatterVars[1]);
    const plotConfig = {responsive: true, displayModeBar: false}
    Plotly.newPlot(scatterPlotContainer, tr, layout, plotConfig);

}

function controlBoxView1() {
    const btnElem = this.className.split(" ")[1];
    const variable = btnElem.split("-")[1];
    console.log(btnElem, variable)
    boxVars[0] = variable;
    console.log(`clicked ${btnElem}`)
    toggleOn(this);
    console.log(boxVars);
    toggleOffScatter(btnElem, boxRow1);
    checkVariables(boxVars);
    console.log(boxVars);
    const [labels, boxplotData] = getBoxPlotData(boxVars[0], boxVars[1]);
    const boxPlotTraces = getBoxPlotTraces(labels, boxplotData);
    const plotConfig = {responsive: true, displayModeBar: false};
    Plotly.newPlot(boxPlotContainer, boxPlotTraces,  config= plotConfig);

}


function controlScatterView2() {
    const btnElem = this.className.split(" ")[1];
    const variable = btnElem.split("-")[1];
    scatterVars[1] = variable;
    console.log(`clicked ${btnElem}`)
    toggleOn(this);
    toggleOffScatter(btnElem, scatterRow2);
    checkVariables(scatterVars);
    console.log(scatterVars);
    const tr = scatterPlotTrace(sObj.scatterplot_data[scatterVars[0]], sObj.scatterplot_data[scatterVars[1]]);
    layout = scatterLayout(scatterVars[0], scatterVars[1]);
    const plotConfig = {responsive: true, displayModeBar: false}
    Plotly.newPlot(scatterPlotContainer, tr, layout, plotConfig);
}

function controlBoxView2() {
    const btnElem = this.className.split(" ")[1];
    const variable = btnElem.split("-")[1];
    boxVars[1] = variable;
    console.log(`clicked ${btnElem}`)
    toggleOn(this);
    toggleOffScatter(btnElem, boxRow2);
    checkVariables(boxVars);
    console.log(boxVars);
    const [labels, boxplotData] = getBoxPlotData(boxVars[0], boxVars[1]);
    const boxPlotTraces = getBoxPlotTraces(labels, boxplotData);
    const plotConfig = {responsive: true, displayModeBar: false};
    Plotly.newPlot(boxPlotContainer, boxPlotTraces,  config= plotConfig);

}

function controlScatterView() {
    const btnElem = this.className.split(" ")[1];
    console.log(`clicked ${btnElem}`)
    toggleOn(this);
    toggleOffScatter(btnElem, scatterRow2);


}

const toggleOffScatter = (elem, row) => {
    for(let i of row) {
        if(i.className.split(" ")[1] !== elem) {
            toggleOff(i);
        }
    }
}
scatterRow1.forEach((btn) => {
    btn.addEventListener("click", controlScatterView1);

});

scatterRow2.forEach((btn) => {
    btn.addEventListener("click", controlScatterView2);
});

boxRow1.forEach((btn) => {
    btn.addEventListener("click", controlBoxView1);

});

boxRow2.forEach((btn) => {
    btn.addEventListener("click", controlBoxView2);

});


const scatterPlotTrace = (x, y) => {
    return [{
        x: x,
        y: y,
        mode: 'markers',
        marker: {
            color: "rgb(128, 128, 128)",
            line: {
                color: "rgb(33, 33, 33)",
                width: 0.3
                },
        },
        type: 'scatter'
    }]
}

const getBoxPlotData = (x, y) => {
    let data = [];
    console.log(x, y)
    try {
        for(let i of bObj[x]) {
            if(i[0] === y) {
                data.push(...i.slice(1, i.length))
            }
    }} catch(err) {
        console.log(err)
    }

    return [...data.slice(0, 1), data.slice(1, data.length)];
}

const _zip = (x, y) => Array(Math.max(x.length, y.length)).fill().map((_, i) => [x[i], y[i]]);

const getBoxPlotTraces= (labels, data) => {
    let traces = [];
    const boxPlotTrace = (yVal, varName) => {
        return {
            y: yVal,
            type: 'box',
            name: varName,
            
        }
    }
    try {
        for(let [i, j] of _zip(labels, data)) {

            traces.push(boxPlotTrace(j, i))
    }} catch(err) {

    }
    return traces
}

let [d, g] = getBoxPlotData("Age", "Parch");
let traces = getBoxPlotTraces(d, g)


