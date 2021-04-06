#!/usr/bin/env node
const chalk = require('chalk')
const argv = require('minimist')(process.argv.slice(2))

console.log(chalk.cyan(`vitepress v${require('vitepress/package.json').version}`))
console.log(chalk.cyan(`vite v${require('vite/package.json').version}`))
console.log(chalk.cyan(`project name ${require('../package.json').name}`))
console.log(chalk.cyan(`--にゃんぱすー--`))
const command = argv._[0]
const root = argv._[command ? 1 : 0]
if (root) {
  argv.root = root
}

if (!command || command === 'dev') {
  const port = argv.port || 3000
  require('vitepress/dist/node')
    .createServer(root,argv)
    .then((server) => {
      server.listen(port, () => {
        console.log(`listening at http://localhost:${port}`)
      })
    })
    .catch((err) => {
      console.error(chalk.red(`failed to start server. error:\n`), err)
    })
} else if (command === 'build') {
  require('vitepress/dist/node')
    .build(root,argv)
    .catch((err) => {
      console.error(chalk.red(`build error:\n`), err)
    })
} else {
  console.log(chalk.red(`unknown command "${command}".`))
}
