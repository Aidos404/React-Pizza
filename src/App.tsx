import { createContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Cart from './pages/Cart'
import FullPizza from './pages/FullPizza'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './scss/app.scss'
export const SearchContext = createContext('')
function App() {
	const [searchValue, setSearchValue] = useState('')

	return (
		<div className='wrapper'>
			<SearchContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className='content'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/cart.html' element={<Cart />} />
						<Route path='/pizza/:id' element={<FullPizza />} />
						<Route path='/*' element={<NotFound />} />
					</Routes>
				</div>
			</SearchContext.Provider>
		</div>
	)
}

export default App
