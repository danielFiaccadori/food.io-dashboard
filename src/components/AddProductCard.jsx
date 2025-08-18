import { useState } from "react";
import { Button } from "@headlessui/react";

export function AddProductCard({ onCancel, onSuccess, createProduct }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const priceNumber = Number(
      (form.price ?? "").toString().replace(",", ".")
    );
    if (!form.name || isNaN(priceNumber) || priceNumber <= 0) return;

    try {
      setSubmitting(true);
      await createProduct({
        name: form.name.trim(),
        description: form.description?.trim() || undefined,
        imageUrl: form.imageUrl?.trim() || undefined,
        price: priceNumber,
      });
      onSuccess();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1e1e24] border-border rounded-xl shadow-md w-full text-white">
      <div className="p-4">
        <div className="text-lg font-semibold text-delivery-text">
          Adicionar produto
        </div>
      </div>

      <div className="p-4 pt-0">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              name="name"
              placeholder="Nome"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md bg-[#22212b] px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Descrição"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-md bg-[#22212b] px-3 py-2 text-sm min-h-20"
            />
          </div>

          <div>
            <input
              name="imageUrl"
              placeholder="URL da imagem"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full rounded-md bg-[#22212b] px-3 py-2 text-sm"
            />
          </div>

          <div>
            <input
              name="price"
              type="text"
              inputMode="decimal"
              placeholder="Preço (ex: 29,90)"
              value={form.price}
              onChange={handleChange}
              className="w-full rounded-md bg-[#22212b] px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="flex-1 gap-2 pt-1 justify-items-center">
            <Button type="submit" disabled={submitting} className="p-2 mx-5 bg-[#22212b] rounded-xl hover:bg-green-800 transition">
              {submitting ? "Salvando..." : "Salvar"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={submitting}
              className="p-2 mx-5 bg-[#22212b] rounded-xl hover:bg-red-800 transition"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
