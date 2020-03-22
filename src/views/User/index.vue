<template>
  <div class="user-page">
    <div class="max-width">
      <div class="user-left">
        <div class="user-side">
          <div class="user-head">
            <div class="img" :style="{backgroundImage: `url(${$store.state.user.imgSrc})`}"></div>
            <div class="name">{{$store.state.user.username}}</div>
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
            <div class="btn" @click="showPostPrivate">发布需求</div>
          </div>
          <div class="new-release">
            <div class="title">私单发布</div>
            <div class="release-list">
              <template v-for="(item, $index) in privateList">
              <div class="list-item" :key="$index" @click="privateShow(item)">
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
                <div class="item-title" @click="privateShow(item)">{{item.remark}}</div>
                <div class="item-right">
                  <template v-if="item.audit === true">
                  <span @click="online(item)">
                    <template v-if="item.online === true">下线</template>
                    <template v-else>上线</template>
                  </span>
                  </template>
                  <template v-else>
                  <span style="color:#ccc;">审核中</span>
                  </template>
                  <span @click="editPrivate(item)">修改</span>
                </div>
              </div>
              </template>
            </div>
          </div>
        </template>
        <template v-if="$route.params.tag === 'download'">
          <div class="right-top">
            <div class="btn" @click="showDownloadDialog">发布灵感</div>
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
              <template v-for="(item, $index) in userDownloadList">
              <div class="list-item" :key="$index" v-if="$index < 18">
                <div class="icon" :style="{'background-image': `url(http://files.zdesigner.cn/2020/02/27/8ab5a6ee40d57e448012b8083b68f496.png)`}"></div>
                <div class="item-title">{{item.title}}</div>
                <div class="item-right">
                  <span @click="downloadOnline(item)">
                    <template v-if="item.notDelete === true">下线</template>
                    <template v-else>上线</template>
                  </span>
                  <span @click="editDownload(item)">修改</span>
                </div>
              </div>
              </template>
            </div>
          </div>
        </template>
        <template v-if="$route.params.tag === 'activity'">
          <div class="right-top">
            <div class="btn" @click="showActivity">发布活动</div>
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
        <template v-if="$route.params.tag === 'product'">
        <template v-if="productOrderList.length > 0">
        <div style="padding: 14px 0 14px 60px; font-size: 14px; color: #999;">购买过的产品</div>
        <div class="product-list">
          <template v-for="(item, $index) in productOrderList">
          <div class="product" :key="$index">
            <div class="item">{{item.product.title}}</div>
            <div class="item">{{item.name}}</div>
            <div class="item">{{item.couponCode}}</div>
            <div class="item">{{item.time_end}}</div>
            <div class="item">{{(Number(item.payReslut.total_fee)/ 100).toFixed(2)}}</div>
          </div>
          </template>
        </div>
        </template>
        <template v-else>
        <div style="display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 90px;
          background-color: #fff;">
          <div style="font-size: 14px;">您还没有购买过产品，去<a href="/tools" style="color: #F4C829;">看一看</a></div>
        </div>
        </template>
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
                  <template v-if="userEdit === false">
                  <span>{{user.username}}</span>
                  </template>
                  <template v-else>
                  <input type="text" v-model="user.username"/>
                  </template>
                </span>
              </div>
              <div class="form-group">
                <span class="form-title">性别</span>
                <span class="form-text">
                  <template v-if="userEdit === false">
                  <span v-if="user.sex === 1">男</span>
                  <span v-else-if="user.sex === 2">女</span>
                  <span v-else>未知</span>
                  </template>
                  <template v-else>
                  <select v-model="user.sex">
                    <option value="0">未知</option>
                    <option value="1">男</option>
                    <option value="2">女</option>
                  </select>
                  </template>
                </span>
              </div>
              <div class="form-group">
                <span class="form-title">邮箱</span>
                <span class="form-text">
                  <template v-if="userEdit === false">
                  <span>{{user.email}}</span>
                  </template>
                  <template v-else>
                  <input type="text" v-model="user.email"/>
                  </template>
                </span>
              </div>
              <div class="form-group">
                <span class="form-title">所在地</span>
                <span class="form-text">
                  <template v-if="userEdit === false">
                  <span>{{user.address}}</span>
                  </template>
                  <template v-else>
                  <input type="text" v-model="user.address"/>
                  </template>
                </span>
              </div>
              <div class="form-group">
                <span class="form-title">职业</span>
                <span class="form-text">
                  <template v-if="userEdit === false">
                  <span>{{user.professional}}</span>
                  </template>
                  <template v-else>
                  <input type="text" v-model="user.professional"/>
                  </template>
                </span>
              </div>
            </div>
            <div class="layer-title">联系方式</div>
            <div class="layer-box">
              <div class="form-group">
                <span class="form-title">QQ</span>
                <span class="form-text">
                  <template v-if="userEdit === false">
                  <span>{{user.qq}}</span>
                  </template>
                  <template v-else>
                  <input type="text" v-model="user.qq"/>
                  </template>
                </span>
              </div>
              <div class="form-group">
                <span class="form-title">微信</span>
                <span class="form-text">
                  <template v-if="userEdit === false">
                  <span>{{user.wechatId}}</span>
                  </template>
                  <template v-else>
                  <input type="text" v-model="user.wechatId"/>
                  </template>
                </span>
              </div>
            </div>

            <div class="btn-group">
              <div :class="userEdit === false ? 'btn active' : 'btn disabled'" @click="editUserInfo">修改</div>
              <div :class="userEdit === true ? 'btn active' : 'btn disabled'" @click="updateUserInfo">确定</div>
            </div>
            </template>
            <template v-else>
            <div class="item-table">
              <table>
                <thead>
                  <tr>
                    <td align="left">订单</td>
                    <td>类别</td>
                    <td>时间</td>
                    <td align="right">费用(元)</td>
                    <td>备注</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, $index) in orderList" :key="$index">
                    <td align="left" v-html="item.objectId"></td>
                    <td>
                      <template v-if="item.sort === 'product'">产品</template>
                      <template v-else-if="item.sort === 'active'">活动</template>
                    </td>
                    <td>{{item.time_end}}</td>
                    <td align="right" style="font-family: Arial; font-weight: bold;">{{(Number(item.payReslut.total_fee)/ 100).toFixed(2)}}</td>
                    <td>
                      <template v-if="item.name">姓名：{{item.name}}<br/></template>
                      <template v-if="item.phone">手机号：{{item.phone}}<br/></template>
                      <template v-if="item.wechatId">微信号：{{item.wechatId}}<br/></template>
                      <template v-if="item.email">邮箱：{{item.email}}</template>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            </template>
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
              <input type="text" v-model="privatePostDialog.name" placeholder="您的姓名" />
            </div>
            <div class="input-group">
              <span>电话</span>
              <input type="text" v-model="privatePostDialog.phone" placeholder="您的联系电话" maxlength="11" />
            </div>
            <div class="input-group">
              <span>微信</span>
              <input type="text" v-model="privatePostDialog.wechatId" />
            </div>
            <div class="input-group" style="z-index: 1;" @mouseenter="selectHover('private')" @mouseleave="privatePostDialog.selectShow = false">
              <span>类别</span>
              <input type="text" v-model="privatePostDialog.sort" />
              <transition name="fade">+
              <div class="select-layer" v-if="privatePostDialog.selectShow">
                <div class="option-list">
                  <div class="option" v-for="(item, $index) in privateSortList" :key="$index" @click="selectSort('private', item)">{{item.name}}</div>
                </div>
              </div>
              </transition>
            </div>
            <div class="input-group">
              <span>需求</span>
              <textarea v-model="privatePostDialog.remark" rows="4" maxlength="50" placeholder="50字内的需求描述"></textarea>
            </div>
            <div class="error" v-if="privatePostDialog.error">{{privatePostDialog.error}}</div>
          </div>
          <div class="btn" @click="comfilmPrivate">提交</div>
        </div>
      </div>
    </div>
    </transition>

    <transition name="fade">
    <div class="dialog-layer" v-if="dialogActivityShow">
      <div class="dialog-flex">
        <div class="dialog-block" style="width:370px">
          <span class="close" @click="dialogActivityShow = false">
            <i class="iconfont">&#xea13;</i>
          </span>
          <div class="dialog-title">填写您的活动内容</div>
          <div class="dialog-content">
            <div class="input-group">
              <span>标题</span>
              <input type="text" v-model="activityDialog.title" placeholder="活动标题" />
            </div>

            <div class="input-group">
              <span>电话</span>
              <input type="text" v-model="activityDialog.phone" placeholder="联系电话" maxlength="11" />
            </div>

            <div class="error" v-if="activityDialog.error">{{activityDialog.error}}</div>
          </div>
          <div class="btn" @click="comfilmActivity">提交</div>
        </div>
      </div>
    </div>
    </transition>

    <transition name="fade">
    <div class="dialog-layer" v-if="dialogDownloadShow">
      <div class="dialog-flex">
        <div class="dialog-block" style="width:370px">
          <span class="close" @click="dialogDownloadShow = false">
            <i class="iconfont">&#xea13;</i>
          </span>
          <div class="dialog-title">填写您的灵感地址</div>
          <div class="dialog-content">
            <div class="input-group">
              <span>标题</span>
              <input type="text" v-model="downDialog.title" placeholder="收集的灵感包类型" />
            </div>

            <div class="input-group" style="z-index: 1;" @mouseenter="selectHover('download')" @mouseleave="downDialog.selectShow = false">
              <span>类别</span>
              <input type="text" v-model="downloadTabs[downDialog.type ? downDialog.type : 0].label" disabled="true" />
              <transition name="fade">+
              <div class="select-layer" v-if="downDialog.selectShow">
                <div class="option-list">
                  <div class="option" v-for="(item, $index) in downloadTabs" :key="$index" @click="selectSort('download', item)">{{item.label}}</div>
                </div>
              </div>
              </transition>
            </div>
            <div class="input-group">
              <span>百度网盘</span>
              <input type="text" v-model="downDialog.link" placeholder="百度网盘链接" />
            </div>
            <div class="input-group">
              <span>下载密码</span>
              <input type="text" v-model="downDialog.code" />
            </div>

            <div class="error" v-if="downDialog.error">{{downDialog.error}}</div>
          </div>
          <div class="btn" @click="comfilmDownload">提交</div>
        </div>
      </div>
    </div>
    </transition>

    <transition name="fade">
      <div class="dialog-layer" v-if="showPrivate">
        <div class="dialog-flex">
          <div class="dialog-block">
            <span class="right">
              <template v-if="privateDialog.isNewst">
                <div style="width: 56px;height: 20px;background-color: #f4751d;color:#fff;text-align: center;">新任务</div>
              </template>
              <template v-else>{{privateDialog.createdAt}}</template>
            </span>
            <div class="dialog-title">{{privateDialog.title || '私单墙详情'}}</div>
            <div class="remark-box">{{privateDialog.remark}}</div>
            <div class="private-user">姓名：{{privateDialog.name}}</div>
            <div class="private-user">微信：{{privateDialog.wechatId}}</div>
            <div class="private-user">电话：{{privateDialog.phone}}</div>
            <div class="btn" @click="showPrivate = false">确定</div>
          </div>
        </div>
      </div>
    </transition>


    <tips :tips="tipsText" :tipsBackgroundColor="tipsBackgroundColor"></tips>

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

      activityList: [],
      userActList: [],
      dialogActivityShow: false,
      activityDialog: {
        title: '',
        phone: '',
        error: '',
      },

      tipsText: '',
      tipsBackgroundColor: 'rgba(255, 0, 24, 0.75)',
      
      downloadList: [],
      userDownloadList: [],
      dialogDownloadShow: false,
      downDialog: {
        type: '',
        selectShow: false,
        error: ''
      },

      showDownload: false,
      downloadTabs: [
        {
          label: '全部',
          value: '',
        },
        {
          label: 'banner',
          value: 1,
        },
        {
          label: 'H5',
          value: 2,
        },
        {
          label: 'Web',
          value: 3,
        },
        {
          label: 'App',
          value: 4,
        },
        {
          label: 'Logo',
          value: 5,
        },
        {
          label: '其他',
          value: 6,
        },
      ],
      dialog: {},

      dialogPrivateShow: false,
      privateList: [],
      userPrivateList: [],
      showPrivate: false,
      privateDialog: {},

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
      privatePostDialog: {
        sort: '',
        selectShow: false,
        error: ''
      },

      userTab: 1,
      userEdit: false,
      user: {},
      orderList: [],
      productOrderList: [],
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
    if (this.$route.params.tag === 'product') {
      this.getProOrderList();
    }
    if (this.$route.params.tag === 'index') {
      this.getUserInfo();
    }
    
    if (this.$route.query.code) {
      this.getUserAct();
      this.getToken();

      this.getUserPrivate();
      this.getUserDownload();
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
      if (this.$route.params.tag === 'product') {
        this.getProOrderList();
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
                    console.log('---------user1');
                    console.log(userlist[i]);
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
                        console.log('---------user2');
                        console.log(ul[i]);
                        localStorage.setItem('memberInfo', JSON.stringify(ul[i]));
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

    showActivity() {
      this.dialogActivityShow = true;
      this.activityDialog = {
        title: '',
        phone: '',
        error: '',
      };
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
    comfilmActivity() {
      if (!this.activityDialog.title) {
        this.activityDialog.error = '请输入活动标题';
        return false;
      }
      if (!this.activityDialog.phone) {
        this.activityDialog.error = '请输入联系方式';
        return false;
      }

      this.activityDialog.error = '';

      const query = this.$Bmob.Query('activity_apply');

      if(localStorage.getItem('memberInfo')) {
        const userPointer = this.$Bmob.Pointer('_User');
        const userID = userPointer.set(this.$store.state.user.objectId);
        query.set('user', userID);
      }
      if(this.activityDialog.title) {
        query.set('title', this.activityDialog.title);
      }
      if(this.activityDialog.phone) {
        query.set('phone', this.activityDialog.phone);
      }
      query.set('notDelete', true);
      query.save().then(() => {
        this.dialogActivityShow = false;
        this.activityDialog = {
          title: '',
          phone: '',
          error: '',
        };
        this.getActList();
        this.tipsBackgroundColor = 'rgba(0, 0, 0, 0.75)';
        this.tipsText = '😊发布成功，请静候回复';
        let t = setTimeout(() => {
          this.tipsText = '';
          clearTimeout(t);
        }, 1500);
        return false;
      });
    },

    showDownloadDialog() {
      this.dialogDownloadShow = true;
      this.downloadDialog = {
        title: '',
        link: '',
        code: '',
        error: '',
      };
    },
    getDownload() {
      var query = this.$Bmob.Query('download');
      this.designerLoading = true;
      query.order('-updatedAt');
      query.equalTo('notDelete', '===', true);
      query.find().then((res) => {
        this.downloadList = res;
      });
    },
    getUserDownload() {
      var query = this.$Bmob.Query('download');
      query.equalTo('user', '==', this.$store.state.user.objectId);
      query.order('-updatedAt');
      query.find().then((res) => {
        this.userDownloadList = res;
      });
    },
    comfilmDownload() {
      if (!this.downDialog.title) {
        this.downDialog.error = '请输入标题';
        return false;
      }
      if (!this.downDialog.link) {
        this.downDialog.error = '请输入百度云链接';
        return false;
      }
      if (!this.downDialog.code) {
        this.downDialog.error = '请输入百度云密码';
        return false;
      }

      this.downDialog.error = '';

      const query = this.$Bmob.Query('download');

      if(this.downDialog.objectId) {
        query.set('id', this.downDialog.objectId);
      }

      if(localStorage.getItem('memberInfo')) {
        const userPointer = this.$Bmob.Pointer('_User');
        const userID = userPointer.set(this.$store.state.user.objectId);
        query.set('user', userID);
      }
      if(this.downDialog.title) {
        query.set('title', this.downDialog.title);
      }
      if(this.downDialog.type) {
        query.set('type', this.downDialog.type);
      }
      if(this.downDialog.link) {
        query.set('link', this.downDialog.link);
      }
      if(this.downDialog.code) {
        query.set('code', this.downDialog.code);
      }
      query.set('author', this.$store.state.user.name);
      query.set('notDelete', false);
      query.save().then(() => {
        this.dialogDownloadShow = false;
        this.downloadDialog = {
          title: '',
          link: '',
          code: '',
          error: '',
        };
        this.getDownload();
        this.getUserDownload();
      });
    },

    getPrivateCount() {
      var query = this.$Bmob.Query('private_orders');
      query.equalTo('notDelete', '==', true);
      query.equalTo('audit', '==', true);
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
      query.equalTo('audit', '==', true);
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

    selectHover(type) {
      switch(type) {
        case 'private':
          this.privatePostDialog.selectShow = true;
          break;
        case 'download':
          console.log('selectHover', this.downDialog.selectShow);
          this.downDialog.selectShow = true;
          break;
        default:
          break;
      }
    },
    selectSort(type, item) {
      switch(type) {
        case 'private':
          this.privatePostDialog.sort = item.name;
          this.privatePostDialog.selectShow = false;
          break;
        case 'download':
          this.downDialog.type = item.value;
          this.downDialog.selectShow = false;
          break;
        default:
          break;
      }
    },

    comfilmPrivate() {
      if (!this.privatePostDialog.name) {
        this.privatePostDialog.error = '请输入称呼';
        return false;
      }
      // if (!this.privatePostDialog.phone) {
      //   this.privatePostDialog.error = '请输入手机号码';
      //   return false;
      // }

      if (this.privatePostDialog.phone.length > 0 && this.privatePostDialog.phone.length < 11) {
        this.privatePostDialog.error = '请输入11位的手机号码';
        return false;
      }

      if (!this.privatePostDialog.wechatId) {
        this.privatePostDialog.error = '请输入微信号';
        return false;
      }

      if (!this.privatePostDialog.sort) {
        this.privatePostDialog.error = '请选择类型';
        return false;
      }

      if (!this.privatePostDialog.remark) {
        this.privatePostDialog.error = '请输入需求描述';
        return false;
      }

      this.privatePostDialog.error = '';

      const query = this.$Bmob.Query('private_orders');
      if(this.privatePostDialog.id) {
        query.set('id', this.privatePostDialog.id);
      }

      if(localStorage.getItem('memberInfo')) {
        const userPointer = this.$Bmob.Pointer('_User');
        const userID = userPointer.set(this.$store.state.user.objectId);
        query.set('user', userID);
      }
      query.set('name', this.privatePostDialog.name || '');
      query.set('phone', this.privatePostDialog.phone || '');
      query.set('wechatId', this.privatePostDialog.wechatId || '');
      query.set('sort', this.privatePostDialog.sort || '');
      query.set('remark', this.privatePostDialog.remark || '');
      query.set('audit', false);

      query.save().then(() => {
        this.dialogPrivateShow = false;
        this.privatePostDialog = {
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

    showPostPrivate() {
      this.dialogPrivateShow = true;
      this.privatePostDialog = {
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
      this.privatePostDialog = {
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
    downloadOnline(item) {
      const query = this.$Bmob.Query('download');
      query.get(item.objectId).then(download => {
        download.set('notDelete', item.notDelete === false || !item.notDelete ? true : false);
        download.save().then(() => {
          this.getDownload();
          this.getUserDownload();
        });
      });
    },
    editDownload(item) {
      this.dialogDownloadShow = true;
      this.downDialog = {
        ...item,
        selectShow: false,
        error: '',
      };
    },
    privateShow(item) {
      this.showPrivate = true;
      this.privateDialog = item;
    },

    
    dialogShow(item) {
      this.dialog = item;
      this.showDownload = true;
    },
    openLink() {
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
      if (tab === 2) {
        this.getOrderList();
      } else if (tab === 1) {
        this.getUserInfo();
      }
    },

    getUserInfo() {
      const userquery = this.$Bmob.Query('_User');
      userquery.get(this.$store.state.user.objectId).then((user) => {
        this.user = user;
      });
    },
    editUserInfo() {
      this.userEdit = true;
    },
    updateUserInfo() {
      const userquery = this.$Bmob.Query('_User');
      userquery.get(this.$store.state.user.objectId).then((user) => {
        user.set('username', this.user.username ? this.user.username : '');
        user.set('sex', this.user.sex ? this.user.sex : 0);
        user.set('email', this.user.email ? this.user.email : '');
        user.set('address', this.user.address ? this.user.address : '');
        user.set('professional', this.user.professional ? this.user.professional : '');
        user.set('qq', this.user.qq ? this.user.qq : '');
        user.set('wechatId', this.user.wechatId ? this.user.wechatId : '');
        user.save().then(() => {
          this.userEdit = false;
        }).catch((err) => {
          if (err.toString().indexOf('Cannot convert undefined or null to object') !== -1) {
            this.userEdit = false;
          }
          if (err.code === 203 && err.error.indexOf('email') !== -1 && err.error.indexOf('already taken.') !== -1) {
            alert('该邮箱已经被绑定，请换其他邮箱');
          }
        });
      });
    },

    getOrderList() {
      const userPointer = this.$Bmob.Pointer('_User');
      const userID = userPointer.set(this.$store.state.user.objectId);
      const query = this.$Bmob.Query('order_list');
      query.order('-updatedAt');
      query.equalTo('user', '==', userID);
      query.find().then((res) => {
        let list = res;

        for (let i = 0; i < list.length; i += 1) {
          list[i].objectId = `<span style="color: #999;">PRO-</span>${list[i].objectId.toUpperCase()}`;

          const time_end = list[i].payReslut.time_end;
          if (time_end) {
            const time = `${time_end.substring(0, 4)}/${time_end.substring(4, 6)}/${time_end.substring(6, 8)} ${time_end.substring(8, 10)}:${time_end.substring(10, 12)}:${time_end.substring(12, 14)}`;
            list[i] = {
              ...list[i],
              out_trade_no: list[i].payReslut.out_trade_no,
              time_end: time
            };
          } else {
            list[i] = {
              ...list[i],
              out_trade_no: list[i].payReslut.out_trade_no,
            };
          }
        }

        for(var i = 0; i < list.length - 1; i += 1){
          //内层比较次数length-1-i次
          for(var j = 0; j < list.length - 1 - i; j += 1){
            //谁跟谁比较？
            if (!list[j].time_end) {
              list[j].time_end = 0;
            }
            if (new Date(list[j].time_end).getTime() > new Date(list[j+1].time_end).getTime()) {
              //交换顺序
              var temp = list[j];
              list[j] = list[j+1];
              list[j+1] = temp;
            }
          }
        }

        this.orderList = list.reverse();
      });
    },

    getProOrderList() {
      const userPointer = this.$Bmob.Pointer('_User');
      const userID = userPointer.set(this.$store.state.user.objectId);
      const query = this.$Bmob.Query('order_list');
      query.order('-updatedAt');
      query.include('product','product');
      query.equalTo('user', '==', userID);
      query.equalTo('sort', '==', 'product');
      query.find().then((res) => {
        // this.productOrderList = res;
        let list = res;

        for (let i = 0; i < list.length; i += 1) {
          // list[i].objectId = `<span style="color: #999;">PRO-</span>${list[i].objectId.toUpperCase()}`;

          const time_end = list[i].payReslut.time_end;
          const time = `${time_end.substring(0, 4)}/${time_end.substring(4, 6)}/${time_end.substring(6, 8)} ${time_end.substring(8, 10)}:${time_end.substring(10, 12)}:${time_end.substring(12, 14)}`;
          list[i] = {
            ...list[i],
            out_trade_no: list[i].payReslut.out_trade_no,
            time_end: time
          };
        }

        for(var i = 0; i < list.length - 1; i += 1){
          //内层比较次数length-1-i次
          for(var j = 0; j < list.length - 1 - i; j += 1){
            //谁跟谁比较？
            if (new Date(list[j].time_end).getTime() > new Date(list[j+1].time_end).getTime()) {
              //交换顺序
              var temp = list[j];
              list[j] = list[j+1];
              list[j+1] = temp;
            }
          }
        }

        this.productOrderList = list.reverse();
      });
    },
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
              background-size: cover;
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
              cursor: pointer;
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
          overflow: auto;
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
              transition: all 250ms ease;
              cursor: pointer;
              &.active {
                &:hover {
                  background-color: #f4c51d;
                  color: #fff;
                }
              }
              &.disabled {
                border-color:#D9D9D9;
                color:#D9D9D9;
              }

            }
          }

          .item-table {
            padding: 0 10px;
            width: 100%;
            box-sizing: border-box;
            table {
              width: 100%;
              font-size: 14px;
              border-collapse: collapse;
              border: 1px solid #eee;
              tr {
                td {
                  padding: 5px 10px;
                  border: 1px solid #eee;
                }
              }
              thead {
                color: #666;
                background-color: #f6f6f6;
              }
              tbody {
                tr {
                  &:hover {
                    background-color: #fafafa;
                  }
                }
              }
            }
          }
        }

        .product-list {
          width: 100%;
          height: 740px;
          overflow: auto;
          .product {
            display: flex;
            margin-bottom: 30px;
            width: 100%;
            background-color: #fff;
            padding: 0 20px;
            box-sizing: border-box;
            &:last-child {
              margin-bottom: 0;
            }
            .item {
              flex: 1;
              display: flex;
              align-items: center;
              height: 80px;
              font-size: 14px;
              text-align: center;
              justify-content: center;
              box-sizing: border-box;
              &:first-child {
                justify-content: flex-start;
              }
              &:last-child {
                justify-content: flex-end;
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
        .right {
          float: right;
          font-size: 12px;
          color: #333333;
          line-height: 17px;
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
            padding: 0 10px;
            min-width: 36px;
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
            &:disabled {
              background-color: #fff;
            }
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

        .remark-box {
          margin-bottom: 25px;
          padding: 15px;
          width: 100%;
          height: 90px;
          background-color: #f2f2f2;
          color: #888;
          font-size: 12px;
          box-sizing: border-box;
        }
        .private-user {
          margin-top: 8px;
          font-size: 12px;
          color: #888;
          line-height: 17px;
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
</style>