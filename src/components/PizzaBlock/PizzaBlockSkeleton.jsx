import React from 'react'
import ContentLoader from 'react-content-loader'

const PizzaBlockSkeleton = (props) => (
	<ContentLoader
		speed={2}
		width={280}
		height={465}
		viewBox='0 0 280 465'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
		{...props}>
		<rect x='3' y='232' rx='3' ry='3' width='262' height='34' />
		<circle cx='136' cy='107' r='98' />
	</ContentLoader>
)

export default PizzaBlockSkeleton
