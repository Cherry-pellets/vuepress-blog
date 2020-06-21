---
title: vue组件的驼峰式命名与短横线分割命名
date: 2020-04-29 14:48:40
tags:
---
#### 1.注册组件的时候使用了驼峰命名

如果在**注册组件**的时候使用了驼峰命名, 那么在**使用时**需要转换成短横线分隔命名
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>组件命名</title>
    <script src="js/vue.js"></script>
</head>
<body>
<div id="app">
    <my-son></my-son><!-- 使用时：短横线分割命名-->
</div>
<template id="son">
    <div>
        <p>......</p>
    </div>
</template>
<script>
    Vue.component("mySon", { // 注册时：驼峰式命名
        template: "#son",
        });
    let vue = new Vue({
        el: '#app',
    });
</script>
</body>
</html>
```
####  2. 传递数据时使用驼峰名称

如果父组件向子组件传递数据时使用了短横线分隔命名, 子组件接收时写驼峰式命名
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>组件命名</title>
    <script src="js/vue.js"></script>
</head>
<body>
<div id="app">
    <my-son :parent-name="name"></my-son><!-- 向子组件传递数据：短横线分割命名，不能使用驼峰式-->
</div>
<template id="son">
    <div>
        <p>{{parentName}}</p><!-- 驼峰式使用-->
    </div>
</template>
<script>
    Vue.component("mySon", { 
        template: "#son",
        props:["parentName"] // 驼峰式接收
        });
    let vue = new Vue({
        el: '#app',
        data:{
        	name:"test"
        }
    });
</script>
</body>
</html>
```
#### 3.传递方法时双方都不能使用驼峰命名, 只能用短横线分隔命名

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>组件命名</title>
    <script src="js/vue.js"></script>
</head>
<body>
<div id="app">
    <my-son :parent-name="name" @parent-fn="fn"></my-son><!-- 向子组件传递方法：短横线分割命名，不能使用驼峰式-->
</div>
<template id="son">
    <div>
    	<button @click="fn">按钮</button>
        <p>{{parentName}}</p>
    </div>
</template>
<script>
    Vue.component("mySon", {
        template: "#son",
        props:["parentName"],
        methods:{
        	fn(){
				this.$emit("parent-fn"); // 短横线式接收
			}
        }
        });
    let vue = new Vue({
        el: '#app',
        data:{
        	name:"test1"
        },
        methods:{
        	fn(){
				console.log("test2");
			}
        }
    });
</script>
</body>
</html>
```