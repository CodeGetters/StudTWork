/*
 * @Description-en:state management
 * @Description-zh:状态管理
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-18 21:18:19
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-03 14:51:58
 */
import { createPinia } from "pinia";

import { createPersistedState } from "pinia-plugin-persistedstate";

const pinia = createPinia();

// 整个 state 默认将被持久化
// store.$id 作为 storage 默认的 key
// 使用 JSON.stringify/JSON.parse 进行序列化/反序列化
// 整个 state 默认将被持久化
pinia.use(
  createPersistedState({
    storage: localStorage,
  })
);

export default pinia;
