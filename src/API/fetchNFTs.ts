import axios from 'axios';

const API_KEY = 'cqt_rQ4rjPvbKdDRJCTVHyDWxdhH4hPp';

export const fetchNFTs = async (page: number, size: number) => {
  try {
    const response = await axios.get(
      `https://api.covalenthq.com/v1/eth-mainnet/nft/0x8821bee2ba0df28761afff119d66390d594cd280/metadata/?page-size=${size}&page-number=${page}&key=${API_KEY}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
