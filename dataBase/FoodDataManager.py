from mysql import connector
import json

NUTRIENTS_TABLE = "nutrients"
FOODS_TABLE = "foods"
FOOD_NUTRITION_TABLE = "food_nutrition"

def getConnection():
    return connector.connect(
        host="localhost",
        user="root",
        password="noam2005",
        database="MealMate"
    )

def read(con, table):
    data = []
    if table == NUTRIENTS_TABLE:
        query = f"SELECT * FROM {table} ORDER BY nutrient_id ASC"
    else:
        query = f"SELECT * FROM {table} "
    try:
        cursor = con.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
    except Exception as e:
        print(e)
    finally:
        if con:
            cursor.close()
    return data
 
def getByColumnDB(cl, con, table):
    query = f"SELECT {cl} FROM {table};"
    try:
        cursor = con.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        return [r[0] for r in rows] 
    except Exception as e:
        print(f"Database error in getByColumnDB: {e}")
        return []
    finally:
        if cursor:
            cursor.close()
 

def loadData(data, con, table):
    if table == NUTRIENTS_TABLE:
        query = f'INSERT INTO {NUTRIENTS_TABLE} (nutrient_id, nutrient_name) VALUES (%s, %s);'
    elif table == FOODS_TABLE:
        query = f'INSERT INTO {FOODS_TABLE} (id, name, alternate_names, description, ingredients_tsv) VALUES (%s, %s, %s, %s ,%s);'
    elif table == FOOD_NUTRITION_TABLE:
        query = f'INSERT INTO {FOOD_NUTRITION_TABLE} (food_id, nutrients_id, nutrient_value) VALUES (%s, %s, %s);'
    else :
        print("Unknown table")
        return
    try:
        cursor = con.cursor()
        cursor.executemany(query, data)
        con.commit()
    except Exception as e:
        print("Database error:", e)
    finally:
        if con:
            cursor.close()

def insertTable(con, table, tuple):
    if table == NUTRIENTS_TABLE:
        query = f'INSERT INTO {NUTRIENTS_TABLE} (nutrient_id, nutrient_name) VALUES (%s,%s);'
        params = (tuple[0], tuple[1])
    elif table == FOODS_TABLE:
        query = f'INSERT INTO {FOODS_TABLE} (id, name, alternate_names, description, ingredients_tsv) VALUES (%s,%s,%s,%s,%s);'
        params = (tuple[0], tuple[1], tuple[2], tuple[3], tuple[4])
    elif table == FOOD_NUTRITION_TABLE:
        query = f'INSERT INTO {FOOD_NUTRITION_TABLE} (food_id, nutrient_value) VALUES (%s,%s);'
        params = (tuple[0], tuple[1])
    else:
        print("Unknown table")
        return
    try:
        cursor = con.cursor()
        cursor.execute(query, params)
        con.commit()
    except Exception as e:
        print(f"Error inserting into table {table}: {e}")
    finally:
        if con:
            cursor.close()

def clearTable(con, table_name):
    query = f"DELETE FROM {table_name}"
    try:
        cursor = con.cursor()
        cursor.execute(query)
        con.commit()
        print(f"Cleared {table_name} successfully")
    except Exception as e:
        print(f"Error on {table_name}: {e}")
    finally:
        if cursor:
            cursor.close()

def deleteFood(con, food_id):
    try:
        cursor = con.cursor()
        cursor.execute("DELETE FROM food_nutrition WHERE food_id = %s", (food_id,))
        cursor.execute("DELETE FROM foods WHERE id = %s", (food_id,))
        con.commit()
    except Exception as e:
        print(f"Error clearing food {food_id}: {e}")
    finally:
        if con:
            cursor.close()

def insertFood(con,id,name,alternateNames,description,ingredients,nutritionValues=""):
    queryTableFood = "INSERT INTO foods (id, name, alternate_names, description, ingredients_tsv) VALUES (%s, %s, %s, %s, %s)"
    queryTableFoodNutrition = "INSERT INTO food_nutrition (food_id, nutrient_value) VALUES (%s, %s)"
    
    try:
        cursor = con.cursor()
        cursor.execute(queryTableFood, (id, name, alternateNames, description, ingredients))
        cursor.execute(queryTableFoodNutrition, (id, nutritionValues))
        con.commit()
    except Exception as e:
        print(f"Error inserting food {id} {name}: {e}")
    finally:
        if con:
            cursor.close()

if __name__ == "__main__":
    with open("/home/noaman/MealMateDB/opennutrition_foods.tsv") as f:
        clearTable(getConnection(), FOODS_TABLE)###### kat khwi la base bach les donnees ga3ma yt3awdo 
        clearTable(getConnection(), NUTRIENTS_TABLE)##### kat khwi la base bach les donnees ga3ma yt3awdo 
        clearTable(getConnection(), FOOD_NUTRITION_TABLE) #### kat khwi la base bach les donnees ga3ma yt3awdo 
        
        dataString = f.readline()
        initLine = f.tell()
        dataString = f.readline()
        foodData = dataString.split("\t")
        nutritionRaw = json.loads(foodData[7])
        nutritionNames = list(nutritionRaw.keys())
        nutrientsData = [(i, name) for i, name in enumerate(nutritionNames, start=1)]
        loadData(nutrientsData, getConnection(), NUTRIENTS_TABLE) ##### <------ HADI HIYA LI KAT LOADI LA BASE DIAL LES NOMS WDIAL LES INGREDIANT
        f.seek(initLine)

        ##### hadchi kay loadi la base dial la table foods li fiha id, name, alternateNames,description,ingredients
        for i in range(10):
            dataString = f.readline()
            foodData = dataString.split("\t")
            id = foodData[0]
            name = foodData[1]
            alternateNames = foodData[2]
            description = foodData[3]
            ingredients = foodData[11]
            insertTable(getConnection(),FOODS_TABLE,(id,name,alternateNames,description,ingredients))###### <------- HADI KAT LOADI LA BASE DIAL KOLCHI ILA NUTRICIENTS

        ######### had lparti dial la table food_nutrition

        f.seek(initLine)
        nutrientsIds = getByColumnDB("nutrient_id", getConnection(), NUTRIENTS_TABLE)
        
        for i in range(10):
            dataString = f.readline()
            foodData = dataString.split("\t")
            id = foodData[0]
            nutritionRaw = json.loads(foodData[7])
            nutritionValues = list(nutritionRaw.values())
            insertTable(getConnection(), FOOD_NUTRITION_TABLE, (id,str(nutritionValues)))
        
        
        ##### HADCHI BACH KAN TEST LES TABLES DIAL LES BASES DE DONNEES
        
        #insertFood(getConnection(),"testtesttesttesst","TheTest",'["Test"]',"for test","[test : 12]","[ahmed ]")
        #deleteFood(getConnection(),"testtesttesttesst")
        #print(read(getConnection(),FOOD_NUTRITION_TABLE))
        #print(read(getConnection(),FOODS_TABLE))
        #print(read(getConnection(),NUTRIENTS_TABLE))