RNMC Burgers
===================================

A web app to customize and order your personal favorite burgers.

Working example [here](https://rnmcburgers.web.app/)

Overview
-----------------------------------

A simple burger-customization web app, where you can add or remove ingredients on the fly. The burger is re-created instantly as you do so, price gets updated in real time and you can log in to complete a form to order it. All burgers you order are stored in Firebase and you can retrieve them with the given option available in the navigation bar.

User authentication and session persistance is handled. You can log in, close the browser and reopen it, and the app should still reckon it is you. LocalStorage is used for session persistance, and timeout is checked each time the App renders. If session expires, a logout action is automatically dispatched.

Create-react-app was used to initialize the project, but the project involves several libraries. Redux, Redux Sagas, React-Router, Hooks, Axios, PropTypes, React Lazy and Suspense, and some other libraries and utilities made what you see here possible.

I have put this app together following Maximilian Schwarzmüller proposed project in his ["React - The Complete Guide (incl Hooks, React Router, Redux)" Udemy course](https://www.udemy.com/course/react-the-complete-guide-incl-redux/). Impressive course, one of the best I've taken so far. The instructor put some good effort in it, explained all concepts in detail, gave lots of examples and encouraged me to continue on my way to becoming a good developer. Totally recommended, go and check it out if you are into -or you wish to start with- React developing.

As for my other projects, please feel free to go to [my GitHub page](https://github.com/RenzoMurinaCadierno) to check them out. I am still on my learning tracks, so you will see new projects frequently. I specialize in Python and Javascript, and whatever I upload is normally related to web, game and app development, or Python scripting for multiple purposes.


How things are wired up
-----------------------------------

This project was made to continue practicing on many React-ecosystem concepts and interactions. **Create-react-app** was used as a kickstarter, but plenty of custom functionality and many libraries were added to enrich it.

State management is handled by **Redux**, and **Redux Sagas** was included to deal with async state actions. Actions, Sagas and Reducers for each Smart component that require state are well differentiated in their own files.

**React-router** is responsible for routing all requests to each endpoint, and a custom High Order Component to lazy render the main paths: Auth, Orders and Checkout. **React Lazy** and **Suspense** are used in the Hooks version of the project.

**Firestore** powers the database, where User and Burger orders are placed. User authentication is handled there and Firestore rules are customized to only allow registered users to post orders and retrieve the ones they created. Only the admin is able to update or delete Collection Item and User objects.

**Axios** handles requests to database. A custom configuration in its own file in the root directory is the one used as a config, and an error handling component to intercept requests and deal with errors.

**CSS Modules** was applied to add unique classes to each component so that they do not conflict with global ones. The latter were avoided whenever possible.


What can you do in this project?
-----------------------------------

As an **unregistered user**, you can:

- Sign up.
- Log in providing email and password used to sign in.
- Log out.
- Create a custom Burger by adding and removing ingredients using the Builder's interface.
- NOT access other user's information (auth or orders).

As a **logged in user**, you can:

- All of above.
- Checkout the burger you created by completing a form with your details. That form has a simple but custom-made validation.
- Store the orders in Firebase and retrieve them with the links in the Navigation bar.

Bugs
-----------------------------------
- Can GET but not POST to Firebase regular database (A 401 error triggers even though the request is made with an authorized user, rules are set accordingly and the request is not malformed). I really could not solve the issue, that's why I posted the project like this. If you have any idea how to give me a hand, the code is there for you to check.
- Media queries are all set up in pixels, reason for which some components do not adapt properly. Since this is a demo project to practice, I really do care for functionality. If needed, I will correct it later.


What I learned from this project
-----------------------------------

- It is really tricky to avoid using ComponentWillMount in some places where it seems that having the state available and processed before the component renders is the only way to make the component work. I got constantly annoyed by React.StrictMode to not use it nor its UNSAFE version. Thus, it was a good practice for me to start handling state more carefully with Redux (potentially Sagas) or simply using Hooks as an alternative.
- In my personal opinion, Hooks are the bright present and future of React and its libraries. They allow you to handle context, store, state, effects, memoization and so on in such a simple way that frontend app development with React ends up being much more developer-friendly than many other libraries, and even frameworks. Hooks are extremely powerful and versatile indeed, though I honestly need some more time to learn and apply them properly.
- Adding custom validation and conditional rendering linked to that validation is much simpler than what I was accustomed to. Rules can be outsourced in a JS object and each element that needs validation can ask for it passing its current state to that object. The state for that element changes and conditional rendering does the rest.
- I could experience a brief introduction to Next.js when dealing with this project and I've got to say that it is literally "next" level stuff. Server-side rendering in React is no joke: a good method so as not to depend on client-side browsers to render the app, as well as an incredible alternative to make our app visible in Search Engines' maps, thing not possible to do with normal client-side rendering.
- I sincerelly need some more practice with CSS. Not because I do not know the rules, but due to me not being an artist of any kind, so creating visually appealing animations or components to enhance UX is a big challenge. I neglect the idea of using frameworks only because I consider that I must be able to do what I want to do by myself in the first place. Sooner or later I will get better at it.

### Thank you for taking your time to check this project out!
