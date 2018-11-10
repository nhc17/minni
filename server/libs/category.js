const express = require('express'),
      bp = require('body-parser'),
      admin = require('firebase-admin'),
      router = express.Router();

var db = admin.firestore();

var categoryCollection = db.collection('category');

module.exports = function() {

    const router = express.Router();
    /////////////////////////////////////////////////// READ /////////////////////////////////////////////////////
    // GET array of categories
    router.get('/categories', (req, res) => {
        categoryCollection
        .get()
        .then(snapshot => {
            let categoriesArr = [];
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                var returnResult = {
                    id: doc.id,
                    result: doc.data()
                }
                categoriesArr.push(returnResult);
            });
            res.status(200).json(categoriesArr);
        })
        .catch(err => {
            console.log('Error getting documents', err);
            res.status(500).json(err);
        });
    });

    // GET a category by name   ->    /category?category_name=technology
    router.get('/category', (req, res) => {
        let categoryName = req.query.category_name;
        console.log(categoryName);

        if (typeof(categoryName === 'undefined')){
            if (categoryName === ''){
            console.log('category name is undefined');
            res.status(500).json({error: "category name is undefined"});
            }
        }

        categoryCollection
            .where('category_name', '==', categoryName)
            .get()
            .then((result) => {
                let categoryData = []
            
                categoryData = result.docs.map(value => {
                    return value.data();
                });

                res.status(200).json(categoryData)
            })
            .catch(err => {
                console.log('Error getting documents', err);
                res.status(500).json(err);
            })
    });

    /////////////////////////////////////////////////// CREATE /////////////////////////////////////////////////////
    // Add one category
    router.post('/category', bp.urlencoded({ extended: true}), bp.json({ limit: "50MB" }), (req, res) => {
        let category = {... req.body };
        console.log(".....category" + JSON.stringify(category));
        categoryCollection
            .add(category)
            .then(result => res.status(200).json("Category added"))
            .catch(error => res.status(500).json(error));
        })

    /////////////////////////////////////////////////// UPDATE /////////////////////////////////////////////////////
    // Edit article
    router.put('/category:id', bp.urlencoded({ extended: true }), bp.json({ limit: "50MB" }), (req, res) => {
        let idValue = req.params.id;
        console.log(idValue);
        console.log(JSON.stringify(req.body));
        let category= {... req.body};
        categoryCollection.doc(idValue).update(
            category,
            { merge: true });
            console.log(category)
        res.status(200).json(category);
    });

    /////////////////////////////////////////////////// DELETE /////////////////////////////////////////////////////
    router.delete('/delete/category/:id', (req, res) => {
        let idValue = req.params.id;
        categoryCollection.doc(idValue).delete().then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            res.status(500).json(error);
        });
    });

    return(router);

}