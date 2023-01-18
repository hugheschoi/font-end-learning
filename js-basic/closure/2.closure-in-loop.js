// 在 let 出现之前，在循环中中创建闭包，会有出现这样的问题
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help);
    }
  }
}

setupHelp();
// 运行这段代码后，您会发现它没有达到想要的效果。无论焦点在哪个 input 上，显示的都是关于年龄的信息。
// 原因是 在focus 触发回调函数调用之前，回调函数的词法环境中，item.help 已经变为了最后一条age的数据了。

// 解决方法
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

// 按值传递保证了词法作用域中的 help 正确性，最后加了一层闭包（捆绑词法作用域，从外部函数返回）
function makeHelpCallback(help) {
  return function() { // return 
    showHelp(help); 
  };
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = makeHelpCallback(item.help); // 此时会按值传递
  }
}

setupHelp();

// 另一种方法使用了匿名闭包，马上把当前循环项的 item 与事件回调相关联起来
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    (function() {
       var item = helpText[i];
       document.getElementById(item.id).onfocus = function() {
         showHelp(item.help);
       }
    })(); // 马上把当前循环项的 item 与事件回调相关联起来
  }
}

// setupHelp();

// 最后用 const 、let代替 var，因为使用 const 而不是 var，因此每个闭包都绑定了块作用域的变量，这意味着不再需要额外的闭包。