/* 
  单例模式的定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点
  使用场景：有一些对象我们往往只需要一个，比如全局缓存、全局的数据管理 如vuex
*/

/* 
  实现：
    通过一个变量来标识 实例是否已经被创建，
    如果未被创建，则新建一个实例，
    如果已被创建，则返回已经创建过的实例
*/
// let instance = null
// function Create(state) {
//     if(instance) {
//       return instance
//     }
//     this.state = state
//     return instance = this
// }

// // const s1 = new Create({name: 'hh'})
// // const s2 = new Create({name: 'ww'})
// // console.log(s1 === s2) // true

// // 防止污染全局变量，通过自执行函数实现

// const createStore = (function() {
//   let instance = null
//   function Create(state) {
//       if(instance) {
//         return instance
//       }
//       this.state = state
//       return instance = this
//   }
//   return Create
// })()

// const s1 = new createStore({name: 'hh'})
// const s2 = new createStore({name: 'ww'})
// console.log(s1 === s2) // true

/* 
  惰性单例：即在需要的时候才创建对象实例
*/
class Store{
  constructor(state) {
    this.state = state
  }
  static getInstance() {
    if(!Store.instance) {
      Store.instance = new Store()
    }
    return Store.instance
  }
}

const s1 = Store.getInstance({name: 'hh'})
const s2 = Store.getInstance({name: 'ww'})
console.log(s1 === s2) // true

// Vuex源码

let Vue // 用来保存Vue实例
export function install (_Vue) {
  // 判断是否已经保存了Vue实例，如果Vue已保存说明vuex已经初始化过
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  // 保存Vue实例
  Vue = _Vue
  
  // 在Vue生命周期初始化vuex
  applyMixin(Vue)
}

// antd4.0 react版 useForm源码

function useForm<Values = any>(form?: FormInstance<Values>): [FormInstance<Values>] {
  const formRef = React.useRef<FormInstance>();
  const [, forceUpdate] = React.useState({});

  // 如果FormStore实例未创建，则新建一个
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const forceReRender = () => {
        forceUpdate({});
      };

      const formStore: FormStore = new FormStore(forceReRender);

      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}