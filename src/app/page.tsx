"use client";
import PRODUCTS from "@/data/products";
import { useState } from "react";

function ProductCategoryRow({ category }: { category: string }) {
  return (
    <tr>
      <th>{category}</th>
    </tr>
  );
}

function ProductRow({ product }: any) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span className="text-red-600">{product.name}</span>
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }: any) {
  let rows: any = [];
  let lastCategory: string | null = null;

  products.forEach((product: any) => {
    // if ()

    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow category={product.category} />);
    }

    rows.push(<ProductRow product={product} key={product.name} />);

    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: any) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search product"
        onChange={(e: any) => onFilterTextChange(e.target.value)}
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e: any) => onInStockOnlyChange(e.target.checked)}
          />
          Only show products in stock
        </label>
      </div>
    </div>
  );
}

function FilterableProductTable({ products }: any) {
  const [filterText, setFilterText] = useState<string>("");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
