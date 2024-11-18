// [1,2,3,4,5].forEach(function(x) {
//   console.log(this, x);
// });

var func = function (a, b, c) {
  console.log(this, a, b, c);
};

//no binding
// func(1, 2, 3);

// 명시적 binding
// func.call({x:1}, 4,5,6); // { x: 1 } 4 5 6
// func.apply({x:1}, [4,5,6]); // { x: 1 } 4 5 6

var obj = {
  a: 1,
  method: function (x, y) {
    console.log(this.a, x, y);
  },
};

// method 함수 안의 this는 항상 obj
// obj.method(2,3); // 1 2 3

// obj.method.call({a: 4}, 5, 6); // 4 5 6
// obj.method.apply({a: 4}, [5, 6]); // 4 5 6

var obj2 = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};

var arr = Array.from(obj2);

// console.log(arr); // [ 'a', 'b', 'c' ]

function Person(name, gender) {
  this.name = name;
  this.gender = gender;
}

function Student(name, gender, school) {
  Person.call(this, name, gender);
  this.school = school;
}
// function Student(name, gender, school){
//   this.name = name;
//   this.gender = gender;
//   this.school = school;
// };

function Employee(name, gender, company) {
  Person.call(this, name, gender);
  this.company = company;
}
// function Employee(name, gender, company){
//   this.name = name;
//   this.gender = gender;
//   this.company = company;
// };

var kd = new Student("길동", "male", "서울대");
var ks = new Employee("길순", "femail", "삼성");

var numbers = [10, 20, 3, 16, 45];
var max = (min = numbers[0]);
numbers.forEach(function (number) {
  // 현재 돌아가는 숫자가 max보다 큰 경우
  if (number > max) {
    max = number;
  }

  // ~
  if (number < min) {
    min = number;
  }
});

// console.log(max,min); // 45, 3

var max2 = Math.max.apply(null, numbers);
var min2 = Math.min.apply(null, numbers);

// console.log("apply => ", max2, min2) // apply =>  45 3

var max3 = Math.max(...numbers);
var min3 = Math.min(...numbers);

// console.log("spread => ", max3, min3) // spread =>  45 3

// bind 메서드
// this를 바인딩 하는 메서드
// call, apply와는 다르게 즉시 호출하지 않음
// 목적
// 1. 함수에 this를 '미리' 적용
// 2. 부분 적용 함수

var funcA = function (a, b, c, d) {
  console.log(this, a, b, c, d);
};
// funcA(1, 2, 3, 4); // global 1 2 3 4

// 함수에 this를 미리 적용
var bindFuncA = funcA.bind({ x: 1 });
// bindFuncA(5, 6, 7, 8); // { x: 1 } 5 6 7 8

// 부분 적용 함수
var bindFuncA2 = funcA.bind({ x: 1 }, 4, 5);
// bindFuncA2(10, 11); // { x: 1 } 4 5 10 11

// console.log(funcA.name); // funcA
// console.log(bindFuncA.name); // bound funcA
// console.log(bindFuncA2.name); // bound funcA

// name 프로퍼티
// bind - 'bound'라는 접두어

//