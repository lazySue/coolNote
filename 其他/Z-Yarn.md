#Yarn
快速、可靠、安全的依赖管理工具
###[Yarn中文网](https://yarn.bootcss.com/docs/cli)

###macOS
可以通过Homebrew 安装Yarn

```
brew install yarn
```
安装完成后，设置环境变量:PATH添加 $PATH:·yarn global bin·

```
yarn --verison   检查安装
```

###使用方法
* 初始化新项目

	```
	yarn init
	```
* 添加依赖包

	```
	yarn add [package][@version][@tag] 安装相同主版本号的最新版本
	--dev/-D			devDependencies
	--peer/-P			perDependencies
	--optional/-O		optionalDependencies
	--exact/-E		安装指定版本
	--tilde/-T		安装相同副版本号的的最新版本
	```
* 更新依赖包

	```
	yarn upgrade [package][@version][@tag]
	```
* 删除依赖包

	```
	yarn remove [package]
	```
* 安装所有依赖包
	```
	yarn / yarn install
	--flat			
	--force		强制重新下载所有包
	--no-lockfile 
	--production	下载生产环境包
	```
* `yarn cache`

	```
	yarn cache ls   列出已缓存的包
	yarn cache dir  列出当前yarn全局缓存位置
	yarn cache clean 	清除本地缓存
	yarn config set cache-folder <path>  设置cache-folder的值来改变缓存目录
	```
* `yarn check`

	检验当前项目的package.json文件中的依赖版本和yarn的lock文件中是否匹配
* `yarn clean`

	删除项目中不必要的依赖文件
* `yarn config`

	```
	yarn config set <key> <value> [-g|--global]   设置yarn全局配置
	yarn config get <key>
	yarn config delete <key>
	yarn config list
	```
* `yarn info`

	```
	yarn info <package> [<field>]
		--json
		description
		time
		readme
	```
* `yarn link`

* `yarn unlink`

* `yarn ls`

	```
	yarn list
		--depth
			=0
	```
* `yarn outdated`

	
	
