---
title: Git
toc: true
date: 2018-08-14 12:06:20
tags: git
categories: 技工蓝翔
---

# 常用 CLI
| -                               | -                                        |
| ------------------------------- | ---------------------------------------- |
| 创建仓库                        | `git clone <url>` `git init`             |
| 创建分支                        | `git branch <name> [origin/nameB]`       |
| 查看分支                        | `git branch -a`                          |
| 切换分支                        | `git checkout <name>`                    |
| 从 B 分支创建并切换分支         | `git checkout -b <name> origin/nameB`    |
| 添加修改的文件(暂存/解决冲突)   | `git add <filenames> [-A/-all/.]`        |
| 提交修改                        | `git commit [-m 'message']`              |
| 拉取远程代码                    | `git pull origin <origin-branchname>`    |
| 推送到远程                      | `git push`                               |
| 合并(将A分支合并到本地当前分支) | `git merge <[origin/]branchA>`           |
| 删除本地分支                    | `git branch -d <name>`                   |
| 删除远程分支                    | `git push origin --delete <branch-name>` |
| 查看分支状态                    | `git status`                             |
| 将本地库的内容推送到远程        | `git push -u origin master`              |
| 查看本地分支关联的远程分支      | `git branch -vv`                                         |


<!-- more -->

```bash
// 查看修改的内容
git diff <filename>
// 查看日志
git log
// 查看命令历史
git reflog
// 撤销工作区中的修改（包括恢复删除）
git checkout -- <file>
// 撤销暂存区的修改，HEAD 表示最新版本
git reset HEAD <file>
// 从暂存库中删除文件（同git add）
git rm file
// 将本地与远程仓库关联  origin: 远程仓库名称
git remote add origin git@github.com:lazySue/git-learn.git
git push -u , -u 将本地master 分支与远程master 分支关联起来
```

# git add
`git add .` 将工作区的所有变化提交到暂存区，包括修改和新文件，但不包括删除的文件
`git add -u/--update` 仅监控已被 add 过的文件，即被追踪的文件修改或删除都会提交到暂存区，不会添加新文件
`git add -A/--all` 上面两个功能的合集

# 回退
```bash
$ git reset --hard HEAD^         回退到上个版本，HEAD^^为两个版本
$ git reset --hard HEAD~3        回退到前3次提交之前，以此类推，回退到n次提交之前
$ git reset --hard [commit_id]     退到/进到 指定commit的sha码（前几位）

// 强推到远程：
$ git push origin HEAD --force
```

# 分支CLI
```bash
// 在远程分支 B 上创建本地分支A，并切换到 A 分支
git checkout -b <branch-nameA> origin/branch-nameB

```
