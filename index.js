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

