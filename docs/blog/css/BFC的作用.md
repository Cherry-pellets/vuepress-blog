---
title: BFC的作用
date: 2020-05-15 21:55:18
tags:
---
#### 0.BFC内部的特点

（1）上下两个盒子的margin折叠
（2）能够管理float元素（可计算float元素的宽高）
（3）BFC内的元素不会对BFC外的元素定位造成影响
（4）盒子的左边紧挨着BFC的左边
####  1.右边自适应的两栏布局

使用BFC前：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>title</title>
</head>
<style>
    .left {
        width: 100px;
        height: 150px;
        float: left;
        background: red;
    }
    .right {
        height: 300px;
        background: green;
    }
</style>
<body>
<div class="left">LEFT</div>
    <div class="right">RIGHT</div>
</body>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200515214217147.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
使用BFC使红色块下方没有绿色块：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>title</title>
</head>
<style>
    .left {
        width: 100px;
        height: 150px;
        float: left;
        background: red;
    }
    .right {
        height: 300px;
        background: green;
        overflow: hidden;
    }
</style>
<body>
<div class="left">LEFT</div>
<div class="right">RIGHT</div>
</body>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200515214601470.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
除了使用overfloat:hidden，还可以使用其他方式，只要是让右边的盒子产生BFC都可，产生BFC的方式：
（1）overfloat :  除了visible以外的值
（2）float：除了none以外的值
（3）position：除了static和reletive以外的值
（4）display: inline-block/table-cell/flex/table-caption/inline-flex
#### 2.清除浮动

父元素高度塌陷：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>清除浮动</title>
</head>
<style>
    .par {
        border: 5px solid rgb(91, 243, 30);
        width: 300px;
    }
    .box {
        border: 5px solid red;
        width:100px;
        height: 100px;
        float: left;
    }
</style>
<body>
<div class="par">
    <div class="box"></div>
    <div class="box"></div>
</div>
</body>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200515215249354.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
利用BFC清除浮动：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>清除浮动</title>
</head>
<style>
    .par {
        border: 5px solid rgb(91, 243, 30);
        width: 300px;
        overflow: hidden; /*方法1*/
        /*display: flex;*/ /*方法2*/
        /*display: inline-block;*/ /*方法3*/
        /*position: absolute;*/ /*方法4*/
        /*position: fixed;*/  /*方法5*/

    }
   /* .par::after{ !*方法6*!
        content: '';
        clear: both;a
        display: block;
    }*/
    .box {
        border: 5px solid red;
        width:100px;
        height: 100px;
        float: left;
    }
</style>
<body>
<div class="par">
    <div class="box"></div>
    <div class="box"></div>
</div>
</body>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200515215408687.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
