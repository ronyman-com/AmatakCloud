const { program } = require('commander');
const deployCommand = require('./commands/deploy');
const logsCommand = require('./commands/logs');



program
    .command('deploy <repoUrl>')
    .description('Deploy a site to Cloudflare Pages')
    .action(deployCommand);


program
    .command('logs <deploymentId>')
    .description('View logs for a deployment')
    .action(logsCommand);

program.parse(process.argv);