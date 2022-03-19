var router = require('express').Router();

module.exports = function (passport) {

	// Setting the naver oauth routes
	router.get('/naver',
		passport.authenticate('naver', null), function (req, res) {
			console.log('/auth/naver failed, stopped');
		});

	// creates an account if no account of the new user
	router.get('/naver/callback',
		passport.authenticate('naver', {
			failureRedirect: '#!/naver'
		}), function (req, res) {
			res.redirect('/');
		});

	return router;
}