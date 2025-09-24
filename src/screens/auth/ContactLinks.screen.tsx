import {Linking, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {BLUE_DARK} from '../../styles/colors';
import ContactButton from '../../components/contact.button';
import {useConfiguration} from '../../hooks/useConfiguration';

const ContactsLinkScreen = () => {
  const {face, insta, linkdin, mail, phone, ytb} = useConfiguration();
  const handleCall = async () => {
    const url = phone?.val.trim() || '+524426688845';
    await Linking.openURL(url);
  };

  const handleSendEmail = async () => {
    const email = mail?.val || 'info@sabinocc.com';
    const url = `mailto:${email}?subject=Contacto`;
    await Linking.openURL(url);
  };

  const handleSendWhatsapp = async () => {
    const tel = phone?.val.trim() || '+524426688845';
    const url = `whatsapp://send?phone=${tel}`;
    await Linking.openURL(url);
  };

  const handleOpenFacebook = async () => {
    const profile = face?.val || 'SabinoConstruyendoComunidades';
    const url = `fb://profile/${profile}`;
    const support = await Linking.canOpenURL(url);
    if (support) {
      await Linking.openURL(url);
    } else {
      await Linking.openURL(profile);
    }
  };

  const handleOpenYoutube = async () => {
    const profile = ytb?.val || '';
    const support = await Linking.canOpenURL(profile);
    if (support) {
      await Linking.openURL(profile);
    }
  };

  const handleOpenInstagram = async () => {
    const profile = insta?.val || 'sabinocc_';
    const url = `instagram://user?username=${profile}`;
    const support = await Linking.canOpenURL(url);
    if (support) {
      await Linking.openURL(url);
    } else {
      await Linking.openURL(profile);
    }
  };

  const handleOpenTiktok = async () => {
    const url = 'snssdk1128://user/profile/sabino.cc';
    const support = await Linking.canOpenURL(url);
    if (support) {
      await Linking.openURL(url);
    } else {
      const fallbackUrl = 'https://www.tiktok.com/@sabino.cc';
      await Linking.openURL(fallbackUrl);
    }
  };

  const handleOpenLinkedin = async () => {
    const url = linkdin?.val || '';
    const support = await Linking.canOpenURL(url);
    if (support) {
      await Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor={BLUE_DARK} />
      <View style={style.grid}>
        <ContactButton
          iconName="phone"
          description="Llamenos"
          onPress={handleCall}
        />
        <ContactButton
          iconName="email"
          description="Escribenos"
          onPress={handleSendEmail}
        />
        <ContactButton
          iconName="whatsapp"
          description="Whatsapp"
          onPress={handleSendWhatsapp}
        />
      </View>
      <View style={{...style.grid, marginTop: 16}}>
        <ContactButton
          iconName="facebook"
          description="Facebook"
          onPress={handleOpenFacebook}
        />
        <ContactButton
          iconName="instagram"
          description="Instagram"
          onPress={handleOpenInstagram}
        />
        <ContactButton
          iconName="linkedin"
          description="Linkedin"
          onPress={handleOpenLinkedin}
        />
      </View>
      <View style={{...style.grid, marginTop: 16}}>
        <ContactButton
          iconName="youtube"
          description="Youtube"
          onPress={handleOpenYoutube}
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE_DARK,
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ContactsLinkScreen;
