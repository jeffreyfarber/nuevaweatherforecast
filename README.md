# Simple Weather Forecast App for Mobile App Design

Let's use this React Native app to explore three concepts:
 1. Variables of variables
 2. ListView component
 3. fetch()

### Variables of variables
In previous classes we explored the concept of a variable:
```
var myClassName = 'Mobile App Design';
var myBlock = 4;
var myAttendanceStatus = 'Lots of illness';
var myTotalCount = 14;
```
Declaring all of these different variables can get sort of repetitive and confusing though, right!?

###### Lists
A list is a variable that contains multiple other variables or values.  Lists are declared using the `[ ]` syntax.  For instance:
```
var myFavoriteShows = ['Big Bang Theory', 'Arrow', 'The Walking Dead', 'NCIS', 'Criminal Minds'];
var mySquares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100];
```
Benefits?
 - Much easier than declaring each individually (ie. `myFavoriteShow1`, `myFavoriteShow2`, `myFavoriteShow3`, etc.)
 - We can "iterate" through the list and "do something" with each of the elements in the list
 - We can easily add and remove items from the list
 - We can easily count the number of items in the list

###### Objects
Objects are a hybrid of lists and regular named variables.  This is a little better than the individual variables above:
```
var myClassInfo = {
  name: 'Mobile App Design',
  block: 4,
  myAttendanceStatus: 'Lots of illness',
  totalCount: 14,
};
```
We can then access any values using 'dot syntax'.  Simply join the main variable name `myClassInfo` and the item you want to access:
- `myClassInfo.name` would get the name of the class => `'Mobile App Design'`
- `myClassInfo.block` would get the block number `4`
Change values like you would change a normal variable's value:
```
myClassInfo.myAttendanceStatus = 'Everyone is feeling better';
```
This may look familiar to you, because we have been setting the state object in our components, like in our weather location form component:
```
    this.state = {
      city: '',
    };
```
You might further notice the dot notation in this.state: our component itself is an object, which we have access to through the special 'this' variable. Here we are setting the state object in our component object.

### ListView component
Take a look at the 'weatherForecast.js' file:
```
<ListView
  dataSource={dataSource}
  renderRow={(forecast) => <WeatherForecastRow forecast={forecast} />}
  enableEmptySections={true}
/>
```
The dataSource is something that is processing a list of forecasts (we'll talk how we are getting these about later) that looks something like this:
```
var forecasts = [
  {
    date: 'Monday, Feb 6th',
    description: 'Mostly Cloudy with Rain',
    averageTemp: 57,
    ...
  },
  {
    date: 'Tuesday, Feb 7th',
    description: 'Mostly Cloudy with Heavy Rain',
    averageTemp: 59,
    ...
  },
  ...
];
```
This is a list (see the `[ ]` syntax), and each element in the list is an object (see the `{ }` syntax).  It's sounds a little complicated, but don't worry, you just need to understand the basic principals and you'll get more comfortable.

This ListView will go through each item in the `forecasts` list, and call `renderRow={(forecast) => <WeatherForecastRow forecast={forecast} />}`.  After each row is rendered to the screen, you'll be able to scroll up and down!

### fetch()
To get data from another server in React Native, we can use the `fetch` function. We give it a URL as an argument, and it gives us back the data at that URL... eventually.

Getting data from another server can take a long time. If your app just stopped and waited until the data arrived, it would seem very laggy to the user: they might try to tap buttons or type input and get no response at all, making them very crabby. To solve this, anything that involves going over the network is done **asynchronously**. The `fetch` function actually returns a **Promise**, a special object that represents something that will be available sometime in the future. We can give this promise object an event handler that it should call when the data come in. Until then, your app can keep doing all of the other things it needs to do, like responding to user input.

Here is the code in our example. `.then()` is the function that takes the event handler that will be called when the data arrive. This code, then, gets the returned data, converts it from HTML into a JavaScript object (JSON), just like the objects we have been talking about, and then uses that object to get the data.

```
export function getForecastForCity(city) {
  return fetch('https://api.aerisapi.com/forecasts/'+city+'?client_id='+AERIS_CLIENT_ID+'&client_secret='+AERIS_CLIENT_SECRET)
  .then(response => response.json())
  .then(responseJson => {
    if (responseJson.success) {
      return {
        error: false,
        city: city,
        forecast: parseForecast(responseJson.response[0].periods),
      };
    }
    else {
      return {
        error: true,
      };
    }
  });
}
```
