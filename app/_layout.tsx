import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Head from "expo-router/head";
import "../global.css";

export default function RootLayout() {
  return (
    <>
      <Head>
        <link rel="icon" type="image/jpeg" href="/assets/images/yamada_ryo.png" />
      </Head>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
    

  );
}
