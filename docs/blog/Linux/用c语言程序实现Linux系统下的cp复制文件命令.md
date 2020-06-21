---
title: 用c/c++语言程序实现Linux系统下的cp复制文件命令
date: 2020-03-02 11:48:14
tags:
---
### 用c/c++语言程序实现Linux系统下的cp复制文件命令
```c
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<dirent.h>
#include<sys/stat.h>
#include<unistd.h>
 
//复制文件
int copy_file(char* srcPath,char *destPath){
	char Buf[1024] = {0};
	int count_read = 0;
	long fp_src_ltell = 0,fp_src_atell = 0;
	FILE* fp_src = fopen(srcPath,"r");//只读方式打开
	FILE* fp_dst = fopen(destPath,"w");//只写方式打开
	if(fp_dst ==NULL || fp_src == NULL){
		printf("文件打开有问题\n");
		return -1;
	}
	while(1){
		memset(Buf,0,sizeof(Buf));
		fp_src_ltell = ftell(fp_src); //上一次文件指针位置
		count_read = fread(Buf,sizeof(Buf),1,fp_src);
		fp_src_atell = ftell(fp_src); //当前文件指针位置
		if(count_read<1){ //异常或到达末尾结束
			if(feof(fp_src)){
				long temp = fp_src_atell - fp_src_ltell;
				fwrite(Buf,temp,1,fp_dst); //成功
				return 0;
			}
			else if(ferror(fp_src)){
				perror("fread error:");
				return -1;
			}
		}
		fwrite(Buf,sizeof(Buf),1,fp_dst);
	}
	return 0;
}

int main(int argc,char *argv[]){  //其中argv[1]为源文件  argv[2]为目标文件
	if(argc != 3){//参数个数错误
		printf("Usage srcfile destfile\n");
		return -1;
	}
	char* srcPath=argv[1];
	char* destPath=argv[2];
	if(access(destPath,F_OK) == 0){
		printf("目标文件已存在\n");
		return -1;
	}
	copy_file(srcPath,destPath);//文件进行拷贝
	return 0;
}
```
运行结果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302114646386.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302114656926.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)