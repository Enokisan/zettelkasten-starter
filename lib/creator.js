const fs = require('fs-extra');
const path = require('path');

/**
 * Zettelkastenプロジェクトを作成する
 * @param {string} targetPath - 作成先のパス
 * @param {string} language - 言語 ('en' | 'ja')
 */
async function createZettelkasten(targetPath, language = 'en') {
  // ディレクトリが存在しない場合は作成
  await fs.ensureDir(targetPath);
  
  // 4つの基本ディレクトリを作成
  const directories = [
    '01_FleetingNote',
    '02_LiteratureNote', 
    '03_PermanentNote',
    '04_StructureNote'
  ];
  
  for (const dir of directories) {
    await fs.ensureDir(path.join(targetPath, dir));
  }
  
  // README.mdを作成
  const readmeContent = getReadmeContent(language);
  await fs.writeFile(path.join(targetPath, 'README.md'), readmeContent);
  
  // サンプルファイルを作成
  await createSampleFiles(targetPath, language);
}

/**
 * 言語に応じたREADMEコンテンツを取得
 * @param {string} language - 言語
 * @returns {string} READMEの内容
 */
function getReadmeContent(language) {
  if (language === 'ja') {
    return `# 私のZettelkasten

Zettelkastenメソッドを使った知識管理システムへようこそ!

## 📁 ディレクトリ構造

このプロジェクトは4つの基本的なノートタイプで構成されています:

### 01_FleetingNote（フリーティングノート）

- 瞬間的なアイデアや思いつき
- 後で整理するための一時的なメモ
- 短時間で記録する簡潔なノート

### 02_LiteratureNote（文献ノート）

- 本、記事、動画などの内容要約
- 引用や参考文献の記録
- 自分の言葉での解釈や感想

### 03_PermanentNote（パーマネントノート）

- 完全に自分の言葉で表現された知識
- 他のノートと関連付けられた洞察
- 長期的に価値のある知見

### 04_StructureNote（構造ノート）

- テーマやトピックの概要
- 関連するノートへのインデックス
- 知識の地図やナビゲーション

## 💡 使い方のコツ

1. **小さく始める**: まずはFleetingNoteに思いついたことを書く
2. **定期的な整理**: FleetingNoteを他のノートタイプに昇格させる
3. **リンクを作る**: \`[[ノート名]]\`で他のノートと関連付ける
4. **タグを活用**: \`#concept\` \`#method\` \`#review\`などでカテゴライズ
5. **継続が重要**: 毎日少しずつでも続ける

## 🏷️ タグの使い方

タグは情報の分類と検索を効率化します：

- \`#concept\` - 概念や理論
- \`#method\` - 方法論やテクニック  
- \`#review\` - 振り返りや評価
- \`#source/book\` - 書籍からの情報
- \`#source/article\` - 記事からの情報
- \`#draft\` - 下書きや未完成
- \`#important\` - 重要度の高い内容
- \`#todo\` - アクションアイテム
- \`#気の赴くままに\` - 好きなタグを追加していきましょう

## 📝 ファイル命名規則

- 日付ベース: \`YYYY-MM-DD_タイトル.md\`
- ID ベース: \`001_タイトル.md\`
- 自由形式: \`意味のあるタイトル.md\`

あなたに合った方法を選んでください！

## 🚀 さあ、始めましょう！

各ディレクトリにサンプルファイルが用意されています。
それらを参考に、あなた独自のZettelkastenを構築していってください。

---

**Happy Note-Taking! 📚✨**
`;
  } else {
    return `# My Zettelkasten

Welcome to your knowledge management system using the Zettelkasten method!

## 📁 Directory Structure

This project consists of four basic note types:

### 01_FleetingNote

- Fleeting ideas and quick thoughts
- Temporary notes for later organization
- Brief notes recorded in a short time

### 02_LiteratureNote

- Summaries of books, articles, videos, etc.
- Citations and references
- Your interpretations and reflections

### 03_PermanentNote

- Knowledge expressed entirely in your own words
- Insights linked to other notes
- Long-term valuable insights

### 04_StructureNote

- Overview of themes and topics
- Index to related notes
- Knowledge maps and navigation

## 💡 Tips for Usage

1. **Start small**: First write down your thoughts in FleetingNote
2. **Regular organization**: Promote FleetingNotes to other note types
3. **Create links**: Use \`[[Note Name]]\` to connect with other notes
4. **Use tags**: Categorize with \`#concept\` \`#method\` \`#review\` etc.
5. **Consistency is key**: Continue a little bit every day

## 🏷️ How to Use Tags

Tags help organize and search information efficiently:

- \`#concept\` - Concepts and theories
- \`#method\` - Methodologies and techniques
- \`#review\` - Reflections and evaluations
- \`#source/book\` - Information from books
- \`#source/article\` - Information from articles
- \`#draft\` - Drafts and work in progress
- \`#important\` - High priority content
- \`#todo\` - Action items
- \`#asyouwish\` - Add your own tags as you go

## 📝 File Naming Conventions

- Date-based: \`YYYY-MM-DD_title.md\`
- ID-based: \`001_title.md\`
- Free-form: \`meaningful-title.md\`

Choose the method that works best for you!

## 🚀 Let's Get Started!

Sample files are prepared in each directory.
Use them as references to build your unique Zettelkasten.

---

**Happy Note-Taking! 📚✨**
`;
  }
}

/**
 * サンプルファイルを作成
 * @param {string} targetPath - 作成先のパス
 * @param {string} language - 言語
 */
async function createSampleFiles(targetPath, language) {
  const samples = getSampleContents(language);
  
  for (const [filePath, content] of Object.entries(samples)) {
    await fs.writeFile(path.join(targetPath, filePath), content);
  }
}

/**
 * サンプルファイルの内容を取得
 * @param {string} language - 言語
 * @returns {Object} ファイルパスとコンテンツのオブジェクト
 */
function getSampleContents(language) {
  if (language === 'ja') {
    return {
      '01_FleetingNote/sample_fleeting.md': `# フリーティングノートのサンプル

日付: ${new Date().toISOString().split('T')[0]}
タグ: #fleeting #zettelkasten #idea #draft

## 💭 今日の思いつき

- Zettelkastenを始めてみた
- アイデアを素早くキャッチするのが重要
- 後で整理することを前提に、まずは記録

## 🔗 関連する可能性

- [[学習方法について]]
- [[知識管理システム]]

## 📋 次のアクション

- [ ] このアイデアをより詳しく調べる #todo
- [ ] 関連する文献を探す #todo

---

*これはサンプルファイルです。自由に編集・削除してください。*
`,
      '02_LiteratureNote/sample_literature.md': `# 文献ノートのサンプル

タグ: #literature #source/book #zettelkasten #method #notes

## 📚 書籍情報

- **タイトル**: How to Take Smart Notes
- **著者**: Sönke Ahrens
- **出版年**: 2017
- **読了日**: ${new Date().toISOString().split('T')[0]}

## 📝 主要ポイント

### Zettelkastenの原則

1. **一つのアイデア、一つのノート**
   - 各ノートは単一のアイデアに焦点を当てる
   - 複雑な概念は複数のノートに分割

2. **自分の言葉で書く**
   - 単なるコピペではなく、理解した内容を表現
   - 後で読み返した時に理解できるように

3. **リンクを作る**
   - ノート間の関連性を明示的に作る
   - 新しい洞察が生まれる可能性

## 🤔 私の考察

Zettelkastenは単なるノート取りツールではなく、思考のツールだと感じた。
重要なのは... #concept #important

## 💡 アクションアイテム

- [ ] 実際にZettelkastenシステムを1週間試してみる #todo
- [ ] 効果を測定する方法を考える #todo

## 🔗 関連ノート

- [[001_zettelkasten_principles]]
- [[note_taking_methods]]

---

*これはサンプルファイルです。実際の読書ノートに置き換えてください。*
`,
      '03_PermanentNote/sample_permanent.md': `# パーマネントノートのサンプル

ID: 001
作成日: ${new Date().toISOString().split('T')[0]}
タグ: #permanent #concept #knowledge-management #connection #important

## 🎯 知識管理における「つながり」の重要性

知識管理システムで最も重要なのは、個々の情報ではなく、それらの**つながり**である。

### なぜつながりが重要なのか

1. **新しい洞察の創出**
   - 異なる分野の知識が結びつくことで、予期しない発見が生まれる
   - 創造性は既存要素の新しい組み合わせから生まれる

2. **理解の深化**
   - 関連する概念と結びつけることで、個別の知識がより深く理解される
   - 文脈の中で知識を捉えることができる

3. **記憶の強化**
   - 関連付けられた情報は、単独の情報よりも記憶に残りやすい
   - 想起の手がかりが増える

### 実践的な方法

- 新しいノートを作成する際は、既存の3つ以上のノートとの関連を考える
- 定期的にノート間のリンクを見直し、新しいつながりを発見する
- 構造ノートを使って、テーマごとの知識の地図を作る

## 🔗 関連するノート

- [[creativity_and_connection]]
- [[memory_techniques]]
- [[zettelkasten_principles]]

## 📚 参考文献

- Ahrens, S. (2017). How to Take Smart Notes
- [[literature_note_smart_notes]]

---

*これは完全に自分の言葉で表現された知識です。*
`,
      '04_StructureNote/sample_structure.md': `# 構造ノート: Zettelkastenとは

作成日: ${new Date().toISOString().split('T')[0]}
タグ: #structure #zettelkasten #index #map #overview

## 🗺️ このトピックの概要

このノートは「Zettelkasten」というテーマの入り口として機能します。
関連するすべてのノートへのナビゲーションを提供します。

## 📖 基本概念

### Zettelkastenの原則

- [[001_zettelkasten_principles]] - 基本的な考え方
- [[connection_importance]] - つながりの重要性
- [[atomic_notes]] - アトミックノートの概念

### 実践方法

- [[daily_note_routine]] - 日々のノート習慣
- [[note_linking_strategies]] - リンク戦略
- [[review_process]] - 定期的な見直し

## 📚 参考文献とソース

### 文献ノート
- [[literature_note_smart_notes]] - "How to Take Smart Notes"
- [[literature_note_second_brain]] - "Building a Second Brain"

### フリーティングノート
- [[fleeting_zettelkasten_discovery]] - Zettelkasten発見時の印象
- [[fleeting_digital_vs_analog]] - デジタル vs アナログの考察

## 🔍 関連トピック

- [[knowledge_management]] - より広い知識管理の文脈
- [[creative_thinking]] - 創造的思考との関連
- [[learning_systems]] - 学習システム全般

## 📊 進捗状況

- ✅ 基本概念の理解
- 🔄 実践方法の模索中
- ⭕ 自分なりのシステム構築（今後の課題）

---

*この構造ノートは定期的に更新し、新しいノートが追加されたら関連付けを行います。*
`
    };
  } else {
    return {
      '01_FleetingNote/sample_fleeting.md': `# Fleeting Note Sample

Date: ${new Date().toISOString().split('T')[0]}
Tags: #fleeting #zettelkasten #idea #draft

## 💭 Today's Ideas

- Started using Zettelkasten
- Quick capture of ideas is crucial
- Focus on recording first, organizing later

## 🔗 Potential Connections

- [[learning_methods]]
- [[knowledge_management_systems]]

## 📋 Next Actions

- [ ] Research this idea further #todo
- [ ] Find related literature #todo

---

*This is a sample file. Feel free to edit or delete.*
`,
      '02_LiteratureNote/sample_literature.md': `# Literature Note Sample

Tags: #literature #source/book #zettelkasten #method #notes

## 📚 Book Information

- **Title**: How to Take Smart Notes
- **Author**: Sönke Ahrens
- **Year**: 2017
- **Date Read**: ${new Date().toISOString().split('T')[0]}

## 📝 Key Points

### Zettelkasten Principles

1. **One Idea, One Note**
   - Each note focuses on a single idea
   - Complex concepts are split into multiple notes

2. **Write in Your Own Words**
   - Not just copy-paste, but express understanding
   - Make it understandable when revisiting later

3. **Create Links**
   - Explicitly create relationships between notes
   - Enables emergence of new insights

## 🤔 My Reflections

I realized that Zettelkasten is not just a note-taking tool, but a thinking tool.
The important thing is... #concept #important

## 💡 Action Items

- [ ] Try the Zettelkasten system for a week #todo
- [ ] Think about how to measure effectiveness #todo

## 🔗 Related Notes

- [[001_zettelkasten_principles]]
- [[note_taking_methods]]

---

*This is a sample file. Replace with your actual reading notes.*
`,
      '03_PermanentNote/sample_permanent.md': `# Permanent Note Sample

ID: 001
Created: ${new Date().toISOString().split('T')[0]}
Tags: #permanent #concept #knowledge-management #connection #important

## 🎯 The Importance of "Connections" in Knowledge Management

The most important aspect of knowledge management systems is not individual pieces of information, but their **connections**.

### Why Connections Matter

1. **Creation of New Insights**

   - Unexpected discoveries emerge when knowledge from different fields connects
   - Creativity comes from new combinations of existing elements

2. **Deepening Understanding**

   - Knowledge becomes more deeply understood when connected to related concepts
   - Enables understanding knowledge within context

3. **Memory Enhancement**

   - Connected information is more memorable than isolated information
   - Increases retrieval cues

### Practical Methods

- When creating new notes, consider connections to at least 3 existing notes
- Regularly review links between notes to discover new connections
- Use structure notes to create knowledge maps by theme

## 🔗 Related Notes

- [[creativity_and_connection]]
- [[memory_techniques]]
- [[zettelkasten_principles]]

## 📚 References

- Ahrens, S. (2017). How to Take Smart Notes
- [[literature_note_smart_notes]]

---

*This knowledge is expressed entirely in my own words.*
`,
      '04_StructureNote/sample_structure.md': `# Structure Note: What is Zettelkasten

Created: ${new Date().toISOString().split('T')[0]}
Tags: #structure #zettelkasten #index #map #overview

## 🗺️ Topic Overview

This note serves as an entry point for the "Zettelkasten" theme.
It provides navigation to all related notes.

## 📖 Core Concepts

### Zettelkasten Principles

- [[001_zettelkasten_principles]] - Basic philosophy
- [[connection_importance]] - Importance of connections
- [[atomic_notes]] - Atomic note concept

### Practical Methods

- [[daily_note_routine]] - Daily note-taking habits
- [[note_linking_strategies]] - Linking strategies
- [[review_process]] - Regular review process

## 📚 References and Sources

### Literature Notes

- [[literature_note_smart_notes]] - "How to Take Smart Notes"
- [[literature_note_second_brain]] - "Building a Second Brain"

### Fleeting Notes

- [[fleeting_zettelkasten_discovery]] - First impressions of Zettelkasten
- [[fleeting_digital_vs_analog]] - Digital vs Analog considerations

## 🔍 Related Topics

- [[knowledge_management]] - Broader knowledge management context
- [[creative_thinking]] - Connection to creative thinking
- [[learning_systems]] - Learning systems in general

## 📊 Progress Status

- ✅ Understanding basic concepts
- 🔄 Exploring practical methods
- ⭕ Building personal system (future goal)

---

*This structure note will be updated regularly, and new connections will be made as notes are added.*
`
    };
  }
}

module.exports = {
  createZettelkasten
}; 