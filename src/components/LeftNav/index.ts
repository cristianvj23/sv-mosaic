export { default } from "./LeftNav";
export * from "./LeftNavTypes";

import localeData from "./LeftNavLocales.json";
import { addCoreResourceBundle } from "@root/i18n";

addCoreResourceBundle({
	prefix : "LeftNav",
	bundle : localeData
});
