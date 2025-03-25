document.addEventListener("DOMContentLoaded", () => {
    const saved = JSON.parse(localStorage.getItem("playerStats"));
  
    let level = saved?.level || 20;
    let hp = saved?.hp || 50;
    let stats = saved?.stats || {
      force: 1,
      intelligence: 1,
      agilite: 1,
      sagesse: 1,
      endurance: 1
    };
    let role = null;
  
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");
    const startBtn = document.getElementById("start-battle-btn");

    popupText.innerHTML = `
      <strong>L'appel des armes</strong><br>
      Vous êtes à peine plus qu'un enfant, mais votre détermination brûle plus fort que les flammes des villages en ruines.<br>
      Les recruteurs hésitent, murmurent entre eux...<br>
      Quelque chose en vous – un éclat dans les yeux, une posture, une trace oubliée d'ascendance – les pousse à ne pas vous renvoyer.<br>
      Ils finissent par céder.
    `;

    startBtn.addEventListener("click", () => {
      popup.style.display = "none";
      popup.classList.add("hidden");
    });

    const levelSpan = document.getElementById("level");
    const hpSpan = document.getElementById("hp");
    const titleSpan = document.getElementById("title");
    const logText = document.getElementById("log-text");
    const roleButtons = document.querySelectorAll(".role-btn");
  
    const warTrainingMessages = [
      "L'acier chante sous vos mains, le sang bat plus fort dans vos veines.",
      "Un vétéran vous corrige du regard. Vous recommencez. Encore.",
      "La boue ne colle plus à vos bottes, elle vous appartient.",
      "Vous frappez, parez, encaissez. Et tenez toujours debout.",
      "Un ancien murmure : 'Tu ne mourras pas aujourd'hui.'",
      "Le vent emporte votre souffle, mais votre volonté reste.",
      "Les tambours battent dans votre poitrine.",
      "Votre regard devient plus tranchant que votre lame.",
      "Chaque blessure est une leçon, chaque sueur une prière.",
      "Vous ne vous entraînez plus. Vous devenez."
    ];
  
    levelSpan.textContent = level;
    hpSpan.textContent = hp;
  
    const roleMessages = {
      infanterie: {
        title: "Soldat de la Muraille de Fer",
        message: "Vous tenez la ligne, bouclier contre bouclier. Le tonnerre vous traverse, mais vous ne cédez pas."
      },
      archer: {
        title: "Tireur de l'Œil du Vent",
        message: "Depuis les collines, vous bandez votre arc. Chaque flèche est un souffle qui fauche le silence."
      },
      aide: {
        title: "Stratège de l'Ombre de la Tactique",
        message: "Vous ne portez pas la lame. Mais sans vous, les lames se perdent. L'ombre est votre champ de bataille."
      },
      eclaireur: {
        title: "Éclaireur des Œil Obscur",
        message: "Vous partez à l'aube, revenez à la nuit tombée, si vous revenez. Vous êtes l'éclat entre les ombres."
      }
    };
  
    roleButtons.forEach(button => {
      button.addEventListener("click", () => {
        role = button.dataset.role;
        const selected = roleMessages[role];
  
        titleSpan.textContent = selected.title;
        logText.textContent = selected.message;
        document.getElementById("role-intro").style.display = "none";
  
        document.getElementById("choices").innerHTML = "";
  
        const btn = document.createElement("button");
        btn.textContent = "Commencer l'entraînement spécial";
        btn.id = "special-train-btn";
        btn.addEventListener("click", () => startSpecialTraining(role));
        document.getElementById("actions").appendChild(btn);
      });
    });
  
    function startSpecialTraining(role) {
      const oldBtn = document.getElementById("special-train-btn");
      const btn = oldBtn.cloneNode(true);
      oldBtn.replaceWith(btn);
  
      btn.textContent = "S'entraîner";
  
      btn.addEventListener("click", () => {
        level++;
        levelSpan.textContent = level;
  
        const hpChange = Math.random() < 0.01 ? Math.floor(Math.random() * 11) - 5 : Math.floor(Math.random() * 3) - 1;
        hp += hpChange;
        if (hp < 0) hp = 0;
        hpSpan.textContent = hp;
  
        switch (role) {
          case "infanterie":
            stats.force += rand(1, 2);
            stats.endurance += rand(1, 2);
            break;
          case "archer":
            stats.agilite += rand(1, 2);
            stats.intelligence += rand(1, 2);
            break;
          case "aide":
            stats.intelligence += rand(1, 2);
            stats.sagesse += rand(1, 2);
            break;
          case "eclaireur":
            stats.agilite += rand(1, 2);
            if (Math.random() < 0.5) {
              stats.force += 1;
            } else {
              stats.sagesse += 1;
            }
            break;
        }
  
        const warMessage = warTrainingMessages[Math.floor(Math.random() * warTrainingMessages.length)];
        logText.textContent = warMessage;
  
        if (level === 30) {
          btn.disabled = true;
  
          localStorage.setItem("playerStats", JSON.stringify({
            level,
            hp,
            stats,
            role
          }));
  
          // Redirection personnalisée selon le rôle
          if (role === "infanterie") {
            window.location.href = "war2infantery.html";
          } else if (role === "archer") {
            window.location.href = "war2archer.html";
          } else if (role === "aide") {
            window.location.href = "war2aide.html";
          } else if (role === "eclaireur") {
            window.location.href = "war2spy.html";
          }
        }
      });
    }
  
    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});
  