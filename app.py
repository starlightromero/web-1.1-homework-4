"""Import flask, pymongo, and objectid."""
from flask import Flask, request, redirect, render_template, url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import inflect


# #############################################################################
# SETUP
# #############################################################################


app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/plantsDatabase"
mongo = PyMongo(app)
plants = mongo.db.plants
harvests = mongo.db.harvests
p = inflect.engine()


# #############################################################################
# ROUTES
# #############################################################################


# TODO: Sorting functionality with JS

@app.errorhandler(404)
def page_not_found(e):
    """Display page not found."""
    print(e)
    return render_template('404.html')


@app.route('/')
def plants_list():
    """Display the plants list page."""
    plants_data = plants.find()

    context = {
        'plants': plants_data,
    }
    return render_template('plants_list.html', **context)


@app.route('/about')
def about():
    """Display the about page."""
    return render_template('about.html')


@app.route("/seeds")
def seeds():
    """Display the seeds page."""
    return render_template('seeds.html')


@app.route('/create', methods=['GET', 'POST'])
def create():
    """Display new plant page. Process data from the form."""
    if request.method == 'POST':
        new_plant = {
            'name': request.form['plant_name'],
            'variety': request.form['variety'],
            'photo_url': request.form['photo'],
            'date_planted': request.form['date_planted']
        }

        plant = plants.insert_one(new_plant)
        plant_id = plant.inserted_id

        context = {
            'plant': plant,
            'plant_id': plant_id
        }

        return redirect(url_for('detail', **context))

    return render_template('create.html')


@app.route('/plant/<plant_id>')
def detail(plant_id):
    """Display the plant detail page & process data from the harvest form."""
    plant_to_show = plants.find_one({'_id': ObjectId(plant_id)})
    harvests_to_show = harvests.find({'plant_id': ObjectId(plant_id)})

    context = {
        'plant': plant_to_show,
        'plant_id': plant_to_show['_id'],
        'harvests': harvests_to_show
    }
    return render_template('detail.html', **context)


@app.route('/harvest/<plant_id>', methods=['POST'])
def harvest(plant_id):
    """Accept a POST request data for 1 harvest and insert into database."""
    plant_to_harvest = plants.find_one({'_id': ObjectId(plant_id)})
    name = p.plural(plant_to_harvest['name'].lower())

    new_harvest = {
        'quantity': f"{request.form['harvested_amount']}",
        'name': name,
        'date': request.form['date_harvested'],
        'plant_id': plant_to_harvest['_id']
    }

    harvests.insert_one(new_harvest)

    return redirect(url_for('detail', plant_id=plant_id))


@app.route('/edit/<plant_id>', methods=['GET', 'POST'])
def edit(plant_id):
    """Show the edit page and accept a POST request with edited data."""
    if request.method == 'POST':

        plants.update_one(
            {'_id': ObjectId(plant_id)},
            {
                '$set': {
                    'name': request.form['plant_name'],
                    'variety': request.form['variety'],
                    'photo_url': request.form['photo'],
                    'date_planted': request.form['date_planted']
                }
            })

        return redirect(url_for('detail', plant_id=plant_id))

    plant_to_show = plants.find_one({'_id': ObjectId(plant_id)})

    context = {
        'plant': plant_to_show
    }

    return render_template('edit.html', **context)


@app.route('/delete/<plant_id>', methods=['POST'])
def delete(plant_id):
    """Delete plant for given plant_id route."""
    plants.delete_one({'_id': ObjectId(plant_id)})
    harvests.delete_many({'plant_id': ObjectId(plant_id)})

    return redirect(url_for('plants_list'))


if __name__ == '__main__':
    app.run(debug=True)
