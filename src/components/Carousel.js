import React from "react"
import "./Carousel.scss";


// @Sam, now you can replace these urls with src's from Prismic. Pass the urls
// down from project.js into this component using Props. I included a working example.

class Carousel extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			currentImageIndex: 0
		};

		this.nextSlide = this.nextSlide.bind(this);
		this.previousSlide = this.previousSlide.bind(this);
	}

	previousSlide () {
		const lastIndex = this.props.images.length - 1;
		const { currentImageIndex } = this.state;
		const shouldResetIndex = currentImageIndex === 0;
		const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;

		this.setState({
			currentImageIndex: index
		});
	}

	nextSlide () {
		const lastIndex = this.props.images.length - 1;
		const { currentImageIndex } = this.state;
		const shouldResetIndex = currentImageIndex === lastIndex;
		const index =  shouldResetIndex ? 0 : currentImageIndex + 1;

		this.setState({
			currentImageIndex: index
		});
	}

	render () {
		const { images } = this.props;
		// This is an old way of handling props ^

		return (
			<div className="Carousel">
				<Arrow
					direction="left"
					clickFunction={ this.previousSlide }
					glyph="&#9664;"
				/>
				<Arrow
					direction="right"
					clickFunction={ this.nextSlide }
					glyph="&#9654;"
				/>
				<ImageSlide url={ images[this.state.currentImageIndex].gallery_image.url } />
				{/* <ImageSlide url={ imgUrls[this.state.currentImageIndex] } /> */}
			</div>
		);
	}
}

const Arrow = ({ direction, clickFunction, glyph }) => (
	<div
		className={ `slide-arrow ${direction}` }
		onClick={ clickFunction }>
		{ glyph }
	</div>
);

const ImageSlide = ({ url }) => {
	const styles = {
		backgroundImage: `url(${url})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	};

	return (
		<div className="image-slide" style={styles}></div>
	);
}

export default Carousel