const uploadBtn = document.querySelector(".upload-btn");

const openFile = async ()=> {
    console.log("open file");

    const sendData = (dataObj) => {
        $.ajax({
            url: Flask.url_for("load", {}),
            type: "POST",
            data: JSON.stringify(dataObj),
            contentType: "application/json"})
            .done(function(res) {console.log("success")})
    }


    try {
        const [fileHandle] = await window.showOpenFilePicker();
        const fileData = await fileHandle.getFile();
        const text = await fileData.text();
        const fileType = fileData.type;
        const dataExclusions = document.querySelector(".load-exclusions").value.replace(/\s+/g, '');
        const categoricalVariables = document.querySelector(".load-categorical").value.replace(/\s+/g, '');
        console.log(text);
        const payload = dataToSend(text, fileType, dataExclusions, categoricalVariables)
        sendData(payload);
    } catch(err) {
        console.log(err);
    }
}

const dataToSend = (file, fileType, exclusions, categoricalVars) => {
    return {data: file,
            fileExtension: fileType,
            dataExclusions: exclusions,
            categoricals: categoricalVars
    }
}

uploadBtn.addEventListener("click", openFile);