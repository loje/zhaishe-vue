<template>
  <div class="auth-page" v-if="showAuth">
		<div class="auth-layer">
			<div class="layer-flex">
				<div class="layer-box">
					<div class="auth-text">您还没有做身份认证哦，赶紧来认证吧</div>
					<div class="auth-btn" @click="goAuth">前往认证</div>
				</div>
			</div>
			<div class="auth-close">
				<!-- <i class="iconfont">&#xea13;</i> -->
				<span>关闭</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	// data() {
	// 	return {}
	// },
	props: {
		showAuth: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		goAuth() {
			this.$router.push('/auth');
		},
	},
}
</script>

<style lang="scss" scoped>
	.auth-page {
		position: fixed;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 101;
		.auth-layer {
			position: relative;
			.layer-flex {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 390px;
				height: 170px;
				background-color: #fff;
				border-radius: 25px;
				.layer-box {
					.auth-text {
						margin-bottom: 20px;
						font-size: 14px;
						color: #333;
					}
					.auth-btn {
						margin: auto;
						width: 160px;
						height: 38px;
						line-height: 38px;
						text-align: center;
						border-radius: 2px;
						background-color: #F4C51D;
						color: #262626;
						font-size: 14px;
						font-weight: 600;
						cursor: pointer;
					}
				}
			}
			.auth-close {
				position: absolute;
				left: 0;
				bottom: -56px;
				width: 100%;
				text-align: center;
				span {
					display: inline-block;
					width: 36px;
					height: 36px;
					line-height: 36px;
					font-size: 10px;
					color: #fff;
					border-radius: 50%;
					background-color: rgba(0, 0, 0, 0.4);
					cursor: pointer;
				}
			}
		}
	}
</style>
