<template>
  <view class="content">
     <!-- <image :src="path" mode="widthFix"></image>
		  <l-painter
		    :board="poster"
		    isCanvasToTempFilePath
		    @success="path = $event"
		    hidden
		  /> -->
    <!-- <movable-area>
		<HandleBox></HandleBox>
    </movable-area> -->

    <df-moveable v-for="i in 1" :y="50" :x="50" :scale="1" :rotate="0" :key="i" @movableEnd="moveableEnd">
             测试看看款式
    </df-moveable>
    <PosterContent :poster="poster"></PosterContent>
    <!-- <TextEditor></TextEditor> -->
    <HandleBar></HandleBar>
  </view>
</template>

<script>
import dfMoveable from "@/uni_modules/df-movable/components/df-movable/df-movable";
import HandleBar from "./modules/handle-bar.vue";
import PosterContent from "./modules/poster-content.vue";
// import TextEditor from './modules/text-editor.vue';
export default {
  components: {
    // HandleBox,
    dfMoveable,
    HandleBar,
    PosterContent,
    // TextEditor
  },

  data() {
    return {
      htmlDom:
        '<view v-for="(item,index) of poster.views">{{item.type}}</view>',
      poster: {
        css: {
          width: "750rpx",
          paddingBottom: "40rpx",
          // height:'800rpx',
          background: "linear-gradient(,#000 0%, #ff5000 100%)",
          // background: "linear-gradient(#ff5000 100%,#000 0%)",
        },
        views: [
          {
            src: "https://m.360buyimg.com/babel/jfs/t1/196317/32/13733/288158/60f4ea39E6fb378ed/d69205b1a8ed3c97.jpg",
            type: "image",
            css: {
              background: "#fff",
              objectFit: "cover",
              marginLeft: "40rpx",
              "margin-top": "40rpx",
              width: "84rpx",
              border: "2rpx solid #fff",
              boxSizing: "border-box",
              height: "84rpx",
              borderRadius: "50%",
            },
          },
          {
            type: "view",
            css: {
              marginTop: "40rpx",
              paddingLeft: "20rpx",
              display: "inline-block",
            },
            views: [
              {
                text: "隔壁老王",
                type: "text",
                css: {
                  display: "block",
                  paddingBottom: "10rpx",
                  color: "#fff",
                  fontSize: "32rpx",
                  fontWeight: "bold",
                },
              },
              {
                text: "为您挑选了一个好物",
                type: "text",
                css: {
                  color: "rgba(255,255,255,.7)",
                  fontSize: "24rpx",
                },
              },
            ],
          },
          {
            css: {
              marginLeft: "40rpx",
              marginTop: "30rpx",
              padding: "32rpx",
              boxSizing: "border-box",
              background: "#fff",
              borderRadius: "16rpx",
              width: "670rpx",
              boxShadow: "0 20rpx 58rpx rgba(0,0,0,.15)",
            },
            views: [
              {
                src: "https://m.360buyimg.com/babel/jfs/t1/196317/32/13733/288158/60f4ea39E6fb378ed/d69205b1a8ed3c97.jpg",
                type: "image",
                css: {
                  objectFit: "cover",
                  objectPosition: "50% 50%",
                  width: "606rpx",
                  height: "606rpx",
                },
              },
              {
                css: {
                  marginTop: "32rpx",
                  color: "#FF0000",
                  fontWeight: "bold",
                  fontSize: "28rpx",
                  lineHeight: "1em",
                },
                views: [
                  {
                    text: "￥",
                    type: "text",
                    css: {
                      verticalAlign: "bottom",
                    },
                  },
                  {
                    text: "39",
                    type: "text",
                    css: {
                      verticalAlign: "bottom",
                      fontSize: "58rpx",
                    },
                  },
                  {
                    text: ".39",
                    type: "text",
                    css: {
                      verticalAlign: "bottom",
                    },
                  },
                  {
                    text: "￥59.99",
                    type: "text",
                    css: {
                      verticalAlign: "bottom",
                      paddingLeft: "10rpx",
                      fontWeight: "normal",
                      textDecoration: "line-through",
                      color: "#999999",
                    },
                  },
                ],

                type: "view",
              },
              {
                css: {
                  marginTop: "32rpx",
                  fontSize: "26rpx",
                  color: "#8c5400",
                },
                views: [
                  {
                    text: "自营",
                    type: "text",
                    css: {
                      color: "#212121",
                      background: "#ffb400",
                    },
                  },
                  {
                    text: "30天最低价",
                    type: "text",
                    css: {
                      marginLeft: "16rpx",
                      background: "#fff4d9",
                      textDecoration: "line-through",
                    },
                  },
                  {
                    text: "满减优惠",
                    type: "text",
                    css: {
                      marginLeft: "16rpx",
                      background: "#fff4d9",
                    },
                  },
                  {
                    text: "超高好评",
                    type: "text",
                    css: {
                      marginLeft: "16rpx",
                      background: "#fff4d9",
                    },
                  },
                ],

                type: "view",
              },
              {
                css: {
                  marginTop: "30rpx",
                },
                views: [
                  {
                    text: "360儿童电话手表9X 智能语音问答定位支付手表 4G全网通20米游泳级防水视频通话拍照手表男女孩星空蓝",
                    type: "text",
                    css: {
                      paddingRight: "32rpx",
                      boxSizing: "border-box",
                      lineClamp: 2,
                      color: "#333333",
                      lineHeight: "1.6em",
                      fontSize: "36rpx",
                      width: "408rpx",
                      display: "inline-block",
                    },
                  },
                  {
                    text: "limeui.qcoon.cn",
                    type: "qrcode",
                    css: {
                      width: "128rpx",
                      height: "128rpx",
                    },
                  },
                ],
                type: "view",
              },
            ],
            type: "view",
          },
        ],
      },
    };
  },
  onLoad() {
    this.cssHandle(this.poster.views);
    this.cssHandle([{ css: this.poster.css }]);
  },
  methods: {
    // 递归处理不适配的样式
    cssHandle(views) {
      views.forEach((item) => {
        if (item.css) {
          for (let key in item.css) {
            if (key == "background") {
              let value = item.css.background;

              if (value.indexOf("linear-gradient") != -1) {
                let itemObj = value
                  .split("(")[1]
                  .split(")")[0]
                  .split(",")
                  .filter((el) => el)
                  .reverse();
                let bgText = itemObj.join(",");
                item.css.backgroundImage = `linear-gradient(${bgText})`;
              }

              item.css.backgroundColor = item.css.background;
            }
            if (key == "lineClamp") {
              // item.css.objectFit =this.objectFitKV[item.css.objectFit];
              item.css = {
                ...item.css,
                overflow: "hidden",
                "word-break": "break-all",
                "text-overflow": "ellipsis",
                display: "-webkit-inline-box", // 弹性伸缩盒
                "-webkit-box-orient": "vertical", // 设置伸缩盒子元素排列方式
                "-webkit-line-clamp": item.css.lineClamp,
              };
            }
          }
        }
        if (item.views) {
          this.cssHandle(item.views);
        }
      });
      return views;
    },


  },
};
</script>

<style>
.content {
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
}

/* .logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
uni-movable-area {
  width: 750rpx;
  height: 600rpx;
  background: #f3f3f3;
} */
</style>
