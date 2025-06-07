# Zettelkasten Starter

An ultimately simple CLI tool and library for Zettelkasten beginners.

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g zettelkasten-starter
```

### Local Installation

```bash
npm install zettelkasten-starter
```

## 🚀 Usage

### As CLI Tool

```bash
# Interactive mode
create-zettelkasten

# Specify project name directly
create-zettelkasten my-notes

# Create project in Japanese
create-zettelkasten my-notes --lang ja

# Create project in English
create-zettelkasten my-notes --lang en
```

### As Library

```javascript
const { createZettelkasten } = require('zettelkasten-starter');

// Basic usage
await createZettelkasten('./my-zettelkasten');

// Specify language
await createZettelkasten('./my-zettelkasten', 'ja');
await createZettelkasten('./my-zettelkasten', 'en');
```

## 📁 Generated Directory Structure

When you create a project, the following structure is generated:

```
my-zettelkasten/
├── 01_FleetingNote/          # Fleeting notes
│   └── sample-fleeting.md
├── 02_LiteratureNote/        # Literature notes
│   └── sample-literature.md
├── 03_PermanentNote/         # Permanent notes
│   └── sample-permanent.md
├── 04_StructureNote/         # Structure notes
│   └── sample-structure.md
└── README.md                 # Usage guide
```

## 🎯 Key Features

- **4 Note Types**: Classification based on the Zettelkasten method
- **Sample Files**: Usage examples for each note type
- **Multi-language Support**: Japanese and English supported
- **CLI/Library Support**: Use from command line or programmatically

## 📝 API Reference

### `createZettelkasten(targetPath, language)`

#### Parameters

- `targetPath` (string): Directory path where the project will be created
- `language` (string, optional): Generation language. `'ja'` or `'en'` (default: `'en'`)

#### Returns

- `Promise<void>`: Promise indicating project creation completion

#### Examples

```javascript
const { createZettelkasten } = require('zettelkasten-starter');

// Create Japanese project
await createZettelkasten('./knowledge-base', 'ja');

// Create English project
await createZettelkasten('./knowledge-base', 'en');
```

## ⚙️ Requirements

- Node.js >= 14.0.0

## 🛠️ Development

```bash
# Clone repository
git clone https://github.com/Enokisan/zettelkasten-starter.git
cd zettelkasten-starter

# Install dependencies
npm install

# Run tests
npm test

# Check coverage
npm run test:coverage
```

## 📄 License

MIT

## 🤝 Contributing

Issues and pull requests are always welcome!

## 📚 Related Links

- [GitHub Repository](https://github.com/Enokisan/zettelkasten-starter)
- [Issues](https://github.com/Enokisan/zettelkasten-starter/issues)

---

**Start efficient knowledge management with Zettelkasten!** 🚀
