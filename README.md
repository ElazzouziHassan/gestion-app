# README - Application Mobile de Gestion des Cycles de Master:

![Application](/public/banner.png)

Cette application mobile permet aux étudiants et professeurs d’accéder facilement aux informations relatives aux cycles de master à la Faculté des Sciences de l'Université Chouaib Doukkali. Elle offre une gestion optimisée des emplois du temps, des modules.

## 📝 Structure du Projet:
```xml
  📂 app  
  │── 📂 auth  
  │   📂 professors       
  │   📂 students          
  │   index.js        
  │── 📂 assets             
  │── 📂 components         
  │── 📂 public             
  App.js
  index.js    
  │── package.json          
  │── README.md
``` 

## 🚀 Fonctionnalités Principales:

## *🎓 Étudiants*:
- Consultation des emplois du temps par semestre.
- Accès aux modules et informations associées.
- Génération d’une carte d’étudiant PDF avec QR code.
- Possibilité de signaler une erreur via un système de demandes.
- Notifications en cas de modification d’un cours.

## *👨‍🏫 Professeurs*:
- Accès aux emplois du temps des cours enseignés.
- Liste des modules et étudiants concernés.
- Génération d’une carte d’identification PDF avec QR code.
- Possibilité de signaler des erreurs via un système de demandes.

## 🛠️ Technologies Utilisées:
*Frontend (Application Mobile)*:
- React Native (framework principal).
- Expo (facilitant le développement et le déploiement).

*Backend & Base de Données*:
- Next.js (API en TypeScript) avec Express.
- MongoDB pour la gestion des utilisateurs et données spécifiques.
- JWT & OAuth2 pour l’authentification sécurisée.

## 📲 Installation et Lancement:
**Prérequis**
- Node.js installé.
- Expo CLI installé globalement : `npm install -g expo-cli`

## Étapes d’Installation :
*Cloner le projet*
```xml
  SSH : git@github.com:ElazzouziHassan/gestion-app.git
  HTTPS : https://github.com/ElazzouziHassan/gestion-app.git
  GitHub CLI : gh repo clone ElazzouziHassan/gestion-app
```

*Installer les dépendances et Lancer l’application mobile*
```xml
  cd gestion-app
  npm install
  expo start
```
## 🔐 Authentification et Sécurité:
- Authentification via JWT avec gestion des rôles (Admin, Professeur, Étudiant).
- Sécurisation des routes via middlewares.
- Chiffrement des mots de passe avec bcrypt.

## 🛠 Améliorations Futures:
- Intégration avec le projet 2(*Application de Gestion des Emplois du Temps et Réservation des Salles*).
- Ajout d’un système de feedback pour signaler des erreurs dans l’emploi du temps.
- Optimisation des performances et du design UI/UX.

---
📧 Contact & Support
Si vous avez des questions ou des suggestions, veuillez contacter ezhassan.info@gmail.com.