# react-native-appLinke

This is a trial development to develop an app for an existing web project in my company, which is built with webpack+react+flux.

Just think react-native as the view layer(like `V` in mvc), the other business logic like `M` and `C` (in mvc) can be using as a common module between the browser and app. So if I want to build a react-native app upon an existing react project, approximately, the only job i have to do is just to rebuild the view ! That's extremely simply the job!


### Note

This is a demo project , and this is just a beginning...

### Run

- Because of the using of `puer` as api server to mock data, you should install `puer`(https://www.npmjs.com/package/puer) first.

  Then in root directory, start the api server to mock data . In your terminal run

  `puer -a app/mock --no-reload --no-launch`

- Run simulator in xcode, press ⌘+R
