import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
    const router = useRouter();
    return (
        <View
            style={{
                margin: 30,
                display: "flex",
                flexDirection: "row",
                gap: 30,
                height: 50,
            }}
        >
            <TouchableOpacity
                onPress={() => router.push("/timers/timer-focus-screen")}
                style={[
                    {
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        backgroundColor: "orange",
                        flex: 1,
                        borderRadius: 5,
                    },
                ]}
            >
                <Text>Timer</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => router.push("/timers/grouped-timers-screen")}
                style={[
                    {
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        backgroundColor: "yellow",
                        flex: 1,
                        borderRadius: 5,
                    },
                ]}
            >
                <Text>Grouped</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
