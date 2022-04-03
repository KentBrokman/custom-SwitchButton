import React, { Dispatch, SetStateAction, useRef, useState } from "react"
import { Animated, Pressable } from "react-native"

interface SwitchButtonProps {
    value?: boolean,
    setValue?: Dispatch<SetStateAction<boolean>>,
    width?: number,
    height?: number,
    offBackgroundColor?: string,
    onBackgroundColor?: string,
    innerElemColor?: string
};

const useAnimateItemStyle = (switchOn = true, 
                             setValue: Dispatch<SetStateAction<boolean>>, 
                             height: number,
                             width: number,
                             innerElemHeight: number, 
                             innerElemWidth: number, 
                             offBackgroundColor: string, 
                             onBackgroundColor: string) => {
    const [isOn, setIsOn] = useState(switchOn);

    const animate_state = {
        start: (height - innerElemHeight) / 2,
        end: width - innerElemWidth - (height - innerElemHeight) / 2
    };
    const value = useRef(new Animated.Value(switchOn ? animate_state.end : animate_state.start)).current;

    const onPress = () => {
        setValue(!switchOn)
        Animated.timing(value, { toValue: isOn ? animate_state.start : animate_state.end, useNativeDriver: false, duration: 200 }).start()
        setIsOn(!isOn)
    };

    const inputRange = Object.values(animate_state);
    const translateX = value;
    const backgroundColor = value.interpolate({ inputRange, outputRange: [offBackgroundColor, onBackgroundColor] });

    return { translateX, backgroundColor, onPress };
};

export const SwitchButton: React.FC<SwitchButtonProps> = ({value = false, 
                                                           setValue = () => {}, 
                                                           width = 40, 
                                                           height = 22, 
                                                           offBackgroundColor = '#3CABAB', 
                                                           onBackgroundColor = '#EF5442', 
                                                           innerElemColor = '#FFFFFF'}) => {
    const innerElem = {
        height: height * 0.8,
        width: height * 0.8
    };
    const { onPress, translateX, backgroundColor } = useAnimateItemStyle(value, 
                                                                         setValue, 
                                                                         height, 
                                                                         width, 
                                                                         innerElem.height, 
                                                                         innerElem.width, 
                                                                         offBackgroundColor, 
                                                                         onBackgroundColor);

    return <Pressable onPress={onPress}>
        <Animated.View style={{ justifyContent: 'center',
                                width, 
                                height, 
                                borderRadius: height / 2, 
                                backgroundColor }}>
            <Animated.View style={{height: innerElem.height,
                                   width: innerElem.width,
                                   borderRadius: innerElem.height / 2,
                                   backgroundColor: innerElemColor,
                                   transform: [{ translateX }] }} />
        </Animated.View>
    </Pressable>
};
