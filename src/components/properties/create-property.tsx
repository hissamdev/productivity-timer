import { createProperty } from "@/utils/propertyHelpers";
import { X } from "lucide-react-native";
import { SetStateAction, useState } from "react";
import {
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
    setShowModal: React.Dispatch<SetStateAction<boolean>>;
};

export default function CreateProperty({ setShowModal }: Props) {
    const [icon, setIcon] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [color, setColor] = useState("");
    const colorSet = [
        {
            color: "#EF4444",
            label: "Red",
        },
        {
            color: "#F59E0B",
            label: "Amber",
        },
        {
            color: "#10B981",
            label: "Emerald",
        },
        {
            color: "#3B82F6",
            label: "Blue",
        },
        {
            color: "#8B5CF6",
            label: "Violet",
        },
    ];

    const handlePropertySubmit = async () => {
        const info = {
            icon,
            name,
            type,
            color,
        };

        await createProperty(info);
    };

    return (
        <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{
                paddingTop: 20,
                paddingBottom: 40,
                paddingHorizontal: 20,
                width: "100%",
                height: "100%",
                borderRadius: 18,
                backgroundColor: "white",
            }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text
                    style={{
                        fontSize: 19,
                        fontWeight: 600,
                    }}
                >
                    Create Property
                </Text>
                <View>
                    <TouchableOpacity
                        onPress={() => setShowModal(false)}
                        style={{
                            padding: 5,
                            flex: 0,
                            borderWidth: 1,
                            borderColor: "#94A3B8",
                            borderRadius: 4,
                        }}
                    >
                        <X size={16} />
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={{
                    marginTop: 20,
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    gap: 15,
                }}
            >
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                    }}
                >
                    <Text>Icon</Text>
                    <TextInput
                        style={{
                            width: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            aspectRatio: 1 / 1,
                            borderWidth: 1,
                            borderColor: "black",
                        }}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        display: "flex",
                        gap: 4,
                    }}
                >
                    <Text>Name</Text>
                    <TextInput
                        onChangeText={setName}
                        value={name}
                        style={{
                            width: "100%",
                            borderWidth: 1,
                            borderColor: "black",
                        }}
                    />
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                <Text>Property Type</Text>
                <TextInput
                    onChangeText={setType}
                    value={type}
                    style={{
                        marginTop: 5,
                        width: "100%",
                        borderWidth: 1,
                        borderColor: "black",
                    }}
                />
            </View>

            <View style={{ marginTop: 20 }}>
                <Text>Select Color</Text>
                <View
                    style={{
                        marginTop: 10,
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                    }}
                >
                    {colorSet.map((color) => (
                        <Pressable
                            onPress={() => setColor(color.color)}
                            key={color.color}
                            style={{
                                width: 20,
                                aspectRatio: 1 / 1,
                                backgroundColor: color.color,
                                borderRadius: "100%",
                            }}
                        />
                    ))}
                </View>
            </View>

            <TouchableOpacity
                style={{
                    marginTop: "auto",
                    backgroundColor: "black",
                    borderRadius: 8,
                }}
            >
                <Text
                    style={{
                        paddingVertical: 13,
                        textAlign: "center",
                        fontSize: 15,
                        color: "white",
                    }}
                >
                    Create Property
                </Text>
            </TouchableOpacity>
        </Pressable>
    );
}
