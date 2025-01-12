import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProduct } from '../../redux/slices/cartSlice'
type PizzaBlockProps = {
	id: string
	title: string
	price: number
	count: number
	imageUrl: string
	types: number[]
	sizes: number[]
}
const PizzaBlock: React.FC<PizzaBlockProps> = ({
	id,
	imageUrl,
	title,
	price,
	sizes,
	types,
}) => {
	const dispatch = useDispatch()
	const count = useSelector((state: any) =>
		state.cart.items.find((obj: any) => obj.id === id)
	)
	const addedCount = count ? count.count : 0
	const typeNames = ['Тонкое', 'Традиционное']
	const [activeType, setActivType] = useState(0)
	const [activeSize, setActivSize] = useState(0)
	const onClickAdd = () => {
		const item = {
			id,
			title,
			price,
			imageUrl,
			type: typeNames[activeType],
			size: activeSize,
		}

		dispatch(addProduct(item))
	}

	return (
		<div className='pizza-block-wrapper'>
			<div className='pizza-block'>
				<Link to={`/pizza/${id}`}>
					<img src={imageUrl} alt='Pizza' width='150px' height='150px' />
					<h4 className='pizza-block__title'>{title}</h4>
				</Link>
				<div className='pizza-block__selector'>
					<ul>
						{types.map((typeIndex) => (
							<li
								key={typeIndex}
								onClick={() => setActivType(typeIndex)}
								className={activeType === typeIndex ? 'active' : ''}>
								{typeNames[typeIndex]}
							</li>
						))}
					</ul>
					<ul>
						{sizes.map((size, index) => (
							<li
								key={index}
								onClick={() => setActivSize(index)}
								className={activeSize === index ? 'active' : ''}>
								{size}см
							</li>
						))}
					</ul>
				</div>
				<div className='pizza-block__bottom'>
					<div className='pizza-block__price'>{price}$</div>
					<button
						onClick={onClickAdd}
						className='button button--outline button--add'>
						<svg
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
								fill='white'
							/>
						</svg>
						<span>Добавить</span>
						{addedCount > 0 && <i>{addedCount}</i>}
					</button>
				</div>
			</div>
		</div>
	)
}

export default PizzaBlock
