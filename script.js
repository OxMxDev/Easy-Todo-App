const addbtn = document.querySelector(".addbtn");
const input = document.getElementById("taskText");
const inputLabel = document.getElementById("inputLabel");
const downLine = document.getElementById("downLine");
const inputContainer = document.querySelector(".inputContainer");
const dateContainer = document.querySelector(".dateContainer");
const todoContainer = document.querySelector(".todoContainer");
let inputVal;

const date = new Date();
const options = { weekday: "long", month: "long", day: "numeric" };
const formattedDate = date.toLocaleDateString("en-US", options);

dateContainer.textContent = formattedDate;
let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();

input.addEventListener("click", (event) => {
	inputLabel.style.transform = "translate(-180px,-36px)";
	inputLabel.style.fontSize = "16px";
	event.stopPropagation();
});

document.body.addEventListener("click", () => {
	if (input.value.trim() === "") {
		inputLabel.style.transform = "";
		inputLabel.style.fontSize = "";
	} else {
		input.focus();
	}
});

function addElements() {
	let taskdiv = document.createElement("div");
	let leftdiv = document.createElement("div");
	let rightdiv = document.createElement("div");
	let checkBox = document.createElement("div");
	let span = document.createElement("span");
	let edit = document.createElement("i");
	let deleteIcon = document.createElement("i");
	let timeSpan = document.createElement("span");

	taskdiv.style.display = "flex";
	taskdiv.style.alignItems = "center";
	taskdiv.style.height = "70px";
	taskdiv.style.margin = "5px 0";
	taskdiv.style.gap = "90px";
	taskdiv.style.backgroundColor = "rgba(255, 255, 255, 0.1)";

	leftdiv.style.width = "30%";
	leftdiv.style.height = "100%";
	leftdiv.style.display = "flex";
	leftdiv.style.alignItems = "center";
	leftdiv.style.gap = "20px";

	rightdiv.style.width = "50%";
	rightdiv.style.height = "100%";
	rightdiv.style.display = "flex";
	rightdiv.style.alignItems = "center";

	checkBox.style.height = "30px";
	checkBox.style.minWidth = "30px";
	checkBox.style.margin = "0 10px";
	checkBox.style.border = "2px solid rgba(255,255,255,0.3)";
	checkBox.style.borderRadius = "50%";

	span.textContent = inputVal;
	span.style.color = "white";

	edit.classList.add("fa-solid", "fa-pen-to-square");
	edit.style.color = "white";
	edit.style.margin = "0 20px";
	edit.style.marginRight = "0";
	edit.style.fontSize = "25px";
	edit.style.cursor = "pointer";

	deleteIcon.classList.add("fa-solid", "fa-trash");
	deleteIcon.style.color = "white";
	deleteIcon.style.margin = "0 20px";
	deleteIcon.style.fontSize = "25px";
	deleteIcon.style.cursor = "pointer";

	let date2 = new Date();
	let hours = date2.getHours();
	hours = hours % 12 || 12;
	let minutes = date2.getMinutes();
	let seconds = date2.getSeconds();

	timeSpan.innerText = `${hours}:${minutes}:${seconds} ${
		hours >= 12 ? "PM" : "AM"
	}`;
	timeSpan.style.color = "white";
	timeSpan.style.marginLeft = "50px";

	leftdiv.append(checkBox);
	leftdiv.append(span);

	rightdiv.append(edit);
	rightdiv.append(deleteIcon);
	rightdiv.append(timeSpan);

	taskdiv.append(leftdiv);
	taskdiv.append(rightdiv);
	todoContainer.append(taskdiv);

	checkBox.addEventListener("click", () => {
		checkBox.style.boxShadow = "inset white 0px 0px 2px 5px";
		taskdiv.style.borderLeft = "5px solid #262162";
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
					edit.removeEventListener("click", saveEdit); 
				}

				edit.addEventListener("click", saveEdit, { once: true }); 
			});

			// ✅ Handle Deleting
			deleteIcon.addEventListener("click", () => {
				todoContainer.removeChild(taskdiv);
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
			inputLabel.style.transform = "translate(-180px,-36px)";
			inputLabel.style.fontSize = "16px";
		}, 10);
        input.focus()
		addElements();
	}
});
