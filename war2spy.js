document.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("playerStats"));

  let level = saved?.level || 30;
  let hp = saved?.hp || 50;
  let stats = saved?.stats || {
    force: 1,
    intelligence: 1,
    agilite: 1,
    sagesse: 1,
    endurance: 1
  };

  const levelSpan = document.getElementById("level");
  const hpSpan = document.getElementById("hp");
  const titleSpan = document.getElementById("title");
  const logText = document.getElementById("log-text");

  levelSpan.textContent = level;
  hpSpan.textContent = hp;

  // Introduction narrative
  logText.textContent = "Vous arrivez à la tombée du jour. Le camp n'est encore qu'un chaos de toiles et de caisses. À peine les premiers feux allumés, un soldat vient vous chercher : — 'Le commandant veut voir les éclaireurs. C'est urgent.'\n\nLe commandant s'adresse à vous :\n'L'ennemi s'est retranché dans un vieux château. Il nous faut des yeux là-bas. Trois d'entre vous partiront cette nuit.'";

  const choicesContainer = document.getElementById("choices");
  
  // Premiers boutons
  const volunteerBtn = document.createElement("button");
  volunteerBtn.textContent = "Se proposer";
  
  const letOthersBtn = document.createElement("button");
  letOthersBtn.textContent = "Laisser ses amis y aller";

  choicesContainer.appendChild(volunteerBtn);
  choicesContainer.appendChild(letOthersBtn);

  // Gestion du choix "Laisser ses amis y aller"
  letOthersBtn.addEventListener("click", () => {
    showGameOver("Vous regardez vos frères d'armes s'éloigner dans l'obscurité. La nuit passe. Le matin… ne se lève pas. Un assaut brutal. Une confusion. Le camp est submergé. Vous n'avez même pas eu le temps de crier.\n\nL'obscurité n'oublie jamais.");
  });

  // Gestion du choix "Se proposer"
  volunteerBtn.addEventListener("click", () => {
    logText.textContent = "Vous marchez dans la nuit, vos pas aussi discrets que votre souffle. Le château ennemi se dresse, sombre, vivant.";
    showInfiltrationChoices();
  });

  function showInfiltrationChoices() {
    choicesContainer.innerHTML = "";
    
    const infiltrateBtn = document.createElement("button");
    infiltrateBtn.textContent = "S'infiltrer dans le château";
    
    const observeBtn = document.createElement("button");
    observeBtn.textContent = "Observer de loin";

    observeBtn.addEventListener("click", () => {
      showGameOver("Vous grimpez dans les rochers pour mieux voir… Mais une main surgit de l'ombre, puis une lame. Ils vous ont vu avant même que vous les voyiez.\n\nLe silence est parfois trop bruyant.");
    });

    infiltrateBtn.addEventListener("click", () => {
      logText.textContent = "Les portes ne grincent pas. Les gardes tournent la tête au bon moment. C'est… trop facile. Mais vous continuez. Vous notez les mouvements de troupes, les feux, les insignes. Et dans la salle centrale, vous voyez… lui. Le commandant adverse.\n\nIl donne ses dernières consignes. Puis s'éclipse. Vous le suivez dans les couloirs. Il entre dans une pièce. Une chambre. C'est le moment de décider.";
      showFinalChoices();
    });

    choicesContainer.appendChild(infiltrateBtn);
    choicesContainer.appendChild(observeBtn);
  }

  function showFinalChoices() {
    choicesContainer.innerHTML = "";
    
    const assassinateBtn = document.createElement("button");
    assassinateBtn.textContent = "Assassiner le commandant";
    
    const returnBtn = document.createElement("button");
    returnBtn.textContent = "Revenir au camp avec les informations";

    assassinateBtn.addEventListener("click", () => {
      // Calcul des chances de succès basé sur l'agilité et les hp
      const baseChance = 0.8; // 80% de base
      const agilityBonus = (stats.agilite * 0.05); // +5% par point d'agilité
      const hpFactor = (hp / 100) * 0.1; // Bonus de 0 à 10% selon les hp
      const successChance = Math.min(0.95, baseChance + agilityBonus + hpFactor); // Maximum 95% de chances
      
      const success = Math.random() < successChance;
      
      if (success) {
        level += 10;
        titleSpan.textContent = "Lame de l'Ombre";
        logText.textContent = "La lame est rapide. Silencieuse. Définitive. Le commandant meurt sans bruit. Vous repartez, et au matin… l'armée ennemie se rend. Le commandant de votre camp vous attend, bras croisés. — 'Tu ne devrais pas exister. Mais je suis content que tu sois là.'\n\nLa mission est terminée. Les ombres gardent vos secrets. Le château garde ses morts. Votre nom glisse dans les murmures, s'inscrit dans les rapports confidentiels.";
        
        choicesContainer.innerHTML = "";
        
        const disappearBtn = document.createElement("button");
        disappearBtn.textContent = "Disparaître dans la nuit";
        disappearBtn.addEventListener("click", () => {
          saveStats();
          window.location.href = "home.html";
        });
        
        const joinCapitalBtn = document.createElement("button");
        joinCapitalBtn.textContent = "Rejoindre les services secrets de la capitale";
        joinCapitalBtn.addEventListener("click", () => {
          saveStats();
          window.location.href = "capital.html";
        });
        
        choicesContainer.appendChild(disappearBtn);
        choicesContainer.appendChild(joinCapitalBtn);
      } else {
        showGameOver(`Vous entrez, le couteau à la main… mais le commandant se retourne. Il vous plante une dague dans le cœur. Vous tombez, seul dans la pénombre.\n\nUn souffle trop fort… une mission échouée.\n\nChances de succès: ${Math.round(successChance * 100)}%`);
      }
    });

    returnBtn.addEventListener("click", () => {
      // Calcul des chances de succès pour le retour avec informations
      const baseChance = 0.9; // 90% de base
      const agilityBonus = (stats.agilite * 0.02); // +2% par point d'agilité
      const hpFactor = (hp / 100) * 0.05; // Bonus de 0 à 5% selon les hp
      const successChance = Math.min(0.98, baseChance + agilityBonus + hpFactor); // Maximum 98% de chances
      
      const success = Math.random() < successChance;
      
      if (success) {
        level += 5;
        titleSpan.textContent = "Veilleur Silencieux";
        logText.textContent = "Vous revenez discrètement. Vos informations permettent une embuscade parfaite. L'armée ennemie tombe dans le piège. La victoire est nette. Le commandant vous fait appeler. Il ne parle pas beaucoup… Mais il vous salue. Et vous nomme.\n\nLa mission est terminée. Les ombres gardent vos secrets. Le château garde ses morts. Votre nom glisse dans les murmures, s'inscrit dans les rapports confidentiels.";
        
        choicesContainer.innerHTML = "";
        
        const disappearBtn = document.createElement("button");
        disappearBtn.textContent = "Disparaître dans la nuit";
        disappearBtn.addEventListener("click", () => {
          saveStats();
          window.location.href = "home.html";
        });
        
        const joinCapitalBtn = document.createElement("button");
        joinCapitalBtn.textContent = "Rejoindre les services secrets de la capitale";
        joinCapitalBtn.addEventListener("click", () => {
          saveStats();
          window.location.href = "capital.html";
        });
        
        choicesContainer.appendChild(disappearBtn);
        choicesContainer.appendChild(joinCapitalBtn);
      } else {
        showGameOver(`Malgré vos informations, une erreur du commandement coûte la bataille. Vous êtes pris dans la défaite.\n\nConnaître n'est rien quand personne n'écoute.\n\nChances de succès: ${Math.round(successChance * 100)}%`);
      }
    });

    choicesContainer.appendChild(assassinateBtn);
    choicesContainer.appendChild(returnBtn);
  }

  function disableAllButtons() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.disabled = true);
  }

  function showEndingChoice() {
    const popup = document.getElementById("final-choice");
    // On s'assure que la popup est cachée par défaut
    popup.style.display = "none";
    popup.classList.add("hidden");
    
    // Puis on l'affiche uniquement quand la fonction est appelée
    popup.classList.remove("hidden");
    popup.style.display = "flex";
  
    const homeBtn = document.getElementById("go-home");
    const capitalBtn = document.getElementById("go-capital");
  
    // On retire les anciens event listeners s'ils existent
    homeBtn.replaceWith(homeBtn.cloneNode(true));
    capitalBtn.replaceWith(capitalBtn.cloneNode(true));
  
    // On récupère les nouveaux boutons
    const newHomeBtn = document.getElementById("go-home");
    const newCapitalBtn = document.getElementById("go-capital");
  
    // On ajoute les nouveaux event listeners
    newHomeBtn.addEventListener("click", () => {
      window.location.href = "home.html";
    });
  
    newCapitalBtn.addEventListener("click", () => {
      window.location.href = "capital.html";
    });
  
    // Sauvegarde avant de quitter
    saveStats();
  }

  function saveStats() {
    const statsToSave = {
      level,
      hp,
      stats,
      title: titleSpan.textContent
    };
    localStorage.setItem("playerStats", JSON.stringify(statsToSave));
  }

  function showGameOver(text) {
    const popup = document.getElementById("gameover-popup");
    const gameoverText = document.getElementById("gameover-text");
    const restartBtn = document.getElementById("restart-btn");
    
    // Afficher le texte
    gameoverText.textContent = text;
    
    // Afficher la popup
    popup.style.display = "flex";
    popup.classList.remove("hidden");
    
    // Désactiver tous les boutons du jeu
    // disableAllButtons();
    
    // Supprimer les anciens event listeners en clonant le bouton
    const newRestartBtn = restartBtn.cloneNode(true);
    restartBtn.parentNode.replaceChild(newRestartBtn, restartBtn);
    
    // Ajouter l'event listener au nouveau bouton
    newRestartBtn.onclick = () => {
        window.location.href = "index.html";
    };
  }
});
