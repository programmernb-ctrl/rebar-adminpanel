# rebar-adminpanel

> [!IMPORTANT]
> It's required that you go to your Rebar directory
> and set up some things first before using the rebar-adminpanel plugin

## Installation

1. Go to your Rebar `main` server's directory and then to `./webview/src/index.css`
2. Add following code at the end of `index.css`

```css
.neon-button {
    @apply w-full rounded-lg border-2 border-transparent px-4 py-3 text-left text-sm text-gray-200 hover:animate-pulse hover:border-red-500 hover:bg-opacity-75 hover:shadow-md;
}
```

3. Now clone this repository in to your Rebar `main` directory using git commands

```bash
cd path/to/your/rebar-altv/
git clone https://github.com/programmernb-ctrl/rebar-adminpanel.git src/plugins/rebar-adminpanel
```

4. Once this has been done the plugin should load automatically after you start the server by one of the commands

```bash
pnpm start
pnpm dev
```

## Dependencies

- [Rebar Framework](https://github.com/stuyk/rebar-altv)
