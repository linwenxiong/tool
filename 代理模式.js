// 虚拟代理合并http请求
var synchronousFile = function(id){
    console.log('开始同步发文件，id为：'+id)
}
var proxySynchronousFile = (function(){
    var cache = [],
    timer;
    return function(id) {
        cache.push(id)
        if(timer) {
            return
        }
        timer = setTimeout(()=>{
            synchronousFile(cache.join(','));
            clearTimeout(timer)
            timer = null
            cache.length = 0
        }, 2000)
    }
})();

for(let i=0; i<10; i++){
    proxySynchronousFile(i)
}


// --------------------缓存代理
var mult = function() {
    console.log('开始计算乘积',arguments)
    var a = 1;
    for(var i=0, l = arguments.length; i < l; i++) {
        a = a* arguments[i]
    }
    return a
}

// 现在加入缓存代理函数
var proxyMult = (function(){
    var cache  ={}
    return function() {
        var args =  Array.prototype.join.call(arguments, ',')
        if(args in cache) {
            return cache[args]
        }
        return cache[args] = mult.apply(this, arguments)
    } 
})();
// ---------------------------------
// 代理的作用
// 1. 代理可以缓存真实对象的结果，避免重复计算或读取数据。这对于频繁访问且结果不变的情况特别有用。
// 控制访问：

// 代理对象可以限制对真实对象的访问，例如在访问前进行权限验证。
// 代理可以作为真实对象的安全屏障，防止非法访问。
// 远程代理：

// 代理可以代表远程的对象，例如网络上的服务。
// 它可以处理与远程对象通信的细节，比如网络通信、序列化等。
// 虚拟代理：

// 代理可以用来表示开销很大的对象，例如大图像或复杂对象。
// 代理对象在真正需要的时候才加载真实对象，从而节省内存和提高性能。
// 缓存代理：

// 代理可以缓存真实对象的结果，避免重复计算或读取数据。
// 这对于频繁访问且结果不变的情况特别有用。
// 职责分离：

// 真实角色实现实际的业务逻辑，而代理负责其他职责，如日志记录、性能监控等。
// 这样可以使真实对象的代码更加简洁和专注。
// 高扩展性：

// 代理模式可以很容易地扩展功能，而不影响原有对象的行为。
// 通过添加新的代理层，可以轻松地增加新的功能或修改现有功能。
// 中介作用：

// 代理对象可以在客户端和目标对象之间起到中介的作用，保护目标对象。
// 这样可以更好地控制客户端如何与目标对象交互。
// 简化接口：

// 代理可以提供一个与真实对象相同的接口，但实现可能不同。
// 这使得客户端可以透明地使用代理对象，而不知道背后的真实实现。
// 综上所述，代理模式可以增强系统的灵活性、安全性、性能，并降低系统的耦合度。在JavaScript开发中，代理模式同样适用，可以用来实现诸如延迟加载、远程调用等功能。