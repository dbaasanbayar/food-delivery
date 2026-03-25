const todoList = [{
    name : 'make dinner',
    dueDate: '2022-12-22'
}, {
    name : 'make dinner',
    dueDate: '2022-12-22'
}];

renderTodoList();

function renderTodoList() {

let todoListHTML = ``;

for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const {name, dueDate} =todoObject;
    const html = `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button onclick="
        todoList.splice(${i}, 1);
        renderTodoList();"
        class="delete-todo-button">Delete</button> <p/>`
    todoListHTML += html;
}
document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

function addTodo() {
const inputElement = document.querySelector('.js-name-input');

const name = inputElement.value;

const dateInputElement = document.querySelector('.js-due-date-input');

const dueDate = dateInputElement.value;

todoList.push({
    // name: name,
    // dueDate: dueDate
    name,
    dueDate
});
console.log(todoList);
inputElement.value = '';
renderTodoList();
}; 




//   let randomNumber = 0;

// while (randomNumber < 0.5) {
//   randomNumber = Math.random()
// }
// console.log(randomNumber);

// for (let i = 1; i <= 5; i++) {  
//     console.log(i);
// };

// const todoList = [
//     'make dinner',
//     'wash dishes',
//     'watch youtube'
// ];

// for (let i = 0; i <= todoList.length - 1; i++) {
//     const value = todoList[i]
//     console.log(value[1]);
// } 

// const nums = [1, 1, 3];
// let total = 0;

// // for (let i = 0; i < nums.length; i++) {
// //    const num = nums[i]
// //    total += num;
// // }
// // console.log(total);

// const numsDoubled = [];

// for (let i = 0; i < nums.length; i++) {
//     const num = nums[i];
//     numsDoubled.push(num * 2);
// }
// console.log(numsDoubled)