#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const readline = require('readline');
const { createZettelkasten } = require('../lib/creator');

/**
 * 対話的にプロジェクト名を取得
 */
function askProjectName() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('📝 Enter project name: ', (answer) => {
      rl.close();
      const projectName = answer.trim();
      if (projectName === '') {
        console.log('❌ Project name cannot be empty. Please try again.');
        process.exit(1);
      }
      resolve(projectName);
    });
  });
}

program
  .version('1.0.0')
  .argument('[project-name]', 'Project name (optional - will prompt if not provided)')
  .option('-l, --lang <language>', 'Generation language (en|ja)', 'en')
  .description('Create a Zettelkasten project')
  .action(async (projectName, options) => {
    try {
      // プロジェクト名が提供されていない場合は対話モードで取得
      if (!projectName) {
        projectName = await askProjectName();
      }
      
      const targetPath = path.resolve(process.cwd(), projectName);
      await createZettelkasten(targetPath, options.lang);
      
      console.log('🎉 Zettelkasten project created successfully!');
      console.log(`📁 Location: ${targetPath}`);
      console.log(`\n📝 To get started:`);
      console.log(`   cd ${projectName}`);
      console.log(`   Check README.md for guidance`);
    } catch (error) {
      console.error('❌ Error occurred:', error.message);
      process.exit(1);
    }
  });

program.parse(); 