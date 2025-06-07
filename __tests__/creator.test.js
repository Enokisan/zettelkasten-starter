const fs = require('fs-extra');
const path = require('path');
const { createZettelkasten } = require('../lib/creator');

// テスト用の一時ディレクトリを管理
const testDir = path.join(__dirname, 'test-output');

describe('Zettelkasten Creator', () => {
  beforeEach(async () => {
    // 各テスト前にクリーンな状態にする
    await fs.remove(testDir);
  });

  afterEach(async () => {
    // 各テスト後にクリーンアップ
    await fs.remove(testDir);
  });

  describe('createZettelkasten', () => {
    test('英語版のZettelkastenプロジェクトが正常に作成される', async () => {
      const projectPath = path.join(testDir, 'test-zettelkasten-en');
      
      await createZettelkasten(projectPath, 'en');
      
      // ディレクトリが作成されているか確認
      expect(await fs.pathExists(projectPath)).toBe(true);
      
      // 基本ディレクトリが作成されているか確認
      const expectedDirs = [
        '01_FleetingNote',
        '02_LiteratureNote',
        '03_PermanentNote',
        '04_StructureNote'
      ];
      
      for (const dir of expectedDirs) {
        const dirPath = path.join(projectPath, dir);
        expect(await fs.pathExists(dirPath)).toBe(true);
        expect((await fs.stat(dirPath)).isDirectory()).toBe(true);
      }
    });

    test('日本語版のZettelkastenプロジェクトが正常に作成される', async () => {
      const projectPath = path.join(testDir, 'test-zettelkasten-ja');
      
      await createZettelkasten(projectPath, 'ja');
      
      // ディレクトリが作成されているか確認
      expect(await fs.pathExists(projectPath)).toBe(true);
      
      // README.mdが作成され、日本語コンテンツが含まれているか確認
      const readmePath = path.join(projectPath, 'README.md');
      expect(await fs.pathExists(readmePath)).toBe(true);
      
      const readmeContent = await fs.readFile(readmePath, 'utf8');
      expect(readmeContent).toContain('私のZettelkasten');
      expect(readmeContent).toContain('フリーティングノート');
      expect(readmeContent).toContain('ディレクトリ構造');
    });

    test('英語版のREADMEファイルが正しく作成される', async () => {
      const projectPath = path.join(testDir, 'test-zettelkasten-en');
      
      await createZettelkasten(projectPath, 'en');
      
      const readmePath = path.join(projectPath, 'README.md');
      expect(await fs.pathExists(readmePath)).toBe(true);
      
      const readmeContent = await fs.readFile(readmePath, 'utf8');
      expect(readmeContent).toContain('My Zettelkasten');
      expect(readmeContent).toContain('FleetingNote');
      expect(readmeContent).toContain('Directory Structure');
      expect(readmeContent).toContain('Happy Note-Taking!');
    });

    test('サンプルファイルが正しく作成される', async () => {
      const projectPath = path.join(testDir, 'test-zettelkasten-sample');
      
      await createZettelkasten(projectPath, 'en');
      
      // 各ディレクトリにサンプルファイルが作成されているか確認
      const fleetingNotePath = path.join(projectPath, '01_FleetingNote');
      const literatureNotePath = path.join(projectPath, '02_LiteratureNote');
      const permanentNotePath = path.join(projectPath, '03_PermanentNote');
      const structureNotePath = path.join(projectPath, '04_StructureNote');
      
      // 各ディレクトリにファイルが存在することを確認
      const fleetingFiles = await fs.readdir(fleetingNotePath);
      const literatureFiles = await fs.readdir(literatureNotePath);
      const permanentFiles = await fs.readdir(permanentNotePath);
      const structureFiles = await fs.readdir(structureNotePath);
      
      expect(fleetingFiles.length).toBeGreaterThan(0);
      expect(literatureFiles.length).toBeGreaterThan(0);
      expect(permanentFiles.length).toBeGreaterThan(0);
      expect(structureFiles.length).toBeGreaterThan(0);
      
      // サンプルファイルの内容を確認
      const sampleFleetingFile = path.join(fleetingNotePath, fleetingFiles[0]);
      const content = await fs.readFile(sampleFleetingFile, 'utf8');
      expect(content).toBeTruthy();
      expect(content.length).toBeGreaterThan(0);
    });

    test('既存のディレクトリに対しても正常に動作する', async () => {
      const projectPath = path.join(testDir, 'existing-dir');
      
      // 既存のディレクトリを作成
      await fs.ensureDir(projectPath);
      await fs.writeFile(path.join(projectPath, 'existing-file.txt'), 'existing content');
      
      await createZettelkasten(projectPath, 'en');
      
      // 既存ファイルが残っているか確認
      expect(await fs.pathExists(path.join(projectPath, 'existing-file.txt'))).toBe(true);
      
      // 新しいディレクトリも作成されているか確認
      expect(await fs.pathExists(path.join(projectPath, '01_FleetingNote'))).toBe(true);
      expect(await fs.pathExists(path.join(projectPath, 'README.md'))).toBe(true);
    });

    test('デフォルト言語は英語である', async () => {
      const projectPath = path.join(testDir, 'test-default-lang');
      
      // 言語パラメータを指定せずに呼び出し
      await createZettelkasten(projectPath);
      
      const readmePath = path.join(projectPath, 'README.md');
      const readmeContent = await fs.readFile(readmePath, 'utf8');
      
      // 英語のコンテンツが含まれているか確認
      expect(readmeContent).toContain('My Zettelkasten');
      expect(readmeContent).not.toContain('私のZettelkasten');
    });

    test('無効な言語が指定された場合は英語で作成される', async () => {
      const projectPath = path.join(testDir, 'test-invalid-lang');
      
      await createZettelkasten(projectPath, 'invalid-language');
      
      const readmePath = path.join(projectPath, 'README.md');
      const readmeContent = await fs.readFile(readmePath, 'utf8');
      
      // 英語のコンテンツが含まれているか確認
      expect(readmeContent).toContain('My Zettelkasten');
    });

    test('空の文字列パスでエラーがスローされる', async () => {
      await expect(createZettelkasten('')).rejects.toThrow();
    });

    test('権限がない場所への作成でエラーがスローされる', async () => {
      // アクセス権限がない場所を指定
      const restrictedPath = '/root/no-permission';
      
      await expect(createZettelkasten(restrictedPath)).rejects.toThrow();
    });
  });

  describe('ファイル構造の検証', () => {
    test('作成されたプロジェクトが期待される構造を持つ', async () => {
      const projectPath = path.join(testDir, 'structure-test');
      
      await createZettelkasten(projectPath, 'ja');
      
      // ルートレベルのファイル確認
      expect(await fs.pathExists(path.join(projectPath, 'README.md'))).toBe(true);
      
      // ディレクトリ構造確認
      const expectedStructure = [
        '01_FleetingNote',
        '02_LiteratureNote', 
        '03_PermanentNote',
        '04_StructureNote'
      ];
      
      for (const dir of expectedStructure) {
        const dirPath = path.join(projectPath, dir);
        expect(await fs.pathExists(dirPath)).toBe(true);
        
        // 各ディレクトリにサンプルファイルが存在することを確認
        const files = await fs.readdir(dirPath);
        expect(files.length).toBeGreaterThan(0);
        
        // 少なくとも1つのmarkdownファイルが存在することを確認
        const markdownFiles = files.filter(file => file.endsWith('.md'));
        expect(markdownFiles.length).toBeGreaterThan(0);
      }
    });

    test('README.mdの内容が適切な形式である', async () => {
      const projectPath = path.join(testDir, 'readme-test');
      
      await createZettelkasten(projectPath, 'ja');
      
      const readmePath = path.join(projectPath, 'README.md');
      const content = await fs.readFile(readmePath, 'utf8');
      
      // Markdownの基本的な要素が含まれているか確認
      expect(content).toMatch(/^#\s/m); // H1ヘッダーが存在
      expect(content).toMatch(/^##\s/m); // H2ヘッダーが存在
      expect(content).toMatch(/^###\s/m); // H3ヘッダーが存在
      expect(content).toContain('`'); // コードブロックが存在
      expect(content).toContain('📁'); // 絵文字が含まれている
    });
  });
}); 