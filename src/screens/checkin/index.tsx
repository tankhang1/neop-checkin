import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import AppDivider from '@/components/AppDivider/AppDivider';
import AppSegmentControl from '@/components/AppSegmentControl/AppSegmentControl';
import AppTextInput from '@/components/AppTextInput/AppTextInput';
import { navigationRef } from '@/navigation';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { IMAGES } from '@/utils/theme/images';
import { height, s, vs, width } from '@/utils/theme/responsive';
import { THEME } from '@/utils/theme/theme';
import { useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

enum OPTION_ENUM {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  QR_DISPLAY = 'QR_DISPLAY',
}
const options = [
  {
    label: 'Admin',
    key: OPTION_ENUM.ADMIN,
    image: IMAGES.ILLUSTARTIONS.ADMIN,
    backgroundColor: '#EAFBFF',
    imageWidth: 322,
    imageHeight: 260,
  },
  {
    label: 'Employee',
    key: OPTION_ENUM.EMPLOYEE,
    image: IMAGES.ILLUSTARTIONS.EMPLOYEE,
    backgroundColor: '#F9E6D1',
    imageWidth: 220,
    imageHeight: 260,
  },
  {
    label: 'QR Display',
    key: OPTION_ENUM.QR_DISPLAY,
    image: IMAGES.ILLUSTARTIONS.QRCODE,
    backgroundColor: '#E0EED9',
    imageWidth: 276,
    imageHeight: 280,
  },
];

const CheckinScreen = () => {
  // STATE
  const [selectedOption, setSelectedOption] = useState(OPTION_ENUM.ADMIN);
  const [brandName, setBrandName] = useState('');
  const [oneTimePassword, setOneTimePassword] = useState('');

  // REF
  const scrollRef = useRef<ScrollView>(null);
  const bottomScrollRef = useRef<ScrollView>(null);

  // RENDER

  return (
    <AppContainer withSafeArea={false}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: COLORS.white[1] }}>
        <View style={styles.container}>
          <ScrollView
            horizontal
            style={{ backgroundColor: COLORS.white[1] }}
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            scrollEnabled={false}>
            {options?.map((option, index) => (
              <View style={[styles.imageCont, { backgroundColor: option.backgroundColor }]} key={index}>
                <Image source={option.image} style={{ width: option.imageWidth, height: option.imageHeight }} />
              </View>
            ))}
          </ScrollView>
          <View style={styles.modalCont}>
            <View style={styles.body}>
              <ICONS.LOGO.MD style={{ alignSelf: 'center' }} />
              <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={bottomScrollRef} scrollEnabled={false}>
                <View style={[styles.bottomCont, { paddingVertical: vs(32) }]}>
                  <AppTextInput
                    label='Brand Name'
                    placeholder='Input your Brand Name'
                    value={brandName}
                    onChangeText={setBrandName}
                  />
                  <AppButton label='Start' disable={!brandName} />
                </View>
                <View style={[styles.bottomCont, { paddingVertical: vs(44) }]}>
                  <Text style={{ ...FONTS.R17, color: COLORS.blue[1], textAlign: 'center' }}>Scan your Invitation QRcode</Text>
                  <AppButton
                    label='Scan'
                    onPress={() => {
                      navigationRef.navigate('CreateEmployee');
                    }}
                  />
                </View>
                <View style={[styles.bottomCont, { paddingVertical: vs(32), gap: vs(20) }]}>
                  <AppButton
                    label='Scan'
                    onPress={() => {
                      navigationRef.navigate('QrDisplay');
                    }}
                  />
                  <Text style={{ ...FONTS.R17, color: COLORS.blue[1], textAlign: 'center' }}>Or input One Time Password</Text>
                  <AppTextInput
                    placeholder='Input number'
                    value={oneTimePassword}
                    onChangeText={setOneTimePassword}
                    rightSection={
                      <TouchableOpacity disabled={!oneTimePassword}>
                        <Text style={{ ...FONTS.M17, color: COLORS.blue[5] }}>Submit</Text>
                      </TouchableOpacity>
                    }
                  />
                </View>
              </ScrollView>
              <View style={{ paddingHorizontal: THEME.PADDING_HORIZONTAL, gap: vs(32) }}>
                <AppDivider />
                <AppSegmentControl
                  selectedOption={selectedOption}
                  options={options}
                  onChange={(val) => {
                    setSelectedOption(val as OPTION_ENUM);
                    const index = options.findIndex((opt) => opt.key === val);
                    scrollRef.current?.scrollTo({ x: index * width, animated: true });
                    bottomScrollRef.current?.scrollTo({ x: index * width, animated: true });
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageCont: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: vs(60),
    width: width,
    paddingTop: vs(100),
  },
  modalCont: {
    backgroundColor: COLORS.white[1],
    flex: 1,
    borderTopLeftRadius: s(12),
    borderTopRightRadius: s(12),
    height: height * 0.8,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 }, // negative height since it's at the top
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Android shadow
    elevation: 6,
  },
  bottomCont: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    gap: vs(32),
    width: width,
  },
  body: {
    paddingVertical: vs(36),
    //paddingHorizontal: THEME.PADDING_HORIZONTAL,
  },
});
export default CheckinScreen;
