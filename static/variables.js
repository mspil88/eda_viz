const singleView = document.querySelector("#option-1");
const multiView = document.querySelector("#option-2");
const variableSelect = document.querySelector(".variable-select");

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