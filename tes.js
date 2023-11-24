const axios = require('axios');

const getTopDestinations = async () => {
  const options = {
    method: 'GET',
    url: 'https://apidojo-booking-v1.p.rapidapi.com/locations/top-destinations',
    params: {
      languagecode: 'en-us'
    },
    headers: {
      'X-RapidAPI-Key': '83de9873c8mshd95451e002716ddp19dd66jsn6933aa771f2e',
      'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

// Call the function to get top destinations
console.log(getTopDestinations());
