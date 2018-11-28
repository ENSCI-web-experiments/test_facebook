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

Le message `Facebook scraper listening on port 8090` doit alors s'afficher dans le terminal.

## Utilisation 

**Prérequis** : un navigateur Web ou n'importe quel outil ou code permettant d'effectuer des requête HTTP `GET`.

- `http://localhost:8090/friends` : retourne une liste de ses propres amis au format JSON (avec pour chacun son nom et l'adresse de sa page Facebook). Par exemple : 

```json
[ 
	{ 
		"name": "Magali Desbazeille",
		"href": "https://www.facebook.com/magali.desbazeille"
	}, 
	{ 
		"name": "Eric Sadin",
		"href": "https://www.facebook.com/eric.sadin" 
	},
	...
]
```

- `http://localhost:8090/friends?url=<PAGE_URL>` : retourne une liste des amis *visibles* de la personne dont on fournit l'adresse `<PAGE_URL>` de sa page Facebook, au format JSON (avec pour chacun son nom et l'adresse de sa page Facebook). Par exemple (`http://localhost:8090/friends?url=https://www.facebook.com/eric.sadin`) : 

```json
[ 
	{ 
		"name": "Albertine Meunier", 
		"href": "https://www.facebook.com/albertine.meunier" 
	}, 
	{ 
		"name": "Hortense Gauthier",
		"href": "https://www.facebook.com/hortense.gauthier" 
	},
	...
]
```

**Note :** la liste des amis n'est pas exhaustive...

- `http://localhost:8090/images` : retourne une liste de ses propres images au format JSON (avec pour chacune son label, l'adresse de sa page et l'adresse directe de sa miniature). Par exemple : 

```json
[ 
	{
		"label": "L’image contient peut-être : texte qui dit ’Modular settings and 'Creative Light': The legacy of Adolphe Appia in the digital age’",
		"page": "https://www.facebook.com/photo.php?fbid=10214601499845133&set=pb.1051091267.-2207520000.1543395985.&type=3&size=1160%2C432",
		"src": "https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-0/p206x206/46501772_10214601499925135_4735329992211169280_n.jpg?_nc_cat=108&_nc_ht=scontent-cdg2-1.xx&oh=7e66201bdd76f033fb7c64db6bdf7d2c&oe=5CA4C0CE"
	},
	{
		"label": "L’image contient peut-être : texte",
		"page": "https://www.facebook.com/photo.php?fbid=10214589137456081&set=pb.1051091267.-2207520000.1543395985.&type=3&size=1524%2C1038",
		"src": "https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-0/p206x206/46519366_10214589137496082_5737725039260729344_n.jpg?_nc_cat=109&_nc_ht=scontent-cdg2-1.xx&oh=01cd4481add641cc01e50c7416b4c176&oe=5C7261C3"
	},
	...
]
```

- `http://localhost:8090/images?url=<PAGE_URL>` : retourne une liste des images *visibles* de la personne dont on fournit l'adresse `<PAGE_URL>` de sa page Facebook, au format JSON (avec pour chacune son label, l'adresse de sa page et l'adresse directe de sa miniature). Par exemple (`http://localhost:8090/images?url=https://www.facebook.com/eric.sadin`) : 

```json
[ 
	{
		"label": "L’image contient peut-être : 1 personne, sourit, texte",
		"page": "https://www.facebook.com/photo.php?fbid=10156823389968545&set=pb.603433544.-2207520000.1543396293.&type=3&size=518%2C1765",
		"src": "https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-0/p206x206/46765998_10156823389983545_8470758350571700224_o.jpg?_nc_cat=105&_nc_ht=scontent-cdg2-1.xx&oh=951349725a11961735d2ab241be9ef2e&oe=5CABDC2D"
	},
	{
		"label": "L’image contient peut-être : 1 personne, gros plan",
		"page": "https://www.facebook.com/photo.php?fbid=10156816668558545&set=pb.603433544.-2207520000.1543396293.&type=3&size=960%2C540",
		"src": "https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-0/p206x206/46502068_10156816668568545_2865228530621349888_n.jpg?_nc_cat=109&_nc_ht=scontent-cdg2-1.xx&oh=3cbcfc47b8afd946e952fe79e6637137&oe=5C79333D"
	},
	...
]
```

**Note :** la liste des images n'est pas exhaustive...

- `http://localhost:8090/tokens?text=<TEXT>&lang=<LANG>` : équivalent de la requête [tokens](https://github.com/ENSCI-web-experiments/doc/blob/master/text.md#r%C3%A9cup%C3%A9ration-des-tokens--tokens) de l'API [Text](https://github.com/ENSCI-web-experiments/doc/blob/master/text.md) disponible par ailleurs.

- `http://localhost:8090/sentiment?text=<TEXT>&lang=<LANG>` : équivalent de la requête [sentiment](https://github.com/ENSCI-web-experiments/doc/blob/master/text.md#r%C3%A9cup%C3%A9ration-du-sentiment--sentiment) de l'API [Text](https://github.com/ENSCI-web-experiments/doc/blob/master/text.md) disponible par ailleurs.
