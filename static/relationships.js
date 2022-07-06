const corrBtns = document.querySelectorAll(".corr-btn");
const correlationPlot = document.querySelector(".correlation-plot-container");

const scatterRow1 = Array.from(document.querySelector(".scatter-row1").children);
const scatterRow2 = Array.from(document.querySelector(".scatter-row2").children);
const scatterPlotContainer = document.querySelector(".scatter-plot-container");

const boxRow1 = Array.from(document.querySelector(".box-row1").children);
const boxRow2 = Array.from(document.querySelector(".box-row2").children);
const boxPlotContainer = document.querySelector(".box-plot-container");

const scatterContainer = document.querySelector(".numeric-relationships-container");
const boxContainer = document.querySelector(".numeric-cat-box-container");

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

const toggleOffScatter = (elem, row) => {
    for(let i of row) {
        if(i.className.split(" ")[1] !== elem) {
            toggleOff(i);
        }
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

//consider breaking up controlView() function - too much going on in it
class RelationshipViewer {
    constructor(root, relType) {
        this.root = root;
        this.relationship = ['', ''];
        this.relType = relType;
        this.elem = {
            btnsRow1: Array.from(root.querySelector(`.${this.relType}-row1`).children),
            btnsRow2: Array.from(root.querySelector(`.${this.relType}-row2`).children),
            plotContainer: root.querySelector(`.${relType}-plot-container`)
        };
        this.elem.btnsRow1.forEach((btn) => {
            btn.addEventListener("click", (event)=> {
              this.controlView(this.relType, btn, this.elem.btnsRow1);

              })
        });
        this.elem.btnsRow2.forEach((btn) => {
            btn.addEventListener("click", (event)=> {
              this.controlView(this.relType, btn, this.elem.btnsRow2);
              })
        });
    }
    checkVariables() {
        if((this.relationship[0] === '') && (this.relationship[1] !== '')) {
            this.relationship[0] = this.relationship[1];
        } else if((this.relationship[0] !== '') && (this.relationship[1] === '')) {
            this.relationship[1] = this.relationship[0];
        }
    }
    controlView(relType, btn, elem) {

        const btnElem = btn.className.split(" ")[1];
        const variable = btnElem.split("-")[1];

        if(btnElem.includes("1")) {
            this.relationship[0] = variable;
        } else if (btnElem.includes("2")) {
            this.relationship[1] = variable;
        }
        toggleOn(btn);
        toggleOffScatter(btnElem, elem);
        this.checkVariables();
        const plotConfig = {responsive: true, displayModeBar: false}
        if(relType === "scatter") {
            var tr = scatterPlotTrace(sObj.scatterplot_data[this.relationship[0]], sObj.scatterplot_data[this.relationship[1]]);
            var layout = scatterLayout(this.relationship[0], this.relationship[1]);
            Plotly.newPlot(this.elem.plotContainer, tr, layout, plotConfig);
        } else if(relType === "box") {
            var [labels, boxplotData] = getBoxPlotData(this.relationship[0], this.relationship[1]);
            var tr = getBoxPlotTraces(labels, boxplotData);
            Plotly.newPlot(this.elem.plotContainer, tr, plotConfig);

        }
        }
    }


scatterViewer = new RelationshipViewer(scatterContainer, "scatter")
boxViewer = new RelationshipViewer(boxContainer, "box")





