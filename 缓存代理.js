function apiGetData(parms) {
    return new Promise((resolve, reject) => {
        console.log('发起请求了', parms)
        setTimeout(() => {
            var data = {
                prams: parms,
                code: 200,
                data: {
                    list: [{
                        name: 'lin'
                    }, {
                        name: 'wen'
                    }]
                }
            }
            resolve(data)
        }, 1000)
    })
}

class ProxyMult {
    constructor() {
        this.cache = {}
    }
    setCache(fn, parms) {
        // var args = Array.prototype.join.call(arguments, ',')
        var args = fn.name + JSON.stringify(parms)
        if (args in this.cache) {
            return this.cache[args]
        }
        return this.cache[args] = fn.apply(this, [parms])
    }
    getData() {
        console.log(this.cache);
    }
}

var cache = new ProxyMult()

async function clickHandle(index) {
    const res = await cache.setCache(apiGetData, { id: index })
    console.log(res, '获取到的数据')
}

