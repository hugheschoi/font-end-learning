// 1. 原型链继承 prototype
function Parent1() {
  this.isShow = true
  this.info = {
      name: "yhd",
      age: 18,
  };
}
Parent1.prototype.getInfo = function() {
  console.log(this.info);
  console.log(this.isShow); // true
}

function Child1(){}

Child1.prototype = new Parent1();

// 缺点：子类 A 改了父元素的引用属性会 影响其他子类
var child11 = new Child1();
var child12 = new Child1();
child11.isShow = false;
console.log(child12.isShow); // 不影响，isShow 不是引用类型
child11.info.age = '10';
console.log(child12.info); // 影响了，变为了 { name: 'yhd', age: '10' }

// 2. 构造函数继承
function Parent2(name) {
  this.info = {
    name,
    age: 19,
  }
}
Parent2.prototype.sayName = function() {
  console.log(this.info.name);
}
function Child2(name){
  Parent2.call(this, name);
}
// 可以穿参、修改引用属性不影响其他子类，但是不能使用父类prototype 上的方法
var child21 = new Child2('June');
var child22 = new Child2('July');
child21.info.age = 10;
console.log('child22 info ', child22.info); // child22 info  { name: 'July', age: 19 }
// child22.sayName();  // TypeError: child2.sayName is not a function 不能使用父类prototype 上的方法

// 3 组合继承
function Parent3(name) {
  this.info = {
    name,
    age: 19,
  }
}
Parent3.prototype.sayName = function() {
  console.log(this.info.name);
}
function Child3(name){
  Parent3.call(this, name);
}
Child3.prototype = new Parent3();
// 组合继承融合前两种方式的优点，成为 js 最常用的继承方法
// 组合继承的缺点就是调用了两次超类型构造函数

// 有一个人提出了基于已有的对象去创建对象的方式，实现继承，这种不用构造函数继承的方式是原型式继承

function objectCopy(o) {
  function F(){};
  F.prototype = o;
  return new F();
}
var Person = {
  name: 'Nicholas',
  friends: ['Shelby', 'Court', 'Van']
}
var anotherPersion = objectCopy(Person) // 基于已有对象去创建对象，不使用构造函数继承
anotherPersion.name = 'Greg';
anotherPersion.friends.push('Rob');
console.log(anotherPersion.friends);
var yetAnotherPerson = objectCopy(Person);
console.log(yetAnotherPerson.friends);

// ES5 的 Object.create 规范化了这种原型式继承
var anotherPersion1 = Object.create(Person);
anotherPersion1.name = 'West';
console.log(anotherPersion1);

// 寄生式继承 - 与原型式继承紧密相关，即创建一个仅用于封装继承过程的函数（在内部的以某种方式增强对象，最后返回）
function createAnother(original) {
  var clone =  Object.create(Person);
  clone.sayHi = function () {
    console.log('Hi');
  }
  return clone;
}
var anotherPersion2 = createAnother(Person);
console.log(anotherPersion2)
anotherPersion2.sayHi();

// 寄生组合继承： 就是组合继承 + 寄生
function inheritPrototype(subType, superType) {
  var proto = Object.create(superType.prototype);
  proto.constructor = subType;
  subType.prototype = proto;
}
function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}
SuperType.prototype.sayName = function() {
  console.log(this.name);
}
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
inheritPrototype(SubType, SuperType);
const sub = new SubType('cai', 28);
console.log(sub);
sub.sayName();


