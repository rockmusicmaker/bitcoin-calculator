# Bitcoin Calculator

This project is intended to work with a [calculating backend provided](https://github.com/matlirman/Hut8_Takehome_FE).

## Running the application

1. To run this application first follow the instruction to run the [backend](https://github.com/matlirman/Hut8_Takehome_FE/blob/main/README.md).

2. Then run `npm install && npm start` from within this project directory.

3. Then the app is accessible from [http://localhost:3000](http://localhost:3000) in the browser.

### Note
I was unable to get the backend api to work locally. To address this issue within the time allowed, I chose not to debug that api and instead mock the service from the hook, `useBitcoinCalculator`, by assuming a REST API and hard coding sample outputs. These hard-coded outputs are not present in the repo in hopes that this application would naturally interface with the working api on a different machine. I feel that with this approach I was still able to deliver a valuable user-centric web application that should theoretically work with the backend running. If there were wrong assumptions made about the api service, addressing them should be localized to the `useBitcoinCalculator` hook.

## How I approached user centric design and functionality for this task

User centric design is naturally at the forefront of my thought process as an engineer. I feel maintaining a user centric posture affects all aspects of engineering from work prioritization, system design, UI designs, as well as programming and testing. For this exercise, I employed a default set of priorities to guide my decision making. Due to the short timeline, I chose to focus on the first two priorities so that I could establish a baseline to then work on the 3rd priority. 

### 1. Make the system work end-to-end

For this point, I lean on an analogy one of my former managers taught me that I call "The leaky hose". 

>
> Imagine two engineers were hired to bring water to a thirsty village in the desert. Every day that they do not have water, villagers die. 
> 
> The first engineer's approach is to develop a very rigorous water delivery pipeline that is built with the strongest material. They begin by installing the pipe at the water source and slowly and intentionally add sections of pipe by focusing on best practices and sound principles. After a few months, the project runs out of money, the pipe only made it a portion of the way to the village, and no water was delivered to the villagers.
>
> The second engineer took a different approach. This engineer first took a leaky hose and a simple pump and very quickly put one end in the water source with the pump and brought the other end to the village. While this solution leaked water in the desert and had much room for improvement, the engineer was quickly able to solve the villagers crises and the village had water. By prioritizing the villagers, the engineer was awarded more time and budget to go back and upgrade the leaky hose bit by bit. 
> 

While this analogy is simple, I feel that the truth it conveys has helped guide my engineering decisions. Most of my engineering experiences have required me and my teams to balance "perfect" with "done". In these instances, I try to start by first meeting the immediate need of the client. This typically looks like designing for and delivering a simple solution that does not take much time. This tends to meet some needs of the client quickly and also brings up more feedback early in the process from the client. Then myself and the team are more informed and able to better improve the system incrementally. 

For this exercise, with the analogy from above in my head, I chose to work from the backend system up to the visual layer first then revisit each section to improve. 

* I started by cloning the backend repo and following the instructions to get that project running. 
* Then, based on reading the inputs and outputs of the python function in that code base, I created a hook in react to encapsulate interfacing with this system.
* Then I used that hook in the visual layer and driver of the app, `App.tsx`, to quickly create an interface for users to input data and an interface for users to see the response. 

While this approach left much room for improvement, I feel I did prioritize the user by focusing on delivering value to the user first, then improving. 

### 2. Make the system accessible

After the application was working end-to-end, or as much as I could without getting the api to run locally, I then chose to iterate on the visuals of the application and prioritize accessibility. I feel that leaning on web accessibility best practices is a sound way to approach visual designs as it limits the seemingly endless creative options possible to a few simple options that will enable the most people to interact with your application. 

* To do this for this exercise, I leveraged tailwind and and some basic accessibly guidelines to establish a simple neutral grey color scheme with one blue "brand color". 
	* This ensured basic text contrasting requirements and consistent styling. 
* I then created a few UI components that were becoming naturally reused to speed up implementation and ensure consistency.
	* These were namely, `NumberPicker`, `Card`, `Button`, & `LabeledValue`
	* `NumberPicker` was particularly valuable as I focused on offering multiple ways for users to interact with their desired number. 
* Finally I employed some basic styling to group related items in a natural way that implied intended use.
	* I did this by grouping the inputs into one `Card` and the outputs into one `Card`
 
##### Note
Increasing the application's accessibility further may benefit from adding 3rd party tools like headlessui that supply visually customizable and highly accessible components. I chose not to add libraries like this for this project in favor of keeping the solution simple as a first draft. 

### 3. Refine the system's presentation to further support use cases

At this point in project lifecycle, I find feedback in particularly helpful. Typically in a project, at this point, I would advertise the work I have done and solicit feedback from my team and stakeholders. This is where I would hope to gather a wide breadth of opinions regarding presentation, usability, and functionality. By doing this I would hope to maintain a user centric approach by focusing on key use cases that users are intended to use this application for. 

For this exercise I did not have much time to revisit and iterate on this application beyond what is mentioned above nor did I have any feedback channels. Due to that limitation and the time limitation, I chose to keep the application simple and use this document to articulate ideas for improvement if I had more time and feedback. 

#### If I had more time

* Add tests
	* Add visual tests with story book to track visual regressions and enable decoupled development of the front end from the backend
	* Add integration tests with testing library to verify complete functional requirements web app components.
	* If needed as utilities and other idempotent functions are identified, then introducing unit testing with jest would help verify these functionalities. 
* Iterate on presentation of calculation result:
	* Introduce a Toggle to show USD versus BTC values
	* Visually represent the magnitude of the daily, monthly, and annual costs.
	* Highlight the relationship between cost revenue and profit
* Save api request and responses so user could revisit and compare calculations
* Illustrate break even timeline
* Add in animations and transitions
* Add in custom styled focus, disabled, and required states for input elements

##### Note

I imagine several of these enhancements would require adding charts and visuals into the application. I chose not to begin this step in favor of keeping things simple but with more time and feedback I think adding 3rd party charting libraries like Nivo or CharJs could make adding this visual easier. 

## Documentation


Below is an overview of the specifics of this application.

### Dependencies
All dependencies for this project can be found in the `package.json` file but I will call out a few notable ones and what they are used for:

#### Typescript
Typescript add extremely helpful type safety to javascript which, to me, enables a much more rigorous design of interfaces. This is particularly helpful with components and hooks where it can help enforce expected types used by these reusable modules without the addition of validator functions. Type safety, like what typescript provides, also helps surface up common errors at compile time versus run time since the typescript transpiler will highlight issues around nullability and other common errors in web applications. 

#### Tailwindcss
Using tailwindcss enables a modular approach to css in web applications. Using tailwind essentially brings css into the tsx files instead of in css files which helps unify naturally coupled aspects of web development. With tailwindcss building reusable components is almost trivial.  

#### Classnames
Classnames is a simple string concatenation utility that helps organize the use of tailwind classes. This is especially helpful when classes are conditional. 

### Source code
#### `App.tsx`

`App.tsx` is the main driver of the application. This file uses hooks, utils, and components to create the user experience.

#### `hooks`

The hooks module contains custom hooks that leverage react features to track state, references, memoizations, etc.

#### `useBitcoinCalculator`
This hook encapsulates all interfacing with the backend api. I would expect this hook to grow as the backend api grew. I could also see this hook breaking up into a series of hooks being 1:1 with data types or endpoints with the backend. There are many possibilities for how this app could maintain parity with an evolving api but I would lean on this hook layer of the web application to encapsulate those complexities.  

#### `utils`
Utils contains stateless, idempotent functions that implement data manipulation. Typically, I try to design thin front-ends that rely heavily on backend systems so that business logic is well centralized and tested and maintained but for the bits of business logic that do make it into the front end, I try to keep those tested and reused via util folders.

#### `components`
The components are the reusable visual building blocks of the application. I would expect this module to continue to grow and be reused as this application grows. As the application's design system and branding became more well defined, I would expect components in this module to be updated to reflect that. If this module grew to significant size or if it needed to be used by another product, I would then suggest moving this module to a shared component library. 
