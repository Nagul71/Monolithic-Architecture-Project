document.getElementById("shape").addEventListener("change", function () {
    let shape = this.value;
    let inputFields = document.getElementById("input-fields");
    inputFields.innerHTML = "";

    if (shape === "circle") {
        inputFields.innerHTML = `
            <label>Radius:</label>
            <input type="number" id="radius" required>
        `;
    } else if (shape === "rectangle") {
        inputFields.innerHTML = `
            <label>Length:</label>
            <input type="number" id="length" required>
            <label>Width:</label>
            <input type="number" id="width" required>
        `;
    } else if (shape === "triangle") {
        inputFields.innerHTML = `
            <label>Base:</label>
            <input type="number" id="base" required>
            <label>Height:</label>
            <input type="number" id="height" required>
            <label>Side 1:</label>
            <input type="number" id="side1" required>
            <label>Side 2:</label>
            <input type="number" id="side2" required>
            <label>Side 3:</label>
            <input type="number" id="side3" required>
        `;
    }
});

function calculate() {
    let shape = document.getElementById("shape").value;
    let data = { shape_type: shape };

    if (shape === "circle") {
        data.radius = parseFloat(document.getElementById("radius").value);
    } else if (shape === "rectangle") {
        data.length = parseFloat(document.getElementById("length").value);
        data.width = parseFloat(document.getElementById("width").value);
    } else if (shape === "triangle") {
        data.base = parseFloat(document.getElementById("base").value);
        data.height = parseFloat(document.getElementById("height").value);
        data.side1 = parseFloat(document.getElementById("side1").value);
        data.side2 = parseFloat(document.getElementById("side2").value);
        data.side3 = parseFloat(document.getElementById("side3").value);
    }

    fetch("/calculate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById("result").innerText = 
            `Area: ${result.area}, Perimeter: ${result.perimeter}, Volume: ${result.volume || 'N/A'}`;
    })
    .catch(error => console.error("Error:", error));
}
