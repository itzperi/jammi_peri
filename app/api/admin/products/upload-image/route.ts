import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        if (!file) {
            return NextResponse.json({ error: "No files received." }, { status: 400 });
        }
        
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch(e) {}
        
        const path = join(uploadDir, filename);
        await writeFile(path, buffer);
        
        return NextResponse.json({ url: `/uploads/${filename}` });
    } catch(err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
