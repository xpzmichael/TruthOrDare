import React from "react";
import { View } from "react-native";
import IconButton from "./IconButton";
import { useSpinnerContext } from "@/hooks/SpinnerContext";

const toggleBoolean = (prev: boolean) => !prev;

const TopButtons = () => {
  const { setReset, locked, setLocked } = useSpinnerContext();
  return (
    <View className="flex-row justify-end items-center w-full h-12">
      <IconButton iconName="reload" onPress={() => setReset(toggleBoolean)} />
      {locked ? 
        <IconButton iconName="lock-closed" onPress={() => setLocked(false)} />
        :
        <IconButton iconName="lock-open-outline" onPress={() => setLocked(true)} />
      }
    </View>
  )
}

export default React.memo(TopButtons);