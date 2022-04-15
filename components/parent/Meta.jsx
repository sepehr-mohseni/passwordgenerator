import Head from 'next/head';
export default function Meta() {
    return (
        <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='keywords' content={'password, password generator, strong password'} />
            <meta name='description' content={'Generate Passwords for Your Account Easily!'} />
            <meta charSet='utf-8' />
            <link rel='icon' href='/favicon.ico' />
            <title>Pass Gen</title>
        </Head>
    )
}
