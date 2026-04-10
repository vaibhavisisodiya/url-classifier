let safeURL = "";

async function checkURL() {
    const url = document.getElementById("urlInput").value.trim();
    const resultText = document.getElementById("resultText");
    const openBtn = document.getElementById("openBtn");

    if (url === "") {
        alert("Please enter a URL");
        return;
    }

    resultText.innerText = "Checking...";
    resultText.style.color = "black";
    openBtn.style.display = "none";

    try {
        const response = await fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: url })
        });

        const data = await response.json();

        resultText.innerText = data.result;

        let formattedURL = url;
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            formattedURL = "https://" + url;
        }

        if (data.result.includes("Safe")) {
            resultText.style.color = "green";
            safeURL = formattedURL;
            openBtn.style.display = "block";
        } else {
            resultText.style.color = "red";
            safeURL = "";
        }

    } catch (error) {
        console.error("Fetch error:", error);
        resultText.innerText = "Error connecting to backend";
        resultText.style.color = "orange";
        safeURL = "";
        openBtn.style.display = "none";
    }
}

function openURL() {
    if (safeURL) {
        window.open(safeURL, "_blank");
    }
}