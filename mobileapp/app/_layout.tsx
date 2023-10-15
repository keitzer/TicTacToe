import { Stack } from 'expo-router';
import { GlobalStateProvider } from '@/state/GlobalState';

export default function Layout() {
  return (
    <GlobalStateProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </GlobalStateProvider>
  );
}
