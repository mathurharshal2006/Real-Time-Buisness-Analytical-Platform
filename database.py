import sqlite3

def init_db():
    # Connect to SQLite database (it creates the file if it doesn't exist)
    conn = sqlite3.connect('analytics.db')
    cursor = conn.cursor()

    # Create a table to store sales data
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            total_sales INTEGER,
            average_sale_value REAL,
            sales_growth REAL
        )
    ''')

    # Create a table to store customer data
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            total_customers INTEGER,
            new_customers INTEGER,
            churn_rate REAL
        )
    ''')

    # Create a table to store growth data
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS growth (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            monthly_growth REAL,
            yearly_growth REAL
        )
    ''')

    # Commit the changes and close the connection
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
