# bamazon
<<<<<<< HEAD
A CLI program mimicking an online store.

First, navigate to the root folder of the app and run 'npm install' to install dependencies. 

To run the app as a customer, run 'node bamazonCustomer.js'.

To run the app as a manager, run 'node bamazonManager.js'.

To run the app as a supervisor, run 'node bamazonCustomer.js'.
=======
A CLI program mimicking an online store using inquirer and mysql packages.

The program has three basic parts:

bamazonCustomer.js: mimicks the customer experience, where users can 'purchase' items. Purchasing depletes stock in the mysql database, adds revenues to product_sales columns and returns a total cost.

bamazonManager.js mimicks a store manager experience, where users can review stock and sales, as well as restock inventory and add new items for sale. Changes are saved in the mysql database.

bamazonSupervisor.js mimicks a higher-level manager experience, allowing users to view overall department profits and over head costs. Users can also create new departments. 

Created by Cezar Carvalhaes in 2018.
>>>>>>> 5f840e8ecdaace929c7e0ce1566c3a1a8a18fce7
