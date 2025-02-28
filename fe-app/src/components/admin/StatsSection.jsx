import React from 'react'

const StatsSection = ({totalIncome, popularItems, users}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-xl font-semibold">Total Income</h2>
                <p className="text-3xl font-bold">${totalIncome}</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow-lg text-white hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-xl font-semibold">Total Users</h2>
                <p className="text-3xl font-bold">
                    {
                    users.length
                }</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-xl font-semibold">Popular Items</h2>
                <ul> {
                    popularItems.map((item) => (
                        <li key={
                                item.id
                            }
                            className="text-sm">
                            {
                            item.name
                        }
                            - {
                            item.sales
                        }
                            sales
                        </li>
                    ))
                } </ul>
            </div>
        </div>
    )
}

export default StatsSection
