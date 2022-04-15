import * as React from 'react';
import createCache from "@emotion/cache";
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
const cacheValue = createCache({
    key: "css",
    debug: true,
})
export default class MyDocument extends Document {
    render() {
        return (
            <Html lang='en' dir='ltr'>
                <Head>
                    <link rel='shortcut icon' href='/favicon.ico' />
                    <link rel='icon' type='image/png' href='/favicon.png' />
                    <link rel='apple-touch-icon' href='/favicon.png' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
MyDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;
    const { extractCriticalToChunks } = createEmotionServer(cacheValue);
    /* eslint-disable */
    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) =>
                <App emotionCache={cacheValue} {...props} />,
        });
    /* eslint-enable */
    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        styles: [
            ...React.Children.toArray(initialProps.styles),
            ...emotionStyleTags,
        ],
    };
};
