import * as React from 'react';
import {Route, Link} from 'react-router-dom';

class DeleteArticle extends React.Component {
    state = { redirection: false };

    constructor (props) {
        super(props)
        const userConnect = JSON.parse(localStorage.getItem('userConnect'));
        
        this.state = {
            userId: userConnect.userId,
            isAdmin: userConnect.userAdmin
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault()

        const storage = JSON.parse(localStorage.getItem('userConnect'));
        let token = "Bearer " +  storage.token;
      
        const requestOptions = {
            method: 'delete',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify(this.state)
        };

        let articlePage = JSON.parse(localStorage.getItem('articlePage'));
        let articleId = articlePage.id

        fetch(('http://localhost:3000/api/articles/' + articleId), requestOptions)
                .then(response => response.json())
                .then(
                    (response) => {
                        if (response.error) { 
                            this.setState({ redirection: true })
                            alert("Votre article n'a pas pu être supprimé."); 
                        } else { 
                            this.setState({ redirection: true })
                            alert("Votre article à bien été supprimé !");
                            
                        }
                    }
                )
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    console.error('There was an error!', error);
                }
            );
    }

    render () {
        const { redirection } = this.state;
        if (redirection) {
            return <Route to='/articles' />;
        }

        return <React.Fragment>
            <div className="container">
                <h1>Souhaitez vous vraiment supprimer cet article ?</h1>
                <div className="form-submit">
                    <Link to={'/articles/'} className="btn btn-outline-info btn-sm">Retour aux articles</Link>
                    <button className="btn btn-outline-danger btn-sm" onClick={this.handleSubmit}>Supprimer cet article</button>
                </div>
            </div>
        </React.Fragment>
    };
};

export default DeleteArticle;