interface ProductDetailsProps {
  product: any;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const handleDelete = async (id: string) => {
    await fetch(`/api/product?id=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };

  console.log(product);
  return (
    <div className="flex bg-neutral-800 p-1 rounded-md w-full items-center justify-around">
      <h1 key={product.id}>{product.name}</h1>
      <div className="flex flex-col gap-2 bg-blue-300 rounded-md p-2">
        {product.variants.map((item: any) => (
          <div key={item.id} className="bg-blue-500 p-2 rounded-md">
            <h1>{item.color.name}</h1>
            <h1>{item.size.name}</h1>
          </div>
        ))}
      </div>
      <button onClick={() => handleDelete(product.id)}>DELETE</button>
    </div>
  );
};
