import { Tabs } from "expo-router";
import { Clock3, Layers } from "lucide-react-native";
("lucide-react-native");

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Timer Profiles",
                    tabBarIcon: () => <Layers strokeWidth={1.4} />,
                }}
            />
            <Tabs.Screen
                name="timer-single-screen"
                options={{
                    title: "Single Timer",
                    tabBarIcon: () => <Clock3 strokeWidth={1.4} />,
                }}
            />
        </Tabs>
    );
}
