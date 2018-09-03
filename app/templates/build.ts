import s from 'shelljs';
const config = require('./tsconfig.json');
const outDir = config.compilerOptions.outDir;

s.rm('-rf', outDir);
s.mkdir(outDir);
s.cp('.env', `${outDir}/.env`);
s.mkdir('-p', `${outDir}/common/swagger`);
s.cp('server/common/swagger/Api.yaml', `${outDir}/common/swagger/Api.yaml`);
