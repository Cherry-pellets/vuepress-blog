---
title: centos7中用hadoop执行java文件
date: 2020-03-25 16:16:06
tags:
---
[](###centos7中用hadoop执行java文件)
#### 1.安装jdk和配置环境变量

[点击这里查看在centos7中安装jdk8并配置环境变量](https://blog.csdn.net/qq_43650979/article/details/105081051)
#### 2.安装hadoop

（1）下载
可以到[官网](https://hadoop.apache.org/releases.html)查看自己需要的版本
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200325154611400.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
然后执行下载命令：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200325154407798.PNG)
然后解压到自己喜欢的路径下，格式：tar zxvf 源文件名  -C 目的路径
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200325155054326.PNG)
（2）Hadoop基本设置
打开hadoop路径下的 etc/hadoop/hadoop-env.sh文件，用vim编辑设置Java环境：```export JAVA_HOME=/usr/lib/jvm/jdk1.8.0_241```（根据自己的jdk版本来设置）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200325155538489.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200325155632564.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
（3）设置Hadoop环境变量
```vim /etc/profile```编辑环境变量：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020032515593032.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)

#### 3.利用hadoop执行java包

（1）编辑自己的java文件，然后放到Hadoop目录下的javasource文件夹中
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020032516034390.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
（2）编译java文件
格式：```javac XXXX.java -d XXX```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200325160638543.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
（3）打包
格式：```jar –cvf XXXXXX.jar –C XXX/ .```
```
-c: 创建压缩文件
-v: 输出压缩详细情况
-f: 指定压缩文件
-m: 指定清单文件（manifest.mf是描述JAR内容的清单文件） 
-C dir：指定目录
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200325160657804.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
（4）执行
格式：```bin/hadoop jar xxx.jar packagename.classname input output```
这里的WordCountV2程序需要读取一个文件README.txt，然后计算每个单词出现的次数，然后输出到out文件夹下（如果out已存在，先删除out再执行）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200325160718592.png)
（5）查看结果
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020032516074030.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)