import React from 'react'

const OrderStatus = ({ status }) => {
   
    return (
        <div>
            <div className={`
                ${
                    status === 'pending'
                    ? 
                        'bg-yellow-100 text-yellow-500'
                    : 
                    status === 'delivered'
                    ?
                        'bg-green-100 text-green-500'
                    : 
                    status === 'failed'
                    ? 
                        'bg-red-100 text-red-500'
                    : 
                    status === 'confirmed'
                    ? 
                        'bg-purple-100 text-purple-500'
                    : 
                    status === 'out for delivery'
                    ? 
                        'bg-blue-100 text-blue-500'
                    : 
                    status === 'returned'
                    ? 
                        'bg-orange-100 text-orange-500'
                    : 
                    status === 'returned'
                    ? 
                        'bg-gray-100 text-gray-500'
                    : 
                        ''
            
                }
                text-xs px-2 rounded-md flex items-center gap-2 py-1 font-medium w-fit capitalize`}>
                <p className={`
                ${
                    status === 'pending'
                    ? 
                        'bg-yellow-500'
                    : 
                    status === 'delivered'
                    ?
                        'bg-green-500'
                    : 
                    status === 'failed'
                    ? 
                        'bg-red-500'
                    : 
                    status === 'confirmed'
                    ? 
                        'bg-purple-500'
                    : 
                    status === 'out for delivery'
                    ? 
                        'bg-blue-500'
                    : 
                    status === 'returned'
                    ? 
                        'bg-orange-500'
                    : 
                    status === 'cancelled'
                    ? 
                        'bg-gray-500'
                    : 
                        ''
                }
                w-2 h-2 rounded-full
                `}></p>
                <span>
                    {status}
                </span>
            </div>
        </div>
    )
}

export default OrderStatus