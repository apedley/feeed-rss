import { Router } from 'express';
import Request from 'request';
import config from './config.json';
import feedlyUrls from './feedlyUrls.js'
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
		if (req.query.code) {
			const baseURL = "https://sandbox7.feedly.com/v3/auth/token";
			
					const code = req.query.code || '';
					const client_id = 'sandbox';
					const client_secret = config.clientSecret;
					const redirect_uri = encodeURIComponent('http://localhost:8080');
					const state = 'tokened';
					const grant_type = 'authorization_code';
			
					const url = `${baseURL}?code=${code}&client_secret=${client_secret}&state=${state}&grant_type=${grant_type}&redirect_uri=${redirect_uri}&client_id=${client_id}`;
			
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
		if (!req.query.feedlyResource || !req.query.token) {
			return res.send('Error');
		}

		const id = encodeURIComponent(req.query.fetchId)

		var options = {
			url: config.feedlyBaseUrl + feedlyUrls[req.query.feedlyResource](id),
			headers: {
				Authorization: 'Bearer ' + req.query.token
			}
		}


		Request.get(options, (err, response, body) => {
			if (err) {
				return res.send('ERROR: ' + err);
			}
			try {
			var json = JSON.parse(body)
				res.json(json);
			} catch (e) {
				res.send('ERROR PARSING JSON');
			}
		});
	});

	return api;
}
