function ProductCard(props) {
  return (
    <div className="product-card">
      <img src={props.image} alt={props.name} className="product-image" />
      <h2 className="product-name">{props.name}</h2>
      <p className="product-price">{props.price}</p>

      <button onClick={props.onAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
    