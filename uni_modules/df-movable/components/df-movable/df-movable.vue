<template>
  <view
    class="content"
    :id="'dfMoveable' + keys"
    :key="'dfMoveable' + keys"
    :style="{
      height: `${imginfo.height}px`,
      width: `${imginfo.width}px`,
      transform: `translate(${imginfo.x * parentScale}px,${
        imginfo.y * parentScale
      }px) rotate(${imginfo.rotate}deg)  scale(${imginfo.scale})`,
    }"
  >
    <view
      class="logo"
      @touchstart="WraptouchStart"
      @touchmove="WraptouchMove"
      @touchend="WraptouchEnd"
    >
      <slot></slot>
    </view>
    <view
      class="fangda"
      :style="{ transform: `scale(${(parentScale * 1) / imginfo.scale})` }"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <image class="image" src="../../static/rotate.svg"></image>
    </view>

    <text
      class="drag-point drag-top"
      :style="{ left: dragPointLeft }"
      @touchmove="pointTouchMove($event, 'top')"
    ></text>

    <text
      class="drag-point drag-right"
      :style="{ top: dragPointTop }"
      @touchmove="pointTouchMove($event, 'right')"
    ></text>

    <text
      class="drag-point drag-bottom"
      :style="{ left: dragPointLeft }"
      @touchmove="pointTouchMove($event, 'bottom')"
    ></text>

    <text
      class="drag-point drag-left"
      :style="{ top: dragPointTop }"
      @touchmove="pointTouchMove($event, 'left')"
    ></text>
  </view>
</template>

<script>
export default {
  name: "duMoveable",
  props: {
    keys: {
      type: [Number, String],
      default: "mv",
    },
    rotate: {
      type: [Number],
      default: 0,
    },
    scale: {
      type: [Number],
      default: 1,
    },
    x: {
      type: [Number],
      default: 0,
    },
    y: {
      type: [Number],
      default: 0,
    },
    parentScale: {
      type: [Number],
      default: 1,
    },
    load: {
      type: [Boolean],
      default: true,
    },
    width: {
      type: [Number],
      default: 200,
    },
    height: {
      type: [Number],
      default: 50,
    },
  },
  data() {
    return {
      zoom: 1,
      imginfo: {
        numberLock: false,
        tDistance: 0,
        lx: 0,
        ly: 0,
        x: 0,
        y: 0,
        tx: 0,
        ty: 0,
        _tx: 0,
        _ty: 0,
        scale: 1, //缩放比例
        _scale: 1,
        rotate: 0, //倾斜角度
        angleNext: 0,
        width: 0,
        height: 0,
      },
      mv_o: [0, 0],
      dragPointTop: 0,
      dragPointLeft: 0,

      rightX:0,//右下角坐标
      bottomY:0,//右下角坐标
    };
  },
  watch: {
    x: function (newVal, oldVal) {
      this.imginfo.x = newVal;
    },
    y: function (newVal, oldVal) {
      this.imginfo.y = newVal;
    },
    scale: function (newVal, oldVal) {
      this.imginfo.scale = newVal;
      this.imginfo._scale = newVal;
    },
    rotate: function (newVal, oldVal) {
      this.imginfo.rotate = newVal;
    },

    "imginfo.width": function (newVal, oldVal) {
      this.dragPointLeft = newVal / 2 - 7 + "px";
      this.rightX= this.imginfo.x+this.imginfo.width
    },
    "imginfo.height": function (newVal, oldVal) {
      this.dragPointTop = newVal / 2 - 7 + "px";
      this.bottomY= this.imginfo.y+this.imginfo.height
    },
  },
  created() {
    this.imginfo.scale = this.scale;
    this.imginfo._scale = this.scale;
    this.imginfo.rotate = this.rotate;
    this.imginfo.x = this.x;
    this.imginfo.y = this.y;
    this.imginfo.height = this.height;
    this.imginfo.width = this.width;
    this.$nextTick(() => {
      this.updateCoord();
    });
  },
  methods: {
    updateCoord() {
      const query = uni.createSelectorQuery().in(this);
      query
        .select("#dfMoveable" + this.keys)
        .boundingClientRect((data) => {
          let { left, top, width, height } = data;
          this.mv_o[0] = left + width / 2;
          this.mv_o[1] = top + height / 2;
        })
        .exec();
    },
    WraptouchStart(e) {
      if (e.touches.length === 1) {
        if (this.numberLock) return;
        this.imginfo.lx = e.touches[0].clientX;
        this.imginfo.ly = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        this.numberLock = true;
        this.tDistance = this.getDistancs(
          e.touches[0].pageX,
          e.touches[0].pageY,
          e.touches[1].pageX,
          e.touches[1].pageY
        );
      }
    },
    WraptouchMove(e) {
      if (e.touches.length === 1) {
        if (this.numberLock) return;
        this.imginfo.x += (e.touches[0].clientX - this.imginfo.lx) / this.zoom;
        this.imginfo.y += (e.touches[0].clientY - this.imginfo.ly) / this.zoom;
        this.imginfo.lx = e.touches[0].clientX;
        this.imginfo.ly = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        let NewDistance = this.getDistancs(
          e.touches[0].pageX,
          e.touches[0].pageY,
          e.touches[1].pageX,
          e.touches[1].pageY
        );
        this.imginfo.scale =
          (NewDistance / this.tDistance) * this.imginfo._scale;
        this.astrictScale();
      }
    },
    WraptouchEnd(e) {
      if (e.touches.length === 0) {
        this.numberLock = false;
      }
      this.updateCoord();
      this.back();
    },
    //缩放控件事件
    touchStart(e) {
      this.imginfo.tx = e.touches[0].clientX;
      this.imginfo.ty = e.touches[0].clientY;
      this.updateCoord();
      this.imginfo.dist = this.getDistancs(
        this.mv_o[0],
        this.mv_o[1],
        this.imginfo.tx,
        this.imginfo.ty
      );
      this.imginfo.anglePre =
        this.countDeg(
          this.mv_o[0],
          this.mv_o[1],
          this.imginfo.tx,
          this.imginfo.ty
        ) - this.imginfo.rotate;
    },
    touchMove(e) {
      this.imginfo._tx = e.touches[0].clientX;
      this.imginfo._ty = e.touches[0].clientY;
      let newdist = this.getDistancs(
        this.mv_o[0],
        this.mv_o[1],
        this.imginfo._tx,
        this.imginfo._ty
      );
      this.imginfo.scale = (newdist / this.imginfo.dist) * this.imginfo._scale;
      this.astrictScale();
      this.imginfo.angleNext = this.countDeg(
        this.mv_o[0],
        this.mv_o[1],
        this.imginfo._tx,
        this.imginfo._ty
      );
      this.imginfo.rotate = this.imginfo.angleNext - this.imginfo.anglePre;
    },

    pointTouchMove(e, type) {
      let { x, y } = this.imginfo;
      //   console.log(e.touches[0].clientX-x)
      if (type == "right") {
        this.imginfo.width = e.touches[0].clientX - x;
      }
      if(type == "left"){
        // console.log('左侧啦', e.touches[0].clientX)
        this.imginfo.x = e.touches[0].clientX;
        this.imginfo.width =this.rightX- e.touches[0].clientX;
      }
      if(type == "top"){
        this.imginfo.y = e.touches[0].clientY;
     
        this.imginfo.height =this.bottomY- e.touches[0].clientY;
      }
      if (type == "bottom") {
        this.imginfo.height = e.touches[0].clientY - y;
      }
    },
    touchEnd() {
      this.back();
    },
    astrictScale() {
      if (Math.abs(this.imginfo.scale) > 5) {
        //设置最大缩放为2倍
        this.imginfo.scale = 5;
      }
      if (Math.abs(this.imginfo.scale) < 0.5) {
        //设置最小缩放为0.5倍
        this.imginfo.scale = 0.5;
      }
    },
    back() {
      this.imginfo._scale = this.imginfo.scale;
      this.$emit("movableEnd", {
        keys: this.keys,
        x: this.imginfo.x,
        y: this.imginfo.y,
        scale: this.imginfo.scale,
        rotate: this.imginfo.rotate,
      });
    },
    //勾股定理
    getDistancs(cx, cy, pointer_x, pointer_y) {
      var ox = pointer_x - cx;
      var oy = pointer_y - cy;
      return Math.sqrt(ox * ox + oy * oy);
    },
    countDeg(cx, cy, pointer_x, pointer_y) {
      var ox = pointer_x - cx;
      var oy = pointer_y - cy;
      var to = Math.abs(ox / oy);
      var angle = (Math.atan(to) / (2 * Math.PI)) * 360; //鼠标相对于旋转中心的角度
      if (ox < 0 && oy < 0) {
        angle = -angle;
      } else if (ox <= 0 && oy >= 0) {
        //左下角
        angle = -(180 - angle);
      } else if (ox > 0 && oy < 0) {
        //右上角
        angle = angle;
      } else if (ox > 0 && oy > 0) {
        //右下角
        angle = 180 - angle;
      }
      return angle;
    },
  },
};
</script>

<style>
page {
  overflow: hidden;
  height: 100%;
}

.content {
  margin: 0;
  position: absolute;
  border: 2px solid #b0d4f3;
  font-size: 60rpx;
}

.logo {
  height: 100%;
  width: 100%;
  display: block;
  background-color: #ffffff;
}

.fangda {
  position: absolute;
  width: 18px;
  height: 18px;
  z-index: 99;
  right: -6px;
  top: -20px;
  background-color: #999;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fangda .image {
  width: 80%;
  height: 80%;
  display: inline-block;
  transform: rotate(-39deg);
}
/* 
.right-point {
 

 
  top: 10px;
} */

.drag-right,
.drag-left {
  height: 14px;
  width: 6px;
  background: red;
  border-radius: 5rpx;
  display: inline-block;
  position: absolute;
}
.drag-right {
  right: -4px;
}
.drag-left {
  left: -4px;
}
.drag-top,
.drag-bottom {
  width: 14px;
  height: 6px;
  background: red;
  border-radius: 5rpx;
  display: inline-block;
  position: absolute;
}
.drag-top {
  top: -4px;
}
.drag-bottom {
  bottom: -4px;
}
</style>
