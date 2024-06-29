import React from 'react'

const CustomTrayForm = () => {
  return (
    <section className="flex justify-center items-center min-h-screen border border-solid border-black">
      <div className="bg-white bg-opacity-10 p-10 m-20 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Order Your Custom Tray</h2>
        <form className="space-y-4">
          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Additional Details</label>
            <textarea
              id="message"
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your custom message or design details"
            />
          </div>
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add to Cart
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CustomTrayForm
