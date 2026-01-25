import React, { useEffect, useState } from "react";
import Products from "../components/Products";
import { jwtDecode } from "jwt-decode";

const ShoppingPage = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  const jwt = localStorage.getItem("jwt");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const [itemsRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/item/get-all`, { signal: controller.signal }),
          fetch(`${API_BASE_URL}/api/category/get-all`, { signal: controller.signal }),
        ]);

        const [itemsData, categoriesData] = await Promise.all([
          itemsRes.json(),
          categoriesRes.json(),
        ]);

        setItems(itemsData);
        setCategories(categoriesData);

        if (jwt) setUser(jwtDecode(jwt));
      } catch (err) {
        if (err?.name !== "AbortError") console.log(err);
      }
    };

    load();

    return () => controller.abort();
  }, [API_BASE_URL, jwt]);

  return <Products items={items} categories={categories} user={user} jwt={jwt} />;
};

export default ShoppingPage;
