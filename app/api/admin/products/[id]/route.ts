import { NextResponse } from 'next/server';
import { db } from '../../../../../lib/firebase';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { MOCK_PRODUCTS } from '../../../../../constants';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const docRef = doc(db, 'products', id);
        const snapshot = await getDoc(docRef);
        if(!snapshot.exists()) {
            // Check mock products if not in DB
            const mockProduct = MOCK_PRODUCTS.find(p => String(p.id) === id);
            if (mockProduct) {
                return NextResponse.json({ ...mockProduct, status: 'Published' });
            }
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        return NextResponse.json({ id: snapshot.id, ...snapshot.data() });
    } catch(err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const data = await request.json();
        const docRef = doc(db, 'products', id);
        // Use setDoc with merge true so we can "edit" mock products by saving them to DB
        await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
        return NextResponse.json({ success: true });
    } catch(err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const docRef = doc(db, 'products', id);
        // Soft delete to handle overriding mock products
        await setDoc(docRef, { deleted: true }, { merge: true });
        return NextResponse.json({ success: true });
    } catch(err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
