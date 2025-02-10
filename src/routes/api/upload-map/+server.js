import { error, json } from '@sveltejs/kit';
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
const CHUNK_SIZE = 64 * 1024; // 64KB chunks

async function writeFileInChunks(filePath, buffer) {
  const chunks = [];
  for (let i = 0; i < buffer.byteLength; i += CHUNK_SIZE) {
    chunks.push(buffer.slice(i, i + CHUNK_SIZE));
  }
  
  await writeFile(filePath, Buffer.from(buffer));
}

export async function POST({ request }) {
  console.log('POST request received to /api/upload-map');
  
  try {
    const data = await request.formData();
    const file = data.get('file');
    
    if (!file) {
      throw error(400, 'No file uploaded');
    }

    if (file.size > MAX_FILE_SIZE) {
      throw error(400, 'File size exceeds 5MB limit');
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const staticPath = join(__dirname, '..', '..', '..', '..', 'static', 'images');
    const filePath = join(staticPath, 'mansion-map.jpeg');
    
    console.log('Processing upload:', {
      fileName: file.name,
      fileSize: file.size,
      destination: filePath
    });

    await mkdir(staticPath, { recursive: true });
    
    const buffer = await file.arrayBuffer();
    await writeFileInChunks(filePath, buffer);
    
    console.log('Upload completed successfully');
    
    return json({ 
      success: true,
      path: '/images/mansion-map.jpeg',
      size: buffer.byteLength
    });
    
  } catch (e) {
    console.error('Upload failed:', e);
    throw error(500, e.message);
  }
}
