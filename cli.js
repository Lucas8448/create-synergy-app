#!/usr/bin/env node

const { program } = require('commander');
const { scaffoldProject } = require('./scaffold');

program
  .name('create-synergy-app')
  .description('CLI to scaffold a synergy-js app')
  .argument('<project-directory>', 'Project directory name')
  .action(scaffoldProject);

program.parse(process.argv);