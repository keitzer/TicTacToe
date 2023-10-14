import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Game from '@/templates/Game/Game';
import GameList from '@/templates/GameList/GameList';

const Stack = createNativeStackNavigator();

const Home = () => (
  <Stack.Navigator>
    <Stack.Screen name="Game List" component={GameList} />
    <Stack.Screen name="Game" component={Game} />
  </Stack.Navigator>
);

export default Home;
