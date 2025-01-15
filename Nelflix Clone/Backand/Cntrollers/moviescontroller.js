const fetchFromTMDB = require('../Services/tmdb.service');

module.exports.trandingmovies = async (req, res) => {
	try {
		const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
		const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

		return res.status(200).json({ msg: 'Tranding Movies', status: 1, response: 'success', Tarndingmovies: randomMovie });
	} catch (error) {
		return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
	}
}

module.exports.movietrailer = async (req, res) => {
	try {
		const {id} = req.params;
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);

		if(data){
			return res.status(200).json({ msg: 'Movie Trailer', status: 1, response: 'success', Movietrailer: data.results });
		}
		else{
			res.status(500).json({ success: false, message: "Internal Server Error" });
		}
		
	} catch (error) {
		return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
	}
}

module.exports.moviedetails = async (req, res) => {
	try {
		const {id} = req.params;
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);

		if(data){
			return res.status(200).json({ msg: 'Movie Details', status: 1, response: 'success', Moviedetails: data });
		}
		else{
			res.status(500).json({ success: false, message: "Internal Server Error" });
		}
		
	} catch (error) {
		return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
	}
}

module.exports.similarmovies = async (req, res) => {
	try {
		const {id} = req.params;
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);

		if(data){
			return res.status(200).json({ msg: 'Similar Movies', status: 1, response: 'success', Similarmovies: data });
		}
		else{
			res.status(500).json({ success: false, message: "Internal Server Error" });
		}
		
	} catch (error) {
		return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
	}
}

module.exports.moviescategory = async (req, res) => {
	try {
		const {category} = req.params;
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);

		if(data){
			return res.status(200).json({ msg: 'Movies Category', status: 1, response: 'success', moviecategory: data });
		}
		else{
			res.status(500).json({ success: false, message: "Internal Server Error" });
		}
		
	} catch (error) {
		return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
	}
}