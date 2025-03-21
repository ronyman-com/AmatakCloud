const { exec } = require('child_process');
const path = require('path');

describe('CLI Tests', () => {
    it('should deploy a site', (done) => {
        const cliPath = path.resolve(__dirname, '../../src/cli/index.js');
        exec(`node ${cliPath} deploy https://github.com/example/repo`, (error, stdout, stderr) => {
            expect(error).toBeNull();
            expect(stdout).toContain('Deployment successful');
            done();
        });
    });

    it('should handle deployment errors', (done) => {
        const cliPath = path.resolve(__dirname, '../../src/cli/index.js');
        exec(`node ${cliPath} deploy invalid-repo`, (error, stdout, stderr) => {
            expect(error).not.toBeNull();
            expect(stderr).toContain('Deployment failed');
            done();
        });
    });
});