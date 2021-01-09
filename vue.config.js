module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Ice Cream Store";
				
				return args;
            })
	},

	publicPath: process.env.NODE_ENV === 'production' ? '/store-demo/' : '/',
}