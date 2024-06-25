"use strict";
const common_vendor = require("../../common/vendor.js");
const dfMoveable = () => "../../uni_modules/df-movable/components/df-movable/df-movable.js";
const _sfc_main = {
  components: {
    // HandleBox,
    dfMoveable
  },
  data() {
    return {
      x: 0,
      y: 0,
      old: {
        x: 0,
        y: 0
      },
      path: "",
      poster: {
        css: {
          width: "750rpx",
          paddingBottom: "40rpx",
          background: "linear-gradient(,#000 0%, #ff5000 100%)"
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
              borderRadius: "50%"
            }
          },
          {
            type: "view",
            css: {
              marginTop: "40rpx",
              paddingLeft: "20rpx",
              display: "inline-block"
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
                  fontWeight: "bold"
                }
              },
              {
                text: "为您挑选了一个好物",
                type: "text",
                css: {
                  color: "rgba(255,255,255,.7)",
                  fontSize: "24rpx"
                }
              }
            ]
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
              boxShadow: "0 20rpx 58rpx rgba(0,0,0,.15)"
            },
            views: [
              {
                src: "https://m.360buyimg.com/babel/jfs/t1/196317/32/13733/288158/60f4ea39E6fb378ed/d69205b1a8ed3c97.jpg",
                type: "image",
                css: {
                  objectFit: "cover",
                  objectPosition: "50% 50%",
                  width: "606rpx",
                  height: "606rpx"
                }
              },
              {
                css: {
                  marginTop: "32rpx",
                  color: "#FF0000",
                  fontWeight: "bold",
                  fontSize: "28rpx",
                  lineHeight: "1em"
                },
                views: [
                  {
                    text: "￥",
                    type: "text",
                    css: {
                      verticalAlign: "bottom"
                    }
                  },
                  {
                    text: "39",
                    type: "text",
                    css: {
                      verticalAlign: "bottom",
                      fontSize: "58rpx"
                    }
                  },
                  {
                    text: ".39",
                    type: "text",
                    css: {
                      verticalAlign: "bottom"
                    }
                  },
                  {
                    text: "￥59.99",
                    type: "text",
                    css: {
                      verticalAlign: "bottom",
                      paddingLeft: "10rpx",
                      fontWeight: "normal",
                      textDecoration: "line-through",
                      color: "#999999"
                    }
                  }
                ],
                type: "view"
              },
              {
                css: {
                  marginTop: "32rpx",
                  fontSize: "26rpx",
                  color: "#8c5400"
                },
                views: [
                  {
                    text: "自营",
                    type: "text",
                    css: {
                      color: "#212121",
                      background: "#ffb400"
                    }
                  },
                  {
                    text: "30天最低价",
                    type: "text",
                    css: {
                      marginLeft: "16rpx",
                      background: "#fff4d9",
                      textDecoration: "line-through"
                    }
                  },
                  {
                    text: "满减优惠",
                    type: "text",
                    css: {
                      marginLeft: "16rpx",
                      background: "#fff4d9"
                    }
                  },
                  {
                    text: "超高好评",
                    type: "text",
                    css: {
                      marginLeft: "16rpx",
                      background: "#fff4d9"
                    }
                  }
                ],
                type: "view"
              },
              {
                css: {
                  marginTop: "30rpx"
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
                      lineHeight: "1.8em",
                      fontSize: "36rpx",
                      width: "478rpx"
                    }
                  },
                  {
                    text: "limeui.qcoon.cn",
                    type: "qrcode",
                    css: {
                      width: "128rpx",
                      height: "128rpx"
                    }
                  }
                ],
                type: "view"
              }
            ],
            type: "view"
          }
        ]
      }
    };
  },
  onLoad() {
    console.log("this.old");
  },
  methods: {
    onChange: function(e) {
      this.old.x = e.detail.x;
      this.old.y = e.detail.y;
    },
    moveableEnd(e) {
      console.log(e);
    }
  }
};
if (!Array) {
  const _component_df_moveable = common_vendor.resolveComponent("df-moveable");
  _component_df_moveable();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(1, (i, k0, i0) => {
      return {
        a: i,
        b: common_vendor.o($options.moveableEnd, i),
        c: "609b5c08-0-" + i0
      };
    }),
    b: common_vendor.p({
      y: 50,
      x: 50,
      scale: 1,
      rotate: 0
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/backup/Documents/HBuilderProjects/poster-edit/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
