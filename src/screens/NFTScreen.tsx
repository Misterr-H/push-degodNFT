import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import {fetchNFTs} from '../API/fetchNFTs';
import NFTItem from '../components/NFTItem';
import {getData} from '../util/Storage';

const NFTScreen = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [nfts, setNFTs] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [bookmarkedNFTs, setBookmarkedNFTs] = useState([]);
  const size = 10;

  const loadNFTs = async () => {
    setLoading(true);
    const data = await fetchNFTs(page, size);
    if (error) {
      setError(error);
    } else {
      setNFTs(refreshing || page === 0 ? data.items : [...nfts, ...data.items]);
      setCanLoadMore(data.pagination.has_more);
    }
    setLoading(false);
    setRefreshing(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    if (page === 0) {
      await loadNFTs();
      getData('bookmarkedNFTs').then((res: any) => {
        if (res) {
          setBookmarkedNFTs(res);
        }
      });
    }
    setPage(0);
  };

  const handleLoadMore = () => {
    if (!canLoadMore) {
      setError('No more data');
      return;
    }
    setPage(page + 1);
  };

  useEffect(() => {
    loadNFTs();
    getData('bookmarkedNFTs').then((res: any) => {
      if (res) {
        setBookmarkedNFTs(res);
      }
    });
  }, [page]);

  return (
    <View style={styles.container}>
      <FlatList
        data={nfts}
        renderItem={({item}) => (
          <NFTItem item={item} bookmarkedNFTs={bookmarkedNFTs} />
        )}
        keyExtractor={item => item?.nft_data?.token_id}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        numColumns={1}
      />
      {loading && <ActivityIndicator size="large" color="#000" />}
      {error && <Text>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f8',
    paddingHorizontal: '2%',
  },
});

export default NFTScreen;
