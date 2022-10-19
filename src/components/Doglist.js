import React from 'react';
import { useEffect, useState } from 'react';

const dogAPI = 'https://dog.ceo/api/breeds/list/all';

function Doglist() {
	// State for dog breeds
	const [dogBreeds, setDogBreeds] = useState([]);
	const [dogImage, setDogImage] = useState(
		'https://images.dog.ceo/breeds/buhund-norwegian/hakon2.jpg'
	);

	// Use Effect for Dogbreeds
	useEffect(() => {
		callsApi(dogAPI).then((res) => {
			setDogBreeds(parseData(res));
		});
	}, []);

	// Uppercase first letter in string
	const upperCaseFirstLetter = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	// Parse data from object to array
	const parseData = (data) => {
		return Object.entries(data.message);
	};

	// Calls API
	const callsApi = (url) => {
		return fetch(url)
			.then((res) => {
				return res.json();
			})
			.then((data) => data);
	};

	// Handles click event to fetch dog image
	const handleClickEvent = (event, breed) => {
		event.stopPropagation();
		callsApi(`https://dog.ceo/api/breed/${breed}/images/random`).then((res) =>
			setDogImage(res.message)
		);
	};

	return (
		<div id="container">
			<ul id="doglist">
				{dogBreeds.map((breed) => (
					<li
						key={Math.random() * 100000}
						onClick={(event) => handleClickEvent(event, breed[0])}
					>
						{upperCaseFirstLetter(breed[0])}
						{breed[1].length > 0 && (
							<ul id="doglist">
								{breed[1].map((subBreed) => (
									<li
										onClick={(event) => {
											const breedAndSub = `${breed[0]}/${subBreed}`;
											handleClickEvent(event, breedAndSub);
										}}
									>
										{upperCaseFirstLetter(subBreed)}
									</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
			<img id="dogimage" src={dogImage} alt="random doggo img"></img>
		</div>
	);
}

export default Doglist;
