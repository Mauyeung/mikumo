const initialState = {
	bridge: '192.168.2.10',
	username: '3fb8fabf28e700e14d0825c36e0eb78c',
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