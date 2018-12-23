# LineToday Project (typescript + react + redux)
I design it to a single page application because there are many DOMs are not necessary to be changed when routing to other pages. I use typescript this time because I would

## § Install
```
npm install
```
Or
```
yarn install
```

## § Execute project command
Development mode with webpack-dev-server
```
yarn start
```
Production
```
yarn build
```

## Library
I did not use any third-party css library to build the view.

The following is  the libraries that I used. 

* [Node.js](https://nodejs.org/en/)
* [Webpack 4.x](https://webpack.js.org/)
* [ECMAScript 7.0 / Babel](https://babeljs.io/learn-es2015/)
* [React](https://facebook.github.io/react/)
* [Redux](https://github.com/reduxjs/redux)
* [React-lazyload](https://github.com/jasonslyvia/react-lazyload)
* [Typescript](https://github.com/Microsoft/TypeScript)

## Project Structure
```
src/
	/assets
	/components
	/models
	/pages
	/utils
```

## Design
I split view to many basic components. A component contains styles and javaScript itself, and I compose these basic components to module. A module contains many components, and have some functions use to control specific features. Finally, many modules constitute a page.

## Models
I transfer the JSON file to a static javaScript object since cross-domain issue.

## Public components
Extract some components to be public, then it can be reused.

* Button
* Ariticle
     All news of page. Can change its styles in each modules.
* PopupList
     A public list that attach to a component or DOM, ex: dropdown
* Slider

## Pages
### Home
there is only one page in this project. When route to the other category of news, it only re-render essential parts of dom.
I module its structure to three components:
    - header
    Control navigation. It can scroll or drag in mobile mode.
    - container
    Present corresponding news of category and public news list.  I use react-lazyload on images let the efficacy of loading will be raise.

## RWD design
Every components in this project will change its styles to mobile styles if the screen width is less than 1024px

## Redux
I use redux store to store active categoryId, categories, categoryList and isMobile, and use reselect to memorize some derivative data.

## HOC
* DetectWindowWidth
A component that can detect changes of window’s width and pass this information to wrapped components as props.
