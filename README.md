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

3. Now clone this repository in to your Rebar `main` directory using git commands.

```bash
cd path/to/your/rebar-altv/
git clone https://github.com/programmernb-ctrl/rebar-adminpanel.git src/plugins/rebar-adminpanel
```

4. Should your character don't have the admin group you'll need to customize the config in `./shared/config.ts`

```typescript
export const = adminpanelConfig = {
    adminMode: true, // true to see webview even if you don't got the admin group. mostly required to setup the plugin
};
```

5. Start the server once by using one of the below commands. The plugin will load __automatically.__

```
pnpm start
pnpm dev
```

5. Execute the `Give Admin` function.
6. After you've executed the __Give Admin__ function in the __webview__ make sure you set `adminMode: false,` in the config `./shared/config.ts`

```typescript
export const = adminpanelConfig = {
    adminMode: false, // this needs to be set so member who dont got the admin group simply cant see the adminpanel.
}
```

7. Simply stop and start the server again to be sure __adminMode__ is set to __false__

## Update

- If you cloned this repo and wanna update it, you can simply do it like this.

```bash
cd path/to/your/rebar-altv/src/plugins/rebar-adminpanel
git pull
```

- If you forked this repo and wanna update it, simply search for `merge from upstream` on [Google](https://www.google.com)

## Dependencies

- [Rebar Framework](https://github.com/stuyk/rebar-altv)
