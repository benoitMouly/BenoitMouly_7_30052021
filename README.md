# BenoitMouly_7_30052021

<b>Pour démarrer le projet : </b>
1. Créer une base de donnée MySQL nommée 'GROUPOMANIA'
2. Créer un dossier appelé " images " -> \BenoitMouly_7_30052021-master\back\images
3. Back -> npm install -> node server.js (pour démarrer le server)
4. Front -> npm install -> npm run serve (pour démarrer le server) 

PUIS

4. Inscrivez-vous, et vous pourrez avoir accès aux fonctionnalités.

<b>Concernant les droits administrateurs, vous devez les ajouter manuellement comme suit : <br/></b>
UPDATE `USERS` SET `RIGHT` = 1 WHERE `id` = 1; (si votre id est le 1)

<b>POUR REMETTRE LA BDD à 0</b>

Décommentez la partie " reset your db " dans back/app.js

