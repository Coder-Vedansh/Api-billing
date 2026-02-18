export default {
    plugins: {
        '@tailwindcss/postcss': {},
        autoprefixer: {}, // autoprefixer is usually included by default in v4 but explicit is fine if needed, though often redundant with v4's new engine. Actually, let's keep it simple as per v4 migration.
    },
}
