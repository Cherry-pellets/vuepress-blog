---
title: div嵌套img时多出空白的原因及解决办法
date: 2020-03-10 22:43:30
tags:
---
[](###div嵌套img时多出空白的原因及解决办法)
#### 产生空白的原因

img标签的display属性默认是inline，而对应的vertical-align属性的默认值是baseline。所以就会出现图片底部出现一片空白区域的现象。[关于vertical-align:baseline](https://www.cnblogs.com/xuhaodong/p/basseline.html)

#### 解决办法

1、div{ font-size: 0}
2、img{ display: block}
3、img{ vertical-align:top;}
4、div{line-high:0}
5、如果img后还有其他兄弟标签，写代码时两标签之间不换行