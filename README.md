# Spaces

Spaces Locator is a web application that can be used to locate nearby places that have wifi for you to get your work done. it can display up to 10 places around your location. Each location has the opening hours and days, facilities such as food, comfort, and others, the location on the map, and the reviews posted by people that went to these places.

The review is a rating and a comment. the average ratings entered by users are calculated and displayed as the main rating for that location in the main list.

I developed this application using MEAN stack. and deployed it so you can see it in action using the domain: https://spaces-locator.onrender.com/

## MVC Architecture

I used the MVC style of development for a clear separation of concerns and to make the code cleaner and maintainable. The models are used to interact with MongoDB through Mongoose.
The controller is the route handler that is used by the routes to handle the request and render the needed data using the views. The controller sends the response to the client using RESTful API. In the case of express application, it serves as the static file. otherwise, the response may be just the state.
The views are used to take the data from the control and show them in the wanted format. for this project, I used the Pug template engine to render the views to serve certain parts of the application that don't require the powers of angular and also need rapid initial loading.

The API is also organized in an MVC way where the model is a Mongoose model built from a schema that validates the data and interacts with the DB.

#### Note that The example locations stored in the DB are all near the lng:-0.7992599, lat: 51.378091 locations. the application can show the places 20 Km far from the current location. I tested it with these coordinates that are passed in the GET request as query string parameters.


# static express VS Angular

I developed some of the screens using static files served by the Express application. and the rest of the screens in Angular. I did that as the static files have two advantages that can be useful for the user side which needs more content than features and interactivity.

Static files' advantages are speed first loading and more search engine optimization as the web crawlers index the HTML links. However, on the admin side where interactivity is preferred over these two advantages, I used Angular which creates Single Page Applications SPA that allows the logic and work to be done on the front end using the client's browser. Also, it prevents reloading which means fewer calls to the API for a faster user experience.

![](https://github.com/YoussefSherif10/Spaces_Locator_MEAN_Stack/blob/main/SmartSelect_20230421_172711_Microsoft%20365%20(Office).jpg?raw=true)

The screens that are developed using Express and Pug can be categorized into two groups.

First, the locations group:
1. List Page: displays the main list of the 10 nearby locations.
2. Details Page: shows the details of the page such as location on the map, opening hours and days, facilities, rating, and reviews
3. Add Review Page: That allows the user to add a review

![](https://github.com/YoussefSherif10/Spaces_Locator_MEAN_Stack/blob/main/SmartSelect_20230421_172157_Microsoft%20365%20(Office).jpg?raw=true)

The second category is Others which include tha about page that tells users Info about the Spaces application. 
This page is also reusable so that, it is used to display different kind of messages to the user.

## Bootstrap and Fontawesome

For styling and responsiveness, I used Bootstrap Library. I Tested the app on different devices with different screen sizes and it works as expected thanks to the 12-column grid system of Bootstrap.
I used Fontawesome to represent the calculated rating of a certain location in stars. the rating is from 0 to 5. The number of solid stars is set accordingly. I used Pug Mixins to implement the function of representing ratings as stars and included it to be reused on the details page and the home page.

## Deployment

I deployed the server using the free tier on render where I connected the server with my GitHub account for CI/CD. For each new commit the changes get added to the live application.

![](https://github.com/YoussefSherif10/Spaces_Locator_MEAN_Stack/blob/main/Screenshot_20230422_162516_Microsoft%20365%20(Office).png?raw=true)

I also deplyed the MongoDB using free cluster on Atlas. In order to differentiate between the DB on the server for production and the local DB for development, I used process.env.NODE_ENV variable that gets set bt render automatically to production.

Here you can see the Spaces application: https://spaces-locator.onrender.com/

Even though the API that deals with the DB and the Express application are hosted on the same server, each of them has its own MVC files to separate the concerns and enhance the reusability of the application. Also, It makes it easier to maintain the code.

## URLS

The routes for the Express application are the ones that render the views of the discussed screens.

![](https://github.com/YoussefSherif10/Spaces_Locator_MEAN_Stack/blob/main/SmartSelect_20230424_223647_Microsoft%20365%20(Office).jpg?raw=true)

The API routes are called the controllers of the Express application to get the data to be rendered

![](https://github.com/YoussefSherif10/Spaces_Locator_MEAN_Stack/blob/main/Screenshot%202023-04-26%20at%207.49.53%20PM.png?raw=true)

## request Package

The connection between the front end and the API is made through the "request" package which is simple and easy API calls. These request calls are made in the controllers of the Express application to call resources from the DB.
The request is very easy it only needs some request options and a call-back function that gets the response.


![](https://github.com/YoussefSherif10/Spaces_Locator_MEAN_Stack/blob/main/Screenshot%202023-04-28%20at%206.10.02%20AM.png?raw=true)

The request options are the URL for the API route, HTTP method, body (JSON), and query parameters. 

![](https://github.com/YoussefSherif10/Spaces_Locator_MEAN_Stack/blob/main/Screenshot%202023-04-28%20at%206.11.33%20AM.png?raw=true)

There are other options can be included in the request but these are the ones that I used in this application.

The response is made in the callback function as it is made asynchronously. the callback function has three parameters which are errors, the response which holds the status code of the request, and the body.

![](https://github.com/YoussefSherif10/Spaces_Locator_MEAN_Stack/blob/main/Screenshot%202023-04-28%20at%206.15.28%20AM.png?raw=true)

## Google API

I used Google API to locate the user of the application and calculate the nearby locations where the maximum distance is 20 Km. The longitude and latitude can be hardcoded as well if they are passed to as query parameters in the URL "lng= &lat= ".
The location of the Space is showed as image in the location details page.

# MongoDB

I used MongoDB instead of other structured databases as it minimalizes the impedance mismatch. Meaning the data is stored in it a BSON which is Binary JSON, That is a huge advantage in MEAN stack as the used language is javascript where JSON is the default approach to move data around in the application.

![](https://github.com/YoussefSherif10/Spaces_Locator_MEAN_Stack/blob/main/Screenshot%202023-04-25%20at%2011.39.34%20PM.png?raw=true)

Another reason is that in this application I have reviews as "subdocument" in the location document. which means for a relational DB the query would need to collect information from different places and join them together. On the other hand MongoDB stores data as documents where all the related data are stored together with no need to join anything.
In my case, reviews are nested inside the location document.

![](https://github.com/YoussefSherif10/Spaces_Locator_MEAN_Stack/blob/main/Screenshot%202023-04-26%20at%2012.19.10%20AM.png?raw=true)


# Mongoose

While it is possible to connect to MongoDB directly through its native driver, I choose to use Mongoose as it has some advantages. One of them is Schema which allows for validation and determining the content of the document.
I used property object for most of the paths to add some functionalities for the model such as different validations and default values. 

![](https://github.com/YoussefSherif10/Spaces_Locator_MEAN_Stack/blob/main/Screenshot%202023-04-26%20at%2012.31.06%20AM.png?raw=true)

Another huge advantage is the 1:1 relation between the model and the document in the DB. this allows for straightforward interaction with the DB through the model.

![](https://github.com/YoussefSherif10/Spaces_Locator_MEAN_Stack/blob/main/SmartSelect_20230425_221041_Microsoft%20365%20(Office).jpg?raw=true)

The last factor that made me choose Mongoose is using the geoNear aggregation method to calculate the distance of a location using its coordinates. I indexed the model as '2dsphere' for that calculation. This is needed in the Spaces application to display and retrieve locations according to their coordinates. 

# Angular as part of the express application

is a front-end framework that makes the work on the client's browser. it is used to make a Single Page Applications. I used a part of Angular in minimal style to build the cards for displaying the list of locations in the main home page.
I built the Angular app for production and declared it as static files in the express application. I used scripts to link the [ runtime, polyfills, and main ] files to be able to use the defined tag in Angular Application. I then replaced the part of the cards in the home page and used the Angular tag instead.

#### Note: We must permit CORS access from the server side in order for Angular to perform http requests to the API.

# Angular full SPA

I developed the whole front-end as an SPA using Angular framework and built the application in production and deployed it.
In express, I used the angular built files as the main static files.

# Authentication

In traditional authentication, the client sends the credentials to the server. The server then queries the DB for to check these data is right.
The server sends cookie to the browser and set up the session for that user

 /image

After the initial handshake, when the user requests a restricted resource, the server checks the session to see if that user is authenticated to get that resource then, sends it.

 /image

The traditional approach is not a neat fit in the MEAN stack as node and express don't maintain sessions. Also, in SPA all the code is already sent to the browser.
Instead of the traditional way, I used JSON web token (JWT) and a middleware (passport.js) to authenticate and manage sessions. 

JWT is a JSON object but encrypted so that it can only be understood by the application and the server.

# Application in Action

