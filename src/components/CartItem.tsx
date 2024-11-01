import React from 'react'
type CartItemProps = {
	id: string
	title: string
	price: number
	count: number
	imageUrl: string
	type: number
}
const CartItem: React.FC<CartItemProps> = ({
	id,
	title,
	price,
	count,
	imageUrl,
	type,
}) => {
	return (
		<div className='cart__item'>
			<div className='cart__item-img'>
				<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
			</div>
			<div className='cart__item-info'>
				<h3>{title}</h3>
				<p>{type}</p>
			</div>
			<div className='cart__item-price'>
				<b>{price * count}</b>
			</div>
		</div>
	)
}

export default CartItem
