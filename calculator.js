// const display = document.getElementById("display");

// function appendValue(value) {
//     display.value += value;
// }

// function clearDisplay() {
//     display.value = "";
// }

// function deleteLast() {
//     display.value = display.value.slice(0, -1);
// }

// function calculate() {
//     try {
//         display.value = eval(
//             display.value.replace(/÷/g, "/").replace(/×/g, "*")
//         );
//     } catch {
//         display.value = "Error";
//     }
// }

const display = document.getElementById("display");

let currentInput = "";

// Append a value to the display (e.g., when a number or operator is clicked)
function appendValue(value) {
    // Prevent multiple operators in a row
    if (isOperator(value) && isOperator(currentInput.slice(-1))) {
        return; // Don't append if the last character is an operator
    }

    // Prevent leading zeros
    if (value === "0" && currentInput === "") {
        return;
    }

    // Handle if there's an error displayed, clear the display
    if (currentInput === "Error") {
        currentInput = value;
    } else {
        currentInput += value;
    }

    updateDisplay();
}

// Clear the display
function clearDisplay() {
    currentInput = "";
    updateDisplay();
}

// Delete the last character in the input
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

// Update the display with current input value
function updateDisplay() {
    display.value = currentInput;
}

// Validate if a character is an operator
function isOperator(value) {
    return ["+", "-", "*", "/", "÷", "×", "%", "^"].includes(value);
}

// Function to handle calculations, including error handling
function calculate() {
    try {
        // Replace specific symbols for calculation compatibility
        let expression = currentInput
            .replace(/÷/g, "/")
            .replace(/×/g, "*")
            .replace(/\^/g, "**"); // Exponentiation

        // Validate the expression before evaluating it
        if (!isValidExpression(expression)) {
            throw new Error("Invalid expression");
        }

        // Evaluate the expression safely (using new Function or a similar approach is safer than eval)
        let result = new Function("return " + expression)();

        // Handle edge case of Infinity or NaN
        if (!isFinite(result)) {
            throw new Error("Math error");
        }

        currentInput = result.toString();
    } catch (error) {
        currentInput = "Error";
    }
    updateDisplay();
}

// Check if the expression is valid (no consecutive operators, balanced parentheses, etc.)
function isValidExpression(expression) {
    const invalidPattern =
        /[^\d\+\-\*\/\(\)\^\.%]|(\d+\.[\d]*\.)|([^\d\+\-\*\/\(\)\^]$)/;
    return !invalidPattern.test(expression);
}

// Add a decimal point to the current input if not already present
function addDecimal() {
    if (!currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay();
    }
}

// Additional functionality: Square root calculation
function sqrt() {
    try {
        let result = Math.sqrt(parseFloat(currentInput));
        if (isNaN(result)) throw new Error("Invalid input");
        currentInput = result.toString();
        updateDisplay();
    } catch {
        currentInput = "Error";
        updateDisplay();
    }
}

// Additional functionality: Percentage calculation
function percentage() {
    try {
        let result = parseFloat(currentInput) / 100;
        currentInput = result.toString();
        updateDisplay();
    } catch {
        currentInput = "Error";
        updateDisplay();
    }
}
