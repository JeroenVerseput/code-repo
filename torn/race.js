// ==UserScript==
// @name         Racing
// @namespace    namespace
// @version      1.0.0
// @description  Vroooeeeem
// @author       estensia
// @license      MIT
// @match        https://www.torn.com/page.php?sid=racing*
// ==/UserScript==


// (T) Tarmac Track: Track Tires, Paddleshift Gearbox, Adjustable Coil-over suspension,
// (D) Dirt Track: Rally Tires, Rally Gearbox, Group N Rally Suspension 
// (LR) Long Ratio: Paddle Shift Gearbox (T) or Rally Gearbox (D)
// (SR) Short Ratio: Paddle Shift Gearbox (T) or Rally Gearbox (D)
// (T2) Turbo 2
// (T3) Turbo 3

(async function () {
	("use strict");

	const enlistContainerName = "enlist-wrap";

	const trackList = {
		Uptown: {
			name: "Uptown",
			car: "Lambrini Torobravo",
			combination: "T-LR-T3",
		},
		Withdrawal: {
			name: "Withdrawal",
			car: "Veloria LFA",
			combination: "T-LR-T3",
		},
		Underdog: {
			name: "Underdog",
			car: "Edomondo NSX",
			combination: "T-SR-T2",
		},
		Parkland: {
			name: "Parkland",
			car: "Edomondo NSX",
			combination: "D-SR-T3",
		},
		Docks: {
			name: "Docks",
			car: "Volt GT",
			combination: "T-LR-T3",
		},
		Commerce: {
			name: "Commerce",
			car: "Edomondo NSX",
			combination: "T-SR-T2",
		},
		"Two Islands": {
			name: "Two Islands",
			car: "Edomondo NSX",
			combination: "D-LR-T3",
		},
		Industrial: {
			name: "Industrial",
			car: "Edomondo NSX",
			combination: "T-SR-T3",
		},
		Vector: {
			name: "Vector",
			car: "Edomondo NSX",
			combination: "T-SR-T3",
		},
		Mudpit: {
			name: "Mudpit",
			car: "Colina Tanprice",
			combination: "D-LR-T3",
		},
		Hammerhead: {
			name: "Hammerhead",
			car: "Edomondo NSX",
			combination: "D-SR-T2",
		},
		Sewage: {
			name: "Sewage",
			car: "Edomondo NSX",
			combination: "T-SR-T2",
		},
		Meltdown: {
			name: "Meltdown",
			car: "Edomondo NSX",
			combination: "T-SR-T3",
		},
		Speedway: {
			name: "Speedway",
			car: "Veloria LFA",
			combination: "T-LR-T3",
		},
		"Stone Park": {
			name: "Stone Park",
			car: "Echo R8",
			combination: "D-SR-T3",
		},
		Convict: {
			name: "Convict",
			car: "Mercia SLR",
			combination: "T-LR-T3",
		},
	};

	function isCurrentRacePage() {
		var currentRaceNode = document.querySelector(
			".enlist-wrap > div.title-black.top-round.m-top10",
		);
		return (
			currentRaceNode != null &&
			currentRaceNode.textContent.includes("Current race")
		);
	}

	function GetTrack() {
		var trackNode = document.querySelector(
			"div.cont-black.bottom-round.enlist > div.enlisted-btn-wrap",
		);
		var trackname = trackNode?.innerText?.replace(" - Official race", "");
		trackname = "Mudpit";

		return trackList[trackname];
	}

	function GetCars() {
		var cars = [];
		var carNodes = document.querySelectorAll("ul.enlist-list > li");

		carNodes.forEach((carNode) => {
			var infoNode = carNode.querySelector("div.enlist-info");
			var modelNode = infoNode.querySelector("span.model > span");
			var combinationNode = infoNode.querySelector(
				"span[class^='model-car-name-']",
			);

			cars.push({
				node: carNode,
				modelName: modelNode.innerText,
				combination: combinationNode.innerText,
				trackMatch: 0,
			});
		});

		return cars;
	}

	function highlightCars() {
		if(!isCurrentRacePage()){
			return;
		}

		// Get track
		var track = GetTrack();
		console.log(track);

		// Get cars
		var cars = GetCars();

		// Compare track and cars
		if (track) {
			cars.forEach((car) => {
				if (track.car == car.modelName) {
					car.trackMatch++;
				}
				if (track.combination == car.combination) {
					car.trackMatch += 2;
				}
			});
		}
		console.log(cars);

		// Hightlight
		cars.forEach((car) => {
			if (car.trackMatch == 3) {
				car.node.style.backgroundColor = "green";
			}
			if (car.trackMatch == 2) {
				car.node.style.backgroundColor = "yellow";
			}
			if (car.trackMatch == 1) {
				car.node.style.backgroundColor = "orange";
			}
		});
	}

	const observer = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			for (const node of mutation.addedNodes) {
				if (node.classList && node.classList.contains(enlistContainerName)) {
					highlightCars();
				}
			}
		}
	});

	setTimeout(() => {
		if (document.querySelector(`.${enlistContainerName}`)) {
			console.log("[Race] Found .enlist-wrap");
			highlightCars();
		}
	}, 500);

	const wrapper = document.body; //.querySelector('#mainContainer')
	observer.observe(wrapper, { subtree: true, childList: true });

	console.log("[Race] Initialized");
})();
