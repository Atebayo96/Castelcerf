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
  logText.textContent = "Les cornes résonnent. Le sol tremble sous vos pieds. Vous êtes en première ligne.";

  const choicesContainer = document.getElementById("choices");
  
  // Premiers boutons
  const hideBtn = document.createElement("button");
  hideBtn.textContent = "Se tapir dans l'ombre du tumulte";
  
  const smartBtn = document.createElement("button");
  smartBtn.textContent = "Avancer avec la sagesse du fer";
  
  const berserkBtn = document.createElement("button");
  berserkBtn.textContent = "Déchaîner la fureur des anciens";

  choicesContainer.appendChild(hideBtn);
  choicesContainer.appendChild(smartBtn);
  choicesContainer.appendChild(berserkBtn);

  hideBtn.addEventListener("click", () => {
    showGameOver("Alors que les premiers rangs se désorganisent, une flèche hasardeuse, tirée sans cible, trouve votre nuque.\n\nVotre nom s'éteint avant d'avoir été crié.");
  });

  smartBtn.addEventListener("click", () => {
    logText.textContent = "Vous observez, respirez, et avancez avec prudence, entre les cris et les lames.\nMais la guerre ne respecte pas les précautions.";
    const outcome = Math.random();
    if (outcome < 0.5) {
      logText.textContent += "\n\nLes premières lignes s'effondrent, vos camarades tombent.";
    } else {
      logText.textContent += "\n\nLa ligne de front résiste, vous percez les défenses ennemies.";
    }
    showAdvanceChoices();
  });

  berserkBtn.addEventListener("click", () => {
    const enduranceScore = stats.endurance || 1;
    const hpScore = hp || 1;
    const chanceSurvie = Math.min(0.95, (enduranceScore * 5 + hpScore) / 200);

    if (Math.random() > chanceSurvie) {
      showGameOver("Vous hurlez encore… mais plus personne ne vous entend. Les lignes cèdent, vos alliés tombent. Vous frappez, vous mordez, vous saignez… puis tout devient noir. Votre rage s'éteint, seule, au milieu des cadavres.");
    } else {
      logText.textContent = "Vos yeux se ferment à la peur. Votre cri fend le ciel.\nVous foncez, lame en avant, porté par une fureur ancienne.";
      showBerserkChoices();
    }
  });

  function showAdvanceChoices() {
    choicesContainer.innerHTML = "";

    const helpBtn = document.createElement("button");
    helpBtn.textContent = "Aider les blessés et se battre";

    const retreatBtn = document.createElement("button");
    retreatBtn.textContent = "Rester en retrait";

    helpBtn.addEventListener("click", () => {
        logText.textContent = "Vos camarades aperçoivent votre courage. Votre présence galvanise les troupes.\nGrâce à votre aide, les lignes se stabilisent et vous commencez à avancer...";
        showCommanderChoices();
    });

    retreatBtn.addEventListener("click", () => {
        showGameOver("Vous restez en retrait, observant avec impuissance vos frères d'armes se faire décimer un à un.\n\nLa culpabilité vous ronge alors que leurs cris d'agonie résonnent dans l'air.\n\nQuand enfin vous tentez de fuir, une volée de flèches trouve votre dos.\n\nVotre lâcheté sera votre dernière pensée.");
    });

    choicesContainer.appendChild(helpBtn);
    choicesContainer.appendChild(retreatBtn);
  }

  function showCommanderChoices() {
    choicesContainer.innerHTML = "";
    
    const killCommanderBtn = document.createElement("button");
    killCommanderBtn.textContent = "Tuer le commandant ennemi maintenant pour renverser le cours de la bataille";
    
    const waitBtn = document.createElement("button");
    waitBtn.textContent = "Temporiser en attendant les renforts";

    killCommanderBtn.addEventListener("click", () => {
        // Calcul des chances de réussite basé sur les stats
        const forceScore = stats.force || 1;
        const agiliteScore = stats.agilite || 1;
        const enduranceScore = stats.endurance || 1;
        
        const chanceReussite = Math.min(0.95, (forceScore * 3 + agiliteScore * 2 + enduranceScore) / 200);

        if (Math.random() < chanceReussite) {
            level += 6;
            titleSpan.textContent = "Héraut Sanglant";
            logText.textContent = "Vous bondissez. L'ennemi ne vous voit pas venir. D'un coup sec, vous tranchez sa gorge. Le moral de ses troupes s'effondre.";
            showVictoryPopup();
        } else {
            showGameOver("Votre assaut était brave, mais le commandant était trop bien protégé.\nSes gardes vous encerclent.\nVotre dernière vision est celle de son sourire cruel.");
        }
    });

    waitBtn.addEventListener("click", () => {
        showGameOver("Patienter n'a pas suffi...\n\nLes renforts n'arrivent jamais.\nLe commandant ennemi organise une charge dévastatrice.\nVos lignes, déjà fragiles, s'effondrent complètement.\n\nVotre prudence a scellé le destin de vos frères d'armes.");
    });

    choicesContainer.appendChild(killCommanderBtn);
    choicesContainer.appendChild(waitBtn);
  }

  function showBerserkChoices() {
    choicesContainer.innerHTML = "";
  
    const persistBtn = document.createElement("button");
    persistBtn.textContent = "Persister dans l'avance solitaire";
    
    const backBtn = document.createElement("button");
    backBtn.textContent = "Consolider la ligne et attendre vos frères d'armes";

    persistBtn.addEventListener("click", () => {
        logText.textContent = "Le sang recouvre vos bras, la fureur ne faiblit pas.\nAu loin, juché sur son destrier noir, le commandant ennemi vous fixe.\nSon heaume luit sous les éclairs. Vous le voyez. Il vous voit.\n\nMais déjà, les rangs ennemis se referment autour de vous.\nLe sol tremble. Les lames se lèvent.\nVotre choix scellera le destin de ce champ.";
        showFinalChoices();
    });

    backBtn.addEventListener("click", () => {
        level += 2;
        titleSpan.textContent = "Gardien du Front";
        logText.textContent = "Vous reprenez vos esprits. Derrière vous, vos frères tombent. Vous courez vers eux, portez, couvrez, tenez. Les renforts arrivent. Grâce à vous.";
        showVictoryPopup();
    });

    choicesContainer.appendChild(persistBtn);
    choicesContainer.appendChild(backBtn);
  }

  function showFinalChoices() {
    choicesContainer.innerHTML = "";
  
      const chargeCmdBtn = document.createElement("button");
      chargeCmdBtn.textContent = "Foncer sur le commandant ennemi";
    
    const continueMassacreBtn = document.createElement("button");
    continueMassacreBtn.textContent = "Continuer à massacrer les troupes";

    chargeCmdBtn.addEventListener("click", () => {
        level += 6;
        titleSpan.textContent = "Héraut Sanglant";
        logText.textContent = "Vous bondissez. L'ennemi ne vous voit pas venir. D'un coup sec, vous tranchez sa gorge. Le moral de ses troupes s'effondre.";
        showVictoryPopup();
    });

    continueMassacreBtn.addEventListener("click", () => {
        showGameOver("Vous ne vous arrêtez plus. Vous êtes une machine. Chaque coup déchire, chaque souffle raccourcit.\n\nMais votre corps cède.\nLe sang, la fatigue, la fièvre…\n\nVous vous écroulez, seul, debout.\nL'honneur n'a pas sauvé votre chair.");
    });

    choicesContainer.appendChild(chargeCmdBtn);
    choicesContainer.appendChild(continueMassacreBtn);
  }

  function showVictoryPopup() {
    const victoryPopup = document.getElementById("victory-popup");
    const capitalBtn = document.getElementById("capital-btn");
    const conventBtn = document.getElementById("convent-btn");
    
    // Supprimer les anciens event listeners en clonant les boutons
    const newCapitalBtn = capitalBtn.cloneNode(true);
    const newConventBtn = conventBtn.cloneNode(true);
    capitalBtn.parentNode.replaceChild(newCapitalBtn, capitalBtn);
    conventBtn.parentNode.replaceChild(newConventBtn, conventBtn);
    
    // Ajouter les nouveaux event listeners
    newCapitalBtn.addEventListener("click", () => {
        saveStats();
        window.location.href = "capital.html";
    });
    
    newConventBtn.addEventListener("click", () => {
        saveStats();
      window.location.href = "home.html";
    });
  
    // Afficher la popup
    victoryPopup.style.display = "flex";
    victoryPopup.classList.remove("hidden");
  }

  function showGameOver(text) {
    const popup = document.getElementById("gameover-popup");
    const gameoverText = document.getElementById("gameover-text");
    
    gameoverText.textContent = text;
    popup.style.display = "flex";
    popup.classList.remove("hidden");
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
});
