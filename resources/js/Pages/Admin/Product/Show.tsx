import Badge from "@/Components/Badge";
import Button from "@/Components/Button";
import ButtonLink from "@/Components/ButtonLink";
import Input from "@/Components/Forms/Input";
import IconButton from "@/Components/IconButton";
import Typography from "@/Components/Typography";
import AdminLayout from "@/Layouts/AdminLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ProductType } from "@/types/entities/product";
import { Inertia } from "@inertiajs/inertia";
import { Head, useForm as useFormInertia } from "@inertiajs/react";
import { ArrowLeft, MapPin, ShoppingCart } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  product_id: string;
  quantity: number;
};

export default function Show({ product }: { product: ProductType }) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      Inertia.delete(`/admin/product/${product.id}/delete`, {
        onSuccess: () => toast.success("Product has been deleted."),
        onError: () => toast.error("Error deleting product."),
      });
    }
  };

  const methods = useForm<FormData>({
    mode: "onTouched",
  });

  const { handleSubmit, reset, getValues } = methods;

  const { post, processing, transform } = useFormInertia<FormData>({
    product_id: product.id,
    quantity: 0,
  });

  transform((data) => ({
    ...data,
    ...getValues(),
  }));

  const onSubmit: SubmitHandler<FormData> = () => {
    post(route("cart.add", product.id), {
      onFinish: () => reset(),
    });
  };

  return (
    <AdminLayout>
      <Head title="Detail Product" />
      <div className="px-10 md:px-10 py-8">
        <div>
          <ButtonLink href="/admin/product" leftIcon={ArrowLeft}>
            Back
          </ButtonLink>
        </div>
        <div className="flex flex-col justify-center items-center mt-4">
          <div className="flex flex-col md:flex-row gap-2 items-center w-full">
            <div className="flex justify-center items-center">
              <img
                src={`/storage/${product.image_url}`}
                alt={product.name}
                className="w-1/2"
              />
            </div>
            <div className="bg-white rounded-lg p-8 flex flex-col gap-1 w-full">
              <div className="w-full">
                <Typography variant="j2" className="text-primary-500">
                  {product.name}
                </Typography>
              </div>
              <div className="w-full">
                <Typography variant="s1">Rp{product.price}</Typography>
              </div>
              <div className="w-full">
                <Typography variant="b1" className="text-neutral-400">
                  {product.description}
                </Typography>
              </div>
              <div className="w-full">
                <Typography variant="b1">Stock: {product.stock}</Typography>
              </div>
              <div className="flex gap-2 items-center w-full">
                <MapPin width="20px" height="20px" />
                <Typography variant="b1">{product.city}</Typography>
              </div>
              <div className="flex">
                <Badge>
                  {product.category.map((category) => category.name).join(", ")}
                </Badge>
              </div>
              <div className="mt-4 flex items-center flex-row gap-2">
                <ButtonLink
                  href={route("admin.product.edit", product.id)}
                  openNewTab={false}
                  className="flex w-full"
                >
                  Edit
                </ButtonLink>
                <Button onClick={handleDelete} className="flex w-full" variant="outline">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}