import prisma from "@/app/lib/connect";

export async function GET(request: Request) {
  try {
    const data = await prisma.color.findMany({
      include: { products: true },
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { color } = await request.json();

    console.log(color);
    if (!color) {
      return new Response(JSON.stringify("error"), { status: 400 });
    }

    await prisma.color.create({
      data: {
        name: color,
      },
    });
    return new Response(JSON.stringify("succeess"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
