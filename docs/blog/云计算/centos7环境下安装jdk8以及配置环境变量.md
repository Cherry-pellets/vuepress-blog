---
title: centos7环境下安装jdk8以及配置环境变量
date: 2020-03-24 21:34:47
tags:
---
[](###centos7环境下安装jdk8以及配置环境变量)
#### 1.获取jdk8下载链接

打开[网址](https://www.oracle.com/cn/java/technologies/javase-jdk8-downloads.html)选择合适自己系统的jdk版本，点击下载
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200324210328336.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
要注意选择.tar.gz的文件，如果不知道系统是32bit还是64bit,可以用```uname -a```查看
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020032421050333.png)
点击同意：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200324210650631.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
然后会自动跳转登录：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200324210745792.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
登录成功后会出现文件下载链接以及文件名称：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200324210853144.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)

#### 2.下载并解压

然后在centos中输入以下命令， 格式为：wget  -O 文件名  网址
（文件名和网址是上图中复制粘贴过来的）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200324212023473.png)
下载完成后解压文件：命令格式：tar zxvf 压缩包名称 -C 目的地路径
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200324211745398.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200324212249136.png)

#### 3.配置环境变量

解压后配置环境变量：输入```vi /etc/profile```进入vim编辑区
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020032421231623.png)
按i进入输入模式，然后一直按↓使光标移到文件末尾，添加以下配置信息：
```
#set java environment
JAVA_HOME=/usr/lib/jvm/jdk1.8.0_241
CLASSPATH=.:${JAVA_HOME}/jre/lib/rt.jar:${JAVA_HOME}/lib/dt.jar:${JAVA_HOME}/lib/tools.jar
PATH=$PATH:${JAVA_HOME}/bin
export JAVA_HOME CLASSPATH PATH
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200325125837935.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
添加完成后按esc退出插入模式，输入:wq保存并退出。
然后输入```source /etc/profile```刷新环境变量，再输入```java -version```查看是否安装成功。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200324212948108.png)