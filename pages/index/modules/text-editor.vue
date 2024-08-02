<template>
  <view class=" safe-area-inset-bottom">
    <uni-popup ref="popup" background-color="#fff"> 
       <view class="handle-bar-content">aaaaa </view>  
    </uni-popup>
  </view>
</template>

<script>
export default {
  components: {},

  data() {
    return {};
  },
  mounted() {
    this.handleShow()
  },
  methods: {
    handleShow(){
      // alert('暂时66666')
      this.$refs.popup.open('bottom')
    }
  },
};
</script>

<style>
.handle-bar-content {
   padding: 24rpx;
}

</style>
