#!/usr/bin/env node

// const shell = require('shelljs');
// const program = require('commander');
// const inquirer = require('inquirer');
// const fs = require('fs');
// const path = require('path');
import * as fs from 'fs'
import * as path from 'path'
import { program } from 'commander'
import inquirer from 'inquirer';
import GitModules from '../modules/GitModules.js'
import {gitLists} from '../constans/index.js'

program.parse(process.argv);

let dir = program.args[0];

const questions = [{
  type: 'checkbox',
  name: 'gitList',
  message: '请选择需创建回归分支项目',
  default: 'demo-static',
  choices:gitLists.map(f=>f.name),
  // validate: (name)=>{
  //   if(/^[a-z]+/.test(name)){
  //     return true;
  //   }else{
  //     return '项目名称必须以小写字母开头';
  //   }
  // }
},{
  type: 'rawlist',
  name: 'daySelect',
  message: '请选择创建日期',
  choices: ['today','tomorrow']
},
  {
    type: 'input',
    name: 'dayAfter',
    message: '请输入创建多少天后分支',
  }
]

function getModule(){
  return new Promise(resolve=>{
    inquirer.prompt(questions).then((answers)=>{
      return resolve({
        ...answers
      })
    })
  })
}

async function createBranchs() {
  const { gitList,daySelect,dayAfter } = await getModule()
  const gitModules = new GitModules()
  gitModules.create(gitList,{daySelect,dayAfter})

}
createBranchs()



