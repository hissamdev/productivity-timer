import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
    const router = useRouter();
    return (
        <View style={[styles.container]}>
            <TouchableOpacity
                onPress={() => router.push("/timer-focus-screen")}
                style={[
                    {
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        backgroundColor: "orange",
                        flex: 1,
                    },
                ]}
            >
                <Text>Timer</Text>
            </TouchableOpacity>
            <View
                style={[
                    {
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        backgroundColor: "yellow",
                        flex: 1,
                    },
                ]}
            >
                <Text>Countdown</Text>
            </View>
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
