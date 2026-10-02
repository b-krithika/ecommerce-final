import { useState } from 'react'

function App() {
  const [step, setStep] = useState('login')
  const [cartItems, setCartItems] = useState([])
  const [user, setUser] = useState({ name: '', email: '', phone: '' })
  const [loginForm, setLoginForm] = useState({ name: '', email: '', phone: '' })
  const [address, setAddress] = useState({ fullAddress: '', pincode: '', city: '' })
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [orderId, setOrderId] = useState('')
  const [orderDate, setOrderDate] = useState('')
  const [search, setSearch] = useState('')
  const [showHighlights, setShowHighlights] = useState(false)

  const products = [
    { id: 1, name: 'iPhone 15', price: 70000, rating: 4.8, reviews: 124, image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400', desc: 'A16 Bionic, 48MP Camera, 128GB storage, 1 year warranty.' },
    { id: 2, name: 'Samsung S24 Ultra', price: 120000, rating: 4.7, reviews: 98, image: 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=400', desc: '200MP Camera, S Pen, Snapdragon 8 Gen 3.' },
    { id: 3, name: 'MacBook Air M2', price: 95000, rating: 4.9, reviews: 210, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', desc: 'M2 chip, 13.6 inch Liquid Retina display.' },
    { id: 4, name: 'Sony Headphones', price: 29900, rating: 4.5, reviews: 76, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400', desc: 'WH-1000XM5 Noise Cancelling 30hr battery.' },
    { id: 5, name: 'Apple Watch S9', price: 41000, rating: 4.6, reviews: 54, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400', desc: 'S9 chip, Always-On Retina display.' },
    { id: 6, name: 'Nike Air Shoes', price: 7999, rating: 4.0, reviews: 9, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', desc: 'Breathable mesh, lightweight cushioning for daily wear.' },
    { id: 7, name: 'Levis Jeans', price: 2499, rating: 4.2, reviews: 32, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', desc: 'Levis 511 slim fit stretch denim.' },
    { id: 8, name: 'T-Shirt Combo', price: 999, rating: 4.1, reviews: 18, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', desc: 'Pack of 3 premium cotton t-shirts.' },
    { id: 9, name: 'Handbag for Women', price: 1999, rating: 4.3, reviews: 25, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', desc: 'Premium leather handbag with compartments.' },
    { id: 10, name: 'Canon DSLR Camera', price: 55000, rating: 4.8, reviews: 67, image: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=400', desc: 'Canon EOS 24.1MP with 18-55mm lens.' },
    { id: 11, name: 'Boat Smartwatch', price: 2500, rating: 4.0, reviews: 112, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400', desc: '1.69 inch display with Alexa built-in.' },
    { id: 12, name: 'Perfume Collection', price: 599, rating: 4.2, reviews: 41, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400', desc: 'Wild Stone long lasting fragrance.' },
    { id: 13, name: 'Mixer Grinder', price: 3200, rating: 4.4, reviews: 29, image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400', desc: '500W mixer grinder with 3 jars.' },
    { id: 14, name: 'Gaming Mouse RGB', price: 1499, rating: 4.5, reviews: 88, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400', desc: 'RGB gaming mouse 7200 DPI.' },
    { id: 15, name: 'Backpack Bag', price: 1299, rating: 4.3, reviews: 37, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', desc: 'Waterproof backpack with laptop compartment.' },
  ]

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  const total = cartItems.reduce((a, b) => a + b.price * b.qty, 0)
  const totalQty = cartItems.reduce((a, b) => a + b.qty, 0)
  const isInCart = (id) => cartItems.find(item => item.id === id)
  const addToCart = (p) => { const ex = isInCart(p.id); if(ex) setCartItems(cartItems.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i)); else setCartItems([...cartItems,{...p,qty:1}]) }
  const inc = (id) => setCartItems(cartItems.map(i => i.id === id ? {...i, qty: i.qty+1} : i))
  const dec = (id) => setCartItems(cartItems.map(i => i.id === id && i.qty > 1 ? {...i, qty: i.qty-1} : i))
  const remove = (id) => setCartItems(cartItems.filter(i => i.id !== id))
  const placeOrder = () => { const now = new Date(); setOrderDate(now.toLocaleString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric',hour:'2-digit',minute:'2-digit'})); setOrderId('ORD-'+Math.floor(100000+Math.random()*900000)); setStep('orderSuccess') }
  const deliveryDate = new Date(Date.now()+3*24*60*60*1000).toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'})

  return (
    <div style={{ fontFamily: 'Arial', background: '#f5f5f5', minHeight: '100vh' }}>
      
      {step === 'login' && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundImage: `linear-gradient(rgba(2,10,31,0.85), rgba(2,10,31,0.85)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200')`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '8%', left: '10%', fontSize: '90px', opacity: 0.9 }}>🛍️</div>
          <div style={{ position: 'absolute', top: '15%', right: '12%', fontSize: '80px', opacity: 0.9 }}>🛒</div>
          <div style={{ position: 'absolute', bottom: '12%', left: '15%', fontSize: '85px', opacity: 0.9 }}>🎁</div>
          <div style={{ position: 'absolute', bottom: '18%', right: '14%', fontSize: '75px', opacity: 0.9 }}>👗</div>
          <div style={{ padding: '35px', width: '380px', background: 'white', borderRadius: '15px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', zIndex: 5 }}>
            <h2 style={{ textAlign: 'center', color: '#020a1f', margin: 0 }}>🛍️ KrithiStore</h2>
            <div style={{ height: '20px' }}></div>
            <input placeholder="Full Name" value={loginForm.name} onChange={e=>setLoginForm({...loginForm,name:e.target.value})} style={{ width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
            <input placeholder="Email" value={loginForm.email} onChange={e=>setLoginForm({...loginForm,email:e.target.value})} style={{ width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
            <input placeholder="Phone" value={loginForm.phone} onChange={e=>setLoginForm({...loginForm,phone:e.target.value})} style={{ width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
            <button onClick={()=>{ if(!loginForm.name||!loginForm.email||!loginForm.phone) alert('Fill all!'); else {setUser(loginForm); setStep('products')}}} style={{ width: '100%', padding: '13px', background: '#020a1f', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>Login to Shop</button>
          </div>
        </div>
      )}

      {step === 'products' && (
        <div>
          <div style={{ background: '#020a1f', color: 'white', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, gap: '10px' }}>
            <h3 style={{ margin: 0 }}>KrithiStore 🛍️</h3>
            <input placeholder="🔍 Search..." value={search} onChange={e=>setSearch(e.target.value)} style={{ flex: 1, maxWidth: '400px', padding: '8px 15px', borderRadius: '20px', border: 'none', outline: 'none' }} />
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <span>Hi, {user.name}</span>
              <span style={{ background: 'white', color: '#020a1f', padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold' }}>Cart: {totalQty}</span>
              <button onClick={()=>{setCartItems([]); setStep('login')}} style={{ padding: '6px 12px', borderRadius: '5px' }}>Logout</button>
            </div>
          </div>
          <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
            {filtered.map(p=>(
              <div key={p.id} style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '12px', background: 'white', textAlign: 'center' }}>
                <div onClick={()=>{setSelectedProduct(p); setStep('single')}} style={{ cursor: 'pointer' }}>
                  <img src={p.image} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} />
                  <h4 style={{ margin: '10px 0 5px' }}>{p.name}</h4>
                  <p style={{ color: '#0066ff', fontWeight: 'bold', margin: '5px 0' }}>₹{p.price}</p>
                  {/* RATING ADDED IN LIST */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', margin: '6px 0' }}>
                    <span style={{ background: '#038d63', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>{p.rating} ★</span>
                    <span style={{ color: '#888', fontSize: '12px' }}>({p.reviews})</span>
                  </div>
                  <p style={{ color: '#038d63', fontSize: '12px', margin: 0 }}>Free Delivery</p>
                </div>
                {isInCart(p.id) ? (
                  <div style={{ display: 'flex', gap: '5px', marginTop: '8px' }}>
                    <button onClick={()=>dec(p.id)} style={{ flex: 1, padding: '10px', background: '#eee', border: '1px solid #ccc', borderRadius: '20px', fontWeight: 'bold' }}>-</button>
                    <button onClick={()=>setStep('cart')} style={{ flex: 2, background: '#00a000', color: 'white', padding: '10px', border: 'none', borderRadius: '20px', fontWeight: 'bold' }}>{isInCart(p.id).qty} in Cart</button>
                    <button onClick={()=>inc(p.id)} style={{ flex: 1, padding: '10px', background: '#eee', border: '1px solid #ccc', borderRadius: '20px', fontWeight: 'bold' }}>+</button>
                  </div>
                ) : (
                  <button onClick={()=>addToCart(p)} style={{ background: '#020a1f', color: 'white', padding: '10px', border: 'none', borderRadius: '20px', width: '100%', fontWeight: 'bold', marginTop: '8px' }}>Add to Cart</button>
                )}
              </div>
            ))}
          </div>
          <button onClick={()=>setStep('cart')} style={{ position: 'fixed', bottom: '20px', right: '20px', padding: '15px 25px', background: '#00a000', color: 'white', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>🛒 Cart ({totalQty}) - ₹{total}</button>
        </div>
      )}

      {step === 'single' && selectedProduct && (
        <div style={{ background: 'white', minHeight: '100vh', maxWidth: '600px', margin: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px', borderBottom: '1px solid #eee', position: 'sticky', top: 0, background: 'white', zIndex: 10 }}>
            <button onClick={()=>setStep('products')} style={{ border: 'none', background: 'none', fontSize: '22px', marginRight: '15px', cursor: 'pointer' }}>← Back</button>
            <span style={{ fontWeight: 'bold' }}>{selectedProduct.name}</span>
          </div>
          <img src={selectedProduct.image} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
          <div style={{ padding: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '26px', fontWeight: 'bold' }}>₹{selectedProduct.price}</span>
              <span style={{ width: '20px', height: '20px', border: '1px solid #888', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#888' }}>i</span>
            </div>
            <div style={{ color: '#038d63', fontWeight: 'bold', marginTop: '6px' }}>₹{Math.floor(selectedProduct.price*0.85)} with 2 Special Offers ›</div>
            {/* RATING LIKE YOUR PHOTO */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
              <div style={{ background: '#038d63', color: 'white', padding: '4px 10px', borderRadius: '15px', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>{selectedProduct.rating} ★</div>
              <span style={{ color: '#888', fontSize: '14px' }}>({selectedProduct.reviews})</span>
            </div>
          </div>
          <div style={{ background: '#fdeaf2', padding: '12px' }}>
            <div style={{ background: 'white', borderRadius: '10px', padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ textAlign: 'center', flex: 1 }}><div>📦</div><div style={{ fontSize: '12px', fontWeight: 'bold' }}>7 Days<br/>Easy Return</div></div>
              <div style={{ textAlign: 'center', flex: 1 }}><div>💰</div><div style={{ fontSize: '12px', fontWeight: 'bold' }}>Cash on<br/>Delivery</div></div>
              <div style={{ textAlign: 'center', flex: 1 }}><div>🏷️</div><div style={{ fontSize: '12px', fontWeight: 'bold' }}>Lowest<br/>Price</div></div>
            </div>
          </div>
          <div style={{ marginTop: '8px' }}>
            <div onClick={()=>setShowHighlights(!showHighlights)} style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', borderTop: '8px solid #f5f5f5', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Product Highlights</span>
              <span>{showHighlights ? '▲' : '▼'}</span>
            </div>
            {showHighlights && (
              <div style={{ padding: '0 16px 16px', fontSize: '14px', color: '#555', lineHeight: '22px' }}>
                <p><b>Rating:</b> {selectedProduct.rating} ★ ({selectedProduct.reviews} reviews)</p>
                <p><b>Name:</b> {selectedProduct.name}</p>
                <p><b>Description:</b> {selectedProduct.desc}</p>
                <p><b>Delivery by:</b> {deliveryDate}</p>
                <p><b>Return:</b> 7 Days Easy Return</p>
              </div>
            )}
          </div>
          <div style={{ height: '80px' }}></div>
          <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '600px', padding: '10px', background: 'white', borderTop: '1px solid #ddd', display: 'flex', gap: '10px' }}>
            {isInCart(selectedProduct.id) ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #020a1f', borderRadius: '8px', padding: '0 10px' }}>
                  <button onClick={()=>dec(selectedProduct.id)} style={{ border: 'none', background: 'none', padding: '10px', fontSize: '18px' }}>-</button>
                  <span style={{ fontWeight: 'bold', padding: '0 10px' }}>{isInCart(selectedProduct.id).qty}</span>
                  <button onClick={()=>inc(selectedProduct.id)} style={{ border: 'none', background: 'none', padding: '10px', fontSize: '18px' }}>+</button>
                </div>
                <button onClick={()=>setStep('cart')} style={{ flex: 1, background: '#020a1f', color: 'white', border: 'none', borderRadius: '8px', padding: '14px', fontWeight: 'bold' }}>Go to Cart ₹{isInCart(selectedProduct.id).price * isInCart(selectedProduct.id).qty}</button>
              </>
            ) : (
              <button onClick={()=>{addToCart(selectedProduct); setStep('cart')}} style={{ width: '100%', background: '#020a1f', color: 'white', border: 'none', borderRadius: '8px', padding: '14px', fontWeight: 'bold', fontSize: '16px' }}>Buy at ₹{selectedProduct.price}</button>
            )}
          </div>
        </div>
      )}

      {step === 'cart' && (
        <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
          <button onClick={()=>setStep('products')} style={{ padding: '8px 15px', marginBottom: '15px' }}>← Continue Shopping</button>
          <div style={{ background: 'white', padding: '25px', borderRadius: '12px' }}>
            <h3>🛒 Cart ({totalQty} items) | Today: {new Date().toLocaleDateString('en-IN')}</h3>
            {cartItems.map(item=>(
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #eee', margin: '10px 0', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={item.image} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div><b>{item.name}</b><br/><span style={{ background: '#038d63', color: 'white', padding: '1px 6px', borderRadius: '10px', fontSize: '11px' }}>{item.rating} ★</span><br/><span style={{ color: '#0066ff' }}>₹{item.price} x {item.qty} = ₹{item.price * item.qty}</span></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={()=>dec(item.id)}>-</button>
                  <span style={{ fontWeight: 'bold' }}>{item.qty}</span>
                  <button onClick={()=>inc(item.id)}>+</button>
                  <button onClick={()=>remove(item.id)} style={{ marginLeft: '10px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '5px', padding: '6px 10px' }}>X</button>
                </div>
              </div>
            ))}
            <h3>Total: ₹{total}</h3>
            <p style={{ color: '#00a000' }}>Delivery by: {deliveryDate}</p>
            {cartItems.length>0 && <button onClick={()=>setStep('address')} style={{ padding: '14px', background: '#ff9f00', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', width: '100%' }}>Place Order - ₹{total}</button>}
          </div>
        </div>
      )}

      {step === 'address' && (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
          <div style={{ background: 'white', padding: '25px', borderRadius: '12px' }}>
            <h3>Delivery Address</h3>
            <textarea placeholder="Full Address" value={address.fullAddress} onChange={e=>setAddress({...address,fullAddress:e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', boxSizing: 'border-box' }}></textarea><br/><br/>
            <input placeholder="Pincode" value={address.pincode} onChange={e=>setAddress({...address,pincode:e.target.value})} style={{ padding: '10px', width: '48%', marginRight: '4%', borderRadius: '6px', border: '1px solid #ccc' }} />
            <input placeholder="City" value={address.city} onChange={e=>setAddress({...address,city:e.target.value})} style={{ padding: '10px', width: '48%', borderRadius: '6px', border: '1px solid #ccc' }} />
            <div style={{ border: "1px solid #ddd", padding: "15px", margin: "20px 0", background: "#f7f7f7", borderRadius: '6px' }}>
              <h4>Total: ₹{total} | Delivery: {deliveryDate}</h4>
              <p><input type="radio" name="pay" defaultChecked onChange={()=>setPaymentMethod('COD')} /> Cash on Delivery</p>
              <p><input type="radio" name="pay" onChange={()=>setPaymentMethod('UPI')} /> UPI</p>
              <p><input type="radio" name="pay" onChange={()=>setPaymentMethod('Card')} /> Card</p>
            </div>
            <button onClick={placeOrder} style={{ padding: '14px', background: '#020a1f', color: 'white', border: 'none', borderRadius: '6px', width: '100%', fontWeight: 'bold' }}>Place Order ₹{total}</button>
          </div>
        </div>
      )}

      {step === 'orderSuccess' && (
        <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto', textAlign: 'center' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '15px' }}>
            <div style={{ fontSize: '60px' }}>✅</div>
            <h1 style={{ color: '#020a1f' }}>Order Placed!</h1>
            <div style={{ textAlign: 'left', background: '#f9f9f9', padding: '20px', borderRadius: '10px', margin: '20px 0' }}>
              <p><b>Order ID:</b> {orderId}</p>
              <p><b>Order Date:</b> {orderDate}</p>
              <p><b>Delivery Date:</b> <span style={{ color: '#00a000', fontWeight: 'bold' }}>{deliveryDate}</span></p>
              <p><b>Total:</b> ₹{total} | <b>Items:</b> {totalQty}</p>
            </div>
            <button onClick={()=>{setCartItems([]); setSearch(''); setStep('products')}} style={{ width: '100%', padding: '14px', background: '#020a1f', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>Continue Shopping 🛍️</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App