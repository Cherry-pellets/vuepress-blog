---
title: vue生命周期方法
date: 2020-04-30 21:59:25
tags:
---
#### vue生命周期图示

来自[李南江](https://www.it666.com/)老师的图:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430214812659.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
#### 创建期间的生命周期方法

###### beforeCreate:
在调用beforeCreate的时候, Vue实例刚刚被创建出来，此时还未初始化好Vue实例中的数据和方法, 所以还不能访问Vue实例中保存的数据和方法
###### created:
在调用created的时候, 是我们最早能够访问Vue实例中保存的数据和方法的地方
###### beforeMount:
在调用beforeMount的时候, 表示Vue已经编译好了最终模板, 但是还没有将最终的模板渲染到界面上
###### mounted:
在调用mounted的时候, 表示Vue已经完成了模板的渲染, 表示我们已经可以拿到界面上渲染之后的内容了(内存中生成的HTML内容已经替换掉默认模板的内容)
#### 运行期间的生命周期方法

######  beforeUpdate:
 在调用beforeUpdate的时候, 表示Vue实例中保存的数据被修改了，数据已经更新了, 但是界面还没有更新
###### updated:
在调用updated的时候, 表示Vue实例中保存的数据被修改了, 并且界面也同步了修改的数据了

#### 销毁期间的生命周期方法

######  beforeDestroy:
 在调用beforeDestroy的时候, 表示当前组件即将被销毁了（v-if为false等情况下），beforeDestroy函数是我们最后能够访问到组件数据和方法的函数
###### destroyed：
 在调用destroyed的时候, 表示当前组件已经被销毁了，不要在这个生命周期方法中再去操作组件中数据和方法
