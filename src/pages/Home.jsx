import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchContext } from '../App'
import Categories from '../components/Categories'
import Pagination from '../components/Pagination/Pagination'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/PizzaBlockSkeleton'
import Sort from '../components/Sort'
import { setCategoryId } from '../redux/slices/filter.js'
import { setItems } from '../redux/slices/pizzasSlice.js'
function Home() {
	// const [pizza, setPizza] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const { searchValue } = useContext(SearchContext)
	const { categoryId, sort } = useSelector((state) => state.filter)
	const pizza = useSelector((state) => state.pizza.items)

	const dispatch = useDispatch()
	const pizzas = Array.isArray(pizza)
		? pizza
				.filter((obj) =>
					obj.title.toLowerCase().includes(searchValue.toLowerCase())
				)
				.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
		: []

	const skeletons = [...new Array(6)].map((__, index) => (
		<Skeleton key={index} />
	))

	const onClickCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	useEffect(() => {
		setIsLoading(true)
		const fetchPizza = async () => {
			try {
				const { data } = await axios.get(
					`https://66c9797a8a477f50dc30baa9.mockapi.io/Pizzas?${
						categoryId > 0 ? `category=${categoryId}` : ''
					}&sortBy=${
						sort.sortProperty
					}&order=&search=${searchValue}&page=${currentPage}&limit=4`
				)
				dispatch(setItems(data))
			} catch (error) {
				console.log(error, 'error issue')
			} finally {
				setIsLoading(false)
			}
		}
		fetchPizza()

		window.scroll(0, 0)
	}, [categoryId, sort, searchValue, currentPage])

	return (
		<>
			<div className='container'>
				<div className='content__top'>
					<Categories
						value={categoryId}
						onClickCategory={(id) => onClickCategory(id)}
					/>
					<Sort />
				</div>
				<h2 className='content__title'>Все пиццы</h2>
				<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
				<Pagination onchangePage={(number) => setCurrentPage(number)} />
			</div>
		</>
	)
}

export default Home
