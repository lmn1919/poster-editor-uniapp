"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "duMoveable",
  props: {
    keys: {
      type: [Number, String],
      default: "mv"
    },
    rotate: {
      type: [Number],
      default: 0
    },
    scale: {
      type: [Number],
      default: 1
    },
    x: {
      type: [Number],
      default: 0
    },
    y: {
      type: [Number],
      default: 0
    },
    parentScale: {
      type: [Number],
      default: 1
    },
    load: {
      type: [Boolean],
      default: true
    },
    width: {
      type: [Number],
      default: 200
    },
    height: {
      type: [Number],
      default: 50
    }
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
        scale: 1,
        //缩放比例
        _scale: 1,
        rotate: 0,
        //倾斜角度
        angleNext: 0,
        width: 0,
        height: 0
      },
      mv_o: [0, 0],
      dragPointTop: 0,
      dragPointLeft: 0
    };
  },
  watch: {
    x: function(newVal, oldVal) {
      this.imginfo.x = newVal;
    },
    y: function(newVal, oldVal) {
      this.imginfo.y = newVal;
    },
    scale: function(newVal, oldVal) {
      this.imginfo.scale = newVal;
      this.imginfo._scale = newVal;
    },
    rotate: function(newVal, oldVal) {
      this.imginfo.rotate = newVal;
    },
    "imginfo.width": function(newVal, oldVal) {
      console.log("宽度变化", newVal);
    },
    "imginfo.height": function(newVal, oldVal) {
      console.log("宽度变化", newVal);
      this.dragPointTop = newVal / 2 - 7 + "px";
    }
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
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select("#dfMoveable" + this.keys).boundingClientRect((data) => {
        let { left, top, width, height } = data;
        this.mv_o[0] = left + width / 2;
        this.mv_o[1] = top + height / 2;
      }).exec();
    },
    WraptouchStart(e) {
      if (e.touches.length === 1) {
        if (this.numberLock)
          return;
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
        if (this.numberLock)
          return;
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
        this.imginfo.scale = NewDistance / this.tDistance * this.imginfo._scale;
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
      this.imginfo.anglePre = this.countDeg(
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
      this.imginfo.scale = newdist / this.imginfo.dist * this.imginfo._scale;
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
      if (type == "right") {
        this.imginfo.width = e.touches[0].clientX - x;
      }
    },
    touchEnd() {
      this.back();
    },
    astrictScale() {
      if (Math.abs(this.imginfo.scale) > 5) {
        this.imginfo.scale = 5;
      }
      if (Math.abs(this.imginfo.scale) < 0.5) {
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
        rotate: this.imginfo.rotate
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
      var angle = Math.atan(to) / (2 * Math.PI) * 360;
      if (ox < 0 && oy < 0) {
        angle = -angle;
      } else if (ox <= 0 && oy >= 0) {
        angle = -(180 - angle);
      } else if (ox > 0 && oy < 0) {
        angle = angle;
      } else if (ox > 0 && oy > 0) {
        angle = 180 - angle;
      }
      return angle;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.WraptouchStart && $options.WraptouchStart(...args)),
    b: common_vendor.o((...args) => $options.WraptouchMove && $options.WraptouchMove(...args)),
    c: common_vendor.o((...args) => $options.WraptouchEnd && $options.WraptouchEnd(...args)),
    d: `scale(${$props.parentScale * 1 / $data.imginfo.scale})`,
    e: common_vendor.o((...args) => $options.touchStart && $options.touchStart(...args)),
    f: common_vendor.o((...args) => $options.touchMove && $options.touchMove(...args)),
    g: common_vendor.o((...args) => $options.touchEnd && $options.touchEnd(...args)),
    h: common_vendor.o(($event) => $options.pointTouchMove($event, "top")),
    i: $data.dragPointTop,
    j: common_vendor.o(($event) => $options.pointTouchMove($event, "right")),
    k: common_vendor.o(($event) => $options.pointTouchMove($event, "bottom")),
    l: $data.dragPointTop,
    m: common_vendor.o(($event) => $options.pointTouchMove($event, "left")),
    n: "dfMoveable" + $props.keys,
    o: "dfMoveable" + $props.keys,
    p: `${$data.imginfo.height}px`,
    q: `${$data.imginfo.width}px`,
    r: `translate(${$data.imginfo.x * $props.parentScale}px,${$data.imginfo.y * $props.parentScale}px) rotate(${$data.imginfo.rotate}deg)  scale(${$data.imginfo.scale})`
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/backup/Documents/HBuilderProjects/poster-edit/uni_modules/df-movable/components/df-movable/df-movable.vue"]]);
wx.createComponent(Component);
