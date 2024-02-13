import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import TypesafeI18n from "@/locales/i18n-react";
import type { Locales } from "@/locales/i18n-types";
import { loadLocale } from "@/locales/i18n-util.sync";
import theme from "@/theme";
import { api, queryClient, trpcClient } from "@/utils/api/trpc/api";

const App = ({ Component, pageProps }: AppProps): ReactElement => {
    const locale = (useRouter().locale as Locales) ?? "en-US";
    const [localeLoaded, setLocaleLoaded] = useState(false);

    useEffect(() => {
        loadLocale(locale);
        setLocaleLoaded(true);
    }, [locale]);

    if (!localeLoaded) return <div>Loading application in {locale}...</div>;

    return (
        <QueryClientProvider client={queryClient}>
            <api.Provider queryClient={queryClient} client={trpcClient}>
                <ThemeProvider theme={theme}>
                    <TypesafeI18n locale={locale}>
                        <CssBaseline enableColorScheme>
                            <Component {...pageProps} />
                        </CssBaseline>
                    </TypesafeI18n>
                </ThemeProvider>
            </api.Provider>
        </QueryClientProvider>
    );
};

export default App;
