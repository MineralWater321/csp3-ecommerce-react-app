import { Fragment } from 'react';
import Banner from '../components/Banner';
// import Highlights from '../components/Highlights';
// import CourseCard from '../components/CourseCard'

export default function Home(){
	const data={
		title: "PieZada",
		content: "The Ecommerce Website For Pies",
		destination: "/products",
		label: "Buy now!"
	}

	return(
		<Fragment>
			<Banner data={data}/>
			{/* <Highlights /> */}
		</Fragment>
	)
}