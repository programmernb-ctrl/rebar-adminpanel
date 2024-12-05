# rebar-adminpanel

> [!IMPORTANT]
> Please read all installation steps to prevent unwanted behaviour

<a href='https://ko-fi.com/S6S3171498' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## Installation

1. Go to your Rebar `main` server's directory.

2. Now clone this repository in to your Rebar `main` directory using git commands.

```bash
cd path/to/your/rebar-altv/
git clone https://github.com/programmernb-ctrl/rebar-adminpanel.git src/plugins/rebar-adminpanel
```

3. If your character doesn't already have the admin group, you'll need to customize the config in `./shared/config.ts`

```typescript
export const adminpanelConfig = {
    adminMode: true, // true to see webview even if you don't got the admin group. mostly required to setup the plugin
};
```

4. Start the server once by using one of the below commands. The plugin will load __automatically.__

```
pnpm start
pnpm dev
```

5. Execute the `Give Admin` function.
6. After you've executed the __Give Admin__ function in the __webview__ make sure you set `adminMode: false,` in the config `./shared/config.ts`

```typescript
export const adminpanelConfig = {
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
