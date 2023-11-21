import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageSkeleton from './ImageSkeleton';
import Heart from '../Assets/Heart.svg';
import HeartFilled from '../Assets/HeartFilled.svg';
import {storeData} from '../util/Storage';
import {getData} from '../util/Storage';

const NFTItem = ({item, bookmarkedNFTs}: any, ref: any) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const onBookmarkPress = async () => {
    const bookmarkedNFTs = await getData('bookmarkedNFTs');
    if (bookmarkedNFTs) {
      const isNFTAlreadyBookmarked = bookmarkedNFTs.find(
        (nft: any) => nft?.nft_data?.token_id === item?.nft_data?.token_id,
      );
      if (isNFTAlreadyBookmarked) {
        const filteredNFTs = bookmarkedNFTs.filter(
          (nft: any) => nft?.nft_data?.token_id !== item?.nft_data?.token_id,
        );
        await storeData('bookmarkedNFTs', filteredNFTs);
        setIsBookmarked(false);
      } else {
        bookmarkedNFTs.push(item);
        await storeData('bookmarkedNFTs', bookmarkedNFTs);
        setIsBookmarked(true);
      }
    } else {
      await storeData('bookmarkedNFTs', [item]);
    }
  };

  useEffect(() => {
    if (bookmarkedNFTs) {
      const isNFTAlreadyBookmarked = bookmarkedNFTs.find(
        (nft: any) =>
          nft?.nft_data?.token_id !== undefined &&
          item?.nft_data?.token_id !== undefined &&
          nft?.nft_data?.token_id === item?.nft_data?.token_id,
      );
      if (isNFTAlreadyBookmarked) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
    }
  }, [bookmarkedNFTs, item?.nft_data?.token_id]);

  return (
    item?.nft_data.external_data?.image && (
      <View style={styles.item}>
        <FastImage
          source={{uri: item?.nft_data.external_data?.image}}
          style={[styles.itemImage, !isImageLoaded && {height: 0, width: 0}]}
          onLoadEnd={() => setIsImageLoaded(true)}
        />
        {!isImageLoaded && <ImageSkeleton />}
        <View style={styles.itemNameView}>
          <Text style={styles.itemName}>
            {item?.nft_data.external_data?.name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              onBookmarkPress();
            }}>
            {isBookmarked ? (
              <HeartFilled width={20} height={20} />
            ) : (
              <Heart width={20} height={20} />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.itemOwnerName}>
          Owner: {item?.nft_data?.original_owner}
        </Text>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    height: 250,
    width: 250,
    margin: 10,
    marginLeft: Dimensions.get('window').width / 2 - 250 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    padding: 10,
  },
  itemImage: {
    height: 150,
    width: 150,
    borderRadius: 20,
  },
  itemNameView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  itemOwnerName: {
    marginTop: 5,
    fontSize: 8,
    textAlign: 'center',
  },
});

export default React.memo(NFTItem);
