import { Router } from 'express';
import Request from 'request';
import feedlyEndpoints from './feedlyEndpoints';

const validateAndSendJSON = (req, res, body) => {
	if (typeof body !== 'string') {
		return res.json(body)
	}
	try {

		var json = JSON.parse(body)
			if (json.errorCode) {
				res.status(json.errorCode).send({ 
					error: {
						id: json.errorId,
						message: json.errorMessage,
						code: json.errorCode
					}
				})
			} else {
				res.json(json);
			}
		} catch (e) {
			
			res.json({
				message: 'could not parse json response',
				error: e
			});
		}
}
export default ({ config }) => {
	let api = Router();

	// mount the facets resource
	api.get('/auth', (req, res) => {

		const baseURL = "https://sandbox7.feedly.com/v3/auth/auth";
		
		const redirect_uri = "http://localhost:8080";
		const scope = encodeURIComponent("https://cloud.feedly.com/subscriptions");
		const client_id = "sandbox";
		const response_type = "code";
		
		const url = `${baseURL}?client_id=${client_id}&response_type=${response_type}&redirect_uri=http%3A%2F%2Flocalhost%3A8080&scope=${scope}`;
		
		Request.get(url, (err, response, body) => {
			if (err) {
				return res.send('ERROR: ' + err);
			}
			
			body = body.replace(new RegExp("/images/", 'g'), "https://sandbox7.feedly.com/images/");
			res.send(body);
		})
	});

	api.get('/token', (req, res) => {
		if (req.query.code || req.query.refresh_token) {
			const baseURL = "https://sandbox7.feedly.com/v3/auth/token";
			
					const client_id = 'sandbox';
					const client_secret = config.clientSecret;
					const redirect_uri = encodeURIComponent('http://localhost:8080');
					const state = 'tokened';

					let grant_type;
					let url;

					if (req.query.code) {
						grant_type = 'authorization_code';
						const code = req.query.code || '';
						url = `${baseURL}?code=${code}&client_secret=${client_secret}&state=${state}&grant_type=${grant_type}&redirect_uri=${redirect_uri}&client_id=${client_id}`;
					} else if (req.query.refresh_token) {
						grant_type = 'refresh_token';
						const refresh_token = req.query.refresh_token;
						url = `${baseURL}?refresh_token=${refresh_token}&client_secret=${client_secret}&grant_type=${grant_type}&client_id=${client_id}`;
					}
					Request.post(url, (err, response, body) => {
						
						if (err) {
							return res.send('ERROR: ' + err);
						}
						var json = JSON.parse(body);
						if (json.access_token) {
							res.redirect(config.webLoggedInLink + "?access_token=" + json.access_token + "&refresh_token=" + json.refresh_token + "&id=" + json.id);
						} else {
							res.send('error');
						}
					})
		} else {
			res.send('ok');
		}


	})
	

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		if (req.query.code) {
			res.redirect('/token?code=' + req.query.code);
		} else {
			res.send('okay');
		}
	});

	api.get('/request', (req, res) => {
		if (!req.query.feedlyEndpoint || !req.query.token) {
			return res.send('Error');
		}

		const id = encodeURIComponent(req.query.fetchId)
		const endpoint = feedlyEndpoints[req.query.feedlyEndpoint];
		
		if (config.mockApi) {
			if (endpoint.mockResponseBody) {

				const body = endpoint.mockResponseBody
				
				return validateAndSendJSON(req, res, body);
			}
		}
		var options = {
			url: config.feedlyBaseUrl + endpoint.getUrl(id),
			method: endpoint.method,
			headers: {
				Authorization: 'Bearer ' + req.query.token
			}
		}

		console.warn('API request');

		if (options.method === 'POST') {
			
			const data = Object.assign({}, req.query);
			delete data.token;
			delete data.feedlyEndpoint;

			options.body = data;
			options.json = true;
		}
		Request(options, (err, response, body) => {
			
			if (err) {
				return res.send('ERROR: ' + err);
			}

			return validateAndSendJSON(req, res, body);
		});
	});

	return api;
}
