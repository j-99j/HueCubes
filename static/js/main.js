// Store selected blocks
let selectedBlock1 = null;
let selectedBlock2 = null;

// Select Block Function
function selectBlock(blockNumber) {
    const blockName = prompt(`Enter the block name for Block ${blockNumber}:`);
    if (!blockName) return;

    if (blockNumber === 1) {
        selectedBlock1 = blockName;
        document.getElementById("block1-text").innerText = `Block 1: ${blockName}`;
    } else if (blockNumber === 2) {
        selectedBlock2 = blockName;
        document.getElementById("block2-text").innerText = `Block 2: ${blockName}`;
    }
}

// Generate Gradient Function
function generateGradient() {
    const distance = document.getElementById("distance").value;

    if (!selectedBlock1 || !selectedBlock2 || !distance) {
        alert("Please select both blocks and specify the distance.");
        return;
    }

    fetch("/generate-gradient", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            block1: selectedBlock1,
            block2: selectedBlock2,
            distance: parseInt(distance, 10),
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            const gradientDisplay = document.getElementById("gradient-display");
            gradientDisplay.innerHTML = ""; // Clear previous gradient

            // Render the gradient blocks
            data.gradient.forEach((block) => {
                const blockDiv = document.createElement("div");
                blockDiv.style.width = "50px";
                blockDiv.style.height = "50px";
                blockDiv.style.backgroundImage = `url(/static/textures/${block.texture})`;
                blockDiv.style.border = "1px solid #ccc";
                blockDiv.title = block.id;
                gradientDisplay.appendChild(blockDiv);
            });
        })
        .catch((error) => {
            console.error("Error generating gradient:", error);
            alert("An error occurred while generating the gradient. Please try again.");
        });
}
