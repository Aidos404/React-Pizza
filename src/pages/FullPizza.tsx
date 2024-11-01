import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const FullPizza: React.FC = () => {
	const { id } = useParams()
	const [pizza, setPizza] = useState<{
		imageUrl: string
		title: string
		price: string
	}>()

	useEffect(() => {
		async function FetchPizza() {
			try {
				const { data } = await axios.get(
					`https://66c9797a8a477f50dc30baa9.mockapi.io/Pizzas/${id}`
				)
				setPizza(data)
			} catch (error) {
				alert(error)
			}
		}
		FetchPizza()
	}, [id])
	if (!pizza) {
		return <>Загрузка...</>
	}

	return (
		<div>
			<img src={pizza.imageUrl} alt='' />
			<h2>{pizza.title}</h2>
			<p>{pizza.price}</p>
		</div>
	)
}

export default FullPizza
