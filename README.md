# THIS README NEEDS TO BE WRITTEN
## What is this?
Something about what this is

## Getting up and running

To download the dependencies for the frontend and backend, run:

```console
pipenv install
pipenv shell
npm install --prefix client
```

You can run your Flask API on [`localhost:5555`](http://localhost:5555) by
running:

```console
python server/app.py
```

You can run your React app on [`localhost:4000`](http://localhost:4000) by
running:

```sh
npm start --prefix client
```

## Core Deliverables



### Models
Use the following commands to create the initial database `app.db`:

```console
export FLASK_APP=server/app.py
flask db init
flask db migrate
flask db upgrade head
```


Update `server/models.py` to establish the model relationships. Since a
`RestaurantPizza` belongs to a `Restaurant` and a `Pizza`, configure the model
to cascade deletes.

Set serialization rules to limit the recursion depth.

Run the migrations and seed the database:

```console
flask db revision --autogenerate -m 'message'
flask db upgrade head
python server/seed.py
```

