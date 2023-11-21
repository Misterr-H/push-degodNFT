import React, {useState, useCallback} from 'react';
import {View, FlatList} from 'react-native';
import NFTItem from '../components/NFTItem';
import {getData} from '../util/Storage';
import {useFocusEffect} from '@react-navigation/native';

const BookMarked = () => {
  const [bookmarkedNFTs, setBookmarkedNFTs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getData('bookmarkedNFTs').then((res: any) => {
        if (res) {
          setBookmarkedNFTs(res);
        }
      });
    }, []),
  );

  const onRefresh = () => {
    setRefreshing(true);
    getData('bookmarkedNFTs').then((res: any) => {
      if (res) {
        setBookmarkedNFTs(res);
      }
    });
    setRefreshing(false);
  };

  return (
    <View>
      <FlatList
        data={bookmarkedNFTs}
        renderItem={({item}) => (
          <NFTItem item={item} bookmarkedNFTs={bookmarkedNFTs} />
        )}
        keyExtractor={item => item?.nft_data?.token_id}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        numColumns={1}
      />
    </View>
  );
};

export default BookMarked;
