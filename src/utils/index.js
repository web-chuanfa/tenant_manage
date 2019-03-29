export default {
  // cookie 相关
  setCookie (cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + '; ' + expires
  },
  getCookie (cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1)
      if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
    }
    return ''
  },
  clearCookie (name) {
    this.setCookie(name, '', -1)
  },
  checkCookie () {
    var user = this.getCookie('username')
    if (user !== '') {
      alert('Welcome again ' + user)
    } else {
      user = prompt('Please enter your name:', '')
      if (user !== '' && user != null) {
        this.setCookie('username', user, 365)
      }
    }
  },

  // 数据类型判断
  isInteger (val) { // 正负整数和0
  	var rule = /^-*(0|[1-9][0-9]*)$/
  	return rule.test(val)
  },
  isNatural (val) { //自然数
  	var rule = /^(0|[1-9][0-9]*)$/
  	return rule.test(val)
  },
  isPosInt (val) { //正整数
  	var rule = /^[1-9][0-9]*$/
  	return rule.test(val)
  },
  expactEmptyStr (val) {
  	return val.length === 0 || this.isNatural(val)
  },
  isFload (val) {
  	var rule = /^(0|[1-9][0-9]*)\.[0-9]*$/
  	return rule.test(val.toString())
  },
  isOnlyNum (val) {
  	var rule = /^\d*$/
  	return rule.test(val)
  },

  // 数据格式化
  formatNum (num){
    return num*1 < 10 ? "0"+num : num
  },


  // 日期时间相关
  /**
   * [dateToString 把日起对象转化为字符串]
   * @param  {[date]}   date [日期对象]
   * @param  {[string]} type [要转化的类型]
   *    type枚举值如下：
   *      'yyyy-MM-dd': 转化为年月日
   *      'yyyy-MM-dd HH:mm:ss' 转化为年月日时分秒
   *      'yyyy-MM-dd HH:mm' 精确到分  【默认】
   * @param  {[string]} type [分隔符] 【默认-】
   * @return {[string]}      [返回转化后的字符串]
   */
  dateToString (date,type,split) {
    if(date === null || date === undefined || date === '') {
      return ""
    }
    split = split || '-';
    type = type || 'yyyy-MM-dd HH:mm';
    let year = date.getFullYear();
    let month = this.formatNum(date.getMonth()*1+1)
    let _date = this.formatNum(date.getDate());
    let hour = this.formatNum(date.getHours());
    let minutes = this.formatNum(date.getMinutes());
    let seconds = this.formatNum(date.getSeconds());
    if(type === 'yyyy-MM-dd'){
      return [year,month,_date].join(split)
    }else if(type === 'yyyy-MM-dd HH:mm:ss'){
      return [year,month,_date].join(split)+" "+[hour,minutes,seconds].join(":")
    }
    return [year,month,_date].join(split)+" "+[hour,minutes].join(":")
  }

}
