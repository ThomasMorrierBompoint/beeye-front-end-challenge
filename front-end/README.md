# front-end

> A Beeye front-end challenge project

## Personal Note

### Problems encountered
- Vuex logger is very slow (deepCopy), took me a while to figure it out.
  - Const TOTAL_SEASONS, MAX_TOP_PLAYERS, MAX_ROW are reduce in dev mode.
  - https://forum.vuejs.org/t/adding-many-objects-to-vuex-state-is-slow/10492/6;

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
