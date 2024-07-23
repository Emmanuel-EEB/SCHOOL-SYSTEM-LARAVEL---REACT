import React from 'react'

export default function SpinerLoading() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  )
}
