/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { ThemeProvider } from "@emotion/react";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import type { PropsWithChildren } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import theme from "./src/styles/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import { RootStackParamList, ScreenName } from "./src/types/Screen";
import CategoryScreen from "./src/screens/CategoryScreen";
import TodaysPhraseScreen from "./src/screens/TodaysPhraseScreen";
import GalleryScreen from "./src/screens/GalleryScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const [checkedTodaysPhrase, setCheckedTodaysPhrase] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <SafeAreaView
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {checkedTodaysPhrase ? (
              <Stack.Navigator initialRouteName={ScreenName.Categories}>
                <Stack.Screen
                  name={ScreenName.Categories}
                  component={CategoriesScreen}
                  options={{ title: "카테고리" }}
                />
                <Stack.Screen
                  name={ScreenName.Category}
                  component={CategoryScreen}
                  options={({ route }) => ({ title: route.params.category })}
                />
                <Stack.Screen
                  name={ScreenName.Gallery}
                  component={GalleryScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            ) : (
              <TodaysPhraseScreen
                handleClose={() => setCheckedTodaysPhrase(true)}
              />
            )}
          </SafeAreaView>
        </ThemeProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
