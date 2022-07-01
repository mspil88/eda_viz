const corrBtns = document.querySelectorAll(".corr-btn");

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
