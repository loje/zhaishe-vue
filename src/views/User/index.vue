<template>
  <div class="user-page">
    <!-- <div class="user-top">
      <div class="user-head">
        <div class="img" :style="{backgroundImage: `url(${$store.state.user.imgSrc})`}" @click="toUserInfo"></div>
        <div class="name">{{$store.state.user.username}}</div>
      </div>
      <div class="user-bg"></div>
    </div>

    <div class="max-width">
      <template v-if="!showInfo">
      <div class="user-block">
        <div class="block-title">正在举办的活动</div>
        <div class="block-list">
          <div class="block ing">宅设第二十期</div>
          <div class="block end">宅设第二十期</div>
        </div>
      </div>
      <div class="user-block" v-if="activityList.length > 0">
        <div class="block-title">您参与过的活动</div>
        <div class="block-list">
          <div class="block" v-for="(item, $index) in activityList" :key="$index" @click="toActivityDetail(item.activity.objectId)">{{item.activity.title}}</div>
        </div>
      </div>
      <div class="user-block" v-if="productList.length > 0">
        <div class="block-title">购买的工具</div>
        <div class="block-list">
          <div class="block" v-for="(item, $index) in productList" :key="$index" @click="toProductDetail(item.product.objectId)">{{item.product.title}}</div>
        </div>
      </div>

      <div class="line"></div>

      <div class="order-block">
        <div class="block-title">
          <div class="title">我要接单</div>
          <div class="handle">
            <div class="prev">
              <i class="iconfont">&#xe693;</i>
            </div>
            <div class="next">
              <i class="iconfont">&#xe600;</i>
            </div>
          </div>
        </div>
        <div class="block-list">
          <div class="list-item" >
            <div class="icon">
              <i class="iconfont" style="color:#D3D4D4;">&#xeacd;</i>
            </div>
            <div class="title">web设计</div>
            <div class="item-right">2天前发布</div>
          </div>
          <div class="list-item" >
            <div class="icon">
              <i class="iconfont" style="color:#D3D4D4;">&#xeacd;</i>
            </div>
            <div class="title">web设计</div>
            <div class="item-right">2天前发布</div>
          </div>
          <div class="list-item" >
            <div class="icon">
              <i class="iconfont" style="color:#D3D4D4;">&#xeacd;</i>
            </div>
            <div class="title">web设计</div>
            <div class="item-right">2天前发布</div>
          </div>
          <div class="list-item" >
            <div class="icon">
              <i class="iconfont" style="color:#D3D4D4;">&#xeacd;</i>
            </div>
            <div class="title">web设计</div>
            <div class="item-right">2天前发布</div>
          </div>
          <div class="list-item" >
            <div class="icon">
              <i class="iconfont" style="color:#D3D4D4;">&#xeacd;</i>
            </div>
            <div class="title">web设计</div>
            <div class="item-right">2天前发布</div>
          </div>
        </div>
      </div>
      <div class="order-view">
        <div class="view-func">
          <div class="btn">我要发布需求</div>
        </div>
        <div class="view-block">
          <div class="view-t">UI界面设计</div>
          <div class="view-left">
            <div class="view-info">
              <div class="info-l">联系人：</div>
              <div class="info-content">邹先生</div>
            </div>
            <div class="view-info">
              <div class="info-l">电话：</div>
              <div class="info-content">1864755546</div>
            </div>
            <div class="view-info">
              <div class="info-l">微信：</div>
              <div class="info-content">12934213</div>
            </div>
            <div class="view-info">
              <div class="info-l">预算：</div>
              <div class="info-content">1000元</div>
            </div>
          </div>
          <div class="view-right">
            <div class="right-text">需求：dsadadsadadsaddsadadsadadsaddsadadsadadsaddsadadsadadsaddsadadsadadsaddsadadsadadsaddsadadsadadsad</div>
          </div>
        </div>
      </div>
      </template>

      <template v-else>
      <div class="user-info">
        <div class="func-btn">
          <div class="back" @click="back">
            <i class="iconfont">&#xe693;</i>
            <span>返回</span>
          </div>
          <div class="btn" @click="confilm">保存</div>
        </div>
        <div class="info-title">基本信息</div>
        <div class="info-form">
          <div class="form-t">用户名</div>
          <div class="form-i">
            <input type="text" v-model="form.username" disabled />
            <span class="tips">* 用户名从微信获取，暂不支持修改</span>
          </div>
        </div>
        <div class="info-form">
          <div class="form-t">名字</div>
          <div class="form-i">
            <input type="text" v-model="form.name" />
          </div>
        </div>
        <div class="info-form">
          <div class="form-t">性别</div>
          <div class="form-i">
            <select v-model="form.sex">
              <option value="0">未知</option>
              <option value="1">男</option>
              <option value="2">女</option>
            </select>
          </div>
        </div>
        <div class="info-form">
          <div class="form-t">手机号</div>
          <div class="form-i">
            <input type="text" v-model="form.mobilePhoneNumber" />
          </div>
        </div>
        <div class="info-form">
          <div class="form-t">邮箱</div>
          <div class="form-i">
            <input type="text" v-model="form.email" />
          </div>
        </div>
        <div class="info-form">
          <div class="form-t">所在地</div>
          <div class="form-i">{{form.province}} - {{form.city}}</div>
        </div>
        <div class="info-form">
          <div class="form-t">职业</div>
          <div class="form-i">
            <input type="text" v-model="form.profession" />
          </div>
        </div>
        <div class="info-title">联系方式</div>
        <div class="info-form">
          <div class="form-t">QQ</div>
          <div class="form-i">
            <input type="text" v-model="form.qq" />
          </div>
        </div>
        <div class="info-form">
          <div class="form-t">微信</div>
          <div class="form-i">
            <input type="text" v-model="form.wechatId" />
          </div>
        </div>
      </div>
      </template>
    </div> -->

    <div class="max-width">
      <div class="user-left">
        <div class="user-side">
          <div class="user-head">
            <div class="img" :style="{backgroundImage: `url(${$store.state.user.imgSrc})`}"></div>
            <div class="name">{{$store.state.user.username}}</div>
            <div class="tips">您还没完成信息补充</div>
          </div>

          <div class="side-list">
            <div class="side" v-for="(item, $index) in tagList" :key="$index">
              <span :style="{color: $route.params.tag === item.tag ? '#F4C51D' : '#666'}" @click="toTag(item.tag)">{{item.title}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="user-right">
        <template v-if="$route.params.tag === 'private'">
          <div class="right-top">
            <div class="btn" @click="showPrivate">发布需求</div>
          </div>
          <div class="new-release">
            <div class="title">私单发布</div>
            <div class="release-list">
              <template v-for="(item, $index) in privateList">
              <div class="list-item" :key="$index">
                <i class="iconfont" style="color:#D3D4D4;">&#xeacd;</i>
                <div class="item-title">{{item.remark}}</div>
                <div class="item-right">
                  <template v-if="item.isNewst">
                    <div style="width: 56px;height: 20px;background-color: #f4751d;color:#fff;text-align: center;">新任务</div>
                  </template>
                  <template v-else>{{item.createdAt}}</template>
                </div>
              </div>
              </template>
            </div>
            <div class="pages" v-if="privateList.length > 0">
              <div class="prev" @click="getPrivateList(pagePrivate - 1)">上一页</div>
              <div class="page-list">
                <div :class="pagePrivate === item ? 'page active' : 'page'" v-for="item in privatePages" :key="item" @click="getPrivateList(item)">{{item > 3 ? '···' : item}}</div>
              </div>
              <div class="next" @click="getPrivateList(pagePrivate + 1)">下一页</div>
              <div class="last" @click="getPrivateList(privatePages)">尾页</div>
            </div>
          </div>
          <div class="attended">
            <div class="title">您发布的私单</div>
            <div class="release-list">
              <template v-for="(item, $index) in userPrivateList">
              <div class="list-item" :key="$index">
                <i class="iconfont" style="color:#D3D4D4;">&#xeacd;</i>
                <div class="item-title">{{item.remark}}</div>
                <div class="item-right">
                  <span @click="online(item)">
                    <template v-if="item.online === true">下线</template>
                    <template v-else>上线</template>
                  </span>
                  <span @click="editPrivate(item)">修改</span>
                </div>
              </div>
              </template>
            </div>
          </div>
        </template>
        <template v-if="$route.params.tag === 'download'">
          <div class="right-top">
            <div class="btn">发布灵感</div>
          </div>
          <div class="new-release">
            <div class="title">最新发布</div>
            <div class="release-list">
              <template v-for="(item, $index) in downloadList">
              <div class="list-item" :key="$index" @click="dialogShow(item)" v-if="$index < 18">
                <div class="icon" :style="{'background-image': `url(http://files.zdesigner.cn/2020/02/27/8ab5a6ee40d57e448012b8083b68f496.png)`}"></div>
                <div class="item-title">{{item.title}}</div>
                <div class="item-right">{{item.author}}</div>
              </div>
              </template>
            </div>
          </div>
          <div class="attended">
            <div class="title">您发布的灵感</div>
            <div class="release-list">
              <div class="list-item">
                <div class="icon" :style="{'background-image': `url(http://files.zdesigner.cn/2020/02/27/8ab5a6ee40d57e448012b8083b68f496.png)`}"></div>
                <div class="item-title">电台banner设计素材</div>
                <div class="item-right">
                  <span>下线</span>
                  <span>修改</span>
                </div>
              </div>
              <div class="list-item">
                <div class="icon" :style="{'background-image': `url(http://files.zdesigner.cn/2020/02/27/8ab5a6ee40d57e448012b8083b68f496.png)`}"></div>
                <div class="item-title">电台banner设计素材</div>
                <div class="item-right">
                  <span>下线</span>
                  <span>修改</span>
                </div>
              </div>
              <div class="list-item">
                <div class="icon" :style="{'background-image': `url(http://files.zdesigner.cn/2020/02/27/8ab5a6ee40d57e448012b8083b68f496.png)`}"></div>
                <div class="item-title">电台banner设计素材</div>
                <div class="item-right">
                  <span>下线</span>
                  <span>修改</span>
                </div>
              </div>
              <div class="list-item">
                <div class="icon" :style="{'background-image': `url(http://files.zdesigner.cn/2020/02/27/8ab5a6ee40d57e448012b8083b68f496.png)`}"></div>
                <div class="item-title">电台banner设计素材</div>
                <div class="item-right">
                  <span>下线</span>
                  <span>修改</span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="$route.params.tag === 'activity'">
          <div class="right-top">
            <div class="btn">发布活动</div>
          </div>
          <div class="new-release">
            <div class="title">最新发布</div>
            <div class="release-list" style="padding-right: 50px;">
              <div class="activity" v-for="(item, $index) in activityList" :key="$index" @click="toActivityDetail(item.objectId)">
                <div class="img" :style="{backgroundImage: `url(${item.imgSrc})`}"></div>
                <div class="desc">{{item.desc}}</div>
              </div>
            </div>
          </div>
          <div class="attended">
            <div class="title">参与过的活动</div>
            <div class="user-act-list">
              <span v-for="(item, $index) in userActList" :key="$index">{{item.activity.title}}</span>
            </div>
          </div>
        </template>
        <template v-if="$route.params.tag === 'index'">
          <div class="right-top" style="height: 67px;line-height: normal;">
            <div class="tab-list">
              <div :class="userTab === 1 ? 'tab active' : 'tab'" @click="goTab(1)">修改个人信息</div>
              <div :class="userTab === 2 ? 'tab active' : 'tab'" @click="goTab(2)">支付记录</div>
            </div>
          </div>
          <div class="user-layer">
            <template v-if="userTab === 1">
            <div class="layer-title">基本信息</div>
            <div class="layer-box">
              <div class="form-group">
                <span class="form-title">用户名</span>
                <span class="form-text">
                  <input type="text" v-model="user.username"/>
                </span>
              </div>
              <div class="form-group">
                <span class="form-title">性别</span>
                <span class="form-text">
                  <select v-model="user.sex">
                    <option value="0">未知</option>
                    <option value="1">男</option>
                    <option value="2">女</option>
                  </select>
                </span>
              </div>
              <div class="form-group">
                <span class="form-title">邮箱</span>
                <span class="form-text">
                  <input type="text" v-model="user.email"/>
                </span>
              </div>
              <div class="form-group">
                <span class="form-title">所在地</span>
                <span class="form-text">
                  <input type="text" v-model="user.address"/>
                </span>
              </div>
              <div class="form-group">
                <span class="form-title">职业</span>
                <span class="form-text">
                  <input type="text" v-model="user.professional"/>
                </span>
              </div>
            </div>
            <div class="layer-title">联系方式</div>
            <div class="layer-box">
              <div class="form-group">
                <span class="form-title">QQ</span>
                <span class="form-text">
                  <input type="text" v-model="user.qq"/>
                </span>
              </div>
              <div class="form-group">
                <span class="form-title">微信</span>
                <span class="form-text">
                  <input type="text" v-model="user.wechatId"/>
                </span>
              </div>
            </div>

            <div class="btn-group">
              <div class="btn">修改</div>
              <div class="btn disabled">确定</div>
            </div>
            </template>
            <template v-else>支付记录</template>
          </div>
        </template>
      </div>
    </div>

    <transition name="fade">
    <div class="dialog-layer" v-if="dialogPrivateShow">
      <div class="dialog-flex">
        <div class="dialog-block" style="width:370px">
          <span class="close" @click="dialogPrivateShow = false">
            <i class="iconfont">&#xea13;</i>
          </span>
          <div class="dialog-title">填写您的需求</div>
          <div class="dialog-content">
            <div class="input-group">
              <span>称呼</span>
              <input type="text" v-model="privateDialog.name" placeholder="您的姓名" />
            </div>
            <div class="input-group">
              <span>电话</span>
              <input type="text" v-model="privateDialog.phone" placeholder="您的联系电话" maxlength="11" />
            </div>
            <div class="input-group">
              <span>微信</span>
              <input type="text" v-model="privateDialog.wechatId" />
            </div>
            <div class="input-group" style="z-index: 1;" @mouseenter="selectHover" @mouseleave="privateDialog.selectShow = false">
              <span>类别</span>
              <input type="text" v-model="privateDialog.sort" />
              <transition name="fade">+
              <div class="select-layer" v-if="privateDialog.selectShow">
                <div class="option-list">
                  <div class="option" v-for="(item, $index) in privateSortList" :key="$index" @click="selectSort(item)">{{item.name}}</div>
                </div>
              </div>
              </transition>
            </div>
            <div class="input-group">
              <span>需求</span>
              <textarea v-model="privateDialog.remark" rows="2" maxlength="50" placeholder="50字内的需求描述"></textarea>
            </div>
            <div class="error" v-if="privateDialog.error">{{privateDialog.error}}</div>
          </div>
          <div class="btn" @click="comfilmPrivate">提交</div>
        </div>
      </div>
    </div>
    </transition>


    <tips :tips="tipsText" tipsBackgroundColor="rgba(255, 0, 24, 0.75)"></tips>

    <downloadDialog :showDownload="showDownload" :dialog="dialog" @hide-download="showDownload = false" @open-link="openLink"></downloadDialog>
  </div>
</template>

<script>
import tips from '@/components/Tips';
import downloadDialog from '@/components/DownloadDialog';

export default {
  components: {
    tips,
    downloadDialog,
  },
  data() {
    return {
      tagList: [
        {
          tag: 'private',
          title: '私单墙',
        },{
          tag: 'download',
          title: '灵感库',
        },{
          tag: 'activity',
          title: '活动',
        },{
          tag: 'product',
          title: '产品',
        },{
          tag: 'index',
          title: '个人中心',
        },
      ],
      // userList: [],

      // productList: [],
      activityList: [],
      userActList: [],

      tipsText: '',
      
      downloadList: [],

      showDownload: false,
      dialog: {},

      // showInfo: false,

      // form: '',
      dialogPrivateShow: false,
      privateList: [],
      userPrivateList: [],

      privateTotal: 0, // 总条数
      privatePages: 0, // 总页数
      privateLimit: 14, // 每页条数
      privateLoading: false,
      skipPrivate: 0, // 跳过数量
      pagePrivate: 1, // 当前页数

      privateSortList: [
        {
          id: 1,
          name: 'UI界面设计'
        },{
          id: 2,
          name: '交互设计'
        },{
          id: 3,
          name: '平面设计'
        },{
          id: 4,
          name: 'VI/Logo设计'
        },{
          id: 5,
          name: '网页设计'
        },{
          id: 6,
          name: '包装设计'
        },{
          id: 7,
          name: '插画'
        },{
          id: 8,
          name: 'H5页面设计'
        },{
          id: 9,
          name: '产品设计'
        },{
          id: 10,
          name: '动画'
        },
        // {
        //   id: 11,
        //   name: '输入'
        // },
      ],
      privateDialog: {
        sort: '',
        selectShow: false,
        error: ''
      },

      userTab: 1,
      userEdit: false,
      user: {},
    }
  },
  mounted() {
    if (this.$route.params.tag === 'private') {
      this.pagePrivate = 1;
      this.getPrivateCount();
    }
    if (this.$route.params.tag === 'activity') {
      this.getActList();
    }
    if (this.$route.params.tag === 'download') {
      this.getDownload();
    }
    if (this.$route.params.tag === 'index') {
      this.getUserInfo();
    }
    
    if (this.$route.query.code) {
      this.getUserAct();
      this.getToken();
    //   this.getProduct();
    //   this.getActivity();
      this.getUserPrivate();
    } else {
      location.href = '/';
    }
  },
  watch: {
    $route() {
      if (this.$route.params.tag === 'activity') {
        this.getActList();
      }
      if (this.$route.params.tag === 'download') {
        this.getDownload();
      }
      if (this.$route.params.tag === 'index') {
        this.getUserInfo();
      }
    }
  },
  methods: {
    getToken() {
      if (!localStorage.getItem('memberInfo')) {
        let params = {
          funcName: 'access_token',
          data: {
            code : this.$route.query.code,
          }
        };
        this.$Bmob.functions(params.funcName, params.data).then((respon) => {
          if (respon.errcode === 40163) {
            location.href = '/';
            return false;
          }

          let param = {
            funcName: 'wechatUser',
            data: {
              access_token : respon.access_token,
              openid: respon.openid,
            }
          };
          this.$Bmob.functions(param.funcName, param.data).then((user) => {
            if (user.sucess === false) {
              this.$router.push('/');
              this.tipsText = user.message;
              let t = setTimeout(() => {
                this.tipsText = '';
                clearTimeout(t);
              }, 1500);
              return false;
            }
            this.$Bmob.User.users().then((res) => {
              const userlist = res.results;
              const isWX = userlist.some((item) => item.openid === user.openid && user.openid !== '');
              if (isWX) {
                for (let i = 0; i < userlist.length; i += 1) {
                  if (userlist[i].openid === user.openid) {
                    localStorage.setItem('memberInfo', JSON.stringify(userlist[i]));
                    this.$store.dispatch('getMember', userlist[i]);
                  }
                }
              } else {
                const email = `user${new Date().getTime()}@bmob.cn`;
                let params = {
                  username: user.nickname,
                  password: '123456',
                  email,
                  imgSrc: user.headimgurl,
                  openid: user.openid,
                  sex: user.sex,
                  city: user.city,
                  province: user.province,
                  country: user.country,
                }
                this.$Bmob.User.register(params).then(r => {
                  this.$Bmob.User.users().then(u => {
                    let ul = u.results;
                    for (let i = 0; i < ul.length; i += 1) {
                      if (ul[i].objectId === r.objectId) {
                        // localStorage.setItem('bmob', JSON.stringify(ul[i]));
                        localStorage.setItem('memberInfo', JSON.stringify(userlist[i]));
                        this.$store.dispatch('getMember', ul[i]);
                        location.href = '/user';
                      }
                    }
                  })
                }).catch(err => {
                  console.log(err)
                });
              }
            });
          });
        });
      }
    },

    toTag(item) {
      this.$router.push({
        path: `/user/${item}`,
        query: {
          code: this.$route.query.code,
        },
      });
    },

    getActList() {
      const query = this.$Bmob.Query('activity');
      query.order('-updatedAt');
      query.limit(2);
      query.equalTo('notDelete', '==', true);
      query.find().then(res => {
        this.activityList = (res);
      }).catch(err => {
        console.log(err)
      });
    },
    getUserAct() {
      const query = this.$Bmob.Query('activity_person');
      query.equalTo('user', '==', this.$store.state.user.objectId);
      //下面参数为Pointer字段名称， 可以一次查询多个表
      query.include('activity','activity');
      query.find().then(res => {
        this.userActList = res;
      }).catch(err => {
        console.log(err)
      });
    },
    toActivityDetail(id) {
      location.href = `/activity/item/${id}`;
    },
    // getProduct() {
    //   const query = this.$Bmob.Query('product_person');
    //   query.equalTo('user', '==', this.$store.state.user.objectId);
    //   query.include('product','product');
    //   query.find().then((res) => {
    //     console.log(res);
    //     this.productList = res;
    //   });
    // },

    getDownload() {
      var query = this.$Bmob.Query('download');
      let arr = [];
      this.designerLoading = true;
      query.order('-updatedAt');
      query.equalTo('notDelete', '===', true);
      // query.equalTo('isTop', '===', true);
      query.find().then((res) => {
        this.designerLoading = false;
        for (let i = 0; i < res.length; i += 1) {
          let sort = this.$Bmob.Query('download_sort');
          sort.get(res[i].sort).then((s) => {
            arr.push({
              id: res[i].objectId,
              title: res[i].title,
              sort: s.name,
              imgSrc: res[i].imgSrc,
              author: res[i].author,
              desc: res[i].desc,
              wechat: res[i].wechat,
              downloads: res[i].downloads,
              link: res[i].link,
              code: res[i].code,
            });
          });
        }
        this.downloadList = arr;
      });
    },

    getPrivateCount() {
      var query = this.$Bmob.Query('private_orders');
      query.equalTo('notDelete', '==', true);
      query.count().then((total) => {
        this.privateTotal = total;
        this.privatePages = parseInt(total / this.privateLimit);
        if (total % this.privateLimit > 0) {
          this.privatePages = this.privatePages + 1;
        }
        this.getPrivateList(this.pagePrivate);
      });
    },
    getPrivateList(page) {
      if (page) {
        if (page > this.privatePages) {
          this.pagePrivate = this.PrivatePages;
        } else if (page < 0) {
          this.pagePrivate = 1;
        } else {
          this.pagePrivate = page;
        }
      } else {
        this.pagePrivate = 1
      }

      const query = this.$Bmob.Query('private_orders');
      this.skipPrivate = this.privateLimit * (this.pagePrivate - 1);

      query.order('-updatedAt');
      query.skip(this.skipPrivate);
      query.limit(14);
      query.equalTo('notDelete', '==', true);
      query.equalTo('online', '==', true);

      query.find().then(res => {
        for (let i = 0; i < res.length; i += 1) {
          let day = parseInt((new Date().getTime() - new Date(res[i].createdAt).getTime()) / 86400000);
          if (day > 1) {
            res[i].createdAt = `${day}天前发布`;
          } else {
            res[i].createdAt = `新任务`;
            res[i].isNewst = true;
          }
        }
        this.privateList = res;
      }).catch(err => {
        console.log(err)
      });
    },
    getUserPrivate() {
      const query = this.$Bmob.Query('private_orders');
      query.equalTo('user', '==', this.$store.state.user.objectId);
      query.order('-updatedAt');
      query.equalTo('notDelete', '==', true);
      query.find().then(res => {
        this.userPrivateList = res;
      }).catch(err => {
        console.log(err)
      });
    },

    selectHover() {
      console.log('selectHover');
      this.privateDialog.selectShow = true;
    },
    selectSort(item) {
      this.privateDialog.sort = item.name;
      this.privateDialog.selectShow = false;
    },

    comfilmPrivate() {
      if (!this.privateDialog.name) {
        this.privateDialog.error = '请输入称呼';
        return false;
      }
      if (!this.privateDialog.phone) {
        this.privateDialog.error = '请输入手机号码';
        return false;
      }

      if (this.privateDialog.phone.length !== 11) {
        this.privateDialog.error = '请输入11位的手机号码';
        return false;
      }

      if (!this.privateDialog.wechatId) {
        this.privateDialog.error = '请输入微信号';
        return false;
      }

      if (!this.privateDialog.sort) {
        this.privateDialog.error = '请选择类型';
        return false;
      }

      if (!this.privateDialog.remark) {
        this.privateDialog.error = '请输入需求描述';
        return false;
      }

      this.privateDialog.error = '';

      const query = this.$Bmob.Query('private_orders');
      if(this.privateDialog.id) {
        query.set('id', this.privateDialog.id);
      }

      if(localStorage.getItem('memberInfo')) {
        const userPointer = this.$Bmob.Pointer('_User');
        const userID = userPointer.set(this.$store.state.user.objectId);
        query.set('user', userID);
      }
      if(this.privateDialog.name) {
        query.set('name', this.privateDialog.name);
      }
      if(this.privateDialog.phone) {
        query.set('phone', this.privateDialog.phone);
      }
      if(this.privateDialog.wechatId) {
        query.set('wechatId', this.privateDialog.wechatId);
      }
      if(this.privateDialog.sort) {
        query.set('sort', this.privateDialog.sort);
      }
      if(this.privateDialog.remark) {
        query.set('remark', this.privateDialog.remark);
      }
      query.save().then(() => {
        this.dialogPrivateShow = false;
        this.privateDialog = {
          selectShow: false,
          name: '',
          phone: '',
          wechatId: '',
          sort: '',
          remark: '',
          error: '',
        };
        this.pagePrivate = 1;
        this.getPrivateCount();
        this.getUserPrivate();
      });
    },

    showPrivate() {
      this.dialogPrivateShow = true;
      this.privateDialog = {
        selectShow: false,
        name: '',
        phone: '',
        wechatId: '',
        remark: '',
        error: '',
      };
    },
    editPrivate(item) {
      this.dialogPrivateShow = true;
      this.privateDialog = {
        selectShow: false,
        id: item.objectId,
        name: item.name,
        phone: item.phone,
        wechatId: item.wechatId,
        sort: item.sort,
        remark: item.remark,
        error: '',
      };
    },
    online(item) {
      const query = this.$Bmob.Query('private_orders');
      query.get(item.objectId).then(privateOrder => {
        privateOrder.set('online', item.online === false ? true : false);
        privateOrder.save().then(() => {
          this.pagePrivate = 1;
          this.getPrivateCount();
          this.getUserPrivate();
        });
      });
    },

    
    dialogShow(item) {
      console.log(item);
      this.dialog = item;
      this.showDownload = true;
    },
    openLink() {
      console.log(this.dialog);
      const query = this.$Bmob.Query('download');
      query.get(this.dialog.id).then((res) => {
        res.set('downloads', Number(res.downloads) + 1);
        res.save().then(() => {
          window.open(this.dialog.link);
        });
      }).catch(err => {
        console.log(err)
      });
    },

    goTab(tab) {
      this.userTab = tab;
    },

    getUserInfo() {
      const userquery = this.$Bmob.Query('_User');
      userquery.get(this.$store.state.user.objectId).then((user) => {
        console.log(user);
        this.user = user;
      });
    },
    // toProductDetail(id) {
    //   console.log(id);
    //   location.href = `/tools/item/${id}`;
    // },

    // back() {
    //   this.showInfo = false;
    // },
    // toUserInfo() {
    //   this.showInfo = true;
    //   this.getUserInfo();
    // },
    // getUserInfo() {
    //   const openid = JSON.parse(localStorage.getItem('memberInfo')).openid;
    //   this.$Bmob.User.users().then((res) => {
    //     const userlist = res.results;
    //     const isWX = userlist.some((item) => item.openid === openid && openid !== '');
    //     if (isWX) {
    //       for (let i = 0; i < userlist.length; i += 1) {
    //         if (userlist[i].openid === openid) {
    //           this.form = userlist[i];
    //         }
    //       }
    //     }
    //   });
    // },
    // confilm() {
    //   if (!this.form.mobilePhoneNumber) {
    //     this.tipsText = '手机号码不能为空';
    //     let t = setTimeout(() => {
    //       this.tipsText = '';
    //       clearTimeout(t);
    //     }, 1500);
    //     return false;
    //   }
    //   if (!this.form.email) {
    //     this.tipsText = '邮箱不能为空';
    //     let t = setTimeout(() => {
    //       this.tipsText = '';
    //       clearTimeout(t);
    //     }, 1500);
    //     return false;
    //   }
    //   const query = this.$Bmob.Query('_User');
    //   query.get(this.$store.state.user.objectId).then(user => {
    //     if (this.form.name) {
    //       user.set('name', this.form.name);
    //     } else {
    //       user.set('name', '');
    //     }
    //     if (this.form.sex) {
    //       user.set('sex', this.form.sex);
    //     } else {
    //       user.set('sex', '');
    //     }
    //     if (this.form.mobilePhoneNumber) {
    //       user.set('mobilePhoneNumber', this.form.mobilePhoneNumber);
    //     } else {
    //       user.set('mobilePhoneNumber', '');
    //     }
    //     if (this.form.email) {
    //       user.set('email', this.form.email);
    //     } else {
    //       user.set('email', '');
    //     }
    //     if (this.form.profession) {
    //       user.set('profession', this.form.profession);
    //     } else {
    //       user.set('profession', '');
    //     }
    //     if (this.form.qq) {
    //       user.set('qq', this.form.qq);
    //     } else {
    //       user.set('qq', '');
    //     }
    //     if (this.form.wechatId) {
    //       user.set('wechatId', this.form.wechatId);
    //     } else {
    //       user.set('wechatId', '');
    //     }
    //     user.save().then(() => {
    //       this.tipsText = '保存成功';
    //       let t = setTimeout(() => {
    //         this.tipsText = '';
    //         clearTimeout(t);
    //       }, 1500);
    //     }).catch(err => {
    //       console.log(err);
    //       if (err.code === 209) {
    //         this.dialogError = '该手机号码已经存在';
    //       }
    //       if (err.code === 301) {
    //         this.dialogError = '邮箱格式不正确';
    //       }
    //     });
    //   });
    // },
  },
}
</script>

<style lang="scss" scoped>
  .user-page {
    padding-top: 40px;
    padding-bottom: 50px;
    .max-width {
      display: flex;
      .user-left {
        flex: 1;
        padding-right: 40px;
        box-sizing: border-box;
        .user-side {
          padding-top: 50px;
          height: 740px;
          background-color: #fff;
          box-sizing: border-box;
          .user-head {
            margin: auto;
            .img {
              margin: auto;
              width: 78px;
              height: 78px;
              border-radius: 50%;
            }
            .name {
              text-align: center;
              margin-top: 20px;
              font-size: 14px;
              color: #242424;
              line-height: 20px;
            }
            .tips {
              margin-top: 10px;
              font-size: 12px;
              text-align: center;
              color: #f4761f;
              line-height: 17px;
            }
          }

          .side-list {
            padding-top: 50px;
            .side {
              margin-bottom: 60px;
              text-align: center;
              span {
                font-size: 14px;
                color: #666666;
                line-height: 20px;
                cursor: pointer;
                transition: color 0.25s;
                &:hover {
                  color: #F4C51D;
                }
              }
            }
          }
        }
      }
      .user-right {
        width: 740px;
        .right-top {
          margin-bottom: 30px;
          height: 128px;
          line-height: 128px;
          text-align: center;
          background-color: #fff;
          .btn {
            display: inline-block;
            width: 137px;
            height: 37px;
            line-height: 37px;
            text-align: center;
            background-color: #F4C51D;
            color: #000;
            font-size: 12px;
            cursor: pointer;
          }

          .tab-list {
            display: flex;
            line-height: 67px;
            .tab {
              width: 180px;
              font-size: 14px;
              color: #6d6d6d;
              cursor: pointer;
              transition: all 0.25s ease;
              &:hover, &.active {
                background-color: #F4C51D;
              }
            }
          }
        }
        .new-release {
          position: relative;
          margin-bottom: 30px;
          padding: 30px 0 20px 50px;
          height: 379px;
          background-color: #fff;
          box-sizing: border-box;
          .title {
            margin-bottom: 20px;
            width: 100%;
            font-size: 14px;
            font-weight: 500;
            color: #000000;
            line-height: 20px;
          }
          .release-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .activity {
              width: 280px;
              cursor: pointer;
              .img {
                width: 280px;
                height: 160px;
                background-size:cover;
                background-position: 50%;
              }
              .desc {
                margin-top: 20px;
                font-size: 14px;
                text-align: justify;
                color: #888888;
                line-height: 24px;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
              }
            }

            .list-item {
              position: relative;
              margin-bottom: 13px;
              padding-right: 50px;
              display: flex;
              align-items: center;
              width: 50%;
              font-size: 12px;
              line-height: 20px;
              box-sizing: border-box;
              cursor: pointer;
              i {
                display: block;
              }
              .item-title {
                flex: 1;
                padding-left: 5px;
                height: 20px;
                color: #888;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
              .item-right {
                width: 80px;
                text-align: right;
                color: #888;
              }
              &:hover {
                .item-title {
                  color: #F4C51D;
                }
                .item-right {
                  color: #F4C51D;
                }
              }
            }
          }
          .pages {
            position: absolute;
            right: 45px;
            bottom: 20px;
            width: 100%;
            height: 50px;
            text-align: right;
            box-sizing: border-box;
            .prev, .next, .last {
              display: inline-block;
              vertical-align: middle;
              line-height: 50px;
              color: #888;
              font-size: 12px;
            }
            .last {
              margin-left: 25px;
            }
            cursor: pointer;
            .page-list {
              display: inline-flex;
              margin: 0 15px;
              line-height: 50px;
              vertical-align: middle;
              .page {
                width: 34px;
                height: 50px;
                line-height: 50px;
                font-size: 16px;
                font-weight: bold;
                color: #000;
                text-align: center;
                cursor: pointer;
                &:hover, &.active {
                  color: #fff;
                  background-color: #F4C51D;
                }
              }
            }
          }
        }
        .attended {
          padding: 30px 50px;
          height: 171px;
          background-color: #fff;
          box-sizing: border-box;
          .title {
            margin-bottom: 20px;
            width: 100%;
            font-size: 14px;
            font-weight: 500;
            color: #000000;
            line-height: 20px;
          }
          .user-act-list {
            display: flex;
            flex-wrap: wrap;
            span {
              margin-right: 25px;
              font-size: 12px;
              color: #9a9a9a;
              line-height: 17px;
            }
          }

          .release-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .list-item {
              position: relative;
              margin-bottom: 13px;
              padding-right: 50px;
              display: flex;
              align-items: center;
              width: 50%;
              font-size: 12px;
              line-height: 20px;
              box-sizing: border-box;
              .icon {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-position: 50%;
                background-size: cover;
                i {
                  display: block;
                }
              }
              .item-title {
                flex: 1;
                padding-left: 5px;
                height: 20px;
                color: #888;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
              .item-right {
                width: 80px;
                text-align: right;
                span {
                  color: #000;
                  cursor: pointer;
                }
                span:hover {
                  color: #F4C51D;
                }
                span:last-child {
                  margin-left: 20px;
                }
              }
            }
          }
          
        }

        .user-layer {
          position: relative;
          padding: 14px 0 36px 0;
          height: 640px;
          background-color: #fff;
          box-sizing: border-box;
          .layer-title {
            margin-left: 185px;
            padding-top: 40px;
            width: 70px;
            text-align: right;
            font-size: 16px;
            font-weight: bold;
            color: #000000;
            line-height: 22px;
          }
          .layer-box {
            padding-left: 185px;
            width: 600px;
            box-sizing: border-box;
            .form-group {
              display: flex;
              margin-top: 25px;
              width: 100%;
              .form-title {
                width: 70px;
                text-align: right;
                font-size: 14px;
                color: #888888;
                line-height: 32px;
              }
              .form-text {
                flex: 1;
                padding-left: 58px;
                font-size: 14px;
                color: #000000;
                line-height: 32px;
                box-sizing: border-box;
                input, select {
                  padding: 0 10px;
                  width: 100%;
                  height: 32px;
                  border: 1px solid #999;
                  border-radius: 3px;
                  box-sizing: border-box;
                  outline: none;
                }
              }
            }
          }

          .btn-group {
            position: absolute;
            right: 36px;
            bottom: 36px;
            .btn {
              display: inline-block;
              margin-left: 30px;
              width: 100px;
              height: 36px;
              line-height: 36px;
              font-size: 14px;
              text-align: center;
              border: 1px solid #f4c51d;
              border-radius: 2px;
              box-sizing: border-box;
              cursor: pointer;
              &.disabled {
                border-color:#D9D9D9;
                color:#D9D9D9;
              }
            }
          }
        }
      }
    }
  }

  .dialog-layer {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 2;
    .dialog-flex {
      flex: 1;
      .dialog-block {
        position: relative;
        display: block;
        margin: auto;
        padding: 40px 50px 35px 50px;
        width: 370px;
        background-color: #fff;
        border-radius: 2px;
        box-sizing: border-box;
        .close {
          position: absolute;
          right: 16px;
          top: 12px;
          cursor: pointer;
          z-index: 1;
        }
        .dialog-title {
          margin-bottom: 16px;
          font-size: 16px;
          line-height: 22px;
          color: #333;
        }
        .input-group {
          position: relative;
          display: flex;
          margin-bottom: 20px;
          width: 100%;
          border: 1px solid #979797;
          border-radius: 2px;
          box-sizing: border-box;
          z-index: 0;
          span {
            position: relative;
            display: block;
            padding-left: 10px;
            width: 36px;
            font-size: 12px;
            color: #888;
            height: 34px;
            line-height: 34px;
            z-index: 1;
          }
          input, .select-value {
            position: relative;
            flex: 1;
            border: none;
            outline: none;
            padding: 0;
            font-size: 12px;
            height: 34px;
            line-height: 34px;
            z-index: 1;
          }
          input {
            z-index: 3;
          }

          .select-layer {
            position: absolute;
            left: 0;
            top: 0;
            padding-top: 36px;
            width: 100%;
            z-index: 2;
            .option-list {
              padding: 14px 0;
              box-shadow: 0 8px 8px rgba(0,0,0,0.05);
              background-color: #fff;
              .option {
                width: 100%;
                color:#888;
                height: 36px;
                line-height: 36px;
                text-align: center;
                font-size: 12px;
                cursor: pointer;
                &:hover {
                  background-color: #F4C51D;
                  color: #fff;
                }
              }
            }
          }

          textarea {
            flex: 1;
            border: none;
            outline: none;
            padding: 10px;
            font-size: 12px;
            resize: none;
            box-sizing: border-box;
          }
        }
        .error {
          margin: 10px 0 30px 0;
          font-size: 12px;
          height: 17px;
          color: #E55D5D;
        }
        .btn {
          margin: auto;
          margin-top: 45px;
          width: 100px;
          height: 38px;
          line-height: 38px;
          text-align: center;
          background-color: #F4C51D;
          color: #000;
          font-size: 14px;
          border-radius: 2px;
          cursor: pointer;
        }
      }
    }
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.25s, transform 0.25s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    opacity: 0;
    transform: translate(0, -15px);
  }
  .fade-leave, .fade-enter-to {
    transform: translate(0, 0);
  }


  // .user-top {
  //   position: relative;
  //   padding-bottom: 20px;
  //   width: 100%;
  //   .user-head {
  //     position: relative;
  //     padding-top: 175px;
  //     z-index: 1;
  //     .img {
  //       margin: auto;
  //       width: 100px;
  //       height: 100px;
  //       border-radius: 50%;
  //       background-color: #fff;
  //       background-size: cover;
  //       cursor: pointer;
  //     }
  //     .name {
  //       margin-top: 10px;
  //       text-align: center;
  //       font-size: 14px;
  //       line-height: 20px;
  //       color: #242424;
  //     }
  //   }
  //   .user-bg {
  //     position: absolute;
  //     left: 0;
  //     top: 0;
  //     width: 100%;
  //     height: 230px;
  //     background-color: rgba(244,197,29,0.2);
  //     z-index: 0;
  //   }
  // }

  // .user-block {
  //   padding: 20px 0;
  //   .block-title {
  //     margin-bottom: 20px;
  //     font-size: 16px;
  //     line-height: 22px;
  //     font-weight: bold;
  //     color: #242424;
  //   }
  //   .block-list {
  //     .block {
  //       display: inline-flex;
  //       vertical-align: middle;
  //       align-items: center;
  //       justify-content: center;
  //       margin-right: 50px;
  //       width: 160px;
  //       height: 70px;
  //       text-align: center;
  //       border: 1px solid #F4751D;
  //       color: #F4751D;
  //       font-size: 12px;
  //       line-height: 17px;
  //       border-radius: 2px;
  //       box-sizing: border-box;
  //       transition: all 250ms ease-in-out;
  //       cursor: pointer;
  //       &.ing {
  //         background-color: rgba(244,117,29,0.30);
  //         border-color: #F4761F;
  //         color: #F4761F;
  //       }
  //     }
  //   }
  // }

  // .line {
  //   margin: 25px 0;
  //   width: 100%;
  //   height: 1px;
  //   background-color: #F2F2F2;
  // }

  // .order-block {
  //   display: inline-block;
  //   padding: 20px 0;
  //   width: 300px;
  //   vertical-align: top;
  //   box-sizing: border-box;
  //   .block-title {
  //     position: relative;
  //     margin-bottom: 20px;
  //     .title {
  //       display: inline-block;
  //       font-size: 16px;
  //       font-weight: bold;
  //       color: #383838;
  //       line-height: 22px;
  //       vertical-align: middle;
  //     }
  //     .handle {
  //       position: absolute;
  //       right: 0;
  //       top: -4px;
  //       display: flex;
  //       .prev, .next {
  //         width: 20px;
  //         height: 28px;
  //         line-height: 28px;
  //         text-align: center;
  //         border: 1px solid #F2F2F2;
  //         border-radius: 2px;
  //         cursor: pointer;
  //         i {
  //           color: #F4C51D;
  //         }
  //         &:hover {
  //           border-color: #F4C51D;
  //         }
  //       }
  //       .prev{
  //         margin-right: 15px;
  //       }
  //     }
  //   }
  //   .block-list {
  //     display: flex;
  //     flex-wrap: wrap;
  //     width: 100%;
  //     justify-content: space-between;
  //     .list-item {
  //       position: relative;
  //       display: flex;
  //       margin-bottom: 13px;
  //       align-items: center;
  //       width: 100%;
  //       font-size: 12px;
  //       line-height: 20px;
  //       cursor: pointer;
  //       .icon {
  //         width: 16px;
  //         height: 16px;
  //         border-radius: 50%;
  //         background-position: 50%;
  //         background-size: cover;
  //         i {
  //           display: block;
  //         }
  //       }
  //       .title {
  //         flex: 1;
  //         padding-left: 5px;
  //         height: 20px;
  //         color: #888;
  //       }
  //       .item-right {
  //         width: 80px;
  //         text-align: right;
  //         color: #888;
  //       }
  //       &:last-child {
  //         margin-bottom: 0;
  //       }
  //       &:hover {
  //         .title {
  //           color: #F4C51D;
  //         }
  //         .item-right {
  //           color: #F4C51D;
  //         }
  //       }
  //     }
  //   }
  // }

  // .order-view {
  //   display: inline-block;
  //   padding-left: 50px;
  //   width: calc(100% - 300px);
  //   vertical-align: top;
  //   box-sizing: border-box;
  //   .view-func {
  //     margin-bottom: 15px;
  //     width: 100%;
  //     text-align: right;
  //     .btn {
  //       display: inline-block;
  //       width: 120px;
  //       height: 28px;
  //       line-height: 28px;
  //       font-size: 12px;
  //       background-color: #F4761F;
  //       color: #fff;
  //       text-align: center;
  //       cursor: pointer;
  //     }
  //   }
  //   .view-block {
  //     padding: 25px 50px;
  //     width: 100%;
  //     background-color: #f9f9f9;
  //     color: #262626;
  //     box-sizing: border-box;
  //     .view-t {
  //       font-size: 14px;
  //       line-height: 20px;
  //       font-weight: bold;
  //     }
  //     .view-left {
  //       display: inline-block;
  //       width: 200px;
  //       vertical-align: top;
  //       .view-info {
  //         margin-top: 15px;
  //         width: 100%;
  //         font-size: 12px;
  //         line-height: 17px;
  //         .info-l {
  //           display: inline-block;
  //           margin-right: 20px;
  //           vertical-align: middle;
  //           text-align: justify;
  //           width: 48px;
  //         }
  //         .info-content {
  //           display: inline-block;
  //           vertical-align: middle;
  //         }
  //       }
  //     }
  //     .view-right {
  //       display: inline-block;
  //       width: calc(100% - 200px);
  //       vertical-align: top;
  //       .right-text {
  //         margin-top: 15px;
  //         width: 100%;
  //         font-size: 12px;
  //         line-height: 17px;
  //         word-break: break-all;
  //       }
  //     }
  //   }
  // }

  // .user-info {
  //   padding: 60px 0;
  //   .func-btn {
  //     position: relative;
  //     padding-bottom: 10px;
  //     height: 50px;
  //     box-sizing: border-box;
  //     border-bottom: 1px solid #ddd;
  //     .back {
  //       display: inline-block;
  //       height: 40px;
  //       line-height: 40px;
  //       text-align: center;
  //       border-radius: 2px;
  //       color: #333;
  //       cursor: pointer;
  //       i {
  //         display: inline-block;
  //         vertical-align: middle;
  //         color: #F4C51D;
  //       }
  //       span {
  //         margin-left: 5px;
  //         display: inline-block;
  //         vertical-align: middle;
  //         line-height: 28px;
  //         font-size: 14px;
  //       }
  //     }
  //     .btn {
  //       position: absolute;
  //       right: 0;
  //       top: 0;
  //       width: 100px;
  //       height: 38px;
  //       line-height: 38px;
  //       background-color: #F4C51D;
  //       border: 1px solid #F4C51D;
  //       color: #262626;
  //       text-align: center;
  //       border-radius: 2px;
  //       font-size: 14px;
  //       transition: background-color 0.2s ease;
  //       cursor: pointer;
  //       &:hover {
  //         background-color: rgba(244, 197, 29, 0.3);
  //       }
  //     }
  //   }
  //   // .line {
  //   //   width: 100%;
  //   //   height: 1px;
  //   //   background-color: #ddd;
  //   // }
  //   .info-title {
  //     margin-top: 40px;
  //     font-size: 16px;
  //     font-weight: bold;
  //     color: #000;
  //     line-height: 22px;
  //   }
  //   .info-form {
  //     display: flex;
  //     margin-top: 25px;
  //     font-size: 14px;

  //     .form-t {
  //       width: 64px;
  //       text-align: right;
  //       color: #888;
  //       line-height: 32px;
  //     }
  //     .form-i {
  //       flex: 1;
  //       padding-left: 60px;
  //       line-height: 32px;
  //       input, select {
  //         padding: 0 10px;
  //         width: 240px;
  //         height: 32px;
  //         border: 1px solid #979797;
  //         border-radius: 4px;
  //         box-sizing: border-box;
  //         outline: none;
  //       }
  //       .tips {
  //         margin-left: 15px;
  //         color: #FF5D01;
  //         font-size: 12px;
  //       }
  //     }
  //   }
  // }
</style>