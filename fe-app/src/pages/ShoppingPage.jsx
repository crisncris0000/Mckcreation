import React, { useEffect, useMemo, useState } from "react";
import Products from "../components/Products";
import PageCounter from "../components/PageCounter"; // adjust path if needed
import { jwtDecode } from "jwt-decode";

const PAGE_SIZE = 10;
const ALL_CATEGORY_ID = 1;

const ShoppingPage = () => {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0); // total items matching filter
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  const [categoryId, setCategoryId] = useState(ALL_CATEGORY_ID);
  const [page, setPage] = useState(0);

  const jwt = localStorage.getItem("jwt");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const totalPages = useMemo(() => Math.ceil(count / PAGE_SIZE), [count]);

  // decode user once
  useEffect(() => {
    if (jwt) setUser(jwtDecode(jwt));
  }, [jwt]);

  // categories (load once)
  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_BASE_URL}/api/category/get-all`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => {
        if (err?.name !== "AbortError") console.log(err);
      });

    return () => controller.abort();
  }, [API_BASE_URL]);

  // items (load whenever page/category changes)
  useEffect(() => {
    const controller = new AbortController();

    const url = new URL(`${API_BASE_URL}/api/item/get-items`);
    url.searchParams.set("page", page);
    url.searchParams.set("size", PAGE_SIZE);
    url.searchParams.set("categoryId", categoryId);

    fetch(url.toString(), { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        
        console.log(data)

        setItems(data.itemList ?? []);
        setCount(data.count ?? 0);

        // Keep page valid if count shrinks (ex: admin deletes items)
        const newTotalPages = Math.ceil((data.count ?? 0) / PAGE_SIZE);
        if (newTotalPages === 0 && page !== 0) setPage(0);
        if (newTotalPages > 0 && page > newTotalPages - 1) setPage(newTotalPages - 1);
      })
      .catch((err) => {
        if (err?.name !== "AbortError") console.log(err);
      });

    return () => controller.abort();
  }, [API_BASE_URL, page, categoryId]);

  const handleCategoryChange = (newCategoryId) => {
    setCategoryId(newCategoryId);
    setPage(0); // reset paging when filter changes
  };

  return (
    <>
      <Products
        items={items}
        categories={categories}
        user={user}
        jwt={jwt}
        categoryId={categoryId}
        onCategoryChange={handleCategoryChange}
        count={count}
        page={page}
        pageSize={PAGE_SIZE}
      />

      <div className="mt-10 mb-8">
        <PageCounter page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </>
  );
};

export default ShoppingPage;
