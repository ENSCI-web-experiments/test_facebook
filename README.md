# test_facebook
Test d'automatisation d'extraction de données depuis Facebook

## Prérequis

- Installer [node.js](https://nodejs.org/en/) version LTS
- Disposer d'un compte Facebook...

## Installation

- Télécharger ou clôner le dépôt GitHub ;
- Avec le Terminal, à l'intérieur du dossier `test_facebook`, exécuter la commande suivante : `npm install`
- Dans le même dossier, créer un fichier nommé `user_data.json` et y renseigner votre email et mot de passe Facebook en respectant le format suivant :

```json
{
    "email": "votre_email@example.com",
    "password": "votre mot de passe"
}
```

**ATTENTION** : Ne jamais publier ou mettre en partage le fichier `user_data.json` ! Il doit demeurer dans votre ordinateur personnel et nulle part ailleurs !

## Exécution

Avec le Terminal, à l'intérieur du dossier `test_facebook`, exécuter la commande suivante : `node .`