import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function GroupedTimersScreen() {
    const [timerGroups, setTimerGroups] = useState([
        {
            name: "Multitask",
            timers: [
                {
                    label: "Coding",
                    timer: 0,
                    running: false,
                },
                {
                    label: "Valorant",
                    timer: 0,
                    running: false,
                },
            ],
        },
    ]);

    return (
        <View>
            <Text>Hi</Text>
            <View
                style={{ display: "flex", flexDirection: "row", gap: 5 }}
            ></View>
            <View
                style={{
                    margin: 10,
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                }}
            >
                {timerGroups.map((group) => (
                    <TouchableOpacity
                        style={{
                            height: 50,
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#e1e1e1",
                        }}
                    >
                        <Text>{group.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
