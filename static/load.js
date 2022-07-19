const uploadBtn = document.querySelector(".upload-btn");
const loadMsg = document.querySelector(".load-msg");

const successMsg = () => {
    loadMsg.innerHTML = "Success!"
    loadMsg.style.color = "green";
}

const failureMsg = () => {
    loadMsg.innerHTML = "Failed!";
    loadMsg.style.color = "red";
}

const openFile = async ()=> {
    console.log("open file");

    const sendData = (dataObj) => {
        $.ajax({
            url: Flask.url_for("load", {}),
            type: "POST",
            data: JSON.stringify(dataObj),
            contentType: "application/json"})
            .done(function(res) {successMsg()})
    }


    try {
        const [fileHandle] = await window.showOpenFilePicker();
        const fileData = await fileHandle.getFile();
        const text = await fileData.text();
        const fileType = fileData.type;
        const delimiter = document.querySelector(".delimiter-sel").value;
        const dataExclusions = document.querySelector(".load-exclusions").value.replace(/\s+/g, '');
        const categoricalVariables = document.querySelector(".load-categorical").value.replace(/\s+/g, '');
        console.log(text);
        const payload = dataToSend(text, fileType, delimiter, dataExclusions, categoricalVariables);
        sendData(payload);

    } catch(err) {
        console.log(err);
        successMsg();
    }
}

const dataToSend = (file, fileType, delimiter, exclusions, categoricalVars) => {
    return {data: file,
            fileExtension: fileType,
            delim: delimiter,
            dataExclusions: exclusions.split(","),
            categoricals: categoricalVars.split(",")
    }
}

uploadBtn.addEventListener("click", openFile);