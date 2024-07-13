import React from 'react'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='p-5' >
      { children }
    </main>
  )
}

export default Wrapper
