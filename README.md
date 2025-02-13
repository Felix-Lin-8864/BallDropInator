# BallDropInator

[![icon](https://i.imgur.com/vwr64NR.png)](https://chromewebstore.google.com/detail/ball-drop-inator/hgdpckafmcaepoijfhilcdginkignoen)

## The Project

### Aim
Primary Aim: To deploy a static, single-player web game

Secondary Aim: To develop frontend coding skills and learn ReactJS

### Composition
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

This project is a simple static web game compiled as a React app. React was chosen as the project required data to be frequently updated and displayed, and since it needed to be able to handle multiple individual "moving" parts smoothly. The Framer-Motion library was used to handle animations.

![Ball Animation](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXZoeDNmdTd3N3lmb3o1Z29qdTZxazFuZjB4azBnN2VpYWJtZG9lbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/u3a8Bq8A8kRMh6RZ9r/giphy.gif)

TypeScript (TSX) was chosen over JavaScript for the bulk of the project, as I desired greater control over typing for clarity and debugging.

### Deployment
This project is deployed as both a public chrome extension and website hosted on GitHub pages. These endpoints were chosen to maximise the game's exposure and accessibility, whilst balancing cost; Chrome Developer account incurs a minor fee, but published extensions are available to anyone with a Chrome account and easy to install; GitHub pages is a free hosting avenue for static websites that is accessible to all on the web. Deploying it as both a chrome extension and website involved utilising variable Vite configurations.

### Links
- [GitHub Repo](https://github.com/Felix-Lin-8864/BallDropInator)
- [GitHub Pages](https://felix-lin-8864.github.io/BallDropInator/)
- [Chrome Webstore Listing](https://chromewebstore.google.com/detail/ball-drop-inator/hgdpckafmcaepoijfhilcdginkignoen)
- [framer-motion](https://www.npmjs.com/package/framer-motion)

## The Game
![Gameplay](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjE4OWVia200OTN5aGp5bTJ5MXphdnJ3Z3M2ZTgwMmYwd25zMmw5ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KFYoVH1sVE1bd3BCqW/giphy.gif)

A simple ball drop game:
- Enter the ball's value and select the number of rows
- Drop balls down the peg-board and score points through multiplier-buckets
- Top-Up points whenever
