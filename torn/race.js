// ==UserScript==
// @name         Racing
// @namespace    namespace
// @version      1.0.2
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
			trackType: "T",
			trackRange: "LR",
			turboType: "T3",
		},
		Withdrawal: {
			name: "Withdrawal",
			car: "Veloria LFA",
			trackType: "T",
			trackRange: "LR",
			turboType: "T3",
		},
		Underdog: {
			name: "Underdog",
			car: "Edomondo NSX",
			trackType: "T",
			trackRange: "SR",
			turboType: "T2",
		},
		Parkland: {
			name: "Parkland",
			car: "Edomondo NSX",
			trackType: "D",
			trackRange: "SR",
			turboType: "T3",
		},
		Docks: {
			name: "Docks",
			car: "Volt GT",
			trackType: "T",
			trackRange: "LR",
			turboType: "T3",
		},
		Commerce: {
			name: "Commerce",
			car: "Edomondo NSX",
			trackType: "T",
			trackRange: "SR",
			turboType: "T2",
		},
		"Two Islands": {
			name: "Two Islands",
			car: "Edomondo NSX",
			trackType: "D",
			trackRange: "LR",
			turboType: "T3",
		},
		Industrial: {
			name: "Industrial",
			car: "Edomondo NSX",
			trackType: "T",
			trackRange: "SR",
			turboType: "T3",
		},
		Vector: {
			name: "Vector",
			car: "Edomondo NSX",
			trackType: "T",
			trackRange: "SR",
			turboType: "T3",
		},
		Mudpit: {
			name: "Mudpit",
			car: "Colina Tanprice",
			trackType: "D",
			trackRange: "LR",
			turboType: "T3",
		},
		Hammerhead: {
			name: "Hammerhead",
			car: "Edomondo NSX",
			trackType: "D",
			trackRange: "SR",
			turboType: "T2",
		},
		Sewage: {
			name: "Sewage",
			car: "Edomondo NSX",
			trackType: "T",
			trackRange: "SR",
			turboType: "T2",
		},
		Meltdown: {
			name: "Meltdown",
			car: "Edomondo NSX",
			trackType: "T",
			trackRange: "SR",
			turboType: "T3",
		},
		Speedway: {
			name: "Speedway",
			car: "Veloria LFA",
			trackType: "T",
			trackRange: "LR",
			turboType: "T3",
		},
		"Stone Park": {
			name: "Stone Park",
			car: "Echo R8",
			trackType: "D",
			trackRange: "SR",
			turboType: "T3",
		},
		Convict: {
			name: "Convict",
			car: "Mercia SLR",
			trackType: "T",
			trackRange: "LR",
			turboType: "T3",
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

			var combinationRegex = /^[T,D]{1}-(LR|SR){1}-(T2|T3){1}$/

			if(combinationRegex.test(combinationNode.innerText)){
				var combinationParts = combinationNode.innerText.split('-')
				cars.push({
					node: carNode,
					combinationNode: combinationNode,
					modelName: modelNode.innerText,
					trackType: combinationParts[0],
					trackRange: combinationParts[1],
					turboType: combinationParts[2],
					trackMatch: {
						totalMatch: 0,
						matchTrackType: false,
						matchTrackRange: false,
						matchTurboType: false
					},
				});
			}
		});

		return cars;
	}

	function getPartHighlight(part, isMatch) {
		var style = isMatch ? 'background-color:green' : '';
		return `<span style='${style}'>${part}</span>`
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
				car.trackMatch.matchTrackType = track.trackType == car.trackType;
				car.trackMatch.matchTrackRange = track.trackRange == car.trackRange;
				car.trackMatch.matchTurboType = track.turboType == car.turboType;

				car.trackMatch.totalMatch =
					(track.car == car.modelName ? 1 : 0) +
					(car.trackMatch.matchTrackType ? 1 : 0) +
					(car.trackMatch.matchTrackRange ? 1 : 0) +
					(car.trackMatch.matchTurboType ? 1 : 0);
			});
		}
		console.log(cars);

		// Highlight
		cars.forEach((car) => {
			if (car.trackMatch.totalMatch == 4) {
				car.node.style.backgroundColor = "green";
			}
			if (car.trackMatch.totalMatch == 3) {
				car.node.style.backgroundColor = "yellow";
			}
			if (car.trackMatch.totalMatch == 2) {
				car.node.style.backgroundColor = "orange";
			}

			var trackTypeHighlight = getPartHighlight(car.trackType, car.trackMatch.matchTrackType);
			var trackRangeHighlight = getPartHighlight(car.trackRange, car.trackMatch.matchTrackRange);
			var turboTypeHighlight = getPartHighlight(car.turboType, car.trackMatch.matchTurboType)

			car.combinationNode.innerHTML = `${trackTypeHighlight}-${trackRangeHighlight}-${turboTypeHighlight}`;
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
