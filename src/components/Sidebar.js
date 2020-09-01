import React, { Fragment } from 'react';
//import Card from './Card';
import '../styles/Sidebar.css';

function Sidebar(props) {
	return (
		<Fragment>
			<div id="top-menu" className="z2 p0 clearfix mb0 fixed left-0 right-0 top-0 bg-white border-bottom">
				<ul className="left list-reset m0">
					<li className="inline-block md-show btn btn-project m0">Popis</li>
					<li className="inline-block md-show btn btn-project m0">Arhitekti</li>
					<li className="inline-block md-show btn btn-project m0">Stil</li>
					<li className="inline-block md-show btn btn-project m0">Namjena</li>
				</ul>
			</div>

			<div id="sidebar" className="relative" mode="list">
				<div id="sidebar-list" className="bg-white absolute top-0 bottom-0 left-0 right-0 border-left">
					<div id="list-view" className="absolute top-0 bottom-0 left-0 right-0 overflow-auto">
						<ul id="heritage-list" className="m0 list-reset border-top">
							{props.data.features.map((point, index) => {
								return (
									<li id={`listing-${index}`} className="card" key={index}>
										<p className="card_title my0 mx3"> {point.properties['građevina']} </p>
										<p className="my0 mx3 darkgray"> {point.properties.adresa} </p>
										<p className="my0 mx3 darkgray"> {point.properties.Mjesto} </p>
										{/*<Card props={props} isOpened={props.isOpened} />*/}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Sidebar;
