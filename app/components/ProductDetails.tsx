import { ProductChild } from "../page";

interface ProductDetailsProps {
  product: ProductChild;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const handleDelete = async (id: string) => {
    await fetch(`/api/product?id=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };
  return (
    <div className="flex bg-neutral-800 p-1 rounded-md w-full items-center justify-around">
      <h1 key={product.id}>{product.name}</h1>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {product.sizes.map((size) => (
            <h1 key={size.id}>{size.size.name}</h1>
          ))}
        </div>
      </div>
      <div className="">
        {product.colors.map((color) => (
          <div key={color.id} className="flex flex-col items-center">
            <h1 key={color.id}>{color.color.name}</h1>
            <div className="flex gap-1">
              {color.images.map((image, i) => (
                <h1 key={i} className="p-3 rounded-md bg-blue-500">
                  {image}
                </h1>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => handleDelete(product.id)}>DELETE</button>
    </div>
  );
};
