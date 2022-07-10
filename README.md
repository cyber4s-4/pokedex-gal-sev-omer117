# Notes:
Server is on port 4002,
open http://localhost:4002/getApi to run the script that updates data.json from the api (the server console will tell you when its finished updating the file)
open http://localhost:4002/getData to get the data.json from the server
open http://localhost:4002/ or http://localhost:4000/ to see the website

# Pokedex-2 Task

In this task you will add a server to you pokédex!

In the previous task, we used the API from https://pokeapi.co.

Now, we will instead use our own server.

## Instructions

* Write a script that makes a series of requests to `pokeapi.co` API and saves the results in local json files.
* Optional step: Reorganize these files in a way that "makes sense" for you for using them in the following step.
* Return the data to your webapp using your own server. Your server should read the data from files - similar to the server in lesson `33-express-2`.

## Bonus

Add a post request that allows the user to mark a Pokémon as a favorite, and add a UI to work with that request (e.g a star that the user can press to mark the Pokémon as a favorite).
