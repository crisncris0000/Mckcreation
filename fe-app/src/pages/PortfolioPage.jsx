import React, { useEffect, useMemo, useState } from "react";
import Posts from "../components/Posts";
import PageCounter from "../components/PageCounter"; // adjust path
import { jwtDecode } from "jwt-decode";

const PAGE_SIZE = 10;

const PortfolioPage = () => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0); // total posts
  const [page, setPage] = useState(0);

  const [user, setUser] = useState(null);
  const jwt = localStorage.getItem("jwt");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const canEdit = useMemo(() => !!jwt && user?.role === "ROLE_ADMIN", [jwt, user]);
  const totalPages = useMemo(() => Math.ceil(count / PAGE_SIZE), [count]);

  // decode user once
  useEffect(() => {
    if (jwt) setUser(jwtDecode(jwt));
  }, [jwt]);

  // fetch posts whenever page changes
  useEffect(() => {
    const controller = new AbortController();

    const url = new URL(`${API_BASE_URL}/api/post/get-posts`);
    url.searchParams.set("page", page);
    url.searchParams.set("size", PAGE_SIZE);

    fetch(url.toString(), { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        // 🔧 CHANGE THIS LINE if your backend uses a different list key:
        // examples: data.postList, data.items, data.orderList, etc.
        setPosts(data.posts ?? data.postList ?? []);
        setCount(data.count ?? 0);

        // keep page valid if count changes (ex: after deletions)
        const newTotalPages = Math.ceil((data.count ?? 0) / PAGE_SIZE);
        if (newTotalPages === 0 && page !== 0) setPage(0);
        if (newTotalPages > 0 && page > newTotalPages - 1) setPage(newTotalPages - 1);
      })
      .catch((err) => {
        if (err?.name !== "AbortError") console.error("Fetch error:", err);
      });

    return () => controller.abort();
  }, [API_BASE_URL, page]);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/post/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${jwt}` },
      });

      // Optimistic update: remove from current page
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setCount((prev) => Math.max(0, prev - 1));

      // If that delete made the page empty and we're not on page 0, go back a page
      if (posts.length === 1 && page > 0) setPage(page - 1);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("imageData", file);
      formData.append("mimeType", file.type);

      const res = await fetch(`${API_BASE_URL}/api/post/create`, {
        method: "POST",
        headers: { Authorization: `Bearer ${jwt}` },
        body: formData,
      });

      await res.json();

      // After upload, best UX is jump to page 0 and refetch
      setPage(0);
      // count will update on refetch
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  return (
    <>
      <Posts posts={posts} canEdit={canEdit} onDelete={handleDelete} onUpload={handleUpload} />

      <div className="mt-10 mb-8">
        <PageCounter page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </>
  );
};

export default PortfolioPage;
