// 时间戳转换
function myFormatDate(dd) {
    var now = new Date(dd);
    var year = now.getFullYear();
    var month = zero(now.getMonth() + 1);
    var date = zero(now.getDate());
    var hour = zero(now.getHours());
    var minute = zero(now.getMinutes());
    var second = zero(now.getSeconds());
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
//数值补零（<10补零且不小于0）
function zero(n) {
	if (n >= 0) {
		return n < 10 ? '0' + n : n;
	} else {
		return n;
	}
}

export default {
    myFormatDate,
}