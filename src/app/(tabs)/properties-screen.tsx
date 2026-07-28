import CreateProperty from "@/components/properties/create-property";
import Modal from "@/components/properties/modal";
import { Plus } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Milestones() {
    const [showModal, setShowModal] = useState(false);

    return (
        <View>
            <View
                style={{
                    margin: 20,
                    position: "relative",
                    height: "100%",
                }}
            >
                <View
                    style={{
                        marginTop: 50,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setShowModal((prev) => !prev)}
                        style={{
                            backgroundColor: "#4696FF",
                            borderRadius: 5,
                        }}
                    >
                        <Plus color="white" strokeWidth={1.3} size={20} />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 21,
                        }}
                    >
                        Milestones
                    </Text>
                </View>
                <Text
                    style={{
                        marginTop: 10,
                        width: "80%",
                    }}
                >
                    Update your properties daily and reflect on historic data
                </Text>
            </View>
            {showModal && (
                <Modal setShow={setShowModal}>
                    <CreateProperty setShowModal={setShowModal} />
                </Modal>
            )}
        </View>
    );
}
