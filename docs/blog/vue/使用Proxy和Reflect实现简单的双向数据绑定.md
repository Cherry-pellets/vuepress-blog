---
title: 使用Proxy和Reflect实现简单的双向数据绑定
date: 2020-06-13 21:34:23
tags: Proxy, Reflect, 双向数据绑定
---

### Proxy基本语法

 const obj = new Proxy(target, handler);其中target为被代理的对象，handler为对象，声明了代理target的一些操作。

### 用到的Proxy方法

1. ```get(target, propKey, receiver)```
   target: 目标对象。
   propKey: 目标对象的属性。
   receiver: (可选)，该参数为上下文this对象
2. ```set(target, propKey, value, receiver)```
   target: 目标对象。
   propKey: 目标对象的属性名
   value: 属性值
   receiver(可选): 一般情况下是Proxy实列

### 用到的Reflect方法

1. ```Reflect.get(target, name, receiver)```查找并返回target对象的name属性，如果没有该属性，则返回undefined。
2. ```Reflect.set(target, name, value, receiver)```设置target对象的name属性等于value。

### 简单实现数据双向绑定

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="text" id="inputs" value="hello"/>
    <p id="show">hello</p>
    <script>
        let oInput = document.querySelector('#inputs')
        let oShow = document.querySelector('#show')

        let obj = {}
        let handler = {
            get: (obj, key, val) =>{
                console.log(`get ${key}`)
               return Reflect.get(obj, key)
            },
            set: (obj, key, val) => {
                console.log(`set ${key}`)
                if(key === 'text') {
                    oShow.innerHTML = val
                }
               return Reflect.set(obj, key, val)
            }
        }
        let proxy = new Proxy(obj, handler)
        oInput.onkeyup = (e) => {
            proxy.text = e.target.value
            console.log(proxy.text)
        }
    </script>
  </body>
</html>
```