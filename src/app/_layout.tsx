import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import * as SQLite from "expo-sqlite";
import { Text, View } from "react-native";
import migrations from "../../drizzle/migrations";

export const DATABASE_NAME = "timers";
const expo = SQLite.openDatabaseSync(DATABASE_NAME);
export const db = drizzle(expo);

export default function RootLayout() {
    const { success, error } = useMigrations(db, migrations);
    if (error) {
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
            <Stack />
        </SQLite.SQLiteProvider>
    );
}
