/**
 * 全局定义的指令
 */

/**
 * [setValueWithExpressionVue 更新数据模型]
 * @param {Boolean} toString    [是否转化为字符串]
 * @param {[type]}  currObj    [当前的数据模型]
 * @param {[type]}  expression [指令表达式]
 * @param {[type]}  value      [指令的值]
 * @param {[type]}  key        [用于批量渲染时的跟踪键]
 * @param {[type]}  arg        [指令的参数]
 */
function setValueWithExpressionVue (option) {
 let expression = option.expression.split('.')
 expression.forEach(function (item, i) {
  if (i < expression.length - 1) {
   option.currObj = option.currObj[item]
  } else {
    if(option.key !== undefined){
    	let args = option.arg.split('-')
    	let _curObj = option.currObj[item][option.key]
    	args.forEach(function(arg,j){
    		if(j < args.length-1){
    			_curObj = _curObj[arg]
    		}else{
    			_curObj[arg] = (option.value === "" || option.toString) ? option.value : option.value*1
    		}
    	})
    }else{
      option.currObj[item] = (option.value === "" || option.toString) ? option.value : option.value*1
    }
  }
 })
}
/**
 * [handleInput 在输入阶段的处理逻辑]
 * @param  {[DOM]} ele   [当前指令操作的dom对象]
 * @param  {[虚拟节点]} vnode [当前指令渲染的虚拟节点]
 * @param  {[指令信息]} rel   [当前指令的所有指令信息]
 * @param  {[校验类型]} type  [输入阶段的校验类型]
 *      "number": 仅支持输入数字
 *      "float": 仅支持数字和小数点
 */
function handleInput(ele,vnode,rel){
  let rule;
  switch(true) {
    case rel.modifiers.float: // 浮点型
      rule = /[^\d\.]/g; break;
    default: //默认仅支持输入数字
      rule = /\D/g;
  }
  let val = ele.value.replace(rule,"");
  let maxLen = vnode.data.attrs && vnode.data.attrs['max-len'] ? vnode.data.attrs['max-len'] :0;
  if(maxLen>0){val = val.substr(0,maxLen)}
  setValueWithExpressionVue({
    currObj:vnode.context.$data,
    expression:rel.expression,
    value:val,
    key:vnode.key !== undefined ? vnode.key : vnode.data.attrs['index'],
    arg:rel.arg,
    toString:rel.modifiers.string || rel.modifiers.float
  })
}

export default {
  // 只能输入整数
	onlyNum (el,binding,vnode) {
    let ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
    ele.oninput = function() {
      //获取相关的指令配置信息
      let rel = vnode.data.directives.filter(item =>{
        return item.name === "only-num"
      })[0]
      vnode.context.$nextTick(()=>{
        handleInput(ele,vnode,rel)
      })
    }
  },
  //自动聚焦
  focus:{
    inserted (el) {
      let ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
      ele.focus()
    }
  }
}
