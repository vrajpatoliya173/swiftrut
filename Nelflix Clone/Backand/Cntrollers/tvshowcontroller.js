const fetchFromTMDB = require('../Services/tmdb.service');

module.exports.trandingtvshow = async (req, res) => {
	try {
		const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
		const randomtvshow = data.results[Math.floor(Math.random() * data.results?.length)];

		return res.status(200).json({ msg: 'Tranding Tvshows', status: 1, response: 'success', TarndingTvshow: randomtvshow });
	} catch (error) {
		return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
	}
}

module.exports.tvshowtrailer = async (req, res) => {
	try {
		const {id} = req.params;
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);

		if(data){
			return res.status(200).json({ msg: 'Tvshow Trailer', status: 1, response: 'success', Tvshowtrailer: data.results });
		}
		else{
			res.status(500).json({ success: false, message: "Internal Server Error" });
		}
		
	} catch (error) {
		return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
	}
}

module.exports.tvshowdetails = async (req, res) => {
	try {
		const {id} = req.params;
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);

		if(data){
			return res.status(200).json({ msg: 'Tvshow Details', status: 1, response: 'success', Tvshowdetails: data });
		}
		else{
			res.status(500).json({ success: false, message: "Internal Server Error" });
		}
		
	} catch (error) {
		return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
	}
}

module.exports.similartvshow = async (req, res) => {
	try {
		const {id} = req.params;
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);

		if(data){
			return res.status(200).json({ msg: 'Similar Tvshow', status: 1, response: 'success', Similartvshow: data });
		}
		else{
			res.status(500).json({ success: false, message: "Internal Server Error" });
		}
		
	} catch (error) {
		return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
	}
}

module.exports.tvshowcategory = async (req, res) => {
	try {
		const {category} = req.params;
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);

		if(data){
			return res.status(200).json({ msg: 'Tvshow Category', status: 1, response: 'success', Tvshowcategory: data });
		}
		else{
			res.status(500).json({ success: false, message: "Internal Server Error" });
		}
		
	} catch (error) {
		return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
	}
}