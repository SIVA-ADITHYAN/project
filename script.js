// Replace 'YOUR_API_KEY' with your actual API key from the exchange rate API service.
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'; // Example API URL

// Function to fetch exchange rates and perform conversion
async function convert() {
    try {
        // Get the amount to convert
        const amount = parseFloat(document.getElementById('amount').value);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        // Get selected currencies
        const fromCurrency = document.getElementById('from').value;
        const toCurrency = document.getElementById('to').value;

        // Fetch exchange rates
        const response = await fetch(API_URL);
        const data = await response.json();

        // Ensure the 'fromCurrency' and 'toCurrency' are valid and exist in the response
        if (!data.rates[fromCurrency] || !data.rates[toCurrency]) {
            alert('Currency not supported.');
            return;
        }

        // Perform conversion
        const rateFromUSD = data.rates[fromCurrency];
        const rateToUSD = data.rates[toCurrency];
        const convertedAmount = (amount / rateFromUSD) * rateToUSD;

        // Display result
        document.querySelector('h2 + label').textContent = `Converted Amount: ${convertedAmount.toFixed(2)} ${toCurrency}`;

    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        alert('An error occurred while fetching exchange rates.');
    }
}