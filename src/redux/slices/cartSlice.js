import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	totalPrice: 0,
	items: [],
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id)
			if (findItem) {
				findItem.count++
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				})
			}
			state.totalPrice = state.items.reduce((sum, obj) => {
				return sum + obj.price * obj.count
			}, 0)
		},

		removeProduct(state, action) {
			state.items.filter((obj) => obj.id === action.payload)
		},
		clearProduct(state, action) {
			state.items = []
		},
	},
})

export const { addProduct, removeProduct, clearProduct } = cartSlice.actions

export default cartSlice.reducer
