import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import points from './data/points';
import './styles/App.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const App = () => {
	const [ data ] = useState(points);

	const mapContainerRef = useRef(null);

	data.features.forEach(function(point, i) {
		point.properties.id = i;
	});

	// initialize map when component mounts
	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current, // container id
			style: 'mapbox://styles/bincica/ckaf60zrv03j61il9fee0hmn4', // stylesheet location
			center: [ 18.690563, 45.559239 ], // starting position [lng, lat]
			zoom: 15,
			minZoom: 14,
			maxZoom: 18,
			hash: true
		});

		const flyToStore = (currentFeature) => {
			map.flyTo({
				center: currentFeature.geometry.coordinates,
				zoom: 16
			});
		};

		const createPopUp = (currentFeature) => {
			var popUps = document.getElementsByClassName('mapboxgl-popup');
			/** Check if there is already a popup on the map and if so, remove it */
			if (popUps[0]) popUps[0].remove();

			new mapboxgl.Popup({ closeOnClick: false })
				.setLngLat(currentFeature.geometry.coordinates)
				.setHTML(
					'<h3>' +
						currentFeature.properties['građevina'] +
						'</h3>' +
						'<h4>' +
						currentFeature.properties.adresa +
						'</h4>'
				)
				.addTo(map);
		};

		map.on('load', () => {
			// add the data source for new a feature collection with no features
			map.addSource('points', {
				type: 'geojson',
				data: data
			});

			// now add the layer, and reference the data source above by name
			map.addLayer({
				id: 'points',
				source: 'points',
				type: 'symbol',
				layout: {
					'icon-image': 'attraction-11',
					'icon-allow-overlap': true
				}
			});

			buildLocationList(data);
		});

		map.on('click', function(e) {
			/* Determine if a feature in the "points" layer exists at that point. */
			var features = map.queryRenderedFeatures(e.point, {
				layers: [ 'points' ]
			});
			/* If yes, then: */
			if (features.length) {
				var clickedPoint = features[0];

				/* Fly to the point */
				flyToStore(clickedPoint);

				/* Close all other popups and display popup for clicked store */
				createPopUp(clickedPoint);

				/* Highlight listing in sidebar (and remove highlight for all other listings) */
				var activeItem = document.getElementsByClassName('active');
				if (activeItem[0]) {
					activeItem[0].classList.remove('active');
				}
				var listing = document.getElementById('listing-' + clickedPoint.properties.id);
				listing.classList.add('active');
			}
		});

		const buildLocationList = (data) => {
			data.features.forEach((point, i) => {
				var prop = point.properties;

				/* Add a new listing section to the sidebar. */
				var listings = document.getElementById('listings');
				var listing = listings.appendChild(document.createElement('div'));
				/* Assign a unique `id` to the listing. */
				listing.id = 'listing-' + prop.id;
				/* Assign the `card` class to each listing for styling. */
				listing.className = 'card';

				/* Add the link to the individual listing created above. */
				var link = listing.appendChild(document.createElement('a'));
				link.href = '#';
				link.className = 'title';
				link.dataPosition = prop.id;
				link.id = 'link-' + prop.id;
				link.innerHTML = prop['građevina'];

				/* Add details to the individual listing. */
				var details = listing.appendChild(document.createElement('div'));
				details.innerHTML = prop.adresa;

				link.addEventListener('click', function(e) {
					var clickedListing = data.features[this.dataPosition];
					flyToStore(clickedListing);
					createPopUp(clickedListing);

					var activeItem = document.getElementsByClassName('active');
					if (activeItem[0]) {
						activeItem[0].classList.remove('active');
					}
					this.parentNode.classList.add('active');
				});
			});
		};

		// add navigation control (the +/- zoom buttons)
		map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

		// clean up on unmount
		return () => map.remove();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="App">
			<div className="map-container" ref={mapContainerRef} />
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
					<div id="listings" className="listings absolute top-0 bottom-0 left-0 right-0 overflow-auto" />
				</div>
			</div>
		</div>
	);
};

export default App;
