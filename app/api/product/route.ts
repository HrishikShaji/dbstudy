import prisma from "@/app/lib/connect";

export async function GET(request: Request) {
  try {
    const data = await prisma.product.findMany({
      include: {
        colors: true,
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
    const { name, sizeIds, colorIds, images, newColors } = await request.json();

    if (!name || !sizeIds || !colorIds || !newColors) {
      return new Response(JSON.stringify("error"), { status: 400 });
    }

    const sizes = mapSizes(sizeIds);
    const colors = mapColors(newColors);

    const product = await prisma.product.create({
      data: {
        name: name,
        colors: {
          connect: { id: 1 },
        },
        sizes: {
          connect: { id: 1 },
        },
      },
    });

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
