import { environment } from "../environments/environment";

import { isUndefined } from "util";
const message = `Sorry, the request was unsuccessful. Please come back later.`;
export const requests = {
	getRequest: (endpoint, params, fullUrl) => {
		let paramsString = "";
		if (!isUndefined(params)) {
			paramsString += "?";
			for (let i = 0; i < Object.keys(params).length; i++) {
				const end = i < Object.keys(params).length - 1 ? "&" : "";
				paramsString +=
					Object.keys(params)[i] +
					"=" +
					encodeURIComponent(params[Object.keys(params)[i]]) +
					end;
			}
		}
		if (isUndefined(fullUrl) || !fullUrl) {
			return fetch(environment.API_ENDPOINT + endpoint + paramsString, {
				method: "GET"
			})
				.then(res => {
					return res.json();
				})
                .then(e => {
                    return e;
                })
				.catch(e => {
					return { success: false, message: message, code: e };
				});
		} else {
			return fetch(endpoint + paramsString, {
				method: "GET"
			})
				.then(res => {
					return res.json();
				})
                .then(e => {
                    return e;
                })
				.catch(e => {
					return { success: false, message: message, code: e };
				});
		}
	},
	postRequest: (endpoint, data, fullUrl) => {
		if (isUndefined(fullUrl) || !fullUrl) {
			return fetch(environment.API_ENDPOINT + endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(data)
			})
				.then(res => {
					return res.json();
				})
                .then(e => {
                    return e;
                })
				.catch(e => {
					return { success: false, message: message, code: e };
				});
		} else {
			return fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: JSON.stringify(data)
			})
				.then(res => {
					return res.json();
				})
                .then(e => {
                    return e;
                })
				.catch(e => {
					return { success: false, message: message, code: e };
				});
		}
	},
	deleteRequest: (endpoint, data, fullUrl) => {
		if (isUndefined(fullUrl) || !fullUrl) {
			return fetch(environment.API_ENDPOINT + endpoint, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: JSON.stringify(data)
			})
				.then(res => {
					return res.json();
				})
                .then(e => {
                    return e;
                })
				.catch(e => {
					return { success: false, message: message, code: e };
				});
		} else {
			return fetch(endpoint, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(data)
			})
				.then(res => {
					return res.json();
				})
                .then(e => {
                    return e;
                })
				.catch(e => {
					return { success: false, message: message, code: e };
				});
		}
	},
	putRequest: (endpoint, data, fullUrl) => {
		if (isUndefined(fullUrl) || !fullUrl) {
			return fetch(environment.API_ENDPOINT + endpoint, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: JSON.stringify(data)
			})
				.then(res => {
					return res.json();
				})
                .then(e => {
                    return e;
                })
				.catch(e => {
					return { success: false, message: message, code: e };
				});
		} else {
			return fetch(endpoint, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(data)
			})
				.then(res => {
					return res.json();
				})
                .then(e => {
                    return e;
                })
				.catch(e => {
					return { success: false, message: message, code: e };
				});
		}
	},
};
