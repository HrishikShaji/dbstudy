import prisma from "@/app/lib/connect";

export async function GET(request: Request) {
  try {
    const data = await prisma.size.findMany({
      include: { products: true },
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { size } = await request.json();

    console.log(size);
    if (!size) {
      return new Response(JSON.stringify("error"), { status: 400 });
    }

    await prisma.size.create({
      data: {
        name: size,
      },
    });
    return new Response(JSON.stringify("succeess"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
