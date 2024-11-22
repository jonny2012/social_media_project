// 1. Сумма товаров в корзине
// Задача:
// Напишите функцию, которая принимает массив объектов, представляющих корзину покупок, и возвращает общую стоимость товаров.
// Пример входных данных:
// javascript

// const cart = [
//     { name: "Laptop", price: 1000, quantity: 2 },
//     { name: "Phone", price: 500, quantity: 4 },
//     { name: "Tablet", price: 300, quantity: 3 }
// ];

// Ожидаемый результат:
// javascript

// totalCost(cart); // 4300
// 6. Подсчёт повторяющихся элементов
// Задача:
// Напишите функцию, которая принимает массив строк и возвращает объект, где ключами являются строки, а значениями — количество их повторений.
// Пример входных данных:
// javascript

// const words = ["apple", "banana", "apple", "orange", "banana", "apple"];

// Ожидаемый результат:

// countOccurrences(words);
// {
//     apple: 3,
//     banana: 2,
//     orange: 1
// }

// Задача:
// Создайте функцию, которая принимает массив пользователей и минимальный возраст,
// а возвращает массив имён пользователей, которые старше или равны указанному возрасту.
// Пример входных данных:

// const users = [
//     { name: "Alice", age: 25 },
//     { name: "Bob", age: 17 },
//     { name: "Charlie", age: 30 },
//     { name: "David", age: 20 }
// ];

// Ожидаемый результат:

// filterUsersByAge(users, 21); // ["Alice", "Charlie"]
// const users = [
//   { name: "Alice", age: 25 },
//   { name: "Bob", age: 17 },
//   { name: "Charlie", age: 30 },
//   { name: "David", age: 20 },
// ];
// const biggerThanMinAge = (array, minAge) => {
//   const bigger = [];

//   for (let user of array) {
//     if (user.age >= minAge) bigger.push(user.name);
//   }
//   return bigger;
// };
// console.log(biggerThanMinAge(users, 30));

// Задача:
// Напишите функцию, которая принимает массив объектов и группирует их по значению определённого свойства.
// Пример входных данных:

const items = [
  { name: "Apple", type: "Fruit" },
  { name: "Carrot", type: "Vegetable" },
  { name: "Banana", type: "Fruit" },
  { name: "Broccoli", type: "Vegetable" },
];

// Ожидаемый результат:

// groupBy(items, "type");
// {
//     Fruit: [
//         { name: "Apple", type: "Fruit" },
//         { name: "Banana", type: "Fruit" }
//     ],
//     Vegetable: [
//         { name: "Carrot", type: "Vegetable" },
//         { name: "Broccoli", type: "Vegetable" }
//     ]
// }

const result = Object.groupBy(items, ({ type }) => type);

console.log(result);
