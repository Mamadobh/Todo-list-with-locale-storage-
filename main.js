let add_btn = document.querySelector("#sbmt");
let add_todo = document.querySelector("#newTask");
let alert_element = document.querySelector("#alert");
let list_todo = document.querySelector(".listTodo");
add_todo.focus();
// localStorage.clear();
// let all_item = { ...localStorage };
// let all_key = Object.keys(localStorage);
// console.log(all_key);

// let re =
// 	'0:';
// function filtring_key(ch) {
// 	tab_ch=ch.split(",");
// 	let ch1 = tab_ch[(tab_ch.length)-1];
// 	let ab = ch1
// 		.split("")
// 		.filter(function (ele) {
// 			return !isNaN(parseInt(ele));
// 		})
// 		.join("");
// 	return ab;
// }
// // filtring_key(re);

// let storage_items = { ...localStorage };
//  console.log(storage_items);
//  console.log(JSON.stringify(storage_items).substring(1).split(':"<'));
// let all_key = JSON.stringify(storage_items)
// 	.substring(1)
// 	.split(':"<')

// 	.map(function (ele,index) {
// 		console.log(`element ${index}`)
// 		console.log(ele);

// 		return filtring_key(ele);
// 	});
//  all_key.pop();
// let all_key=Object.keys(localStorage);
// all_key.sort(function(a, b){return a-b});
// console.log("this keys ");
// console.log(all_key);

if (JSON.parse(localStorage.getItem("all_todo"))) {
	let all_items = JSON.parse(localStorage.getItem("all_todo"));
	for (let i = 0; i < all_items.length; i++) {
		let todoElement = document.createElement("div");
		todoElement.className = "todo";
		todoElement.innerHTML = all_items[i];

		list_todo.appendChild(todoElement);

		let edit_btn_lcl = todoElement.firstElementChild.nextElementSibling;

		let input_task = todoElement.firstElementChild;

		edit_btn_lcl.addEventListener("click", (e) => {
			if (
				edit_btn_lcl.nextElementSibling.innerHTML ===
				'<i class="fa-regular fa-pen-to-square edit"></i>'
			) {
				edit_btn_lcl.nextElementSibling.innerHTML =
					'<i class="fa-solid fa-check edit save"></i>';
				input_task.removeAttribute("readonly");
				input_task.focus();
				edit_btn_lcl.nextElementSibling.firstElementChild.onmouseover =
					function () {
						input_task.style.color = "#63c75feb";
					};
				edit_btn_lcl.nextElementSibling.firstElementChild.onmouseout =
					function () {
						input_task.style.color = "#e45656eb";
					};
				input_task.style.color = "#e45656eb";
			} else {
				edit_btn_lcl.nextElementSibling.innerHTML =
					'<i class="fa-regular fa-pen-to-square edit"></i>';
				input_task.style.cssText = "color: #fff !important;";
				input_task.setAttribute("value", input_task.value);

				input_task.setAttribute("readonly", "readonly");
				all_items[i] = todoElement.innerHTML;
				window.localStorage.setItem("all_todo", JSON.stringify(all_items));
			}
		});

		let delete_btn_lcl = todoElement.lastElementChild.previousElementSibling;

		delete_btn_lcl.addEventListener("click", (e) => {
			delete_btn_lcl.parentElement.remove();
			all_items.splice(i, 1);
			window.localStorage.setItem("all_todo", JSON.stringify(all_items));
		});
	}
}

add_btn.addEventListener("click", (e) => {
	if (add_todo.value === "") {
		e.preventDefault();
		add_todo.focus();
		let i = 6;
		function set_alert() {
			alert_element.classList.toggle("displayed");
			i = i - 1;
			console.log(i);
			if (i === 0) {
				clearInterval(counter);
			}
		}

		let counter = setInterval(set_alert, 700);
	} else {
		alert_element.classList.remove("displayed");
		let x = localStorage.length;
		let todo_element = document.createElement("div");
		todo_element.className = "todo";
		let input_todo = document.createElement("input");
		input_todo.type = "text";
		input_todo.setAttribute("readonly", "readonly");
		let edit_btn = document.createElement("button");
		edit_btn.className = "edt";
		let lis_ele = document.querySelectorAll(".todo");
		s = lis_ele.length;

		edit_btn.id = `edt${s}`;
		let edit_label = document.createElement("label");
		edit_label.setAttribute("for", `edt${s}`);
		let edit_icn = document.createElement("i");
		edit_icn.className = "fa-regular fa-pen-to-square";
		edit_icn.classList.add("edit");
		let delete_btn = document.createElement("button");
		delete_btn.className = "dlt";
		delete_btn.id = `dlt${s}`;
		let delete_label = document.createElement("label");
		delete_label.setAttribute("for", `dlt${s}`);
		let delete_icn = document.createElement("i");
		delete_icn.className = "fa-regular fa-trash-can";
		delete_icn.classList.add("delete");
		todo_element.appendChild(input_todo);
		todo_element.appendChild(edit_btn);
		todo_element.appendChild(edit_label);
		edit_label.appendChild(edit_icn);
		todo_element.appendChild(delete_btn);
		delete_label.appendChild(delete_icn);
		todo_element.appendChild(delete_label);

		input_todo.setAttribute("value", add_todo.value);
		let dynamic_element = todo_element.innerHTML;
		items = JSON.parse(localStorage.getItem("all_todo"));
		if (items == null) {
			items = [];
		}
		items.push(dynamic_element);
		window.localStorage.setItem("all_todo", JSON.stringify(items));
		add_todo.value = "";
		add_todo.focus();
	}
});

