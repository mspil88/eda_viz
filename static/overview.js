const tdValues = document.querySelectorAll(".td-value");

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

setOverviewTableValues(tdValues, overview);
