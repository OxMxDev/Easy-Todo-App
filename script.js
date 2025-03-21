const addbtn = document.querySelector(".addbtn");
const input = document.getElementById("taskText");
const inputLabel = document.getElementById("inputLabel");
const downLine = document.getElementById("downLine");
const inputContainer = document.querySelector(".inputContainer");
const dateContainer = document.querySelector(".dateContainer");
const todoContainer = document.querySelector(".todoContainer");
const clearDone = document.querySelector(".clearDoneBtn");
const clearAll = document.querySelector(".clearAllBtn");
const darkmode = document.querySelector(".darkmode");
let inputVal;
loadTasks();
const date = new Date();
const options = { weekday: "long", month: "long", day: "numeric" };
const formattedDate = date.toLocaleDateString("en-US", options);

dateContainer.textContent = formattedDate;
let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();

input.addEventListener("click", (event) => {
	if (window.innerWidth > 1395) {
		inputLabel.style.transform = "translate(-160px,-36px)";
		inputLabel.style.fontSize = "16px";
		input.style.borderBottom = "none";
	} else {
		inputLabel.style.transform = "translate(-93px,-36px)";
		input.style.borderBottom = "none";
		inputLabel.style.fontSize = "16px";
	}
	event.stopPropagation();
});

document.body.addEventListener("click", () => {
	if (input.value.trim() === "" && window.innerWidth > 1395) {
		inputLabel.style.transform = "translate(-131px,-26px)";
		input.style.borderBottom = "4px solid gray";
		inputLabel.style.fontSize = "";
	} else if (input.value.trim() === "" && window.innerWidth < 1395) {
		inputLabel.style.transform = "translate(-77px,-7px)";
		input.style.borderBottom = "4px solid gray";
		inputLabel.style.fontSize = "";
	} else {
		input.focus();
	}
});

function addElements(taskText = inputVal, savedTime = null) {
	let taskdiv = document.createElement("div");
	let leftdiv = document.createElement("div");
	let rightdiv = document.createElement("div");
	let checkBox = document.createElement("div");
	let span = document.createElement("span");
	let edit = document.createElement("i");
	let deleteIcon = document.createElement("i");
	let timeSpan = document.createElement("span");

	taskdiv.className = "newdiv";
	taskdiv.style.display = "flex";
	taskdiv.style.alignItems = "center";
	taskdiv.style.height = "70px";
	taskdiv.style.margin = "5px 0";
	taskdiv.style.gap = "90px";
	taskdiv.style.backgroundColor = "rgba(255, 255, 255, 0.1)";

	leftdiv.style.width = "30%";
	leftdiv.style.display = "flex";
	leftdiv.style.alignItems = "center";
	leftdiv.style.gap = "20px";

	rightdiv.style.width = "50%";
	rightdiv.style.display = "flex";
	rightdiv.style.alignItems = "center";

	checkBox.style.height = "30px";
	checkBox.style.minWidth = "30px";
	checkBox.style.margin = "0 10px";
	checkBox.style.border = "2px solid rgba(255,255,255,0.3)";
	checkBox.style.borderRadius = "50%";

	span.textContent = taskText;
	span.style.color = "white";

	edit.classList.add("fa-solid", "fa-pen-to-square");
	edit.style.color = "white";
	edit.style.margin = "0 20px";
	edit.style.fontSize = "25px";
	edit.style.cursor = "pointer";

	deleteIcon.classList.add("fa-solid", "fa-trash");
	deleteIcon.style.color = "white";
	deleteIcon.style.margin = "0 20px";
	deleteIcon.style.fontSize = "25px";
	deleteIcon.style.cursor = "pointer";

	// Get current time if no savedTime is provided
	let date2 = new Date();
	let hours = date2.getHours() % 12 || 12;
	let minutes = date2.getMinutes().toString().padStart(2, "0");
	let seconds = date2.getSeconds().toString().padStart(2, "0");
	let ampm = date2.getHours() >= 12 ? "PM" : "AM";
	let currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;

	timeSpan.innerText = savedTime || currentTime;
	timeSpan.classList.add("task-time"); // Add class to identify timestamp
	timeSpan.style.color = "white";
	timeSpan.style.marginLeft = "50px";

	leftdiv.append(checkBox);
	leftdiv.append(span);

	rightdiv.append(edit);
	rightdiv.append(deleteIcon);
	rightdiv.append(timeSpan);

	taskdiv.append(leftdiv);
	taskdiv.append(rightdiv);
	let buttonsDiv = document.querySelector(".buttons");
	todoContainer.insertBefore(taskdiv, buttonsDiv);
	saveTasks();

	checkBox.addEventListener("click", () => {
		checkBox.classList.toggle("checkBoxStyle");
		taskdiv.style.borderLeft = checkBox.classList.contains("checkBoxStyle")
			? "5px solid #262162"
			: "";
	});
	clearDone.addEventListener("click", () => {
		document.querySelectorAll(".checkBoxStyle").forEach((checkBox) => {
			const taskDiv = checkBox.parentElement.parentElement; // Find the taskDiv
			if (taskDiv && todoContainer.contains(taskDiv)) {
				todoContainer.removeChild(taskDiv); // Remove the taskDiv
			}
			console.log(taskDiv);
		});
	});

	clearAll.addEventListener("click", () => {
		const taskDiv = checkBox.parentElement.parentElement;
		if (taskDiv && todoContainer.contains(taskDiv)) {
			todoContainer.removeChild(taskDiv); // Remove the taskDiv
		}
	});

	deleteIcon.addEventListener("click", () => {
		taskdiv.remove();
		saveTasks();
	});

	edit.addEventListener("click", () => {
		if (leftdiv.querySelector("input")) return;

		let input = document.createElement("input");
		input.type = "text";
		input.value = span.textContent;
		input.style.width = "100%";
		input.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
		input.style.color = "white";
		input.style.border = "none";
		input.style.outline = "none";
		input.style.padding = "5px";

		leftdiv.replaceChild(input, span);
		input.focus();
		edit.classList.replace("fa-pen-to-square", "fa-floppy-disk");

		function saveEdit() {
			span.textContent = input.value;
			leftdiv.replaceChild(span, input);
			edit.classList.replace("fa-floppy-disk", "fa-pen-to-square");
			saveTasks();
		}

		edit.addEventListener("click", saveEdit, { once: true });
	});
}

addbtn.addEventListener("click", () => {
	inputVal = input.value.trim();
	if (inputVal === "") {
		const errorDiv = document.querySelector(".error");
		errorDiv.style.display = "block";
		const closeBtn = document.querySelector(".close");
		closeBtn.addEventListener("click", () => {
			errorDiv.style.display = "none";
		});
	} else {
		input.value = "";
		setTimeout(() => {
			if (window.innerWidth > 1395) {
				inputLabel.style.transform = "translate(-160px,-36px)";
				inputLabel.style.fontSize = "16px";
			} else {
				inputLabel.style.transform = "translate(-89px,-36px)";
				inputLabel.style.fontSize = "16px";
			}
		}, 10);
		input.focus();
		addElements();
	}
});

darkmode.addEventListener("click", () => {
	darkmode.classList.toggle("lightmode");
	if (darkmode.classList.contains("lightmode")) {
		darkmode.style.background = "white";
		document.documentElement.style.setProperty("--color", "black");
		document.body.style.background = "black";
		document.querySelector(".header").style.color = "white";
		todoContainer.style.color = "white";
		inputContainer.style.color = "white";
		inputLabel.style.color = "white";
		clearDone.style.color = "white";
		clearAll.style.color = "white";
		input.style.color = "white";
	} else {
		darkmode.style.background = "black";
		document.documentElement.style.setProperty("--color", "white");
		document.body.style.background = "";
		document.querySelector(".header").style.color = "";
		todoContainer.style.color = "";
		inputContainer.style.color = "";
		inputLabel.style.color = "";
	}
});

function saveTasks() {
	let tasks = [];
	todoContainer.querySelectorAll(".newdiv").forEach(function (item) {
		let span = item.querySelector("span"); // Get the task text
		let timeSpan = item.querySelector(".task-time"); // Get the timestamp
		if (span && timeSpan) {
			tasks.push({ text: span.textContent.trim(), time: timeSpan.textContent });
		}
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
	const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	tasks.forEach((task) => addElements(task.text, task.time));
}
