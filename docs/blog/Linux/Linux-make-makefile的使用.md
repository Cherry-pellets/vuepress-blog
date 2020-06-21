---
title: Linux make/makefile的使用
date: 2020-03-28 15:21:28
tags:
---
[](###make/makefile的使用)
需求：
编写程序，统计学生的成绩，包括成绩的最大值、最小值、总和以及平均值， 并要求利用make工程管理器进行编译。
（1）建立C程序 mymax.c
（2）建立C程序 mymin.c
（3）建立C程序 mysum.c
（4）建立C程序 myavg.c
（5）建立C程序 my.h
（6）建立C程序 mymain.c
（7）建立静态库libmylib.a
（8）编译mymain.c程序
（9）执行mymain程序
#### 1.目录：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200328151452409.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
#### 2.编写.c和.h文件

```c
// myMax.cpp
#include<stdio.h>
int myMax(int a[],int num){
	int max=a[0];
	for(int i=0;i<num;i++){
		if(a[i]>max){
			max=a[i];
		}
	}
	printf("maximum is %d\n",max);
} 
```
```c
// myMin.cpp
#include<stdio.h>
int myMin(int a[],int num){
	int min=a[0];
	for(int i=0;i<num;i++){
		if(a[i]<min){
			min=a[i];
		}
	}
	printf("minimum is %d\n",min);
} 
```
```c
// mySum.cpp
#include<stdio.h>
int mySum(int a[],int num){
	int sum=0;
	for(int i=0;i<num;i++){
		sum+=a[i];
	}
	printf("Sum is %d\n",sum);
} 
```
```c
//myAvg.cpp
#include<stdio.h>
#include<iostream>
using namespace std;
int myAvg(int a[],int num){
	float avg=0;
	int sum=0;
	for(int i=0;i<num;i++){
		sum+=a[i];
	}
	avg=(float)sum/(float)num;
	cout<<"Average is "<<avg<<endl;
} 
```
```c
//my.h
#ifndef MY_H
#define MY_H
int myMax(int a[],int num);
int myMin(int a[],int num);
int mySum(int a[],int num);
int myAvg(int a[],int num);
#endif
```
```c
//myMain.cpp
#include "my.h"
#include<iostream>
using namespace std;
int scores[10000];
int main(){
	int num;
	
	cout<<"input the number of students:";
	cin>>num;
	cout<<"input the scores£º"<<endl; 
	for(int i=0;i<num;i++){
		cin>>scores[i];
	}
	myMax(scores,num);
	myMin(scores,num);
	mySum(scores,num);
	myAvg(scores,num);	
} 
```
#### 3.编写makefile文件

格式：（注意：命令command前需要有tab）
```
targets : prerequisites
		command
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200328151551684.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
#### 4.编译执行

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200328151734930.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)