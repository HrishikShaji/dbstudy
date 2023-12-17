import prisma from "@/app/lib/connect";

export async function GET(request: Request) {
  try {
    const data = await prisma.product.findMany({
      include: {
        sizes: true,
      },
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

const mapSizes = (sizeIds: string[]) => {
  return sizeIds.map((sizeId) => {
    return { size: { connect: { id: sizeId } } };
  });
};

export async function POST(request: Request) {
  try {
    const { name, sizeIds } = await request.json();

    const values = mapSizes(sizeIds);
    console.log(name, values);
    if (!name) {
      return new Response(JSON.stringify("error"), { status: 400 });
    }
    if (!sizeIds) {
      return new Response(JSON.stringify("error"), { status: 400 });
    }

    await prisma.product.create({
      data: {
        name: name,
        sizes: {
          create: values,
        },
      },
    });
    return new Response(JSON.stringify("succeess"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify("error"), { status: 400 });
    }

    const data = await prisma.product.deleteMany({
      where: {
        id: id,
      },
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
