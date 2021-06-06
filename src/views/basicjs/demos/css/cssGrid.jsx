import React from 'react'
import './css.css'
export default function CssGridPage() {
  return (
    <div >
      <h2>basic</h2>
      <div className='container layout-1'>
        <div className='col'>1</div>
        <div className='col'>2</div>
        <div className='col'>3</div>
        <div className='col'>4</div>
        <div className='col'>5</div>
        <div className='col'>6</div>
      </div>

      <h2>不等分</h2>
      <div className='container layout-2'>
        <div className='col one'>1</div>
        <div className='col two'>2</div>
        <div className='col three'>3</div>
        <div className='col four'>4</div>
      </div>

      <h2>布局</h2>
      <div className="container holy">
        <nav>NavBar</nav>
        <main>
          <div className="lef">Left siderbar</div>
          <div className="mian">Main content</div>
          <div className="right">right siderbar</div>
        </main>
        <footer>footer</footer>
      </div>
    </div>
  )
}