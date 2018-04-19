# bamazon
A CLI program mimicking an online store using inquirer and mysql packages.

The program has three basic parts:

bamazonCustomer.js: mimicks the customer experience, where users can 'purchase' items. Purchasing depletes stock in the mysql database, adds revenues to product_sales columns and returns a total cost.

bamazonManager.js mimicks a store manager experience, where users can review stock and sales, as well as restock inventory and add new items for sale. Changes are saved in the mysql database.

bamazonSupervisor.js mimicks a higher-level manager experience, allowing users to view overall department profits and over head costs. Users can also create new departments. 

Created by Cezar Carvalhaes in 2018.
