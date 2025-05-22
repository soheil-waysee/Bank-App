import { NextRequest, NextResponse } from 'next/server';

const mockNames = ['dashboard'];
export async function GET(req: NextRequest, { params }: { params: { mockName: string } }) {
  const { mockName } = params;

  if (!mockNames.includes(mockName)) {
    return NextResponse.json({ error: `Mock '${mockName}' not found.` }, { status: 404 });
  }

  try {
    const data = await import(`@/mocks/${mockName}.json`);
    return NextResponse.json(data.default);
  } catch {
    return NextResponse.json({ error: `Failed to load mock '${mockName}'.` }, { status: 500 });
  }
}
