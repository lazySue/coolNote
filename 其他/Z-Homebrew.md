#Homebrew
Homebrew会将软件包安装到独立目录，并将其文件软连接至/usr/local。

###安装

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

###常用命令行
```
brew update  更新Homebrew
brew upgrade [package-name]  升级过期软件包
brew outdated  显示过期软件包
brew install [package-name]  安装软件包
brew cleanup [package-name]  清除软件包老版本
brew cleanup -n  查看哪些软件包要被清除
brew uninstall [package-name] --force  彻底卸载软件包
brew search [package-name]  查找软件包
brew list  已安装软件包
brew info [package-name]
brew link [--overwrite] [--force] [package-name] 链接软件所有安装文件
brew unlink [package-name] 从’Homebrew prefix'中删除软件链接
```
[brew 命令行详解][brew_cli]

###brew切换node版本
其实有点复杂的说

> * 下载最新版本 `brew install node`
> ![homebrew2](images/homebrew/homebrew2.png)
> * 搜索想要使用的版本 `brew search node`
> ![homebrew1](images/homebrew/homebrew1.png)
> * 想要使用的版本为8.11.2，则执行 `brew install node@8`
> ![homebrew3](images/homebrew/homebrew3.png)
>
> 	* 方法一 <br>
> 修改环境变量来控制系统node版本 `open .bash_profile` 将node@8加入path `source .bash_profile`
>
> 	* 方法二 <br>
> 		1. 将node@8中的文件考入node文件夹 <br>
> 		2. 进入/usr/local/Cellar/目录，将node@8改为node。执行`brew info node` <br>
> 		3. 将node链接删除 `brew unlink node` <br>此时系统没有node版本 <br>
> 		4. `brew switch node 8.11.2` 将node切换为8.11.2版本 <br>
> 		![homebrew4](images/homebrew/homebrew4.png)
> 		此时执行`brew link --overwrite node` 将node 8.11.2 链接到brew，node版本变更到了8.11.2 <br>
> 		想要切换，使用`brew switch node [version]`即可
> * **问题：切换到10.3.0时，npm中的文件无法链接，可使用`brew reinstall node`下载最新版本**


[brew_cli]:https://blog.csdn.net/beyond__devil/article/details/52649362
