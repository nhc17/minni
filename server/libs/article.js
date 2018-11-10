const express = require('express'),
      bp = require('body-parser'),
      admin = require('firebase-admin');
      
      

var db = admin.firestore();

var categoryCollection = db.collection('category');
var articlesCollection = db.collection('articles');
var authorsCollection = db.collection('authors');

module.exports = function() {

    const router = express.Router();

    /////////////////////////////////////////////////// READ /////////////////////////////////////////////////////
    // GET array of articles by category     ->   /category/KQ6sO3ucXEpfXvjZ0ko3
    router.get('/category/:id', (req, res) => {
        let categoryId = req.params.id;
        console.log(categoryId);
        if (typeof(categoryId === 'undefined')){
            if (categoryId === '') {
                console.log('category is undefined');
                res.status(500).json({error: "category is undefined"});
            }
        }
        categoryCollection
            .doc(categoryId)
            .get()
            .then(articlesCollection
                .where('category_id', '==', categoryId)
                .get()
                .then(snapshot => {
                    let snapshotPromises = snapshot.docs.map(doc => {
                        const authorId = doc.data().author_id;
                        let articleData = doc.data();

                        if (typeof authorId !== 'undefined') {
                            const authorRef = authorsCollection.doc(authorId);
                            return authorRef.get().then(authorSnapshot => {
                                articleData.author = authorSnapshot.data();
                                return articleData;
                            });
                        } else {
                            return articleData;
                        }
                    });

                    Promise.all(snapshotPromises).then(results => {
                        res.status(200).json(results);
                    });
                  })
                )
                .catch(err => {
                    console.log('Error getting documents', err);
                }); 
            });

    // GET an array of articles by an author  ->  /author/CXanTuiKNdVYCPlIOkEr
    router.get('/author/:id', (req, res) => {
        let authorId = req.params.id;
        console.log(authorId);
        if (typeof(authorId === 'undefined')){
            if (authorId === '') {
                console.log('author is undefined');
                res.status(500).json({error: "author is undefined"});
            }
        }
        authorsCollection
            .doc(authorId)
            .get()
            .then(articlesCollection
                .where('author_id', '==', authorId)
                .get()
                .then(snapshot => {
                    let snapshotPromises = snapshot.docs.map(doc => {
                        const categoryId = doc.data().category_id;
                        let articleData = doc.data();

                        if (typeof categoryId !== 'undefined') {
                            const categoryRef = categoryCollection.doc(categoryId);
                            return categoryRef.get().then(categorySnapshot => {
                                articleData.category = categorySnapshot.data();
                                return articleData;
                            });
                        } else {
                            return articleData;
                        }
                    });

                    Promise.all(snapshotPromises).then(results => {
                        res.status(200).json(results);
                    });
                  })
                
                .catch(err => {
                    console.log('Error getting documents', err);
                })
            )
        });
    

    // GET one article by id  ->   /article/A4286YJgTaSIkfxAl7O3
    router.get('/article/:id', (req, res) => {
        let idValue = req.params.id;
        console.log(idValue);
        if (typeof(idValue === 'undefined')){
            if (idValue === '' ){
                console.log('article is undefined');
                res.status(500).json({error: "article is undefined"});
            }
        }
        articlesCollection
        .doc(idValue)
        .get()
        .then((result) => {
            console.log(result.data());
            var returnResult = {
                id: idValue,
                category_id: result.data().category_id,
                author_id: result.data().author_id,
                title : result.data().title,
                thumbnail_url: result.data().thumbnail_url,
                post_date: result.data().post_date,
                duration: result.data().duration,
                tags: result.data().tags,
                image_url: result.data().image_url,
                content: result.data().content
            }
            res.status(200).json(returnResult)
        })
        .catch(err => {
            console.log('Error getting documents', err);
            res.status(500).json(err);
        })
    });

    /////////////////////////////////////////////////// CREATE /////////////////////////////////////////////////////
    // Add one article 
    router.post('/articles', bp.urlencoded({ extended: true}), bp.json({ limit: "50MB" }), (req, res) => {
        let article = {... req.body };
        console.log(".....articles" + JSON.stringify(article));
        articlesCollection
            .add(article)
            .then(result => res.status(200).json("Article added"))
            .catch(error => res.status(500).json(error));
        })

    /////////////////////////////////////////////////// UPDATE /////////////////////////////////////////////////////
    // Edit article
    router.put('/article/:id', bp.urlencoded({ extended: true }), bp.json({ limit: "50MB" }), (req, res) => {
        let idValue = req.params.id;
        console.log(idValue);
        console.log(JSON.stringify(req.body));
        let article = {... req.body};
        articlesCollection.doc(idValue).update(
            article,
            { merge: true });
            console.log(article)
        res.status(200).json(article);
    });

    /////////////////////////////////////////////////// DELETE /////////////////////////////////////////////////////
    router.delete('/delete/articles/:id', (req, res) => {
        let idValue = req.params.id;
        articlesCollection.doc(idValue).delete().then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            res.status(500).json(error);
        });
    });

    return(router);

}