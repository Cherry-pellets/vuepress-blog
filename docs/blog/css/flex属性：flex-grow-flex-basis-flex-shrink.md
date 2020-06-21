---
title: flex属性：flex-grow/flex-basis/flex-shrink
date: 2020-05-17 21:37:09
tags:
---
[](###flex属性：flex-grow/flex-basis/flex-shrink)
flex的“可伸缩”主要体现在flex-grow/flex-basis/flex-shrink这三个属性上
#### flex-basis

未应用flex-grow和flex-shrink之前，flexbox中的项的初始大小,默认取值是auto
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .container ul{
            display: flex;
            background: red;
            width: 100%;
            padding: 0;
        }
        li{
            height: 100px;
            list-style: none;
        }
        li:nth-child(1){
            width: 400px;
            background: green;
        }
        li:nth-child(2){
            width: 200px;
            background: pink;
        }
        li:nth-child(3){
            width: 200px;
            background: blue;
        }
    </style>
</head>
<body>
<div class="container">
    <ul>
        <li>这里是li11111111111111111111111111111111111111111</li>
        <li>这里是li</li>
        <li>这里是li</li>
    </ul>
</div>
</body>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020051720595380.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
#### flex-grow

 应用了flex-basis后如果有剩余空间该如何分配到每个项上，默认是不分配，即flex-grow: 0, 这里设置的数值含义：此项所占用剩余空间的比值 =flex-grow取值 / 所有的项设置的flex-grow的属性值的总和，例如：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .container ul{
            display: flex;
            background: red;
            width: 100%;
            padding: 0;
        }
        li{
            height: 100px;
            list-style: none;
            /*flex-basis: 0;*/
        }
        li:nth-child(1){
            width: 400px;
            background: green;
            flex-grow: 2;
        }
        li:nth-child(2){
            width: 200px;
            background: pink;
            flex-grow: 1;
        }
        li:nth-child(3){
            width: 200px;
            background: blue;
            flex-grow: 1;
        }
    </style>
</head>
<body>
<div class="container">
    <ul>
     <!--   <li>这里是li11111111111111111111111111111111111111111</li>
        <li>这里是li</li>
        <li>这里是li</li>-->
        <li></li>
        <li></li>
        <li></li>
    </ul>
</div>
</body>
</html>
```
应用flex-grow前：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200517210806697.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
应用flex-grow后：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200517211254884.png)

#### flex-shrink

 应用flex-basis后如果超出了flexbox范围，该怎么收缩，默认值时1，即每项都等比例收缩。收缩公式：
缩小的值 = （ ( 此项的flex-shrink * flex-basis) / 所有项的 （flex-shrink * flex-basis）之和 ） * 超出flexbox的空间大小
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .container ul{
            display: flex;
            background: red;
            width: 900px;
            padding: 0;
        }
        li{
            height: 100px;
            list-style: none;
            /*flex-basis: 0;*/
        }
        li:nth-child(1){
            width: 1000px;
            background: green;
            flex-grow: 2;
        }
        li:nth-child(2){
            width: 200px;
            background: pink;
            flex-grow: 1;
        }
        li:nth-child(3){
            width: 200px;
            background: blue;
            flex-grow: 1;
        }
    </style>
</head>
<body>
<div class="container">
    <ul>
     <!--   <li>这里是li11111111111111111111111111111111111111111</li>
        <li>这里是li</li>
        <li>这里是li</li>-->
        <li></li>
        <li></li>
        <li></li>
    </ul>
</div>
</body>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200517213307875.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
flex属性是这三个属性的合写：
flex: flex-grow flex-shrink flex-basis|auto|initial|inherit;