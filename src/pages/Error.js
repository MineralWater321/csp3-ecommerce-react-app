import Banner from '../components/Banner';

export default function Error(){
	const data = {
		title: "404 - Page Not Found",
		content: "The page you're looking for cannot be found",
		destination: "/",
		label: "Back home"
	}

	return (
		<Banner data={data} />
	)
}