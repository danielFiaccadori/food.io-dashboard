import { Trash, Edit } from "lucide-react";

function ProductCard({
  productId,
  productName,
  productImage,
  productPrice,
  onDelete,
  onEdit
}) {
  return (
    <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-lg group">
      <img
        src={productImage}
        alt={productName}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity p-2">
        <button
          onClick={() => onEdit(productId)}
          className="p-2 hover:bg-[#2a2a31] rounded-full shadow-md transition"
        >
          <Edit size={20} className="text-green-400" />
        </button>
        <button
          onClick={() => onDelete(productId)}
          className="p-2 hover:bg-[#2a2a31]  rounded-full shadow-md transition"
        >
          <Trash size={20} className="text-red-400" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-4 text-white">
        <p className="text-lg font-bold">{productName}</p>
        <p className="text-sm font-semibold">
          R$ {Number(productPrice ?? 0).toFixed(2).replace(".", ",")}
        </p>

      </div>
    </div>
  );
}

export default ProductCard;
