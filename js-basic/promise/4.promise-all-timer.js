// `delay`毫秒后执行resolve
function timerPromisefy(delay) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(delay);
    }, delay);
  });
}
var startDate = Date.now();
// 所有promise变为resolve后程序退出
Promise.all([
  timerPromisefy(1),
  timerPromisefy(32),
  timerPromisefy(64),
  timerPromisefy(128),
]).then(function (values) {
  console.log(Date.now() - startDate + "ms");
  // 約128ms
  console.log(values); // [1,32,64,128]
});
// 这个promise对象数组中所有promise都变为resolve状态的话，至少需要128ms。实际我们计算一下Promise.all 的执行时间的话，它确实是消耗了128ms的时间。
// 从上述结果可以看出，传递给 Promise.all 的promise并不是一个个的顺序执行的，而是同时开始、并行执行的。