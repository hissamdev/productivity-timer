import { relations } from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";
import * as schema from "../db/schema";

export const DATABASE_NAME = "timers";
export const expoDb = SQLite.openDatabaseSync(DATABASE_NAME); // Exported to pass to useMigrations
export const db = drizzle(expoDb, { ...schema, ...relations });
