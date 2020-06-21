---
title: 数值转换：parseInt、parseFloat、Number的用法和区别
date: 2020-04-16 22:13:13
tags:
---
#### 1.Number（）

Number()函数可以用于任何数据类型，而parseInt和parseInt专门用于把字符串转换成数值。
Number()的转换规则：
```let num = Number(x);```
若x为Boolea类型：当x为true,num=1;当x为false，num=0
若x为null:num=0；
若x为undefined:num=NaN;
若x为数值，直接返回；
若x为字符串：
			（1）字符串中只包含数字（或前面带负号）：忽略前导0（如果有的话）返回，如```let num = Number("0012"); // num = 12```
			（2）字符串中包含有效的浮点数：忽略前导0（如果有的话）返回浮点数，如```let num = Number("001.23"); // num = 1.23```
			（3）字符串为空，即x=""：num=0
			（4）字符串包含十六进制格式：转换为相同大小的十进制数，如```let num = Number("0xA"); // num = 10```
			（5）其他情况：num = NaN			
#### 2.parseInt()

parseInt()专门用于把字符串转换成数值。
用法1：```let num = parseInt(x);```
在进行转换时首先找到x中第一个非空格字符（也就是会忽略字符串中前面的空格，如```x = "    123e"```），如果第一个字符不是数字或者负号，num = NaN;只有一个参数的parseInt不识别八进制数，除非用用法2。
用法2：```let num = parseInt("0xAF",16)  // num = 175```第二个参数代表16进制

#### 3.parseFloat()

parseFloat与parseInt类似，专门用于把字符串转换成浮点数值。
注意点：
（1）如果字符串中有多个小数点，只有第一个有效，其他的被忽略，如```let num = parseFloat("1.1314.520"); // num = 1.1314```
（2）parseFloat只解析十进制数，十六进制格式会被转换成0，如```let num = parseFloat("0xA"); // num = 0```
（3）如果字符串包含的是可解析的整数，函数会返回整数，没有小数点，如```let num = parseFloat("13432key"); // num = 13432```