const tdValues = document.querySelectorAll(".td-value");
const missingPlotElem = document.querySelector(".missing-container")
const headTblElem = document.querySelector(".table-container-head");
const tailTblElem = document.querySelector(".table-container-tail");


const setOverviewTableValues = (tableValues, overviewObj) => {

    const setProportionValue = (proportion) => {
        return `${Math.round(proportion*100)}%`
    }

    const valuesToSet = [overviewObj.overview[0].rows, overviewObj.overview[1].variables,
                        overviewObj.overview[2].missing.count, setProportionValue(overviewObj.overview[2].missing.proportion),
                        overviewObj.overview[4].duplicates.count, setProportionValue(overviewObj.overview[4].duplicates.proportion),
                        overviewObj.overview[8].mapped_type_count.numeric, overviewObj.overview[8].mapped_type_count.categorical]

    const _zip = (x, y) => Array(Math.max(x.length, y.length)).fill().map((_, i) => [x[i], y[i]])

    console.log(valuesToSet.length)
    console.log(tableValues.length)
    for(let [i, j] of _zip(tableValues, valuesToSet)) {
        i.innerHTML = j;
    }
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

}

const plotConfig = {responsive: true, displayModeBar: false}

const createMissingValuePlot = (missingElem, overviewObj, barLayout, plotConfig) => {
    const {x, y} = overviewObj.overview[3].missing_plot;
    const barTrace = barPlotTrace(x, y);
    Plotly.newPlot(missingElem, barTrace, barLayout, plotConfig);
}

const renderSample = (overviewObj, parentElem, sampleType) => {

    objIdx = sampleType == "head" ? 5 : 6;
    console.log(objIdx);
    colNames = Object.keys(overviewObj.overview[objIdx][sampleType]);
    tableValues = Object.values(overviewObj.overview[objIdx][sampleType]);
    console.log(tableValues);
    nrows = Object.values(Object.values(overviewObj.overview[objIdx][sampleType])[1]).length;
    console.log(nrows);
    var arrayIdx = [];

    if(sampleType == "head") {
        var arrayIdx = Array.from(Array(nrows).keys())
    }
    else {
        const firstValue = parseInt(Object.keys(Object.values(overviewObj.overview[objIdx]["tail"])[1])[0]);
        var arrayIdx = [];
        for(let i=0; i < nrows; i++) {
            arrayIdx.push(firstValue+i);
        }
    }
    let tblString = `<table class= sample-${sampleType}-tbl> <tr>`;

    for(let i of colNames) {
        tblString += `<th>${i}</th>`
    }
    tblString += `</tr>`
    for(let i of arrayIdx) {
        tblString += `<tr class=row row-${i}>`;
        for(let j of tableValues) {
            console.log(j)
            tblString += `<td>${j[i]}</td>`
        }
        tblString += `</tr>`;
    }
    tblString += `</table>`
    console.log(tblString);
    parentElem.innerHTML = tblString;
}




setOverviewTableValues(tdValues, overview);
createMissingValuePlot(missingPlotElem, overview, barPlotLayout, plotConfig);
renderSample(overview, headTblElem, "head");
renderSample(overview, tailTblElem, "tail");
