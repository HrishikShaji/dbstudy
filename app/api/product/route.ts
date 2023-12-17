import prisma from "@/app/lib/connect";

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify("success"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    console.log(name);
    if (!name) {
      return new Response(JSON.stringify("error"), { status: 400 });
    }

    await prisma.product.create({
      data: {
        name: name,
      },
    });
    return new Response(JSON.stringify("succeess"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
