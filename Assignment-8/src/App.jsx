import './App.css'
import Cart from './Components/Cart';
import ProductCard from './Components/ProductCard';

const products = [
  {
    category: 'Waffle',
    name: 'Waffle with Berries',
    price: '$6.50',
    image: 'image-waffle-desktop.jpg'
  },
  {
    category: 'Crème Brûlée',
    name: 'Vanilla Bean Crème Brûlée',
    price: '$7.00',
    image: 'image-creme-brulee-desktop.jpg'
  },
  {
    category: 'Macaron',
    name: 'Macaron Mix of Five',
    price: '$8.00',
    image: 'image-macaron-desktop.jpg'
  },
  {
    category: 'Tiramisu',
    name: 'Classic Tiramisu',
    price: '$5.50',
    image: 'image-tiramisu-desktop.jpg'
  },
  {
    category: 'Baklava',
    name: 'Pistachio Baklava',
    price: '$4.00',
    image: 'image-baklava-desktop.jpg'
  },
  {
    category: 'Pie',
    name: 'Lemon Meringue Pie',
    price: '$5.00',
    image: 'image-meringue-desktop.jpg'
  },
  {
    category: 'Celaliye',
    name: 'Çarşı Fırın',
    price: '$5.50',
    image: 'image-cake-desktop.jpg'
  },
  {
    category: 'Brownies',
    name: 'Vegan Chocolate Brownies',
    price: '$4.00',
    image: 'image-brownie-desktop.jpg'
  },
  {
    category: 'Oats',
    name: 'Overnight Oats',
    price: '$5.00',
    image: 'image-panna-cotta-desktop.jpg'
  }
];

function App() {
  return (
    <>
       {/* Product Section */}
      <div className="container">
        <section className="products">
          <h2 className="heading">Desserts</h2>
          <div className="product-grid">
            {products.map((product, index) => {
              return <ProductCard key={index} product={product}/>
            })}
          </div>
        </section>
        <Cart />
      </div>
    </>
  )
}

export default App
