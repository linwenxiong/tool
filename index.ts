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


// ------------写成class形式
class ProxySynchronousFile {
    private cache: Number[]
    private timer: any
    constructor() {
        this.cache = []
    }
    synchronousFile(id) {
        console.log('开始同步发文件，id为：'+id)
    }
    setTimer(id) {
        this.cache.push(id)
        if(this.timer) {
            return
        }
        this.timer = setTimeout(()=>{
            this.synchronousFile(this.cache.join(','));
            clearTimeout(this.timer)
            this.timer = null
            this.cache.length = 0
        }, 2000)
    }
}

var instance = new ProxySynchronousFile()
for(let i = 0;i<10;i++) {
    instance.setTimer(i)
}


