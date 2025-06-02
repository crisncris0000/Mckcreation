import React, { useEffect, useState } from 'react';

const Admin = ({ jwt} ) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/category/get-all');
      const data = await res.json();
      const filtered = data.filter(cat => cat.name !== 'All');
      setCategories(filtered);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      await fetch('http://localhost:8080/api/category/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({ name: newCategory.trim() }),
      });
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    try {
      await fetch(`http://localhost:8080/api/categories/${selectedCategory}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${jwt}`,
        }
      });
      setSelectedCategory('');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-md border border-pink-200">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Admin Panel</h2>

        {/* Create Category */}
        <form onSubmit={handleCreateCategory} className="mb-8">
          <label className="block text-pink-700 font-medium mb-1">Create New Category</label>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="e.g. Skincare"
          />
          <button
            type="submit"
            className="mt-3 w-full bg-pink-500 text-white py-2 rounded-full font-semibold hover:bg-pink-600 transition"
          >
            Create
          </button>
        </form>

        {/* Delete Category */}
        <div>
          <label className="block text-pink-700 font-medium mb-1">Delete Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-3"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleDeleteCategory}
            className="w-full bg-red-400 text-white py-2 rounded-full font-semibold hover:bg-red-500 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
