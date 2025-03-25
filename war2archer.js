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
  
    const frontlineBtn = document.getElementById("frontline-btn");
    const staybackBtn = document.getElementById("stayback-btn");
  
    staybackBtn.addEventListener("click", () => {
      showGameOver("Alors que les premiers rangs se désorganisent, un chevalier ennemi perce les défenses. Sa lance file dans les airs… vous n'avez pas le temps de crier.");
    });
  
    frontlineBtn.addEventListener("click", () => {
      logText.textContent = "Vous vous avancez sans hésitation. Votre bras est ferme. Vos flèches sifflent à travers le champ. Vous touchez. Vous avancez.\n\nLa bataille gronde. Vos flèches fauchent l'ennemi. Mais vous savez que la clé se joue plus haut, plus loin…";
      showStrategicChoices();
    });
  
    function showStrategicChoices() {
      const container = document.getElementById("choices");
      container.innerHTML = "";
      
      const highGroundBtn = document.createElement("button");
      highGroundBtn.textContent = "Chercher un point de vue en hauteur";
      
      const stayWithBattalionBtn = document.createElement("button");
      stayWithBattalionBtn.textContent = "Rester avec votre bataillon, tenir la ligne";

      highGroundBtn.addEventListener("click", () => {
        logText.textContent = "Vous grimpez sur un affleurement rocheux. Le vent porte vos cheveux, mais votre regard perce le tumulte. Et là… vous apercevez le commandant ennemi au loin.";
        showFinalChoices();
      });

      stayWithBattalionBtn.addEventListener("click", () => {
        logText.textContent = "Vos flèches trouvent leurs cibles, encore et encore. Mais pour chaque ennemi qui tombe, trois autres surgissent. Autour de vous, vos frères d'armes s'effondrent un à un. Le flot est sans fin, la marée monte. Votre carquois s'allège, votre souffle se raccourcit.";
        
        showBattalionChoices();
      });

      container.appendChild(highGroundBtn);
      container.appendChild(stayWithBattalionBtn);
    }
  
    function showBattalionChoices() {
      const container = document.getElementById("choices");
      container.innerHTML = "";
      
      const takeActionBtn = document.createElement("button");
      takeActionBtn.textContent = "Prendre de la hauteur pour renverser le cours de la bataille";
      
      const retreatBtn = document.createElement("button");
      retreatBtn.textContent = "Reculer pour préserver vos forces";

      takeActionBtn.addEventListener("click", () => {
        logText.textContent = "Dans un dernier effort, vous vous arrachez à la mêlée. Vos jambes vous portent jusqu'à un promontoire rocheux. De là-haut, votre regard embrasse enfin le champ de bataille dans son ensemble. Et c'est là que vous le voyez...";
        showFinalChoices();
      });

      retreatBtn.addEventListener("click", () => {
        showGameOver("Alors que vous faites volte-face, une volée de flèches obscurcit le ciel. L'une d'elles trouve votre dos. Votre dernier souffle s'échappe dans la poussière de la bataille.");
      });

      container.appendChild(takeActionBtn);
      container.appendChild(retreatBtn);
    }
  
    function showFinalChoices() {
      const container = document.getElementById("choices");
      container.innerHTML = "";
      
      const shootBtn = document.createElement("button");
      shootBtn.textContent = "Tenter de l'abattre avec votre plus belle flèche";
      
      const observeBtn = document.createElement("button");
      observeBtn.textContent = "Observer les lignes ennemies sans tirer";
  
      shootBtn.addEventListener("click", () => {
        const agilityBonus = stats.agilite * 0.1;
        const intelligenceBonus = stats.intelligence * 0.1;
        const hpPenalty = (100 - hp) * 0.005;
        const successChance = Math.min(0.95, 0.6 + agilityBonus + intelligenceBonus - hpPenalty);
        
        if (Math.random() < successChance) {
          level += 8;
          titleSpan.textContent = "Œil du Crépuscule";
          logText.textContent = "Votre flèche fend l'air comme l'éclair déchire le ciel, porteuse d'un destin inexorable. Le temps lui-même semble ralentir alors qu'elle trace sa trajectoire mortelle. Un cri déchire la bataille - le commandant ennemi, touché en pleine poitrine, vacille sur sa monture avant de s'effondrer dans un fracas de métal et de chair. Le silence s'abat sur le champ de bataille comme un linceul. Les rangs ennemis, privés de leur guide, hésitent, tremblent, puis se délitent comme la brume du matin. La victoire résonne dans l'air comme un chant ancien, et votre nom se murmure déjà dans les rangs.";
          
          showEndingChoices();
        } else {
          showGameOver("La flèche rate sa cible. Une volée ennemie vous transperce, isolé, visible.");
        }
      });
  
      observeBtn.addEventListener("click", () => {
        const intelligenceBonus = stats.intelligence * 0.1;
        const wisdomBonus = stats.sagesse * 0.1;
        const successChance = Math.min(0.95, 0.7 + intelligenceBonus + wisdomBonus);
        
        if (Math.random() < successChance) {
          level += 6;
          titleSpan.textContent = "Sentinelle de la Victoire";
          logText.textContent = "Votre regard perce le voile du chaos. Là où d'autres ne voient que confusion, vous discernez le motif caché. Une faille dans leur formation, une faiblesse dans leur danse mortelle. Vos mots guident les lames de vos frères. La contre-attaque est foudroyante, précise comme une flèche dans la nuit. L'ennemi, pris dans son propre piège, vacille puis s'effondre. La victoire porte l'empreinte de votre vision.";
          
          showEndingChoices();
        } else {
          showGameOver("Vous êtes interrompu. Le commandement n'écoute pas. La faille devient une brèche. Le camp tombe.");
        }
      });
  
      container.appendChild(shootBtn);
      container.appendChild(observeBtn);
    }
  
    function showEndingChoices() {
      const container = document.getElementById("choices");
      container.innerHTML = "";
      
      const capitalBtn = document.createElement("button");
      capitalBtn.textContent = "Suivre les étendards vers la capitale, où votre talent pourrait forger l'Histoire";
      capitalBtn.addEventListener("click", () => {
        saveStats();
        window.location.href = "capital.html";
      });
      
      const conventBtn = document.createElement("button");
      conventBtn.textContent = "Retrouver la paix des murs qui vous ont vu naître, là où le silence guérit les âmes";
      conventBtn.addEventListener("click", () => {
        saveStats();
        window.location.href = "home.html";
      });
      
      container.appendChild(capitalBtn);
      container.appendChild(conventBtn);
    }
  
    function showGameOver(text) {
      const popup = document.getElementById("gameover-popup");
      const gameoverText = document.getElementById("gameover-text");
      
      gameoverText.textContent = text;
      popup.style.display = "flex";
      popup.classList.remove("hidden");
      
      //disableAllButtons();
    }
  
    function disableAll() {
      const allBtns = document.querySelectorAll("button");
      allBtns.forEach(btn => btn.disabled = true);
    }
  
    function disableAllButtons() {
      const buttons = document.querySelectorAll("button");
      buttons.forEach(button => button.disabled = true);
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
  