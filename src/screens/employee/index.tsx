import AppButton from '@/components/AppButton/AppButton';
import AppHeader from '@/components/AppHeader';
import AppLoading from '@/components/AppLoading';
import AppTextInput from '@/components/AppTextInput/AppTextInput';
import { getWorkspacesByBandnameAndUserId } from '@/firebase/workspace.firebase';
import { navigationRef } from '@/navigation';
import { setWorkspace } from '@/redux/slices/AppSlice';
import { RootState } from '@/redux/store';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { IMAGES } from '@/utils/theme/images';
import { s, vs } from '@/utils/theme/responsive';
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Card from './components/Card';
import Guide from './components/Guide';

const EmployeeScreen = () => {
  const insets = useSafeAreaInsets();
  const { brandname, account, workspace, employees, isFirstTimeWorkspace } = useSelector((state: RootState) => state.app);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const deferredSearch = useDeferredValue(search);
  const dispatch = useDispatch();
  const onCreateWorkplace = () => {
    navigationRef.navigate('CreateWorkplace');
  };
  const onAddEmployee = (workspaceId: string) => {
    Alert.alert('More Workplace', 'Connect to your account to create more workplaces', [
      { text: 'Cancel', style: 'default' },
      {
        text: 'Connect',
        style: 'default',
        isPreferred: true,
        onPress: () =>
          navigationRef.navigate('AddEmployeeToWorkplace', {
            workspaceId,
          }),
      },
    ]);
  };
  const onGetListWorkspace = useCallback(async () => {
    setIsLoading(true);
    const workspaces = await getWorkspacesByBandnameAndUserId(brandname, account?.id);
    dispatch(setWorkspace(workspaces));
    setIsLoading(false);
  }, [brandname, account?.id, dispatch]);
  const isEmpty = useMemo(() => workspace.length === 0, [workspace]);
  const isEmployeeEmpty = useMemo(() => employees.length === 0, [employees]);
  useEffect(() => {
    onGetListWorkspace();
  }, [onGetListWorkspace]);
  if (isFirstTimeWorkspace) {
    return (
      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <AppHeader
            isGoBack
            rightSection={
              <TouchableOpacity style={{ paddingRight: s(14) }} onPress={onCreateWorkplace}>
                <ICONS.CORE.ADD_WORKPLACE fill={COLORS.blue[5]} />
              </TouchableOpacity>
            }
          />
          <View style={styles.search}>
            <Text style={[FONTS.B34, { marginBottom: vs(8) }]}>Employees</Text>
            <AppTextInput
              containerInputStyle={{ gap: s(8), paddingVertical: vs(8) }}
              leftSection={<ICONS.CORE.SEARCH />}
              placeholder='Search'
              defaultValue={search}
              onChangeText={setSearch}
            />
          </View>
        </View>
        {!isLoading && <View style={[styles.body, styles.pt16, { backgroundColor: COLORS.green[1] }]}></View>}

        {isLoading && <AppLoading />}
        {!isLoading && <Guide />}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <AppHeader
          isGoBack
          rightSection={
            !isEmpty ? (
              <TouchableOpacity style={{ paddingRight: s(14) }} onPress={onCreateWorkplace}>
                <ICONS.CORE.ADD_WORKPLACE fill={COLORS.blue[5]} />
              </TouchableOpacity>
            ) : null
          }
          title={isEmployeeEmpty ? '' : 'Employees'}
        />
        {!isEmpty && (
          <View style={styles.search}>
            {isEmployeeEmpty && <Text style={[FONTS.B34, { marginBottom: vs(8) }]}>Employees</Text>}
            <AppTextInput
              containerInputStyle={{ gap: s(8), paddingVertical: vs(8) }}
              leftSection={<ICONS.CORE.SEARCH />}
              placeholder='Search'
              defaultValue={search}
              onChangeText={setSearch}
            />
          </View>
        )}
      </View>
      {!isEmpty && !isLoading && (
        <View style={[styles.body, styles.pt16, { backgroundColor: COLORS.green[1] }]}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 20,
              gap: vs(20),
            }}>
            {workspace.map((item) => (
              <Card key={item.id} workplace={item} onAddEmployee={() => onAddEmployee(item.id)} search={deferredSearch} />
            ))}
            <View style={{ height: vs(100) }} />
          </ScrollView>
        </View>
      )}
      {isEmpty && !isLoading && (
        <View
          style={[
            styles.body,
            {
              paddingHorizontal: 20,
              gap: vs(20),
            },
          ]}>
          <Text style={[FONTS.B34]}>Employees</Text>
          <View style={styles.empty_body}>
            <Image source={IMAGES.ILLUSTARTIONS.WORKSPACE} style={styles.image} />
            <Text style={styles.empty_text}>Create your first workplace</Text>
            <AppButton onPress={onCreateWorkplace} label='Create Workplace' buttonContainerStyle={styles.empty_button} />
          </View>
        </View>
      )}
      {isLoading && <AppLoading />}
    </View>
  );
};
export default EmployeeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
    backgroundColor: COLORS.white[1],
  },
  header: {
    backgroundColor: COLORS.white[1],
    paddingBottom: vs(10),
  },
  body: {
    flex: 1,
    backgroundColor: COLORS.white[1],
  },
  image: {
    width: s(320),
    height: vs(260),
    resizeMode: 'contain',
  },
  empty_body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty_text: {
    ...FONTS.R17,
    color: COLORS.blue[1],
    marginTop: vs(32),
    marginBottom: vs(20),
  },
  empty_button: {
    width: '100%',
  },
  search: {
    gap: s(8),
    paddingHorizontal: s(14),
  },
  pt16: {
    paddingTop: vs(16),
  },
});
