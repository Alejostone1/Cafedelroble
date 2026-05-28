"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteProductButtonProps {
  id: string;
  name: string;
}

export function DeleteProductButton({ id, name }: DeleteProductButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`¿Estás seguro de eliminar "${name}"?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/productos/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Producto eliminado");
        router.refresh();
      } else {
        toast.error("Error al eliminar");
      }
    } catch {
      toast.error("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-stone-300 hover:text-red-500 transition-colors disabled:opacity-50"
      title="Eliminar producto"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
