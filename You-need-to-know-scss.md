# scss 进阶知识点

"嵌套"和"变量"功能大家都熟, 这里讲一下其他的语法.

https://sass-lang.com/documentation

## 属性嵌套

```scss
.enlarge {
  font-size: 14px;
  transition: {
    property: font-size;
    duration: 4s;
    delay: 2s;
  }
```

**编译后:**

```css
.enlarge {
  font-size: 14px;
  transition-property: font-size;
  transition-duration: 4s;
  transition-delay: 2s;
}
```

## 属性值为"null"

属性值为"null", 跳过当条样式.

```scss
$rounded-corners: false;

.button {
  border: 1px solid black;
  border-radius: if($rounded-corners, 5px, null);
}
```

**编译后:**

```css
.button {
  border: 1px solid black;
}
```

## 插值(模板标签)

可以类比 ES6 中的`${}`语法理解.

```scss
$title = foods;
.category-#{$title}{
  color:red;
}
```

**编译后:**

```css
.category-foods {
  color: red;
}
```

## 占位(%)

其实可以理解成变量, 专门用来存储 css 键值对的. 要配合"@extend"使用.

```scss
%color {
  color: red;
}

.footer {
  @extend %color;
}
```

**编译后:**

```css
.footer {
  color: red;
}
```

## 变量默认值(!default)

一般用来保证外部引入的变量有默认值.

```scss
$black: red;

$black: #000 !default;
code {
  color: $black;
}
```

**编译后:**

```css
code {
  color: red;
}
```

## 全局/局部变量

```scss
$variable: 全局变量;
.rule-1 {
  $variable: 局部变量;
  //  局部变量
  value: $variable;
}

.rule-2 {
  value: $variable;
}
```

**编译后:**

```css
.rule-1 {
  value: 局部变量;
}

.rule-2 {
  value: 全局变量;
}
```

## @use

"@use"用来导入样式, 也是 sass 官方推荐的导入方式, 对比"**@import**"优点如下:

### 同一文件"@use"多次, 也只导入 1 次.

```scss
// a.scss
.a {
  color: red;
}
```

```scss
@import "./a";
@import "./a";
```

**编译后:**

```css
.a {
  color: red;
}
```

### @use 支持命名空间.

```scss
// mixin.scss
@mixin ellipsis($rowCount: 1) {
  @if $rowCount <=1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: $rowCount;
    -webkit-box-orient: vertical;
  }
}
```

```scss
@use "./mixin" as mix;
.a {
  @include mix.ellipsis(2);
}
```

### 可配置

通过 with 显式的覆盖模块中的变量, 前提模块中的变量需要标记"**!default**".

```scss
// a.scss
$color: red !default;
.a {
  color: $color;
}
```

```scss
@use "a.scss" with($color: green);
```

**编译后:**

```css
.a {
  color: green;
}
```

### 以"-"或"\_"开头的变量被认为是私有变量, 不能导入外部文件.

```scss
// var.scss;
$red: "red";
$_black: "#000";
$-white: "#fff";
```

```scss
@use var.scss .red {
  color: $red;
}

.red {
  color: $_black; // 报错, 私有变量不能访问.
}

.red {
  color: $-white; // 报错, 私有变量不能访问.
}
```

### 让@use 和@import 一样

@use 导出变量/mixin/function 需要通过命名空间, 而@import 的导出是全局的, 如果你想@use 也导出全局的, 那么可以使用"\*".

```scss
@use "shared.scss" as *;
// 等价
@import "shared.scss";
```

## 带"\_"的文件名,不被单独编译

带"\_"的文件名,不被编译, 但是可以被其他 scss 引入.

```
// _a.scss
.a{color:red;}
```

```scss
// main.scss
@use "./_a";
```

只会生成 main.css.

## @forward

用来引入 scss, 但是在引入后不能在当前文件使用,自身也不会被编译, 主要用来**整合**多个 scss 到一个文件, 供其他文件使用@use/@import 导入.

```scss
// 1.scss
$color: red;
```

```scss
// 2.scss
@forward "1.scss";
```

```scss
// main.scss
@use "2.scss" as m;
.c {
  color: m.$color;
}
```

### show / hide

通过"show / hide"关键字, 可以控制哪些内容可以导出.

```scss
// 1.scss
$color: red;
$width: 100px;
```

```scss
// 2.scss
@forward "1.scss" hide m;
```

```scss
// main.scss
@use "2.scss" as m;
.c {
  color: m.$color; // 报错, 没有$color
}
```

这里用 hide 举例, 表示隐藏模块中的某个导出, 也可使用"**show**表示哪个内容可以导出, 其他都不可以导出.

### with

和[@use 的 with](可配置)功能一样.

```scss
@forward "library" with (
  $black: #222 !default
);
```

## @debug / @warn / @danger

类似 js 中的 console, 内容会输出到控制台.

```scss
$color: "#f10";
@warn $color;
```

![image](https://user-images.githubusercontent.com/8264787/149251193-2353ee29-0913-433f-95e5-545636d96f07.png)

## @mixin 和@include

成对使用, @mixin 用来定义代码片段(也可以理解为函数, 返回内容为样式), @include 用来执行@mixin.

```scss
@mixin reset-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

@mixin horizontal-list {
  @include reset-list;

  li {
    display: inline-block;
    margin: {
      left: -2px;
      right: 2em;
    }
  }
}

nav ul {
  @include horizontal-list;
}
```

**编译后:**

```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav ul li {
  display: inline-block;
  margin-left: -2px;
  margin-right: 2em;
}
```

### @content

占位符, 在@mixin 内部使用, 功能类似 vue 中的 slot.

```scss
SCSS SYNTAX @mixin hover {
  &:not([disabled]):hover {
    @content;
  }
}

.button {
  border: 1px solid black;
  @include hover {
    border-width: 2px;
  }
}
```

**编译后:**

```css
.button {
  border: 1px solid black;
}
.button:not([disabled]):hover {
  border-width: 2px;
}
```

## @if & @else

最基础的流程控制

```scss
@mixin ellipsis($rowCount: 1) {
  @if $rowCount <=1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: $rowCount;
    -webkit-box-orient: vertical;
  }
}
```

## @foreach

可以循环数组和 map.

### 循环数组

```scss
// 数组
$sizes: 40px, 50px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}
```

**编译后:**

```css
.icon-40px {
  font-size: 40px;
  height: 40px;
  width: 40px;
}

.icon-50px {
  font-size: 50px;
  height: 50px;
  width: 50px;
}
```

### 循环 map

```scss
// map
$map: (
  "red": #f10,
  "green": #0f0,
);

@each $k, $v in $map {
  .text-#{$k} {
    color: $v;
  }
}
```

**编译后:**

```css
.text-red {
  color: #f10;
}

.text-green {
  color: #0f0;
}
```

## @for

当你需要每次循环的索引时, @foreach 就不行了.

```scss
$base-color: #036;

@for $i from 1 through 3 {
  ul:nth-child(3n + #{$i}) {
    background-color: lighten($base-color, $i * 5%);
  }
}
```

**编译后:**

```css
ul:nth-child(3n + 1) {
  background-color: #004080;
}

ul:nth-child(3n + 2) {
  background-color: #004d99;
}

ul:nth-child(3n + 3) {
  background-color: #0059b3;
}
```

## @function

函数,和@mixin 的区别是,函数专门用来处理数据并返回, 使用@return 返回数据.

```scss
@function sum($numbers...) {
  $sum: 0;
  @each $number in $numbers {
    $sum: $sum + $number;
  }
  @return $sum;
}

.micro {
  width: sum(50px, 30px, 100px);
}
```

## 未完

## @use "sass:map"

使用@use 加载内部模块, 比如 map 模块.

```scss
@use "sass:map";

$theme-colors: (
  "success": #28a745,
  "info": #17a2b8,
  "warning": #ffc107,
);

.alert {
  background-color: map.get($theme-colors, "warning");
}
```

**编译后:**

```css
.alert {
  background-color: #ffc107;
}
```

## 内置模块

### sass:selector
输入2个选择器, 生成兼容2个选择器的新选择器.
```scss
@use "sass:selector";
@debug selector.unify(".a", ".b"); 
@debug selector.unify(".a", ".b,.c");
@debug selector.unify("div", "h1");
#{selector.unify(".a", ".b")}{
  color:#f10;
}
```
**编译后:**
```css
.a.b {
  color: #f10;
}
```

未完继续
https://sass-lang.com/documentation/variables

## 内置函数

### unique-id

[x] dart sass
生成唯一值

```scss
.goods-#{unique-id()} {
  color: red;
}
```

**编译后:**

```css
.goods-ukv14gf {
  color: red;
}
```

### meta.inspect

https://sass-lang.com/documentation/style-rules/declarations
