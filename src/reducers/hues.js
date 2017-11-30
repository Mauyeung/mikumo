const initialState = {
	lights: [],
	groups: [],
};

export default function (state = initialState, action) {
	if (action.type === 'INITIALIZE') {
		return {
			...state,
			lights: action.payload.lights,
			groups: action.payload.groups,
		}
	} else if (action.type === 'GET_HUE_LIGHTS') {
		return {
			...state,
			lights: action.payload,
		}
	} else {
		return state;
	}
}