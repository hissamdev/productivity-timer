import { useProfileStore } from "@/components/state-management/useProfileStore";
import { DATABASE_NAME, db, expoDb } from "@/db/db";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Tabs } from "expo-router";
import * as SQLite from "expo-sqlite";
import { useEffect } from "react";
import { Text, View } from "react-native";
import migrations from "../../drizzle/migrations";

export default function RootLayout() {
    const { success, error } = useMigrations(db, migrations);
    useDrizzleStudio(expoDb);

    const { initProfiles } = useProfileStore();
    useEffect(() => {
        initProfiles();
    }, []);

    if (error) {
        console.log(error);
        return (
            <View>
                <Text>Migration error: {error.message}</Text>
            </View>
        );
    }

    if (!success) {
        return (
            <View>
                <Text>Migration in progress...</Text>
            </View>
        );
    }

    return (
        <SQLite.SQLiteProvider
            databaseName={DATABASE_NAME}
            options={{ enableChangeListener: true }}
        >
            <Tabs>
                <Tabs.Screen
                    name="index"
                    options={{ title: "Timer Profiles" }}
                />
            </Tabs>
        </SQLite.SQLiteProvider>
    );
}
