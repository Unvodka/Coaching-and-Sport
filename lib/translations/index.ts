import fr from "./fr";
import en from "./en";
import type { TranslationKey } from "./fr";
import type { Locale } from "../types";

export type { TranslationKey };

const translations: Record<Locale, Record<TranslationKey, string>> = { fr, en };

export default translations;
