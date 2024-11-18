// 콜백지옥
// setTimeout(
//   function (name) {
//     var coffeeList = name;
//     console.log(coffeeList);
//     setTimeout(
//       function (name) {
//         coffeeList += ", " + name;
//         console.log(coffeeList);

//         setTimeout(
//           function (name) {
//             coffeeList += ", " + name;
//             console.log(coffeeList);

//             setTimeout(
//               function (name) {
//                 coffeeList += ", " + name;
//                 console.log(coffeeList);
//               },
//               500,
//               "카페라떼"
//             );
//           },
//           500,
//           "카페모카"
//         );
//       },
//       500,
//       "아메리카노"
//     );
//   },
//   500,
//   "에스프레소"
// );

// 나름의 정리
// var coffeeList = "";

// var addEspresso = function (name) {
//   coffeeList = name;
//   console.log(coffeeList);
//   setTimeout(addAmericano, 500, "아메리카노");
// };

// var addAmericano = function (name) {
//   coffeeList += ", " + name;
//   console.log(coffeeList);
//   setTimeout(addMocha, 500, "카페모카");
// };

// var addMocha = function (name) {
//   coffeeList += ", " + name;
//   console.log(coffeeList);
//   setTimeout(addLatte, 500, "카페라떼");
// };

// var addLatte = function (name) {
//   coffeeList += ", " + name;
//   console.log(coffeeList);
// };

// setTimeout(addEspresso, 500, "에스프레소");

// 동기적 표현 1 Promise 1
// new Promise(function (resolve) {
//   setTimeout(function () {
//     var name = "에스프레소";
//     console.log(name);
//     resolve(name);
//   }, 500);
// })
//   .then(function (prevName) {
//     return new Promise(function (resolve) {
//       setTimeout(function () {
//         var name = prevName + ", 아메리카노";
//         console.log(name);
//         resolve(name);
//       }, 500);
//     });
//   })
//   .then(function (prevName) {
//     return new Promise(function (resolve) {
//       setTimeout(function () {
//         var name = prevName + ", 카페모카";
//         console.log(name);
//         resolve(name);
//       }, 500);
//     });
//   })
//   .then(function (prevName) {
//     return new Promise(function (resolve) {
//       setTimeout(function () {
//         var name = prevName + ", 카페라떼";
//         console.log(name);
//         resolve(name);
//       }, 500);
//     });
//   });

// 동기적 표현 2 Promise 2
// var addCoffee = function (name) {
//   return function (prevName) {
//     return new Promise(function (resolve) {
//       setTimeout(function () {
//         var newName = prevName ? prevName + ", " + name : name;
//         console.log(newName);
//         resolve(newName);
//       }, 500);
//     });
//   };
// };

// addCoffee("에스프레소")()
//   .then(addCoffee("아메리카노"))
//   .then(addCoffee("카페모카"))
//   .then(addCoffee("카페라떼"));

// 동기적 표현 3  Generator
// var addCoffee = function (prevName, name) {
//   setTimeout(function () {
//     coffeeMaker.next(prevName ? prevName + ", " + name : name);
//   }, 500);
// };
// var coffeeGenerator = function* () {
//   var espresso = yield addCoffee("", "에스프레소");
//   console.log(espresso);
//   var americano = yield addCoffee(espresso, "아메리카노");
//   console.log(americano);
//   var mocha = yield addCoffee(americano, "카페모카");
//   console.log(mocha);
//   var latte = yield addCoffee(mocha, "카페라떼");
//   console.log(latte);
// };
// var coffeeMaker = coffeeGenerator();
// coffeeMaker.next();

// 동기적 표현 4  Promise + Async/await

var addCoffee = function (name) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(name);
    }, 500);
  });
};
var coffeeMaker = async function () {
  var coffeeList = "";
  var _addCoffee = async function (name) {
    coffeeList += (coffeeList ? ", " : "") + (await addCoffee(name));
  };
  await _addCoffee("에스프레소");
  console.log(coffeeList);
  await _addCoffee("아메리카노");
  console.log(coffeeList);
  await _addCoffee("카페모카");
  console.log(coffeeList);
  await _addCoffee("카페라떼");
  console.log(coffeeList);
};
coffeeMaker();
