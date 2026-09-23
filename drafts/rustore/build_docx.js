// Сборка .docx для блога RuStore из article.md: Arial, заголовки стилем «Заголовок 1», картинки из images/.
// Запуск: npm i docx во временной папке, затем node build_docx.js <папка статьи> <выходной.docx>
const fs = require('fs'), path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun, ExternalHyperlink } = require('docx');
const dir = process.argv[2], out = process.argv[3];
const src = fs.readFileSync(path.join(dir, 'article.md'), 'utf8').split(String.fromCharCode(13)).join('');
const head = src.match(/<!-- ШАПКА -->([\s\S]*?)<!-- \/ШАПКА -->/)[1].trim().split('\n');
const body = src.split('<!-- /ШАПКА -->')[1].trim().split(/\n{2,}/);
const inline = s => {
  const runs = []; const re = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g; let last = 0, m;
  while ((m = re.exec(s))) {
    if (m.index > last) runs.push(new TextRun(s.slice(last, m.index)));
    runs.push(new ExternalHyperlink({ link: m[2], children: [new TextRun({ text: m[1], style: 'Hyperlink' })] }));
    last = re.lastIndex;
  }
  if (last < s.length) runs.push(new TextRun(s.slice(last)));
  return runs;
};
const children = head.map(l => new Paragraph({ children: [new TextRun(l)] }));
children.push(new Paragraph(''));
for (const b of body) {
  const t = b.trim();
  let m;
  if ((m = t.match(/^#{1,3} (.*)/))) { children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(m[1])] })); continue; }
  if ((m = t.match(/^\[Изображение: (\S+?\.png)\]?(?: — подпись: (.*)\])?$/))) {
    const file = path.join(dir, 'images', m[1]); const buf = fs.readFileSync(file);
    const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
    const tw = w > h ? 600 : 260; const th = Math.round(tw * h / w);
    children.push(new Paragraph({ children: [new ImageRun({ type: 'png', data: buf, transformation: { width: tw, height: th }, altText: { title: m[1], description: m[2] || m[1], name: m[1] } })] }));
    if (m[2]) children.push(new Paragraph({ children: [new TextRun(m[2].replace(/^«|»$/g, ''))] }));
    continue;
  }
  children.push(new Paragraph({ children: inline(t.replace(/\n/g, ' ')) }));
}
const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Arial', size: 22 }, paragraph: { spacing: { after: 200, line: 300 } } } },
    paragraphStyles: [{ id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: 'Arial', size: 32, bold: true }, paragraph: { spacing: { before: 400, after: 160 }, keepNext: true, outlineLevel: 0 } }],
  },
  sections: [{ children }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(out, b); console.log('ok', out); });
