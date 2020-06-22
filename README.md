# Peps
Peps is a project in development. The goal is to allow anyone to easily develop games on smartphone.
People develop games on a website and see their game simultaneiously in debugging mode on their phone via the Peps app.
Then, people can publish their game on the Peps app, anyone will be able to try it.
# Peps website (documentation in french)
Le site et l'application sont encore en cours de développement.
## Setup
1. Installez l’application Peps sur App Store ou Play Store.
2. Rendez-vous sur le site de Peps et créez un projet.
3. Tapez CONSOLE à la toute première ligne de code de votre projet, vous devriez voir la console s’afficher sur votre téléphone. Pour la retirer, enlevez CONSOLE.
4. Enjoy !
## Types primitifs
Les types primitifs sont les types les plus simples que l’on puisse trouver en Peps.
(Note: dans cette documentation, anyType désignera n’importe quel type primitif).
### string
- Description: Chaîne de caractères définie par des guillemets.
- Exemple: ```“Ma chaîne de caractères"```
### number
- Description: Nombre pouvant être entier ou à virgule (la virgule est représentée par un point).
- Exemples: ```8``` ```42.7```
### boolean
- Description: Type n’ayant que deux valeurs possibles: true (vrai) ou false (faux)
- Exemples: ```true``` ```false```
### undefined
- Description: Type représentant une valeur indéfinie. Valeur retournée lorsque l’élément demandé n’a pas été défini, ou lorsque la variable a été définie comme indéfinie.
- Exemple: ```undefined```
## Fonctions basiques:
### Afficher des valeurs sur la console
```
print(anyType param1,  anyType param2, ..., anyType paramN)
```
- Description: Affiche des valeurs sur la console.
- Paramètres: Autant de paramètres que l’on veut de n’importe quel type.
- Type de valeur retourné par la fonction: ```undefined```.
### Définir une variable
```
setVar(string variableName, anyType variableValue)
```
- Description: Défini une variable.
- Paramètres:
  - ```variableName```: le nom de la variable que l’on veut définir (si ce nom de variable existe déjà l’ancienne valeur sera écrasée),
  - ```variableValue```: la valeur de la variable.
- Type de valeur retourné par la fonction: ```undefined```
### Récupérer une variable
```
getVar(string variableName)
```
- Description: Récupère la valeur d’une variable.
- Paramètres:
  - ```variableName```: le nom de la variable dont on veut récupérer la valeur.
- Type de valeur retournée par la fonction: ```anyType``` (type de la valeur de la variable).
### Attendre avant d'exécuter une fonction
```
wait(number delay, function functionTriggeredAfterWait)
```
- Description: Exécute une fonction après un délai défini.
- Paramètres: 
  - ```delay```: le délai d’attente avant exécution de la fonction en millisecondes,
  - ```functionTriggeredAfterWait```: la fonction exécutée après le délai choisi.
- Type de valeur retournée par la fonction: ```undefined```.
## Conditions
### if
#### Description
Le contenu du ```if()``` est exécuté si le paramètre renvoie la valeur ```true```.
#### Forme
```
if (boolean myCondition):
  myCodeExecutedOnlyIfMyConditionIsTrue()
```
#### Exemple
```
if (2 + 2 == 4):
  print("2 + 2 est égal à 4")
```
### else
#### Description
Le contenu du ```else``` correspond à "sinon". Il est toujours précédé d'un ```if()```.
#### Forme
```
if (boolean myCondition):
  myCodeExecutedOnlyIfMyConditionIsTrue()
else:
  myCodeExecutedOnlyIfMyConditionIsFalse()
```
#### Exemple
```
if (2+2 == 5):
  print("2 + 2 est égal à 5") //cette ligne ne sera pas exécutée
else:
  print("2 + 2 n'est pas égal à 5") //cette ligne sera exécutée
```
## Types complexes
Les types complexes sont les types qui retournent une valeur dont le type est simple.
### function
#### Description
Fonction qui exécute du code et retourne une valeur.
#### Exemples
##### Définition d'une fonction
```
function myFunctionName(myParameter):
  myCode(getVar("myParameter")) //on considère le paramètre myParameter comme une variable interne à la fonction.
  return "my value"
  
//ici nous sommes à l'extérieur de la fonction, on ne peut plus récupérer myParameter.
 ```
##### Utilisation d'une fonction
```
myFunctionName(42) //ceci exécutera la fonction, donc myCode(42)
```
##### Utilisation d’une fonction en tant que paramètre
```
print(myFunctionName(42)) //ceci exécutera la fonction, donc myCode(42) et affichera la valeur retournée, ici "my value".
```
##### Type de valeur primitif retourné par le type complexe
```anyType```
### equality
#### Description
Egalité permettant de réaliser des tests entre deux valeur anyType au sein du code. Plusieurs types d’égalités:
- == : Vérifier si deux valeurs sont égales;
- != : Vérifier si deux valeurs ne sont pas égales;
- \> : Vérifier si une valeur est plus grande que l’autre;
- < : Vérifier si une valeur est plus petite qu’une autre;
- \>= : Vérifier si une valeur est plus grande ou égale qu’une autre;
- <= : Vérifier si une valeur est plus petite ou égale qu’une autre.
#### Exemples
```
print(2 == 2) //affiche true sur la console
```
```
print("test" != "test") //affiche false sur la console
```
#### Type de valeur primitif retourné par le type complexe
```boolean```
### operation
#### Description
Opération mathématique entre plusieurs valeurs de type number à partir des opérateurs suivants:
- \+ : addition
- \- : soustraction
- \* : multiplication
- / : division
#### Exemples
```
print(2 + 2) //affiche 4 sur la console
```
```
print(5 / 7 * 86 + 42 - 8) //affiche 95.42857142857143 sur la console
```
#### Type de valeur primitif retourné par le type complexe
```number```
## Exemple de code
```
//le code n'est pas encore écrit
```
