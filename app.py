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
seeds = mongo.db.seeds
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


@app.route("/seeds")
def seeds_list():
    """Display the seeds list page."""
    seeds_data = seeds.find()

    context = {
        'seeds': seeds_data
    }
    return render_template('seeds_list.html', **context)


@app.route('/about')
def about():
    """Display the about page."""
    return render_template('about.html')


@app.route('/plant/create', methods=['GET', 'POST'])
def plant_create():
    """Display create plant page. Process data from the form."""
    if request.method == 'POST':
        seed_id = request.form['seed']
        seeds.delete_one({'_id': ObjectId(seed_id)})

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

        return redirect(url_for('plant_detail', **context))

    seeds_data = seeds.find()

    context = {
        'seeds': seeds_data
    }

    return render_template('plant_create.html', **context)


@app.route('/seed/create', methods=['GET', 'POST'])
def seed_create():
    """Display create seed page. Process data from the form."""
    if request.method == 'POST':
        new_seed = {
            'name': request.form['seed_name'],
            'variety': request.form['variety'],
            'photo_url': request.form['photo'],
            'date_aquired': request.form['date_aquired']
        }

        seed = seeds.insert_one(new_seed)
        seed_id = seed.inserted_id

        context = {
            'seed': seed,
            'seed_id': seed_id
        }

        return redirect(url_for('seed_detail', **context))

    return render_template('seed_create.html')


@app.route('/plant/<plant_id>')
def plant_detail(plant_id):
    """Display the plant detail page & process data from the harvest form."""
    plant_to_show = plants.find_one_or_404({'_id': ObjectId(plant_id)})
    harvests_to_show = harvests.find({'plant_id': ObjectId(plant_id)})

    context = {
        'plant': plant_to_show,
        'plant_id': plant_to_show['_id'],
        'harvests': harvests_to_show
    }
    return render_template('plant_detail.html', **context)


@app.route('/seed/<seed_id>')
def seed_detail(seed_id):
    """Display the plant detail page & process data from the harvest form."""
    seed_to_show = seeds.find_one_or_404({'_id': ObjectId(seed_id)})

    context = {
        'seed': seed_to_show,
        'seed_id': seed_to_show['_id']
    }
    return render_template('seed_detail.html', **context)


@app.route('/harvest/<plant_id>', methods=['POST'])
def harvest(plant_id):
    """Accept a POST request data for 1 harvest and insert into database."""
    plant_to_harvest = plants.find_one_or_404({'_id': ObjectId(plant_id)})
    name = p.plural(plant_to_harvest['name'].lower())

    new_harvest = {
        'quantity': f"{request.form['harvested_amount']}",
        'name': name,
        'date': request.form['date_harvested'],
        'plant_id': plant_to_harvest['_id']
    }

    harvests.insert_one(new_harvest)

    return redirect(url_for('detail', plant_id=plant_id))


@app.route('/plant/edit/<plant_id>', methods=['GET', 'POST'])
def plant_edit(plant_id):
    """Show the plant edit page and accept a POST request with edited data."""
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

        return redirect(url_for('plant_detail', plant_id=plant_id))

    plant_to_show = plants.find_one_or_404({'_id': ObjectId(plant_id)})

    context = {
        'plant': plant_to_show
    }

    return render_template('plant_edit.html', **context)


@app.route('/seed/edit/<seed_id>', methods=['GET', 'POST'])
def seed_edit(seed_id):
    """Show the seed edit page and accept a POST request with edited data."""
    if request.method == 'POST':

        seeds.update_one(
            {'_id': ObjectId(seed_id)},
            {
                '$set': {
                    'name': request.form['seed_name'],
                    'variety': request.form['variety'],
                    'photo_url': request.form['photo'],
                    'date_aquired': request.form['date_aquired']
                }
            })

        return redirect(url_for('seed_detail', seed_id=seed_id))

    seed_to_show = seeds.find_one_or_404({'_id': ObjectId(seed_id)})

    context = {
        'seed': seed_to_show
    }

    return render_template('seed_edit.html', **context)


@app.route('/plant/delete/<plant_id>', methods=['POST'])
def plant_delete(plant_id):
    """Delete plant for given plant_id route."""
    plants.delete_one({'_id': ObjectId(plant_id)})
    harvests.delete_many({'plant_id': ObjectId(plant_id)})

    return redirect(url_for('plants_list'))


@app.route('/seed/delete/<seed_id>', methods=['POST'])
def seed_delete(seed_id):
    """Delete seed for given seed_id route."""
    seeds.delete_one({'_id': ObjectId(seed_id)})

    return redirect(url_for('seeds_list'))


if __name__ == '__main__':
    app.run(debug=True)
