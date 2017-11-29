import axios from 'axios';
import * as converter from '../util/cie-rgb-converter';

export const initialize = () => {
	return (dispatch) => {
		axios.get('http://192.168.2.10/api/3fb8fabf28e700e14d0825c36e0eb78c').then((response) => {
			let lights = [];
			let all_lights = response.data.lights;
			console.log(all_lights);
			for (let key in all_lights) {
				if (all_lights.hasOwnProperty(key)) {
					let tempLight = {
						id: key,
						name: all_lights[key].name,
						state: all_lights[key].state,
						color: converter.cie_to_hex(all_lights[key].state.xy[0], all_lights[key].state.xy[1], all_lights[key].state.bri),
					}
					lights.push(tempLight);
				}
			};
			let groups = [];
			let all_groups = response.data.groups;
			console.log(all_groups);
			for (let key in all_groups) {
				if (all_groups.hasOwnProperty(key)) {
					let tempGroup = {
						id: key,
						name: all_groups[key].name,
						state: all_groups[key].state,
						lights: all_groups[key].lights,
					}
					groups.push(tempGroup);
				}
			}
			dispatch({
				type: 'INITIALIZE',
				payload: {
					lights: lights,
					groups: groups,
				}
			});
		}).catch((error) => {
			console.log(error);
		});
	};
}

export const updateColor = (payload) => {
	return (dispatch) => {
		let rgb = converter.hexToRgb(payload.color);
		let cie = converter.rgb_to_cie(rgb.r, rgb.g, rgb.b);
		let data = {
			'on': true,
			'xy': cie,
		}
		let url = 'http://192.168.2.10/api/3fb8fabf28e700e14d0825c36e0eb78c/lights/' + payload.id + '/state';
		axios.put(url, data).then((response) => {
			axios.get('http://192.168.2.10/api/3fb8fabf28e700e14d0825c36e0eb78c/lights').then((response) => {
				let lights = [];
				let all_lights = response.data;
				for (let key in all_lights) {
					if (all_lights.hasOwnProperty(key)) {
						let tempLight = {
							id: key,
							name: all_lights[key].name,
							state: all_lights[key].state,
							color: converter.cie_to_hex(all_lights[key].state.xy[0], all_lights[key].state.xy[1], all_lights[key].state.bri),
						}
						lights.push(tempLight);
					}
				};
				dispatch({
					type: 'GET_HUE_LIGHTS',
					payload: lights,
				});
			}).catch((error) => {
				console.log(error);
			});
		}).catch((error) => {
			console.log(error);
		});
	};
}

export const updateOnOff = (payload) => {
	return (dispatch) => {
		let data = {
			'on': payload.on,
		}
		let url = 'http://192.168.2.10/api/3fb8fabf28e700e14d0825c36e0eb78c/lights/' + payload.id + '/state';
		axios.put(url, data).then((response) => {
			axios.get('http://192.168.2.10/api/3fb8fabf28e700e14d0825c36e0eb78c/lights').then((response) => {
				let lights = [];
				let all_lights = response.data;
				for (let key in all_lights) {
					if (all_lights.hasOwnProperty(key)) {
						let tempLight = {
							id: key,
							name: all_lights[key].name,
							state: all_lights[key].state,
							color: converter.cie_to_hex(all_lights[key].state.xy[0], all_lights[key].state.xy[1], all_lights[key].state.bri),
						}
						lights.push(tempLight);
					}
				};
				dispatch({
					type: 'GET_HUE_LIGHTS',
					payload: lights,
				});
			}).catch((error) => {
				console.log(error);
			});
		}).catch((error) => {
			console.log(error);
		});
	};
}

export const updateBrightness = (payload) => {
	return (dispatch) => {
		let data = {
			'bri': payload.bri,
		}
		let url = 'http://192.168.2.10/api/3fb8fabf28e700e14d0825c36e0eb78c/lights/' + payload.id + '/state';
		axios.put(url, data).then((response) => {
			axios.get('http://192.168.2.10/api/3fb8fabf28e700e14d0825c36e0eb78c/lights').then((response) => {
				let lights = [];
				let all_lights = response.data;
				for (let key in all_lights) {
					if (all_lights.hasOwnProperty(key)) {
						let tempLight = {
							id: key,
							name: all_lights[key].name,
							state: all_lights[key].state,
							color: converter.cie_to_hex(all_lights[key].state.xy[0], all_lights[key].state.xy[1], all_lights[key].state.bri),
						}
						lights.push(tempLight);
					}
				};
				dispatch({
					type: 'GET_HUE_LIGHTS',
					payload: lights,
				});
			}).catch((error) => {
				console.log(error);
			});
		}).catch((error) => {
			console.log(error);
		});
	};
}

export const updateSaturation = (payload) => {
	return (dispatch) => {
		let data = {
			'sat': payload.sat,
		}
		let url = 'http://192.168.2.10/api/3fb8fabf28e700e14d0825c36e0eb78c/lights/' + payload.id + '/state';
		axios.put(url, data).then((response) => {
			axios.get('http://192.168.2.10/api/3fb8fabf28e700e14d0825c36e0eb78c/lights').then((response) => {
				let lights = [];
				let all_lights = response.data;
				for (let key in all_lights) {
					if (all_lights.hasOwnProperty(key)) {
						let tempLight = {
							id: key,
							name: all_lights[key].name,
							state: all_lights[key].state,
							color: converter.cie_to_hex(all_lights[key].state.xy[0], all_lights[key].state.xy[1], all_lights[key].state.bri),
						}
						lights.push(tempLight);
					}
				};
				dispatch({
					type: 'GET_HUE_LIGHTS',
					payload: lights,
				});
			}).catch((error) => {
				console.log(error);
			});
		}).catch((error) => {
			console.log(error);
		});
	};
}

export const updateEffect = (payload) => {
	return (dispatch) => {
		let data = {
			'effect': payload.effect,
		}
		let url = 'http://192.168.2.10/api/3fb8fabf28e700e14d0825c36e0eb78c/lights/' + payload.id + '/state';
		axios.put(url, data).then((response) => {
			axios.get('http://192.168.2.10/api/3fb8fabf28e700e14d0825c36e0eb78c/lights').then((response) => {
				let lights = [];
				let all_lights = response.data;
				for (let key in all_lights) {
					if (all_lights.hasOwnProperty(key)) {
						let tempLight = {
							id: key,
							name: all_lights[key].name,
							state: all_lights[key].state,
							color: converter.cie_to_hex(all_lights[key].state.xy[0], all_lights[key].state.xy[1], all_lights[key].state.bri),
						}
						lights.push(tempLight);
					}
				};
				dispatch({
					type: 'GET_HUE_LIGHTS',
					payload: lights,
				});
			}).catch((error) => {
				console.log(error);
			});
		}).catch((error) => {
			console.log(error);
		});
	};
}