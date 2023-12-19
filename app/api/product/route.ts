import prisma from "@/app/lib/connect";

export async function GET(request: Request) {
  try {
    const data = await prisma.product.findMany({
      include: {
        variants: {
          include: {
            size: true,
            color: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

const mapSizes = (sizeIds: string[]) => {
  return sizeIds.map((sizeId) => {
    return { size: { connect: { id: Number(sizeId) } } };
  });
};

const mapColors = (values: Record<string, any>[]) => {
  return values.map((value) => {
    return {
      color: { connect: { id: Number(value.id) } },
      images: value.images,
    };
  });
};
// Usage
export async function POST(request: Request) {
  try {
    const { name, variants } = await request.json();

    if (!name || !variants) {
      return new Response(JSON.stringify("error"), { status: 400 });
    }
    console.log(name, variants);

    const product = await prisma.product.create({
      data: {
        name: name,
        variants: {
          create: variants,
        },
      },
    });

    console.log(product);

    return new Response(JSON.stringify("succeess"), { status: 200 });
  } catch (error: any) {
    console.log("error is", error);
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
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
    console.log(error);
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
