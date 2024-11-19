import ButtonLink from "@/Components/ButtonLink";
import Typography from "@/Components/Typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/Lib/utils";
import { CategoryType } from "@/types/entities/category";
import { ProductType } from "@/types/entities/product";
import { Link } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { MapPin, Plus, Search, XCircle } from "lucide-react";
import * as React from "react";
import PopupFilter, { PopupFilterProps } from "./Components/PopupFilter";
import Badge from "@/Components/Badge";
import AdminLayout from "@/Layouts/AdminLayout";

type CategoryFilter = {
  category: string[];
};

const ProductIndex = ({
  product,
  category,
}: {
  product: ProductType[];
  category: CategoryType[];
}) => {
  const [filter, setFilter] = React.useState<string>("");
  const [filterQuery, setFilterQuery] = React.useState<CategoryFilter>({
    category: [],
  });

  const filterOption: PopupFilterProps<CategoryFilter>["filterOption"] =
    React.useMemo(
      () => [
        {
          id: "category",
          name: "Category",
          options: category,
        },
      ],
      [],
    );

  const productList = product.filter((p) => {
    const matchesText = p.name.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory =
      filterQuery.category.length === 0 ||
      p.category.some((c) => filterQuery.category.includes(c.id.toString()));
    return matchesText && matchesCategory;
  });

  return (
    <AdminLayout>
      <Head title="All Product" />
      <div className="px-10 md:px-20 py-8 flex flex-col gap-4">
        <Typography variant="h1" className="font-semibold">
          All Product
        </Typography>
        <div className="flex justify-between mt-6">
          <div className="relative mt-1 self-start">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="text-xl text-typo" />
            </div>
            <input
              type="text"
              value={filter ?? ""}
              onChange={(e) => {
                setFilter(String(e.target.value));
              }}
              className={cn(
                "flex w-full rounded-lg shadow-sm",
                "min-h-[2.25rem] py-0 px-10 md:min-h-[2.5rem]",
                "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
              )}
              placeholder="Search..."
            />
            {filter !== "" && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <button
                  type="button"
                  onClick={() => setFilter("")}
                  className="p-1"
                >
                  <XCircle className="text-xl text-typo-icons" />
                </button>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <PopupFilter
              filterOption={filterOption}
              setFilterQuery={setFilterQuery}
            />
            <ButtonLink
              href={route("admin.product.create")}
              openNewTab={false}
              leftIcon={Plus}
            >
              Add Product
            </ButtonLink>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {productList.map((p) => (
            <Link
              href={route("admin.product.show", p.id)}
              key={p.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-1"
            >
              <img
                src={`/storage/${p.image_url}`}
                alt={p.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
             <Typography
                variant="h2"
                className="text-lg font-bold text-primary-500"
              >
                {p.name}
              </Typography>
              <Typography variant="s3" className="text-gray-600">
                {p.description}
              </Typography>
              <Typography variant="s1" className="">
                Rp{p.price}
              </Typography>
              <Typography variant="b1">Stock: {p.stock}</Typography>
              <div className="flex gap-2 items-center w-full">
                <MapPin width="20px" height="20px" />
                <Typography variant="b1">{p.city}</Typography>
              </div>
              <div className="flex">
                <Badge>
                  {p.category.map((category) => category.name).join(", ")}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductIndex;