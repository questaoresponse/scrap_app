import messaging from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Mensagem recebida em segundo plano:', remoteMessage);
  // Aqui você pode, por exemplo, salvar no storage ou logar.
});
export default function App() {
  const [ token, setToken ] = useState("");
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
        setToken(token);
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
      <Text>Token: {token}</Text>
    </View>
  );
}
