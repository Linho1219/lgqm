import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

const root = process.cwd();
const contentDir = 'content';
const IndexName = '_index.md';

export function fetchPage(...paths) {
  const pagePath = path.join(root, contentDir, ...paths);
  return fs.readFileSync(pagePath).toString();
}

export function fetchDir(...paths) {
  const dirPath = path.join(root, contentDir, ...paths);

  const indexPath = path.join(dirPath, IndexName);
  const indexData = fs.readFileSync(indexPath).toString();
  const indexMa = matter(indexData);
  let data = indexMa.data;
  data.content = indexMa.content;
  data.wordCount = 0;
  data.pages = [];

  const files = fs.readdirSync(dirPath);
  for (const filename of files) {
    if (filename === IndexName) continue;

    const filePath = path.join(dirPath, filename);
    const fileData = fs.readFileSync(filePath).toString();
    const fileMa = matter(fileData);
    let page = fileMa.data;
    page.wordCount = fileMa.content.length;
    data.pages.push(page);
    data.wordCount += page.wordCount;
  }

  return data;
}

export function fetchIndex() {
  const contentPath = path.join(root, contentDir);
  const dirs = fs.readdirSync(contentPath);
  const lists = [];

  for (const dir of dirs) {
    const fullPath = path.join(contentPath, dir);
    if (!fs.statSync(fullPath).isDirectory()) continue;

    const vol = fetchDir(dir);
    lists.push({
      volume: vol.volume,
      title: vol.title,
      author: vol.author,
      wordCount: vol.wordCount,
      length: vol.pages.length,
    });
  }

  return { lists };
}
