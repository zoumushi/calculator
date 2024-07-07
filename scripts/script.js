const display = document.getElementById("display").firstChild;
const buttons = document.querySelectorAll("button");

let firstNumber;
let secondNumber;
let operator;

function add(a, b) {
	return a + b;
}
function subtract(a, b) {
	return a - b;
}
function multiply(a, b) {
	return a * b;
}
function divide(a, b) {
	return a / b;
}

function operate(firstNumber, secondNumber, operator) {
	if (!secondNumber) {
		secondNumber = firstNumber;
	}
	switch (operator) {
		case "+":
			return add(firstNumber, secondNumber);
		case "-":
			return subtract(firstNumber, secondNumber);
		case "x":
			return multiply(firstNumber, secondNumber);
		case "/":
			return divide(firstNumber, secondNumber);
		default:
			break;
	}
}

function updateDisplay(value, attribute) {
	switch (attribute) {
		case "number":
			if ((display.innerHTML + value).length > 9) {
				break;
			}
			if (display.innerHTML === "0") {
				display.innerHTML = value;
			} else {
				display.innerHTML += value;
			}
			break;
		case "operator":
			if (!secondNumber) {
				display.innerHTML = "0";
			}
			break;
		case "equals":
			display.innerHTML = value;
			break;
		case "backspace":
			if (display.innerHTML.length == 1) {
				display.innerHTML = "0";
			} else {
				let calculatorDisplay = display.innerHTML.split('');
				calculatorDisplay.pop();
				display.innerHTML = calculatorDisplay.join('');
			}
			break;
		default:
			break;
	}
}

function handleButtonClick(buttonClicked) {
	let button = buttonClicked.target;
	switch (button.getAttribute("name")) {
		case "number":
			updateDisplay(button.innerHTML, "number");
			if (operator) {
				secondNumber = +display.innerHTML;
			} else {
				firstNumber = +display.innerHTML;
			}
			break;
		case "operator":
			updateDisplay(button.innerHTML, "operator");
			operator = button.innerHTML;
			break;
		case "equals":
			if (!secondNumber || !operator) {
				break;
			}
			firstNumber =
				Math.round(
					operate(firstNumber, secondNumber, operator) * 10000000
				) / 10000000;
			secondNumber = undefined;
			operator = undefined;
			updateDisplay(firstNumber, "equals");
			break;
		case "clear":
			firstNumber = undefined;
			secondNumber = undefined;
			operator = undefined;
			display.innerHTML = "0";
			break;
		case "backspace":
				updateDisplay(display.innerHTML, "backspace")
				if (operator) {
					secondNumber = +display.innerHTML;
				} else {
					firstNumber = +display.innerHTML;
				}
		default:
			break;
	}
}

buttons.forEach(function (button) {
	button.addEventListener("click", handleButtonClick);
});
