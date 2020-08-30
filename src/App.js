import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import * as points from './data/features.geojson';
import * as myData from './data/features.json';
import Sidebar from './components/Sidebar';
import './styles/App.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const App = () => {
	const [ data ] = useState(myData.features);
	const mapContainerRef = useRef(null);

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

		map.on('load', () => {
			// add the data source for new a feature collection with no features
			map.addSource('points', {
				type: 'geojson',
				data: points
			});
			// now add the layer, and reference the data source above by name
			map.addLayer({
				id: 'points',
				source: 'points',
				type: 'symbol',
				layout: {
					'icon-image': 'town-hall-11',
					'icon-padding': 0,
					'icon-allow-overlap': true
				}
			});
		});

		// add navigation control (the +/- zoom buttons)
		map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

		// clean up on unmount
		return () => map.remove();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="App">
			<div className="map-container" ref={mapContainerRef} />
			<Sidebar data={data} />
		</div>
	);
};

export default App;
