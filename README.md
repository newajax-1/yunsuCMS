# vueproject

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

##

```html
 src
  ├─ router   [ 全局路由配置 ]
  │
  ├─ assets   [ 静态资源文件夹 ]
  │    │
  │    └─ js  [ js文件 ]
  │    │   │
  │    │   └─ lib [ js插件 ]
  │    │   │
  │    │   └─ scripts [ 单页JS ]
  │    │        │
  │    │        └─ common/
  │    │        │
  │    │        └─ index.js
  │    │
  │    └─ css/ 
  │    │   │                       
  │    │   └─ styles.styl/  
  │    │
  │    └─ images/
  │
  └─ components/   [ 组件文件夹 ]
        │
        └─ common/  [ 公共组件 ]
        │   │
        │   └─ header.vue/
        │   │
        │   └─ footer.vue/
        │   │
        │   └─ left-menu.vue/
        │
        └─ single/    [ 单页]
                │
                └─ index/
                │  │
                │  └─ index.vue 
                │  │
                │  └─ index.js 
                │
                └─ login/
                │  │
                │  └─ login.vue 
                │  │
                │  └─ login.js  
                │
                └─ sale-plan/
                │  │
                │  └─ sale-plan.vue 
                │  │
                │  └─ sale-plan.js 
                │
                └─ saler-info/
                │  │
                │  └─ saler-info.vue 
                │  │
                │  └─ saler-info.js 
```
