# Python 400 题（导入用·题目卷）

## 一、选择题（单选）（240 题）

1. Python 属于（　）语言。
   - A. 编译型
   - B. 解释型
   - C. 汇编型
   - D. 机器语言
2. 下列哪个不是合法的 Python 变量名？
   - A. _var
   - B. 2var
   - C. var_2
   - D. Var
3. Python 3 中 print 是（　）。
   - A. 语句
   - B. 内置函数
   - C. 关键字
   - D. 模块
4. Python 用（　）来表示代码块的层次结构。
   - A. 大括号 {}
   - B. 缩进
   - C. 分号 ;
   - D. 圆括号 ()
5. 执行 x = y = 10 后，下列说法正确的是（　）。
   - A. x 与 y 是两个值相同的独立对象
   - B. x 与 y 指向同一个整数对象 10
   - C. 语法错误
   - D. y 是 x 的副本
6. a, b = 1, 2 执行 a, b = b, a 后，a 和 b 的值是（　）。
   - A. 1, 2
   - B. 2, 1
   - C. 2, 2
   - D. 1, 1
7. import this 会输出（　）。
   - A. 模块列表
   - B. Python 之禅
   - C. 帮助文档
   - D. 版本信息
8. Python 中单行注释使用（　）。
   - A. //
   - B. #
   - C. /* */
   - D. --
9. 下列哪个不是 Python 关键字？
   - A. pass
   - B. lambda
   - C. eval
   - D. yield
10. if __name__ == "__main__" 的作用是（　）。
   - A. 判断 Python 版本
   - B. 仅当脚本被直接运行时才执行其下的代码
   - C. 声明主函数
   - D. 导入主模块
11. 关于 Python 交互式解释器（REPL），下列说法错误的是（　）。
   - A. 提示符为 >>>
   - B. 输入表达式会立即显示结果
   - C. 变量 _ 保存上一次显示的结果
   - D. 退出 REPL 必须关闭终端
12. PEP 8 对代码缩进的官方建议是（　）。
   - A. 使用 Tab
   - B. 使用 4 个空格
   - C. 使用 8 个空格
   - D. 随意，只要一致
13. 3 / 2 的结果是（　）。
   - A. 1
   - B. 1.5
   - C. 1.0
   - D. 2
14. -7 // 2 的结果是（　）。
   - A. -3
   - B. -4
   - C. 3
   - D. -3.5
15. 2 ** 10 的值是（　）。
   - A. 20
   - B. 100
   - C. 1024
   - D. 512
16. 下列表达式的值恒为 False 的是（　）。
   - A. bool("0")
   - B. bool([])
   - C. bool(0.1)
   - D. bool(-1)
17. a = [1, 2]; b = [1, 2]，则 a == b 与 a is b 的结果分别是（　）。
   - A. True, True
   - B. True, False
   - C. False, True
   - D. False, False
18. bin(10) 的返回值是（　）。
   - A. 1010
   - B. 0b1010
   - C. 10
   - D. '0b1010'
19. type(1 + 2j) 的结果是（　）。
   - A. float
   - B. complex
   - C. str
   - D. dict
20. 0.1 + 0.2 == 0.3 的结果是（　）。
   - A. True
   - B. False
   - C. 报错
   - D. 视平台而定
21. 2 ** 3 * 2 的值是（　）。
   - A. 64
   - B. 16
   - C. 12
   - D. 10
22. 1 < 2 < 3 的求值方式是（　）。
   - A. (1 < 2) < 3，即 True < 3
   - B. 等价于 1 < 2 and 2 < 3
   - C. 语法错误
   - D. 等价于 1 < (2 < 3)
23. 下列类型中属于不可变（immutable）类型的是（　）。
   - A. list
   - B. dict
   - C. tuple
   - D. set
24. x = 10; x += 5 后，对于列表而言下列说法正确的是（　）。
   - A. lst += [1] 与 lst = lst + [1] 完全等价，都产生新列表
   - B. lst += [1] 是原地扩展（等价 extend），lst = lst + [1] 产生新列表
   - C. 两者都是原地修改
   - D. 两者都报错
25. s = "hello"，s[1:4] 的结果是（　）。
   - A. ell
   - B. elh
   - C. ello
   - D. hel
26. 下列哪个操作会抛出异常？
   - A. "abc" + "d"
   - B. "ab" * 3
   - C. "abc"[0] = "x"
   - D. len("abc")
27. f"{3.14159:.2f}" 的输出是（　）。
   - A. 3.14
   - B. 3.15
   - C. 3.1
   - D. {3.14159:.2f}
28. "Hello World".split() 的结果是（　）。
   - A. ['Hello World']
   - B. ['Hello', 'World']
   - C. ['H','e','l','l','o',' ','W','o','r','l','d']
   - D. 报错
29. "hello world".title() 与 "hello world".capitalize() 的结果分别是（　）。
   - A. Hello World / Hello world
   - B. hello world / Hello world
   - C. Hello World / Hello World
   - D. HELLO WORLD / Hello world
30. "  abc  ".strip() 的结果是（　）。
   - A. "abc"
   - B. "  abc"
   - C. "abc  "
   - D. 报错
31. "python".find("th") 与 "python".index("th") 的区别是（　）。
   - A. 完全相同
   - B. find 找不到返回 -1，index 找不到抛 ValueError
   - C. index 更快
   - D. find 只能找单个字符
32. s = "abc"，下列哪个表达式会创建新字符串对象而不是修改原对象？
   - A. s.upper()
   - B. s[0] = "A"
   - C. s.append("d")
   - D. del s[1]
33. "a,b,,c".split(",") 的结果是（　）。
   - A. ['a','b','c']
   - B. ['a','b','','c']
   - C. ['a','b','c','']
   - D. 报错
34. ord("A") 与 chr(66) 的值分别是（　）。
   - A. 65 与 'B'
   - B. 'A' 与 66
   - C. 97 与 'b'
   - D. 报错
35. 字符串拼接 "a" + "b" 与 "".join(["a", "b"]) 相比，关于性能说法正确的是（　）。
   - A. 两者一样快
   - B. 循环中反复 += 更快
   - C. join 更快，尤其元素多时，因为 += 每次都要创建新串
   - D. join 更慢
36. "python".startswith("py") 与 "python".endswith("on") 的结果分别是（　）。
   - A. True, True
   - B. True, False
   - C. False, True
   - D. False, False
37. lst = [1, 2, 3]，lst.append([4, 5]) 后 lst 是（　）。
   - A. [1, 2, 3, 4, 5]
   - B. [1, 2, 3, [4, 5]]
   - C. [1, 2, 3, 4]
   - D. 报错
38. lst = [1, 2, 3]，下列哪个操作会修改原列表？
   - A. lst + [4]
   - B. lst.append(4)
   - C. sorted(lst)
   - D. lst[:]
39. lst = [3, 1, 2]，lst.sort() 与 sorted(lst) 的正确说法是（　）。
   - A. 两者都返回新列表
   - B. lst.sort() 原地排序返回 None，sorted(lst) 返回新列表
   - C. 两者都原地修改
   - D. sorted(lst) 原地修改返回 None
40. lst = [1, 2, 3, 4, 5]，lst[1:4] 与 lst[-2:] 分别是（　）。
   - A. [2,3,4] 与 [4,5]
   - B. [1,2,3] 与 [5]
   - C. [2,3,4,5] 与 [4,5]
   - D. [2,3,4] 与 [5]
41. a = [1, 2]; b = a; b.append(3) 后，a 的值是（　）。
   - A. [1, 2]
   - B. [1, 2, 3]
   - C. 报错
   - D. 不确定
42. lst = [1, 2, 2, 3]，lst.remove(2) 后 lst 是（　）。
   - A. [1, 3]
   - B. [1, 2, 3]
   - C. [1, 2, 3, 2]
   - D. [1, 2, 3] 或报错
43. 关于元组，下列说法错误的是（　）。
   - A. 元组是不可变序列
   - B. 元组可以作为字典的键
   - C. t = (5) 创建的是含一个元素的元组
   - D. t = 1, 2 是合法的元组
44. a, *b, c = 1, 2, 3, 4, 5 后，b 的值是（　）。
   - A. [2, 3, 4]
   - B. (2, 3, 4)
   - C. 2
   - D. 报错
45. 列表推导式 [x*x for x in range(5) if x % 2 == 0] 的结果是（　）。
   - A. [0, 4, 16]
   - B. [1, 9]
   - C. [0, 1, 4, 9, 16]
   - D. [0, 4]
46. list(range(1, 10, 3)) 的结果是（　）。
   - A. [1, 4, 7]
   - B. [1, 4, 7, 10]
   - C. [1, 3, 6, 9]
   - D. [3, 6, 9]
47. zip([1, 2], ['a', 'b', 'c']) 转成列表后的结果是（　）。
   - A. [(1,'a'), (2,'b'), (None,'c')]
   - B. [(1,'a'), (2,'b')]
   - C. 报错
   - D. [(1,'a'), (2,'b'), (3,'c')]
48. 元组相比列表的主要优势是（　）。
   - A. 元素可以修改
   - B. 更占内存
   - C. 不可变、可哈希，可作为字典键且更省内存
   - D. 只能存同类型元素
49. d = {"a": 1}，访问不存在的键 d["b"] 与 d.get("b") 的结果分别是（　）。
   - A. 都返回 None
   - B. 都抛 KeyError
   - C. 抛 KeyError 与返回 None
   - D. 都返回 0
50. 下列哪种类型不能作为字典的键？
   - A. 字符串
   - B. 元组 (1, 2)
   - C. 列表 [1, 2]、frozenset
   - D. 整数
51. Python 3.7+ 中字典的遍历顺序是（　）。
   - A. 随机顺序
   - B. 按插入顺序
   - C. 按键排序
   - D. 倒序
52. d = {"a": 1, "b": 2}，d.update({"b": 3, "c": 4}) 后 d 是（　）。
   - A. {"a":1,"b":2,"c":4}
   - B. {"a":1,"b":3,"c":4}
   - C. {"b":3,"c":4}
   - D. 报错
53. {x: x**2 for x in range(4)} 的结果是（　）。
   - A. [0, 1, 4, 9]
   - B. {0: 0, 1: 1, 2: 4, 3: 9}
   - C. {0, 1, 4, 9}
   - D. 报错
54. for k, v in d.items() 中，items() 返回的是（　）。
   - A. [(k,v), ...] 列表
   - B. 动态视图对象（view），实时反映字典变化
   - C. 元组
   - D. 迭代器只能遍历一次
55. s1 = {1, 2, 3}; s2 = {2, 3, 4}，s1 & s2、s1 | s2、s1 - s2 分别是（　）。
   - A. {2,3} / {1,2,3,4} / {1}
   - B. {1} / {1,2,3,4} / {2,3}
   - C. {2,3} / {1,2,3,4} / {4}
   - D. {1,2,3} / {2,3} / {1}
56. 判断元素 x 是否在集合 s 中，s 中查找的时间复杂度是（　）。
   - A. O(1) 平均
   - B. O(n)
   - C. O(log n)
   - D. O(n log n)
57. lst = [1, 2, 2, 3, 3, 3]，去重且不要求保序的最快写法是（　）。
   - A. set(lst)
   - B. dict.fromkeys(lst)
   - C. 循环判断 not in
   - D. sorted(set(lst))
58. d = {1: "a"}; d[[2]] = "b" 的结果是（　）。
   - A. 成功添加
   - B. TypeError: unhashable type
   - C. KeyError
   - D. 静默失败
59. {}.fromkeys(["a", "b"], 0) 与 {k: 0 for k in ["a", "b"]} 的结果（　）。
   - A. 前者报错
   - B. 都是 {"a":0, "b":0}
   - C. 前者是 None
   - D. 结果类型不同
60. d = {"a": 1}，del d["a"] 与 d.pop("a") 的区别是（　）。
   - A. 无区别
   - B. pop 会返回被删除的值，del 不返回；两者对缺失键均抛 KeyError（pop 无默认值时）
   - C. del 返回 None，pop 返回字典
   - D. del 对缺失键不报错
61. x = 5，语句 print("big") if x > 3 else print("small") 属于（　）。
   - A. 语法错误
   - B. 三元条件表达式
   - C. switch 语句
   - D. 循环
62. for i in range(3): print(i, end=" ") 的输出是（　）。
   - A. 0 1 2
   - B. 1 2 3
   - C. 0 1 2 3
   - D. 1 2
63. 关于 break 与 continue，说法正确的是（　）。
   - A. break 跳过本次循环继续下一轮
   - B. continue 立即终止整个循环
   - C. break 终止本层循环，continue 跳过本次进入下一轮
   - D. 两者完全等价
64. for i in [1, 2, 3]: pass 执行后 i 的值是（　）。
   - A. 不存在
   - B. 3
   - C. 0
   - D. 保留上次迭代前的值
65. while True: ... 循环的正确退出方式不包括（　）。
   - A. break
   - B. return（在函数内）
   - C. raise 异常
   - D. continue
66. enumerate(["a", "b"], start=1) 转为列表的结果是（　）。
   - A. [(0,'a'), (0,'b')]
   - B. [(1,'a'), (2,'b')]
   - C. [1, 2]
   - D. ['a','b']
67. match point: case (0, 0): ... 结构化模式匹配（Python 3.10+）中，case _ 的含义是（　）。
   - A. 匹配任何值（通配）
   - B. 匹配空值
   - C. 语法错误
   - D. 匹配下划线变量
68. if 语句中哪些值会被视为假？
   - A. 仅 False 和 None
   - B. False、None、0、0.0、空容器、空字符串等
   - C. 所有负数
   - D. 0 和 False
69. 下列代码的输出是（　）。
for i in range(3):
    if i == 1:
        continue
    print(i, end="")
   - A. 02
   - B. 012
   - C. 2
   - D. 0
70. pass 语句的作用是（　）。
   - A. 结束程序
   - B. 空操作占位
   - C. 跳过下一次循环
   - D. 返回 None
71. for ch in "abc": 会迭代出（　）。
   - A. 整个字符串
   - B. 每个字符
   - C. 报错
   - D. 字符的下标
72. 嵌套循环中，内层 break 会（　）。
   - A. 跳出所有循环
   - B. 只跳出内层循环
   - C. 跳出外层循环
   - D. 语法错误
73. def f(a, b=2, *args, **kwargs) 中，f(1, 2, 3, x=4) 调用时 args 与 kwargs 分别是（　）。
   - A. (3,) 与 {"x":4}
   - B. [3] 与 {"x":4}
   - C. (2,3) 与 {}
   - D. 报错
74. def f(x, lst=[]) 的默认参数陷阱是（　）。
   - A. 没有陷阱
   - B. 默认列表在函数定义时创建一次，多次调用共享同一列表
   - C. 每次调用都会新建列表
   - D. 语法错误
75. x = 10
def f():
    x = 20
f()
print(x) 的输出是（　）。
   - A. 20
   - B. 10
   - C. 报错
   - D. None
76. 下列关于 return 的说法错误的是（　）。
   - A. 函数没有 return 语句时返回 None
   - B. return 可以返回多个值（元组）
   - C. return 会立即结束函数
   - D. 一个函数只能有一个 return 语句
77. def f(a, b, /, c, *, d) 中（Python 3.8+），合法的调用是（　）。
   - A. f(a=1, b=2, c=3, d=4)
   - B. f(1, 2, 3, d=4)
   - C. f(1, 2, c=3, 4)
   - D. f(1, 2, 3, 4)
78. def f(x): return x * 2，print(f(3), f("a"), f([1])) 的输出是（　）。
   - A. 6 aa [1, 1]
   - B. 6 aa [1, 1, 1, 1]
   - C. 6 6 6
   - D. 报错
79. lambda x: x + 1 创建的对象类型是（　）。
   - A. 函数 function
   - B. lambda 类型
   - C. 表达式不是对象
   - D. 匿名类
80. 函数文档字符串（docstring）存储在函数的（　）属性中。
   - A. __doc__
   - B. __name__
   - C. __dict__
   - D. __doc__ 且 help() 可读取
81. def f(**kwargs): print(kwargs) 调用 f(a=1, b=2) 输出（　）。
   - A. {'a': 1, 'b': 2}
   - B. (1, 2)
   - C. a=1 b=2
   - D. 报错
82. 关于函数是一等公民（first-class），下列说法正确的是（　）。
   - A. 函数只能被调用
   - B. 函数可作为参数、返回值、赋给变量、存入容器
   - C. 函数必须先编译
   - D. 函数不能嵌套定义
83. print(sorted(["bb", "a", "ccc"], key=len)) 的输出是（　）。
   - A. ['a', 'bb', 'ccc']
   - B. ['ccc', 'bb', 'a']
   - C. ['a', 'ccc', 'bb']
   - D. 报错
84. 递归函数必须包含的基本要素是（　）。
   - A. 循环语句
   - B. 基准情形（终止条件）与递归调用
   - C. 全局变量
   - D. try/except
85. 下列关于闭包的说法正确的是（　）。
   - A. 内层函数引用了外层函数的变量，外层函数返回内层函数后变量仍被保留
   - B. 闭包必须使用 global
   - C. 闭包只能在模块顶层创建
   - D. 闭包在函数调用结束后立即释放外层变量
86. counter 闭包实现中，为什么需要 nonlocal？
   - A. 不需要
   - B. 因为对 n 赋值会让 Python 把 n 判定为局部变量，触发 UnboundLocalError
   - C. nonlocal 能提高性能
   - D. nonlocal 使 n 变为全局变量
87. 装饰器 @deco 本质上等价于（　）。
   - A. deco 被导入
   - B. func = deco(func)
   - C. func.deco()
   - D. import deco
88. def deco(f):
    def wrapper(*a, **kw):
        print("before")
        r = f(*a, **kw)
        print("after")
        return r
    return wrapper
@deco
def hello(): print("hello")
hello() 的输出顺序是（　）。
   - A. hello before after
   - B. before hello after
   - C. after before hello
   - D. before after hello
89. functools.cache（或 lru_cache）装饰递归斐波那契函数的作用是（　）。
   - A. 把递归改为循环
   - B. 缓存返回值，把指数复杂度降为线性
   - C. 防止栈溢出
   - D. 没有作用
90. list(map(lambda x: x*2, [1, 2, 3])) 的结果是（　）。
   - A. [1, 2, 3]
   - B. [2, 4, 6]
   - C. (2, 4, 6)
   - D. 报错
91. from functools import reduce; reduce(lambda a, b: a+b, [1, 2, 3, 4]) 的结果是（　）。
   - A. 10
   - B. 1234
   - C. [1,2,3,4]
   - D. 报错
92. 关于带参数的装饰器 @retry(times=3)，其结构是（　）。
   - A. 两层函数
   - B. 三层函数：装饰器工厂→真正的装饰器→wrapper
   - C. 一个类
   - D. 无法实现
93. partial(func, b=10)（functools.partial）的作用是（　）。
   - A. 调用一半就停止
   - B. 固定函数的部分参数生成新可调用对象
   - C. 并行执行
   - D. 删除函数参数
94. 下列代码输出（　）。
def outer():
    fs = []
    for i in range(3):
        fs.append(lambda: i)
    return fs
print([f() for f in outer()])
   - A. [0, 1, 2]
   - B. [2, 2, 2]
   - C. [3, 3, 3]
   - D. 报错
95. 关于装饰器 functools.wraps，作用是（　）。
   - A. 加速装饰器
   - B. 把原函数的 __name__、__doc__、__wrapped__ 等元信息复制到 wrapper
   - C. 防止重复装饰
   - D. 自动传参
96. 高阶函数（higher-order function）的定义是（　）。
   - A. 执行时间长的函数
   - B. 接受函数为参数或返回函数的函数
   - C. 用 class 定义的函数
   - D. 带很多参数的函数
97. 可迭代对象（Iterable）与迭代器（Iterator）的关系是（　）。
   - A. 完全相同
   - B. 可迭代对象实现了 __iter__，迭代器还实现了 __next__；iter() 可把可迭代对象转为迭代器
   - C. 迭代器不能迭代
   - D. 可迭代对象只能用一次
98. 生成器函数的标志是（　）。
   - A. 函数名以 gen_ 开头
   - B. 函数体内含 yield 关键字
   - C. 返回 list
   - D. 使用 @generator 装饰器
99. g = (x*x for x in range(3))，list(list(g)) 的结果是（　）。
   - A. [[0, 1, 4]]
   - B. [0, 1, 4]
   - C. []
   - D. 报错
100. yield 的执行语义是（　）。
   - A. 结束函数并返回值，类似 return
   - B. 暂停函数并交出一个值，下次 next() 从暂停处继续
   - C. 只能用一次
   - D. 必须配对使用
101. 处理 10GB 日志文件统计错误行数，最省内存的方式是（　）。
   - A. f.readlines() 一次读入后遍历
   - B. 逐行 for line in f 遍历（文件对象即迭代器）
   - C. f.read() 读入整个字符串再 split
   - D. 读入 list 处理
102. itertools.count(10, 2) 的行为是（　）。
   - A. 生成 10 到 2 的序列
   - B. 无限生成 10, 12, 14, ...
   - C. 只生成一次 10
   - D. 报错
103. itertools.groupby([1,1,2,2,3], key=lambda x:x) 分组的前提是（　）。
   - A. 无要求
   - B. 数据必须先按 key 排序，相同 key 相邻
   - C. 数据必须是数字
   - D. 数据必须去重
104. 自定义迭代器类必须实现的方法是（　）。
   - A. __iter__ 和 __next__
   - B. __getitem__ 和 __setitem__
   - C. __len__ 和 __str__
   - D. run() 和 stop()
105. 生成器表达式与列表推导式的写法区别是（　）。
   - A. [] 与 {}
   - B. [...] 与 (...)，圆括号版本是惰性生成器
   - C. 完全一样
   - D. (...) 是元组
106. iter([1, 2]).__next__() 等价于（　）。
   - A. next([1, 2])
   - B. next(iter([1, 2]))
   - C. [1,2].next()
   - D. 直接调用报错
107. 关于生成器的 send 方法，g.send(v) 的作用是（　）。
   - A. 向生成器外部发送数据
   - B. 把 v 作为生成器内部当前 yield 表达式的值并恢复执行
   - C. 只能发送 None
   - D. 等价于 next()
108. sum(x for x in range(10) if x % 2) 的结果是（　）。
   - A. 25
   - B. 20
   - C. 45
   - D. 30
109. 实例方法中的 self 指的是（　）。
   - A. 类本身
   - B. 当前实例对象
   - C. 模块
   - D. 父类
110. __init__ 方法的作用是（　）。
   - A. 创建对象
   - B. 初始化刚创建的实例（设置属性）
   - C. 销毁对象
   - D. 复制对象
111. class A: pass; a = A(); a.x = 1; a.y = 2，说法正确的是（　）。
   - A. 语法错误
   - B. 可以动态给实例添加属性，属性存在 a.__dict__ 中
   - C. 属性必须先在类中声明
   - D. x、y 属于类而不是实例
112. class Dog:
    count = 0
    def __init__(self):
        Dog.count += 1
关于 count，说法正确的是（　）。
   - A. count 是实例属性
   - B. count 是类属性，被所有实例共享，此处用于统计实例数
   - C. count 每个实例独立
   - D. 会报错
113. 调用 obj.method() 时，Python 的查找与调用过程是（　）。
   - A. 先找实例 __dict__ 中的数据属性，找不到才报错
   - B. 先在类型（含 MRO）中找到 method，再以 obj 为第一参数调用
   - C. 直接执行全局函数
   - D. 编译期绑定
114. 下列创建实例的方式正确的是（　）。
   - A. p = Point
   - B. p = Point()
   - C. p = new Point()
   - D. p = Point.create
115. @classmethod 方法的特点是（　）。
   - A. 不能访问任何属性
   - B. 第一个参数是类 cls，常用于替代构造器（如 dict.fromkeys）
   - C. 等同于静态方法
   - D. 只能被类调用不能被实例调用
116. @staticmethod 与普通模块级函数相比的主要意义是（　）。
   - A. 性能更好
   - B. 逻辑上归属类命名空间，表明它不依赖实例或类状态
   - C. 可以访问 self
   - D. 必须这样写
117. print(obj) 时调用的魔术方法是（　）。
   - A. __str__（优先），无 __str__ 时回退 __repr__
   - B. __init__
   - C. __len__
   - D. __call__
118. 实现 obj1 == obj2 的自定义比较需要重写（　）。
   - A. __eq__
   - B. __cmp__
   - C. __equals__
   - D. is 方法
119. len(obj) 需要 obj 实现（　）。
   - A. __len__
   - B. __size__
   - C. __count__
   - D. __length__
120. 下列关于命名约定（非强制）正确的是（　）。
   - A. _name 表示受保护的内部属性（惯例提示）
   - B. __name（双下划线开头）触发名称改写（name mangling）变为 _类名__name
   - C. __name__ 是系统魔术命名
   - D. 以上都正确
121. class B(A) 中调用父类方法的正确方式是（　）。
   - A. A.__init__(self)
   - B. super().__init__()
   - C. parent.__init__()
   - D. super(self).__init__()
122. 类 C(B, A) 的 MRO（方法解析顺序）使用（　）。
   - A. 深度优先
   - B. C3 线性化算法
   - C. 随机
   - D. 字母序
123. 多态在 Python 中的典型体现是（　）。
   - A. 函数重载（同名不同参）
   - B. 不同对象实现同名方法，调用方不关心具体类型（鸭子类型）
   - C. 必须继承同一父类
   - D. 运算符重载禁止
124. @property 的作用是（　）。
   - A. 定义类属性
   - B. 把方法包装成属性访问，可加 getter/setter/deleter 控制
   - C. 声明私有变量
   - D. 提高访问速度
125. 魔术方法 __getitem__ 被哪个语法触发？
   - A. obj[key]
   - B. obj.key
   - C. obj()
   - D. obj + x
126. @dataclass（3.7+，dataclasses 模块）自动生成的是（　）。
   - A. 只有 __init__
   - B. __init__、__repr__、__eq__ 等
   - C. 数据库表
   - D. 线程
127. 元类（metaclass）是（　）。
   - A. 类的父类
   - B. 用来创建类的“类”，默认为 type
   - C. 实例的模板
   - D. 装饰器
128. 抽象基类（abc 模块）的作用是（　）。
   - A. 让类不能被实例化，强制子类实现指定方法
   - B. 加速类创建
   - C. 自动生成文档
   - D. 替代继承
129. __slots__ = ("x", "y") 的效果是（　）。
   - A. 声明私有属性
   - B. 禁止实例动态添加 __slots__ 之外的属性，节省内存
   - C. 自动生成方法
   - D. 使类变抽象
130. 关于 __init_subclass__ 钩子（3.6+），正确的是（　）。
   - A. 在定义子类时自动执行，可用于注册/校验子类
   - B. 在每个实例创建时执行
   - C. 是元类专属方法
   - D. 必须手动调用
131. 组合（composition）优于继承的典型场景是（　）。
   - A. Car 与 Engine 的关系——Car 拥有 Engine 而非是 Engine
   - B. Dog 是 Animal
   - C. Manager 是 Employee
   - D. Circle 是 Shape
132. __call__ 方法的作用是（　）。
   - A. 让实例可以像函数一样被调用
   - B. 构造实例
   - C. 字符串化
   - D. 比较相等
133. import module 与 from module import func 的区别是（　）。
   - A. 完全相同
   - B. 前者引入模块对象需用 module.func，后者把 func 绑定进当前命名空间
   - C. 后者更快且总是推荐
   - D. 前者不能导入自定义模块
134. __name__ == "__main__" 判断常写在使用场景（　）。
   - A. 类定义中
   - B. 模块文件底部，作为脚本入口判断
   - C. 循环内
   - D. 装饰器内
135. 一个目录要成为 Python 包，传统上需要包含（　）。
   - A. setup.py
   - B. __init__.py
   - C. main.py
   - D. README.md
136. 创建虚拟环境（隔离项目依赖）的标准命令是（　）。
   - A. pip install venv
   - B. python -m venv .venv
   - C. pip freeze
   - D. python -m isolate
137. pip 安装第三方包的正确命令是（　）。
   - A. install pip numpy
   - B. pip install numpy
   - C. python install numpy
   - D. import numpy
138. 模块搜索顺序 sys.path 中，通常排最前的是（　）。
   - A. site-packages
   - B. 脚本所在目录（或当前目录）、PYTHONPATH
   - C. 标准库目录
   - D. 随机
139. if __name__ 之外，模块级代码在（　）执行。
   - A. 只在被导入时执行一次
   - B. 每次 import 都重新执行
   - C. 永远不执行
   - D. 只在直接运行时执行
140. __all__ = ["func_a"] 在模块中的作用是（　）。
   - A. 禁止导入其他名字
   - B. 声明 from module import * 时导入哪些名字（公开 API 白名单）
   - C. 加密模块
   - D. 加速导入
141. 发生循环导入（circular import）的根本原因通常是（　）。
   - A. Python 版本太低
   - B. 两个模块在顶层相互 import，且在导入时就需要对方的属性
   - C. 包没有 __init__.py
   - D. 没写 __all__
142. 相对导入 from . import utils 只能用于（　）。
   - A. 任何脚本
   - B. 包内部模块（不能直接作为脚本运行）
   - C. REPL
   - D. 标准库
143. 发布包到 PyPI 的现代标准工具链是（　）。
   - A. python setup.py install
   - B. pyproject.toml（PEP 517/518）+ build + twine 或 uv publish
   - C. zip 上传
   - D. git push
144. 运行 python -m http.server 的作用是（　）。
   - A. 安装 http 库
   - B. 以当前目录为根启动一个简易静态文件服务器
   - C. 编译 http 模块
   - D. 下载网页
145. 捕获异常并获取异常对象的正确写法是（　）。
   - A. except ValueError as e:
   - B. except ValueError error e:
   - C. except (ValueError, e):
   - D. catch ValueError as e:
146. try/except/else/finally 中，else 块的执行条件是（　）。
   - A. 永远执行
   - B. try 块没有抛出异常时执行
   - C. 发生异常时执行
   - D. 只有 return 时执行
147. 裸 except:（或 except Exception）的主要问题是（　）。
   - A. 语法不允许
   - B. 会吞掉所有异常（含 KeyboardInterrupt 等本不该拦截的），掩盖真实错误
   - C. 性能太差
   - D. 只能用一次
148. raise ValueError("bad") from err 的 from 子句作用是（　）。
   - A. 从 err 模块导入
   - B. 记录异常链：err 是引发当前异常的原因（__cause__）
   - C. 重命名异常
   - D. 抛出两个异常
149. 自定义业务异常的推荐做法是（　）。
   - A. 继承 Exception 定义 MyAppError(Exception)
   - B. 继承 BaseException
   - C. 直接 raise 字符串
   - D. 用 assert 实现
150. with open(...) as f 相比 try/finally + close() 的优势是（　）。
   - A. 更快
   - B. 自动在退出时关闭文件，即使发生异常
   - C. 能读更多格式
   - D. 不需要 open
151. assert cond, "msg" 的行为是（　）。
   - A. 始终执行校验
   - B. 断言失败抛 AssertionError；python -O 运行时被忽略
   - C. 等于 raise ValueError
   - D. 只能用于测试
152. KeyError、IndexError、TypeError 分别在什么情形下触发？（　）
   - A. 缺失字典键 / 越界索引 / 类型不匹配的操作
   - B. 文件不存在 / 键缺失 / 值错误
   - C. 值错误 / 类型错误 / 键错误
   - D. 导入失败 / 除零 / 栈溢出
153. except Exception 与 except BaseException 的关键区别是（　）。
   - A. 没有区别
   - B. BaseException 还会捕获 SystemExit、KeyboardInterrupt 等系统级异常
   - C. Exception 更宽
   - D. BaseException 更快
154. 函数内 finally 块中有 return 时会发生（　）。
   - A. finally 的返回值覆盖 try 中的返回值（旧版本行为，3.14 起 PEP 765 对此发出语法警告）
   - B. 两个都返回
   - C. 报错
   - D. 忽略 finally
155. Python 3.11 引入的异常组（ExceptionGroup / except*）用于（　）。
   - A. 同时抛出并分别捕获多个异常，常见于 asyncio.TaskGroup 并发场景
   - B. 压缩异常信息
   - C. 替代 finally
   - D. 加速异常
156. try 中 open 文件失败（FileNotFoundError），except OSError 能否捕获？（　）
   - A. 不能，类型不同
   - B. 能，FileNotFoundError 是 OSError 的子类，isinstance 匹配即可
   - C. 取决于操作系统
   - D. 只有 Python 3.10+ 可以
157. open("f.txt", "r", encoding="utf-8") 中 r 模式的含义是（　）。
   - A. 追加写入
   - B. 只读（文件不存在报错）
   - C. 读写
   - D. 二进制读
158. with open("a.txt") as f: 的核心作用是（　）。
   - A. 加速读取
   - B. 离开 with 块（即使异常）自动关闭文件
   - C. 压缩文件
   - D. 校验编码
159. 读写 JSON 文件的标准库模块是（　）。
   - A. json（load/dump 处理文件，loads/dumps 处理字符串）
   - B. pickle
   - C. marshal
   - D. csv
160. pathlib 模块中，拼接路径的运算符是（　）。
   - A. +
   - B. /
   - C. &
   - D. .
161. 读取一个大文件并逐行处理，最省内存的写法是（　）。
   - A. lines = f.readlines()
   - B. for line in f:（文件对象本身是迭代器）
   - C. data = f.read().split("\n")
   - D. 读入后再切片
162. open("log.txt", "a") 的行为是（　）。
   - A. 覆盖已有内容
   - B. 追加到文件末尾，文件不存在则创建
   - C. 只读
   - D. 文件已存在时报错
163. 二进制复制文件最直接的写法是（　）。
   - A. shutil.copyfile(src, dst)
   - B. open(src) 读文本后写
   - C. os.rename
   - D. json.dump
164. csv 模块读取 CSV 文件的标准方式是（　）。
   - A. csv.load(f)
   - B. csv.reader(f) 迭代出行列表，DictReader 可按列名取值
   - C. eval 每行
   - D. json.load
165. StringIO 与 BytesIO 的用途是（　）。
   - A. 压缩字符串
   - B. 在内存中模拟文件对象，让需要 file 的接口直接吃字符串/字节
   - C. 加密
   - D. 读取网络
166. f.seek(0) 的作用是（　）。
   - A. 关闭文件
   - B. 把读写位置移到文件开头
   - C. 清空文件
   - D. 读取第一行
167. open(..., encoding="utf-8") 在 Windows 上特别重要的原因是（　）。
   - A. Windows 不支持 Python
   - B. 不指定时默认编码可能是 GBK/cp936（取决于区域设置），读写 UTF-8 文件会乱码或报错
   - C. UTF-8 更快
   - D. Windows 文件更大
168. os.walk(top) 的用途是（　）。
   - A. 遍历目录树，产出 (当前目录, 子目录列表, 文件列表)
   - B. 读取文件
   - C. 排序
   - D. 监控文件变化
169. collections.Counter(["a", "b", "a"]) 最常用的方法是（　）。
   - A. most_common(n) 返回出现最多的前 n 项
   - B. sort()
   - C. append()
   - D. join()
170. collections.defaultdict(list) 的行为是（　）。
   - A. 访问缺失键返回空列表并自动写入
   - B. 访问缺失键返回 None
   - C. 报 KeyError
   - D. 只能存列表
171. collections.deque 相比 list 的优势是（　）。
   - A. 两端插入删除 O(1)（popleft/appendleft）
   - B. 支持随机访问更快
   - C. 自动排序
   - D. 更省内存读文件
172. datetime 模块中，now() 与 utcnow() 的关系是（　）。
   - A. 相同
   - B. now() 返回本地时间，utcnow() 返回 UTC 时间（naive）；现代写法推荐 now(timezone.utc) 得 aware 时间
   - C. utcnow 更快
   - D. utcnow 已删除
173. datetime.strptime("2026-09-27", "%Y-%m-%d") 的作用是（　）。
   - A. 格式化输出日期字符串
   - B. 按指定格式把字符串解析为 datetime 对象
   - C. 计算日期差
   - D. 比较日期
174. os 与 sys 模块中，获取命令行参数列表的是（　）。
   - A. sys.argv
   - B. os.args
   - C. sys.path
   - D. os.environ
175. random 模块中，从非空序列随机取一个元素的是（　）。
   - A. random.choice(seq)
   - B. random.sample(seq, 1) 也可以（返回列表）
   - C. random.shuffle(seq)（原地打乱，不返回元素）
   - D. 以上都相关，其中 choice 直接返回单个元素
176. time.sleep(0.5) 的作用是（　）。
   - A. 暂停当前线程 0.5 秒
   - B. 休眠进程
   - C. 清理内存
   - D. 定时任务
177. math 模块中，向上取整与向下取整分别是（　）。
   - A. math.ceil / math.floor
   - B. round / int
   - C. abs / sign
   - D. math.up / math.down
178. functools.lru_cache(maxsize=None) 与 functools.cache 的关系是（　）。
   - A. 完全无关
   - B. functools.cache(3.9+) 就是无限大小的 lru_cache 的别名
   - C. cache 更慢
   - D. lru_cache 已废弃
179. subprocess 模块中，安全执行外部命令并获取输出的推荐函数是（　）。
   - A. subprocess.run(["ls", "-l"], capture_output=True, text=True)（3.x 推荐）
   - B. os.system（无法获取输出、无异常）
   - C. shell=True 拼接字符串（有注入风险）
   - D. eval
180. logging 模块日志级别从低到高正确的是（　）。
   - A. DEBUG < INFO < WARNING < ERROR < CRITICAL
   - B. INFO < DEBUG < ERROR
   - C. ERROR 最高
   - D. WARNING > ERROR
181. 导入正则模块的语句是（　）。
   - A. import re
   - B. import regex（第三方，非标准库）
   - C. import regexp
   - D. from re import *（不推荐但可行）
182. re.match 与 re.search 的区别是（　）。
   - A. 完全一样
   - B. match 只从字符串开头匹配，search 扫描全串找第一个匹配
   - C. search 只匹配开头
   - D. match 返回列表
183. 正则中 \d、\w、\s 分别表示（　）。
   - A. 数字 / 字母数字下划线 / 空白符
   - B. 小写字母 / 单词 / 空格
   - C. 任意字符 / 通配 / 制表符
   - D. 数字 / 汉字 / 空格
184. re.findall(r"\d+", "a1b22c333") 的结果是（　）。
   - A. ['1','22','333']
   - B. ['1','2','2','3','3','3']
   - C. 1 个 Match 对象
   - D. None
185. 正则量词默认是（　）。
   - A. 懒惰的（最少匹配）
   - B. 贪婪的（最多匹配），加 ? 变懒惰
   - C. 必须显式指定
   - D. 随机
186. 分组 (\d{4})-(\d{2}) 中提取第一个分组用（　）。
   - A. m.group(0)
   - B. m.group(1)
   - C. m[0]
   - D. m.first
187. re.sub(r"\s+", " ", "a   b") 的作用是（　）。
   - A. 查找
   - B. 把连续空白替换为单个空格，得 "a b"
   - C. 切分字符串
   - D. 验证格式
188. 匹配手机号 11 位数字且完整独立的正则是（　）。
   - A. r"\d{11}"
   - B. r"^\d{11}$"
   - C. r"\d+"
   - D. r"\b\d{11}\b"（词边界也可，具体看场景）
189. re.IGNORECASE（或 re.I）标志的作用是（　）。
   - A. 忽略空白
   - B. 忽略大小写匹配
   - C. 全局匹配
   - D. 多行模式
190. 验证邮箱最稳妥的建议是（　）。
   - A. 用极其复杂的正则覆盖所有 RFC 规则
   - B. 简单正则粗校验格式 r"^[\w.+-]+@[\w-]+\.[\w.-]+$"，真正验证靠发送确认邮件
   - C. 用 int() 转换
   - D. 不存在邮箱
191. 预编译正则的好处是（　）。
   - A. pattern = re.compile(r"\d+") 后可复用且匹配更快、可读性更好
   - B. 编译后不能再修改
   - C. 必须编译
   - D. 只能用一次
192. re.split(r"[,;]", "a,b;c") 的结果是（　）。
   - A. ['a,b;c']
   - B. ['a', 'b', 'c']
   - C. ['a', ';', 'c']
   - D. 报错
193. CPython 的主要内存回收机制是（　）。
   - A. 引用计数为主 + 分代 GC 处理循环引用
   - B. 只有标记清除
   - C. 手动 free
   - D. 不回收
194. a = [1, [2, 3]]; b = a.copy(); b[1].append(4) 后 a 是（　）。
   - A. [1, [2, 3]]
   - B. [1, [2, 3, 4]]
   - C. 报错
   - D. [1]
195. x = 500; y = 500（同一行赋值）与分两行在交互模式输入，x is y 的结果分别是（　）。
   - A. 都 True
   - B. 都 False
   - C. 同一行 True（编译器常量折叠共享），分两行 False（超出小整数缓存）
   - D. 视操作系统
196. 函数 def f(x=[]): x.append(1) 连续调用 f() 两次后返回的列表（若返回 x）是（　）。
   - A. [1] 每次都是新列表
   - B. [1, 1] 共享同一个默认列表
   - C. [1, 1] 但来自不同列表
   - D. 报错
197. del x 与 x = None 的共同点是（　）。
   - A. 都会立即调用 __del__
   - B. 都移除名字与对象的绑定，引用计数减一；对象何时销毁取决于引用计数是否归零
   - C. del 会销毁对象
   - D. 没有共同点
198. 关于 __slots__ 对内存的影响，说法正确的是（　）。
   - A. 让实例更大
   - B. 用固定槽位替代每实例 __dict__，大规模小对象显著省内存
   - C. 没有影响
   - D. 会自动深拷贝
199. 生成器与列表在内存上的根本差异是（　）。
   - A. 生成器更快
   - B. 生成器只保存当前状态，O(1) 内存；列表持有全部元素 O(n)
   - C. 生成器不能循环
   - D. 没有差异
200. intern（驻留）机制主要作用于（　）。
   - A. 所有整数
   - B. 符合标识符样式的短字符串，编译期/运行期共享同一对象
   - C. 所有列表
   - D. 字典
201. copy.copy 与 copy.deepcopy 对只含不可变元素（如 (1, 2, "a")）的对象，行为是（　）。
   - A. deepcopy 一定会新建对象
   - B. 两者都可能返回原对象（不可变对象无需复制，直接共享）
   - C. copy.copy 总是新建
   - D. 都报错
202. list.sort 与 sorted 中 key 函数使用 __class__ 属性比较（ attrgetter('__class__') ）时，涉及对象方法（　）。
   - A. 每元素调用一次
   - B. 每次比较调用两次
   - C. 不调用
   - D. 随机
203. weakref（弱引用）的作用是（　）。
   - A. 创建不增加引用计数的引用，不妨碍对象被回收
   - B. 加密对象
   - C. 永久保活对象
   - D. 复制对象
204. b = a[:] 与 b = list(a)（a 为嵌套列表）都是（　）。
   - A. 深拷贝
   - B. 浅拷贝
   - C. 引用赋值
   - D. 无效语法
205. GIL（全局解释器锁）的含义是（　）。
   - A. 保证同一时刻只有一个线程执行 Python 字节码（CPython）
   - B. 锁住文件
   - C. 防止网络攻击
   - D. 多进程的锁
206. CPU 密集型任务（图像处理）与 IO 密集型任务（批量下载），分别最适合（　）。
   - A. 多线程 / 多线程
   - B. multiprocessing 多进程 / 多线程或 asyncio
   - C. asyncio / 多进程
   - D. 单线程 / 单线程
207. concurrent.futures 中 ThreadPoolExecutor 与 ProcessPoolExecutor 的共同接口是（　）。
   - A. submit(fn, *args) 返回 Future，map(fn, iterable) 顺序产出结果
   - B. run()
   - C. async def
   - D. start()
208. async/await 程序的运行核心是（　）。
   - A. 多核并行
   - B. 事件循环（event loop）在单线程内调度协程，遇 await 让出控制权
   - C. 多进程
   - D. GPU
209. threading.Lock 的作用是（　）。
   - A. 提高速度
   - B. 保护共享数据：with lock: 保证临界区互斥访问
   - C. 创建线程
   - D. 自动并行
210. multiprocessing 中进程间不共享内存，传递数据的方式是（　）。
   - A. 直接访问全局变量
   - B. pickle 序列化经 Pipe/Queue 传递，或共享内存 Manager/Value
   - C. print
   - D. 没有方式
211. asyncio 中同步阻塞调用（如 time.sleep(5) 或 requests.get）出现在协程内的后果是（　）。
   - A. 没有影响
   - B. 阻塞整个事件循环，所有协程卡住
   - C. 自动转线程
   - D. 报错
212. 竞态条件（race condition）的典型例子是（　）。
   - A. 两个线程同时执行 counter += 1，丢失更新
   - B. 函数太长
   - C. 变量名冲突
   - D. 内存不足
213. 生产者-消费者模型中，推荐的标准组件是（　）。
   - A. threading 线程 + queue.Queue（阻塞队列自动处理同步）
   - B. list + append/pop（需自加锁，且 pop(0) 慢）
   - C. 全局变量
   - D. 直接共享文件
214. Future 对象（concurrent.futures / asyncio）代表（　）。
   - A. 一个已完成的计算
   - B. 一次异步操作的“未来结果”占位符，可轮询/回调/await 获取
   - C. 线程池本身
   - D. 锁
215. daemon 线程（threading.Thread(daemon=True)）的特点是（　）。
   - A. 优先级最高
   - B. 主程序退出时被直接终止，不阻止进程结束
   - C. 永远不能结束
   - D. 不能访问共享数据
216. Python 3.13/3.14 中关于“自由线程”（free-threading，PEP 779）的说法正确的是（　）。
   - A. 3.13 实验性提供无 GIL 构建，3.14 正式支持（仍为可选构建）
   - B. 3.13 起默认无 GIL
   - C. 已删除 GIL 概念
   - D. 只支持 Windows
217. 函数注解 def add(a: int, b: int) -> int 的作用是（　）。
   - A. 运行时强制类型检查
   - B. 为工具（IDE、mypy）提供类型信息，Python 运行时默认不做强制检查
   - C. 加速运算
   - D. 声明常量
218. 表示“整数或字符串列表”的正确注解是（　）。
   - A. list[int | str]（3.10+，旧版用 List[Union[int, str]]）
   - B. list(int, str)
   - C. array[int|str]
   - D. list{int,str}
219. f-string 引入于哪个版本？（　）
   - A. Python 3.0
   - B. Python 3.6
   - C. Python 3.10
   - D. Python 2.7
220. 海象运算符 :=（3.8+）的作用是（　）。
   - A. 比较是否相等
   - B. 在表达式内部赋值，如 while (line := f.readline()):
   - C. 定义常量
   - D. 位运算
221. match...case 结构化模式匹配引入的版本与对应 PEP 是（　）。
   - A. 3.8 / PEP 570
   - B. 3.10 / PEP 634
   - C. 3.12 / PEP 695
   - D. 3.6 / PEP 498
222. dataclass 与 NamedTuple 都可表示记录类型，关于二者说法正确的是（　）。
   - A. NamedTuple 可变
   - B. dataclass 默认可变，可配置 frozen=True 变不可变；NamedTuple 本质是元组，不可变
   - C. 两者都不可变
   - D. dataclass 不能有方法
223. Python 3.13 的两个标志性新特性是（　）。
   - A. f-string 与 async/await
   - B. 实验性 JIT 编译器与实验性自由线程（no-GIL）构建，以及新版交互式解释器
   - C. match 语句与海象运算符
   - D. t-string 与延迟注解
224. typing.Protocol（3.8+，静态鸭子类型）的意义是（　）。
   - A. 运行时强制接口继承
   - B. 定义结构化接口：只要对象具有协议声明的方法/属性即视为符合，无需显式继承
   - C. 网络协议工具
   - D. 生成文档
225. zip(*strict=True)（3.10+）的作用是（　）。
   - A. 压缩数据
   - B. 长度不一致时抛 ValueError，帮助发现数据 bug
   - C. 忽略多余元素（默认行为）
   - D. 加速 zip
226. TypeVar 与泛型函数 def first[T](items: list[T]) -> T（PEP 695，3.12+）中 T 的含义是（　）。
   - A. 固定类型 int
   - B. 类型变量：表示“某种类型”，输入输出一致时由类型检查器推导绑定
   - C. 异常类型
   - D. 线程类型
227. 字典合并运算符 | 与 f-string 之外的另一个 3.9 实用特性是（　）。
   - A. 内置泛型容器注解 list[int]、dict[str, int] 直接可用（PEP 585）
   - B. async/await
   - C. walrus
   - D. match
228. Pydantic、FastAPI 等库能“运行时强制类型”的原理是（　）。
   - A. 修改了 Python 解释器
   - B. 读取 __annotations__ 并在运行时校验/转换数据（利用注解生态）
   - C. 重写了 type
   - D. 依赖 GIL
229. is 并用于判断两个值相等的问题在于（　）。
   - A. is 是身份比较，内容相等的不同对象会误判为 False
   - B. is 更慢
   - C. is 只能用于字符串
   - D. 没有问题
230. 可变对象作字典键或集合元素会出问题的根本原因是（　）。
   - A. 可变对象内容变化后哈希值可能变化，破坏哈希表一致性
   - B. 速度慢
   - C. 字典不允许任何对象
   - D. 内存不足
231. for i in range(3): lst.append(i) 中 lst = [] 应放在循环外，若误放循环内结果是（　）。
   - A. [0, 1, 2]
   - B. 每轮清空，最终 [2]
   - C. 报错
   - D. []
232. 读文件时 for line in f: print(line) 每行末尾多一个空行的原因是（　）。
   - A. print 额外加空格
   - B. 行本身含 \n，print 又加换行
   - C. 文件编码问题
   - D. readline 的 bug
233. 除零、键缺失、类型错误混在一起时，防御式写法的原则是（　）。
   - A. 一个大 except Exception 全包
   - B. 分别捕获具体异常类型，各做相应处理
   - C. 不处理
   - D. 只用 if 判断
234. print(type(None)) 的结果是（　）。
   - A. <class 'NoneType'>
   - B. <class 'None'>
   - C. NoneType 变量
   - D. 报错
235. 关于 Python 的浮点数下标运算：lst = [10, 20, 30]; lst[1.0] 的结果是（　）。
   - A. 20
   - B. 10
   - C. TypeError: list indices must be integers or slices, not float
   - D. 30
236. 代码 d = {"a": 1}; for k in d: d["b"] = 2 的结果是（　）。
   - A. 正常
   - B. RuntimeError: dictionary changed size during iteration
   - C. KeyError
   - D. 静默成功添加
237. 字符串数字相加 "1" + 1 抛 TypeError，正确的处理思路是（　）。
   - A. 禁止用户输入
   - B. 明确边界：输入层尽早转换为 int/float（带校验），核心逻辑只处理强类型数据
   - C. 全部用字符串运算
   - D. 加 try 忽略
238. 关于切片越界：lst = [1, 2, 3]，lst[5:] 与 lst[5] 的行为分别是（　）。
   - A. 都报错
   - B. 切片得 []，下标访问抛 IndexError
   - C. 切片报错，下标得 None
   - D. 都返回 None
239. str 与 bytes 混用：b"abc" + "def" 的结果是（　）。
   - A. b"abcdef"
   - B. TypeError: can't concat str to bytes
   - C. "abcdef"
   - D. 报 warning 但成功
240. 判断列表为空最 Pythonic 的写法是（　）。
   - A. if len(lst) == 0:
   - B. if lst == []:
   - C. if not lst:
   - D. if lst is None:

## 二、填空题（120 题）

1. Python 交互式解释器的主提示符是________。
2. 在命令行查看 Python 版本的命令是________（写一种即可）。
3. Python 源码文件默认的字符编码是________。
4. 交换变量 a 和 b 的一行语句是：a, b = ________。
5. x = 10 后，type(x) 返回的是________类型。
6. 语句 a = 1; b = 2; print(a, b, sep=", ") 的输出是________。
7. 9 // 2 的值是________。
8. 二进制整数字面量的前缀是________（如 0b1010）。
9. int("ff", 16) 的值是________。
10. bool 是________的子类，因此 True + True 的值是 2。
11. abs(-3.5) 的值是________。
12. 表达式 not True or True 的值是________。
13. "python"[::-1] 的值是________。
14. "Hello".lower() 的值是________。
15. f-string 中，{name=}（Python 3.8+）会同时输出变量名和值，name=1 时输出________。
16. "1,2,3".split(",") 与 ",".join(["1","2","3"]) 的结果分别是________和________。
17. "  abc \n".strip() 的值是________。
18. len("中国") 的值是________。
19. lst = [10, 20, 30]，lst.pop() 的返回值是________，此时 lst 为________。
20. [0] * 3 的值是________；[[0] * 3] * 2 创建的二维列表中修改 [0][0] 会________（影响/不影响）另一行。
21. lst = [3, 1, 2]，执行 lst.sort(reverse=True) 后 lst 为________。
22. max([1, 5, 3]) 的值是________；sum([1, 2, 3]) 的值是________。
23. [x for x in "abc"] 的值是________。
24. t = (1, [2, 3])，执行 t[1].append(4) 是________（合法/不合法）的。
25. len({1, 2, 2, 3, 3, 3}) 的值是________。
26. d = {"a": 1, "b": 2}，list(d.keys()) 与 list(d.values()) 分别是________和________。
27. {1, 2, 3} 中创建空集合必须用________，因为 {} 创建的是空字典。
28. d.get("x", 5) 当 "x" 不在字典中时返回________，且________（会/不会）修改字典。
29. 合并两个字典的运算符是________（Python 3.9+），如 {"a":1} | {"b":2}。
30. s = {1, 2, 3}，向集合添加元素的方法是________（方法名）。
31. Python 中用于占位、什么都不做的语句是________。
32. range(5) 生成的整数序列是________到________（含头不含尾）。
33. 遍历列表同时获得下标应使用内置函数________。
34. 循环的 else 子句在循环被________打断时不会执行。
35. 表达式 "odd" if x % 2 else "even" 中，x=3 时结果为________。
36. match 语句是 Python________（填版本）引入的语法。
37. 在函数内部修改全局变量需要使用________关键字声明。
38. 函数 f 没有 return 语句，则 f() 的返回值是________。
39. 查看函数接受的参数信息可用内置函数________（提示：inspect 模块或内置 ________）。
40. 定义函数时，*args 之前最多能有________个 / 分隔符标明仅位置参数区域（填数字，按 PEP 570 语法允许的数量）。
41. f = lambda x, y=10: x + y，则 f(5) 的值是________。
42. def f(*, key): f(1) 会抛________异常。
43. 内层函数修改外层函数的变量必须使用________关键字。
44. 装饰器 @functools.wraps(func) 应加在________函数定义的上一行。
45. map(str, [1, 2, 3]) 返回的是惰性的________对象（填类型名），list() 后才生成结果。
46. sorted(words, key=str.lower) 中参数 key 的作用是________。
47. @deco1 与 @deco2 叠加时（deco1 在上），等价于 func = ________(________(func))。
48. 闭包变量存储在函数的________属性中（返回 cell 对象元组）。
49. 迭代器耗尽后继续 next() 会抛出________异常。
50. 定义生成器函数使用关键字________；委托另一个生成器使用________。
51. list(zip("ab", range(10))) 的结果是________。
52. 从无限迭代器 itertools.count() 中取前 5 个值应使用 itertools.________。
53. 表达式 next(iter("abc")) 的值是________。
54. 生成器函数中 return x 的效果是把 x 放入________异常的 value 中（对调用方表现为结束）。
55. 实例方法的第一个参数按惯例命名为________。
56. 实例化类时，先调用________分配并返回实例，再调用________初始化。
57. 查看实例所有属性（含方法）可访问其________属性（字典）。
58. 让对象支持 with 语句需要实现________和________方法（上下文管理协议）。
59. Python 私有属性的双下划线改写规则：__secret 在类 Foo 中实际存储为________。
60. isinstance(True, int) 的结果是________，体现了子类与父类的 isinstance 关系。
61. 查看类 C 的方法解析顺序可访问 C.________（属性）。
62. 把方法包装为属性用装饰器________；定义其赋值行为用 @属性名.________。
63. 实现不可变对象（如所有属性只读）最简单的方式是使用 @dataclass 的________参数（填 True）。
64. 对象作为字典键必须同时定义________与________两个魔术方法。
65. 运算符 obj1 < obj2 调用魔术方法________；obj1 + obj2 优先调用________，不存在则找 __radd__。
66. class Foo: 中 Foo 是 type 的实例，因此说 type 是所有类默认的________。
67. 模块被首次导入后会缓存在 sys.________ 中，再次导入不会重新执行。
68. 当前脚本的搜索路径列表保存在 sys.________，可临时插入自定义路径。
69. 列出已安装第三方包及其版本的命令是 pip ________。
70. from utils import helper as h 中 as 的作用是________。
71. Python 3.3+ 允许目录不含 __init__.py 而成为________包（用于多版本混合安装等场景）。
72. 在函数内部延迟导入（把 import 写进函数体）常用于解决________导入问题和减少启动开销。
73. Python 中所有异常的最终基类是________。
74. 获取异常信息的语句是 except ValueError________e:（填介词）。
75. 重新抛出当前异常（保持堆栈）使用不带参数的________语句。
76. 打开不存在的文件抛________异常；除零抛________异常。
77. 异常链中，当前异常的直接原因保存在________属性（由 raise ... from 设置）。
78. Python 3.11+ 中并发任务批量失败用________（类型）打包多个异常，配合 except* 分支分别处理。
79. 打开文件使用 with 语句的目的是确保文件在使用结束后自动________。
80. 以二进制追加模式打开文件的 mode 字符串是________。
81. json 模块中，把字典写入文件用 json.________，从文件读出用 json.________。
82. pathlib 中表示当前目录的是 Path.________，返回当前工作目录的是 Path.________。
83. f.readlines() 返回________，而 list(f) 也能得到类似结果（每行含换行符）。
84. 在 CSV 写入时若希望 Excel 正确识别 UTF-8 中文，encoding 常指定为________。
85. 按列名读取 CSV 每行为字典，应使用 csv.________ 类。
86. 生成加密安全随机令牌应使用________模块而不是 random 模块。
87. 把时间字符串 "2026-09-27 20:00:00" 解析为 datetime 用 datetime.________(s, "%Y-%m-%d %H:%M:%S")。
88. 返回对象的可打印表示并用于调试的内置函数是________（与 str 相对）。
89. itertools.chain([1], [2, 3]) 的结果是依次产出 1, 2, 3，即把多个可迭代对象________成一个。
90. 计算两个日期相差天数：end - start 得到 timedelta，其属性 ________ 是总天数。
91. 正则中匹配任意单个字符（除换行）的元字符是________。
92. 量词 + 表示前面的元素出现________次或更多。
93. 非贪婪匹配在量词后追加________符号。
94. 命名分组语法 (?P<name>pattern) 中，取值用 m.group(________)。
95. 让点号匹配换行符的编译标志是 re.________（简写 re.S）。
96. 在字符串中写正则 r"\d+"，r 前缀的作用是________。
97. 查看对象引用计数的函数是 sys.________（CPython 特有）。
98. 递归深拷贝使用模块 copy 的________函数。
99. 浅拷贝列表的两种等价写法：lst.copy() 与 lst[________]。
100. 处理循环引用的垃圾收集器按对象“存活时间”分为________代，新建对象在第 0 代。
101. 小整数缓存的默认范围是________到________。
102. 默认参数可变值的正确规避写法：def f(x, lst=________): 然后 lst = ________ if lst is None else lst。
103. 启动线程的语句：t = threading.Thread(target=________, args=(1,)); t.________()。
104. asyncio 启动事件循环运行主协程的入口函数是 asyncio.________（3.7+）。
105. 多进程中创建进程池并映射任务的标准写法：with multiprocessing.________(4) as pool: results = pool.________(func, data)。
106. 协程中把耗时同步函数交给线程执行以避免阻塞事件循环：await asyncio.________(blocking_func, arg)。
107. 多个线程同时读写共享数据导致的错误结果称为________条件，通常用________保护临界区。
108. GIL 全称是________。
109. 表示“可能为 None 的整数”的两种注解写法：Optional[int] 与 int | ________（3.10+）。
110. Python 3.12 中定义类型别名的专用语句是________（如 type Vector = list[float]）。
111. 3.10 引入的结构化模式匹配语句关键字是 match 与________。
112. 海象运算符的符号是________。
113. Python 3.14 引入的模板字符串使用前缀________（如 t"<b>{value}</b>"）。
114. PEP 649 使类型注解的求值变为________（deferred），前向引用不再需要引号。
115. 判断对象是否为 None 的正确写法是 x ________ None（填运算符）。
116. 遍历字典同时修改（增删键）会抛________异常，安全做法是遍历 ________(d) 的副本。
117. 字符串数字比较 "10" < "9" 的结果是________（True/False），因为按________比较。
118. str 与 bytes 互转：s.encode("utf-8") 得到________，b.decode("utf-8") 得到________。
119. 浮点数相等判断应使用 math.________(a, b) 而不是 ==。
120. 函数参数传可变对象（如 list）时函数内的修改会影响调用方，这种现象称为________传递（按对象引用传值）。

## 三、简答题（20 题）

1. 简述解释型语言与编译型语言的区别，并说明 CPython 执行 Python 代码的大致流程。
2. 简述 == 与 is 的区别，并解释为什么 256 is 256 为 True 而 257 is 257 可能为 False（交互式分行输入时）。
3. 列举 Python 中字符串格式化的三种主要方式并比较优劣。
4. 比较列表与元组，并说明各自典型的使用场景。
5. 分别说明 dict 与 set 的底层实现及各自适用的典型场景。
6. 说明 for...else 语法的作用并给出一个典型使用场景。
7. 解释 LEGB 作用域规则并举例说明 Enclosing 作用域。
8. 编写一个带参数的重试装饰器说明“三层结构”，并说明每层职责。
9. 解释生成器为什么省内存，并说明什么场景下应避免使用生成器。
10. 比较实例方法、类方法、静态方法的定义与适用场景。
11. 解释 C3 线性化与菱形继承问题，Python 如何解决。
12. 说明 python file.py、python -m module、import module 三种方式下 __name__ 与 __main__ 的关系及入口代码放置建议。
13. 解释 EAFP 与 LBYL 两种编程风格，并说明 Python 社区的偏好。
14. 比较文本模式与二进制模式的区别，并说明分别适用的场景。
15. 说明 collections 模块中 defaultdict、Counter、deque、namedtuple 各自的典型使用场景。
16. 说明贪婪与非贪婪匹配的差异，并举例说明回溯导致的性能问题（灾难性回溯）。
17. 解释“变量是名字绑定”与“赋值即引用”模型，并说明它如何同时解释默认参数陷阱与浅拷贝问题。
18. 比较 threading、multiprocessing、asyncio 三种并发模型的原理、适用场景与注意事项。
19. 梳理 Python 3.8 到 3.14 每个版本一个代表性特性。
20. 总结 Python 初学者最常见的 5 个坑及规避方法。

## 四、实战操作题（20 题）

1. 编写脚本 demo.py：打印 Hello, Python! 以及当前 Python 版本号，并演示注释与多行字符串的用法。
2. 编写程序：打印 2 的 1 到 10 次幂，并计算 10 除以 3 的商、余数与精确浮点值（各占一行）。
3. 编写程序：给定 s = "  Python is FUN  "，依次输出去空格后、全小写、按空格切分为列表、以 - 连接的结果。
4. 编写程序：用列表推导式生成 1~100 中所有能被 3 整除但不能被 5 整除的数，输出其数量与最后 5 个数。
5. 统计字符串 "apple banana apple cherry banana apple" 中每个单词出现次数，输出次数最多的单词及其次数（用普通 dict 与 collections.Counter 各实现一次）。
6. 用 while 循环实现：不断让用户输入数字，输入空行结束，最后打印所有数字的平均值（保留两位小数）；若一个数都没输入则打印 N/A。
7. 编写函数 avg(*args)：接收任意多个数字返回平均值，无参数时返回 0；再演示关键字参数版本 stats(**kw) 打印所有键值对。
8. 实现一个计时装饰器 @timer，打印函数名与执行耗时（毫秒，保留 2 位小数），并装饰一个 sleep 0.1 秒的函数验证。
9. 编写生成器 fib() 无限产出斐波那契数列（1,1,2,3,5,...），配合 itertools.islice 打印前 10 项。
10. 定义类 BankAccount：初始化余额 balance（默认 0），方法 deposit(amount)（负数抛 ValueError）、withdraw(amount)（余额不足抛 ValueError）、__str__ 显示账户余额；并演示存入 100、取出 30、打印。
11. 用 @property 实现类 Circle：radius 可读写（负数赋值抛 ValueError），area 只读属性按 3.14159*r*r 计算。
12. 创建包 mymath：__init__.py 导出 add 函数，mymath/ops.py 实现加与乘；在包外通过 from mymath import add 调用并演示 __all__ 的作用。
13. 编写 safe_div(a, b)：除零返回 None 并打印警告，其他异常原样抛出；再用自定义异常 NegativeError 处理负数输入。
14. 编写程序：把字典 [{"name": "张三", "score": 90}, {"name": "李四", "score": 85}] 写入 students.json，再读回打印；用 pathlib 定位当前目录。
15. 用标准库完成：解析当前时间并输出 "YYYY-MM-DD HH:MM"；计算 7 天后的日期；把指定时间戳 1700000000 转为本地 datetime。
16. 从文本 logs = "2026-09-27 ERROR disk full; 2026-09-28 INFO ok" 中提取所有 (日期, 级别, 消息) 三元组并打印。
17. 演示浅拷贝与深拷贝差异：nested = [1, [2, 3]]，分别做 shallow = nested.copy() 与 deep = copy.deepcopy(nested)，修改内层列表后打印三者。
18. 用 ThreadPoolExecutor 并发请求三个 URL（用函数 fetch(url) 模拟耗时），打印每个结果与总耗时；再给出 asyncio 版本要点。
19. 用现代类型注解定义函数 top_n(items: list[tuple[str, int]], n: int = 3) -> list[tuple[str, int]]：返回按第二项降序的前 n 条，并用 match 语句对返回结果做空/非空分支打印。
20. 编写程序找出并修复下面代码的 3 个 bug：
def average(nums=[]):
    total = 0
    for n in nums:
        total = total + n
    return total / len(nums)
print(average([1, 2, 3]))
print(average())
