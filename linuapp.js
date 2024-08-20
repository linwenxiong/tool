export function linNavigate() {
	uni.navigateTo({
		url: '/pages/xxx/xxx',
		events: {
		  someEvent: function(data) {
			  console.log(data)
			}
		},
		success(res) {
			res.eventChannel.emit('getIndex',{name:'张三'})
		}
	})
}

onLoad(()=>{
    // const eventChannel = this.getOpenerEventChannel(); vue2 的获取方式
    const instance = getCurrentInstance().proxy
    const eventChannel = instance.getOpenerEventChannel();
    eventChannel?.on('getIndex', (idx) => {
        console.log('idx',idx);
    })
    setTimeout(()=>{
        eventChannel.emit('someEvent', {data: 'data from test page for someEvent'});
    },1000)
})