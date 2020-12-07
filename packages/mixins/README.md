# @5a.css/mixins
常用mixin(scss)

## 使用
```javascript
import '@5a.css/mixins';
```

## ellipsis($rowCount:1)
截取指定行文字, 并生成省略号.
**$rowCount**: 截取多少行, 默认值1

```scss
// 截取2行文字, 后面显示省略号.
.text-short-2 {
    @include ellipsis(2)
}
```

## triangle($size: 5px, $color: rgba(0, 0, 0, 0.6), $dir: bottom)
生成等边三角形

**$size**: 三角形边长.

**$color**: 背景色.

**$dir**: 三角形箭头指向.

```scss
// 边长为5px, 箭头朝下的红色等边三角形.
.triangle-down {
  @include triangle(5px, #f10, bottom);
}
```

## thinBorder($directionMaps: bottom, $color: #ccc, $radius: (0, 0, 0, 0), $position: after)
真1px像素边框.

**$directionMaps**:  是个list类型可以传入多个方向, 也就是可以生成多个防线边框.

**$color**: 边框颜色.

**$radius**: 边框圆角.

**$position**: 由于边框是通过伪类实现的, 所以可以指定'after'还是'before'

### 单侧边框
生成`.border-top-1px`等4个单侧边框;
```scss
@each $dir in (top,right,bottom,left) {
  .border-#{$dir}-#{1}px {
    @include thinBorder( $dir);
  }
}
```

### 多侧边框
生成"红色"的多侧边框`.border-top-left-red-1px`
```scss
  .border-top-left-red-1px{
    @include thinBorder((top,left), red);
  }
```

### 圆角边框
生成带100px圆角的边框 `.border-top-left-round-1px`
```scss
  .border-top-left-red-1px{
    @include thinBorder(top, red, 100px);
  }
```

### 使用`:before`去生成边框
```scss
  .border-top-before{
    @include thinBorder(top, red, 0, before);
  }
```