# Front End Task

Hello and welcome! :)

This project is a recreation of an amazon-styled catalog displaying products using [**dummyjson API**](https://dummyjson.com/), hosted locally.

The requirements were:
- 10 random items displayed initially
- Excluded all products of a certain brand (in my case Apple)
- Products sorted by rating in a descending order
- 1 image per product to be displayed
- Upon clicking "ADD TO BASKET" it prints to console the item ID and price
- Fetching of new data after 3 minutes have passed upon user manually refreshing the page(should not automatically refresh)
- The newly fetched data should follow same criteria as initial fetch (see above)
- If user refreshes the page before the 3 minutes are up, the same data to be displayed (local storage was used to save the current products shown and then a check for timestamp is done to determine if data is stale or not, if data is stale, it proceeds to fetch new data and store it, if data is not stale, it just shows the data from storage and restarts the timer)
- A countdown provided to keep track of the 3 minutes
- A stock bar that updates based on stock, along with indicative colours to show the user if an item is in stock or almost sold out

Features to be added/changed:
- A star rating display instead of text to be added
- On mobile view, the title and rating should be at the top of the image, and description underneath the image
- The layout needs to be modified slightly for tablets and extra large desktop screens
- Different fonts to make it more aesthetically pleasing
- Extra accessibility can be added

### Minimum requirements

- **Node**: minimum version v20.8.0, you can download Node.Js [**here**](https://nodejs.org/en)

### How to run it

1. **Fork** this repo by clicking on the icon in the top right of the page.

2. **Clone** this repo by clicking the `<>Code` icon and copying the HTTPS url. Once the url is copied, go into your local terminal and run the following command once you're in the desired save location:

```
git clone <paste url here>
```

If you're using **Visual Studio Code**, you can either open the folder straight from the app by clicking **open folder** or, you can do this from your terminal, by running the following command:

```
code <folder name>
```

3. **Install Dependencies** listed in the `package.json` to your machine by running `npm install`.

4. **Host a local version** by running `npm run dev`.

5. **Enjoy!** :smile_cat: