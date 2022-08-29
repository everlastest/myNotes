/** instanceof */
// 判断target实例是否在第二个参数的原型链上
const myInstanceof = (target,Fn) => {
    let proto = target.__proto__
    let prototype = Fn.prototype
    while(proto!==prototype&&proto!==null){
        proto = proto.__proto__
    }
    return proto!==null ? true : false
}
/** Array.map */ 
// 关键点就是创建一个新数组，然后for循环遍历让每个元素都执行函数，最后返回
Array.prototype._map = function(fn) {
    if(typeof fn !== 'function') return
    const newArr = []
    for(let i=0; i < this.length; i++){
        newArr[i] = fn(this[i])
    }
    return newArr
}
/** Array.filter */
Array.prototype._filter = function(fn) {
    if(typeof fn !== 'function') return 
    const newArr = []
    for(let i=0; i<this.length; i++){
        if(fn(this[i])){
            newArr.push[this[i]]
        }
    }
    return newArr
}
/** Array.reduce */
Array.prototype._reduce = function(fn) {
    if(typeof fn !== 'function') return 
    if(this.length===0)
        return
    if(this.length===1)
        return this[0]
    let res = this[0];
    for(let i=1; i<this.length; i++){
        res = fn(res,this[i]);
    }
    return res;
}
/** Object.create */
// creates a new object, using an existing object as the prototype of the newly created object.
const _objectCreate = (proto) => {
    if(typeof proto !== 'object' || proto === null)
        return
    const fn = function(){}
    fn.prototype = proto
    return new fn()
}
/** Function.bind */
Function.prototype._bind = function(target,...args){
    const that = this
    return function() {
        target.fn = that
        const res = target.fn(...args)
        delete target.fn
        return res
    }
}
/** Function.call */
Function.prototype._call = function(target = window,...args){
    const that = this
    target.fn = that
    const res = target.fn(...args)
    delete target.fn
    return res
}
/** Function.apply */
Function.prototype._apply = function(target = window,...args){
    const that = this
    target.fn = that
    const res = target.fn(...args)
    delete target.fn
    return res
}
/** new */
const _new = (Fn,...args) => {
    const prototype = Fn.prototype
    const newObj = {}
    newObj.__proto__ = prototype
    newObj.Fn = Fn
    const res = newObj.Fn(...args)
    delete newObj.Fn
    if(typeof res === Object)
        return res
    return newObj
}
/** 浅拷贝 */
const shallowClone = target => {
    if(typeof target !== 'object' || target === null)
        return target
    if(/^(Map|Set|Function|Date|RegExp)$/i.test(target.constructor.name))
        return target
    const obj = target instanceof Array? []:{}
    for(let key in target){
        if(target.hasOwnProperty(key))// 判断是自身的还是原型链上的
            obj[key] = target[key]
    }
    return obj
}
/** 深拷贝 */
const deepClone = (target,map = new Map()) => {
    if(typeof target !== 'object' || target === null)
        return target
    if(/^(Map|Set|Function|Date|RegExp)$/i.test(target.constructor.name))
        return new target.constructor(target)
    if(map.get(target)){
        return map.get(target)
    }
    const obj = target instanceof Array? []:{}
    map.set(target,obj)
    for(let key in target){
        if(target.hasOwnProperty(key))// 判断是自身的还是原型链上的
            obj[key] = deepClone(target[key],map)
    }
    return obj
}
/** 观察者模式 */
class Observed {
    constructor(name){
        this.name = name
        this.state = '走路'
        this.Observers = []
    }    
    setObserver(observer){
        this.Observers.push(observer)
    }     
    setState(state){
        this.state = state
        this.Observers.forEach((observer)=>{
            observer.update(this)
        })
    }
}
class Observer {
    constructor(){}    
    update(observed){
        console.log(observed.name+'正在'+observed.state)
    }
}
/** 发布订阅模式 */
class EventEmitter {
    constructor() {
        this.events = []
    }
    on(type,action) {
        const event = this.events[type]
        if(event) {
            event.push(action);
        }else{
            this.events[type] = [action];
        }
    }
    emit(type,...args) {
        const event = this.events[type]
        if(event){
            for(let i=0;i<event.length;i++){
                event[i](...args);
            }
        }
    }
}
/** 寄生组合式继承 */
function Human(name) {
    this.name = name
    this.kingdom = 'animal'
    this.color = ['yellow', 'white', 'brown', 'black']
}
function Chinese(name,age) {
    Human.call(this,name)
    this.color = 'yellow'
    this.age = age
}
Human.prototype.getName = function(){
    return this.name
}
function Fn(){}
Fn.prototype = Human.prototype
let obj = new Fn()
Chinese.prototype = obj
obj.constructor = Chinese
Chinese.prototype.getAge = function(){
    return this.age
}
/** Promise.all */
Promise._all = function(iterators) {
    const arr = Array.from(iterators);
    // 保存返回值
    let result = [];
    // 记录执行个数
    let index = 0;
    return new Promise((resolve,reject)=>{
        function addData(index,value) {
            result[index] = value;
            index++;
            // 只有当执行完成后才可以返回
            if(index === arr.length){
                resolve(result);
            }
        }
        for(let i=0;i<arr.length;i++){
            let cur = arr[i];
            if(cur instanceof Promise){
                cur.then(res => addData(i,res))
                    .catch(err => reject(err))
            }else {
                addData(i,cur);
            }
        }
    })
}
/** Promise.race */
Promise._race = function(iterators) {
    const arr = Array.from(iterators);
    return new Promise((resolve,reject)=>{
        for(let i=0;i<arr.length;i++){
            let cur = arr[i];
            if(cur instanceof Promise){
                return cur.then(res=>resolve(res))
                        .catch(err=>reject(err))
            }else {
                resolve(cur);
            }
        }
    })
}
/** Promise.prototype.finally */
Promise.prototype._finally = function(callback) {
    return this.then(
        res => Promise.resolve(callback()).then(()=>res),
        err => Promise.resolve(callback()).then(()=>{
            throw err;
        })
    )
}
/** Promise.any */
Promise._any = function(iterators) {
    const arr = Array.from(iterators);
    const rejectList = [];
    let index = 0;
    return new Promise((resolve,reject)=>{
        for(let i=0;i<arr.length;i++){
            const cur = arr[i];
            if(cur instanceof Promise){
                cur.then((res)=>{
                    resolve(res);
                }).catch((err)=>{
                    index++;
                    rejectList[i] = err;
                    if(index===arr.length){
                        reject(rejectList);
                    }
                })
            }else {
                resolve(cur);
            }
        }
    })
}
/** Promise.allSettled */
Promise._allSettled = function(iterators) {
    const arr = Array.from(iterators);
    const result = [];
    const index = 0;
    function getResult(success,val) {
        return success?{status:"fulfilled",value:val}:{status:"rejected",reason:val}
    }
    return new Promise((resolve,reject)=>{
        for(let i=0;i<arr.length;i++){
            let cur = arr[i];
            if(cur instanceof Promise){
                cur.then((value)=>{
                    result[i] = getResult(true,value);
                    index++;
                    if(index===arr.length){
                        resolve(result);
                    }
                }).catch((err)=>{
                    result[i] = getResult(false,err);
                    index++;
                    if(index===arr.length){
                        resolve(result);
                    }
                })
            }else {
                result[i] = getResult(true,cur);
                index++;
                if(index===arr.length){
                    resolve(result);
                }
            }
        }
    })
}
/** 防抖 */
function debounce(callback,time,immediate) {
    let timer = null;
    return function() {
        let that = this
        if(immediate){
            if(!timer){
                callback(Array.from(arguments));
            }else {
                clearTimeout(timer);
            }
            timer = setTimeout(()=>{
                clearTimeout(timer);
            },time)
        }else{
            if(timer) clearTimeout(timer)
            timer = setTimeout(()=>{
                callback.apply(that,Array.from(arguments));
            },time)
        }
    }
}
/** 节流 */
function throttle(callback,time,immediate){
    let timer = null
    return function(){
        const that = this
        if(timer) return
        if(immediate){
            callback.apply(that,Array.from(arguments));
            timer = setTimeout(()=>{
                clearTimeout(timer)
            },time)
        }else{
            timer = setTimeout(()=>{
                callback.apply(that,Array.from(arguments));
                clearTimeout(timer)
            })
        }
    }
}