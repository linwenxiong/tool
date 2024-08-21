
// --------------------------迭代器模式
var each = function(ary, callback){  // 实现自己的一个迭代器
    for(var i = 0, l = ary.length; i < l; i++) {
        callback.call(ary[i], i, ary[i])
    }
}
each([1,2,3], function(i, n){
    console.log(i, n)
})
// ---------------------------------






// ---------------------内部迭代器--------------
var compare = function(ary1, ary2) {
    if(ary1.length !== ary2.length) {
        throw new Error('ary1和ary2的长度不一致')
    }
    each(ary1, function(i, n){
        if(n !== ary2[i]) {
            throw new Error('ary1和ary2不相等')
        }
    })
    console.log('ary1和ary2相等')
}
compare([1,2,3], [1,2,3])
// ---------------------------------



// ---------------------外部迭代器--------------
var Iterator = function(obj){
    var current = 0;
    var next = function(){
        current += 1;
    }
    var getLength = function(){
        return obj.length;
    }
    var isDone = function(){
        return current >= obj.length;
    }
    var getCurrItem = function(){
        return obj[current]
    }
    return {
        getLength: getLength,
        next: next,
        isDone: isDone,
        getCurrItem: getCurrItem
    }
}
var compare = function(iterator1, iterator2){
    if( iterator1.getLength() !== iterator2.getLength() ) {
        throw new Error('iterator1和iterator2的长度不一致')
    }
    while(!iterator1.isDone() && !iterator2.isDone()){
        if(iterator1.getCurrItem() !== iterator2.getCurrItem()){
            throw new Error('iterator1和iterator2不相等')
        }
        iterator1.next()
        iterator2.next()
    }
    alert('相等')
}
var iterator1 = Iterator([1,2,2,3])
var iterator2 = Iterator([1,2,3])
compare(iterator1, iterator2)

// ---------------------------------


// --------------------倒序迭代器-----------------
var reverseEach = function(ary, callback){
    for(var i = ary.length - 1; i >= 0; i--) {
        callback.call(ary[i], i, ary[i])
    }
}
reverseEach([9,2,34], function(i, n ) {
    console.log(i, n)
})

// ---------------------------------


// ------------------------迭代器的应用举例
var getActiveUploadObj = function() {
    try {
       return new ActiveXObject('TXFTNActiveX.FTNUpload') 
    }
    catch(e){
        return false;
    }
}
var getFlashUploadObj = function() {
    if(supportFlash()) { //supportFlash未提供
        // ... 逻辑代码
    }
    return false
}
var getFormUploadObj = function() {
    var str = '<input name="upload" type="file" class="file" />'
    return str
}


var iteratorUploadObj = function() {// 开始迭代上传对象
    for(var i = 0, fn; fn = arguments[i++];) {
        var uploadObj = fn();
        if( uploadObj !== false) {
            return uploadObj
        }
    }
}
var uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUploadObj)
// ---------------------------------