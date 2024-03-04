# ClearBridge Mobile React coding challenge

I've pushed all my changes in regards to the challenge

## Design
I have went along with using regular CSS module styling on this application. At first I was going to use material-UI to provide a better look towards the application, but I wanted to express my theme along with have more control in the CSS of the application.

In terms of a theme palette, I have gone with the following:
  -Deft Blue: #454B66
  -Glaucous: #677DB7
  -Vista Blue: #9CA3DB
  -Smoky Black: #191308

## Components

In terms of components. I've only found use for seperating the search bar component, as its utility is better off seperated for reusability. Since we are not recyling many components, and I was crunching time, I've decided to keep the code as is for the details and index page but instead reuse the main.module.css styling.

## Packages
In terms of packages used, I have not used any packages other than react router dom for naivigation between pages and axios to fetch api calls.

## Optimization approach
In order to ensure optimization between api calls, I've made sure to limit how much data I am getting based on what required fields I am looking for.

To prevent useEffect from calling a function multiple times on mount or on change, I've made sure to add an if statement based on an isLoading state that will ensure the useEffect doesn't get used multiple times.

## Extras

I've added focus to the search bar to make sure we don't have the search get in the way with the table. Additionally, I have added a loading section in between api calls to keep the platform more user friendly instead of having a static screen while the user waits whenever next is pressed.

## Missing
I am missing the category filter along with the data validation comments. I am not 100% sure on how to approach these two problems but I am happy to discuss with the team on how to approach these.

