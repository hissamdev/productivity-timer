import { drizzle } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import * as SQLite from "expo-sqlite";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
    const expo = SQLite.openDatabaseSync("db.db");
    const db = drizzle(expo);

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
                onPress={() => router.push("/timer/timer-single-screen")}
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
                onPress={() => router.push("/timer/timer-profiles-screen")}
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
