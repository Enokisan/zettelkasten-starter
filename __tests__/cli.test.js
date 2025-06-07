const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');

// テスト用の一時ディレクトリ
const testDir = path.join(__dirname, 'cli-test-output');

describe('CLI Tool', () => {
  beforeEach(async () => {
    // 各テスト前にクリーンな状態にする
    await fs.remove(testDir);
    await fs.ensureDir(testDir);
  });

  afterEach(async () => {
    // 各テスト後にクリーンアップ
    await fs.remove(testDir);
  });

  const runCLI = (args = [], input = '') => {
    return new Promise((resolve, reject) => {
      const cliPath = path.join(__dirname, '../bin/create-zettelkasten.js');
      const child = spawn('node', [cliPath, ...args], {
        cwd: testDir,
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        resolve({ code, stdout, stderr });
      });

      child.on('error', (err) => {
        reject(err);
      });

      if (input) {
        child.stdin.write(input);
        child.stdin.end();
      }
    });
  };

  test('プロジェクト名を引数で指定してプロジェクトが作成される', async () => {
    const projectName = 'test-project-arg';
    const result = await runCLI([projectName]);

    expect(result.code).toBe(0);
    expect(result.stdout).toContain('🎉 Zettelkasten project created successfully!');
    expect(result.stdout).toContain(`📁 Location: ${path.join(testDir, projectName)}`);

    // プロジェクトディレクトリが作成されているか確認
    const projectPath = path.join(testDir, projectName);
    expect(await fs.pathExists(projectPath)).toBe(true);
    
    // 基本ディレクトリが作成されているか確認
    expect(await fs.pathExists(path.join(projectPath, '01_FleetingNote'))).toBe(true);
    expect(await fs.pathExists(path.join(projectPath, 'README.md'))).toBe(true);
  }, 10000);

  test('日本語オプションでプロジェクトが作成される', async () => {
    const projectName = 'test-project-ja';
    const result = await runCLI([projectName, '--lang', 'ja']);

    expect(result.code).toBe(0);
    expect(result.stdout).toContain('🎉 Zettelkasten project created successfully!');

    // 日本語のREADMEが作成されているか確認
    const readmePath = path.join(testDir, projectName, 'README.md');
    const readmeContent = await fs.readFile(readmePath, 'utf8');
    expect(readmeContent).toContain('私のZettelkasten');
  }, 10000);

  test('-lフラグでも言語指定ができる', async () => {
    const projectName = 'test-project-l-flag';
    const result = await runCLI([projectName, '-l', 'ja']);

    expect(result.code).toBe(0);
    
    const readmePath = path.join(testDir, projectName, 'README.md');
    const readmeContent = await fs.readFile(readmePath, 'utf8');
    expect(readmeContent).toContain('私のZettelkasten');
  }, 10000);

  test('バージョン情報が表示される', async () => {
    const result = await runCLI(['--version']);
    
    expect(result.code).toBe(0);
    expect(result.stdout).toContain('1.0.0');
  });

  test('ヘルプが表示される', async () => {
    const result = await runCLI(['--help']);
    
    expect(result.code).toBe(0);
    expect(result.stdout).toContain('Create a Zettelkasten project');
    expect(result.stdout).toContain('Usage:');
    expect(result.stdout).toContain('Options:');
  });

  test('対話モードでプロジェクト名を入力して作成される', async () => {
    const projectName = 'interactive-project';
    const result = await runCLI([], `${projectName}\n`);

    expect(result.code).toBe(0);
    expect(result.stdout).toContain('📝 Enter project name:');
    expect(result.stdout).toContain('🎉 Zettelkasten project created successfully!');

    // プロジェクトが作成されているか確認
    const projectPath = path.join(testDir, projectName);
    expect(await fs.pathExists(projectPath)).toBe(true);
  }, 10000);

  test('空のプロジェクト名で対話モードが失敗する', async () => {
    const result = await runCLI([], '\n');

    expect(result.code).toBe(1);
    expect(result.stdout).toContain('❌ Project name cannot be empty');
  }, 10000);

  test('既存のディレクトリ名を指定しても正常に動作する', async () => {
    const projectName = 'existing-dir';
    const projectPath = path.join(testDir, projectName);
    
    // 既存のディレクトリを作成
    await fs.ensureDir(projectPath);
    await fs.writeFile(path.join(projectPath, 'existing.txt'), 'test');

    const result = await runCLI([projectName]);

    expect(result.code).toBe(0);
    expect(result.stdout).toContain('🎉 Zettelkasten project created successfully!');

    // 既存ファイルが残っているか確認
    expect(await fs.pathExists(path.join(projectPath, 'existing.txt'))).toBe(true);
    // 新しいディレクトリも作成されているか確認
    expect(await fs.pathExists(path.join(projectPath, '01_FleetingNote'))).toBe(true);
  }, 10000);

  test('サポートされていない言語でもエラーにならない', async () => {
    const projectName = 'test-unsupported-lang';
    const result = await runCLI([projectName, '--lang', 'fr']);

    expect(result.code).toBe(0);
    expect(result.stdout).toContain('🎉 Zettelkasten project created successfully!');

    // 英語のREADMEが作成されているか確認（フォールバック）
    const readmePath = path.join(testDir, projectName, 'README.md');
    const readmeContent = await fs.readFile(readmePath, 'utf8');
    expect(readmeContent).toContain('My Zettelkasten');
  }, 10000);

  test('相対パスでプロジェクトが作成される', async () => {
    const projectName = 'relative-path-project';
    const result = await runCLI([projectName]);

    expect(result.code).toBe(0);
    
    // カレントディレクトリ（testDir）にプロジェクトが作成されているか確認
    const projectPath = path.join(testDir, projectName);
    expect(await fs.pathExists(projectPath)).toBe(true);
    expect(result.stdout).toContain(`📁 Location: ${projectPath}`);
  }, 10000);

  test('使用方法の指示が正しく表示される', async () => {
    const projectName = 'usage-test';
    const result = await runCLI([projectName]);

    expect(result.code).toBe(0);
    expect(result.stdout).toContain('📝 To get started:');
    expect(result.stdout).toContain(`cd ${projectName}`);
    expect(result.stdout).toContain('Check README.md for guidance');
  }, 10000);
});

describe('CLIエラーハンドリング', () => {
  test('無効なオプションでエラーが発生する', async () => {
    const runCLI = (args = []) => {
      return new Promise((resolve) => {
        const cliPath = path.join(__dirname, '../bin/create-zettelkasten.js');
        const child = spawn('node', [cliPath, ...args], {
          stdio: ['pipe', 'pipe', 'pipe']
        });

        let stdout = '';
        let stderr = '';

        child.stdout.on('data', (data) => {
          stdout += data.toString();
        });

        child.stderr.on('data', (data) => {
          stderr += data.toString();
        });

        child.on('close', (code) => {
          resolve({ code, stdout, stderr });
        });
      });
    };

    const result = await runCLI(['--invalid-option']);
    
    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain('unknown option');
  });
}); 