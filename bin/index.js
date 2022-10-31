#!/usr/bin/env node

// console.log('hello CLI');
// const program = require('commander');
import { program } from 'commander'

program
  .version('1.0.0', '-v, --version')
  .command('init <dir>', 'generate a new project')
  .action(function(dir, cmd){
    console.log(dir, cmd)
  })
  .parse(process.argv);
