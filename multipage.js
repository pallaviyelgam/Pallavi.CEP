(function () {
  function onReady(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function setActiveNav() {
    var page = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === page);
    });
  }

  function showReveals() {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("show"); });
  }

  function initSiteAnimations() {
    if (document.getElementById("site-anim-style")) return;

    var style = document.createElement("style");
    style.id = "site-anim-style";
    style.textContent =
      "body{animation:pageFadeIn .45s ease-out both;}" +
      ".reveal.show > h2{animation:titleSlideUp .75s ease both;}" +
      ".reveal.show .card,.reveal.show .business-card,.reveal.show .poll-option{animation:cardSlideUp .75s ease both;}" +
      ".reveal.show .card h3,.reveal.show .card h4,.reveal.show .card p,.reveal.show .card li{animation:textSlideUp .8s ease both;}" +
      ".reveal.show .card h3,.reveal.show .card h4{animation-delay:.1s;}" +
      ".reveal.show .card p,.reveal.show .card li{animation-delay:.18s;}" +
      ".btn{transition:transform .22s ease, box-shadow .22s ease, filter .22s ease;}" +
      "nav{animation:navGlow 3.4s ease-in-out infinite;}" +
      "nav ul li a{transition:transform .2s ease, color .2s ease;}" +
      "nav ul li a.active{animation:activeNavGlow 2.6s ease-in-out infinite;}" +
      "nav ul li a:hover{transform:translateY(-2px);}" +
      "@keyframes pageFadeIn{from{opacity:0;}to{opacity:1;}}" +
      "@keyframes titleSlideUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}" +
      "@keyframes cardSlideUp{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}" +
      "@keyframes textSlideUp{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}" +
      "@keyframes navGlow{0%,100%{box-shadow:0 10px 28px rgba(8,36,64,0.28);}50%{box-shadow:0 12px 34px rgba(45,132,215,0.32);}}" +
      "@keyframes activeNavGlow{0%,100%{filter:brightness(1);}50%{filter:brightness(1.1);}}" +
      "@media (prefers-reduced-motion: reduce){body,.reveal.show > h2,.reveal.show .card,.reveal.show .business-card,.reveal.show .poll-option,.reveal.show .card h3,.reveal.show .card h4,.reveal.show .card p,.reveal.show .card li,nav,nav ul li a.active{animation:none !important;opacity:1 !important;transform:none !important;}nav ul li a:hover,.btn:hover{transform:none !important;}}";
    document.head.appendChild(style);
  }

  function initCharts() {
    if (!window.Chart || (!document.getElementById("q1") && !document.getElementById("qAll"))) return;

    var combined = document.getElementById("qAll");
    if (combined) {
      var barColors = ["#3498db", "#2ecc71", "#9b59b6", "#f39c12", "#1abc9c", "#e67e22", "#34495e", "#c0392b", "#27ae60", "#8e44ad"];
      new Chart(combined, {
        type: "bar",
        data: {
          labels: [
            "1. What is your gender?",
            "2. Read reviews before purchase?",
            "3. Reviews influence decisions?",
            "4. Verified purchase importance?",
            "5. No. of reviews influence trust?",
            "6. Prefer recent reviews?",
            "7. Reviews vs personal recommendations?",
            "8. Suspected fake reviews?",
            "9. Avoid purchase after negative reviews?",
            "10. Businesses should respond?"
          ],
          datasets: [{
            label: "Responses",
            data: [23, 22, 13, 15, 23, 19, 18, 13, 24, 20],
            backgroundColor: function (ctx) {
              var chart = ctx.chart;
              var area = chart.chartArea;
              var i = ctx.dataIndex || 0;
              if (!area) return barColors[i % barColors.length];
              var g = chart.ctx.createLinearGradient(area.left, 0, area.right, 0);
              g.addColorStop(0, "#ffffff55");
              g.addColorStop(0.08, barColors[i % barColors.length]);
              g.addColorStop(1, barColors[i % barColors.length]);
              return g;
            },
            borderColor: "#ffffff",
            borderWidth: 1.4,
            borderRadius: 9,
            borderSkipped: false,
            barThickness: 22,
            hoverBorderWidth: 2,
            hoverBorderColor: "#ffffff"
          }]
        },
        options: {
          responsive: true,
          indexAxis: "y",
          animation: {
            duration: 1800,
            easing: "easeOutQuart",
            delay: function (ctx) { return ctx.type === "data" ? ctx.dataIndex * 90 : 0; }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "rgba(16,35,58,0.92)",
              cornerRadius: 10,
              padding: 10
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: { stepSize: 5, color: "#5d6e82" },
              grid: { color: "rgba(121,142,168,0.22)" }
            },
            y: {
              ticks: { autoSkip: false, color: "#5b6672", font: { size: 11, weight: "600" } },
              grid: { color: "rgba(121,142,168,0.18)" }
            }
          }
        }
      });
      return;
    }

    var smallOptions = {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { stepSize: 5 } } }
    };
    var defs = [
      ["q1",["Female","Male"],[23,10],"#3498db"],
      ["q2",["Always","Sometimes","Often","Rarely"],[22,6,2,1],"#2ecc71"],
      ["q3",["Very much","Somewhat","Not much","Not at all","Neutral"],[13,13,3,3,1],"#9b59b6"],
      ["q4",["Very important","Important","Neutral","Not important"],[15,11,5,2],"#f39c12"],
      ["q5",["Significant","Somewhat","Not much"],[23,8,2],"#1abc9c"],
      ["q6",["Yes","No","Doesn't matter"],[19,8,6],"#e67e22"],
      ["q7",["As much","Less than","More than","Neutral"],[18,7,4,4],"#34495e"],
      ["q8",["Sometimes","Often","Rarely","Never"],[13,9,7,1],"#c0392b"],
      ["q9",["Yes","No"],[24,9],"#27ae60"],
      ["q10",["Always","Negative only","Not necessary"],[20,8,5],"#8e44ad"]
    ];
    defs.forEach(function (d) {
      var c = document.getElementById(d[0]);
      if (!c) return;
      new Chart(c, { type: "bar", data: { labels: d[1], datasets: [{ data: d[2], backgroundColor: d[3] }] }, options: smallOptions });
    });
  }

  window.chatbotReply = function () {
    var inputEl = document.getElementById("chatInput");
    var response = document.getElementById("chatResponse");
    if (!inputEl || !response) return;
    var input = inputEl.value.toLowerCase();
    if (input.includes("fake")) response.innerText = "Fake reviews are misleading comments used to manipulate ratings. Check repeated phrases and new accounts.";
    else if (input.includes("verified")) response.innerText = "Verified Purchase means the reviewer actually bought the product.";
    else if (input.includes("negative")) response.innerText = "Reading negative reviews helps identify real product issues.";
    else if (input.includes("trust")) response.innerText = "Trust increases when reviews are detailed, balanced, and verified.";
    else if (input.includes("report")) response.innerText = "You can report fake reviews using platform complaint tools or consumer helplines.";
    else if (input.includes("awareness")) response.innerText = "Digital awareness helps consumers make safe and informed online decisions.";
    else response.innerText = "Please ask about fake reviews, trust, verified purchases, or awareness topics.";
  };

  var pollQuestions = [
    { question: "Do you read online reviews before purchasing a product?" },
    { question: "Do star ratings influence your buying decisions?" },
    { question: "Do you trust products with a high number of reviews?" },
    { question: "Do verified purchase badges increase your trust?" },
    { question: "Do you usually check negative reviews before buying?" },
    { question: "Have you ever avoided a product because of bad reviews?" },
    { question: "Do detailed reviews with photos/videos seem more reliable to you?" },
    { question: "Do business replies to reviews improve your trust?" },
    { question: "Have you ever suspected a review was fake or paid?" },
    { question: "Do you think stronger rules are needed against fake reviews?" }
  ];

  function getYesNoVotes(questionIdx) {
    var votes = JSON.parse(localStorage.getItem("poll_" + questionIdx));
    if (!Array.isArray(votes)) return [0, 0];
    return [Number(votes[0]) || 0, Number(votes[1]) || 0];
  }

  function loadQuestion() {
    // Only load questions if pollContainer exists (survey page)
    var container = document.getElementById("pollContainer");
    if (!container) {
      return;
    }
    container.innerHTML = "";

    var answeredCount = 0;
    var totalYes = 0;
    var totalNo = 0;

    pollQuestions.forEach(function (q, qIdx) {
      var votes = getYesNoVotes(qIdx);
      var voted = localStorage.getItem("voted_" + qIdx);
      if (voted) answeredCount++;
      totalYes += votes[0];
      totalNo += votes[1];
      
      container.innerHTML +=
        '<div class="yn-question-card">' +
        '<h4 class="yn-question-title">Q' + (qIdx + 1) + ". " + q.question + "</h4>" +
        '<div class="yn-actions">' +
        '<button class="yn-btn yn-yes" ' + (voted ? "disabled" : "") + ' onclick="voteOption(' + qIdx + ',0)">✓ Yes (' + votes[0] + ')</button>' +
        '<button class="yn-btn yn-no" ' + (voted ? "disabled" : "") + ' onclick="voteOption(' + qIdx + ',1)">✕ No (' + votes[1] + ')</button>' +
        "</div>" +
        "</div>";
    });

    // Calculate progress percentage
    var progressPercent = (answeredCount / pollQuestions.length) * 100;
    var completedClass = answeredCount === pollQuestions.length ? ' completed' : '';

    // Add dynamic question count box with yes/no totals
    container.innerHTML += '<div class="total-count-box' + completedClass + '" style="--progress: ' + progressPercent + '%">' +
      '<div class="count-info">Questions Answered: ' + answeredCount + '/' + pollQuestions.length + '</div>' +
      '<div class="vote-totals">' +
      '<button class="vote-total-btn yes-btn">✓ Yes: ' + totalYes + '</button>' +
      '<button class="vote-total-btn no-btn">✕ No: ' + totalNo + '</button>' +
      '</div>' +
      '</div>';
  }

  window.voteOption = function (questionIdx, optionIdx) {
    var votes = getYesNoVotes(questionIdx);
    votes[optionIdx]++;
    localStorage.setItem("poll_" + questionIdx, JSON.stringify(votes));
    localStorage.setItem("voted_" + questionIdx, "true");
    loadQuestion();
  };

  window.nextQuestion = function () {
    return;
  };

  window.previousQuestion = function () {
    return;
  };

  var slideIndex = 0;
  function showSlides() {
    var slides = document.getElementsByClassName("slide");
    if (!slides.length) return;
    for (var i = 0; i < slides.length; i++) slides[i].style.display = "none";
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.display = "block";
    window.setTimeout(showSlides, 3000);
  }

  window.changeSlide = function (n) {
    if (!document.getElementsByClassName("slide").length) return;
    slideIndex += (n - 1);
    showSlides();
  };

  window.postMessage = function () {
    var nameEl = document.getElementById("username");
    var msgEl = document.getElementById("userMessage");
    var postContainer = document.getElementById("postsContainer");
    if (!nameEl || !msgEl || !postContainer) return;
    var name = nameEl.value;
    var message = msgEl.value;
    if (name.trim() === "" || message.trim() === "") {
      alert("Please enter your name and message.");
      return;
    }
    var postDiv = document.createElement("div");
    postDiv.style.background = "#f4f4f4";
    postDiv.style.padding = "15px";
    postDiv.style.marginBottom = "10px";
    postDiv.style.borderRadius = "8px";
    postDiv.innerHTML = "<strong>" + name + "</strong><br><p>" + message + "</p><small>" + new Date().toLocaleString() + "</small>";
    postContainer.prepend(postDiv);
    nameEl.value = "";
    msgEl.value = "";
  };

  function initCaseStudyVideo() {
    var frame = document.getElementById("caseStudyVideo");
    var hint = document.getElementById("caseStudyVideoHint");
    if (!frame) return;

    var videoId = "iFWU6Of4ifg";
    var isFileMode = window.location.protocol === "file:";
    var watchUrl = "https://www.youtube.com/watch?v=" + videoId;

    if (isFileMode) {
      frame.style.display = "none";
      if (hint) {
        hint.innerHTML = '<a href="' + watchUrl + '" target="_blank" rel="noopener noreferrer">' + watchUrl + "</a>";
      }
      return;
    }

    frame.style.display = "block";
    frame.src = "https://www.youtube.com/embed/" + videoId + "?start=1&rel=0";
  }

  function initResearchPdfPath() {
    var link = document.getElementById("researchPdfLink");
    var frame = document.getElementById("researchPdfFrame");
    if (!link && !frame) return;

    // For file:// protocol, we need to handle downloads differently
    if (window.location.protocol === "file:") {
      if (link) {
        link.addEventListener("click", function(e) {
          e.preventDefault();
          downloadPdfFile();
        });
        link.textContent = "Download Research Paper (PDF)"; // Keep download text
        link.removeAttribute("download"); // Remove download attribute
      }
      if (frame) {
        // For file://, we can't embed PDF directly, so show download message
        frame.style.display = "none";
        var fallbackMsg = document.createElement("div");
        fallbackMsg.innerHTML = '<p style="text-align:center; padding:20px; background:#f0f0f0; border-radius:10px;">PDF preview not available when opening files directly. <a href="#" onclick="downloadPdfFile(); return false;" style="color:#007bff;">Click here to download the PDF</a> (works in Chrome/Edge).</p>';
        frame.parentNode.insertBefore(fallbackMsg, frame);
      }
    } else {
      // For http:// protocol, use normal paths
      var pdfPath = "pallavi.pdf";
      if (link) link.href = pdfPath;
      if (frame) frame.src = pdfPath;
    }
  }

  function downloadPdfFile() {
    // Try modern File System Access API first (Chrome/Edge)
    if ('showSaveFilePicker' in window) {
      downloadWithFileSystemAPI();
    } else {
      // Fallback: Open in new tab with instructions
      openPdfWithInstructions();
    }
  }

  async function downloadWithFileSystemAPI() {
    try {
      // Fetch the PDF as blob
      const response = await fetch('pallavi.pdf');
      const blob = await response.blob();

      // Show save dialog
      const handle = await window.showSaveFilePicker({
        suggestedName: 'pallavi.pdf',
        types: [{
          description: 'PDF Document',
          accept: {'application/pdf': ['.pdf']},
        }],
      });

      // Write the file
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();

    } catch (error) {
      console.log('File System API failed, using fallback');
      openPdfWithInstructions();
    }
  }

  function openPdfWithInstructions() {
    // Open PDF in new tab
    const pdfWindow = window.open('pallavi.pdf', '_blank');

    // Show instructions after a short delay
    setTimeout(() => {
      if (pdfWindow) {
        alert('PDF opened in new tab. To download: Right-click the PDF and select "Save as..." or use Ctrl+S (Cmd+S on Mac)');
      }
    }, 1000);
  }

  function init3DDesign() {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var orbital = document.getElementById("bgOrbital");
    document.querySelectorAll(".bg-big-star").forEach(function (el) { el.style.display = "none"; });
    if (orbital) {
      orbital.innerHTML = "";
      orbital.style.display = "none";
    }

    if (reduceMotion || window.innerWidth < 900) return;
    return;

    var tiltCards = document.querySelectorAll(".card, .business-card");
    var scene = document.querySelector(".bg-scene");
    var depthTargets = document.querySelectorAll("header h1, header p, section h2");

    tiltCards.forEach(function (card) {
      card.addEventListener("mousemove", function (event) {
        var rect = card.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateY = ((x - centerX) / centerX) * 1.2;
        var rotateX = ((centerY - y) / centerY) * 1.2;
        card.style.transform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });

    window.addEventListener("mousemove", function (event) {
      var xRatio = event.clientX / window.innerWidth - 0.5;
      var yRatio = event.clientY / window.innerHeight - 0.5;

      if (scene) {
        scene.style.transform = "translate3d(" + (xRatio * -22) + "px, " + (yRatio * -14) + "px, 0)";
      }

      depthTargets.forEach(function (target, index) {
        var depth = 10 + (index % 3) * 6;
        target.style.transform = "translate3d(" + (xRatio * depth * -1) + "px, " + (yRatio * depth * -1) + "px, " + (depth + 12) + "px)";
      });
    });

    window.addEventListener("mouseleave", function () {
      if (scene) scene.style.transform = "";
      depthTargets.forEach(function (target) {
        target.style.transform = "";
      });
    });
  }

  function initReviewBubblesBg() {
    if (document.getElementById("review-bubbles-bg")) return;

    var style = document.createElement("style");
    style.id = "review-bubbles-bg-style";
    style.textContent =
      ".review-bubbles-bg{position:fixed;inset:80px 0 0 0;pointer-events:none;z-index:0;overflow:hidden;}" +
      ".review-bubbles-bg .rb{position:absolute;width:min(40vw,360px);height:88px;border-radius:18px;background:rgba(255,255,255,0.76);border:1px solid rgba(130,164,196,0.62);box-shadow:0 10px 20px rgba(20,40,65,0.2);}" +
      ".review-bubbles-bg .rb::after{content:'';position:absolute;left:28px;bottom:-18px;border-width:18px 14px 0 0;border-style:solid;border-color:rgba(255,255,255,0.76) transparent transparent transparent;filter:drop-shadow(0 2px 2px rgba(20,40,65,0.16));}" +
      ".review-bubbles-bg .rb .stars{position:absolute;left:20px;top:22px;font-size:34px;letter-spacing:9px;color:#f2b300;line-height:1;text-shadow:0 4px 8px rgba(140,100,0,0.28);}" +
      ".review-bubbles-bg .left-1{left:2.5%;top:20%;opacity:0.5;animation:rbFloatA 9s ease-in-out infinite;}" +
      ".review-bubbles-bg .left-2{left:6%;top:56%;opacity:0.42;animation:rbFloatB 11s ease-in-out infinite;}" +
      ".review-bubbles-bg .right-1{right:3%;top:34%;opacity:0.48;animation:rbFloatC 10s ease-in-out infinite;}" +
      "header,section,footer{position:relative;z-index:1;}" +
      "@keyframes rbFloatA{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}" +
      "@keyframes rbFloatB{0%,100%{transform:translateY(0);}50%{transform:translateY(9px);}}" +
      "@keyframes rbFloatC{0%,100%{transform:translateY(0);}50%{transform:translateY(-7px);}}" +
      "@media (max-width:900px){.review-bubbles-bg .rb{width:min(70vw,300px);height:72px;}.review-bubbles-bg .rb .stars{font-size:22px;letter-spacing:7px;top:22px;}.review-bubbles-bg .left-1{left:2%;top:22%;}.review-bubbles-bg .left-2{left:3%;top:62%;}.review-bubbles-bg .right-1{right:2%;top:42%;}}";
    document.head.appendChild(style);

    var bg = document.createElement("div");
    bg.id = "review-bubbles-bg";
    bg.className = "review-bubbles-bg";
    bg.setAttribute("aria-hidden", "true");
    bg.innerHTML =
      '<div class="rb left-1"><span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div>' +
      '<div class="rb left-2"><span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div>' +
      '<div class="rb right-1"><span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div>';
    document.body.prepend(bg);
  }

  onReady(function () {
    initSiteAnimations();
    setActiveNav();
    initResearchPdfPath();
    initReviewBubblesBg();
    showReveals();
    initCharts();
    initCaseStudyVideo();
    init3DDesign();
    showSlides();
    // Call loadQuestion after everything else is initialized
    setTimeout(function() {
      loadQuestion();
    }, 100);
  });
})();

