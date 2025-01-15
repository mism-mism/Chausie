// code.ts
figma.showUI(__html__, { width: 320, height: 400 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate') {
    figma.ui.postMessage({ type: 'status', message: 'データを処理中...' });

    try {
      const data = parseCSV(msg.data);
      figma.ui.postMessage({ type: 'status', message: 'データを取得しました。テンプレートを適用中...' });

      const template = figma.currentPage.findOne(node => node.type === 'FRAME' && node.name === 'Template') as FrameNode;

      if (!template) {
        figma.ui.postMessage({ type: 'status', message: '「Template」という名前のフレームが見つかりません。' });
        return;
      }

      for (const entry of data) {
        await applyTemplate(template, entry);
      }

      figma.ui.postMessage({ type: 'status', message: 'すべてのクリエイティブを生成しました。' });
      figma.notify('クリエイティブの生成が完了しました。');
    } catch (error) {
      figma.ui.postMessage({ type: 'status', message: `エラーが発生しました: ${error}` });
      figma.notify('クリエイティブの生成中にエラーが発生しました。');
    }
  }
};

function parseCSV(csv: string): Array<{ [key: string]: string }> {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  const data = lines.slice(1).map(line => {
    const values = line.split(',').map(value => value.trim());
    const entry: { [key: string]: string } = {};
    headers.forEach((header, index) => {
      entry[header] = values[index] || '';
    });
    return entry;
  });
  return data;
}

async function applyTemplate(template: FrameNode, data: { [key: string]: string }) {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });

  const clone = template.clone();
  clone.name = `Creative - ${data['number'] || 'Unnamed'}`;
  figma.currentPage.appendChild(clone);

  const textNodes = clone.findAll(node => node.type === 'TEXT') as TextNode[];
  for (const textNode of textNodes) {
    const key: string = textNode.name.replace('text_', '').trim();

    if (data[key]) {
      textNode.characters = data[key];
      textNode.resize(textNode.width, textNode.height);
    }
  }

  const imageNodes = clone.findAll(node => {
    return node.type === 'RECTANGLE' && Array.isArray(node.fills) && node.fills.some((fill: Paint) => fill.type === 'IMAGE');
  }) as RectangleNode[];

  for (const imageNode of imageNodes) {
    const key = imageNode.name.replace('image_', '').trim();
    if (data[key]) {
      const imageHash = await loadImageAsync(data[key]);
      if (imageHash) {
        imageNode.fills = [{ type: 'IMAGE', imageHash, scaleMode: 'FILL' }];
      }
    }
  }

  const imageBytes = await clone.exportAsync({ format: 'PNG' });
  figma.ui.postMessage({ type: 'export', filename: `${clone.name}.png`, data: Array.from(imageBytes) });
}

async function loadImageAsync(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`画像の取得に失敗しました: ${url}`);
      return null;
    }
    const arrayBuffer = await response.arrayBuffer();
    const imageBytes = new Uint8Array(arrayBuffer);
    const imageHash = figma.createImage(imageBytes).hash;
    return imageHash;
  } catch (error) {
    console.error(`画像の読み込み中にエラーが発生しました: ${error}`);
    return null;
  }
}