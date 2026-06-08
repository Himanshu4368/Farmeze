import React, {
  useEffect,
  useState
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  getUserProfile,
  updateUserProfile
} from '../../api/authApi';

const languages = [
  {
    key: 'english',
    title: 'English'
  },
  {
    key: 'hindi',
    title: 'Hindi'
  },
  {
    key: 'punjabi',
    title: 'Punjabi'
  },
];

export default function LanguageSettings({
  navigation
}) {
  const [user, setUser] =
    useState(null);

  const [selectedLanguage, setSelectedLanguage] =
    useState('english');

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const storedUser =
        await AsyncStorage.getItem('user');

      if (!storedUser) {
        return;
      }

      const parsed =
        JSON.parse(storedUser);

      const userId =
        parsed.id || parsed._id;

      const profile =
        userId
          ? await getUserProfile(userId)
          : parsed;

      setUser(profile);
      setSelectedLanguage(profile.language || 'english');
      await AsyncStorage.setItem('user', JSON.stringify(profile));
    };

    loadProfile();
  }, []);

  const saveLanguage = async (language) => {
    try {
      setSaving(true);
      setSelectedLanguage(language);

      const userId =
        user?.id || user?._id;

      if (!userId) {
        await AsyncStorage.setItem('language', language);
        Alert.alert('Language', 'Language saved on this device');
        return;
      }

      const updatedUser =
        await updateUserProfile(
          userId,
          {
            ...user,
            language
          }
        );

      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      await AsyncStorage.setItem('language', language);

      Alert.alert('Language', 'Language updated');
    } catch (error) {
      Alert.alert(
        'Language',
        error.response?.data?.message ||
        'Unable to update language'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="arrow-back"
            size={26}
            color="white"
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>
          Language
        </Text>

        <View style={{ width: 26 }} />
      </View>

      <View style={styles.content}>
        {
          languages.map((language) => {
            const isSelected =
              selectedLanguage === language.key;

            return (
              <TouchableOpacity
                key={language.key}
                style={[
                  styles.languageRow,
                  isSelected && styles.languageRowSelected
                ]}
                disabled={saving}
                onPress={() =>
                  saveLanguage(language.key)
                }
              >
                <Text style={styles.languageText}>
                  {language.title}
                </Text>

                {
                  isSelected && (
                    <Icon
                      name="checkmark-circle"
                      size={24}
                      color="#25BB00"
                    />
                  )
                }
              </TouchableOpacity>
            );
          })
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FAF1'
  },

  header: {
    backgroundColor: '#25BB00',
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800'
  },

  content: {
    padding: 16
  },

  languageRow: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDEFD8',
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2
  },

  languageRowSelected: {
    borderColor: '#25BB00',
    backgroundColor: '#E7F6E2'
  },

  languageText: {
    color: '#1F2A1F',
    fontSize: 17,
    fontWeight: '800'
  }
});
