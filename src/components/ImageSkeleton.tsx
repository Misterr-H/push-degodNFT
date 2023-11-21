import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ImageSkeleton = () => {
  return (
    <View>
      <SkeletonPlaceholder>
        <View style={styles.container} />
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 150,
    borderRadius: 20,
  },
});

export default ImageSkeleton;
