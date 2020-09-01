import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
//import * as points from './data/features.geojson';
//import * as myData from './data/features.json';
//import Sidebar from './components/Sidebar';
import './styles/App.css';
import './styles/Sidebar.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

//checking geojson
let points = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [ 18.675909, 45.559789 ]
			},
			properties: {
				građevina: ' palača Virovitičke županije',
				oznaka: 'Z-1263',
				'Vrijeme nastanka': '1834. god. do 1836. god.',
				Autori: 'Arhitekt Hild, N.',
				adresa: 'Županijska 4',
				Mjesto: 'Osijek',
				'pravni status': 'zaštićeno kulturno dobro',
				vrsta: 'nepokretno kulturno dobro - pojedinačno',
				Klasifikacija: 'profana graditeljska baština',
				'UNESCO zaštita:': 'ne',
				'Opis dobra':
					'Klasicistička palača Virovitičke županije izgrađena je 1834. – 1836. godine po nacrtima arh. N. Hilda. Palača je tlocrtne dispozicije u obliku izduženog pravokutnika. Glavno pročelje je simetrično koncipirano s naglašenim centralnim dvokatnim rizalitom. Palača Virovitičke županije svojom monumentalnošču, bogatom obradom arhitektonskih detalja i interijera ističe se među najvrijednijim profanim kasno klasicističkim zgradama u široj regiji Slavonije. Sačuvala je izvorni arhitektonski izgled i izvornu namjenu upravne zgrade.'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [ 18.696818, 45.561026 ]
			},
			properties: {
				građevina: ' Zgrada Plemić',
				oznaka: 'Z-1664',
				'Vrijeme nastanka': '',
				Autori: '18. st.',
				adresa: 'Franjevačka ulica 5',
				Mjesto: 'Osijek',
				'pravni status': 'zaštićeno kulturno dobro',
				vrsta: 'nepokretno kulturno dobro - pojedinačno',
				Klasifikacija: 'profana graditeljska baština',
				'UNESCO zaštita:': 'ne',
				'Opis dobra':
					'Kuća Plemić, dvokrilna jednokatnica, građena u XVIII. st., ističe se bogatom obradom uličnog pročelja s baroknim i rokoko detaljima, te predstavlja vrijedan primjer stambene građanske arhitekture 18. stoljeća u osječkoj Tvrđi. U unutrašnjosti, u središnjoj poprečnoj osi uličnog krila nalazi se hodnik koji vodi do dvokrakog stubišta smještenog u jugozapadnom uglu građevine. Prostorije prizemlja presvođene su češkim kapama, a hodnik češkim kapama s pojasnicama. Prostorije kata imaju ravni drveni gradnik.'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [ 18.698073, 45.56164 ]
			},
			properties: {
				građevina: 'Bastioni sv. Karla i sv. Eugena s Vodenim vratima',
				oznaka: 'Z-5602',
				'Vrijeme nastanka': '18. st.',
				Autori: '-',
				adresa: 'sjeveroistočni dio Tvrđe',
				Mjesto: 'Osijek',
				'pravni status': 'zaštićeno kulturno dobro',
				vrsta: 'nepokretno kulturno dobro - pojedinačno',
				Klasifikacija: 'profana graditeljska baština',
				'UNESCO zaštita:': 'ne',
				'Opis dobra':
					'Pod pojmom Prvog bastiona sv. Karla, Vodenih vrata i Osmog bastiona Sv. Eugena podrazumijevamo dva, od njih ukupno osam, ponajviše izvorno očuvana bastiona osječke Tvrđe zajedno sa Vodenim vratima. Smješteni su na samom njenom sjeveroistočnom dijelu čineći time svojevrsnu zasebnu cjelinu. Sagrađeni su sredinom tridesetih godina XVIII st., u vrijeme kada se gradi i osječka Tvrđa koja je primjer nizinske utvrde s tipičnim baroknim stilskim obilježjima.'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [ 18.695629, 45.55632 ]
			},
			properties: {
				građevina: 'Burza rada',
				oznaka: 'Z-3043',
				'Vrijeme nastanka': '40-ih godina prošlog stoljeća',
				Autori: 'Jovan Korka',
				adresa: 'Kneza Trpimira 2',
				Mjesto: 'Osijek',
				'pravni status': 'zaštićeno kulturno dobro',
				vrsta: 'nepokretno kulturno dobro - pojedinačno',
				Klasifikacija: 'profana graditeljska baština',
				'UNESCO zaštita:': 'ne',
				'Opis dobra':
					'Tlocrtna dispozicija zgrade je u obliku skraćenog, nepravilnog slova H s natkrivenim ulaznim trijemom na južnoj strani. Strogi i autoritativan izgled zgrade jasno otkriva njegovu utilitarnu javnu namjenu. Princip neoklasicističkog i monumentalnog oblikovanja Jovana Korke ovdje je primijenjen u novom modernom ruhu. Zgradu odlikuje čistoća geometrijskih površina. Zgrada Burze je oblikovana u duhu modernog senzibiliteta klasičnog poimanja ritma i proporcija. Zgrada Burze iako dosta kasno izgrađena (40-ih godina prošlog stoljeća) vrijedno je djelo za Osijek u kontekstu arhitekture hrvatske moderne između dva svjetska rata.'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [ 18.736652, 45.556939 ]
			},
			properties: {
				građevina: 'Ciglana - Zeleno polje',
				oznaka: 'Z-4973',
				'Vrijeme nastanka': '800 god.p.n.e. do 700. god.',
				Autori: '-',
				adresa: 'Donji grad',
				Mjesto: 'Osijek',
				'pravni status': 'zaštićeno kulturno dobro',
				vrsta: 'nepokretno kulturno dobro - pojedinačno',
				Klasifikacija: 'arheološka baština',
				'UNESCO zaštita:': 'ne',
				'Opis dobra':
					'Arheološko nalazište Ciglana i Zeleno polje nalazi se na području osječkog Donjeg grada na povišenom položaju, riječnoj terasi Drave. Pretpostavlja se da je to bila sigurna visina do koje nije dosezao ni najveći vodostaj rijeke. Prvi puta se lokalitet spominje kada su na mjestu Tvornice mlijeka u prahu, 1941.g. otkriveni konjanički grobovi. Od priloga su bile sačuvane samo pojasne garniture izrađene od bronce te zlata ili pozlate, koje su, nažalost nestale tijekom Drugog svjetskog rata.'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [ 18.677958, 45.561086 ]
			},
			properties: {
				građevina: 'Crkva sv. Jakova sa samostanom',
				oznaka: 'Z-1699',
				'Vrijeme nastanka': '1700. god. do 1727. god.',
				Autori: '-',
				adresa: 'Kapucinska 41',
				Mjesto: 'Osijek',
				'pravni status': 'zaštićeno kulturno dobro',
				vrsta: 'nepokretno kulturno dobro - pojedinačno',
				Klasifikacija: 'sakralna graditeljska baština',
				'UNESCO zaštita:': 'ne',
				'Opis dobra':
					'Crkva je jednobrodna građevina s ravnim zaključkom kvadratičnog svetište s istočnim pročeljem prigrađena uz samostan. Samostanski kompleks zatvara četvrtasto dvorište. Crkveni brod presvođen je bačvastim svodom. Nad svetištem podignut je mali drveni tornjić, pokriven šindrom. Glavno pročelje na kome je glavni ulaz u crkvu ranijom regulacijom ostalo je uvučeno od ulice. Vezu s ulicom čini zidana ograda sa željeznim rešetkama i ulazni otvor s dvije skulpture redovnika. Pročelje crkve jednostavno je obrađeno, s visokim jednostavno oblikovanim zabatom i nekoliko otvora. Akcent na pročelju je kameni portal nad kojim je obiteljski grb generala Petrača velikog crkvenog donatora.'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [ 18.697145, 45.561758 ]
			},
			properties: {
				građevina: 'Crkva sv. Križa sa samostanom',
				oznaka: 'Z-1698',
				'Vrijeme nastanka': '1705. god. do 1732. god.',
				Autori: '',
				adresa: 'Trg Vatroslava Lisinskog 3',
				Mjesto: 'Osijek',
				'pravni status': 'zaštićeno kulturno dobro',
				vrsta: 'nepokretno kulturno dobro - pojedinačno',
				Klasifikacija: 'sakralna graditeljska baština',
				'UNESCO zaštita:': 'ne',
				'Opis dobra':
					'Crkva sv. Križa podignuta je između 1705.-1732. g. Karakterizira ju jedinstveni dvoranski prostor s pravokutnim brodom, razvedenim parovima bočnih kapela te jednako široko poligonalno zaključeno svetište s kontraforama. Lađu presvođuje segmentno-bačvasti svod sa susvodnicama. Glavno ulično pročelje crkve zaključeno je zabatom volutastih kontura i u središnjoj osi rastvoreno kamenim profiliranim portalom zaključenim prekinutim zabatom Godine 1746.,sjeverno, uz svetište podiže se zvonik. Samostan je smješten unutar kasnobarokne vojne palače sagrađene između 1770. – 1778. g. sjeverno uz crkvu.'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [ 18.720247, 45.558881 ]
			},
			properties: {
				građevina: 'Crkva sv. Marije',
				oznaka: 'Z-1260',
				'Vrijeme nastanka': '1758. god. do 1760. god.',
				Autori: '',
				adresa: 'Crkvena 34',
				Mjesto: 'Osijek',
				'pravni status': 'zaštićeno kulturno dobro',
				vrsta: 'nepokretno kulturno dobro - pojedinačno',
				Klasifikacija: 'sakralna graditeljska baština',
				'UNESCO zaštita:': 'ne',
				'Opis dobra':
					'Župna crkva sv. Marije izgrađena je sredinom 18.st. ( 1758. - 1760.) u baroknom slogu. Jednobrodna građevina s trostranom apsidom orjentirana sjever - jug, s prigrađenom sakristijom uz istočno pročelje. Iznad ulaza izdižu se zvonik na dva kata koji pokriva barokna lukovica s lanternom. Stubovi, polupilastri vijenci i volute raščlanjuju pročelja. Crkveni brod zasveden je bačvastim svodom, a svetište zatvoreno polukupolom.'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [ 18.694121, 45.561176 ]
			},
			properties: {
				građevina: 'Crkva Sv. Mihaela',
				oznaka: 'Z-1252',
				'Vrijeme nastanka': '1725. god. do 1768. god.',
				Autori: '',
				adresa: 'Križanićev trg',
				Mjesto: 'Osijek',
				'pravni status': 'zaštićeno kulturno dobro',
				vrsta: 'nepokretno kulturno dobro - pojedinačno',
				Klasifikacija: 'sakralna graditeljska baština',
				'UNESCO zaštita:': 'ne',
				'Opis dobra':
					'Crkva sv. Mihovila, građena od 1725. – 1768.g. od strane Isusovačkog reda, monumentalan je barokna građevina dvoranskog tipa, sa zaobljenim svetištem i dva masivna zvonika iznad glavnog pročelja, izvedena u duhu kasnog baroka kontinentalne Hrvatske. Vidljiv je utjecaj austrijskog baroka glede arhitektonske kompozicije.'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [ 18.67588, 45.560844 ]
			},
			properties: {
				građevina: 'Crkva sv. Petra i Pavla',
				oznaka: 'Z-1267',
				'Vrijeme nastanka': '1898. god.',
				Autori: 'Franz Langenberg',
				adresa: 'Trg pape Ivana Pavla II',
				Mjesto: 'Osijek',
				'pravni status': 'zaštićeno kulturno dobro',
				vrsta: 'nepokretno kulturno dobro - pojedinačno',
				Klasifikacija: 'sakralna graditeljska baština',
				'UNESCO zaštita:': 'ne',
				'Opis dobra':
					'Konkatedrala sv. Petra i Pavla, sagrađena l898. g., graditelja F. Langenberga, koncipirana je kao trobrodna bazilika s transeptom, visoka glavna i niže bočne lađe presvođene su križno-rebrastim svodom. Građevina ima neogotičke stilske karakteristike a dominantni akcent daje joj 90 m visoki, stepenasto oblikovani zvonik iznad glavnog ulaza. Vanjština je raščlanjena kontraforima te nizom dekorativnih elemenata izvedenih u kamenu koji se kontrastno ističu na glatkoj podlozi crvene opeke. Svodovi i zidne plohe u glavnoj lađi oslikani su "secco“ tehnikom (motivi iz Starog i Novog Zavjeta) slikara M. Račkog. Crkva prezentira graditeljstvo neogotičkog stila s kraja l9.st.'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [ 18.689538, 45.557384 ]
			},
			properties: {
				građevina: 'Đački dom',
				oznaka: 'Z-2330',
				'Vrijeme nastanka': '1929. god.',
				Autori: 'Viktor Axmann',
				adresa: 'Zagrebačka 5',
				Mjesto: 'Osijek',
				'pravni status': 'zaštićeno kulturno dobro',
				vrsta: 'nepokretno kulturno dobro - pojedinačno',
				Klasifikacija: 'profana graditeljska baština',
				'UNESCO zaštita:': 'ne',
				'Opis dobra':
					'Slobodnostojeća jednokatna zgrada Đačkog doma izgrađena je 1929. godine po projektima arhitekta Viktora Axmanna. Ispred zgrade s ulične strane nalazi se vrt odijeljen žičanom ogradom na niskom parapetu. Zgrada je nepravilne tlocrtne dispozicije. Ulaz u zgradu je s dvorišne strane. Zgrada Đačkog doma projektirao je suvremeno Viktor Axsmann u duhu novog klasicizma s jakim jonskim pilastrima na pročelju koji determiniraju njenu stilsku pripadnost. Upotrebom dekorativnih elemenata historicističke arhitekture zadovoljena je sadržajna forma, naglašena je ozbiljnost i funkcionalna uloga zgrade.'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [ 18.697798, 45.56011 ]
			},
			properties: {
				građevina: 'Donja oružarnica',
				oznaka: 'Z-6408',
				'Vrijeme nastanka': '1712. god.',
				Autori: '',
				adresa: 'Fakultetska 2',
				Mjesto: 'Osijek',
				'pravni status': 'zaštićeno kulturno dobro',
				vrsta: 'nepokretno kulturno dobro - pojedinačno',
				Klasifikacija: 'profana graditeljska baština',
				'UNESCO zaštita:': 'ne',
				'Opis dobra':
					'Donja oružarnica je jednokatna četverokrilna građevina s unutrašnjim dvorištem. Smještena je u istočnom dijelu osječke Tvrđe gdje zauzima jedan cijeli tvrđavski blok. Građena je i adaptirana u četiri graditeljske faze kroz cijelo 18. stoljeće, a odlikuju je stilske karakteristike skromnog i utilitarnog vojnog baroknog graditeljstva. Neizostavni je dio baroknog arhitektonskog ansambla osječke Tvrđe te zbog očuvane izvornosti, cjelovitosti, monumentalnosti i specifične prvotne namjene predstavlja vrijedan kulturnopovijesni spomenik vojne barokne arhitekture Hrvatske.'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [ 18.950883, 45.527361 ]
			},
			properties: {
				građevina: 'Dvorac Adamović',
				oznaka: 'Z-1271',
				'Vrijeme nastanka': '',
				Autori: '18. st.',
				adresa: '',
				Mjesto: 'Tenja',
				'pravni status': 'zaštićeno kulturno dobro',
				vrsta: 'nepokretno kulturno dobro - pojedinačno',
				Klasifikacija: 'profana graditeljska baština',
				'UNESCO zaštita:': 'ne',
				'Opis dobra':
					'Jednokatni barokno-klasicistički dvorac Adamović izgradio je Ivan Kapistran I. pl. Adamovich potkraj 18. i početkom 19. stoljeća. Izvorno je dvorac bio dvokrilna građevine L tlocrtnog oblika, no naknadnim skraćenjem bočnog krila, poprimio je pravokutni tlocrt s krnjim jugoistočnim krilom koji se doima poput rizalita na dvorišnom pročelju. Slobodnostojeća jednokatna građevina dvorca izgrađena je u kasnobarokno-klasicističkom stilu. Okružuje ju park s egzotičnim drvećem. Kasnobarokni dvorac Adamović u Tenju jedan je od najreprezentativnijih dvoraca u Slavoniji.'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [ 18.681041, 45.560077 ]
			},
			properties: {
				građevina: 'Evangelička (Luteranska) crkva i župni dom',
				oznaka: 'Z-7333',
				'Vrijeme nastanka': '1905. god.',
				Autori: 'Ivan (Hans) Domes',
				adresa: 'Lorenza Jagera 7',
				Mjesto: 'Osijek',
				'pravni status': 'zaštićeno kulturno dobro',
				vrsta: 'nepokretno kulturno dobro - pojedinačno',
				Klasifikacija: 'sakralna graditeljska baština',
				'UNESCO zaštita:': 'ne',
				'Opis dobra':
					'Evangelička (Luteranska crkva) i župni dom nalaze se u ulici Lorenza Jägera u Osijeku i njima upravlja Evangelička crkvena općina Osijek. Kompleks crkve i župnog doma reprezentativan je primjer evangeličke (luteranske) arhitektonske baštine s kraja 19. i početka 20. stoljeća u Hrvatskoj. Crkva je izgrađena prema projektu poznatog osječkog arhitekte Ivana (Hansa) Domesa iz 1905. godine i predstavlja vrijedan primjer neogotičke arhitekture Osijeka. Župni dom je prizemna građevina „L“- tlocrta, izgrađena u stilu neobaroka, 1885. godine. Osječki kompleks evangeličke crkve i župnog doma, uz zagrebački i legradski, jedini je u cijelosti sačuvan kompleks i reprezentativan je primjer evangeličke (luteranske) arhitektonske baštine u Hrvatskoj.'
			}
		}
	]
};

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
