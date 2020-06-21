---
title: 'vue：v-text、v-html与插值表达式的区别'
date: 2020-04-22 15:43:52
tags:
---
#### vue：v-text、v-html与插值表达式的区别

v-html: 会覆盖原有的内容,并且会解析数据中的html；  
v-text: 会覆盖原有的内容,并且不会解析数据中的html；  
插值表达式: 将指定的数据插入到指定位置,不覆盖原有的内容，并且不会解析数据中的html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">
    <!--v-html: 会覆盖原有的内容,并且会解析html-->
    <p v-html="html">1</p>
    <p v-html="text">1</p>
    <!--v-text: 会覆盖原有的内容,并且不会解析html-->
    <p v-text="html">2</p>
    <p v-text="text">2</p>
    <!--{{}}插值: 将指定的数据插入到指定位置,不覆盖原有的内容，并且不会解析html-->
    <p>3 {{html}}</p>
    <p>3 {{text}}</p>
</div>
<script src="../js/vue.min.js"></script>
<script>
    let vue = new Vue({
      el:'#app',
      data:{
        html:'<span>标签内容</span>',
        text:'这里是text'
      }
    })
</script>

</body>
</html>

```

效果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200422154218496.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)