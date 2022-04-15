import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../../styles/theme"
import { ThemeProvider } from "@mui/material/styles";
import Meta from "./Meta";
export default function ParentLayout({ children }) {
    const cacheValue = createCache({
        key: "css",
        debug: true,
    })
    return (
        <CacheProvider value={cacheValue}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Meta />
                {children}
            </ThemeProvider>
        </CacheProvider>
    )
}
