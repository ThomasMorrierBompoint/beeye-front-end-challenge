# front-end

> A Beeye front-end challenge project

## Personal Note

- TODO
  - In season-tabs onClick Hero Class Avatar
    - Display table information

### Things that went well
- I've done some Vue.js before but I was fairly new to Vuetify.
  - The learning curve is pretty smooth because it is well documented, thx to the awesome Vue.js community.
  - For this project I focus on desktop interfaces leaving mobile for a future version.
- I've try a more verbose approche to my coding style longer variables/functions name.
  - It's daunting/difficult and I'm not sure it will pay off in the end but I'm glad I tried it.
- I try to keep a production level as much as possible and play around with stuff that I never tried before.
- It's been a very cool experience thanks to giving me this opportunity.

### Problems encountered
- To be honest I was a litle overwhelmed by the amount of data at first.
  - More precisely I had a hard time figuring out how/when I would fetch the data without affecting the user experience.
  - I'm not totally happy with the out come. I thought I would be able to fix the high loading delay but I haven't found a good solution yet.
    - I thought I could use localStorage as a quick fix but it turn out to be impossible
      - LocalStorage quota exceed (their must be some other way to achieve this but I'll have to postpone this issue)
    - I would rather display last season (12) first, lock the user in that view while the rest is loading.
  - I've work with API's before but I kind of forgot how much time it takes to get very confortable with the data flow.
- Vuex logger is very slow because of (deepCopy function), took me a while to figure it out.
  - Quick fix Const TOTAL_SEASONS, MAX_TOP_PLAYERS, MAX_ROW are reduce in DEV mode.
  - A better solution would be to merge a couple of commit together making fewer call to deepCopy.
  - https://forum.vuejs.org/t/adding-many-objects-to-vuex-state-is-slow/10492/6.
- Airbnb Linter is too agressive. I should have gone with something less restrictive it is a bit anoying (I may over right some rules if I have time later on).
- Data model is a bit messy. I'm still in a draft mode. I like to play around with data before I fix my mind on a particular data set. I try to go fast and not go to specific to improve it once I refactor.
- Routing Tabs need to be fixed (Bind Selected tab with url path)
  - https://vuetifyjs.com/en/components/tabs

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
