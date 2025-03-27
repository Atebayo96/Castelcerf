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
  logText.textContent = "Les armes ne sont pas votre domaine, mais le chaos vous entoure malgré tout. On vous assigne à l'arrière. Une voix crie : 'Toi, aide à monter le camp !' Le destin vous regarde... en silence.";

  const wasteTimeBtn = document.getElementById("wastetime-btn");
  const stayNearBtn = document.getElementById("staynear-btn");
  const choicesContainer = document.getElementById("choices");

  wasteTimeBtn.addEventListener("click", () => {
    showGameOver("Vous partez chercher du bois, l'esprit ailleurs. Le destin, lui, reste concentré. Vous tombez nez à nez avec deux silhouettes encapuchonnées. Leur lame est rapide. Votre fin, silencieuse.\n\nPersonne ne trouva votre corps.");
  });

  stayNearBtn.addEventListener("click", () => {
    logText.textContent = "Vous glissez entre les tentes, à portée des grands. Les voix graves murmurent des plans. Les mots sont lourds de conséquences.";
    showListeningChoices();
  });

  function showListeningChoices() {
    choicesContainer.innerHTML = "";
    
    const stayVigilantBtn = document.createElement("button");
    stayVigilantBtn.textContent = "Rester l'Ombre — écouter sans troubler l'équilibre";
    
    const getCloserBtn = document.createElement("button");
    getCloserBtn.textContent = "Avancer entre les toiles, frôler le feu pour capter les secrets";

    stayVigilantBtn.addEventListener("click", () => {
      const success = Math.random() > 0.1; // 90% de chances de succès
      
      if (success) {
        level += 3;
        titleSpan.textContent = "Œil Silencieux";
        logText.textContent = "Vous ne parlez pas. Vous observez. Le commandant vous a vu… mais ne dit rien. À la fin de la bataille, il vous convoque. Il reconnaît en vous l'œil calme et la mémoire aiguisée.";
        
        choicesContainer.innerHTML = "";
        
        const followCommanderBtn = document.createElement("button");
        followCommanderBtn.textContent = "Suivre le destin jusqu'aux portes de la capitale";
        followCommanderBtn.addEventListener("click", () => {
          saveStats();
          window.location.href = "capital.html";
        });
        
        const returnToConventBtn = document.createElement("button");
        returnToConventBtn.textContent = "Rentrer à l'abri des pierres, là où tout a commencé";
        returnToConventBtn.addEventListener("click", () => {
          saveStats();
          window.location.href = "home.html";
        });
        
        choicesContainer.appendChild(followCommanderBtn);
        choicesContainer.appendChild(returnToConventBtn);
      } else {
        showGameOver("Le camp est rasé. Aucun survivant.\n\nNi sabre, ni armure. Seul un feu noir consume le souvenir de vos pas.");
      }
    });

    getCloserBtn.addEventListener("click", () => {
      logText.textContent = "Les généraux tracent des lignes sur une carte. Vous tendez l'oreille, et la mémoire de vos leçons résonne. Ils prévoient d'envoyer l'infanterie sans couverture de cavalerie… une erreur fatale.";
      showFinalChoices();
    });

    choicesContainer.appendChild(stayVigilantBtn);
    choicesContainer.appendChild(getCloserBtn);
  }

  function showFinalChoices() {
    choicesContainer.innerHTML = "";
    
    const intervenirBtn = document.createElement("button");
    intervenirBtn.textContent = "Briser le silence et dévoiler la vérité";
    
    const letThemTalkBtn = document.createElement("button");
    letThemTalkBtn.textContent = "Rester dans l'ombre, et laisser le destin se tromper";

    intervenirBtn.addEventListener("click", () => {
      level += 6;
      titleSpan.textContent = "Stratège de l'Ombre";
      logText.textContent = "Vous sortez de l'ombre. Votre voix coupe la discussion. Les généraux se figent. L'un hurle, un autre vous fait menotter. Mais ils écoutent. Ils appliquent. Et ils gagnent.\n\nQuelques heures plus tard...\n\nOn vous libère. Le commandant ne vous remercie pas… il vous nomme. Dès ce jour, vous êtes sous ses ordres. Non comme un valet… mais comme un stratège.";
      
      choicesContainer.innerHTML = "";
      
      const joinCapitalBtn = document.createElement("button");
      joinCapitalBtn.textContent = "Suivre le commandant pour parfaire votre apprentissage au cœur de la stratégie";
      joinCapitalBtn.addEventListener("click", () => {
        saveStats();
        window.location.href = "capital.html";
      });
      
      const returnToConventBtn = document.createElement("button");
      returnToConventBtn.textContent = "Rentrer au couvent, là où l'esprit peut mûrir à l'abri des batailles";
      returnToConventBtn.addEventListener("click", () => {
        saveStats();
        window.location.href = "home.html";
      });
      
      choicesContainer.appendChild(joinCapitalBtn);
      choicesContainer.appendChild(returnToConventBtn);
    });

    letThemTalkBtn.addEventListener("click", () => {
      showGameOver("Vous restez dans l'ombre. Vous savez ce qu'ils ignorent, mais votre bouche se ferme. L'assaut est donné. L'erreur se paie. Le camp est détruit. Les morts s'accumulent, et vous avec eux.\n\nLe silence fut votre dernier choix.");
    });

    choicesContainer.appendChild(intervenirBtn);
    choicesContainer.appendChild(letThemTalkBtn);
  }

  function showGameOver(text) {
    const popup = document.getElementById("gameover-popup");
    const gameoverText = document.getElementById("gameover-text");
    
    gameoverText.textContent = text;
    popup.style.display = "flex";
    popup.classList.remove("hidden");
    
    //disableAllButtons();
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
