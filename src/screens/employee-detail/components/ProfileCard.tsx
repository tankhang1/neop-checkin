import AppBottomSheet from '@/components/AppBottomSheet';
import AppButton from '@/components/AppButton/AppButton';
import AppHeader from '@/components/AppHeader';
import AppRadio from '@/components/AppRadio';
import AppTextInput from '@/components/AppTextInput/AppTextInput';
import { navigationRef } from '@/navigation';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { vs } from '@/utils/theme/responsive';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProfileCard = () => {
  const [openedEdit, setOpenedEdit] = React.useState(false);
  const onInvitationQrCode = () => {
    navigationRef.navigate('InvitationQrCode');
  };
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>NP</Text>
        </View>
        <View style={{ flex: 1, gap: vs(4) }}>
          <Text style={styles.name}>Nam Phan</Text>
          <Text style={styles.role}>Manager - Canada</Text>
        </View>
        <TouchableOpacity onPress={() => setOpenedEdit(true)}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        {/* Email */}
        <View style={styles.row}>
          <ICONS.CORE.EMAIL />
          <Text style={styles.text}>namphan@gmail.com</Text>
        </View>

        {/* Phone */}
        <View style={styles.row}>
          <ICONS.CORE.PHONE />
          <Text style={[styles.text, { color: '#aaa' }]}>Empty</Text>
        </View>
      </View>
      <AppButton
        onPress={onInvitationQrCode}
        variant='outline'
        label='Generate Invitation QRcode'
        buttonStyle={{
          borderColor: COLORS.blue[5],
        }}
        labelStyle={{
          ...FONTS.M17,
          color: COLORS.blue[5],
        }}
      />
      <AppBottomSheet visible={openedEdit} onClose={() => setOpenedEdit(false)}>
        <View>
          <AppHeader
            leftSection={
              <TouchableOpacity>
                <Text style={[FONTS.R17, { color: COLORS.blue[5] }]}>Cancel</Text>
              </TouchableOpacity>
            }
            title='Edit'
          />
          <View style={{ gap: vs(16) }}>
            <View style={{ marginTop: vs(20) }}>
              <Text style={[FONTS.M17, { color: COLORS.blue[1] }]}>Position</Text>
              <View style={styles.radio_group}>
                <View style={{ flex: 1 }}>
                  <AppRadio label='Staff' />
                </View>
                <View style={{ flex: 1 }}>
                  <AppRadio label='Manager' />
                </View>
              </View>
            </View>
            <AppTextInput label='Workplace' placeholder='Canada' rightSection={<ICONS.CORE.CHERVON_DOWN />} />
            <AppButton label='Create' />
          </View>
        </View>
      </AppBottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white[1],
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: vs(6),
    marginBottom: vs(16),
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d9c8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 17,
  },
  avatarText: {
    fontWeight: 'bold',
    color: '#444',
  },
  name: {
    ...FONTS.M17,
    color: COLORS.blue[1],
  },
  role: {
    ...FONTS.R17,
    color: COLORS.blue[2],
  },
  edit: {
    ...FONTS.R17,
    color: COLORS.blue[5],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  text: {
    marginLeft: 8,
    ...FONTS.R17,
    color: COLORS.blue[1],
  },
  button: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.blue[5],
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  info: {
    gap: vs(4),
    marginBottom: vs(16),
  },
  radio_group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vs(8),
  },
});

export default ProfileCard;
