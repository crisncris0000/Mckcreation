import React from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";

const Posts = ({ posts = [], canEdit = false, onDelete, onUpload }) => {
  return (
    <div className="bg-gradient-to-b from-pink-200 via-pink-100 to-white flex justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative p-6 rounded-3xl shadow-2xl transition transform hover:scale-105 hover:shadow-pink-300"
          >
            <img
              src={`data:${post.mimeType};base64,${post.imageData}`}
              alt="Post"
              className="w-full h-72 object-cover rounded-2xl border-4 border-pink-300"
            />

            {canEdit && (
              <button
                onClick={() => onDelete?.(post.id)}
                className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-md hover:bg-red-700 transition"
              >
                <FaTrashAlt />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Hidden file input */}
      {canEdit && (
        <>
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              onUpload?.(file);

              // allow uploading same file again
              e.target.value = "";
            }}
          />

          <button
            onClick={() => document.getElementById("fileInput")?.click()}
            className="fixed bottom-8 right-8 bg-pink-500 text-white p-5 rounded-full shadow-lg hover:bg-pink-700 transition transform hover:scale-110"
          >
            <FaPlus size={28} />
          </button>
        </>
      )}
    </div>
  );
};

export default Posts;
