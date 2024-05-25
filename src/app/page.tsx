"use client";
import { useState } from "react";
import PRODUCTS from "@/data/products";

function ProductCategoryRow({ category }: any) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

function ProductRow({ product }: any) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span className="text-red-800">{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products }: any) {
  const rows: any = [];
  let lastCategory: any = null;

  products.forEach((product: any) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
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

function SearchBar() {
  return (
    <form>
      <input type="string" placeholder="Search product" />
      <label>
        <input type="checkbox" /> Only show products in stock
      </label>
    </form>
  );
}

export default function FilterableProductTable() {
  return (
    <>
      <SearchBar />
      <ProductTable products={PRODUCTS} />
    </>
  );
}
