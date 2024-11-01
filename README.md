# rebar-adminpanel

[!IMPORTANT]
It's required that you go to your Rebar directory and setup some things first below are steps which have to be done before using the adminpanel

1. Go to ./webview/src/index.css
2. Add following code to it at the end of index.css

```
.neon-button {
    @apply w-full rounded-lg border-2 border-transparent px-4 py-3 text-left text-sm text-gray-200 hover:animate-pulse hover:border-red-500 hover:bg-opacity-75 hover:shadow-md;
}
```

3. Save it. Now just start the Server by either using pnpm dev or pnpm start let it compile and that's all

```
pnpm dev
pnpm start
```
