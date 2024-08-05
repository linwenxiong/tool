// 虚拟代理合并http请求
var synchronousFile = function(id){
    console.log('开始同步发文件，id为：'+id)
}
var proxySynchronousFile = (function(){
    var cache:Number[], 
    timer;
    return function(id:Number) {
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