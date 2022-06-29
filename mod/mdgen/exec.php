shell_exec('npm install --force thi-slide-tools thi-slide-theme');
shell_exec('npm install');
shell_exec('npm run static -- slides/'.$md_filename);