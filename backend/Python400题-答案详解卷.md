# Python 400 题 · 答案详解卷

> 共 400 题。每题包含：答案、详细说明、【衍生知识点】拓展。
> 本文件与《Python知识点总结与400题-题目卷.md》配套，可直接在刷题系统“导入题库 → Markdown 文件导入”中使用。

## 基础语法与环境 · 答案与解析

1. **B**Python 是解释型高级语言：CPython 先把源码编译为字节码，再由 Python 虚拟机（PVM）逐条解释执行，不需要生成独立的机器码可执行文件。同时它是动态类型语言（变量无需声明类型）和强类型语言（不会隐式把 "1"+1 混算）。【衍生知识点】Python 3.13 起提供实验性 JIT 编译器，Python 3.14 的官方二进制已包含实验性 JIT，但整体仍以解释执行为主。
2. **B**变量名只能由字母、数字、下划线组成，且不能以数字开头，也不能使用关键字。"2var" 以数字开头，非法。【衍生知识点】Python 变量名区分大小写（Var 与 var 是两个变量）；惯例上普通变量用小写下划线风格（snake_case），类名用大驼峰（PascalCase）；以双下划线开头并结尾的名称（如 __init__）是魔术方法保留命名。
3. **B**Python 2 中 print 是语句，Python 3 中改为内置函数，必须写成 print(...)，可使用 sep、end、file 等关键字参数。【衍生知识点】print(end="") 可取消换行；print(..., flush=True) 可立即刷新输出缓冲区，在写日志或进度条时很有用。
4. **B**Python 使用缩进划分代码块（同一块必须左对齐），官方惯例是 4 个空格，禁止 Tab 与空格混用，否则抛出 TabError/IndentationError。【衍生知识点】缩进即语法的设计强制了代码可读性；编辑器中建议设置 Tab 键自动转换为 4 空格；PEP 8 还建议顶层函数与类定义之间空两行。
5. **B**这是链式赋值，等价于 y = 10; x = y，两个名字绑定到同一个 int 对象。对小整数而言由于整数缓存，二者 id 相同。【衍生知识点】对可变对象要小心链式赋值：a = b = [] 会让 a 和 b 共享同一个列表，append 时相互影响，应写 a = []; b = []。
6. **B**右侧 b, a 先被打包为元组 (2, 1)，再解包赋给左侧 a, b，实现了不借助临时变量的交换。【衍生知识点】元组解包是 Python 惯用法，可扩展为 a, *rest = [1,2,3]（星号收集），以及函数返回多个值本质上就是返回元组再解包。
7. **B**this 是内置彩蛋模块，import 后输出《The Zen of Python》（Python 之禅），如 Beautiful is better than ugly、Simple is better than complex 等 19 条设计哲学。【衍生知识点】Python 之禅体现了 Python 的设计取向：可读性至上（Readability counts）、显式优于隐式（Explicit is better than implicit），这些原则直接反映在语言特性上。
8. **B**Python 以 # 开头表示单行注释；文档字符串（docstring）用三引号书写，虽不是严格意义的注释，但惯例上用于模块、函数、类的说明并可通过 __doc__ 访问。【衍生知识点】注释应解释"为什么"而不是"做了什么"；工具 pydoc、help() 以及 Sphinx 文档生成都依赖 docstring。
9. **C**eval 是内置函数（动态求值字符串表达式），不是关键字；pass、lambda、yield 都是关键字。可用 keyword.kwlist 查看全部关键字（Python 3.12 起共 35 个，另加 soft keyword match/case/type 等）。【衍生知识点】Python 3.10 引入的 match...case 中 match 与 case 是"软关键字"，仍可作变量名；查看关键字可用 import keyword; print(keyword.kwlist)。
10. **B**脚本被直接运行时 __name__ 为 "__main__"，被导入为模块时 __name__ 是模块名，因此该判断可以让文件既能作为模块复用、又能直接执行测试代码。【衍生知识点】这是 Python 程序入口的惯用法，等价于其他语言的 main；配合 -m 参数运行模块（python -m package.module）时 __name__ 同样是 "__main__"。
11. **D**退出 REPL 可用 exit()、quit() 或 Ctrl+D（Linux/macOS）/ Ctrl+Z 回车（Windows），无需关闭终端。A、B、C 均为 REPL 的标准行为。【衍生知识点】Python 3.13 起默认 REPL（PyREPL）支持多行编辑、语法高亮和历史浏览；Python 3.14 REPL 高亮进一步增强。IPython 提供更强大的替代（Tab 补全、? 查看帮助、%magic 魔法命令）。
12. **B**PEP 8 规定每级缩进用 4 个空格，禁止 Tab 与空格混用；还建议每行不超过 79 字符（代码）/72 字符（docstring）。【衍生知识点】PEP 8 是 Python 官方风格指南，配套工具 autopep8、black、flake8、ruff 可自动格式化与检查；现代项目常用 black（不妥协格式化）+ ruff（高速 linter）。
13. ****>>> / \>\>\>**。**主提示符 >>> 表示等待输入新语句，续行提示符为 ...。【衍生知识点】在 REPL 中输入不完整的代码块（如 for 循环头）按回车会进入 ... 续行模式；Python 3.13+ 的 PyREPL 支持在此模式下语法高亮。
14. ****python --version / python -V / python3 --version / python3 -V / py --version**。**python --version 或短参数 python -V（注意大写 V）会打印如 Python 3.13.12 的版本信息。【衍生知识点】在脚本内部可用 sys.version、sys.version_info 或 platform.python_version() 获取版本；sys.version_info >= (3, 10) 可做版本判断。
15. ****UTF-8 / utf-8 / utf8**。**PEP 3120 规定 Python 3 源文件默认 UTF-8 编码，因此源码中可直接写中文，无需像 Python 2 那样声明 # -*- coding: utf-8 -*-。【衍生知识点】如确需其他编码，可在文件第一行（或第二行）写编码声明；读写文件时的默认编码取决于 locale（Windows 下可能是 GBK），跨平台建议显式传 encoding="utf-8"。
16. ****b, a / (b, a)**。**右侧元组 (b, a) 先求值打包，再解包赋值，完成交换。【衍生知识点】解包要求左侧变量数与右侧元素数一致，否则 ValueError；星号表达式 *mid 可以收集任意多个中间元素。
17. ****int / <class 'int'> / 整数**。**Python 3 的 int 是任意精度整数，不会像 C/Java 那样溢出。【衍生知识点】type() 返回类型对象；更推荐用 isinstance(x, int) 判断类型，因为它支持子类判定；Python 中一切皆对象，int 也是类。
18. ****1, 2**。**print 的 sep 参数指定多个参数之间的分隔符，默认是空格；end 参数指定结尾，默认换行 \n。【衍生知识点】print(*items) 可解包打印；f-string 逐渐取代 print 格式化：print(f"{a}, {b}")。
19. **参考答案**：
   编译型语言（如 C/C++）在运行前由编译器一次性把源码编译成目标平台的机器码，运行快但需针对平台重新编译；解释型语言由解释器逐句读取并执行，跨平台性好、开发迭代快，但运行速度通常较慢。CPython 执行流程：源码 .py → 词法/语法分析生成 AST → 编译为字节码（.pyc 缓存在 __pycache__）→ PVM 逐条解释执行字节码。【衍生知识点】.pyc 只针对被导入的模块生成，主脚本不缓存；Python 3.13 引入实验性 JIT（复制与删除式 JIT），3.14 官方二进制内置实验 JIT，可按需开启以加速热点代码。
   【解析】理解执行模型有助于理解性能优化与 .pyc 缓存。
20. **参考答案**：
   import sys
   print("Hello, Python!")   # 单行注释：打印问候语
   print("Python 版本:", sys.version_info[:3])
   
   """
   这是文档字符串（三引号字符串），
   常用于模块/函数说明。
   """
   运行：python demo.py，输出 Hello, Python! 与 (3, 13, 12) 形式的版本三元组。
   【解析】sys.version_info 是命名元组，[:3] 取 (major, minor, micro)。

## 数据类型与运算符 · 答案与解析

21. **B**Python 3 中 / 是真除法，永远返回 float，3/2 = 1.5；Python 2 中整数相除会截断。想要整数商应使用 //。【衍生知识点】/ 与 // 的区分是 Python 2→3 的著名不兼容变更；from __future__ import division 可让 Python 2 也采用真除法。
22. **B**// 是地板除（floor division），结果向下取整：-7/2 = -3.5，向下取整为 -4。正数方向 7//2=3。【衍生知识点】配套的 % 也按地板规则：-7 % 2 = 1（因为 -4*2+1=-7），所以 Python 中 a % b 的符号跟随除数 b，这与 C 语言不同；math.floor() 与 math.trunc() 的区别也源于此。
23. **C**** 是幂运算符，2**10 = 1024。幂运算符优先级高于单目取负，且满足右结合：2**3**2 = 2**(3**2) = 512。【衍生知识点】pow(2, 10) 等价；pow(2, 10, 1000) 可做模幂（等价 2**10 % 1000），在大数加密运算中常用；math.pow() 总是返回 float。
24. **B**空容器（[]、{}、set()、""、()）、0、0.0、0j、None 的布尔值为 False；非空字符串 "0"、非零数都是 True。【衍生知识点】自定义类可通过 __bool__（或 __len__）控制真假值；if items: 是 if len(items) > 0 的惯用写法。
25. **B**== 比较值相等（调用 __eq__），两个内容相同的列表相等；is 比较对象身份（同一内存地址），a 与 b 是两个不同对象。【衍生知识点】判断 None 惯用 x is None 而非 ==；小整数（-5~256）与短字符串因缓存/驻留会出现 is 为 True 的巧合，不能依赖。
26. **D**bin() 返回二进制字符串，带 0b 前缀。类似地 oct() 返回 0o 前缀八进制、hex() 返回 0x 前缀十六进制。【衍生知识点】反向转换：int('0b1010', 2)、int('0x1a', 16) 或 int('1a', 16)；f-string 格式化可免前缀输出：f"{10:b}"、f"{255:x}"。
27. **B**1+2j 是复数字面量（j 表示虚部），类型为 complex，实部 .real、虚部 .imag，支持 abs()、共轭 .conjugate() 等运算。【衍生知识点】Python 原生支持复数使科学计算方便；cmath 模块提供复数域的三角/指数函数；虚数单位用 j 而非 i，源于工程惯例。
28. **B**IEEE 754 二进制浮点无法精确表示 0.1 与 0.2，相加得到 0.30000000000000004，与 0.3 不相等。【衍生知识点】浮点比较应使用 math.isclose(a, b) 或 abs(a-b) < 1e-9；需要精确十进制运算（如金额）用 decimal.Decimal；fractions.Fraction 可做精确分数运算。
29. **B**** 优先级高于 *，先算 2**3=8，再乘 2 得 16。【衍生知识点】常见优先级从高到低：() > ** > 一元 +- > * / // % > + - > 比较 > not > and > or；拿不准时加括号是最稳妥的写法。
30. **B**Python 支持链式比较，1 < 2 < 3 会展开为 (1 < 2) and (2 < 3)，中间值 2 只求值一次，结果为 True。【衍生知识点】链式比较可读性高：0 <= x <= 100 是惯用边界判断；注意左侧不会是布尔与数字比较，Python 不把 True 当 1 参与链式比较的第一环。
31. **C**tuple、数字（int/float/complex）、字符串 str、frozenset、bytes 是不可变类型；list、dict、set、bytearray 是可变类型。不可变对象可作字典键或集合元素。【衍生知识点】元组本身不可变，但其中的可变元素（如列表）内容仍可修改；frozenset 是 set 的不可变版本；bytes 与 bytearray 的关系同理。
32. **B**对可变序列，+= 调用 __iadd__ 原地扩展并返回自身；+ 调用 __add__ 创建新列表。因此作为函数默认参数或闭包变量时二者行为可能不同。【衍生知识点】同理 lst.extend([1]) 原地、lst + [1] 新建；对不可变类型（int、str、tuple），+= 等价于先加后重新绑定，二者无差别。
33. ****4**。**// 地板除向下取整，9/2=4.5 → 4。【衍生知识点】取商和余数可用内置 divmod(9, 2) 一次性返回 (4, 1)，在循环分页等场景很方便。
34. ****0b / 0B**。**二进制 0b、八进制 0o、十六进制 0x；十进制无前缀。【衍生知识点】不同进制只是整数的书写形式，值相同：0b1010 == 0o12 == 0xA == 10；格式化输出可用 format(n, 'b')。
35. ****255**。**int(str, base) 按 base 进制解析字符串，ff(十六进制) = 255。【衍生知识点】base 可为 2~36；int("0xff", 16) 也可（带前缀允许）；反向可用 format(255, "x") 得 "ff"。
36. ****int / 整数**。**bool 继承自 int，True 等于 1、False 等于 0，可参与算术运算。【衍生知识点】统计列表中真值个数可用 sum(map(bool, lst))；isinstance(True, int) 为 True 而 isinstance(1, bool) 为 False。
37. ****3.5 / 3.5**。**abs() 返回绝对值，对 int、float、complex（返回模）都有效。【衍生知识点】round(3.14159, 2) 四舍五入到指定小数位（实际是银行家舍入，round(2.5)=2）；math.ceil/math.floor 分别向上/向下取整。
38. ****True**。**not 优先级高于 or，先算 not True = False，再算 False or True = True。【衍生知识点】and、or 是短路运算且返回操作数本身：0 or "x" 得 "x"，"" and 1/0 不会报错，这一特性常用于设默认值 name = name or "guest"（更推荐写法是 name or "guest" 配合明确语义）。
39. **参考答案**：
   == 比较“值”是否相等（调用对象的 __eq__ 方法）；is 比较“身份”，即两个名字是否指向同一个对象（等价于 id(a) == id(b)）。CPython 为提升性能对小整数 [-5, 256] 做了预先缓存，字面量 256 在解释器中引用同一缓存对象，故 is 为 True；而 257 超出缓存范围，两行语句各自创建新 int 对象，id 不同，is 为 False。【衍生知识点】这一缓存属于实现细节（不同实现/编译方式结果可能不同），编程中判断值相等一律用 ==，判断 None/True/False 等单例才用 is；同理还有字符串驻留（interning）机制。
   【解析】== 值比较、is 身份比较；小整数缓存是常见面试考点。
40. **参考答案**：
   for i in range(1, 11):
       print(f"2**{i} = {2 ** i}")
   print("商:", 10 // 3)
   print("余数:", 10 % 3)
   print("真除法:", 10 / 3)
   输出 2、4、8...1024；商 3、余数 1、真除法 3.3333333333333335。
   【解析】也可用 divmod(10, 3) 同时获得 (3, 1)；浮点结果不精确是 IEEE 754 的正常表现。

## 字符串 · 答案与解析

41. **A**切片 [start:stop) 左闭右开，索引从 0 开始，s[1:4] 取索引 1、2、3 的字符即 "ell"。【衍生知识点】切片语法 s[start:stop:step]；step 为负可反转字符串 s[::-1]；越界不报错而是截断，s[1:100] 得 "ello"。
42. **C**字符串是不可变类型，不能按下标赋值，会抛 TypeError: 'str' object does not support item assignment。拼接、重复、读取都合法。【衍生知识点】要“修改”字符串需生成新串：s[:0] + "x" + s[1:]，或先转 list 再 join；大量拼接应用 "".join(list) 而不是循环 +=，后者是 O(n²)。
43. **A**f-string（格式化字符串字面量）支持 mini-language：.2f 表示保留两位小数。f-string 在 Python 3.6 引入，是最快、最可读的格式化方式。【衍生知识点】常用格式：{:>10} 右对齐、{:^10} 居中、{:,} 千分位、{:%} 百分比、{!r} 调用 repr；Python 3.12 起 f-string 支持嵌套同引号，3.14 引入模板字符串 t-string（PEP 750）用于安全的自定义字符串处理。
44. **B**split() 不带参数时按任意空白切分并自动去多余空白；split(" ") 则按单个空格切分。【衍生知识点】splitlines() 按行切分；rsplit 从右切分可限制次数；"-".join(parts) 是 split 的逆操作。
45. **A**title() 把每个单词首字母大写；capitalize() 只把整串第一个字符大写、其余变小写。【衍生知识点】相关方法还有 upper()/lower()/swapcase()/casefold()（casefold 比 lower 更适合多语言大小写折叠比较，如德语 ß→ss）。
46. **A**strip() 去除两端空白（默认空格、\t、\n 等）；lstrip/rstrip 只处理单侧。注意 strip 只去两端，不处理中间空白。【衍生知识点】strip("xy") 可指定字符集合："xabcx".strip("x") 得 "abc"；处理用户输入时 line.strip() 是防手滑空格的惯用法。
47. **B**二者都返回子串首次出现的下标（此处为 2），差别只在找不到时的行为：find 返回 -1，index 抛 ValueError。【衍生知识点】类似的成对方法还有 list 的 index/remove 与 dict 的 []/get；rfind/rindex 从右往左找；判断包含关系直接用 "th" in s 更 Pythonic。
48. **A**str 不可变，所有“修改类”方法（upper、replace 等）都返回新字符串，原对象不变；B、D 对字符串非法，str 没有 append 方法。【衍生知识点】replace 默认替换全部，可指定次数："aaa".replace("a", "b", 2) 得 "bba"；验证是否发生替换可比较新串与原串。
49. **B**split 指定分隔符时不跳过空字段，连续分隔符会产生空字符串元素。【衍生知识点】想过滤空字段可写成 [p for p in s.split(",") if p]；csv 模块处理真正的 CSV 更稳妥（可处理引号内逗号）。
50. **A**ord() 取字符的 Unicode 码点（A 是 65），chr() 把码点转回字符。【衍生知识点】中文字符同样适用：ord("中") = 20013；字符串比较本质是按码点比较；大小写转换即码点偏移 ord("a") - ord("A") = 32。
51. **C**str 不可变，+= 每次都分配新串并复制，累计 O(n²)；join 先计算总长度一次性分配，O(n)。【衍生知识点】CPython 对 s += x 有原地优化特例，但依赖实现细节不可依赖；最佳实践：先收集到 list 再 "".join。
52. **A**startswith/endswith 判断前缀/后缀，返回布尔值，还可传元组同时匹配多个：s.endswith((".jpg", ".png"))。【衍生知识点】这两个方法在文件类型判断、路由匹配中常用；相比 s[:2] == "py" 更清晰且不怕越界。
53. ****nohtyp**。**步长 -1 表示从右往左逐个取字符，实现字符串反转。【衍生知识点】反转列表同理 lst[::-1]；也可以用 "".join(reversed(s))；切片不修改原对象（字符串本就不可变）。
54. ****hello**。**lower() 返回全小写的新字符串。【衍生知识点】比较用户名/邮箱时先 lower 或 casefold 再比较是标准做法；中文无大小写，lower 返回原串副本。
55. ****name=1**。**自描述表达式 {expr=} 会输出 "expr=" 加 repr(expr)，调试打印非常方便。【衍生知识点】f"{value:.2f}" 可加格式规格；f"{now:%Y-%m-%d}" 可直接格式化日期对象。
56. ****['1', '2', '3'] / ['1','2','3']**；**1,2,3**。**split 按分隔符切成列表，join 把字符串序列用分隔符连接成新串。【衍生知识点】join 只接受字符串序列，含数字时要先 map(str, lst) 转换。
57. ****abc**。**strip 默认去除两端所有空白字符（含空格、\t、\n、\r）。【衍生知识点】去除所有内部空白可用 "".join(s.split())；split() 无参调用也会按任意空白切分。
58. ****2**。**len 按字符（Unicode 码点）计数，不是按字节；UTF-8 下"中国"占 6 字节但字符数为 2。【衍生知识点】涉及 emoji（代理对/组合字符）时 len 可能不符合直觉，如 len("👨‍👩‍👧") 是 5；处理用户可见字符数需用 grapheme 库或 unicodedata。
59. **参考答案**：
   1) % 格式化："%s=%d" % (k, v)，继承自 C，可读性差、易出错，属旧式写法；2) str.format()："{}={}".format(k, v)，支持索引/关键字与格式规格，3.0 起引入；3) f-string：f"{k}={v}"，3.6 起引入，表达式内插、编译期求值、性能最好、最可读，是当前首选。【衍生知识点】Python 3.14 又加入模板字符串 t-string（PEP 750）：t"...{value}..." 产生的 Template 对象不立即拼接，而是交给处理函数做转义/防注入，适合 HTML、SQL 等场景。
   【解析】格式化三式对比是高频面试题；新项目统一用 f-string。
60. **参考答案**：
   s = "  Python is FUN  "
   t = s.strip()
   print(t)                # Python is FUN
   print(t.lower())        # python is fun
   print(t.split())        # ['Python', 'is', 'FUN']
   print("-".join(t.lower().split()))  # python-is-fun
   预期输出四行，最后一行为 python-is-fun。
   【解析】strip → lower → split → join 是清洗用户输入的经典链式组合。

## 列表与元组 · 答案与解析

61. **B**append 把参数整体作为一个元素追加到末尾；想逐个并入应使用 extend 或 +=。【衍生知识点】append 是 O(1)（均摊），insert(0, x) 是 O(n)；批量并入中 extend(iterable) 比 append 循环更快，CPython 会预分配容量。
62. **B**append 原地修改并返回 None；+ 与 sorted 返回新列表；lst[:] 是浅拷贝。【衍生知识点】in-place 方法（append/sort/reverse/extend）按惯例返回 None，这正是写成 lst = lst.sort() 会得到 None 的原因；sorted() 与 list.sort() 的关系同理。
63. **B**list.sort() 是原地方法（返回 None，惯例）；sorted() 是内置函数，接受任何可迭代对象并返回新列表，原对象不变。【衍生知识点】两者都支持 key 与 reverse 参数：sorted(lst, key=len, reverse=True)；多级排序用 key=lambda x: (x[0], -x[1])；稳定排序（Timsort）保证相等元素保持原相对顺序。
64. **A**[1:4) 取索引 1~3；负索引 -2 表示倒数第二个元素，[-2:] 取最后两个。【衍生知识点】常用技巧：lst[:] 复制列表、lst[::-1] 反转、del lst[1:3] 切片删除；len(lst) 为 n 时 lst[n:] 得空列表而不报错。
65. **B**b = a 只是复制引用，两个名字指向同一列表对象，因此通过 b 的修改对 a 可见。【衍生知识点】想要独立副本：浅拷贝 a.copy()/a[:]/list(a)（仅复制第一层），嵌套结构需深拷贝 copy.deepcopy(a)；这是 Python 最常见的坑之一。
66. **B**remove(x) 只删除第一个值为 x 的元素，不存在时抛 ValueError。【衍生知识点】按索引删除用 pop(i)（默认删末尾并返回该元素）或 del lst[i]；清除全部匹配：lst = [x for x in lst if x != 2]；判断存在用 in 运算符。
67. **C**(5) 只是带括号的整数 5，单元素元组必须写 (5,)（逗号是关键）。A、B、D 均正确，元组字面量甚至可以省略括号。【衍生知识点】单元素元组的逗号陷阱是经典考点：type((1)) 是 int、type((1,)) 是 tuple；函数返回单值加逗号会意外变成元组。
68. **A**带星号的变量收集中间元素为一个列表，两侧普通变量各取一个。【衍生知识点】解包中带 * 的变量总是得到 list，且每侧只能有一个；*b 也可用于函数调用解包：print(*[1,2,3]) 即 print(1, 2, 3)。
69. **A**range(5) 为 0~4，if 过滤出偶数 0、2、4，再平方得 [0, 4, 16]。【衍生知识点】推导式优于等价的 for+append（更快且意图清晰）；还有字典推导 {k: v for ...}、集合推导、生成器表达式 (x*x for x in ...)；双重循环推导 [x+y for x in a for y in b] 相当于嵌套 for。
70. **A**range(start, stop, step) 左闭右开且不含 stop，从 1 起步长 3 到 10 之前：1, 4, 7。【衍生知识点】range 是惰性序列对象，支持负步长 range(5, 0, -1)；range 支持 in 判断与索引，但不是列表；空 range 不报错。
71. **B**zip 按最短的序列截断（strict=False 默认）。【衍生知识点】zip(it1, it2, strict=True)（3.10+）长度不齐时报 ValueError；zip(*matrix) 可实现矩阵转置；itertools.zip_longest 用 fillvalue 补齐。
72. **C**不可变使元组可哈希（可作 dict 键、集合元素）、可安全地在多线程间共享、内存布局更紧凑。【衍生知识点】函数多返回值、常量记录（坐标、RGB）优先用元组；namedtuple/dataclass(frozen=True) 是带字段名的升级版；CPython 对常量元组还有编译期缓存优化。
73. ****30**；**[10, 20]**。**pop() 不带参数删除并返回最后一个元素。【衍生知识点】pop(0) 删除首元素但是 O(n)，队列场景应使用 collections.deque 的 popleft()（O(1)）。
74. ****[0, 0, 0]**；**影响**。**[[0]*3]*2 的两行是同一个列表对象的两个引用，改一行另一行跟着变。【衍生知识点】正确创建二维列表：[[0]*3 for _ in range(2)]，每行独立；乘法复制引用对不可变元素（int）无害，对可变元素（list）是经典陷阱。
75. ****[3, 2, 1]**。**sort 原地降序排序，reverse=True 表示降序。【衍生知识点】对字符串列表按长度排序：lst.sort(key=len)；多条件排序 key=lambda x: (x.age, -x.score)。
76. ****5**；**6**。**max/min/sum 是内置聚合函数，可直接作用于可迭代对象。【衍生知识点】max 搭配 key：max(words, key=len) 取最长单词；sum(range(101)) 得 5050；空序列求 max 会报 ValueError，可用 default 参数兜底。
77. ****['a', 'b', 'c'] / ['a','b','c']**。**字符串是可迭代对象，逐字符迭代。【衍生知识点】list("abc") 等价；想按空格分词用 s.split()；list(dict) 得到键列表，list(zip(a, b)) 得到配对元组列表。
78. ****合法**。**元组的不可变指“槽位不可重新绑定”，t[1] 引用的列表自身内容可以修改，修改后元组内容“看起来”变了但对象身份未变。【衍生知识点】因此含可变元素的元组不可哈希，不能作字典键——hash((1, [2])) 会抛 TypeError。
79. **参考答案**：
   相同点：都是有序序列，支持索引、切片、迭代、len 等。不同点：1) 可变性——列表可增删改，元组不可变；2) 可哈希性——元组（含不可变元素时）可作字典键/集合成员；3) 内存与性能——元组更紧凑、创建更快；4) 语义——列表表示“同类多个元素的可变集合”，元组表示“结构固定的异构记录”。场景：动态集合、栈/队列用列表；坐标、数据库行、函数多返回值、字典复合键用元组。【衍生知识点】collections.namedtuple 与 typing.NamedTuple 让元组具备字段名；标准库内部大量用元组传递固定结构数据。
   【解析】列表=可变集合，元组=不可变记录，语义优先。
80. **参考答案**：
   nums = [x for x in range(1, 101) if x % 3 == 0 and x % 5 != 0]
   print(len(nums))   # 27
   print(nums[-5:])   # [63, 66, 69, 72, 78]
   共 27 个，最后 5 个为 [63, 66, 69, 72, 78]。
   【解析】切片 nums[-5:] 取末尾 5 个元素；推导式内多个条件用 and 连接。

## 字典与集合 · 答案与解析

81. **C**下标访问缺失键抛 KeyError；get() 默认返回 None，可指定默认值 d.get("b", 0)。【衍生知识点】get 适合“可有可无”的读取；setdefault(k, default) 则在缺失时写入默认值并返回；Python 3 的 collections.defaultdict(list) 可自动初始化，分组统计时最简洁。
82. **C**字典的键必须可哈希（hashable）。列表与 set、dict 都不可哈希；字符串、数字、元组（含不可变元素）均可。【衍生知识点】frozenset 是可哈希的集合版本，可作键；自定义类的实例默认按 id 哈希，重写 __hash__ 与 __eq__ 可自定义键语义。
83. **B**从 3.7 起（3.6 为实现细节）字典保持插入顺序，这是语言规范的一部分。【衍生知识点】需要“按访问顺序淘汰”的缓存语义可用 collections.OrderedDict 的 move_to_end；字典保持顺序是靠紧凑哈希表实现，也因此比 3.5 之前更省内存。
84. **B**update 用新字典更新：存在的键覆盖值（b→3），不存在的键新增（c）。【衍生知识点】合并字典的惯用法：{**d1, **d2}（后者覆盖前者）或 Python 3.9+ 的 d1 | d2（|= 原地更新）。
85. **B**这是字典推导式，生成键为 x、值为 x² 的字典。【衍生知识点】集合推导式写作 {x**2 for x in range(4)} 得 {0,1,4,9}（无序去重）；推导式统一语法：表达式 for 变量 in 可迭代 if 条件。
86. **B**items()/keys()/values() 返回视图对象（view），与原字典联动且支持 len、in；遍历时可多次迭代（视图可迭代且非一次性）。【衍生知识点】Python 2 的 items() 返回快照列表，大数据量改用 iteritems（Python 3 中 items 本身高效）；需要快照时用 list(d.items())。
87. **A**& 交集、| 并集、- 差集（属于 s1 不属于 s2），另有 ^ 对称差（{1,4}）。【衍生知识点】运算符版本要求两侧都是集合，方法版本 s1.intersection(任意可迭代) 更通用；子集判断 s1 <= s2 或 s1.issubset(s2)。
88. **A**集合与字典基于哈希表实现，成员判断平均 O(1)（最坏退化 O(n)），这正是去重与查找首选 set 的原因。【衍生知识点】in 对 list 是 O(n)；大规模数据去重 set(lst) 远快于循环 if x not in res；哈希表以空间换时间。
89. **A**set(lst) 直接去重为 {1,2,3}，O(n)。dict.fromkeys(lst) 也能去重且保持插入顺序（3.7+），list(dict.fromkeys(lst)) 是保序去重惯用法。【衍生知识点】保序去重也可用 OrderedDict；sorted(set(lst)) 会改变为排序结果；set 会破坏原顺序。
90. **B**列表不可哈希，作为键会抛 TypeError: unhashable type: 'list'，在赋值时即校验。【衍生知识点】需要复合键可转成元组 d[(1, 2)]，或用 frozenset 表示无序组合键。
91. **B**dict.fromkeys(seq, value) 用统一默认值建字典，等价于该字典推导。【衍生知识点】fromkeys 的坑：默认值若为可变对象（如 []），所有键共享同一对象，append 会相互影响——这种情况必须用 defaultdict(list) 或推导式。
92. **B**pop(key) 删除并返回对应值，可带默认值 pop(k, None) 避免异常；del 语句只删除不返回，键不存在抛 KeyError。【衍生知识点】d.popitem() 移除并返回最后插入的键值对（3.7+）；清空用 d.clear()；浅复制 d.copy()。
93. ****3**。**集合自动去重，只剩 {1, 2, 3}。【衍生知识点】去重计数在数据分析中极常用：len(set(lst))；列表去重保序：list(dict.fromkeys(lst))。
94. ****['a', 'b'] / ['a','b']**；**[1, 2]**。**keys()/values() 返回视图，list() 转为列表。【衍生知识点】同时拿键值用 list(d.items())；解包遍历 for k, v in d.items() 是最常见字典遍历写法。
95. ****set()**。**{} 是空字典字面量，空集合只能 set()。【衍生知识点】同样地，空 frozenset 是 frozenset()；判断是否为空用 if not s: 而非 len(s) == 0。
96. ****5**；**不会**。**get 只读取，缺失时返回默认值，不影响字典内容。【衍生知识点】希望“缺失时写入”要用 setdefault("x", 5) 或 defaultdict；这是 get 与 setdefault 的本质区别。
97. ****| / 管道符**。**PEP 584 引入字典合并运算符 | 与原地更新 |=。【衍生知识点】旧写法 {**d1, **d2} 依然常用；冲突时右侧覆盖左侧。
98. ****add / s.add**。**s.add(x) 添加单个元素；update(it) 合并多个。【衍生知识点】set 没有 append（那是列表的）；删除用 remove（不存在抛异常）、discard（不存在静默）或 pop（随机弹出一个）。
99. **参考答案**：
   两者都基于哈希表：键/元素经 hash() 定位桶，平均 O(1) 完成插入、删除与查找，最坏（大量冲突）退化 O(n)。dict 存储键值对，保持插入顺序（3.7+），适合映射关系、计数、缓存、JSON 数据；set 只存元素，适合去重、成员判断（in）、集合运算（交并差）。选择原则：需要“值”用 dict，只需“存在性”用 set；小数据量差别不大，大数据量 set/dict 的 O(1) 查找远胜 list 的 O(n)。【衍生知识点】哈希表要求键可哈希且 __eq__ 一致：定义 __hash__ 的类通常同时定义 __eq__；自定义不可变值对象（如 dataclass(frozen=True)）自动获得基于字段的哈希。
   【解析】哈希表是 dict/set 的共同底座；面试常考 O(1) 与可哈希。
100. **参考答案**：
   text = "apple banana apple cherry banana apple"
   words = text.split()
   counts = {}
   for w in words:
       counts[w] = counts.get(w, 0) + 1
   print(counts)  # {'apple': 3, 'banana': 2, 'cherry': 1}
   
   from collections import Counter
   c = Counter(words)
   print(c.most_common(1))  # [('apple', 3)]
   两种方式均得 apple 出现 3 次。
   【解析】Counter 还支持 c + c2、c - c2 等多重集合运算；most_common(n) 直接取 TopN。

## 流程控制 · 答案与解析

101. **B**条件表达式（三元）形式为 A if 条件 else B，本身是表达式，可直接作为值使用：y = "big" if x > 3 else "small"。【衍生知识点】Python 3.10 起有结构化模式匹配 match...case（PEP 634），可替代复杂 if-elif 链；但 Python 没有 C 的 switch 关键字。
102. **A**range(3) 生成 0、1、2；end=" " 把默认换行改为空格。【衍生知识点】for 遍历的是可迭代对象，range 只是其中一种；遍历序列同时要下标用 enumerate(seq, start=1) 比手动维护 i 更 Pythonic。
103. **C**break 跳出当前层循环体；continue 跳过本次剩余语句直接进入下一次迭代。【衍生知识点】循环可以带 else：for...else 中 else 在循环未被 break 打断时执行，常用于“查找失败”场景；break 只跳出一层，多层退出可抛异常或封装函数 return。
104. **B**循环变量在循环结束后保留最后一次的值（3），且作用域是函数/模块级（Python 没有块级作用域）。【衍生知识点】这也是列表推导式在 3.x 中“不泄漏”变量而普通 for 会泄漏的原因；循环后使用 i 前建议确认列表非空。
105. **D**continue 只是跳到下一轮循环，无法结束 while True。break、return、抛异常、sys.exit() 都能退出。【衍生知识点】死循环+break 是事件循环/服务监听的常见结构；为避免忙等应在循环体内 sleep 或阻塞等待 I/O。
106. **B**enumerate 同时产出索引与元素，start 指定起始编号（只影响显示值，不影响位置）。【衍生知识点】等价于 zip(range(start, start+len(seq)), seq)；enumerate 返回迭代器，list() 后才能重复使用。
107. **A**case _ 是通配分支，等价于 default，通常放最后兜底。【衍生知识点】match 支持：字面量、捕获变量、序列/映射模式、类模式（如 Point(x=0, y=0)）、或模式 |、守卫 if 条件；它不是简单 switch，捕获变量如 case [x, y] 会绑定值。
108. **B**真值测试：False、None、所有数值零（0/0.0/0j）、空字符串、空容器（list/tuple/dict/set）、空 range、自定义对象的 __bool__/__len__ 返回假时均为假，其余为真。【衍生知识点】惯用法 if not lst: 判空；注意 "False"（非空字符串）为真，0.0 为假但 -0.0 也是假。
109. **A**i=1 时 continue 跳过 print，故输出 0 和 2。【衍生知识点】若换成 break，输出只有 0；把条件改到 else 分支更直观：for...else 结构中 else 只在完整跑完时执行。
110. **B**pass 是空语句占位符，保证语法完整性，常用于空函数体、待实现分支。【衍生知识点】类/函数体还可用 ...（Ellipsis）作为占位，类型存根文件（.pyi）惯用 ...；两者运行效果相同，语义上 pass 表“待实现”，... 表“类型存根/省略”。
111. **B**字符串是可迭代对象，逐字符迭代。【衍生知识点】迭代字典默认迭代键、文件对象迭代行、zip/enumerate/reversed 等包装迭代；判断对象可迭代：iter(obj) 不抛 TypeError 即可迭代。
112. **B**break 只作用于所在的那一层循环。【衍生知识点】需要一次跳出多层时，惯用方案：1) 封装成函数用 return；2) 抛出自定义异常；3) 设置标志变量；4) for...else 配合外层判断。Python 没有 labeled break。
113. ****pass**。**pass 空操作，满足语法块要求。【衍生知识点】Ellipsis（...）也能占位；抽象方法惯用 raise NotImplementedError 或 @abstractmethod 装饰 + ...。
114. ****0**；**4**。**range(5) = 0,1,2,3,4，共 5 个元素。【衍生知识点】range 支持逆序 range(5, 0, -1) 得 5,4,3,2,1（不含 0）；range(0) 为空，循环体不执行。
115. ****enumerate**。**for i, v in enumerate(lst): 同时得到索引与值。【衍生知识点】默认下标从 0 开始，enumerate(lst, 1) 可从 1 开始，适合生成编号清单。
116. ****break**。**for/while 的 else 在循环正常结束（未被 break）时执行，常用于搜索后“未找到”的提示。【衍生知识点】continue 不影响 else 的执行；try...else 的 else 在无异常时执行，二者语义类似“顺利走完才做”。
117. ****odd**。**x % 2 = 1 为真，取 if 前面的值。注意这里用余数直接作条件：偶数余 0 为假，奇数余 1 为真。【衍生知识点】三元表达式可以嵌套但建议不超过一层，复杂分支用字典映射或 match 提升可读性。
118. ****3.10 / 3.10+**。**PEP 634 结构化模式匹配在 3.10 落地，match/case 为软关键字。【衍生知识点】在旧版本写 match: 会被当作普通变量名/表达式而不报语法错（case 行除外），迁移代码时要注意兼容性判断。
119. **参考答案**：
   for...else 中，else 块在循环正常迭代完毕（没有被 break 中断）时执行。典型场景是“搜索”：在列表中查找目标，找到即 break，循环走完说明没找到，else 分支处理未找到逻辑。例如：
   for item in items:
       if item == target:
           print("找到")
           break
   else:
       print("未找到")
   【衍生知识点】while...else 同理；else 的语义可理解为“没有 break 时执行”（有教程戏称其为 nobreak）；该语法能避免额外的 found 标志变量。
   【解析】for...else 消除标志变量，是 Python 特色语法。
120. **参考答案**：
   nums = []
   while True:
       s = input("数字(回车结束): ").strip()
       if not s:
           break
       nums.append(float(s))
   if nums:
       print(f"平均: {sum(nums)/len(nums):.2f}")
   else:
       print("N/A")
   输入 1、2、3 回车结束得 平均: 2.00；直接回车得 N/A。
   【解析】while True + break 是交互输入的标准模式；f-string 的 :.2f 控制小数位。

## 函数基础 · 答案与解析

121. **A**位置多出来的 3 被 *args 收集为元组，关键字多出来的 x=4 被 **kwargs 收集为字典；b 由位置参数赋值为 2。【衍生知识点】args 一定是 tuple、kwargs 一定是 dict；调用侧 f(*lst, **d) 是反向解包；常见签名 def f(*args, **kwargs) 用于包装/转发（装饰器标配）。
122. **B**默认值在 def 执行时求值一次并绑定到函数对象，可变默认值会在多次调用间共享累积。【衍生知识点】正确写法 def f(x, lst=None): lst = [] if lst is None else lst；可用 f.__defaults__ 查看默认值；不可变默认值（int/str/None）无此问题。
123. **B**函数内的 x = 20 创建了局部变量，遮蔽（shadow）全局 x，不影响外部。【衍生知识点】要在函数内改全局变量需 global x；改闭包变量用 nonlocal；只读访问外层变量无需声明；LEGB 作用域查找顺序：Local→Enclosing→Global→Builtins。
124. **D**函数可有多个 return（分支返回），执行到第一个即结束。【衍生知识点】“返回多个值”实际是返回一个元组再解包；只有副作用不返回值的函数（如 print）返回 None，判断函数是否忘记 return 可用结果 is None 检查。
125. **B**/ 之前只能按位置传（a、b），* 之后只能按关键字传（d），中间 c 两者皆可，因此 f(1, 2, 3, d=4) 与 f(1, 2, c=3, d=4) 均合法。【衍生知识点】PEP 570 位置参数（/）让 API 设计者可以保留参数改名自由（如 max(a, b, /)）；仅关键字参数（*）强制调用方写关键字，避免布尔陷阱。
126. **A*** 对数字是乘法（6）、对字符串和列表是重复："a"*2="aa"、[1]*2=[1,1]。Python 是动态类型，函数体内不检查类型。【衍生知识点】多态靠“鸭子类型”实现：只要有 __mul__ 行为即可；编写通用函数时不应过度 isinstance 检查，靠文档与协议约定。
127. **A**lambda 创建匿名函数对象，type 是 <class 'function'>，与 def 创建的函数本质相同，只是语法上单表达式、无名字。【衍生知识点】lambda 只能写单个表达式（不能有语句）；适合作 sorted 的 key、map/filter 参数；复杂逻辑应使用 def 并命名；PEP 8 不建议把 lambda 赋值给变量名（用 def 代替）。
128. **D**docstring 保存在 __doc__，help(func) 会展示它。【衍生知识点】约定第一行简述，隔空行写详情（PEP 257）；IDE 悬浮提示、Sphinx 文档都读 docstring；__annotations__ 则保存类型注解。
129. **A****kwargs 把所有关键字参数收集为字典。【衍生知识点】参数顺序规范：def f(pos_only, /, pos_or_kw, *args, kw_only, **kwargs)； kwargs 常用于配置透传与 API 包装（如 requests 的 **options）。
130. **B**Python 中函数与普通对象地位相同：可赋值、传参、返回、放进 list/dict，这是高阶函数与装饰器的基础。【衍生知识点】函数对象带属性（f.count = 0 可做简易计数）；functools.partial 可固定部分参数生成新函数；map/filter/sorted(key=...) 都依赖一等函数。
131. **A**key=len 表示以每个元素的长度作为排序依据，升序得 ['a', 'bb', 'ccc']。【衍生知识点】key 函数比 cmp 更清晰高效；运算符模块提供 itemgetter/attrgetter/methodcaller 替代 lambda，速度更快且支持多级键。
132. **B**递归 = 问题分解为更小的同类子问题 + 终止条件；缺少终止条件会触发 RecursionError。【衍生知识点】默认递归深度约 1000（sys.getrecursionlimit()）；Python 无尾递归优化，深递归应改写为迭代或用显式栈；带缓存的递归可用 functools.cache（旧名 lru_cache）大幅加速（如斐波那契）。
133. ****global**。**global x 声明后赋值才作用于全局名字；不声明时赋值会创建局部变量。【衍生知识点】修改嵌套函数外层变量用 nonlocal（Python 3 引入）；读取外层变量不需要任何声明。
134. ****None**。**Python 函数默认返回 None。【衍生知识点】print(f()) 会显示 None；只做副作用的函数（修改可变参数、写文件）惯用隐式返回 None。
135. ****help / inspect.signature / __doc__**。**help(f) 显示签名与 docstring；inspect.signature(f) 可编程获取参数列表、默认值与类型（POSITIONAL_ONLY 等）。【衍生知识点】类型注解也可通过 f.__annotations__ 查看；Python 3.14 中注解改为延迟求值（PEP 649）。
136. ****1**。**语法上 / 只能出现一次（或不出现在参数列表中？实际规范允许一个 /）。【衍生知识点】def f(a, b, /, c, *, d) 是四种参数区域的完整示例：仅位置 / 位置或关键字 * 仅关键字 ** 收集。
137. ****15**。**lambda 同样支持默认参数；y 未传时用默认 10。【衍生知识点】lambda 还支持 *args/**kwargs：lambda *a, **k: (a, k)；但不支持注解与 docstring，需要时用 def。
138. ****TypeError / TypeError: missing required keyword-only argument**。**key 是仅关键字参数，必须写 key=1 传入，按位置传 1 会因缺失关键字参数抛 TypeError。【衍生知识点】这种设计强制调用方写出参数名，避免 bool 开关参数的顺序错误，如 open(..., encoding="utf-8")。
139. **参考答案**：
   LEGB 是变量名查找顺序：L（Local，函数内部）→ E（Enclosing，外层嵌套函数）→ G（Global，模块级）→ B（Builtins，内置名称）。内层函数可以读取外层函数的变量，这就是闭包的 Enclosing 作用域，例如：
   def outer():
       n = 10
       def inner():
           return n + 1   # 读取 outer 的 n
       return inner
   修改 Enclosing 变量需声明 nonlocal。【衍生知识点】作用域在编译期由“赋值位置”决定：函数内一旦有赋值，该名字即视为局部，即使赋值语句在读取之后也会触发 UnboundLocalError——这是常见面试坑。
   【解析】LEGB 是 Python 作用域的核心模型，闭包与装饰器都建立在 E 层之上。
140. **参考答案**：
   def avg(*args):
       return sum(args) / len(args) if args else 0
   
   print(avg(1, 2, 3))   # 2.0
   print(avg())          # 0
   
   def stats(**kw):
       for k, v in kw.items():
           print(f"{k} = {v}")
   
   stats(name="py", ver=3.13)
   输出 2.0、0、以及 name = py / ver = 3.13。
   【解析】*args 收集位置参数为元组；sum/len 组合求均值；**kwargs 收集关键字参数为字典。

## 函数高级特性 · 答案与解析

141. **A**闭包 = 内层函数 + 它引用的外层作用域变量；返回的内层函数携带对这些变量的引用（cell 对象），因此外层函数结束后变量依然存活。【衍生知识点】查看闭包变量：func.__closure__ 与 cell.cell_contents；闭包是有状态函数的轻量实现（如计数器），比类更简洁；修改外层变量必须 nonlocal。
142. **B**函数内只要对名字赋值，编译期就把该名字标记为局部；读取外层 n 后再 n += 1 会报 UnboundLocalError，nonlocal n 声明使其绑定到外层作用域。【衍生知识点】用可变容器（n = [0]; n[0] += 1）可绕过，但不推荐；global 只作用于模块层，nonlocal 找的是最近的 Enclosing 层。
143. **B**@deco 语法糖在 def 之后执行 func = deco(func)，用包装后的函数替换原名字。【衍生知识点】装饰器可以叠加（自下而上应用）、带参数（三层嵌套工厂）；functools.wraps 用于保留被装饰函数的 __name__/__doc__，否则文档与调试信息会指向 wrapper。
144. **B**wrapper 先打印 before，调用原函数打印 hello，再打印 after。【衍生知识点】这个“三明治”结构可扩展为计时器（time.perf_counter 包裹）、重试器、权限校验；异步函数要用 async def wrapper + await。
145. **B**相同参数直接命中缓存返回，fib(n) 从 O(2^n) 降到 O(n)。【衍生知识点】functools.cache 是 3.9+ 的无限缓存；lru_cache(maxsize=128) 有淘汰策略且线程安全；参数必须可哈希，传 list 会报 TypeError。
146. **B**map 把函数逐个应用到可迭代对象上返回惰性 map 对象，list() 后得 [2,4,6]。【衍生知识点】map/filter 在 3 中返回迭代器（一次遍历）；等价推导式 [x*2 for x in lst] 通常更 Pythonic；多个序列可 map(f, xs, ys) 逐元素配对传入。
147. **A**reduce 累积折叠：((((1+2)+3)+4)=10，可选第三参数为初始值。【衍生知识点】reduce 在 Python 3 中移出内置、放入 functools（Guido 认为其可读性差）；求和用 sum、拼接用 join、乘积用 math.prod 更清晰。
148. **B**retry(times=3) 先调用外层工厂返回真正的装饰器，再由它包装函数，共三层嵌套。【衍生知识点】识别技巧：装饰器名后面带括号调用就多一层；也可用类实现装饰器（实现 __call__）提高可读性；标准库 contextlib.decorator 简化写法。
149. **B**partial 冻结部分位置/关键字参数，常用于给回调/映射函数预填参数，如 map(partial(power, exp=2), nums)。【衍生知识点】partial 对象可再 partial；与 lambda 类似但更明确、可 repr、可 pickle；methodcaller/attrgetter/itemgetter 是相关工具。
150. **B**lambda 闭包捕获的是变量 i 本身而非当时的值；循环结束后 i=2，三个 lambda 调用时都读同一个 i，得 [2,2,2]。【衍生知识点】解决：lambda i=i: i（默认参数在定义时求值绑定）或用 functools.partial；这是闭包“晚绑定”的经典面试题。
151. **B**不加 wraps 时 wrapper.__name__ 是 "wrapper"，影响日志、文档与调试；@functools.wraps(f) 复制元数据并设置 __wrapped__ 便于 inspect 获取原签名。【衍生知识点】API 测试断言被装饰函数名时经常因漏写 wraps 而失败；装饰器库：typing.final、contextlib.contextmanager、dataclasses 等都遵循此惯例。
152. **B**函数是一等公民，能接收/返回函数的就是高阶函数，如 map、sorted(key=)、装饰器工厂。【衍生知识点】高阶函数是函数式编程的核心，Python 提供 map/filter/reduce/functools 系列；与生成器组合可实现惰性数据处理管道。
153. ****nonlocal**。**nonlocal 声明名字属于最近的 Enclosing 作用域，使赋值生效。【衍生知识点】Python 2 没有 nonlocal，用可变容器模拟；nonlocal 不能作用于全局变量（那要 global）。
154. ****wrapper**。**wraps 修饰 wrapper，把被包装函数的元数据复制过来。【衍生知识点】不加会导致 wrapper.__name__ == "wrapper"；调试器与日志显示错误函数名；__wrapped__ 属性还允许 inspect.signature 穿透装饰器。
155. ****map / 迭代器**。**map/filter/zip/enumerate 都返回迭代器，一次遍历耗尽。【衍生知识点】需要多次遍历要先 list() 落盘；惰性求值节省内存，适合大数据流管道。
156. ****指定排序依据（先对每个元素应用 key 函数再比较）**。**key 函数把元素映射为可比较的值，排序按映射结果进行，原元素不变。【衍生知识点】key 比 Python 2 的 cmp 参数更高效（每元素调用一次而非每次比较）；operator.itemgetter/attrgetter 是常用 key。
157. ****deco1**；**deco2**。**装饰器自下而上应用：先 deco2 包装 func，再 deco1 包装结果。【衍生知识点】顺序影响行为（如 @cache 在 @lru_cache 外层无意义），写日志类装饰器通常放最外层。
158. ****__closure__ / __closure__ 属性**。**f.__closure__ 是 cell 元组，cell.cell_contents 取实际值。【衍生知识点】无自由变量的函数 __closure__ 为 None；sys.setrecursionlimit 之外，闭包+cell 也是理解 Python 作用域实现的入口。
159. **参考答案**：
   def retry(times):
       # 第 1 层：装饰器工厂，接收装饰器参数 times，返回真正的装饰器
       def deco(func):
           # 第 2 层：真正的装饰器，接收被装饰函数
           @functools.wraps(func)
           def wrapper(*args, **kwargs):
               # 第 3 层：包装函数，实现重试逻辑
               for i in range(times):
                   try:
                       return func(*args, **kwargs)
                   except Exception:
                       if i == times - 1:
                           raise
           return wrapper
       return deco
   
   @retry(times=3)
   def flaky(): ...
   使用 @retry(times=3) 时先执行 retry(3) 得到 deco，再用 deco 包装 flaky。【衍生知识点】三层结构中 functools.wraps 放在第 2 层内修饰 wrapper；tenacity 库提供了生产级重试装饰器。
   【解析】带参装饰器=工厂模式的应用，理解三层就理解了所有装饰器。
160. **参考答案**：
   import time, functools
   
   def timer(func):
       @functools.wraps(func)
       def wrapper(*args, **kwargs):
           t0 = time.perf_counter()
           try:
               return func(*args, **kwargs)
           finally:
               cost = (time.perf_counter() - t0) * 1000
               print(f"{func.__name__} 耗时 {cost:.2f} ms")
       return wrapper
   
   @timer
   def work():
       time.sleep(0.1)
   
   work()  # work 耗时 100.xx ms
   计时用 time.perf_counter（单调高精度）；finally 保证异常时也打印耗时。
   【解析】perf_counter 比 time.time 更适合计时（不受系统时间调整影响）。

## 迭代器与生成器 · 答案与解析

161. **B**Iterable 有 __iter__ 方法；Iterator 在此之上还有 __next__，逐个产出元素并在耗尽时抛 StopIteration。for 循环先 iter() 再不断 next()。【衍生知识点】list/tuple/str/dict/range 都是 Iterable 而非 Iterator；生成器、map/filter/zip 的返回值是 Iterator；isinstance(x, collections.abc.Iterable/Iterator) 可验证。
162. **B**函数体中只要出现 yield，该函数就是生成器函数：调用它不执行函数体，而是返回生成器对象，每次 next() 执行到下一个 yield 处暂停。【衍生知识点】生成器是惰性的、一次性的；yield 的函数返回注解是 Generator[YieldType, SendType, ReturnType]；生成器也是迭代器协议的快捷实现方式。
163. **C**生成器表达式是迭代器，第一次 list(g) 已耗尽，第二次得空列表。【衍生知识点】这是生成器“一次性”的典型坑；需要复用就先转 list；切片也不支持（无长度），需要长度信息时先 list()。
164. **B**yield 暂停并保存全部局部状态（变量、执行位置），恢复执行时从断点继续，可实现协程与流式处理。【衍生知识点】value = yield x 的双向通道：send(v) 把 v 作为 yield 表达式的值；生成器结束前的清理用 close() 抛 GeneratorExit；PEP 380 的 yield from 委托子生成器。
165. **B**文件对象是迭代器，逐行惰性读取，内存占用恒定；readlines/read 会把整个文件载入内存。【衍生知识点】流式思想：生成器管道 gen1 → gen2 → reduce，每级只处理当前元素；itertools 的组合是内存高效处理大数据的标准姿势。
166. **B**count 是无限迭代器，必须配合 islice/takewhile/break 截断。【衍生知识点】itertools 三类：无限（count/cycle/repeat）、组合（product/permutations/combinations）、过滤分组（chain/groupby/islice）；itertools + 生成器是 Python 处理序列的瑞士军刀。
167. **B**groupby 只对相邻的相同 key 分组，通常先 sorted(data, key=...) 再 groupby。【衍生知识点】groupby 产出 (key, group_iterator)；group 迭代器与主迭代器共享状态，需立即消费（list(g)）；不用排序的全量分组用 dict + defaultdict。
168. **A**__iter__ 返回自身，__next__ 返回下一个值或抛 StopIteration。【衍生知识点】只实现 __getitem__ 的旧式序列也可被 for 迭代（向后兼容），但不是正式迭代器；生成器函数比手写迭代器类简洁得多，优先用生成器。
169. **B**[expr for ...] 立即构建完整列表；(expr for ...) 创建生成器，元素按需产出。【衍生知识点】作为函数唯一参数时生成器表达式可省略括号：sum(x*x for x in nums)；大量数据下生成器内存 O(1)，列表 O(n)。
170. **B**内置 next(iterator) 调用其 __next__；list 本身没有 __next__，必须先 iter()。【衍生知识点】next(it, default) 可在耗尽时返回默认值而非抛 StopIteration，如 next(iter([]), None) 得 None。
171. **B**send 恢复执行时，暂停处的 yield 表达式整体取值 v，实现调用方→生成器的数据流；首次必须先 next() 或 send(None) 启动。【衍生知识点】yield 双向通道是旧式协程（@coroutine、asyncio 早期）的基础；现代异步编程已用 async/await，但理解 send 有助于看懂底层。
172. **A**取 1,3,5,7,9（奇数），和为 25；生成器表达式作为唯一参数可省一层括号。【衍生知识点】等价 sum(range(1, 10, 2))；range 直接支持步长时优先用 range，更省一次过滤。
173. ****StopIteration**。**迭代协议规定耗尽时抛 StopIteration，for 循环据此安静结束。【衍生知识点】在生成器内部 StopIteration 会被转为 RuntimeError（PEP 479）；next(it, default) 可避免异常。
174. ****yield**；**yield from**。**yield 定义生成器；yield from iterable（PEP 380）委托子生成器并透传 send/throw。【衍生知识点】yield from 是 async/await 的前身；委托还自动返回子生成器的返回值（StopIteration.value）。
175. ****[('a', 0), ('b', 1)] / [('a',0), ('b',1)]**。**zip 以最短者为准，字符串 'ab' 只有两个字符。【衍生知识点】zip 结果也是迭代器（3.x 惰性）；zip(*pairs) 反向解包两列；strict=True（3.10+）可发现长度不一致的 bug。
176. ****islice**。**islice(it, 5) 等价于对迭代器做切片（只能从头开始，不支持负索引）。【衍生知识点】islice(it, 2, 8, 2) 支持 start/stop/step；对无限流截断是 count/cycle/repeat 的标配。
177. ****a / 'a'**。**iter("abc") 得字符串迭代器，next 取第一个字符 a。【衍生知识点】字符串迭代按字符；文件按行；dict 默认按键；自定义容器实现 __iter__ 返回生成器即可支持 for。
178. ****StopIteration / StopIteration.value**。**生成器 return 会让 StopIteration.value = x，用 yield from 委托时可取到该返回值。【衍生知识点】for 循环忽略返回值；需要取回值时应手动 next 循环捕获 StopIteration 或在 yield from 外层获取。
179. **参考答案**：
   生成器惰性求值：不存储全部元素，只保存当前执行状态（程序计数位置+局部变量），任意时刻内存中只有一个元素，处理大数据流时内存 O(1)。应避免的场景：1) 需要多次遍历同一份数据（生成器一次性，耗尽后为空）；2) 需要长度、索引、切片等序列操作；3) 数据量很小（省不了内存反而增加间接性）；4) 需要随机的数据结构操作（如反复求 len、in 判断时 set/list 更合适）。【衍生知识点】管道组合（读文件→过滤→变换→聚合）是生成器的最佳实践；itertools.tee 可把一个迭代器“分叉”为多个，但会缓存差异部分。
   【解析】惰性 + 单元素驻留内存是生成器的本质优势。
180. **参考答案**：
   from itertools import islice
   
   def fib():
       a, b = 1, 1
       while True:
           yield a
           a, b = b, a + b
   
   print(list(islice(fib(), 10)))
   # [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
   无限生成器 + islice 截断是标准组合；生成器内部用 while True 是合法的，因为每次 yield 都会暂停。
   【解析】该生成器可继续取任意前 n 项：islice(fib(), n)。

## 面向对象基础 · 答案与解析

181. **B**obj.method() 等价于 Class.method(obj)，self 就是第一个位置参数，名字可以改但不建议。【衍生知识点】实例方法、类方法（cls 指向类）、静态方法（无隐式参数）三者通过调用方式自动绑定；self 是显式的，这是 Python 的设计哲学“Explicit is better than implicit”。
182. **B**实例由 __new__ 创建（分配内存），随后 __init__ 接收同一实例做属性初始化，返回值必须是 None。【衍生知识点】__new__ 才负责“出生”（单例模式、不可变类型子类必须重写它）；__del__ 在对象被垃圾回收时调用，但时机不确定，资源清理应使用 with/context manager。
183. **B**Python 对象属性动态可加，存储在实例的 __dict__；未定义 __slots__ 时都可以。【衍生知识点】__slots__ = ("x",) 可禁止动态属性并省内存（属性由描述符管理，无 __dict__）；类属性在类 __dict__ 中，查找顺序：实例 __dict__ → 类 → 父类（MRO）。
184. **B**定义在类体、方法外的 count 是类属性，通过 Dog.count 读写共享；注意 self.count += 1 会创建同名实例属性遮蔽类属性。【衍生知识点】类属性适合常量、计数、注册表；写类属性尽量用类名而非 self，避免“读类写实例”的坑。
185. **B**属性查找沿 MRO 在类中找函数对象，命中后经描述符协议绑定成绑定方法（bound method），self 自动传入。【衍生知识点】函数即描述符：访问 obj.method 产生绑定方法对象，它记录了 obj；这也是能将 method 取出来之后仍知道 self 的原因；数据属性优先于方法名查找。
186. **B**类对象加调用运算符 () 即实例化（触发 __call__ → __new__ + __init__），没有 new 关键字。【衍生知识点】Point（不加括号）是类本身；工厂函数、单例、缓存实例等模式可通过重写 __new__ 或类方法 from_xxx 实现。
187. **B**类方法第一个参数绑定类本身，实例也能调用（cls 为实例的类）；典型用途是备选构造器。【衍生知识点】classmethod 的重要优势是继承友好：cls 是实际调用的子类，from_xxx 会构造出子类实例；staticmethod 则完全没有隐式参数，只是命名空间归属。
188. **B**staticmethod 不接收 self/cls，与类内普通函数无差别，作用是组织代码与表达“这属于该类”。【衍生知识点】多数场景直接写模块级函数更简单；子类继承 staticmethod 不接收 cls，无法像 classmethod 那样感知子类，这是选型关键。
189. **A**print/str() 找 __str__，没有则用 __repr__；repr()/交互式回显只用 __repr__。【衍生知识点】惯例：__repr__ 面向开发者（无歧义、最好能求值重建），__str__ 面向用户（可读）；只定义一个时定义 __repr__；f-string 中 {!r}/{!s} 或 {obj=} 分别触发 repr/str。
190. **A**== 调用 __eq__（默认按身份比较）；配套的还有 __ne__、__lt__ 等（可用 @functools.total_ordering 自动补全排序族）。【衍生知识点】重写 __eq__ 后默认 __hash__ 变为 None（对象不可放入 set/dict），需同时定义 __hash__；dataclass(eq=True) 会自动生成两者。
191. **A**len() 调用 __len__ 并要求返回非负整数，同时使对象支持真值测试与 bool 转换。【衍生知识点】实现 __len__ + __getitem__ 的对象自动可迭代、可切片（旧式协议）；现代做法直接实现 __iter__；容器协议还包括 __contains__（in 运算）。
192. **D**单下划线是“内部使用”约定；双下划线开头在类体中会被改写为 _ClassName__name 以避免子类冲突；双下划线前后都有的 __xxx__ 是魔术方法命名空间。【衍生知识点】名称改写不是真私有（_Cls__x 仍可访问），Python 信任程序员；“私有”需求可用 property 只读封装。
193. ****self**。**self 代表调用该方法的实例，由解释器自动传入。【衍生知识点】类方法第一参数为 cls；self/cls 只是惯例名（技术上可改名），但代码审查会视为错误。
194. ****__new__**；**__init__**。**__new__(cls, ...) 创建并返回对象；__init__(self, ...) 对该对象设置属性。【衍生知识点】__init__ 必须返回 None，返回非 None 抛 TypeError；重写 __new__ 时记得调用 super().__new__(cls)。
195. ****__dict__ / __dict__ 属性**。**实例属性存于 obj.__dict__；类属性存于 Class.__dict__（是 mappingproxy 只读视图）。【衍生知识点】使用 __slots__ 的类没有实例 __dict__；vars(obj) 是 obj.__dict__ 的内置函数别名。
196. ****__enter__**；**__exit__**。**with obj as x: 调用 __enter__ 取 as 的值，无论是否异常都调用 __exit__ 做清理。【衍生知识点】更简洁的写法用 contextlib.contextmanager 装饰生成器；Python 3.12 起 with 支持括号分组多个上下文管理器。
197. ****_Foo__secret / _Foo__secret 属性**。**name mangling 把 __name 改写为 _类名__name，避免子类无意覆盖。【衍生知识点】改写只发生在类体内代码；仍是“君子协定”，外部可直接 obj._Foo__secret 访问；单下划线前缀不改名。
198. ****True**。**bool 继承自 int，True 是 int 的实例。【衍生知识点】isinstance 接受元组 isinstance(x, (int, float))；type() 不认子类；鸭子类型优先，仅必要时才 isinstance。
199. **参考答案**：
   实例方法：def m(self)，第一个参数是实例，读写实例状态，最常用。类方法：@classmethod + def m(cls)，第一个参数是类，不依赖具体实例，典型场景是备选构造器（如 pd.DataFrame.from_dict、dict.fromkeys）与操作类级状态；继承时 cls 指向实际子类，工厂方法自动适配子类。静态方法：@staticmethod + def m()，无隐式参数，是放在类命名空间里的普通函数，表达“与类相关但不依赖状态”。【衍生知识点】实例方法可通过类调用 Class.method(obj)；staticmethod 在子类中不会感知子类，需要子类感知的工厂一律 classmethod。
   【解析】三种方法是面向对象基础必考点：self/cls/无。
200. **参考答案**：
   class BankAccount:
       def __init__(self, balance=0):
           self.balance = balance
   
       def deposit(self, amount):
           if amount <= 0:
               raise ValueError("金额必须为正")
           self.balance += amount
   
       def withdraw(self, amount):
           if amount > self.balance:
               raise ValueError("余额不足")
           self.balance -= amount
   
       def __str__(self):
           return f"BankAccount(balance={self.balance})"
   
   acc = BankAccount()
   acc.deposit(100)
   acc.withdraw(30)
   print(acc)  # BankAccount(balance=70)
   输出 BankAccount(balance=70)；用 property 可进一步把 balance 变为只读。
   【解析】金额类建议用 decimal.Decimal 避免浮点误差；余额校验也可放在 property setter 中。

## 面向对象高级 · 答案与解析

201. **B**super() 返回代理对象，沿 MRO 找到下一个类并绑定当前实例，单继承等价 A.__init__(self) 但在多继承下更正确。【衍生知识点】super() 不一定是“父类”，而是 MRO 中的下一个协作类——这是协作式多继承（如 mixin）的基础；Python 2 需显式 super(B, self)。
202. **B**Python 2.3 起 MRO 采用 C3 线性化，保证子类先于父类、且保持各父类声明顺序、解决菱形继承的歧义。【衍生知识点】查看：C.__mro__ 或 C.mro()；若 C3 无法满足约束（如父类顺序矛盾）定义类时直接抛 TypeError；MRO 是理解 super 行为的关键。
203. **B**Python 没有传统函数重载；多态靠鸭子类型：只要对象有该方法就能调用，如 len() 对 str/list/File 均有效。【衍生知识点】协议化抽象：collections.abc、typing.Protocol（3.8+）支持“静态鸭子类型”检查；functools.singledispatch 可实现基于类型的函数重载。
204. **B**@property 让 obj.name 触发方法调用，实现计算属性与读写控制，接口不变即可加校验逻辑。【衍生知识点】@x.setter 定义赋值行为，可在 setter 中抛 ValueError 实现只读/校验；property 还可用于把原有公开属性平滑迁移为受控属性而不破坏 API。
205. **A**下标语法 obj[key] 调用 __getitem__(key)；配套 __setitem__、__delitem__、__contains__。【衍生知识点】obj.attr 找 __getattr__/__getattribute__；obj() 找 __call__；obj+x 找 __add__/__radd__；实现这些方法即可让自定义类表现如内置容器。
206. **B**@dataclass 根据类注解字段自动生成 __init__（字段可带 default/default_factory）、__repr__、__eq__ 等。【衍生知识点】frozen=True 生成不可变（可哈希）数据类；slots=True（3.10+）省内存；field(default_factory=list) 处理可变默认值；3.14 延迟注解让 dataclass 前向引用更省心。
207. **B**类也是对象，由元类实例化产生；class Foo(metaclass=Meta) 让 Meta 控制“类的创建”过程（如自动注册、API 校验、ORM 模型）。【衍生知识点】type(Foo) 是 type；type("X", (object,), {}) 可动态造类；日常 99% 场景用 __init_subclass__ 钩子或装饰器即可，元类是最后手段。
208. **A**继承 ABC 且含 @abstractmethod 的类不能直接实例化，未实现抽象方法的子类实例化时报 TypeError。【衍生知识点】抽象方法可以有实现体供子类 super() 调用；ABC 还支持“虚拟子类”注册（register），让无关类通过 isinstance 检查；typing.Protocol 是更轻的替代（结构化类型）。
209. **B**slots 用类级描述符替代每实例的 __dict__，百万级小对象可省大量内存，且属性访问略快。【衍生知识点】副作用：无 __dict__、与多继承含 __dict__ 的类冲突、默认值需在 __init__ 设置；dataclass(slots=True) 已封装此优化。
210. **A**父类定义 __init_subclass__(cls, **kw)，任何子类定义时自动调用，是替代简单元类的官方推荐方式。【衍生知识点】插件注册表惯用法：在 __init_subclass__ 中把 cls 按名字加入 dict，配合 match 或字典分发实现命令路由；kwargs 可捕获 class 语句的类关键字参数。
211. **A**“is-a”用继承，“has-a”用组合；Car 拥有引擎，用属性持有 Engine 实例，避免继承带来的强耦合。【衍生知识点】组合+委托更易测试与替换组件；继承树宜浅（≤3 层），跨层复用优先 mixin（如 Django 泛型视图）或组合；Go 等语言干脆没有继承。
212. **A**定义了 __call__ 的实例 obj() 会调用 obj.__call__()，装饰器类、策略对象、 functor 常用它。【衍生知识点】类本身可调用是 type.__call__ 的功劳（触发 __new__/__init__）；partial 对象也实现了 __call__；判断可调用用 callable(obj)。
213. ****__mro__ / mro()**。**__mro__ 是元组形式的线性化结果；C.mro() 方法形式返回列表。【衍生知识点】MRO 决定属性查找与 super() 的“下一个”指向；C3 线性化失败时类定义直接报错。
214. ****@property**；**setter**。**@property 定义读，@name.setter 定义写，@name.deleter 定义删除。【衍生知识点】property 对象是数据描述符，优先级高于实例 __dict__，这正是它能拦截赋值的原因。
215. ****frozen / frozen=True**。**frozen=True 生成的类赋值即抛 FrozenInstanceError，并自动提供 __hash__。【衍生知识点】namedtuple 与 NamedTuple 也是不可变记录；真正的不可变需要防御性拷贝可变字段（tuple 化列表）。
216. ****__hash__**；**__eq__**。**哈希定位桶，__eq__ 处理冲突确认相等；二者必须一致（相等对象哈希必相同）。【衍生知识点】重写 __eq__ 后 Python 自动把 __hash__ 置 None，这是常见坑；frozen dataclass 自动处理。
217. ****__lt__**；**__add__**。**比较族：__lt__/__le__/__gt__/__ge__/__eq__/__ne__；算术族有反射版本 __radd__ 等。【衍生知识点】@functools.total_ordering 只需实现 __eq__ 与一个比较即可补全全部排序；+= 先找 __iadd__。
218. ****元类 / metaclass**。**type 实例化产生普通类；自定义元类通过 class Foo(metaclass=Meta) 指定。【衍生知识点】检查：type(Foo) is type；继承链与元类链冲突时（两个不同元类的父类）无法定义子类。
219. **参考答案**：
   菱形继承：D 继承 B、C，而 B、C 都继承 A，D 的方法查找顺序若用简单深度优先会先到 B→A，导致 A 的方法在 C 之前被找到、C 的重写被跳过，且 super 调用可能重复初始化 A。Python 2.3 起用 C3 线性化：保证 1) 子类排在所有父类之前；2) 保持父类声明顺序；3) 每个父类只出现一次且各父类的相对顺序一致。D 的 MRO 为 D→B→C→A→object，super() 沿此链逐级协作，配合各方法内部统一调用 super().__init__() 即可让 A 恰好初始化一次。【衍生知识点】mixin 设计要求：mixin 应放在基类之前、方法尽量调用 super 而非具体类名；顺序错误会改变 MRO 行为。
   【解析】C3 + super 协作是多重继承的核心考点。
220. **参考答案**：
   class Circle:
       def __init__(self, radius):
           self.radius = radius  # 走 setter 校验
   
       @property
       def radius(self):
           return self._radius
   
       @radius.setter
       def radius(self, r):
           if r < 0:
               raise ValueError("半径不能为负")
           self._radius = r
   
       @property
       def area(self):
           return 3.14159 * self._radius ** 2
   
   c = Circle(2)
   print(c.area)      # 12.56636
   c.radius = 3
   print(c.area)      # 28.27431
   c.radius = -1      # ValueError
   输出 12.56636 与 28.27431，负半径抛异常。
   【解析】内部存储用 _radius 避免与 property 递归冲突；math.pi 更精确。

## 模块与包 · 答案与解析

221. **B**import 保持命名空间清晰（来源明确）；from 导入缩短调用但可能覆盖同名名字。【衍生知识点】避免 from module import *（污染命名空间）；from x import y as z 解决重名；循环导入优先用 import module 形式并把导入放函数内。
222. **B**直接运行该文件时 __name__ 为 "__main__"，被导入时为模块名，用来区分“当脚本跑”和“被导入用”。【衍生知识点】python -m pkg.mod 运行时 __name__ 也是 __main__；现代项目入口常放 project/__main__.py 使包可 python -m project 执行。
223. **B**带 __init__.py 的目录是常规包（可留空或执行包初始化）；Python 3.3+ 支持无该文件的命名空间包。【衍生知识点】__init__.py 里常写 __all__、版本号、延迟导入以控制公开 API；子包导入路径 pkg.mod 对应 pkg/mod.py。
224. **B**python -m venv .venv 在目录中生成独立解释器与 site-packages；激活后 pip install 的包只装入该环境。【衍生知识点】激活：Windows .venv\Scripts\activate、Linux/macOS source .venv/bin/activate；依赖固化 pip freeze > requirements.txt；现代工具 uv/poetry/pdm 管理更高效。
225. **B**pip install 包名；指定版本 pip install numpy==2.1.0，升级用 -U/--upgrade。【衍生知识点】国内加速：-i https://pypi.tuna.tsinghua.edu.cn/simple；pip list/pip show/pip uninstall；生产环境应锁定版本（requirements.txt 或 uv.lock/poetry.lock）。
226. **B**运行脚本时其所在目录排最前，随后是 PYTHONPATH、标准库、site-packages；同名文件会遮蔽标准库。【衍生知识点】命名文件 random.py、json.py 导致 import json 导入自己而报错是最常见事故；sys.path.insert(0, ...) 临时加路径不如安装为包规范。
227. **A**import 会执行模块顶层代码（并缓存到 sys.modules，重复导入不再执行）。【衍生知识点】顶层代码应保持轻量（只定义、不执行重活）；副作用（读配置、开连接）放函数/入口；单例、注册表常利用“仅执行一次”语义。
228. **B**__all__ 控制 * 导入的名单，也是文档工具识别公开 API 的依据；不影响显式导入。【衍生知识点】下划线前缀 _func 是“内部”约定的补充手段；类型检查工具与 IDE 会依据 __all__ 给出建议。
229. **B**A 导入 B，B 顶层又导入 A，而 A 尚未执行完，导致半初始化模块被引用而 AttributeError。【衍生知识点】解法：1) 合并模块；2) 把导入移到函数内部（延迟导入）；3) 只 import 模块而非 from A import name；4) 抽出公共依赖到第三个模块。
230. **B**相对导入基于 __package__，顶层脚本运行时为空而报 attempted relative import with no known parent package。【衍生知识点】包内模块要用 python -m pkg.mod 运行；绝对导入（from pkg import utils）是更推荐的显式风格（PEP 328）。
231. **B**pyproject.toml 声明构建系统与元数据（PEP 621），python -m build 生成 sdist/wheel，twine upload 或 uv publish 发布。【衍生知识点】setup.py 已属遗留；wheel 是预编译分发格式安装更快；uv（Rust 实现）已成为新一代高速工具链。
232. **B**-m 以模块方式运行标准库 http.server，默认在 8000 端口提供目录浏览/静态服务，常用于局域网共享文件。【衍生知识点】-m 还能跑 python -m venv、python -m pip、python -m timeit 基准测试；自己项目写 __main__.py 后同样可 -m 运行。
233. ****modules**。**sys.modules 是全局模块缓存字典。【衍生知识点】强制重载可用 importlib.reload(mod)（开发调试用）；删除缓存条目可模拟“未导入”状态，但有风险。
234. ****path**。**sys.path 是字符串列表，按顺序查找模块。【衍生知识点】优先级高于它的还有内建模块（builtins）；永久修改应设置 PYTHONPATH 环境变量或将包安装进环境。
235. ****list / freeze**。**pip list 显示已装包；pip freeze 输出 requirements 格式（包==版本）。【衍生知识点】pip show pkg 查看单个包详情与依赖；pipdeptree 可展示依赖树。
236. ****重命名（别名）**。**as 把导入的名字绑定到新名字，用于解决冲突或缩短长名。【衍生知识点】常见惯例：import numpy as np、import pandas as pd；as 还用于 with...as 和 except...as。
237. ****命名空间 / namespace**。**命名空间包由多个目录片段合并而成，无单一 __init__。【衍生知识点】常规包有 __init__.py 且行为更可控，一般项目仍推荐常规包；PEP 420 定义命名空间包。
238. ****循环 / 循环导入**。**导入发生在调用时而非模块加载时，彼时双方模块都已初始化完毕。【衍生知识点】延迟导入也是插件系统的常用手段（按需加载重型依赖，如 matplotlib、torch）。
239. **参考答案**：
   1) python file.py：file 的 __name__ 为 "__main__"，作为主程序执行；2) python -m pkg.mod：pkg.mod 的 __name__ 也是 "__main__"，但包的 __init__.py 会先执行；3) import module：module 的 __name__ 为模块名，顶层代码只执行一次并缓存。建议：模块只定义函数/类，入口逻辑放在 if __name__ == "__main__": 下；包入口放 pkg/__main__.py。这样同一文件既能复用又能执行。【衍生知识点】入口处建议用 argparse 处理参数并返回退出码 sys.exit(main())，便于脚本化与测试。
   【解析】__name__ 语义是理解 Python 程序结构的基础。
240. **参考答案**：
   目录结构：
   mymath/
       __init__.py
       ops.py
   
   # mymath/ops.py
   def add(a, b):
       return a + b
   
   def mul(a, b):
       return a * b
   
   # mymath/__init__.py
   from mymath.ops import add
   __all__ = ["add"]
   
   # 外部使用
   from mymath import add        # OK
   # from mymath import mul      # not exported, 但显式导入仍可用
   print(add(2, 3))              # 5
   __all__ 只影响 import *；显式 from mymath.ops import mul 依然可行，因此 __all__ 是 API 声明而非权限控制。
   【解析】开发期把包目录放项目根，或在包目录内启动解释器，import mymath 即生效。

## 异常处理 · 答案与解析

241. **A**except 异常类型 as 变量 把异常实例绑定到 e，可访问 e.args、str(e)。【衍生知识点】Python 3 中异常作用域在块结束后删除（隐式 del e），防止与 traceback 循环引用；except (A, B) 元组可同时捕获多类。
242. **B**else 在 try 成功（无异常）后执行，把“成功路径”与 try 分离，缩小异常监控范围。【衍生知识点】finally 无论正常、异常、break/return 都执行（Python 3.14 起 finally 中使用 return/break/continue 跳出会被语法警告/禁止，PEP 765）；清理逻辑优先 with 语句。
243. **B**裸 except 连 SystemExit/KeyboardInterrupt 都捕获（继承自 BaseException），程序无法正常退出或中断。【衍生知识点】捕获层次：BaseException > Exception > 具体异常；服务代码常 except Exception + 日志 + raise 或恢复，脚本顶层兜底捕获也应记录后 re-raise。
244. **B**raise ... from 指定因果链，traceback 显示 The above exception was the direct cause...，便于定位底层错误。【衍生知识点】异常隐式链 __context__ 自动记录（try 中抛新异常时）；raise ... from None 可抑制显示；主动链化是包装底层异常转业务异常的标准姿势。
245. **A**业务异常应继承 Exception（语义明确、可统一捕获），BaseException 保留给系统级退出。【衍生知识点】项目里常建 errors.py 定义异常层级（AppError → ValidationError/NotFound），调用方可一次 except AppError；异常类通常保持简单，携带 message 与上下文属性即可。
246. **B**with 调用上下文管理器的 __exit__，无论成功/异常/return 都执行清理，代码更短更安全。【衍生知识点】自己实现上下文管理器：类 __enter__/__exit__ 或 @contextlib.contextmanager；Python 3.12 支持 with (...) 多管理器括号写法；with 不减少异常，只保证清理。
247. **B**assert 是调试期校验，-O 优化模式下全部剔除，因此绝不能用于业务校验或安全检查。【衍生知识点】业务校验直接 if not cond: raise ValueError(...)；assert 适合内部不变式与测试断言（pytest 的 assert 增强重写了它）。
248. **A**d["miss"] 抛 KeyError，lst[99] 抛 IndexError，"1"+1 抛 TypeError。【衍生知识点】相关常见异常：ValueError（值类型对但内容不合法 int("a")）、FileNotFoundError（OSError 子类）、ZeroDivisionError、AttributeError；MemoryError 继承 Exception 而 KeyboardInterrupt 继承 BaseException。
249. **B**用户异常应都继承 Exception；SystemExit（sys.exit）、KeyboardInterrupt（Ctrl+C）、GeneratorExit 直接继承 BaseException，代表“退出/中断”语义。【衍生知识点】CLI 主入口兜底 except KeyboardInterrupt: 可优雅处理 Ctrl+C；捕获 BaseException 后务必 re-raise。
250. **A**历史上 finally 的 return 会“吞掉”try 的结果与异常，极易造成隐蔽 bug，因此 Python 3.14（PEP 765）禁止/警告在 finally 中用 return/break/continue 跳出。【衍生知识点】finally 中应只做清理，不返回、不抛新异常；需要返回值统一在外层处理。
251. **A**asyncio.TaskGroup 并发任务可能同时失败多个，ExceptionGroup 打包它们，except* A / except* B 可分别匹配组内类型。【衍生知识点】Python 3.14（PEP 758）允许 except A, B 与 except* 不加括号书写；ExceptionGroup 继承 BaseException，但常规子分组用 Exception。
252. **B**except 匹配按 isinstance（含子类），捕获父类即可拦截全部子类异常。【衍生知识点】OSError 家族还包括 PermissionError、IsADirectoryError 等；print(FileNotFoundError.__mro__) 可见 OSError；捕获粒度应具体优先。
253. ****BaseException**。**BaseException 下分 SystemExit、KeyboardInterrupt、GeneratorExit 与 Exception（用户异常根）。【衍生知识点】自定义异常永远继承 Exception 而不是 BaseException。
254. ****as**。**as e 把异常实例绑定到 e，e.args 是参数元组，str(e) 是消息。【衍生知识点】Python 2 写法 except ValueError, e: 已废弃；traceback.print_exc() 可打印完整堆栈。
255. ****raise**。**裸 raise 在 except 块内重新抛出正在处理的异常，保留原始 traceback。【衍生知识点】raise e 会重置部分上下文；记录日志后裸 raise 是“记录但不吞异常”的标准模式。
256. ****FileNotFoundError**；**ZeroDivisionError**。**二者都是内置异常；FileNotFoundError 继承 OSError。【衍生知识点】处理文件缺失也可先 pathlib.Path.exists() 判断，但 EAFP 风格（直接 try）在并发下更可靠。
257. ****__cause__**。**__cause__ 存 from 指定的异常；__context__ 存 try 块中隐式发生的异常。【衍生知识点】traceback 模块与 repr 均会展示链；raise X from None 把 __suppress_context__ 置 True 隐藏原链。
258. ****ExceptionGroup / ExceptionGroup/异常组**。**asyncio.TaskGroup 抛出 ExceptionGroup，except* 语法按类型拆分捕获。【衍生知识点】except* 的分支按类型划分、每组至多执行一次，与普通 except 语义不同；3.14 起可写 except ValueError, TypeError: 不加括号。
259. **参考答案**：
   EAFP（Easier to Ask Forgiveness than Permission）：先执行、出异常再处理，try: x = d["k"] / except KeyError。LBYL（Look Before You Leap）：先检查再执行，if "k" in d: x = d["k"]。Python 社区偏好 EAFP：1) 通常更快（无双重查找）；2) 并发安全（检查与使用之间状态可能变化）；3) 代码聚焦正常路径。LBYL 适合检查成本低、异常分支会干扰逻辑的场景。注意 EAFP 的 except 范围要窄，避免误吞其他异常。【衍生知识点】hasattr/getattr 也属 LBYL；鸭子类型天然是 EAFP——“先调用，不行再 TypeError”。
   【解析】EAFP 是 Pythonic 的核心习惯之一。
260. **参考答案**：
   class NegativeError(Exception):
       pass
   
   def safe_div(a, b):
       if a < 0 or b < 0:
           raise NegativeError("不允许负数")
       try:
           return a / b
       except ZeroDivisionError as e:
           print(f"警告: {e}")
           return None
   
   print(safe_div(6, 3))     # 2.0
   print(safe_div(1, 0))     # 警告 + None
   try:
       safe_div(-1, 2)
   except NegativeError as e:
       print("捕获:", e)
   依次输出 2.0、警告提示与 None、捕获: 不允许负数。
   【解析】窄捕获（只捕 ZeroDivisionError）保证其他异常不被误吞；自定义异常让调用方可精确分支处理。

## 文件与IO · 答案与解析

261. **B**r 只读文本模式，文件不存在抛 FileNotFoundError；写用 w（截断创建）、a（追加创建）、x（排他创建，已存在报错）。【衍生知识点】加 + 变读写（r+/w+）；加 b 为二进制（rb/wb），此时不能传 encoding；默认模式即 rt。
262. **B**文件对象支持上下文管理协议，__exit__ 保证 close() 被调用。【衍生知识点】不关文件的后果：句柄泄漏、数据未落盘（缓冲未刷）；with 可同时开多个文件 with open(a) as fa, open(b) as fb；Python 3.12 起支持括号多行写法。
263. **A**json.load(fp)/json.dump(obj, fp) 面向文件对象；loads/dumps 面向 str/bytes。【衍生知识点】ensure_ascii=False 保留中文、indent=2 美化、default=xx 序列化自定义类型；pickle 是 Python 专用二进制序列化（能存任意对象但不可跨语言且不可信来源危险）。
264. **B**Path("a") / "b" / "c.txt" 跨平台拼接并自动处理分隔符。【衍生知识点】常用成员：exists()、is_dir()、glob("*.py")、read_text(encoding=)、mkdir(parents=True, exist_ok=True)；pathlib 已取代 os.path 字符串拼接（os.path.join 仍有效）。
265. **B**文件对象按行惰性迭代，内存占用与文件大小无关；readlines/read 一次载入全部。【衍生知识点】行尾含 \n，配合 line.rstrip("\n") 处理；超大单行文件可指定 buffering 或用 mmap；CSV 大文件用 csv.reader 迭代同理。
266. **B**a 追加模式，写指针总在末尾；x 模式才是“必须新建，存在即报错”，适合防覆盖场景。【衍生知识点】日志轮转常用 a；w 打开瞬间即清空文件（即使不写），要小心。
267. **A**shutil.copyfile/copy2（保留元数据）按块复制二进制；文本模式复制会破坏图片等非文本文件。【衍生知识点】os.rename/os.replace 移动或改名（replace 跨平台覆盖语义更稳）；shutil.move 可跨文件系统；大文件流式复制 shutil.copyfileobj(src, dst)。
268. **B**with open(...) as f: for row in csv.reader(f): row 是字符串列表；csv.DictReader(f) 的 row["列名"] 更可读。【衍生知识点】写用 csv.writer(f).writerows(data)；中文 Excel 兼容常指定 encoding="utf-8-sig"（带 BOM）；数据分析场景直接 pandas.read_csv 更强。
269. **B**io.StringIO（文本）与 io.BytesIO（二进制）实现内存文件，常用于测试、生成内存中的 zip/图片。【衍生知识点】getvalue() 取全部内容；与临时文件 tempfile.TemporaryFile 的区别是后者真正落盘可承受大数据。
270. **B**seek(offset, whence) 移动文件指针，whence 0=开头 1=当前 2=末尾；tell() 报告当前位置。【衍生知识点】文本模式下 seek 只允许 tell() 返回的值；二进制模式任意偏移；读一次后想重新读需先 seek(0)。
271. **B**locale.getpreferredencoding() 在中文 Windows 历史上返回 cp936，默认编码读写 UTF-8 文件会 UnicodeDecodeError 或乱码；显式传 encoding 是最佳实践。【衍生知识点】PEP 686 计划把默认 UTF-8 模式化（Python 3.15 起 UTF-8 模式默认启用）；临时方案 -X utf8 开关。
272. **A**os.walk 自顶向下递归目录，配合修改 dirnames 可剪枝。【衍生知识点】pathlib 对应 Path.rglob("*")；监控文件变化用 watchdog 第三方库；os.scandir 比.listdir 快（带文件属性缓存）。
273. ****关闭 / close**。**上下文管理器保证 close() 执行，即使中途抛异常。【衍生知识点】忘记 close 的典型症状是 Windows 下文件被占用无法删除、写内容丢失。
274. ****ab**。**a 追加 + b 二进制；图片、音频等非文本必须二进制模式。【衍生知识点】文本模式在 Windows 会做 \n↔\r\n 转换（newline 参数可控），二进制不做任何转换。
275. ****dump**；**load**。**dump/load 面向文件对象，dumps/loads 面向字符串（s=string）。【衍生知识点】写文件惯例：json.dump(d, f, ensure_ascii=False, indent=2)；读取严格 JSON 不允许单引号与注释。
276. ****"."，即 Path(".")**；**cwd()**。**Path(".") 表示相对当前目录；Path.cwd() 返回绝对路径的工作目录。【衍生知识点】__file__ 是当前模块文件路径，Path(__file__).parent 常用于定位资源文件；脚本的工作目录取决于启动位置而非文件位置。
277. ****行字符串组成的列表 / 列表**。**readlines 一次读全部行到内存。【衍生知识点】内存敏感时用 for line in f 迭代；去除行尾换行 line.rstrip("\n")。
278. ****utf-8-sig**。**utf-8-sig 在文件头写入 BOM，Excel 据此识别编码。【衍生知识点】读取带 BOM 文件用 utf-8-sig 可自动剥离 BOM；普通 UTF-8 文件遇到 BOM 会在首字段多出 \ufeff。
279. **参考答案**：
   文本模式：按 encoding 解码为 str，处理换行符转换（Windows \r\n ↔ \n），支持行迭代、通用换行；适合配置、日志、CSV、源码等人类可读内容。二进制模式（b）：读写字节 bytes，不做解码与换行转换，seek 可任意偏移；适合图片、音视频、pickle/protobuf 数据、网络协议、精确字节处理。【衍生知识点】str.encode()/bytes.decode() 是两界桥梁；文件可以 rb 读入后按需 decode；处理“可能是文本也可能是二进制”的文件（如 HTTP 响应）时先拿 bytes 再判断。
   【解析】文本/二进制的选择取决于是否需要编码语义。
280. **参考答案**：
   import json
   from pathlib import Path
   
   students = [{"name": "张三", "score": 90}, {"name": "李四", "score": 85}]
   path = Path("students.json")
   
   path.write_text(json.dumps(students, ensure_ascii=False, indent=2), encoding="utf-8")
   data = json.loads(path.read_text(encoding="utf-8"))
   print(data[0]["name"])  # 张三
   中文正常显示需 ensure_ascii=False + encoding="utf-8"；pathlib 的 read_text/write_text 一步完成打开关闭。
   【解析】大文件仍建议 with open + json.load/dump 流式处理。

## 常用标准库 · 答案与解析

281. **A**Counter 是计数专用 dict 子类，most_common(1) 得 [(元素, 次数)]。【衍生知识点】访问不存在的键返回 0（不插入）；支持 update、+、- 运算；elements() 展开重复元素。
282. **A**defaultdict 用工厂函数初始化缺失键，分组/邻接表场景最简洁：d[key].append(v) 无需先判断。【衍生知识点】工厂可为 int（计数）、set（去重分组）；default_factory 可查看 d.default_factory；普通 dict 的等价写法是 setdefault。
283. **A**deque 双端队列用双向链表块实现，两端操作 O(1)，适合队列/滑动窗口；list.pop(0) 是 O(n)。【衍生知识点】deque(maxlen=n) 自动淘汰旧元素，实现最近 N 条日志/滑动平均；随机访问是 O(n)，频繁下标访问仍用 list。
284. **B**datetime.now() 本地、datetime.utcnow() 零时区但无时区信息（naive），容易混淆；aware 写法 datetime.now(timezone.utc)。【衍生知识点】存储/传输一律 UTC aware，展示时 astimezone() 转本地；timestamp() 与 fromtimestamp() 处理 Unix 时间戳；Python 3.12 起 utcnow() 已弃用。
285. **B**strptime 解析（p=parse），strftime 格式化输出（f=format）。【衍生知识点】常用码：%Y 年 %m 月 %d 日 %H 时 %M 分 %S 秒；日期加减 timedelta(days=7)；ISO 8601 快捷：fromisoformat/isocalendar。
286. **A**sys.argv[0] 是脚本名，其余是参数字符串列表。【衍生知识点】复杂参数用 argparse（类型转换、--help 自动生成）；环境变量 os.environ["KEY"] / os.getenv("KEY", default)；sys.exit(code) 设定退出码。
287. **D**choice 返回单元素；sample(seq, k) 无放回取 k 个（返回列表）；shuffle 原地打乱。【衍生知识点】random.random() [0,1)、randint(a,b) 含两端、seed(a) 复现实验；安全用途（令牌/密码）必须用 secrets 模块而非 random。
288. **A**sleep 阻塞当前线程指定秒数（支持小数）；期间不释放 GIL 之外的锁，也不处理其他任务。【衍生知识点】asyncio.sleep(0.5) 才是异步等待（让出事件循环）；重试退避常用指数 sleep；精确计时用 time.perf_counter()。
289. **A**ceil(2.1)=3、floor(2.9)=2、ceil(-2.1)=-2（向上含更小负方向？不，-2 比 -2.1 大）。【衍生知识点】round 是银行家舍入（round(2.5)=2）；int() 是向零截断 int(-2.9)=-2；三者区别是高频考点。
290. **B**cache == lru_cache(maxsize=None)，即不带淘汰的纯记忆化。【衍生知识点】lru_cache 支持 typed=True 区分 1 与 1.0；查看命中率 cache_info()；缓存方法时注意 self 使每个实例独立缓存（对象需可哈希）。
291. **A**run() 返回 CompletedProcess（stdout/stderr/returncode），列表形式参数避免 shell 注入。【衍生知识点】check=True 非零退出码抛 CalledProcessError；需要 shell 特性（管道）时才 shell=True 且必须拼接可信内容；asyncio.create_subprocess_exec 是异步版本。
292. **A**默认 root logger 级别 WARNING，低于该级别的 DEBUG/INFO 不输出。【衍生知识点】最佳实践：模块内 logger = logging.getLogger(__name__) 而非直接用 root；配置用 logging.basicConfig 或 dictConfig；结构化日志可用 structlog。
293. ****DictReader**。**csv.DictReader(f) 让 row["列名"] 取值，首行为表头。【衍生知识点】写侧对应 csv.DictWriter(f, fieldnames=...)，需先 writeheader()。
294. ****secrets**。**random 是伪随机可预测；secrets 基于 OS 熵源，用于密码、令牌、密钥。【衍生知识点】secrets.token_hex(16)/token_urlsafe(16)；密码学需求还有 hashlib（哈希）与 hmac（签名，3.14 内置形式验证实现）。
295. ****strptime**。**strptime 按格式解析字符串；strftime 反向格式化输出。【衍生知识点】标准 ISO 格式免写格式串：datetime.fromisoformat("2026-09-27T20:00:00")。
296. ****repr**。**repr 面向开发者、无歧义；str 面向用户。【衍生知识点】自定义类实现 __repr__ 后调试器与日志立刻可读；f-string {x=} 用的是 repr。
297. ****连接/串联 / 拼接**。**chain 惰性串联多个可迭代对象。【衍生知识点】chain.from_iterable(list_of_lists) 接受“可迭代的可迭代”，拍平一层；与之相对，product 是笛卡尔积。
298. ****days**。**timedelta 有 days、seconds、microseconds 属性与 total_seconds() 方法。【衍生知识点】days 为负表示 end 早于 start；秒级以下用 total_seconds() 统一。
299. **参考答案**：
   defaultdict(list/int/set)：分组统计、邻接表，缺失键自动初始化，省去判空；Counter：频次统计、TopN（most_common）、多重集合运算；deque：队列/栈、滑动窗口、最近 N 条记录（maxlen），两端 O(1)；namedtuple：轻量不可变记录，带字段名，如 Point = namedtuple("Point", "x y")，适合 CSV 行、坐标、配置项。【衍生知识点】3.7+ 还有 dataclass 处理更复杂记录；typing.NamedTuple 在类型检查场景替代 namedtuple；这些容器都是 dict/list/tuple 的特化，理解底层即可举一反三。
   【解析】collections 是最值得熟练的标准库之一。
300. **参考答案**：
   from datetime import datetime, timedelta, timezone
   
   now = datetime.now()
   print(now.strftime("%Y-%m-%d %H:%M"))
   print((now + timedelta(days=7)).date())
   print(datetime.fromtimestamp(1700000000))
   print(datetime.fromtimestamp(1700000000, tz=timezone.utc))  # UTC 版本
   strftime 格式化、timedelta 偏移、fromtimestamp 时间戳转换。
   【解析】存储时间戳与 UTC、展示用本地时区转换是跨时区应用的惯例。

## 正则表达式 · 答案与解析

301. **A**标准库为 re；第三方 regex 库功能更多（递归匹配等）但需安装。【衍生知识点】re 是标准库中少数自带缓存的模块（编译后的 pattern 会缓存），频繁使用时仍建议预编译 re.compile 提速并复用。
302. **B**match 锚定开头（失败返回 None），search 找任意位置的第一个匹配；re.fullmatch 要求整串匹配。【衍生知识点】判断“以 xx 开头”也可用 startswith（更快）；三者都返回 Match 对象或 None，取内容用 m.group()/m.group(1)。
303. **A**\d=[0-9]，\w=[a-zA-Z0-9_]，\s=[ \t\n\r\f\v]；大写 \D/\W/\S 取反。【衍生知识点】默认 Unicode 模式下 \d 也能匹配全角数字、\w 匹配中文；要严格 ASCII 加 re.ASCII 标志。
304. **A**findall 返回所有匹配的字符串列表；贪婪 \d+ 一次吞掉连续数字。【衍生知识点】若模式含分组，findall 返回分组内容而非整匹配；需要 Match 对象（位置信息）用 finditer。
305. **B***、+、{m,n} 贪婪，尽量多吃；量词后加 ?（如 .*?）变为非贪婪最少匹配。【衍生知识点】HTML 提取经典：re.findall(r"<a>(.*?)</a>", s) 用非贪婪避免跨标签吞并；还有占有优先量词（regex 库）防回溯爆炸。
306. **B**group(0) 是整个匹配，group(1)、group(2) 是第 1、2 个捕获组；命名组 (?P<year>\d{4}) 可用 m.group("year")。【衍生知识点】(?:...) 非捕获组不编号不捕获，提升性能与可读性；m.groups() 返回所有组元组。
307. **B**sub(pattern, repl, string) 替换全部匹配；count 参数限制次数。【衍生知识点】repl 可以是函数（接收 Match 返回替换串），实现大小写转换等动态替换；subn 额外返回替换次数。
308. **B**^...$ 锚定首尾保证整串恰好 11 位；不带锚点的 \d{11} 会从长串中截取前 11 位。【衍生知识点】真正校验中国手机号用 r"1[3-9]\d{9}"；锚点在多行模式 re.M 下 ^$ 变为按行锚定。
309. **B**re.I 大小写不敏感；常用标志还有 re.M 多行、re.S 让 . 也匹配换行、re.X 详细模式（可写注释与空格）。【衍生知识点】标志可用 (?i) 内联写在模式中；re.S 解决 . 不匹配 \n 的问题，抓多行内容必备。
310. **B**完整邮箱 RFC 5322 语法复杂到不适合正则；实践中格式粗校验 + 邮件确认是标准做法。【衍生知识点】html/email 模块处理邮件头；解析已验证的地址可用 email.utils.parseaddr；校验逻辑避免过度设计。
311. **A**compile 返回 Pattern 对象，方法 match/search/sub 一致；re 模块内部也有缓存，但显式编译在循环中仍最快。【衍生知识点】Pattern 对象线程安全可全局复用；pattern.fullmatch().groupdict() 配命名组可解析配置行。
312. **B**字符类 [,;] 匹配逗号或分号作为分隔符。【衍生知识点】带捕获组的分隔符会保留在结果中：re.split(r"(,)", "a,b") 得 ['a', ',', 'b']；maxsplit 限制切分次数。
313. ****.**。**. 默认不匹配 \n；re.S（DOTALL）下可匹配包括换行在内的任意字符。【衍生知识点】匹配字面量点号需转义 \.。
314. ****1**。**+ 等价 {1,}；* 等价 {0,}；? 等价 {0,1}。【衍生知识点】精确 m 到 n 次写 {m,n}，恰好 m 次写 {m}。
315. ****?**。**.*? 尽量少匹配；?? 与 {m,n}? 同理。【衍生知识点】非贪婪配合边界锚点可精准提取最短片段，如引号内容 "(.*?)"。
316. ****name / "name"**。**命名组按名字取值，可读性远好于数字下标。【衍生知识点】groupdict() 一次性取全部命名组字典；反向引用命名组 (?P=name)。
317. ****DOTALL**。**re.S/re.DOTALL 使 . 匹配任意字符含 \n。【衍生知识点】相对地 re.M/re.MULTILINE 改变 ^ $ 为行首行尾语义。
318. ****原始字符串（不做转义处理，\d 原样传给正则引擎）**。**不用 r 前缀时 \d 会先被字符串转义处理（\d 恰好保留但 \b 等会被误解为退格）。【衍生知识点】正则一律用 r-string 是最佳实践；Windows 路径也用 r"C:\dir"。
319. **参考答案**：
   贪婪量词尽量多吃字符，非贪婪（量词+?）尽量少吃。例如对 "<a>x</a><a>y</a>"：<a>.*</a> 贪婪会吞到最后一个 </a>，而非贪婪 <a>.*?</a> 在第一个 </a> 停下。性能问题：嵌套量词如 (a+)+ 匹配失败时引擎回溯组合呈指数级爆炸（灾难性回溯），一条恶意输入可拖垮 CPU。防范：1) 明确字符类替代通配 .*；2) 使用占有量词或原子组（第三方 regex 库）；3) 限制输入长度；4) 复杂解析放弃正则（HTML 用 BeautifulSoup）。【衍生知识点】Python 3.11 起 re 模块对部分回溯模式做了优化，但原理上无法完全免疫。
   【解析】非贪婪 + 边界 + 字符类是安全正则三件套。
320. **参考答案**：
   import re
   logs = "2026-09-27 ERROR disk full; 2026-09-28 INFO ok"
   pat = re.compile(r"(\d{4}-\d{2}-\d{2})\s+(\w+)\s+([^;]+)")
   for date, level, msg in pat.findall(logs):
       print(date, level, msg.strip())
   输出两行：2026-09-27 ERROR disk full 与 2026-09-28 INFO ok；命名组写法 (?P<date>\d{4}-...) 更可读。
   【解析】findall 返回元组列表，可直接解包三个变量；[^;]+ 吃到分号前保证消息完整。

## 内存管理与深浅拷贝 · 答案与解析

321. **A**对象引用计数归零立即释放；循环引用（互相引用的容器对象）由分代垃圾收集器定期扫描处理。【衍生知识点】gc 模块可手动 gc.collect()、gc.disable()；Python 3.14 引入增量式 GC 降低停顿；引用计数的优势是实时性与可预测性。
322. **B**copy() 是浅拷贝：外层列表是新的，但内层 [2,3] 仍是同一对象的引用，append 反映到两边。【衍生知识点】深拷贝 import copy; copy.deepcopy(a) 递归复制所有层级；浅拷贝方式：lst.copy()、lst[:]、list(lst)、copy.copy()。
323. **C**超出 [-5,256] 缓存的整数按普通对象创建；同一代码块中的相同字面量会被编译器共享。【衍生知识点】这是实现细节，绝不能在业务中依赖；比较数值永远用 ==。
324. **B**默认值在 def 时求值一次，两次调用操作同一列表。【衍生知识点】危险默认可变值 + 浅拷贝共享是 Python 两大经典坑，都源于“名字绑定对象”的语义。
325. **B**del 删除名字（变量本身），不直接销毁对象；引用计数归零对象才回收。【衍生知识点】对象可能被多处引用（闭包、全局、异常栈帧），只 del 一处不会回收；__del__（终结器）时机不确定，应避免依赖。
326. **B**普通实例属性存 __dict__（哈希表，开销大）；__slots__ 按槽位存储，百万实例可省 40%+ 内存。【衍生知识点】dataclass(slots=True) 一键启用；代价是失去动态属性与部分多继承兼容。
327. **B**生成器惰性产出、一次性消费，适合大数据流；列表支持随机访问与重复遍历。【衍生知识点】sys.getsizeof([i for i in range(100)]) 远大于生成器对象；需要既省内存又多次遍历时考虑生成器 + 物化策略。
328. **B**看似标识符的字符串（字母数字下划线）会被驻留复用，如 "hello" is "hello" 为 True；带空格等符号的则不一定。【衍生知识点】sys.intern(s) 可强制驻留高频重复字符串（如大量相同标签）优化内存与比较速度；同样是实现细节。
329. **B**拷贝不可变对象没有意义，实现上直接返回原对象（优化）。【衍生知识点】deepcopy 用 memo 字典处理循环引用，保证共享结构拷贝后仍共享、不无限递归。
330. **A**key 策略把每元素映射一次后缓存（decorate-sort-undecorate），比较只用映射值。【衍生知识点】这是 key 比 Python 2 的 cmp（每次比较两次调用）更高效的原因。
331. **A**weakref.ref(obj) 不增加强引用，对象回收后取值返回 None；缓存、观察者、大对象注册表用它避免泄漏。【衍生知识点】weakref.WeakValueDictionary/WeakKeyDictionary 常用于对象缓存；不是所有类型可弱引用（list/dict 需子类化）。
332. **B**二者都创建新外层列表但共享内层元素；嵌套结构需 deepcopy。【衍生知识点】 numpy 的 .copy() 类似概念；pandas 的 copy-on-write（2.0+）专门解决这类共享引发的问题。
333. ****getrefcount**。**getrefcount(x) 返回值比真实多 1（传参本身临时引用）。【衍生知识点】weakref.getweakrefcount 统计弱引用；gc.get_referrers 可反向找引用者（调试泄漏利器）。
334. ****deepcopy**。**copy.deepcopy 递归复制全部层级并处理循环引用。【衍生知识点】自定义拷贝行为可实现 __copy__/__deepcopy__（memo 参数要透传）。
335. ****:**。**lst[:] 全切片创建浅拷贝，同为 O(n)。【衍生知识点】tuple 没有 copy 方法，t[:] 即可；字符串不可变无需拷贝。
336. ****3 / 三**。**分代假设：越年轻越早死；0 代扫描最频繁，存活者晋升下一代，降低整体开销。【衍生知识点】gc.get_threshold() 返回 (700, 10, 10) 触发阈值；手动 gc.collect(generation) 可指定代。
337. ****-5**；**256**。**CPython 预建 [-5, 256] 的 int 对象池。【衍生知识点】这也是 x is y 面试题的出处；不同解释器（PyPy 等）范围不同。
338. ****None**；**[]**。**哨兵 None 判断后新建列表，避免共享。【衍生知识点】需要区分“没传”和“传了 None”时可用哨兵对象 _MISSING = object()。
339. **参考答案**：
   Python 变量是对象的“名字标签”，赋值 a = b 只复制引用不复制对象；对象分可变/不可变。默认参数陷阱：def 執行时求值 []，该列表对象被函数对象长期持有，所有调用通过同一名字绑定共享同一可变对象。浅拷贝问题：copy() 复制的是“名字列表”（第一层引用），内层元素仍是同一对象的别名，修改内层可见。两者本质相同：共享的是对象引用，可变对象被共享修改就会串味。【衍生知识点】对策统一：默认值用 None 哨兵；需要隔离用 copy.deepcopy；数据传递边界（跨函数/线程）优先不可变类型（tuple、frozen dataclass）。
   【解析】引用模型是贯穿 Python 内存语义的一条主线。
340. **参考答案**：
   import copy
   nested = [1, [2, 3]]
   shallow = nested.copy()
   deep = copy.deepcopy(nested)
   nested[1].append(99)
   print(nested)   # [1, [2, 3, 99]]
   print(shallow)  # [1, [2, 3, 99]]  内层共享
   print(deep)     # [1, [2, 3]]      完全独立
   浅拷贝跟着变，深拷贝不受影响。
   【解析】修改外层元素（nested[0]=x）则三种互不影响，因为浅拷贝的外层本来就是新列表。

## 并发编程 · 答案与解析

341. **A**CPython 中 GIL 使任意时刻仅一个线程执行字节码，因此 CPU 密集型多线程无法利用多核；I/O 等待时会释放 GIL，故 IO 密集多线程仍有效。【衍生知识点】绕过 GIL：multiprocessing、C 扩展释放 GIL（numpy）、subprocess、Python 3.13 自由线程构建（experimental，3.14 PEP 779 转正）；Python 3.14 还支持多解释器（PEP 734）实现进程内隔离并行。
342. **B**CPU 密集需真并行 → 多进程绕过 GIL；IO 密集等待时释放 GIL，多线程或 asyncio（单线程事件循环，更高并发）都合适。【衍生知识点】经验法则：并发 IO 上百连接选 asyncio；几十个选线程池；进程池注意序列化开销；混合型可拆分阶段分别处理。
343. **A**统一的执行器接口让线程/进程池可互换；future.result(timeout) 阻塞取结果。【衍生知识点】with ThreadPoolExecutor(max_workers=4) as ex: 自动 join；as_completed(futures) 按完成顺序迭代；ProcessPoolExecutor 传参必须可 pickle。
344. **B**协程是可暂停的函数；await 处主动让出，事件循环在就绪任务间切换，实现高并发 IO。【衍生知识点】async def 定义协程函数，调用返回协程对象不执行；asyncio.run(main()) 启动；await 只能出现在 async 函数内；asyncio.gather(*aws) 并发等待。
345. **B**即使有 GIL，check-then-act 等复合操作仍会被打断（竞态条件），需要 Lock/RLock 保护。【衍生知识点】死锁预防：按固定顺序加锁、用 with 自动释放、超时 acquire；线程安全队列 queue.Queue 内置锁，生产者-消费者首选。
346. **B**跨进程需要序列化；Queue/Pipe 用于消息，Manager 提供共享代理对象，Value/Array 共享原始值。【衍生知识点】这也要求任务参数与返回值可 pickle（lambda 不行，需模块级函数）；Windows 用 spawn 启动方式必须 if __name__ == "__main__" 保护。
347. **B**事件循环单线程，阻塞调用不让出控制权。应使用 await asyncio.sleep(5)、异步库（aiohttp/httpx）或 asyncio.to_thread(blocking_fn)（3.9+）转线程。【衍生知识点】检测阻塞：asyncio 的 debug 模式（PYTHONASYNCIODEBUG=1）报告超过 slow_callback_duration 的回调。
348. **A**counter += 1 实际是读-加-写三步，线程交错执行会互相覆盖，最终结果少于预期。【衍生知识点】++i 不存在的 Python 中 += 也不是原子的；保护手段：Lock、queue.Queue、collections 计数收敛到单线程、原子操作库。
349. **A**queue.Queue 线程安全、支持 put/get 阻塞与 maxsize 背压，是线程间传数据的首选。【衍生知识点】asyncio.Queue 用于协程；multiprocessing.Queue 用于进程；task_done()/join() 可等待消费完成。
350. **B**submit() 立即返回 Future；result() 取值（阻塞），done()/add_done_callback() 观察状态。【衍生知识点】asyncio.Future 与 Task（包装协程的 Future）同构；await future 挂起直到完成；取消用 cancel()。
351. **B**非守护线程会阻止进程退出直到其结束；守护线程适合心跳、监控等后台任务。【衍生知识点】守护线程被硬杀可能导致资源未清理；优雅退出用 signal + Event 通知 + join；daemon 标志必须在 start() 前设置。
352. **A**自由线程构建（python3.13t）移除 GIL 依赖，让多线程真正并行；3.14 起官方支持但需安装专用构建，扩展需适配。【衍生知识点】性能代价：单线程有约 5-10% 开销（持续优化）；多解释器（PEP 734 concurrent.interpreters）是另一种进程内并行选择；纯 Python 库在自由线程下自动受益。
353. ****函数名（可调用对象）**；**start**。**target 传可调用对象（不带括号），start() 启动；直接调用 target() 是普通函数调用。【衍生知识点】t.join() 等待结束；t.name/t.ident 调试用；同一 target 重复 start 抛 RuntimeError。
354. ****run**。**asyncio.run(main()) 创建事件循环、运行协程、清理退出，替代旧的 get_event_loop 手动管理。【衍生知识点】库代码中不应调用 run（用户代码才运行循环）；嵌套 run 会抛 RuntimeError。
355. ****Pool**；**map**。**进程池 map 与内置 map 同形但并行执行，返回结果列表。【衍生知识点】imap 惰性、imap_unordered 按完成序；ProcessPoolExecutor 是更现代的统一接口。
356. ****to_thread**。**asyncio.to_thread（3.9+）把同步函数丢进默认线程池，返回可 await 的协程。【衍生知识点】CPU 密集则用 loop.run_in_executor(ProcessPoolExecutor,...)；aiofiles 之类库内部就是这个套路。
357. ****竞态（race）**；**锁 Lock/互斥锁**。**with lock: 保证同一时刻仅一个线程进入临界区。【衍生知识点】RLock 可重入；Semaphore 限流；Condition 条件等待；Event 事件通知。
358. ****Global Interpreter Lock（全局解释器锁）**。**GIL 是 CPython 解释器的互斥锁，保证字节码执行的原子性与内存管理安全。【衍生知识点】Jython/IronPython 无 GIL；Python 3.13 自由线程构建开始摆脱 GIL。
359. **参考答案**：
   threading：操作系统线程，受 GIL 限制（CPython）无法 CPU 并行；适合 IO 密集（网络/磁盘等待释放 GIL）；注意竞态需加锁，共享内存方便但危险。multiprocessing：多进程真并行绕过 GIL，适合 CPU 密集；代价是进程创建/切换开销与 pickle 传参限制，启动方式（fork/spawn）影响代码写法。asyncio：单线程事件循环 + 协程切换，并发数千上万 IO 连接时开销最小；要求全链路异步库，遇到阻塞调用会让整个循环卡住（用 to_thread/异步库解决）。选择：CPU 密集→进程池；少量并发 IO→线程池；大规模 IO 并发→asyncio。【衍生知识点】三者可通过 concurrent.futures 统一接口互换；Python 3.13+ 自由线程构建让 threading 也能 CPU 并行，生态正在演变。
   【解析】三种模型 + GIL 是 Python 并发的核心知识框架。
360. **参考答案**：
   from concurrent.futures import ThreadPoolExecutor
   import time
   
   def fetch(url):
       time.sleep(1)          # 模拟网络 IO
       return f"{url} done"
   
   urls = ["a", "b", "c"]
   t0 = time.perf_counter()
   with ThreadPoolExecutor(3) as ex:
       for res in ex.map(fetch, urls):
           print(res)
   print(f"总耗时 {time.perf_counter()-t0:.2f}s")  # 约 1s 而非 3s
   
   # asyncio 要点：
   # async def fetch(url): await asyncio.sleep(1); return ...
   # results = await asyncio.gather(*[fetch(u) for u in urls])
   线程池并发 3 个 1 秒任务总耗时约 1 秒；asyncio 用 gather 并发协程。
   【解析】IO 密集场景下两者都绕过了串行等待；切换成本与生态决定了选型。

## 类型注解与新特性 · 答案与解析

361. **B**注解存入 __annotations__，运行时不校验；静态检查由 mypy/pyright 等完成。【衍生知识点】PEP 649（3.14）：注解改为延迟求值，前向引用无需再加引号，annotationlib 可检查；运行时强制校验可用 pydantic 等库。
362. **A**3.10 起 | 代替 Union；内置泛型 list[...] 替代 typing.List（3.9+）。【衍生知识点】旧写法 typing.List[Union[int, str]] 仍兼容；Optional[int] 即 int | None；Sequence/Iterable 等抽象类型优先于具体容器类型（鸭子类型友好）。
363. **B**PEP 498 在 3.6 引入 f-string；3.8 加 {expr=} 自描述；3.12 放宽嵌套引号限制；3.14 引入模板字符串 t-string（PEP 750）作为其安全扩展。【衍生知识点】t-string 产生 Template 对象不直接拼接，由处理库决定转义策略，用于 HTML/SQL 防注入。
364. **B**赋值表达式让“取值-判断-使用”一步完成，减少重复计算与临时变量。【衍生知识点】典型场景：while 循环读取、推导式内条件赋值 [y for x in data if (y := f(x)) > 0]；不要滥用，普通赋值仍用 =。
365. **B**3.10（PEP 634-636）引入 match 语句：字面量、捕获、序列/映射/类模式与守卫。【衍生知识点】3.12（PEP 695）引入类型参数新语法 def f[T](x: T) 与 type 别名语句；3.14（PEP 649）延迟注解。
366. **B**dataclass 是普通类生成器，灵活可变；NamedTuple 继承元组，支持解包与索引且不可变。【衍生知识点】需要哈希作字典键：frozen dataclass 或 NamedTuple；需要字段变更：dataclass；TypedDict 则为 dict 提供字段级类型（3.8+）。
367. **B**3.13（2024-10）带来实验 JIT、free-threading 实验构建、PyREPL 改进、移除“死电池”模块（PEP 594：cgi、telnetlib 等）。【衍生知识点】3.14（2025-10）：t-string、延迟注解、多解释器、compression.zstd、自由线程转正（PEP 779）、REPL 语法高亮、实验 JIT 进入官方二进制。
368. **B**class SupportsClose(Protocol): def close(self): ...，任何有 close 方法的类都满足该类型，mypy 静态判定。【衍生知识点】@runtime_checkable 让 isinstance 也可按结构检查（只查方法存在性）；Protocol 是 Go 接口风格，比 ABC 更松耦合。
369. **B**默认 zip 截断到最短；strict=True 让不等长报错，防止静默丢数据。【衍生知识点】itertools.zip_longest(fillvalue=...) 补齐到最长；数据处理管道中 strict=True 是防御性编程利器。
370. **B**T 让 first([1,2]) 推导返回 int、first(["a"]) 推导 str，保证输入输出类型关联。【衍生知识点】旧写法 T = TypeVar("T") 仍可用；约束 TypeVar("T", bound=Number) 限定上界；泛型类 class Stack[T]（3.12+）同步简化。
371. **A**PEP 585 让内置类型可直接作泛型注解，不再需要 typing.List；3.9 还带来 str.removeprefix/removesuffix 方法。【衍生知识点】removeprefix/removesuffix 终结了 if s.startswith(p): s = s[len(p):] 的样板代码。
372. **B**注解虽不被语言强制，但库可主动消费：pydantic 校验+转换，FastAPI 据此生成文档与参数解析。【衍生知识点】PEP 649 延迟注解让含前向引用/复杂表达式的注解更健壮；typing.get_type_hints / annotationlib.get_annotations 是标准读取入口。
373. ****None**。**int | None 与 Optional[int] 等价。【衍生知识点】| 语法的本质是 types.UnionType；Optional 从不意味着“可选参数”，而是“可为 None”。
374. ****type**。**PEP 695 type 语句创建懒求值别名，替代旧式 Vector = List[float] 赋值。【衍生知识点】type 语句创建 TypeAliasType 实例；旧别名与 typing.TypeAlias 注解仍兼容。
375. ****case**。**match subject: case pattern: ...；case _ 通配兜底。【衍生知识点】模式可解包序列/字典、实例化类模式 Point(x=0)、或模式 |、加 if 守卫。
376. ****:= / （:=）**。**赋值表达式 PEP 572，在表达式内完成赋值。【衍生知识点】名字取自海象眼睛与獠牙的形似；用于 while 与推导式最有价值。
377. ****t / t-string 前缀 t**。**PEP 750：t-string 产生 Template 对象（strings+interpolations），由处理函数决定转义，防止注入。【衍生知识点】与 f-string 同语法但求值延迟；预期用于 HTML 模板、SQL 构造器等库。
378. ****延迟求值（用到时才求值）**。**3.14 起注解存为 annotate 函数，按需以 VALUE/FORWARDREF/STRING 三种格式求值。【衍生知识点】自引用类注解 class Node: next: Node | None 无需 from __future__ import annotations；性能上定义时几乎零成本。
379. **参考答案**：
   3.8：海象运算符 := 与仅位置参数 /（PEP 570/572）；3.9：字典合并 | 与内置泛型注解 list[int]（PEP 584/585）；3.10：match...case 结构化模式匹配（PEP 634）与联合类型 int | None（PEP 604）；3.11：异常组 ExceptionGroup/except* 与大幅提速（Faster CPython）；3.12：PEP 695 泛型新语法与 f-string 放宽、类型参数语句；3.13：实验性 JIT、自由线程实验构建、PyREPL；3.14：模板字符串 t-string（PEP 750）、延迟注解（PEP 649）、多解释器标准库（PEP 734）、自由线程正式支持（PEP 779）。【衍生知识点】升级前查 Porting 文档关注移除项（3.13 移除 cgi/telnetlib 等“死电池”，3.12 移除 distutils）。
   【解析】版本演进脉络是面试与升级评估的高频考点。
380. **参考答案**：
   def top_n(items: list[tuple[str, int]], n: int = 3) -> list[tuple[str, int]]:
       return sorted(items, key=lambda p: p[1], reverse=True)[:n]
   
   data = [("a", 3), ("b", 9), ("c", 1), ("d", 7)]
   result = top_n(data, 2)
   
   match result:
       case []:
           print("无数据")
       case [(first_name, first_score), *rest]:
           print(f"第一名 {first_name}: {first_score}，共 {1 + len(rest)} 条")
   输出：第一名 b: 9，共 2 条。
   【解析】sorted+key+切片三件套；match 的序列模式同时完成判空与解包，比 if/else 更表达意图。

## 综合应用与常见坑 · 答案与解析

381. **A**is 比较对象身份，仅适合 None/True/False 等单例；值比较一律 ==。【衍生知识点】PEP 8 明确写：与 None 比较必须 is None / is not None；isinstance 替代 type(x) == int。
382. **A**哈希表依赖“键的哈希在生命周期内不变”；list 无 __hash__ 直接 TypeError，自定义可变类即使能哈希，修改后也检索不到。【衍生知识点】这就是“可哈希 ⇒（应）不可变”的原因；dataclass(eq=True) 默认 unsafe_hash=False 正是防止这种不一致。
383. **B**循环内 lst = [] 每轮重新绑定新列表，append 后下轮被丢弃，只留最后一轮的 [2]。【衍生知识点】初始化变量放循环外是基本准则；类似错误还有在循环内重复 open 文件、重复建数据库连接。
384. **B**文件行保留行尾 \n，print 默认 end="\n"，双重换行；解决：print(line, end="") 或 line.rstrip()。【衍生知识点】用 line.rstrip("\n") 比 strip() 更精确（不误删行首尾有意义空白）。
385. **B**窄捕获让不同错误有不同恢复策略，也避免吞掉未知 bug。【衍生知识点】多层结构：底层抛具体异常 → 中层翻译为业务异常（raise ... from）→ 顶层统一日志与兜底；这是可维护错误处理的骨架。
386. **A**None 是 NoneType 的唯一实例（单例）。【衍生知识点】判断 None 用 is None；函数没有返回值时默认返回 None，打印函数调用结果出现 None 是漏写 return 的信号。
387. **C**序列下标必须是整数或切片，浮点数直接 TypeError（即便 1.0 数值上等于 1）。【衍生知识点】numpy 数组允许浮点索引是特例；需要转换时 int(1.0) 或用 round。
388. **B**迭代字典时增删键会改变大小，触发 RuntimeError。【衍生知识点】安全写法：先 list(d) 拷贝键再迭代，或构建新字典 {**d, "b": 2}；删除同理 d.pop 需在遍历副本时进行。
389. **B**Python 是强类型，不会隐式转换；在系统边界（input、API、CSV）统一校验转换，内部保持类型一致。【衍生知识点】pydantic/attrs 在边界做类型强制；字符串数字排序前必须转数字，否则 "10" < "9"。
390. **B**切片按范围截断宽容处理，单下标必须有效。【衍生知识点】利用切片宽容性可写 lst[:10000] 取“最多这么多”；而下标访问前的越界检查可改成 if i < len(lst)。
391. **B**str（Unicode 文本）与 bytes（原始字节）是两种类型，必须显式 encode/decode 转换。【衍生知识点】s.encode("utf-8")、b.decode("utf-8")；网络与文件 I/O 边界都是 bytes，进入业务层尽早 decode。
392. **C**空列表为假值，if not lst: 简洁且不会把 None 误判为“非空列表”以外的问题。【衍生知识点】区分 None 与空列表时两者都要判：if lst is not None and lst:；PEP 8 推荐对序列/字典等容器直接用真值测试。
393. ****is / is not（否定时）**。**None 是单例，用 is 身份比较；== 可能被自定义 __eq__ 干扰。【衍生知识点】PEP 8 明确要求；同样 True/False 也用 is（或直接 if x:）。
394. ****RuntimeError**；**list**。**list(d) 拷贝键列表，对原字典的修改不再影响遍历。【衍生知识点】Python 3.8 前后行为一致；值可以在迭代时修改（不改变键集合），但为清晰起见也建议避免。
395. ****True**；**字符（码点/字典序）**。**字符串比较逐字符按 Unicode 码点，"1"(49) < "9"(57)，因此 "10" < "9" 为 True。【衍生知识点】数字排序必须先转 int/float；版本号比较用 tuple(map(int, v.split(".")))。
396. ****bytes**；**str**。**encode 文本→字节，decode 字节→文本。【衍生知识点】解码用错编码会 UnicodeDecodeError 或乱码（ mojibake ）；不确定编码时 chardet/charset-normalizer 可探测。
397. ****isclose**。**isclose 默认相对容差 1e-09，处理二进制浮点误差。【衍生知识点】金额计算用 decimal.Decimal("0.1")；分数用 fractions.Fraction。
398. ****按对象引用/共享传参（call by object reference）**。**传的是对象引用的副本：重新绑定参数不影响外部，但修改可变对象内容会影响外部。【衍生知识点】因此文档应注明函数是否有副作用；防御式做法在入口 copy 或 deepcopy。
399. **参考答案**：
   1) 可变默认参数：def f(x=[]) 共享状态 → 用 None 哨兵；2) 浅拷贝共享嵌套对象：b = a.copy() 改内层互相影响 → copy.deepcopy；3) is 误用于值比较（整数缓存巧合）→ 值用 ==、None 用 is；4) 迭代字典时增删键 RuntimeError → 遍历 list(d) 副本；5) 浮点误差 0.1+0.2 != 0.3 → math.isclose / Decimal。【衍生知识点】静态工具可提前暴露多数坑：mypy（类型）、ruff/flake8（风格与错误模式）、bandit（安全）；写单元测试（pytest）是把坑变成回归用例的最终手段。
   【解析】坑的本质都是“引用语义 + 可变性”，理解模型即可举一反三。
400. **参考答案**：
   修复后：
   def average(nums=None):
       if not nums:
           return 0.0          # 修复 bug3：空列表除零（ZeroDivisionError）
       return sum(nums) / len(nums)
   
   print(average([1, 2, 3]))  # 2.0
   print(average())           # 0.0
   三个 bug：1) 可变默认参数 [] 应改为 None 哨兵；2) 手动累加循环可简化为 sum（非 bug 但属优化）；3) 空列表时 len=0 除零崩溃，需前置判断。
   【解析】代码审查三问：默认值可变吗？边界输入安全吗？有没有内置函数替代手写循环？
