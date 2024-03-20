// function to capitalize first letter of a string (some titles were in lower case)
const capitalizeFirstLetter = (string) => {
	return string.replace(/\b\w/g, (char) => char.toUpperCase());
};

export default capitalizeFirstLetter;
