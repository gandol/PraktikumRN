import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screen/home/HomeScreen';
import ProfileScreen from '../screen/ProfileScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Text, View} from 'react-native';
import PokemonDetail from '../screen/pokemon-detail/PokemonDetail';
import ChatDetail from '../screen/chat-detail/ChatDetail';
import ChatList from '../screen/chat-list/ChatList';

function BottomTabNavigator() {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      // tabBar={props => {
      //   return (
      //     <View
      //       style={{
      //         backgroundColor: 'red',
      //         borderTopLeftRadius: 18,
      //         borderTopRightRadius: 18,
      //       }}>
      //       <Text>Hello</Text>
      //     </View>
      //   );
      // }}
      screenOptions={props => {
        const {route} = props;
        const routeName = route.name;
        return {
          tabBarActiveTintColor: '#212226',
          tabBarInactiveTintColor: '#949BA5',

          tabBarIcon(props) {
            const {color, size} = props;
            let iconName;
            switch (routeName) {
              case 'Home':
                return <Feather name="home" size={size} color={color} />;
              case 'Contact':
                return <Fontisto name="persons" size={size} color={color} />;
              case 'Services':
                return <Feather name="settings" size={size} color={color} />;
              case 'Messages':
                return (
                  <Feather name="message-square" size={size} color={'green'} />
                );
              case 'Settings':
                return <Feather name="settings" size={size} color={color} />;
            }
          },
          tabBarStyle: {
            height: 60,
          },
          tabBarItemStyle: {
            backgroundColor: 'white',
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'EuclidCircularA-Medium',
          },
        };
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        // options={{
        //   tabBarIcon: ({color, size}) => (
        //     <Feather name="home" size={size} color={color} />
        //   ),
        // }}
      />
      <BottomTab.Screen
        name="Contact"
        component={ProfileScreen}
        // options={{
        //   tabBarIcon: ({color, size}) => (
        //     <Feather name="user" size={size} color={color} />
        //   ),
        // }}
      />
      <BottomTab.Screen name="Services" component={HomeScreen} />
      <BottomTab.Screen name="Messages" component={ChatList} />
      <BottomTab.Screen name="Settings" component={HomeScreen} />
    </BottomTab.Navigator>
  );
}

export default function MainNavigation() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeBottomTab"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Testing" component={ProfileScreen} />
      <Stack.Screen name="PokemonDetail" component={PokemonDetail} />
      <Stack.Screen name="ChatDetail" component={ChatDetail} />
    </Stack.Navigator>
  );
}
