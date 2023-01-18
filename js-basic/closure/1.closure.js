function init() {
  var name = "Mozilla"; // name 是一个被 init 创建的局部变量
  function displayName() { // displayName() 是内部函数，一个闭包
      console.log(name); // 使用了父函数中声明的变量
  }
  displayName();
}
// init();

function makeFunc(name) {
  function displayName() {
      console.log(name);
  }
  return displayName;
}

var myFunc = makeFunc('Mozilla');
// myFunc();

function makeAdd(x) {
  return function(y) {
    return x + y
  }
}
var add5 = makeAdd(5);
console.log(add5(5));


