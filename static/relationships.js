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

const toggleOffRemainder = (elem) => {
    for(let i of corrBtns) {
        if(i.className.split(" ")[1] !== elem) {
            toggleOff(i);
        }
    }
}

function controlCorrelationView() {
    const btnElem = this.className.split(" ")[1];
    if(btnElem === "pearson") {
        toggleOn(this);
        toggleOffRemainder(btnElem);
    } else if(btnElem === "spearman") {
        toggleOn(this);
        toggleOffRemainder(btnElem);
    } else if(btnElem === "kendall") {
        toggleOn(this);
        toggleOffRemainder(btnElem);
    } else if(btnElem === "cramer") {
        toggleOn(this);
        toggleOffRemainder(btnElem);
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

const [x_ax, y_ax, z_ax] = createCorrelationData(obj);

const correlationTrace =
    [{z: z_ax,
    x: x_ax,
    y: y_ax,
    colorscale: 'Greys',
    type: 'heatmap',
    hoverongaps: false}]


const plotConfig = {responsive: true, displayModeBar: false}


Plotly.newPlot(correlationPlot, correlationTrace, config=plotConfig);
