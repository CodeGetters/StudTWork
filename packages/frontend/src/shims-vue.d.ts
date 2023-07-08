// 声明 '*vue' 是一个模块，可以匹配任何文件名以 .vue 结尾的模块
declare module "*vue" {
  // 导入 vue 的 DefineComponent 类型
  import type { DefineComponent } from "vue";

  // 定义常量 component，类型是 DefineComponent<{},{},any>
  // 包含三个泛型参数，分别表示 Props、Emits 和组件实例的类型
  // 这里的 Props 和 Emits 都是空对象 {}，组件实例可以是任意类型
  const component: DefineComponent<{}, {}, any>;

  export default component;
}
