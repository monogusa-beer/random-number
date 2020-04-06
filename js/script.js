'use strict';

const numButtons = document.querySelectorAll(".number-button")
const setButton = document.getElementById("setButton");
const clearButton = document.getElementById("clearButton");
const minNumPanel = document.getElementById("minNumPanel");
const maxNumPanel = document.getElementById("maxNumPanel");

let minNum = "";
let maxNum = "";
let minNumPanelStatus = "waiting";
let maxNumPanelStatus;

let inputNum = function(num,minOrMax) {
	if (minOrMax === "min") {
		if (minNum.length === 6) {
			return;
		}
		if(minNum === "0") {
			minNum = `${num}`;
			minNumPanel.textContent = minNum;
			return;
		}
		minNum += num;
		minNumPanel.textContent = minNum;
	} else if (minOrMax === "max") {
		if (maxNum.length === 6) {
			return;
		}
		if(maxNum === "0") {
			maxNum = `${num}`;
			maxNumPanel.textContent = maxNum;
			return;
		}
		maxNum += num;
		maxNumPanel.textContent = maxNum;
	}
};

numButtons.forEach((numButton,index) => {
	numButton.addEventListener("click", () => {
		switch(minNumPanelStatus) {
			case "waiting":
				minNumPanel.classList.remove("waiting");
				minNumPanel.classList.add("active");
				inputNum(index,"min");
				minNumPanelStatus = "active";
				break;
			case "active":
				inputNum(index,"min");
				break;
			default:
				break;
		}
		switch(maxNumPanelStatus) {
			case "waiting":
				maxNumPanel.classList.remove("waiting");
				maxNumPanel.classList.add("active");
				inputNum(index,"max");
				maxNumPanelStatus = "active";
				break;
			case "active":
				inputNum(index,"max");
				break;
			default:
				break;
		}

	});
});

setButton.addEventListener('click', () => {
	if(minNumPanelStatus === "active") {
		minNumPanel.classList.remove("active");
		minNumPanelStatus = "";
		maxNumPanel.classList.add("waiting");
		maxNumPanelStatus = "waiting";
		maxNumPanel.textContent = "|";
	}
	if(maxNumPanelStatus === "active") {
		maxNumPanel.classList.remove("active");
		maxNumPanelStatus = "";
	}
})

clearButton.addEventListener('click', () => {
	minNumPanelStatus = "waiting";
	minNumPanel.textContent = "|"
	minNum = "";
	if (minNumPanel.classList.contains("active")) {
		minNumPanel.classList.remove("active");
	}
	if (!minNumPanel.classList.contains("waiting")) {
		minNumPanel.classList.add("waiting");
	}
	maxNumPanelStatus = "";
	maxNumPanel.textContent = "";
	maxNum = "";
	if (maxNumPanel.classList.contains("active")) {
		maxNumPanel.classList.remove("active");
	}
	if (maxNumPanel.classList.contains("waiting")) {
		maxNumPanel.classList.remove("waiting");
	}
})

