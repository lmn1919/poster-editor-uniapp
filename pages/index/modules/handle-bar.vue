<template>
  <view class="handle-bar-content safe-area-inset-bottom">
    <view class="handle-bar">
      <view
        class="handle-item"
        v-for="(item, index) in handleTypeList"
        :key="index"
        @click="handleShowActionPopup('textEditor')"
      >
        <text class="iconfont" :class="item.icon"></text>
        <text class="handle-name">{{ item.name }}</text>
      </view>
      
    </view>
    <TextEditor ref="textEditor" />
  </view>
</template>

<script>
import TextEditor from "./text-editor.vue";
export default {
  components: {
    TextEditor,
  },

  data() {
    return {
      src: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
      handleTypeList: [
        { name: "文字", icon: "icon-wenzi", key: 1 },
        { name: "图片", icon: "icon-tupian", key: 2 },
        { name: "素材", icon: "icon-sucai", key: 3 },
        { name: "尺寸", icon: "icon-yuantudaxiao", key: 4 },
      ],
    };
  },
  mounted() {},
  onLoad() {},
  methods: {
    handleShowActionPopup(type) {
      this.$refs[type].handleShow();
    },
  },
};
</script>

<style>
.handle-bar-content {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.handle-bar {
  background: #0e1118;
  height: 100rpx;
  display: flex;
  justify-content: space-around;
  color: #616469;
}
.handle-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/* .handle-item image {
  height: 40rpx;
  width: 40rpx;
  margin-bottom: 5rpx;
} */
.handle-bar .iconfont {
  color: #cdd0d7;
  font-size: 40rpx;
}
.handle-bar-content .handle-name {
  font-size: 20rpx;
}
.safe-area-inset-bottom {
  padding-bottom: 0 !important;
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;
}
</style>
