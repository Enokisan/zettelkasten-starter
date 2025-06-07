const fs = require('fs-extra');
const path = require('path');
const { createZettelkasten } = require('../lib/creator');

// テスト用の一時ディレクトリ
const testDir = path.join(__dirname, 'integration-test-output');

describe('統合テスト', () => {
  beforeEach(async () => {
    await fs.remove(testDir);
    await fs.ensureDir(testDir);
  });

  afterEach(async () => {
    await fs.remove(testDir);
  });

  test('完全なZettelkastenプロジェクトが期待通りに機能する', async () => {
    const projectPath = path.join(testDir, 'full-project');
    
    // プロジェクトを作成
    await createZettelkasten(projectPath, 'ja');

    // 1. プロジェクト構造の完全性確認
    const expectedDirs = [
      '01_FleetingNote',
      '02_LiteratureNote',
      '03_PermanentNote',
      '04_StructureNote'
    ];

    for (const dir of expectedDirs) {
      const dirPath = path.join(projectPath, dir);
      expect(await fs.pathExists(dirPath)).toBe(true);
      
      // 各ディレクトリにサンプルファイルが存在することを確認
      const files = await fs.readdir(dirPath);
      expect(files.length).toBeGreaterThan(0);
      
      // 最初のファイルの内容を確認
      const firstFile = files[0];
      const filePath = path.join(dirPath, firstFile);
      const content = await fs.readFile(filePath, 'utf8');
      expect(content.trim().length).toBeGreaterThan(0);
    }

    // 2. README.mdの内容確認
    const readmePath = path.join(projectPath, 'README.md');
    expect(await fs.pathExists(readmePath)).toBe(true);
    
    const readmeContent = await fs.readFile(readmePath, 'utf8');
    
    // 必要なセクションが全て含まれているか確認
    expect(readmeContent).toContain('私のZettelkasten');
    expect(readmeContent).toContain('📁 ディレクトリ構造');
    expect(readmeContent).toContain('01_FleetingNote（フリーティングノート）');
    expect(readmeContent).toContain('02_LiteratureNote（文献ノート）');
    expect(readmeContent).toContain('03_PermanentNote（パーマネントノート）');
    expect(readmeContent).toContain('04_StructureNote（構造ノート）');
    expect(readmeContent).toContain('💡 使い方のコツ');
    expect(readmeContent).toContain('🏷️ タグの使い方');
    expect(readmeContent).toContain('📝 ファイル命名規則');
    expect(readmeContent).toContain('🚀 さあ、始めましょう！');

    // 3. ファイル拡張子の確認
    for (const dir of expectedDirs) {
      const dirPath = path.join(projectPath, dir);
      const files = await fs.readdir(dirPath);
      
      for (const file of files) {
        expect(file).toMatch(/\.md$/); // 全てのファイルがMarkdown形式
      }
    }
  });

  test('英語と日本語のプロジェクトが共存できる', async () => {
    const enProjectPath = path.join(testDir, 'en-project');
    const jaProjectPath = path.join(testDir, 'ja-project');

    // 英語版プロジェクト作成
    await createZettelkasten(enProjectPath, 'en');
    
    // 日本語版プロジェクト作成
    await createZettelkasten(jaProjectPath, 'ja');

    // 両方のプロジェクトが存在することを確認
    expect(await fs.pathExists(enProjectPath)).toBe(true);
    expect(await fs.pathExists(jaProjectPath)).toBe(true);

    // 英語版READMEの確認
    const enReadme = await fs.readFile(path.join(enProjectPath, 'README.md'), 'utf8');
    expect(enReadme).toContain('My Zettelkasten');
    expect(enReadme).toContain('Directory Structure');

    // 日本語版READMEの確認
    const jaReadme = await fs.readFile(path.join(jaProjectPath, 'README.md'), 'utf8');
    expect(jaReadme).toContain('私のZettelkasten');
    expect(jaReadme).toContain('ディレクトリ構造');

    // 両プロジェクトが同じディレクトリ構造を持つことを確認
    const enDirs = await fs.readdir(enProjectPath);
    const jaDirs = await fs.readdir(jaProjectPath);
    
    const expectedDirs = [
      '01_FleetingNote',
      '02_LiteratureNote',
      '03_PermanentNote',
      '04_StructureNote',
      'README.md'
    ];
    
    expectedDirs.forEach(item => {
      expect(enDirs).toContain(item);
      expect(jaDirs).toContain(item);
    });
  });

  test('既存ファイルがある環境での安全な作成', async () => {
    const projectPath = path.join(testDir, 'existing-content');
    
    // 既存コンテンツを作成
    await fs.ensureDir(projectPath);
    await fs.writeFile(path.join(projectPath, 'my-notes.md'), '# 既存のメモ\n重要な内容');
    await fs.ensureDir(path.join(projectPath, 'custom-folder'));
    await fs.writeFile(path.join(projectPath, 'custom-folder', 'data.txt'), 'カスタムデータ');

    // Zettelkastenプロジェクトを追加
    await createZettelkasten(projectPath, 'ja');

    // 既存ファイルが保持されているか確認
    expect(await fs.pathExists(path.join(projectPath, 'my-notes.md'))).toBe(true);
    expect(await fs.pathExists(path.join(projectPath, 'custom-folder', 'data.txt'))).toBe(true);

    const existingContent = await fs.readFile(path.join(projectPath, 'my-notes.md'), 'utf8');
    expect(existingContent).toContain('重要な内容');

    // 新しいZettelkastenディレクトリも作成されているか確認
    expect(await fs.pathExists(path.join(projectPath, '01_FleetingNote'))).toBe(true);
    expect(await fs.pathExists(path.join(projectPath, 'README.md'))).toBe(true);
  });

  test('サンプルファイルの品質確認', async () => {
    const projectPath = path.join(testDir, 'sample-quality');
    
    await createZettelkasten(projectPath, 'ja');

    const directories = [
      '01_FleetingNote',
      '02_LiteratureNote',
      '03_PermanentNote',
      '04_StructureNote'
    ];

    for (const dir of directories) {
      const dirPath = path.join(projectPath, dir);
      const files = await fs.readdir(dirPath);
      
      for (const file of files) {
        const filePath = path.join(dirPath, file);
        const content = await fs.readFile(filePath, 'utf8');
        
        // Markdownファイルの基本的な品質確認
        expect(content).toMatch(/^#/m); // ヘッダーが存在
        expect(content.length).toBeGreaterThan(50); // 適度な長さ
        expect(content).toContain('\n'); // 複数行
        
        // 日本語のサンプルファイルであることを確認
        expect(content).toMatch(/[ひらがなカタカナ漢字]/);
      }
    }
  });

  test('大量のファイル作成でもパフォーマンスが問題ない', async () => {
    const startTime = Date.now();
    
    // 複数のプロジェクトを連続作成
    const projectPromises = [];
    for (let i = 0; i < 5; i++) {
      const projectPath = path.join(testDir, `performance-test-${i}`);
      projectPromises.push(createZettelkasten(projectPath, i % 2 === 0 ? 'en' : 'ja'));
    }
    
    await Promise.all(projectPromises);
    
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    
    // 5秒以内に完了することを確認（合理的なパフォーマンス要件）
    expect(elapsedTime).toBeLessThan(5000);
    
    // 全てのプロジェクトが正常に作成されたことを確認
    for (let i = 0; i < 5; i++) {
      const projectPath = path.join(testDir, `performance-test-${i}`);
      expect(await fs.pathExists(projectPath)).toBe(true);
      expect(await fs.pathExists(path.join(projectPath, 'README.md'))).toBe(true);
    }
  });

  test('エラー発生後の状態確認', async () => {
    const projectPath = path.join(testDir, 'error-recovery');
    
    // 権限のないディレクトリの親を作成してから権限を変更する代わりに
    // 無効なパス文字を使用してエラーを発生させる
    const invalidPath = path.join(testDir, 'invalid\x00path');
    
    await expect(createZettelkasten(invalidPath, 'ja')).rejects.toThrow();
    
    // その後正常なプロジェクト作成ができることを確認
    await createZettelkasten(projectPath, 'ja');
    
    expect(await fs.pathExists(projectPath)).toBe(true);
    expect(await fs.pathExists(path.join(projectPath, 'README.md'))).toBe(true);
  });
}); 