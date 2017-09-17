# Example: Wallaby with TypeScript/Jest using TSX

Minimal demo for the Wallaby [issue #1306](https://github.com/wallabyjs/public/issues/1306).

## The issue

When used with Wallaby.js 1.0.59, this setup should reproduce the following
error in the `Wallaby.js Tests` panel in VS Code (1.16.1):

```
​​TypeError: Object prototype may only be an Object or null: undefined​​
  at Object.<anonymous> ​src/Index.test.ts:1​
```

This is most likely referring to the following code:

```tsx
@Component
class Index extends Vue {   // <-- this line
  public render(createElement: CreateElement): VNode | null {
```

## Differences from the original setup

In the original setup, the error would point to the `class` line in the module
that's being tested. In this setup, it points to the `import` statement in the
test module.

In this setup, the Wallaby.js status indicator shows 10 tests passing, whereas
in the original setup, it always shows 0 passing. Either way, it does not match
what Jest shows when run from the CLI.
