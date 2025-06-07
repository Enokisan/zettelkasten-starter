# zettelkasten-starter

[![npm version](https://badge.fury.io/js/zettelkasten-starter.svg)](https://badge.fury.io/js/zettelkasten-starter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Zettelkasten-Starterは、Zettelkasten（ツェッテルカステン）メソッドを始める方のための、究極的にシンプルなライブラリです。

## 📝 Zettelkastenとは？

Zettelkastenは、ドイツの社会学者ニクラス・ルーマンが開発した知識管理システムです。アイデアや情報を相互に関連付けながら整理することで、創造的な思考と学習を促進します。

## 🚀 特徴

- **ワンコマンドセットアップ**: `npx create-zettelkasten`で即座にZettelkastenを始められます
- **標準的な構造**: Zettelkastenの4つの基本ノートタイプに対応
- **多言語対応**: 英語・日本語でのREADMEとサンプル生成
- **即座に使用可能**: サンプルファイルとガイド付きで、すぐに始められます

## 📦 インストール

NPXを使用して直接実行できます（インストール不要）：

```bash
npx create-zettelkasten [プロジェクト名]
```

または、グローバルにインストールして使用：

```bash
npm install -g zettelkasten-starter
create-zettelkasten [プロジェクト名]
```

## 🎯 使用方法

### 基本的な使用方法

```bash
# 新しいZettelkastenプロジェクトを作成
npx create-zettelkasten my-zettelkasten

# カレントディレクトリに作成
npx create-zettelkasten .

# 言語を指定して作成（オプション）
npx create-zettelkasten my-zettelkasten --lang ja
npx create-zettelkasten my-zettelkasten --lang en
```

### 生成される構造

```txt
my-zettelkasten/
├── README.md                    # 使い方ガイド
├── 01_FleetingNote/            # フリーティングノート
│   └── sample_fleeting.md      # サンプルファイル
├── 02_LiteratureNote/          # 文献ノート
│   └── sample_literature.md    # サンプルファイル
├── 03_PermanentNote/           # パーマネントノート
│   └── sample_permanent.md     # サンプルファイル
└── 04_StructureNote/           # 構造ノート
    └── sample_structure.md     # サンプルファイル
```

## 📚 4つのノートタイプ

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

## 🛠️ オプション

| オプション | 説明 | デフォルト |
|------------|------|------------|
| `--lang, -l` | 生成言語（`en` または `ja`） | `en` |
| `--help, -h` | ヘルプを表示 | - |
| `--version, -v` | バージョンを表示 | - |

## 💡 使い方のコツ

1. **小さく始める**: まずはFleetingNoteに思いついたことを書く
2. **定期的な整理**: FleetingNoteを他のノートタイプに昇格させる
3. **リンクを作る**: `[[ノート名]]`で他のノートと関連付ける
4. **継続が重要**: 毎日少しずつでも続ける

## 🤝 コントリビューション

プルリクエストやイシューを歓迎します！

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルをご覧ください。

## 🙋‍♂️ サポート

- 🐛 バグ報告: [Issues](https://github.com/Enokisan/zettelkasten-starter/issues)
- 💡 機能要望: [Issues](https://github.com/Enokisan/zettelkasten-starter/issues)
- 📧 その他のお問い合わせ: [GitHub](https://github.com/Enokisan)

## 🔗 関連リンク

- [Zettelkastenメソッドについて詳しく](https://zettelkasten.de/)
- [Obsidian](https://obsidian.md/) - Zettelkastenに適したマークダウンエディタ

---

**Zettelkasten-Starterで、あなたの知識管理（PKM）を次のレベルへ！** 🚀
