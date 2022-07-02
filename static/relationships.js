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
let scatterVars = ['','']

const checkVariables = () => {
    if((scatterVars[0] === '') && (scatterVars[1] !== '')) {
        scatterVars[0] = scatterVars[1];
    } else if((scatterVars[0] !== '') && (scatterVars[1] === '')) {
        scatterVars[1] = scatterVars[0];
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
    checkVariables();
    console.log(scatterVars);
    const tr = scatterPlotTrace(sObj.scatterplot_data[scatterVars[0]], sObj.scatterplot_data[scatterVars[1]]);
    layout = scatterLayout(scatterVars[0], scatterVars[1]);
    const plotConfig = {responsive: true, displayModeBar: false}
    Plotly.newPlot(scatterPlotContainer, tr, layout, plotConfig);

}

function controlScatterView2() {
    const btnElem = this.className.split(" ")[1];
    const variable = btnElem.split("-")[1];
    scatterVars[1] = variable;
    console.log(`clicked ${btnElem}`)
    toggleOn(this);
    toggleOffScatter(btnElem, scatterRow2);
    checkVariables();
    console.log(scatterVars);
    const tr = scatterPlotTrace(sObj.scatterplot_data[scatterVars[0]], sObj.scatterplot_data[scatterVars[1]]);
    layout = scatterLayout(scatterVars[0], scatterVars[1]);
    const plotConfig = {responsive: true, displayModeBar: false}
    Plotly.newPlot(scatterPlotContainer, tr, layout, plotConfig);
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