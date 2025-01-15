const fetchFromTMDB = require('../Services/tmdb.service');
const user = require('../Models/users.model');

module.exports.searchperson = async (req, res) => {
	try {
        const { query } = req.params;
		const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

        if(response.results.length === 0){
            return res.status(400).send(null);
        }

        await user.findByIdAndUpdate(req.user._id,{
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    serchType: 'person',
                    createAt: new Date(),
                },
            },
        });

		return res.status(200).json({ msg: 'Search Result', status: 1, response: 'success', Serchcontent: response.results });

	} catch (error) {
		return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
	}
}

module.exports.searchmovie = async (req, res) => {
	try {
        const { query } = req.params;
		const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        if(response.results.length === 0){
            return res.status(400).send(null);
        }

        await user.findByIdAndUpdate(req.user._id,{
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    serchType: 'movie',
                    createAt: new Date(),
                },
            },
        });

		return res.status(200).json({ msg: 'Search Result', status: 1, response: 'success', Serchcontent: response.results });

	} catch (error) {
		return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
	}
}

module.exports.searchtvshow = async (req, res) => {
	try {
        const { query } = req.params;
		const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

        if(response.results.length === 0){
            return res.status(400).send(null);
        }

        await user.findByIdAndUpdate(req.user._id,{
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    serchType: 'tv',
                    createAt: new Date(),
                },
            },
        });

		return res.status(200).json({ msg: 'Search Result', status: 1, response: 'success', Serchcontent: response.results });

	} catch (error) {
		return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
	}
}

module.exports.searchhistory = async (req, res) => {
	try {

		return res.status(200).json({ msg: 'Search History', status: 1, response: 'success', SerchHistory: req.user.searchHistory });

	} catch (error) {
		return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
	}
}

module.exports.removehistory = async (req, res) => {
	try {
        const {id} = req.params;
        const did = parseInt(id);

        await user.findByIdAndUpdate(req.user._id, {
			$pull: {
				searchHistory: { id: did },
			},
		});

		return res.status(200).json({ msg: 'Item removed from search history', status: 1, response: 'success' });

	} catch (error) {
        console.log(error);
		return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
	}
}