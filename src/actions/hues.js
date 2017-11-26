import axios from 'axios';
import * as converter from '../util/cie-rgb-converter';

export const findHueLights = () => {
  return (dispatch) => {
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
  };
};

export const updateColor = (payload) => {
  return (dispatch) => {
  	console.log(payload);
  	console.log(converter.hexToRgb(payload.color));
  	let rgb = converter.hexToRgb(payload.color);
  	let cie = converter.rgb_to_cie(rgb.r, rgb.g, rgb.b);
  	console.log(cie);
  	let data = {
  		"on": true,
  		"xy": cie,
  	}
  	let url = 'http://192.168.2.10/api/3fb8fabf28e700e14d0825c36e0eb78c/lights/' + payload.id + '/state';
  	axios.put(url, data).then((response) => {
  		console.log(response);
	  	dispatch({
	  		type: 'UPDATE_HUE_LIGHT',
	  		payload: payload
	  	});
  	}).catch((error) => {
  		console.log(error);
  	});
  };
};

