---
title: hadoop中SequenceFile的使用
date: 2020-05-30 19:55:30
tags:
---

#### 序列文件 SequenceFile

SequenceFile的每条记录是可序列化的字符数组；
存储结构上，SequenceFile由一个Header后跟多条Record组成；
 Header：
包含了Key classname，Value classname，存储压缩算法，用户自定义元数据等信息；还包含了一些同步标识，用于快速定位到记录的边界。
Record:
每条Record以键值对的方式进行存储；记录的长度、Key的长度、Key值和Value值，并且Value值的结构取决于该记录是否被压缩。
###### 序列化文件的3种类型
未压缩
记录(Record)压缩
块(Block)压缩
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200530194846759.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
#### SequenceFile的作用

可以作为小文件的容器，封装小文件；
用于存储键值对的二进制文件格式；
支持压缩；
保持可分割（可拆分）（拆分标志）；
支持二进制的键和值；
在HDFS中获得更高的存储效率；
用于链接多个Hadoop作业；
#### 问题描述

1、	使用随机数生成以（整数，字符串）为（key，Value）的文本文件，文件的大小内容任意，文件数量不少于100个；
2、使用SequenceFile对以上文件进行封装成一个独立文件，压缩格式任意；
3、对于2生成的独立文件，可以实现以下的三种方式的查询：
	    3.1）给出文件名，可以从序列文件整体读取文件并存储到指定的位置；
	    3.2）给出某个整数的key，可以读取所有该key的数据，并给出所在文件的名称（可以输出到控制台）
	    3.3）给出文件名和整数的key，可以读取该文件中的对应key的数据（可以输出到控制台）
###### 1、使用随机数生成以（整数，字符串）为（key，Value）的文本文件
程序代码：
```java
import java.io.BufferedOutputStream;  
import java.io.File;  
import java.io.FileOutputStream;  
import java.io.PrintStream;  
import java.util.ArrayList;  
import java.util.List;  
import java.util.Random;  
  
public class RadnomTxtFileCreator { // lab 5-1  
    public static void main(String[] args) {  
        long start=System.currentTimeMillis();  
        int numOfFiles = 100;  
        int numOfRecorders = 100000;  
        //本地文件位置，修改合適的位置  
        String uri = "src/hdfs/lab5/files";  
        FileOutputStream fout = null;  
        Random ra = new Random();  
        try {  
            for (int i = 1; i <= numOfFiles; i++) {  
                System.out.println("writing file#"+i);  
                fout = new FileOutputStream(new File(uri + "\\file" + i));  
                List<String> list = new ArrayList<String>();  
                for (int j = 0; j < numOfRecorders; j++)  
                    list.add(ra.nextInt(numOfRecorders) + 1 + "\t" + "the recorder #" + j + " in file#" + i);  
                PrintStream pStream = new PrintStream(new BufferedOutputStream(fout));  
                for (String str : list) {  
                    pStream.println(str);  
                }  
                pStream.close();  
                fout.close();  
            }  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        finally {  
        }  
        long end=System.currentTimeMillis();  
        System.out.println("write "+numOfFiles+" files successfully in "+ (end-start)+"ms");  
    }  
}  
```
效果：生成100个随机文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200530194008870.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200530194040238.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
###### 2、使用SequenceFile对以上文件进行封装成一个独立文件
程序代码：
```java
private static void SmallFilesToSequenceFile() throws IOException {  
        ID key = new ID();  
        Text value = new Text();  
        String name, s;  
        String[] s1;  
        SequenceFile.Writer writer=SequenceFile.createWriter(  
                fs, conf,new Path(sequencefileDir), key.getClass(), value.getClass(), SequenceFile.CompressionType.NONE);  
        FileStatus[] files=fs.listStatus(new Path("src/hdfs/lab5/files"));  
        for(FileStatus file : files){  
            name=file.getPath().getName();  
            System.out.println("封装"+name);  
            FSDataInputStream in=fs.open(file.getPath());  
            key.setName(name);  
            while ((s=in.readLine())!=null){  
                s1=s.split("\t");  
                key.setKey(Integer.parseInt(s1[0]));  
                value.set(s1[1]);  
                writer.append(key,value);  
            }  
            in.close();  
        }  
        writer.close();  
        System.out.println("文件封装完成");  
    }  
```
效果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200530194116686.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
###### 3.给出文件名，可以从序列文件整体读取文件并存储到指定的位置
程序代码：
```java
private static void searchByFileName() throws IOException {  
        String ouputDir = "src/hdfs/lab5/sequenceFile/output.txt";  
        Scanner sc=new Scanner(System.in);  
        System.out.println("请输入文件名：");  
        String name=sc.nextLine();  
        SequenceFile.Reader reader=new SequenceFile.Reader(fs,new Path(sequencefileDir),conf);  
        Writable key = (Writable) ReflectionUtils.newInstance(reader.getKeyClass(), conf);  
        Writable value = (Writable) ReflectionUtils.newInstance(reader.getValueClass(), conf);  
        boolean flag=false;  
        DataOutputStream out = null;  
        while (reader.next(key,value)){  
            if(((ID)key).getName().equals(name)){  
                if(!flag){  
                    new File(ouputDir).mkdirs();  
                    out= new DataOutputStream(new FileOutputStream(ouputDir));  
                    flag=true;  
                }  
                System.out.println(((ID) key).getKey()+"\t"+value);  
                out.writeBytes(((ID) key).getKey()+"\t"+value+"\n");  
            }  
        }  
        out.close();  
        if (flag == true) {  
            System.out.println(name+"保存成功");  
        } else {  
            System.out.println(name+"保存失败");  
        }  
        reader.close();  
    }  
```
效果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200530194146541.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200530194159182.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
###### 4、	给出某个整数的key，可以读取所有该key的数据，并给出所在文件的名称（可以输出到控制台）
程序代码：
```java
private static void searchByKey() throws IOException {  
        Scanner sc=new Scanner(System.in);  
        System.out.println("请输入key：");  
        int i=sc.nextInt();  
        SequenceFile.Reader reader=new SequenceFile.Reader(fs,new Path(sequencefileDir),conf);  
        Writable key = (Writable) ReflectionUtils.newInstance(reader.getKeyClass(), conf);  
        Writable value = (Writable) ReflectionUtils.newInstance(reader.getValueClass(), conf);  
        int n=0;  
        while (reader.next(key,value)){  
            if(((ID)key).getKey()==i){  
                System.out.println(((ID) key).getName()+":\n"+value);  
                n++;  
            }  
        }  
        reader.close();  
        System.out.println("共"+n+"条记录！");  
    }  
```
效果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200530194307831.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
###### 5.给出文件名和整数的key，可以读取该文件中的对应key的数据（可以输出到控制台）
程序代码：
```java
private static void searchValue() throws IOException {  
        Scanner sc=new Scanner(System.in);  
        System.out.println("请输入文件名：");  
        String name=sc.nextLine();  
        System.out.println("请输入key：");  
        int i=sc.nextInt();  
        SequenceFile.Reader reader=new SequenceFile.Reader(fs,new Path(sequencefileDir),conf);  
        Writable key = (Writable) ReflectionUtils.newInstance(reader.getKeyClass(), conf);  
        Writable value = (Writable) ReflectionUtils.newInstance(reader.getValueClass(), conf);  
        ID id=new ID();  
        id.setKey(i);  
        id.setName(name);  
        while (reader.next(key,value)){  
            if(((ID)key).equals(id)){  
                System.out.println(name+"\t"+i+"\t"+value);  
            }  
        }  
        reader.close();  
    }  
```
效果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/202005301943300.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200530194321170.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjUwOTc5,size_16,color_FFFFFF,t_70)
