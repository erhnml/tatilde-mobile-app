import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DraggableFlatList from 'react-native-draggable-flatlist';

import Button from '../components/Button';

const AddAd = () => {
  const [images, setImages] = useState([]);

  const renderItem = useCallback(({item, index, drag, isActive}) => {
    return (
      <TouchableOpacity
        onLongPress={drag}
        style={{padding: 10}}
        disabled={isActive}>
        <Image
          style={styles.image}
          source={{uri: `data:${item.mime};base64,${item.data}`}}
        />
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={styles.wrapper}>
      <Button
        title="Select Ad Photos"
        onPress={() =>
          ImagePicker.openPicker({
            multiple: true,
            includeBase64: true,
          }).then(res => {
            console.log(res);
            setImages(res);
          })
        }
      />
      <View style={styles.dragWrapper}>
        {images.length > 0 && (
          <Text style={styles.infoText}>Long press to sort the images</Text>
        )}
        <DraggableFlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.filename}}`}
          onDragEnd={({data}) => setImages(data)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {width: '100%', height: 200},
  wrapper: {flex: 1, padding: 10},
  btnWrapper: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 4,
  },
  dragWrapper: {flex: 1, paddingTop: 10, marginTop: 20},
  infoText: {marginBottom: 10},
});

export default AddAd;
