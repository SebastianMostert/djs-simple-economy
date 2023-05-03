# djs-simple-economy

djs-simple-economy is a simple economy system for Discord.js that provides various functionalities for managing bank accounts, user accounts, and transfers between users.

## Installation
```sh
npm install djs-simple-economy
```

## Usage
```js
const { EconomySystem } = require('djs-simple-economy');
const { bankAccountManager, bankManager, transferManager, userAccountManager } = EconomySystem;
```

### Bank Account Manager
The Bank Account Manager provides methods to deposit, withdraw, and check balance of a user's bank account.

```js
// Deposit to a user's bank account
bankAccountManager.depositToBankAccount(userId, amount);

// Withdraw from a user's bank account
bankAccountManager.withdrawFromBankAccount(userId, amount);

// Check the balance of a user's bank account
bankAccountManager.getAccountBalance(userId);
```

### Bank Manager
The Bank Manager provides methods to create, update, and fetch bank information.

```js
// Create a new bank for a guild
bankManager.bankCreate({bankName, guildID});

// Check if a bank exists for a guild
bankManager.bankExists({bankName, guildID});

// Update the balance of a bank
bankManager.bankUpdateBalance({bankName, guildID, amount});

// Update a user's bank information for a guild
bankManager.guildUserProfileUpdateBank({userID, guildID, bankID, amount});

// Fetch a user's bank information for a guild
bankManager.guildUserProfileFetch({userID, guildID});

// Delete a user's bank information for a guild
bankManager.guildUserProfileDelete({userID, guildID});

// Delete all user bank information for a guild
bankManager.guildUserProfileDeleteAll({guildID});
```

### Transfer Manager
The Transfer Manager provides a method to transfer an amount from one user to another.

```js
transferManager.transfer(senderId, recipientId, amount);
```

### User Account Manager
The User Account Manager provides methods to create, check balance, and add to the balance of a user account.

```js
// Create a new user account with a starting balance
userAccountManager.createUserAccount(userId, startingBalance);

// Check the balance of a user account
userAccountManager.checkUserBalance(userId);

// Add to the balance of a user account
userAccountManager.addToBalance(userId, amount);
``` 

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.