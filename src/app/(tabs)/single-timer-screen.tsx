import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SingleTimerScreen() {
    return (
        <View style={{ backgroundColor: "black", height: "100%" }}>
            <View style={{ marginTop: 30 }}>
                <Text style={{ color: "white" }}>hi</Text>
            </View>
            <View style={{ marginTop: 180, marginHorizontal: 10 }}>
                <Text
                    style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 60,
                    }}
                >
                    00:00:00
                </Text>
                <View
                    style={{
                        marginTop: 55,
                        marginHorizontal: 10,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[
                            { backgroundColor: "#212121" },
                            styles.buttonBase,
                        ]}
                    >
                        <Text style={{ color: "white" }}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[
                            { backgroundColor: "#1B3D0F" },
                            styles.buttonBase,
                        ]}
                    >
                        <Text style={{ color: "white" }}>Start</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonBase: {
        aspectRatio: 1 / 1,
        width: 70,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "100%",
    },
});
