#!/usr/bin/env node

const { exec } = require('child_process');
const { program } = require('commander');

program
    .command('start')
    .description('Start the AmatakCloud server')
    .action(() => {
        console.log('Starting AmatakCloud...');
        exec('npm run amatak', (err, stdout, stderr) => {
            if (err) {
                console.error('Error starting AmatakCloud:', err.message);
                return;
            }
            console.log(stdout);
        });
    });

program
    .command('deploy <repoUrl>')
    .description('Deploy a site to Cloudflare Pages')
    .action((repoUrl) => {
        console.log(`Deploying ${repoUrl}...`);
        exec(`node src/cli/index.js deploy ${repoUrl}`, (err, stdout, stderr) => {
            if (err) {
                console.error('Error deploying site:', err.message);
                return;
            }
            console.log(stdout);
        });
    });

program
    .command('logs <deploymentId>')
    .description('View logs for a deployment')
    .action((deploymentId) => {
        console.log(`Fetching logs for deployment ${deploymentId}...`);
        exec(`node src/cli/index.js logs ${deploymentId}`, (err, stdout, stderr) => {
            if (err) {
                console.error('Error fetching logs:', err.message);
                return;
            }
            console.log(stdout);
        });
    });

program.parse(process.argv);