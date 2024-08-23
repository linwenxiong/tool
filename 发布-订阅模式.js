var salesOffices = {};
salesOffices.clientList = {}; // 定义缓存列表，存放订阅者的回调函数；
salesOffices.listen = function(key, fn) { 
  if (!this.clientList[key]) { // 如果还没有定阅过此类消息，给该类消息创建一个缓存列表；
    this.clientList[key] = [];
  }
  this.clientList[key].push(fn); // 订阅消息添加进缓存列表
};
salesOffices.trigger = function() { // 发布消息
    var key = Array.prototype.shift.call(arguments), // 取出消息类型
        fns = this.clientList[key]; // 取出该消息对应的回调函数集合
    if (!fns || fns.length === 0) { // 如果没有订阅该消息，则返回；
        return false;
    }
    for (var i = 0, fn; fn = fns[i++];) {
        fn.apply(this, arguments); // arguments是发布消息时带上的参数
    }
};



salesOffices.listen('squareMeter88', function(price) { // 订阅
    console.log('价格=' + price);
});


salesOffices.listen('squareMeter110', function(price) {  // 订阅
    console.log('价格110=' + price);
});

salesOffices.trigger('squareMeter88', 2000000); // 发布
salesOffices.trigger('squareMeter110', 3000000); // 发布



// ------------------------------发布-订阅模式的通用实现；
var event =  {
    clientList: {},
    listen: function(key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn); // 订阅消息添加进缓存列表
    },
    trigger: function() {
        var key = Array.prototype.shift.call(arguments), // 取出消息类型
            fns = this.clientList[key]; // 取出该消息对应的回调函数集合
        if (!fns || fns.length === 0) { // 如果没有订阅该消息，则返回；
            return false;
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments); // arguments是发布消息时带上的参数
        }
    }
};

var installEvent = function(obj) { // 定义installEvent函数，这个函数可以给所有对象都动态安装发布-订阅功能；
    for (var i in event) {
        obj[i] = event[i];
    }
}

var salesOffices = {};
installEvent(salesOffices);
salesOffices.listen('squareMeter88', function(price) { // 订阅
    console.log('价格=' + price);
});
salesOffices.listen('squareMeter110', function(price) {  // 订阅
    console.log('价格110=' + price);
});

salesOffices.trigger('squareMeter88', 2000000); // 发布
salesOffices.trigger('squareMeter110', 3000000); // 发布


// ----------------------------------- 取消订阅
event.remove = function(key, fn) {
    var fns = this.clientList[key];
    if (!fns) { // 如果key对应的消息没有被人订阅，则直接返回；
        return false;
    }
    if (!fn) { // 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅；
        fns && (fns.length = 0);
    } else {
        for (var l =fns.length - 1; l >= 0; l--) {
            var _fn = fns[l];
            if (_fn === fn) {
                fns.splice(l, 1); // 删除订阅者的回调函数
            }
        }
    }
}

var salesOffices = {};
var installEvent = function(obj) { // 定义installEvent函数，这个函数可以给所有对象都动态安装发布-订阅功能；
    for (var i in event) {
        obj[i] = event[i];
    }
}

installEvent(salesOffices);
salesOffices.listen('squareMeter88', fn1 = function(price) { // 订阅
    console.log('价格=' + price);
});
salesOffices.remove('squareMeter88', fn1); // 取消订阅
salesOffices.trigger('squareMeter88', 2000000);  // 取消订阅之后发布者发布消息，订阅者就不会收到消息了；
// -----------------------------------------------------------------------------------------------------------------------

// 发布订阅模式的作用
// 1.解耦      ：通过引入中间层（事件中心或消息总线），使得发布者和订阅者之间不需要直接引用对方。这种解耦有助于提高系统的可维护性和灵活性。
// 2.易于扩展   ：新增发布者或订阅者不会影响现有的系统结构。
// 3.灵活性     ：订阅者可以在运行时动态添加或移除自己定义的方法，这种灵活性使得后续需求变更的时候，可以快速调整代码逻辑。