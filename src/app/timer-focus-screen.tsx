import { Text, View } from "react-native";

export default function TimerFocusScreen() {
    return (
        <View
            style={[
                {
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#2A2F33",
                },
            ]}
        >
            <View
                style={{
                    marginTop: 180,
                    padding: 4,
                    width: 261,
                    aspectRatio: 1,
                    backgroundColor: "white",
                    borderRadius: "100%",
                }}
            >
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#2A2F33",
                        borderRadius: "100%",
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 50,
                        }}
                    >
                        03:32
                    </Text>
                </View>
            </View>
        </View>
    );
}
