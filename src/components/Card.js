import React, { Fragment } from 'react';
import '../styles/Card.css';

function Card({ isOpened }) {
	return (
		<Fragment>
			<div id="card" className="more_info">
				<p>image</p>
				<div>
					<span> klasifikacije </span>
					<span> klasifikacije </span>
				</div>
				<div>
					<span>prvobitna namjena </span>
					<span> vojna namjena</span>
				</div>
			</div>
		</Fragment>
	);
}

export default Card;
