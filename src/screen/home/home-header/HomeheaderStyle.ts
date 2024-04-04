import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  imgContainer: {
    width: 48,
    height: 48,
    borderRadius: 30,
    backgroundColor: 'red',
  },
  containerContent: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  txtTitle: {
    fontFamily: 'EuclidCircularA-Bold',
    fontSize: 17,
    color: 'black',
  },
  txtSubTitle: {
    fontFamily: 'EuclidCircularA-Regular',
    color: '#949BA5',
  },
});
