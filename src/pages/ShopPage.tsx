import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from '@/components/motion-primitives'
import { ShoppingBag, ShieldCheck, ArrowRight, Truck, RotateCcw, X, Plus, Minus, CheckCircle2, AlertCircle } from 'lucide-react'

const CONTACT_ENDPOINT = 'https://sattvalife-cms.cbvarshini1.workers.dev/api/contact'

interface Product {
  id: string
  name: string
  category: 'Accessories' | 'Apparel' | 'Mindfulness' | 'Gift Cards'
  price: number
  description: string
  materials: string
  colors: string[]
  sizes?: string[]
  image: string
  badge?: string
}

const PRODUCTS: Product[] = [
  {
    id: 'organic-cotton-mat-bag',
    name: 'Sattva Organic Cotton Mat Bag',
    category: 'Accessories',
    price: 34,
    description: 'Handcrafted from 100% unbleached GOTS-certified organic cotton canvas. Features reinforced dual shoulder straps, brass eyelets, and a hidden zip pocket for essentials.',
    materials: '100% GOTS Organic Cotton Canvas & Brass Hardware',
    colors: ['Forest Green', 'Warm Sand', 'Charcoal'],
    image: '/images/class-yin.jpg',
    badge: 'Bestseller'
  },
  {
    id: 'organic-movement-top',
    name: 'Pure Breathable Movement Top',
    category: 'Apparel',
    price: 42,
    description: 'Ultra-soft, moisture-wicking organic rib cotton designed for unrestricted breathability during active Vinyasa or meditative stillness.',
    materials: '95% Organic Cotton, 5% Elastane for shape retention',
    colors: ['Warm Cream', 'Deep Sage', 'Midnight Earth'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/images/hero-yoga.jpg',
    badge: 'Eco-Crafted'
  },
  {
    id: 'mindful-living-tote',
    name: 'Mindful Living Canvas Tote',
    category: 'Accessories',
    price: 22,
    description: 'Heavyweight organic cotton tote bag featuring the Sattvalife gold lotus emblem and inspirational mantra. Spacious enough for blocks, towel, and water bottle.',
    materials: '340gsm Heavyweight Organic Cotton',
    colors: ['Natural Canvas', 'Olive Leaf'],
    image: '/images/lotus.png',
  },
  {
    id: 'affirmation-deck',
    name: 'Sattva Daily Mindfulness Deck',
    category: 'Mindfulness',
    price: 18,
    description: '52 beautifully illustrated cards with daily Sanskrit mantras, mindful reflections, and gentle somatic check-ins for your morning ritual.',
    materials: 'FSC-Certified Recycled Cardstock with Gold Foil Accents',
    colors: ['Gold Edition'],
    image: '/images/class-meditation.jpg',
    badge: 'Ritual Essential'
  },
  {
    id: 'sattvalife-gift-card',
    name: 'Sattvalife Experience Gift Card',
    category: 'Gift Cards',
    price: 50,
    description: 'Delivered digitally or in a luxury gold embossed presentation sleeve. Redeemable against in-studio classes, online passes, retreats, or retail essentials.',
    materials: 'Digital E-Code or Luxury Embossed Sleeve',
    colors: ['Gold Sleeve'],
    sizes: ['£25', '£50', '£100'],
    image: '/images/class-hatha.jpg',
  }
]

interface CartItem {
  product: Product
  selectedColor: string
  selectedSize?: string
  quantity: number
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [orderEmail, setOrderEmail] = useState('')
  const [orderStatus, setOrderStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [selectedVariants, setSelectedVariants] = useState<{ [productId: string]: { color: string; size?: string } }>({
    'organic-cotton-mat-bag': { color: 'Forest Green' },
    'organic-movement-top': { color: 'Warm Cream', size: 'M' },
    'mindful-living-tote': { color: 'Natural Canvas' },
    'affirmation-deck': { color: 'Gold Edition' },
    'sattvalife-gift-card': { color: 'Gold Sleeve', size: '£50' }
  })

  const categories = ['All', 'Accessories', 'Apparel', 'Mindfulness', 'Gift Cards']

  const filtered = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory)

  const updateVariant = (productId: string, key: 'color' | 'size', value: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [key]: value
      }
    }))
  }

  const addToCart = (product: Product) => {
    const variant = selectedVariants[product.id] || { color: product.colors[0], size: product.sizes?.[0] }
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === variant.color && item.selectedSize === variant.size
      )
      if (existingIdx > -1) {
        const next = [...prev]
        next[existingIdx].quantity += 1
        return next
      }
      return [...prev, { product, selectedColor: variant.color, selectedSize: variant.size, quantity: 1 }]
    })

    setCartOpen(true)
  }

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }

  const updateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev]
      const newQty = next[index].quantity + delta
      if (newQty <= 0) return prev.filter((_, i) => i !== index)
      next[index].quantity = newQty
      return next
    })
  }

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderEmail) return
    setOrderStatus('sending')
    try {
      const itemsSummary = cart
        .map((c) => `${c.quantity}x ${c.product.name} (${c.selectedColor}${c.selectedSize ? ` / ${c.selectedSize}` : ''}) — £${c.product.price * c.quantity}`)
        .join('\n')
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Sattvalife Shop Order',
          email: orderEmail,
          type: 'order',
          message: `New shop order request:\n\n${itemsSummary}\n\nTotal: £${cartTotal}`,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setOrderStatus('sent')
      setCart([])
    } catch (err) {
      console.error('Shop order submission failed', err)
      setOrderStatus('error')
    }
  }

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="relative py-8 md:py-10 px-5 bg-gradient-to-b from-cream-100/60 via-cream-50 to-transparent">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-3.5 py-1 text-xs font-semibold text-amber-900 border border-amber-400/40 mb-4">
            Sattvalife Living · Curated Essentials
          </span>
          <SectionHeading
            eyebrow="Mindful Lifestyle Boutique"
            title="Conscious Essentials for Movement & Everyday Living"
          />
          <p className="mt-4 text-forest-800/80 max-w-2xl mx-auto text-sm md:text-base">
            Ethically produced, breathable organic fabrics, sustainable accessories, and mindfulness tools crafted in harmony with your practice.
          </p>
        </div>
      </section>

      {/* Categories & Cart Button Bar */}
      <section className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-forest-950 shadow-md font-semibold'
                    : 'bg-cream-100/80 text-forest-800 hover:bg-cream-200/80 border border-forest-900/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="inline-flex items-center gap-2.5 rounded-full bg-forest-900 px-5 py-2.5 text-sm font-semibold text-amber-300 hover:bg-forest-800 shadow-md transition-all"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Basket ({cartCount})</span>
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, idx) => {
              const currentVariant = selectedVariants[product.id] || { color: product.colors[0], size: product.sizes?.[0] }
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="group flex flex-col justify-between rounded-3xl border border-cream-200/80 bg-white/90 shadow-lg shadow-forest-950/5 overflow-hidden hover:shadow-xl hover:border-amber-400/50 transition-all duration-300"
                >
                  <div>
                    <div className="relative h-64 overflow-hidden bg-forest-900 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />
                      {product.badge && (
                        <div className="absolute top-4 left-4">
                          <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-forest-950 shadow">
                            {product.badge}
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-4 right-4">
                        <span className="text-2xl font-serif font-bold text-cream-50">£{product.price}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <span className="text-xs uppercase font-bold tracking-wider text-amber-700">
                        {product.category}
                      </span>
                      <h3 className="font-serif text-xl font-semibold text-forest-900 mt-1 group-hover:text-amber-700 transition-colors">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm text-forest-800/80 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-cream-200/60 space-y-3">
                        <div className="text-xs text-forest-700/80">
                          <span className="font-semibold text-forest-900">Materials:</span> {product.materials}
                        </div>

                        {/* Colors */}
                        <div>
                          <p className="text-xs font-semibold text-forest-900/80 mb-1.5">Colour / Style</p>
                          <div className="flex flex-wrap gap-1.5">
                            {product.colors.map((c) => (
                              <button
                                key={c}
                                onClick={() => updateVariant(product.id, 'color', c)}
                                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                                  currentVariant.color === c
                                    ? 'border-amber-500 bg-amber-50 text-forest-950 font-semibold'
                                    : 'border-cream-200 bg-cream-50 text-forest-700 hover:bg-cream-100'
                                }`}
                              >
                                {c}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Sizes if applicable */}
                        {product.sizes && (
                          <div>
                            <p className="text-xs font-semibold text-forest-900/80 mb-1.5">Size / Value</p>
                            <div className="flex flex-wrap gap-1.5">
                              {product.sizes.map((s) => (
                                <button
                                  key={s}
                                  onClick={() => updateVariant(product.id, 'size', s)}
                                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                                    currentVariant.size === s
                                      ? 'border-amber-500 bg-amber-50 text-forest-950 font-semibold'
                                      : 'border-cream-200 bg-cream-50 text-forest-700 hover:bg-cream-100'
                                  }`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full flex items-center justify-center gap-2 rounded-xl gold-click bg-amber-400 py-3 text-sm font-semibold text-forest-950 hover:bg-amber-300 transition-all shadow"
                    >
                      <ShoppingBag className="h-4 w-4" /> Add to Basket (£{product.price})
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Shipping & Ethical Values Banner */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6 rounded-3xl border border-cream-200/80 bg-white/80 p-6 text-center">
          <div className="flex flex-col items-center p-2">
            <Truck className="h-6 w-6 text-amber-600 mb-2" />
            <h4 className="font-semibold text-sm text-forest-900">Carbon-Neutral UK Shipping</h4>
            <p className="text-xs text-forest-700/80 mt-1">Complimentary delivery across the UK on orders over £50.</p>
          </div>
          <div className="flex flex-col items-center p-2 border-y sm:border-y-0 sm:border-x border-cream-200/80">
            <ShieldCheck className="h-6 w-6 text-emerald-600 mb-2" />
            <h4 className="font-semibold text-sm text-forest-900">100% GOTS & FSC Certified</h4>
            <p className="text-xs text-forest-700/80 mt-1">Consciously sourced materials with zero synthetic micro-plastics.</p>
          </div>
          <div className="flex flex-col items-center p-2">
            <RotateCcw className="h-6 w-6 text-amber-600 mb-2" />
            <h4 className="font-semibold text-sm text-forest-900">30-Day Mindful Returns</h4>
            <p className="text-xs text-forest-700/80 mt-1">Hassle-free UK exchanges and full refund guarantee.</p>
          </div>
        </div>
      </section>

      {/* Cart Drawer / Slide-Over */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-forest-950/60 backdrop-blur-sm"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-cream-50 text-forest-900 shadow-2xl flex flex-col justify-between"
              >
                <div className="p-6 border-b border-cream-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-amber-600" />
                    <h3 className="font-serif text-xl font-semibold">Your Mindful Basket</h3>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="p-2 rounded-full hover:bg-cream-200/60 text-forest-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Items list */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {orderStatus === 'sent' ? (
                    <div className="text-center py-16 text-forest-800">
                      <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-emerald-600" />
                      <p className="font-semibold text-sm">Order request received!</p>
                      <p className="mt-1 text-xs text-forest-700/70 max-w-xs mx-auto">
                        We'll email you a secure payment link and delivery details shortly.
                      </p>
                      <button
                        onClick={() => { setCartOpen(false); setOrderStatus('idle'); setOrderEmail('') }}
                        className="mt-4 text-xs font-semibold text-amber-600 hover:underline"
                      >
                        Continue Shopping →
                      </button>
                    </div>
                  ) : cart.length === 0 ? (
                    <div className="text-center py-16 text-forest-700/60">
                      <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-30" />
                      <p className="font-medium text-sm">Your basket is currently empty.</p>
                      <button
                        onClick={() => setCartOpen(false)}
                        className="mt-4 text-xs font-semibold text-amber-600 hover:underline"
                      >
                        Explore Conscious Essentials →
                      </button>
                    </div>
                  ) : (
                    cart.map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white border border-cream-200/80 shadow-sm">
                        <img src={item.product.image} alt={item.product.name} className="h-20 w-20 rounded-xl object-cover" />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-semibold text-sm text-forest-900 line-clamp-1">{item.product.name}</h4>
                            <p className="text-xs text-forest-700/70">
                              {item.selectedColor} {item.selectedSize ? `· ${item.selectedSize}` : ''}
                            </p>
                            <p className="font-serif font-bold text-sm text-forest-950 mt-1">£{item.product.price * item.quantity}</p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2 border border-cream-200 rounded-lg px-2 py-0.5 bg-cream-50">
                              <button onClick={() => updateQuantity(idx, -1)} className="text-forest-700 hover:text-forest-950">
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-xs font-semibold px-1">{item.quantity}</span>
                              <button onClick={() => updateQuantity(idx, 1)} className="text-forest-700 hover:text-forest-950">
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button onClick={() => removeFromCart(idx)} className="text-xs text-red-500 hover:underline">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer / Checkout */}
                {cart.length > 0 && orderStatus !== 'sent' && (
                  <form onSubmit={submitOrder} className="p-6 border-t border-cream-200/80 bg-white/60 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-forest-700">Subtotal</span>
                      <span className="font-serif font-bold text-xl text-forest-950">£{cartTotal}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-forest-700/70">
                      <span>UK Delivery</span>
                      <span>Calculated at checkout (Free over £50)</span>
                    </div>

                    {orderStatus === 'error' && (
                      <p className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-3.5 py-2 text-xs text-red-600">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" /> We couldn't send that — please try again.
                      </p>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-forest-800 mb-1">Email for order confirmation & payment link</label>
                      <input
                        type="email"
                        required
                        value={orderEmail}
                        onChange={(e) => setOrderEmail(e.target.value)}
                        placeholder="jane@example.com"
                        className="w-full rounded-xl border border-cream-200 px-4 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={orderStatus === 'sending'}
                      className="w-full flex items-center justify-center gap-2 rounded-xl gold-click bg-amber-400 py-3.5 text-sm font-semibold text-forest-950 hover:bg-amber-300 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{orderStatus === 'sending' ? 'Sending Request...' : 'Request Order & Payment Link'}</span>
                      {orderStatus !== 'sending' && <ArrowRight className="h-4 w-4" />}
                    </button>
                    <p className="text-xs text-center text-forest-700/60">
                      🔒 We'll follow up by email with a secure Stripe payment link (Cards, Apple Pay & Google Pay).
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
