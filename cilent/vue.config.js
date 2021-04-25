const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
	devServer: {
		// host:"localhost",//要设置当前访问的ip 否则失效
		host: "0.0.0.0", //要设置当前访问的ip 否则失效
		open: true, //浏览器自动打开页面
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				ws: true,
				changeOrigin: true,
			}
		}
	},

	//配置网页title
	chainWebpack: (config) => {
		config.plugin('html').tap((args) => {
			args[0].title = '非遗百科';
			return args;
		});
	},

	css: {
		loaderOptions: {
			postcss: {
				plugins: [
					autoprefixer(),
					pxtorem({
						rootValue: 75,   //设计稿宽度/10
						propList: ['*'],
						selectorBlackList: ["van-"]   //排除vant框架相关组件
					})
				]
			}
		}
	}

}