import React from 'react';
import {
  // Share,
  Dimensions,
  // StatusBar,
} from 'react-native';
// import Modal from 'react-native-modal';
import { Image, CacheManager } from 'react-native-expo-image-cache';
import styled from 'styled-components';
// import { HeaderBackButton } from 'react-navigation';
// import Swiper from 'react-native-swiper';
// import AssetUtils from 'expo-asset-utils';
// import { Title2, theme, CategoryHeader } from './ios';
// import shareIcon from './icons/share.png';
// import { getPhotoUrl } from '../utils';

const { width: deviceWidth } = Dimensions.get('window');

const View = styled.View`
  margin-top: 24;
  margin-bottom: 24;
`;

const PhotoContainer = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })`
  padding-horizontal: 16;
`;

const photoStyle = { borderRadius: 10, height: 320, width: deviceWidth - 32 };

const PhotosList = styled.FlatList`
  margin-horizontal: -16;
`;

// const GalleryContainer = styled.View`
//   flex: 1;
//   flex-direction: column;
//   /* background: #111; */
// `;

// const ButtonRow = styled.View`
//   justify-content: space-between;
//   width: ${width};
//   flex-direction: row;
//   padding-top: 30;
//   margin-bottom: 15;
//   align-items: center;
// `;

// const ShareButton = styled.TouchableOpacity`
//   padding-left: 40;
//   padding-right: 20;
// `;

// const Info = styled.View`
//   padding-horizontal: 16;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
// `;

// const Header = styled.View``;

// const Title = styled(Title2)`
//   color: ${theme.text};
//   margin-bottom: 10;
//   font-weight: ${theme.fonts.title1};
// `;

// const Pagination = styled.Text`
//   color: ${theme.paginationColor};
//   font-size: 15;
//   line-height: 14;
// `;

// const Icon = styled.Image`
//   width: 17;
//   height: 24;
//   tint-color: ${theme.buttonColor};
// `;

// const SwiperContainer = styled.View`
//   margin-vertical: 10;
//   flex: 1;
// `;

// const Spacer = styled.View`
//   height: 120;
// `;

const getPhotoUrl = id => `https://ucarecdn.com/${id}/`;

export default class PhotoGallery extends React.Component {
  // state = {
  //   modalVisible: false,
  //   currentIdx: 0,
  // };

  // fetchPhotoFile = async (photo) => {
  //   const { localUri } = await AssetUtils.resolveAsync(photo);
  //   return localUri;
  // };

  // onShare = async () => {
  //   const { photos } = this.props;
  //   const { currentIdx } = this.state;
  //   const name = photos[currentIdx];
  //   const localUri = await CacheManager.get(getPhotoUrl(name)).getPath();
  //   // await this.fetchPhotoFile(getPhotoUrl(name));

  //   if (localUri) {
  //     Share.share(
  //       {
  //         url: localUri,
  //       },
  //       {
  //         excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
  //       },
  //     );
  //   }
  // };

  // onPhotoPress = (idx) => {
  //   this.setState({
  //     modalVisible: true,
  //     currentIdx: idx,
  //   });
  // };

  // hideModal = () => {
  //   StatusBar.setBarStyle('light-content');
  //   this.setState({ modalVisible: false });
  // };

  // onBackPress = () => {
  //   this.hideModal();
  // };

  // onRequestClose = () => {
  //   this.hideModal();
  // };

  // onIndexChanged = (idx) => {
  //   this.setState({ currentIdx: idx });
  // };

  onImageLoad = async () => {
    // console.log('onImageLoad');
    const cacheSize = await CacheManager.getCacheSize();
    // console.log('cache size', cacheSize);

    if (cacheSize > 10000) {
      CacheManager.clearCache();
    }
  };

  renderItem = ({ item: url }) => (
    <PhotoContainer>
      <Image
        onLoad={this.onImageLoad}
        style={photoStyle}
        // resizeMethod="resize"
        resizeMode="cover"
        preview={{ uri: `${getPhotoUrl(url)}-/resize/x48/` }}
        uri={`${getPhotoUrl(url)}-/resize/x640/`}
      />
    </PhotoContainer>
  );

  render() {
    // function chunk(arr, n) {
    //   if (!arr.length) return [];
    //   return [arr.slice(0, n)].concat(chunk(arr.slice(n), n));
    // }
    const { photos = [] } = this.props;
    // const { modalVisible, currentIdx } = this.state;
    // const photosAmount = photos.length;

    return (
      <View>
        <PhotosList
          horizontal
          // ItemSeparatorComponent={Separator}
          // showsHorizontalScrollIndicator={false}
          indicatorStyle="white"
          data={photos}
          pagingEnabled
          keyExtractor={(item, index) => String(index)}
          renderItem={this.renderItem}
        />

        {/* <Modal
          isVisible={modalVisible}
          backdropOpacity={0.8}
          onSwipeComplete={this.hideModal}
          onBackdropPress={this.hideModal}
          swipeDirection={['up', 'down']}
          propagateSwipe
        >
          <GalleryContainer>
            <SwiperContainer>
              <Swiper
                loop={false}
                index={currentIdx}
                onIndexChanged={this.onIndexChanged}
                showsPagination={false}
              >
                {photos.map((url, index) => (
                  <Image
                    onLoad={this.onImageLoad}
                    style={{ flex: 1 }}
                    key={String(index)}
                    resizeMethod="resize"
                    resizeMode="contain"
                    preview={{ uri: `${getPhotoUrl(url)}/-/resize/x48/` }}
                    uri={`${getPhotoUrl(url)}/-/resize/x1024/`}
                  />
                ))}
              </Swiper>
            </SwiperContainer>
            <Spacer />
          </GalleryContainer>
        </Modal> */}
      </View>
    );
  }
}
