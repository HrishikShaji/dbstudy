import prisma from "@/app/lib/connect";

export async function GET(request: Request) {
  try {
    const data = await prisma.product.findMany({
      include: {
        colors: { include: { color: true } },
        sizes: { include: { size: true } },
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

const mapColors = (colorIds: string[]) => {
  return colorIds.map((colorId) => {
    return { color: { connect: { id: colorId } } };
  });
};
// Usage
export async function POST(request: Request) {
  try {
    const { name, sizeIds, colorIds } = await request.json();

    if (!name) {
      return new Response(JSON.stringify("error"), { status: 400 });
    }
    if (!sizeIds) {
      return new Response(JSON.stringify("error"), { status: 400 });
    }
    if (!colorIds) {
      return new Response(JSON.stringify("error"), { status: 400 });
    }

    const sizes = mapSizes(sizeIds);
    const colors = mapColors(colorIds);
    console.log(sizes, colors);
    const product = await prisma.product.create({
      data: {
        name: name,
        sizes: {
          create: sizes,
        },
        colors: {
          create: colors,
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
