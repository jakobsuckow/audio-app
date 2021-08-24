import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Button, ColorSchemeName, Pressable } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import Record from "../screens/record";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

interface Props {
  colorScheme: ColorSchemeName;
}

const Navigation = (props: Props) => {
  const { colorScheme } = props;
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
      <Stack.Group screenOptions={{ presentation: "fullScreenModal" }}>
        <Stack.Screen name="Modal" component={Record} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <>
      <BottomTab.Navigator
        initialRouteName="TabOne"
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].tint,
        }}>
        <BottomTab.Screen
          name="TabOne"
          component={TabOneScreen}
          options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
            title: "Tab One",
            tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate("Modal")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <FontAwesome
                  name="info-circle"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            ),
          })}
        />
        <BottomTab.Screen
          name="TabTwo"
          component={TabTwoScreen}
          options={{
            title: "Tab Two",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
      </BottomTab.Navigator>
    </>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
