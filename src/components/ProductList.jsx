import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import RestaurantService from "../api/RestaurantService";
import ProductCard from "./ProductCard";
import { AddProductCard } from "./AddProductCard";
import { EditProductCard } from "./EditProductCard";
import { Input } from "@headlessui/react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchProducts("", 0);
  }, []);

  const fetchProducts = async (query = "", page = 0) => {
    try {
      setLoading(true);

      let response;

      if (!query) {
        response = await RestaurantService.getProducts(page);
      } else {
        response = await RestaurantService.searchProduct(query);
      }

      console.log("getProducts response:", response.data);

      const { data } = response.data || {};
      const { content, totalPages, number } = data || {};

      let items = [];

      if (Array.isArray(content) && content.length > 0) {
        if (Array.isArray(content[0]?.stock)) {
          items = content.flatMap(r => r.stock || []);
        }
        else if (
          typeof content[0]?.id !== "undefined" &&
          typeof content[0]?.name !== "undefined" &&
          typeof content[0]?.price !== "undefined"
        ) {
          items = content;
        }
      }

      setProducts(items);
      setPageInfo({ page: number ?? 0, totalPages: totalPages ?? 0 });
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts(q.trim(), 0);
  };

  const createProduct = async (data) => {
    await RestaurantService.addProduct(data);
  };

  const handleEditClick = () => setShowUpdate(true);
  const handleEditCancel = () => setShowUpdate(false);
  const handleEditSuccess = async () => {
    await fetchProducts(pageInfo.page);
    setShowUpdate(false);
  }

  const handleAddClick = () => setShowAdd(true);
  const handleAddCancel = () => setShowAdd(false);
  const handleAddSuccess = async () => {
    await fetchProducts(pageInfo.page);
    setShowAdd(false);
  };

  const handleEditProduct = async (data) => {
    const { id, ...payload } = data;
    await RestaurantService.updateProduct(id, payload)
    fetchProducts(pageInfo.page);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await RestaurantService.deleteProduct(productId);
      fetchProducts(pageInfo.page);
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  return (
    <div className="p-4 px-6 py-3">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="mb-8"
      >
        <h1 className="text-white text-2xl font-semibold text-left">Meu cardápio</h1>

        <div className="flex items-left pt-4">
          <form className="flex items-left pt-4 gap-2" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              name="product_name"
              placeholder="Procurar item..."
              className="bg-[#2a2a31] text-white p-2 rounded-md outline-none focus:ring ring-[#F37359]"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-md bg-[#F37359] text-white hover:opacity-90 cursor-pointer"
            >
              Buscar
            </button>
          </form>
        </div>
      </motion.div>

      {loading ? (
        <p className="text-white">Carregando produtos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {!showAdd ? (
            <motion.button
              onClick={handleAddClick}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col cursor-pointer items-center justify-center gap-3 w-full h-48 rounded-xl bg-[#2a2a31] text-white hover:bg-[#F37359] transition-all duration-300 shadow-md hover:shadow-lg group"
            >
              <Plus size={32} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Adicionar produto</span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <AddProductCard
                onCancel={handleAddCancel}
                onSuccess={handleAddSuccess}
                createProduct={createProduct}
              />
            </motion.div>
          )}

          {/* Produtos */}
          {products.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 + index * 0.1 }}
            >
              {!showUpdate ? (
                <ProductCard
                  productId={p.id}
                  productName={p.name}
                  productImage={p.imageUrl}
                  productPrice={Number(p.price ?? 0)}
                  onDelete={() => handleDeleteProduct(p.id)}
                  onEdit={handleEditClick}
                />
              ) : (
                <EditProductCard
                  onCancel={handleEditCancel}
                  onSuccess={handleEditSuccess}
                  updateProduct={(data) => handleEditProduct(data)}
                  initialProduct={p}
                />
              )}
            </motion.div>
          ))}

        </div>
      )}
    </div>
  );
}

export default ProductList;
