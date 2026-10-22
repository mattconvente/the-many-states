# The Many States
The Many States is a web application where people can create a personalized United States flag based on the states they've visited.

Each visible star in the flag's blue canton represents a visited state, and the stars are ordered based on each state's admission to the Union.

## Development

Use Node.js 24 LTS (also specified in `.nvmrc`) and npm. Configure the deployment environment to use Node.js 24 as well.

Commit `package-lock.json` when changing dependencies.

```sh
npm ci
npm run dev
```

Run `npm run lint` and `npm run build` before submitting changes.
