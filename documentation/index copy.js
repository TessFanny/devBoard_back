

// SERVER CONFIGURATION

// initialisation du server

require('dotenv').config();

const app = express();
const router = require("../app/router")
// Ces deux lignes de code sont utilisées pour obtenir le chemin du répertoire parent du fichier actuel dans une application Node.js.

const filename = fileURLToPath(import.meta.url);
const _DirectoryName = path.dirname(filename);

// HELMET LE CASQUE DE LA REQUETE HTTP ! rajoute des http headers aux requetes http

// applique plusieurs politiques de sécurité HTTP recommandées par défaut pour améliorer 
// la sécurité de l' application, telles que la protection contre les attaques de script intersites (XSS), 
// l'interdiction du chargement de ressources dans des cadres (frame) et la désactivation de l'en-tête de réponse "X-Powered-By" 
// qui peut donner des informations sur le serveur de l' application.

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));

app.use(express.json());
// enregistre les informations de journalisation des requêtes HTTP 
// de l'application dans le format de journalisation "common".

app.use(morgan("common"));

// permet à l'application de gérer les données JSON et URL encoded dans la limite fixé par le paramètre limit

app.use(bodyParser.json({limit:"50mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"50mb", extended:true}));

// permet les requêtes HTTP cross-origin, c'est-à-dire des requêtes provenant d'un domaine différent de celui de l'application.
app.use(cors());

//  permet de servir des fichiers statiques au sein d'une route particulière

app.use("/assets", express.static(path.join(_DirectoryName, 'public/assets')));

//  permettent à Multer de stocker les fichiers téléchargés dans le dossier "public/assets" sur le serveur en conservant leur nom d'origine.

const storage = multer.diskStorage({
    destination: function(req, file, cb ){
        cb (null, "public/assets");
    },
    filename: function(req, file , cb ){
        cb (null, file.originalname);
    }
});

const upload = multer({storage});

// REDIRECTION ROUTER 

app.use(router)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server ready:  http://localhost:${port}`);

});