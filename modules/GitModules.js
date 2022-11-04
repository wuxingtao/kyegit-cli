/**
 * @Desc: gitModules
 * @Author: wu xingtao
 * @Date: 2022/10/26
 */
import shell from 'shelljs'
import chalk from 'chalk'
import {gitLists} from '../constans/index.js'

class GitModules{
  constructor() {
    this.branchLists = []
  }
  existBranch(name,git){
    // git ls-remote --heads git@github.com:user/repo.git branch-name
  }
  create(list,daySelect){
    // 判断git命令是否可用
    if(!shell.which('git')){
      console.log(chalk.red('no git command'));
      shell.exit(1)
    }
    list.forEach(f=>{
      const {dir,branchPrefix} = gitLists.find(i=>i.name === f)
      const branch = this.getBranchName(branchPrefix,daySelect)
      console.log(branch)

      shell.cd(dir);
      // 检查git 分支是否存在
      shell.exec('git fetch -p')
      if(shell.exec(`git rev-parse --verify "origin/${branch}"`).code !== 0){
        // 从远程拉取新分支
        if(shell.exec(`git checkout -b ${branch} origin/${branchPrefix}`).code !== 0){
          shell.exit(1)
        }
        if(shell.exec(`git push --set-upstream origin ${branch}`).code !== 0){
          shell.exit(1)
        }
        // 记录生成的分支
        this.branchLists.push({
          key: f,
          value: branch
        })
      }
    })

    this.branchLists.forEach(f=>{
      console.log(chalk.green(`${f.key}:${f.value}`))
    })

  }

  /**
   * 获取创建的分支名
   * @param branchPrefix 主分支前缀
   * @param daySelect ['today','tomorrow'] 命名规则天数
   * @return {string}
   */
  getBranchName(branchPrefix, daySelect){
    let date = new Date()
    if(daySelect === 'tomorrow' ){
      date = date.setDate(date.getDate() + 1);
      date = new Date(date)
    }
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const monthFull = month < 10 ? `0${month}` : month
    const dayFull = day < 10 ? `0${day}` : day
    return `${branchPrefix}-${year}${monthFull}${dayFull}`
  }
}
export default GitModules
