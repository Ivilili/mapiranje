import React, { Fragment } from 'react';
import '../styles/Card.css';

function Card({ isOpened }) {
	return (
		<Fragment>
			<div id="card" className="more_info">
				Card with more information
			</div>
		</Fragment>
	);
}

export default Card;
