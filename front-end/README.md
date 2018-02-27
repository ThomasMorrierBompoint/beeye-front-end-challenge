# front-end

> A Beeye front-end challenge project

## Personal Note
- If you don't have Vue.js debugging chrome extension it's worth installing it!
  - [vue-devtools](https://github.com/vuejs/vue-devtools)

### Things that went well
- I'm glad I had time to gather most of the data. I started to display some parts but I needed more time.
  - I will continue this project for the next couple of days/weeks.
  - I probably put to much time around the state management [Vuex](https://vuex.vuejs.org) that's why I don't have much component to display.
  - I tried to keep a production level as much as I possibly could while playing around with new stuff.
  - It's been a very cool experience so far, thanks to giving me this opportunity.
- I've done some Vue.js before but I was fairly new to [Vuetify](https://vuetifyjs.com).
  - The learning curve is pretty smooth because it is well documented, thx to the awesome Vue.js community.
  - I focused on desktop interfaces leaving mobile for a future version.
- I tried a verbose coding style (longer variables/functions name).
  - It's daunting/difficult and I'm not sure it would pay off in the long run but I'm glad I've tried it.
- I didn't have time to do every thing I wanted and I will surely continue to improve this project.

### Some ideas that I thought would be nice to add (I may try few of them later on)
- More visualization components
- Testing (I didn't do anything but config setup is ready)
- Proper caching handling (Web Workers / IndexedDB)
- Translation EN/FR using [vue-i18n](https://kazupon.github.io/vue-i18n/en/)
- Server side rendering using [Nuxt](https://nuxtjs.org/) (Sending out App initial state = less loading)
- Server service to bridge API calls and process the data (Abstract layer)

### Problems encountered
- To be honest I was a little overwhelmed at first by the amount of data.
  - I've work with API's before but I kind of forgot how much time it takes to get proficient with the data model/flow.
  - More precisely I had a hard time figuring out how/when I would fetch the data without affecting the user experience.
  - I ended up loading everything at start thinking I could improve later on.
    - I thought I could use localStorage as a quick fix but it turn out to be impossible.
    - LocalStorage quota exceeded error.
    - I'm not totally happy with the out come but I have no time to solve this issue.
    - One solution could be to display last season (12) then lock the user in that view while loading the data.
  - Data model is a bit messy. I'm still in a draft coding mode.
  - I like to play around with data before I fix my ideas.
  - I worked as fast as I could while keeping the code not to hard to refactor.
- [Vuex](https://vuex.vuejs.org) logger is very slow because of (deepCopy function), took me a while to figure it out.
  - Quick fix Const TOTAL_SEASONS, MAX_TOP_PLAYERS, MAX_ROW are reduce in DEV mode.
  - A better solution would be to merge a couple of commit together making fewer call to deepCopy.
- [Airbnb linter](https://github.com/airbnb/javascript) is too aggressive. I should have gone with something less restrictive it is a bit annoying (I would over right some rules if I had more time).
- Routing Tabs need to be fixed (Bind Selected tab with url path)

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
