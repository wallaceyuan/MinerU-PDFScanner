# 录入接口

# 修改config.json

# 代码块

1 {   
2 "name": " $\textcircled{1}$ 《内科学》人卫第9版--高清彩色.md", （改成项目名）   
3 "description bookId": "10017",   
4 "reuseConfigFrom": "1744178645448",   
5 "modelConfig": [   
6 {   
7 "id": "default-1",   
8 "provider": "medgo",   
9 "providerId": "custom",   
10 "name": "dsr1",   
11 "endpoint": "http://139.196.188.251:9904/v1/chat/completions",   
12 "apiKey": "sk-abc123456"   
13 }   
14 ],   
15 "id": "117235203644996"   
16 }

# 增加 file.json

# 代码块

1 {  
2 "fileName": " $\textcircled{1}$ 《内科学》人卫第9版--高清彩色.md", / 书籍名称  
3 "size": 18061  / 书籍大小  
4 }

# chunks.json

# 代码块

1 {  
2 "ossfileName": "dataset/故乡.md-eac2e14f-c104-4cbd-8a5d-43e3ec85f819-0",  
3 "content": "> \*\*📑 Summarization： $^ { \star \star }$ $\star$ 文档 前言 $\star \backslash n \backslash n - \cdots \backslash n \backslash n ^ { \cdots } \backslash n$ 故乡\n\n ·鲁迅· $\ln \sin$ 我冒了严寒，回到相隔二千余里，别了二十余年的故乡去。\n\n　　时候既然是深冬；渐近故乡时，天气又阴晦了，冷风吹进船舱中，呜呜的响，\n从蓬隙向外一望，苍黄的天底下，远近横着几个萧索的荒村，没有一些活气。我的\n

心禁不住悲凉起来了。\n\n　　阿！这不是我二十年来时时记得的故乡？\n\n　　我所记得的故乡全不如此。我的故乡好得多了。但要我记起他的美丽，说出他\n的佳处来，却又没有影像，没有言辞了。仿佛也就如此。于",

4 }

接口地址： https://api.medtest.younggem.cn/v1/dataset/api/auto-create

# 完整参数

# 代码块

1 {  
2 "config": {  
3 "name": " $\textcircled{1}$ 《内科学》人卫第9版--高清彩色",  
4 "bookId": "10017",5 "modelConfig": [6 {7 "id": "default-1",8 "provider": "medgo",  
9 "providerId": "custom",  
10 "name": "dsr1",  
11 "endpoint": "http://139.196.188.251:9904/v1/chat/completions",  
12 "apiKey": "sk-abc123456"  
13 }  
14 ]  
15 },  
16 "file": {  
17 "fileName": " $\textcircled{1}$ 《内科学》人卫第9版--高清彩色.md",  
18 "size": 18061  
19 },  
20 "chunks": [  
21 {  
22 "ossfileName": "dataset/故乡.md-eac2e14f-c104-4cbd-8a5d-43e3ec85f819-0",  
23 "content": "> \*\*📑 Summarization：\*\* $\star$ 文档 前言 $\star \backslash n \backslash n - \cdots \backslash n \backslash n ^ { \cdots } \backslash n$ 故乡\n\n ·鲁迅 $\cdot \ln \sin$ 我冒了严寒，回到相隔二千余里，别了二十余年的故乡去。\n\n 时候既然是深冬；渐近故乡时，天气又阴晦了，冷风吹进船舱中，呜呜的响，\n从蓬隙向外一望，苍黄的天底下，远近横着几个萧索的荒村，没有一些活气。我的\n心禁不住悲凉起来了。\n\n　　阿！这不是我二十年来时时记得的故乡 $? \setminus \mathfrak { n }$ 我所记得的故乡全不如此。我的故乡好得多了。但要我记起他的美丽，说出他\n的佳处来，却又没有影像，没有言辞了。仿佛也就如此。于",  
24 "summary": "文档 前言"  
25 },  
26 {

27 "ossfileName": "dataset/故乡.md-eac2e14f-c104-4cbd-8a5d-43e3ec85f819-1",

将我隔成孤身，使我非常气闷；那西瓜地上的\n银项圈  
模糊了，又使我非常的悲哀\n。\n\n　　母亲和宏儿都  
声，知道我在走我的路。我想：我竟与闰土隔绝到这\n  
想念水生么。我希望他们不再像我\n，又大家隔膜起来  
苦展转而生活\n，也不愿意他们都如闰土的辛苦麻木而  
29 "summary": "文档 前言"  
30 }  
31 ],  
32 "tags": [  
33 {  
34 "label": "1 呼吸系统疾病",  
35 "child": [  
36 {  
37 "label": "1.1 呼吸系统总论"  
38 },  
39 {  
40 "label": "1.2 呼吸系统感染性疾病"  
41 },  
42 {  
43 "label": "1.3 呼吸系统肿瘤"  
44 },  
45 {  
46 "label": "1.4 间质性肺疾病"  
47 },  
48 {  
49 "label": "1.5 肺血管与介入治疗"  
50 }  
51 ]  
52 },  
53 {  
54 "label": "2 循环系统疾病",  
55 "child": [  
56 {  
57 "label": "2.1 循环系统总论"  
58 },  
59 {  
60 "label": "2.2 心力衰竭"  
61 },  
62 {  
63 "label": "2.3 心律失常"  
64 },  
65 {  
66 "label": "2.4 冠状动脉粥样硬化性心  
67 },  
68 {

<html><body><table><tr><td>69</td><td>"abel"："2.5 先天性心血管病"</td></tr><tr><td>70</td><td>}，</td></tr><tr><td>71</td><td>{</td></tr><tr><td>72</td><td>"abel"："2.6 瓣膜性疾病"</td></tr><tr><td>73</td><td>}</td></tr><tr><td>74 ]</td><td></td></tr><tr><td>75 1</td><td></td></tr></table></body></html>