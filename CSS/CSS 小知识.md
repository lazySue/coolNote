# vh = window.innerHeight包含滚动条高度和document.body.clientHeight
    window 没有 clientHeight
    body.clientHeight是元素可视区域的高
    body.offsetHeight是元素实际高度
# H5页面滚动最好放在 window 层，没必要给页面第一层设置 height

# box-shadow
```
/**
 * spread：阴影 会往外扩
 * blur: 模糊距离
 * @type {[type]}
 */
box-shadow: h v blur(模糊) spread(阴影) color inset;
```

# border-radius
```
border-radius: 1-4 length|% / 1-4 length|%;
border-radius: 50px; ===> border-radius: 50px 50px 50px 50px / 50px 50px 50px 50px;
border-radius: 10px 20px 30px 40px / 40px 30px 20px 10px;
```
"/"之前的四个数值表示圆角的水平半径，后面四个值表示圆角的垂直半径，也就是从左上(10px/40px),右上(20px/30px),右下(30px/20px),左下(40px/10px)

# background: linear-gradient(角度, 颜色 颜色位置, 颜色 颜色位置, ...)
* 角度：从下到上为0°，默认从上到下（180°），可使用top, bottom, left, right 组合
* 颜色：至少有两个，起始和结束
* 可以用透明色

# 换行

* 不换行
  white-space: nowarp;

* 自动换行
  word-warp: break-word;

* 英文单词断行（display: block;）
  word-break: break-all;

* 省略号
  text-overflow: ellipsis; overflow: hidden;