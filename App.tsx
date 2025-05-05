import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';

export default function App() {
  useEffect(() => {
    // Solicita permissão
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Permissão para notificações concedida!');
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
      }
    };

    // Listener para mensagens em primeiro plano
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Nova mensagem FCM', JSON.stringify(remoteMessage.notification));
    });

    requestPermission();

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>App com FCM!</Text>
    </View>
  );
}
