# front-end

> A Beeye front-end challenge project

## Personal Note

### Things that went well
- I've done some Vue.js before but I'm fairly new to Vuetify.
  - It was pretty smooth it is well documented, the community is awesome.
  - I did the layout for computer interfaces leaving mobile for later on.

### Problems encountered
- To be honest I was a litle overwhelmed by the amount of data.
  - I've work with API's before but I kind of forgot how much time it takes to get very confortable with the data flow.
- Vuex logger is very slow because of (deepCopy function), took me a while to figure it out.
  - Quick fix Const TOTAL_SEASONS, MAX_TOP_PLAYERS, MAX_ROW are reduce in DEV mode.
  - A better solution would be to merge a couple of commit together making fewer call to deepCopy.
  - https://forum.vuejs.org/t/adding-many-objects-to-vuex-state-is-slow/10492/6.
- Airbnb Linter is too agressive. I should have gone with something less restrictive it is a bit anoying (I may over right some rules if I have time later on).
- Data model is a bit messy. I'm still in a draft mode. I like to play around with data before I fix my mind on a particular data set. I try to go fast and not go to specific to improve it once I refactor.

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
