// Game State
let currentScene = 1
let score = 0
let correctAnswers = 0
let currentMinigame = null
const totalScenes = 10
let audioEnabled = true
let currentStoryPanel = 0

// Audio Management
function playSound(soundId) {
  if (!audioEnabled) return
  const audio = document.getElementById(soundId)
  if (audio) {
    audio.currentTime = 0
    audio.play().catch((e) => console.log("Audio play failed:", e))
  }
}

function toggleAudio() {
  audioEnabled = !audioEnabled
  const toggle = document.getElementById("audio-toggle")
  const bgMusic = document.getElementById("background-music")

  if (audioEnabled) {
    toggle.textContent = "🔊"
    bgMusic.play().catch((e) => console.log("Background music play failed:", e))
  } else {
    toggle.textContent = "🔇"
    bgMusic.pause()
  }
}

// Characters
const characters = {
  alex: { name: "Alex", avatar: "👨‍🎓", color: "#3b82f6" },
  sarah: { name: "Sarah", avatar: "👩‍💼", color: "#10b981" },
  maya: { name: "Maya", avatar: "👩‍💻", color: "#8b5cf6" },
  scammer: { name: "Scammer", avatar: "🕴️", color: "#ef4444" },
  narrator: { name: "Narrator", avatar: "📖", color: "#6b7280" },
}

// Introduction Story Data
const introStoryPanels = [
  {
    title: "The AI Revolution",
    content:
      "In 2024, artificial intelligence has become incredibly sophisticated. AI can now create realistic videos, clone voices, and generate convincing photos of people who don't exist. While this technology has amazing benefits, it's also being used by criminals to deceive and manipulate people online.",
  },
  {
    title: "Meet Our Heroes",
    content:
      "Alex is a college student who loves social media and online gaming. Sarah is Alex's best friend who works in marketing. Maya is a cybersecurity expert who specialises in AI threats. Together, they'll help you learn to identify and respond to AI-generated deception.",
  },
  {
    title: "The Growing Threat",
    content:
      "Every day, thousands of people fall victim to AI-powered scams. Deepfake videos trick people into sending money to fake emergencies. AI-generated profiles steal personal information. Voice clones convince victims their loved ones are in danger. The threats are real, but so are the solutions.",
  },
  {
    title: "Your Mission",
    content:
      "Today, you'll guide Alex through 10 different scenarios involving AI deception. Each choice you make will have real consequences. You'll learn to spot the warning signs, understand the technology behind the threats, and develop the skills to protect yourself and others.",
  },
  {
    title: "Ready to Begin?",
    content:
      "Remember: in the digital age, being skeptical isn't paranoid—it's smart. Question what you see, verify what you hear, and always think twice before sharing personal information. Your digital safety depends on it. Are you ready to become a digital detective?",
  },
]

// Story Scenes Data
const storyScenes = [
  {
    id: 1,
    title: "Morning Surprise",
    image: "scene01-morning-surprise.png",
    speaker: "alex",
    dialogue:
      "Just woke up and got a video call from Sarah asking for emergency money. But something feels off about her face...",
    minigame: "spot-difference",
    minigameData: {
      image: "spot-deepfake-video-call.png",
      spots: [
        { x: 138, y: 138, description: "Digital artifacts and pixelation around the left jawline edge" },
        { x: 266, y: 124, description: "Unnatural jagged edges on the right side of the face" },
        { x: 236, y: 72, description: "Eyes appear too symmetrical and lack natural asymmetry" },
      ],
    },
    educational:
      "Deepfake videos often have subtle inconsistencies: digital artifacts around face edges, unnatural symmetry, and pixelated boundaries where the AI-generated face meets the background.",
    wrongChoiceImpact: {
      text: "Sending money to unverified emergency requests can lead to financial loss and identity theft.",
      consequences: [
        "Your money is gone forever",
        "Scammers may target you again",
        "Your personal information could be compromised",
        "Friends and family might be targeted next",
      ],
    },
  },
  {
    id: 2,
    title: "The Perfect Profile",
    image: "scene02-perfect-profile.png",
    speaker: "maya",
    dialogue:
      "Alex, I saw you got a friend request from someone with a suspiciously perfect profile. Let me teach you how to spot AI-generated faces!",
    minigame: "drag-drop",
    minigameData: {
      items: [
        {
          id: "img1",
          image: "real-face-01.png",
          category: "real",
          description: "Natural lighting",
          emoji: "👤",
        },
        {
          id: "img2",
          image: "ai-face-01.png",
          category: "ai",
          description: "Perfect symmetry",
          emoji: "🤖",
        },
        {
          id: "img3",
          image: "real-face-02.png",
          category: "real",
          description: "Skin imperfections",
          emoji: "👨",
        },
        {
          id: "img4",
          image: "ai-face-02.png",
          category: "ai",
          description: "Unnatural eyes",
          emoji: "👁️",
        },
        {
          id: "img5",
          image: "real-face-03.png",
          category: "real",
          description: "Asymmetrical features",
          emoji: "👩",
        },
        {
          id: "img6",
          image: "ai-face-03.png",
          category: "ai",
          description: "Too perfect skin",
          emoji: "✨",
        },
      ],
    },
    educational:
      "AI-generated faces often have perfect symmetry, unnatural lighting, and lack the small imperfections that make real faces unique.",
    wrongChoiceImpact: {
      text: "Accepting fake profiles and sharing personal information can lead to identity theft and catfishing scams.",
      consequences: [
        "Your photos could be stolen and misused",
        "Personal information may be harvested",
        "You could become a victim of romance scams",
        "Your social network might be compromised",
      ],
    },
  },
  {
    id: 3,
    title: "Voice from the Past",
    image: "scene03-voice-from-past.png",
    speaker: "alex",
    dialogue:
      "Got a voicemail from grandma asking me to call back urgently. But she usually texts... Maya, what should I do?",
    minigame: "timeline",
    minigameData: {
      steps: [
        { id: "step1", text: "Receive suspicious call", order: 1 },
        { id: "step2", text: "Don't call back immediately", order: 2 },
        { id: "step3", text: "Use known contact info", order: 3 },
        { id: "step4", text: "Verify with family", order: 4 },
        { id: "step5", text: "Report if confirmed fake", order: 5 },
      ],
    },
    educational:
      "Voice cloning technology can recreate anyone's voice from just a few seconds of audio. Always verify through known contact methods.",
    wrongChoiceImpact: {
      text: "Falling for voice cloning scams can result in significant financial loss and emotional trauma.",
      consequences: [
        "Money sent to scammers is rarely recovered",
        "Emotional distress from believing loved ones are in danger",
        "Your voice might be recorded for future scams",
        "Family members could be targeted next",
      ],
    },
  },
  {
    id: 4,
    title: "Identity Theft Alert",
    image: "scene04-identity-theft.png",
    speaker: "sarah",
    dialogue:
      "Alex! Someone created a fake account using your photos and is messaging our friends asking for money. We need to act fast!",
    minigame: "mix-match",
    minigameData: {
      threats: [
        { id: "t1", text: "Fake Social Media Profile", match: "s1" },
        { id: "t2", text: "Voice Cloning Scam", match: "s2" },
        { id: "t3", text: "Deepfake Video Call", match: "s3" },
        { id: "t4", text: "AI Chatbot Romance", match: "s4" },
      ],
      signs: [
        { id: "s1", text: "Too-perfect photos, limited history" },
        { id: "s2", text: "Urgent requests, unusual contact method" },
        { id: "s3", text: "Unnatural facial movements, poor sync" },
        { id: "s4", text: "Instant responses, perfect conversation" },
      ],
    },
    educational:
      "Impersonation scams use your identity to trick people who trust you. Quick communication with your network prevents damage.",
    wrongChoiceImpact: {
      text: "Delayed response to identity theft can cause widespread damage to your reputation and relationships.",
      consequences: [
        "Friends and family may lose money to scammers",
        "Your reputation could be permanently damaged",
        "Legal issues may arise from impersonation",
        "Recovery becomes more difficult over time",
      ],
    },
  },
  {
    id: 5,
    title: "Viral Deception",
    image: "scene05-viral-deception.png",
    speaker: "alex",
    dialogue:
      "This celebrity video is going viral, but something seems off about their mouth movements. Maya, is this a deepfake?",
    minigame: "spot-difference",
    minigameData: {
      image: "spot-celebrity-deepfake.png",
      spots: [
        { x: 201, y: 90, description: "Mouth and teeth appear artificially generated with unnatural alignment" },
        { x: 182, y: 66, description: "Left eye has inconsistent lighting compared to the right eye" },
        { x: 200, y: 124, description: "Facial hair has digital artifacts and unnatural texture patterns" },
      ],
    },
    educational:
      "Celebrity deepfakes often have inconsistent facial features, unnatural mouth movements, and lighting discrepancies between different parts of the face.",
    wrongChoiceImpact: {
      text: "Sharing fake viral content spreads misinformation and can damage reputations.",
      consequences: [
        "You contribute to spreading false information",
        "Your credibility as a source may be questioned",
        "Legal issues could arise from sharing defamatory content",
        "You may become a target for more sophisticated scams",
      ],
    },
  },
  {
    id: 6,
    title: "The Perfect Match",
    image: "scene06-perfect-match.png",
    speaker: "maya",
    dialogue:
      "Alex, you've been chatting with someone online who seems too perfect. Let me show you signs that might indicate an AI chatbot.",
    minigame: "pattern",
    minigameData: {
      conversations: [
        {
          id: "c1",
          time: "2:30 AM",
          message: "Good morning beautiful! How was your day?",
          response_time: "Instant",
          fake: true,
        },
        {
          id: "c2",
          time: "3:45 PM",
          message: "Hey! Just got back from work, pretty tired today.",
          response_time: "2 hours",
          fake: false,
        },
        {
          id: "c3",
          time: "11:59 PM",
          message: "I love everything about you! You're perfect!",
          response_time: "Instant",
          fake: true,
        },
        {
          id: "c4",
          time: "7:20 AM",
          message: "Sorry for the late reply, was sleeping. What's up?",
          response_time: "8 hours",
          fake: false,
        },
        {
          id: "c5",
          time: "4:15 AM",
          message: "You are the most amazing person I've ever met!",
          response_time: "Instant",
          fake: true,
        },
        {
          id: "c6",
          time: "6:30 PM",
          message: "Had a weird day at work, my boss was being difficult.",
          response_time: "30 minutes",
          fake: false,
        },
      ],
    },
    educational:
      "AI chatbots can simulate romantic interest to manipulate victims. Look for unnatural communication patterns like instant responses 24/7, overly perfect compliments, and lack of personal details.",
    wrongChoiceImpact: {
      text: "Falling for AI romance scams can lead to emotional manipulation and financial exploitation.",
      consequences: [
        "Emotional attachment to a non-existent person",
        "Financial loss through gift requests or emergencies",
        "Personal information harvested for other scams",
        "Psychological trauma and trust issues",
      ],
    },
  },
  {
    id: 7,
    title: "Shopping Scam",
    image: "scene07-shopping-scam.png",
    speaker: "alex",
    dialogue:
      "I'm looking at these product reviews and they all sound similar and were posted on the same day. That's suspicious, right?",
    minigame: "pattern",
    minigameData: {
      reviews: [
        {
          id: "r1",
          rating: "⭐⭐⭐⭐⭐",
          date: "2024-01-15",
          text: "Amazing product! Highly recommend to everyone!",
          fake: true,
        },
        {
          id: "r2",
          rating: "⭐⭐⭐⭐",
          date: "2024-01-10",
          text: "Good quality, arrived on time. Minor packaging issue.",
          fake: false,
        },
        {
          id: "r3",
          rating: "⭐⭐⭐⭐⭐",
          date: "2024-01-15",
          text: "Fantastic item! Perfect quality and fast shipping!",
          fake: true,
        },
        {
          id: "r4",
          rating: "⭐⭐⭐",
          date: "2024-01-08",
          text: "Decent product but could be better. Price is fair.",
          fake: false,
        },
        {
          id: "r5",
          rating: "⭐⭐⭐⭐⭐",
          date: "2024-01-15",
          text: "Excellent purchase! Would definitely buy again!",
          fake: true,
        },
        {
          id: "r6",
          rating: "⭐⭐⭐⭐",
          date: "2024-01-12",
          text: "Works as expected. Good customer service experience.",
          fake: false,
        },
      ],
    },
    educational:
      "AI can generate fake reviews in bulk. Look for unnatural posting patterns, similar writing styles, and coordinated timing.",
    wrongChoiceImpact: {
      text: "Trusting fake reviews can lead to purchasing inferior products and financial loss.",
      consequences: [
        "Money wasted on poor quality products",
        "Personal and payment information compromised",
        "Difficulty getting refunds from fraudulent sellers",
        "Contributing to the success of scam operations",
      ],
    },
  },
  {
    id: 8,
    title: "Phishing Evolution",
    image: "scene08-phishing-evolution.png",
    speaker: "sarah",
    dialogue:
      "Alex got an email that perfectly mimics their bank's style and mentions real transactions. This is scary advanced!",
    minigame: "drag-drop",
    minigameData: {
      items: [
        {
          id: "email1",
          image: "email-legitimate-01.png",
          category: "real",
          description: "Official domain",
          emoji: "✅",
        },
        {
          id: "email2",
          image: "email-phishing-01.png",
          category: "ai",
          description: "Suspicious sender",
          emoji: "⚠️",
        },
        {
          id: "email3",
          image: "email-legitimate-02.png",
          category: "real",
          description: "Proper formatting",
          emoji: "📧",
        },
        {
          id: "email4",
          image: "email-phishing-02.png",
          category: "ai",
          description: "Urgent language",
          emoji: "🚨",
        },
        {
          id: "email5",
          image: "email-legitimate-03.png",
          category: "real",
          description: "Expected timing",
          emoji: "⏰",
        },
        {
          id: "email6",
          image: "email-phishing-03.png",
          category: "ai",
          description: "Personal info fishing",
          emoji: "🎣",
        },
      ],
    },
    educational:
      "AI enhances phishing by personalizing attacks with real data about you, making them much harder to detect.",
    wrongChoiceImpact: {
      text: "Falling for advanced phishing attacks can compromise your entire digital identity.",
      consequences: [
        "Bank accounts and credit cards compromised",
        "Identity theft and fraudulent accounts opened",
        "Personal data sold on dark web markets",
        "Years of recovery and credit monitoring needed",
      ],
    },
  },
  {
    id: 9,
    title: "Media Manipulation",
    image: "scene09-media-manipulation.png",
    speaker: "maya",
    dialogue:
      "This image looks suspicious. The lighting is off and there are strange artifacts around the edges. Let me teach you what to look for.",
    minigame: "spot-difference",
    minigameData: {
      image: "spot-ai-generated-photo.png",
      spots: [
        { x: 198, y: 40, description: "Face appears too smooth and perfect - lacks natural skin texture" },
        { x: 153, y: 73, description: "Left ear has unnatural shading and artificial appearance" },
        { x: 219, y: 96, description: "Right side of face shows perfect symmetry - too artificial for real photo" },
      ],
    },
    educational:
      "AI-generated portraits often have unnaturally smooth skin, perfect symmetry, and lack the subtle imperfections found in real photographs.",
    wrongChoiceImpact: {
      text: "Believing manipulated media can lead to misinformed decisions and spread of false information.",
      consequences: [
        "Making decisions based on false information",
        "Contributing to misinformation spread",
        "Losing ability to distinguish real from fake content",
        "Becoming more susceptible to future manipulation",
      ],
    },
  },
  {
    id: 10,
    title: "Quick AI Safety Quiz",
    image: "scene10-final-challenge.png",
    speaker: "maya",
    dialogue: "Before we finish, here's a quick question to test your knowledge!",
    minigame: "quiz",
    minigameData: {
      question: "Which of the following is the best way to confirm if a message is real?",
      options: [
        { text: "Click the link in the message to verify", correct: false },
        { text: "Reply immediately to the sender", correct: false },
        { text: "Cross-check using known contact methods", correct: true },
        { text: "Ignore all messages", correct: false },
      ],
    },
    educational:
      "Always verify suspicious messages using independent, known contact channels. Never trust links or requests without verification.",
    wrongChoiceImpact: {
       text: "Relying solely on messages or links can lead to falling for phishing or impersonation scams.",
      consequences: [
       "You may be redirected to fake sites",
        "Sensitive info could be stolen",
        "Future attacks may target you again",
        "Accounts can be compromised",
      ],
    },
  }
]

// Minigame state
let dragDropState = { correctPlacements: 0, totalItems: 0 }
let mixMatchState = { matches: {}, correctMatches: 0 }
let spotDifferenceState = { spotsFound: 0, totalSpots: 0, allSpotsFound: false, foundSpots: [] }
let timelineState = { correctOrder: 0 }
let patternState = { selectedReviews: [], correctSelections: 0 }

// Initialize Game
function initGame() {
   score = 0
  // Show intro screen initially
  document.getElementById("intro-screen").style.display = "flex"

  // Initialize glitch text effects
  const glitchTexts = document.querySelectorAll(".glitch-text")
  glitchTexts.forEach((text) => {
    text.setAttribute("data-text", text.textContent)
  })
}

// Show Introduction Story
function showIntroStory() {
  playSound("click-sound")
  document.getElementById("intro-screen").style.display = "none"
  document.getElementById("intro-story-screen").classList.remove("hidden")

  // Populate story panels
  const panelsContainer = document.getElementById("story-panels")
  panelsContainer.innerHTML = ""

  introStoryPanels.forEach((panel, index) => {
    const panelDiv = document.createElement("div")
    panelDiv.className = `story-panel ${index === 0 ? "active" : ""}`
    panelDiv.innerHTML = `
      <h3>${panel.title}</h3>
      <p>${panel.content}</p>
    `
    panelsContainer.appendChild(panelDiv)
  })

  updatePanelNavigation()
}

// Navigation for story panels
function nextPanel() {
  playSound("click-sound")
  if (currentStoryPanel < introStoryPanels.length - 1) {
    document.querySelectorAll(".story-panel")[currentStoryPanel].classList.remove("active")
    currentStoryPanel++
    document.querySelectorAll(".story-panel")[currentStoryPanel].classList.add("active")
    updatePanelNavigation()
  }
}

function previousPanel() {
  playSound("click-sound")
  if (currentStoryPanel > 0) {
    document.querySelectorAll(".story-panel")[currentStoryPanel].classList.remove("active")
    currentStoryPanel--
    document.querySelectorAll(".story-panel")[currentStoryPanel].classList.add("active")
    updatePanelNavigation()
  }
}

function updatePanelNavigation() {
  const prevBtn = document.getElementById("prev-panel")
  const nextBtn = document.getElementById("next-panel")
  const startBtn = document.getElementById("start-game")
  const indicator = document.getElementById("panel-indicator")

  prevBtn.disabled = currentStoryPanel === 0

  if (currentStoryPanel === introStoryPanels.length - 1) {
    nextBtn.classList.add("hidden")
    startBtn.classList.remove("hidden")
  } else {
    nextBtn.classList.remove("hidden")
    startBtn.classList.add("hidden")
  }

  indicator.textContent = `${currentStoryPanel + 1} / ${introStoryPanels.length}`
}

// Start Story
function startStory() {
  playSound("click-sound")
  document.getElementById("intro-story-screen").classList.add("hidden")
  document.getElementById("game-header").classList.remove("hidden")
  document.getElementById("progress-container").classList.remove("hidden")
  document.getElementById("game-main").classList.remove("hidden")

  currentScene = 0
  score = 0
  correctAnswers = 0
  showScene(currentScene)

  // Start background music
  if (audioEnabled) {
    const bgMusic = document.getElementById("background-music")
    bgMusic.play().catch((e) => console.log("Background music play failed:", e))
  }
}

// Show Scene
function showScene(index) {
  if (index >= storyScenes.length) {
    showFinalResults()
    return
  }

  const scene = storyScenes[index]

  // Update current character
  const character = characters[scene.speaker]
  document.getElementById("current-avatar").textContent = character.avatar
  document.getElementById("current-name").textContent = character.name

  // Update scene content
  document.getElementById("story-title").textContent = scene.title
  document.getElementById("scene-img").src = scene.image
  document.getElementById("speaker-avatar").textContent = character.avatar
  document.getElementById("speaker-name").textContent = character.name
  document.getElementById("speaker-name").style.color = character.color
  document.getElementById("dialogue-text").textContent = scene.dialogue

  // Hide all minigames first
  hideAllMinigames()

  // Show appropriate minigame
  if (scene.minigame) {
    currentMinigame = scene.minigame
    setupMinigame(scene.minigame, scene.minigameData)
    document.getElementById("story-choices").style.display = "none"
  } else {
    document.getElementById("story-choices").style.display = "block"
  }

  updateProgress()
  updateStats()
}

// Hide all minigames
function hideAllMinigames() {
  const minigames = ["drag-drop-game", "mix-match-game", "spot-difference-game", "timeline-game", "pattern-game", "quiz-game"]
  minigames.forEach((id) => {
    document.getElementById(id).classList.add("hidden")
  })
}

// Setup Minigame
function setupMinigame(type, data) {
  switch (type) {
    case "drag-drop":
      setupDragDropGame(data)
      break
    case "mix-match":
      setupMixMatchGame(data)
      break
    case "spot-difference":
      setupSpotDifferenceGame(data)
      break
    case "timeline":
      setupTimelineGame(data)
      break
    case "pattern":
      setupPatternGame(data)
      break
      case "quiz":
      setupQuizGame(data)
      break
  }
}

// Drag and Drop Game Setup
function setupDragDropGame(data) {
  document.getElementById("drag-drop-game").classList.remove("hidden")

  const itemsContainer = document.getElementById("draggable-items")
  itemsContainer.innerHTML = ""

  dragDropState = { correctPlacements: 0, totalItems: data.items.length }

  data.items.forEach((item) => {
    const div = document.createElement("div")
    div.className = "draggable-item"
    div.draggable = true
    div.dataset.category = item.category
    div.dataset.id = item.id
    div.title = item.description

    // Use image if available, otherwise use emoji
    if (item.image) {
      div.classList.add("has-image")

      const img = document.createElement("img")
      img.src = item.image
      img.alt = item.description
      img.style.width = "100%"
      img.style.height = "100%"
      img.style.objectFit = "cover"
      img.style.borderRadius = "6px"
      img.style.pointerEvents = "none"
      img.draggable = false

      // Add click handler to view full image (only for current scene's minigame)
      if (currentScene === 7) {
        // Phishing Evolution chapter
        div.addEventListener("click", (e) => {
          if (!div.classList.contains("dragging")) {
            e.preventDefault()
            e.stopPropagation()
            showImageModal(item.image, item.description)
          }
        })
        div.style.cursor = "pointer"
      }

      img.onerror = function () {
        this.style.display = "none"
        div.textContent = item.emoji || "📷"
        div.style.fontSize = "2rem"
        div.style.display = "flex"
        div.style.alignItems = "center"
        div.style.justifyContent = "center"
        div.classList.remove("has-image")
      }
      div.appendChild(img)
    } else {
      div.textContent = item.emoji || "📷"
    }

    div.addEventListener("dragstart", handleDragStart)
    div.addEventListener("dragend", handleDragEnd)

    itemsContainer.appendChild(div)
  })

  // Setup drop zones
  const dropZones = document.querySelectorAll(".drop-area")
  dropZones.forEach((zone) => {
    zone.innerHTML = ""
    zone.addEventListener("dragover", handleDragOver)
    zone.addEventListener("drop", handleDrop)
    zone.addEventListener("dragenter", (e) => {
      e.preventDefault()
      e.currentTarget.classList.add("drag-over")
    })
    zone.addEventListener("dragleave", (e) => {
      e.preventDefault()
      if (!e.currentTarget.contains(e.relatedTarget)) {
        e.currentTarget.classList.remove("drag-over")
      }
    })
  })
}

// Drag and Drop Handlers
function handleDragStart(e) {
  const draggedItem = e.target.closest(".draggable-item")
  if (draggedItem) {
    e.dataTransfer.setData("text/plain", draggedItem.dataset.id)
    draggedItem.classList.add("dragging")
    e.dataTransfer.effectAllowed = "move"
  }
}

function handleDragEnd(e) {
  const draggedItem = e.target.closest(".draggable-item")
  if (draggedItem) {
    draggedItem.classList.remove("dragging")
  }
}

function handleDragOver(e) {
  e.preventDefault()
  e.dataTransfer.dropEffect = "move"
}

function handleDrop(e) {
  e.preventDefault()
  e.currentTarget.classList.remove("drag-over")

  const itemId = e.dataTransfer.getData("text/plain")
  const draggedElement = document.querySelector(`[data-id="${itemId}"]`)
  const dropZone = e.currentTarget

  if (draggedElement) {
    dropZone.appendChild(draggedElement)
    draggedElement.style.cursor = "default"
    draggedElement.draggable = false
    draggedElement.classList.remove("dragging")
    draggedElement.style.background = ""
    draggedElement.style.border = ""
  }
}

function checkDragDrop() {
  playSound("click-sound")
  const realZone = document.getElementById("real-drop")
  const aiZone = document.getElementById("ai-drop")

  let correct = 0
  let total = 0

  // Check real zone
  realZone.querySelectorAll(".draggable-item").forEach((item) => {
    total++
    if (item.dataset.category === "real") {
      correct++
      item.style.background = "rgba(0, 204, 102, 0.2)"
      item.style.border = "2px solid #00cc66"
    } else {
      item.style.background = "rgba(255, 0, 64, 0.2)"
      item.style.border = "2px solid #ff0040"
    }
  })

  // Check AI zone
  aiZone.querySelectorAll(".draggable-item").forEach((item) => {
    total++
    if (item.dataset.category === "ai") {
      correct++
      item.style.background = "rgba(0, 204, 102, 0.2)"
      item.style.border = "2px solid #00cc66"
    } else {
      item.style.background = "rgba(255, 0, 64, 0.2)"
      item.style.border = "2px solid #ff0040"
    }
  })

  const success = correct === total && total === dragDropState.totalItems
  showMinigameFeedback(success, correct, total)
}

// Mix and Match Game Setup
function setupMixMatchGame(data) {
  document.getElementById("mix-match-game").classList.remove("hidden")

  const threatsList = document.getElementById("threats-list")
  const signsList = document.getElementById("signs-list")

  threatsList.innerHTML = ""
  signsList.innerHTML = ""

  mixMatchState = { matches: {}, correctMatches: 0 }
  selectedThreat = null
  selectedSign = null

  data.threats.forEach((threat) => {
    const div = document.createElement("div")
    div.className = "match-item"
    div.dataset.id = threat.id
    div.dataset.match = threat.match
    div.textContent = threat.text
    div.addEventListener("click", () => selectMatchItem(div, "threat"))
    threatsList.appendChild(div)
  })

  data.signs.forEach((sign) => {
    const div = document.createElement("div")
    div.className = "match-item"
    div.dataset.id = sign.id
    div.textContent = sign.text
    div.addEventListener("click", () => selectMatchItem(div, "sign"))
    signsList.appendChild(div)
  })
}

let selectedThreat = null
let selectedSign = null

function selectMatchItem(element, type) {
  playSound("click-sound")

  if (element.classList.contains("matched")) {
    return
  }

  const container = type === "threat" ? document.getElementById("threats-list") : document.getElementById("signs-list")
  container.querySelectorAll(".match-item").forEach((item) => {
    if (!item.classList.contains("matched")) {
      item.classList.remove("selected")
    }
  })

  element.classList.add("selected")

  if (type === "threat") {
    selectedThreat = element
  } else {
    selectedSign = element
  }

  if (selectedThreat && selectedSign) {
    const threatId = selectedThreat.dataset.id
    const signId = selectedSign.dataset.id
    const correctMatch = selectedThreat.dataset.match

    if (signId === correctMatch) {
      playSound("success-sound")
      selectedThreat.classList.remove("selected")
      selectedSign.classList.remove("selected")
      selectedThreat.classList.add("matched")
      selectedSign.classList.add("matched")
      mixMatchState.matches[threatId] = signId
      mixMatchState.correctMatches++

      selectedThreat = null
      selectedSign = null
    } else {
      playSound("error-sound")
      setTimeout(() => {
        if (selectedThreat) {
          selectedThreat.classList.remove("selected")
          selectedThreat = null
        }
        if (selectedSign) {
          selectedSign.classList.remove("selected")
          selectedSign = null
        }
      }, 1000)
    }
  }
}

function checkMixMatch() {
  playSound("click-sound")
  const totalMatches = 4
  const success = mixMatchState.correctMatches === totalMatches
  showMinigameFeedback(success, mixMatchState.correctMatches, totalMatches)
}

// Spot the Difference Game Setup
function setupSpotDifferenceGame(data) {
  document.getElementById("spot-difference-game").classList.remove("hidden")

  const image = document.getElementById("spot-image")
  const markers = document.getElementById("spot-markers")
  const spotsCount = document.getElementById("spots-count")
  const foundSpots = document.getElementById("found-spots")

  // Clear previous state
  markers.innerHTML = ""
  foundSpots.innerHTML = ""

  image.style.display = "block"
  if (image.nextElementSibling) {
    image.nextElementSibling.style.display = "none"
  }

  image.src = data.image

  spotDifferenceState = { spotsFound: 0, totalSpots: data.spots.length, allSpotsFound: false, foundSpots: [] }
  spotsCount.textContent = `0/${data.spots.length}`

  // Remove any existing continue button
  const existingBtn = document.querySelector(".spot-continue-btn")
  if (existingBtn) {
    existingBtn.remove()
  }

  image.onload = () => {
    console.log("Image loaded successfully")
  }

  // Add click handler to image
  image.onclick = (e) => {
    const rect = image.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    console.log(`🎯 CLICKED at coordinates: (${Math.round(x)}, ${Math.round(y)})`)
    console.log(`Current spots:`, data.spots)

    // Check if click is near any unfound spot
    data.spots.forEach((spot, index) => {
      const distance = Math.sqrt(Math.pow(x - spot.x, 2) + Math.pow(y - spot.y, 2))
      console.log(`Distance to spot ${index + 1} (${spot.x}, ${spot.y}): ${Math.round(distance)} pixels`)

      if (distance < 30 && !spotDifferenceState.foundSpots.includes(index)) {
        // Found a new spot!
        console.log(`✅ FOUND SPOT ${index + 1}!`)
        playSound("success-sound")
        spotDifferenceState.foundSpots.push(index)

        const marker = document.createElement("div")
        marker.className = "spot-marker"
        marker.dataset.spot = index
        marker.style.left = spot.x - 15 + "px"
        marker.style.top = spot.y - 15 + "px"
        markers.appendChild(marker)

        const foundSpot = document.createElement("div")
        foundSpot.className = "found-spot"
        foundSpot.textContent = spot.description
        foundSpots.appendChild(foundSpot)

        spotDifferenceState.spotsFound++
        spotsCount.textContent = `${spotDifferenceState.spotsFound}/${data.spots.length}`

        if (spotDifferenceState.spotsFound === data.spots.length) {
          spotDifferenceState.allSpotsFound = true
          showSpotDifferenceContinue()
        }
      }
    })
  }
}

function showSpotDifferenceContinue() {
  const minigameArea = document.getElementById("spot-difference-game")

  if (!minigameArea.querySelector(".spot-continue-btn")) {
    const continueBtn = document.createElement("button")
    continueBtn.className = "minigame-btn spot-continue-btn"
    continueBtn.textContent = "Continue - All Inconsistencies Found!"
    continueBtn.style.marginTop = "20px"
    continueBtn.onclick = () => {
      playSound("click-sound")
      showMinigameFeedback(true, spotDifferenceState.spotsFound, spotDifferenceState.totalSpots)
    }
    minigameArea.appendChild(continueBtn)
  }
}

// Timeline Game Setup
function setupTimelineGame(data) {
  document.getElementById("timeline-game").classList.remove("hidden")

  const slotsContainer = document.getElementById("timeline-slots")
  const itemsContainer = document.getElementById("timeline-items")

  slotsContainer.innerHTML = ""
  itemsContainer.innerHTML = ""

  timelineState = { correctOrder: 0 }

  for (let i = 1; i <= data.steps.length; i++) {
    const slot = document.createElement("div")
    slot.className = "timeline-slot"
    slot.dataset.step = `Step ${i}`
    slot.dataset.order = i
    slot.addEventListener("dragover", handleTimelineDragOver)
    slot.addEventListener("drop", handleTimelineDrop)
    slot.addEventListener("dragenter", (e) => {
      e.preventDefault()
      e.currentTarget.style.backgroundColor = "rgba(0, 255, 255, 0.1)"
      e.currentTarget.style.borderColor = "#00ffff"
    })
    slot.addEventListener("dragleave", (e) => {
      e.preventDefault()
      if (!e.currentTarget.hasChildNodes()) {
        e.currentTarget.style.backgroundColor = "rgba(0, 255, 255, 0.05)"
        e.currentTarget.style.borderColor = "rgba(0, 255, 255, 0.5)"
      }
    })
    slotsContainer.appendChild(slot)
  }

  const shuffledSteps = [...data.steps].sort(() => Math.random() - 0.5)
  shuffledSteps.forEach((step) => {
    const item = document.createElement("div")
    item.className = "timeline-item"
    item.draggable = true
    item.dataset.order = step.order
    item.textContent = step.text
    item.addEventListener("dragstart", handleTimelineDragStart)
    item.addEventListener("dragend", (e) => {
      e.target.style.opacity = "1"
    })
    itemsContainer.appendChild(item)
  })
}

function handleTimelineDragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.dataset.order)
  e.target.style.opacity = "0.5"
}

function handleTimelineDragOver(e) {
  e.preventDefault()
}

function handleTimelineDrop(e) {
  e.preventDefault()

  const itemOrder = e.dataTransfer.getData("text/plain")
  const draggedElement = document.querySelector(`[data-order="${itemOrder}"].timeline-item`)

  e.currentTarget.style.backgroundColor = "rgba(0, 255, 255, 0.05)"
  e.currentTarget.style.borderColor = "rgba(0, 255, 255, 0.5)"

  if (draggedElement && !e.currentTarget.hasChildNodes()) {
    draggedElement.remove()

    e.currentTarget.appendChild(draggedElement)
    e.currentTarget.classList.add("filled")
    e.currentTarget.style.backgroundColor = "rgba(0, 255, 255, 0.1)"
    e.currentTarget.style.borderColor = "#00ffff"

    draggedElement.draggable = false
    draggedElement.style.opacity = "1"
    draggedElement.style.margin = "0"
    draggedElement.style.padding = "8px"
    draggedElement.style.fontSize = "0.8rem"
    draggedElement.style.backgroundColor = "transparent"
    draggedElement.style.border = "none"
    draggedElement.style.cursor = "default"
  }
}

function checkTimeline() {
  playSound("click-sound")
  const slots = document.querySelectorAll(".timeline-slot")
  let correct = 0

  slots.forEach((slot) => {
    const item = slot.querySelector(".timeline-item")
    if (item && item.dataset.order === slot.dataset.order) {
      correct++
      slot.style.borderColor = "#00cc66"
      slot.style.background = "rgba(0, 204, 102, 0.1)"
    } else if (item) {
      slot.style.borderColor = "#ff0040"
      slot.style.background = "rgba(255, 0, 64, 0.1)"
    }
  })

  const success = correct === slots.length
  showMinigameFeedback(success, correct, slots.length)
}

// Pattern Recognition Game Setup
function setupPatternGame(data) {
  document.getElementById("pattern-game").classList.remove("hidden")

  const container = document.getElementById("reviews-container")
  container.innerHTML = ""

  patternState = { selectedReviews: [], correctSelections: 0 }

  let items = []
  if (data.reviews) {
    items = data.reviews
    setupReviewPattern(items, container)
  } else if (data.conversations) {
    items = data.conversations
    setupConversationPattern(items, container)
  }

  const gameTitle = document.querySelector("#pattern-game h3")
  const gameInstruction = document.querySelector("#pattern-game .game-instruction")

  if (data.reviews) {
    gameTitle.textContent = "Identify the fake review patterns!"
    gameInstruction.textContent = "Select all reviews that show signs of AI generation"
  } else if (data.conversations) {
    gameTitle.textContent = "Spot the AI chatbot messages!"
    gameInstruction.textContent = "Select all messages that show signs of AI chatbot behavior"
  }
}

function setupReviewPattern(reviews, container) {
  reviews.forEach((review) => {
    const div = document.createElement("div")
    div.className = "review-item"
    div.dataset.id = review.id
    div.dataset.fake = review.fake

    div.innerHTML = `
      <div class="review-header">
        <span class="review-rating">${review.rating}</span>
        <span class="review-date">${review.date}</span>
      </div>
      <div class="review-text">${review.text}</div>
    `

    div.addEventListener("click", () => selectReview(div))
    container.appendChild(div)
  })
}

function setupConversationPattern(conversations, container) {
  conversations.forEach((conv) => {
    const div = document.createElement("div")
    div.className = "review-item conversation-item"
    div.dataset.id = conv.id
    div.dataset.fake = conv.fake

    div.innerHTML = `
      <div class="review-header">
        <span class="conversation-time">${conv.time}</span>
        <span class="response-time">Response: ${conv.response_time}</span>
      </div>
      <div class="review-text">"${conv.message}"</div>
    `

    div.addEventListener("click", () => selectReview(div))
    container.appendChild(div)
  })
}

function selectReview(element) {
  playSound("click-sound")
  const reviewId = element.dataset.id

  if (element.classList.contains("selected")) {
    element.classList.remove("selected")
    patternState.selectedReviews = patternState.selectedReviews.filter((id) => id !== reviewId)
  } else {
    element.classList.add("selected")
    patternState.selectedReviews.push(reviewId)
  }
}

function checkPatterns() {
  playSound("click-sound")
  const reviews = document.querySelectorAll(".review-item")
  let correct = 0
  let total = 0

  reviews.forEach((review) => {
    const isFake = review.dataset.fake === "true"
    const isSelected = patternState.selectedReviews.includes(review.dataset.id)

    if (isFake) {
      total++
      if (isSelected) {
        correct++
        review.classList.add("correct")
      } else {
        review.style.background = "rgba(255, 0, 64, 0.1)"
        review.style.border = "2px solid #ff0040"
      }
    } else if (isSelected) {
      review.classList.add("incorrect")
    }
  })

  const success = correct === total && patternState.selectedReviews.length === total
  showMinigameFeedback(success, correct, total)
}

// Show Minigame Feedback
function showMinigameFeedback(success, correct, total) {
  const scene = storyScenes[currentScene]

  if (success) {
    score += 100
    correctAnswers++
    playSound("success-sound")
    showAchievement("Perfect!", "You mastered this challenge! +100 points")
  } else {
    score += Math.floor((correct / total) * 50)
    playSound("error-sound")

    // Show real-life impact warning for wrong answers
    if (scene.wrongChoiceImpact) {
      showImpactWarning(scene.wrongChoiceImpact)
      return // Don't show regular feedback yet
    }
  }

  showRegularFeedback(success, correct, total, scene)
}

function setupQuizGame(data) {
  document.getElementById("quiz-game").classList.remove("hidden")
  const container = document.getElementById("quiz-options")
  const questionText = document.getElementById("quiz-question")

  questionText.textContent = data.question
  container.innerHTML = ""

  data.options.forEach((opt, index) => {
    const btn = document.createElement("button")
    btn.className = "quiz-option-btn"
    btn.textContent = opt.text
    btn.onclick = () => {
      const correct = opt.correct ? 1 : 0
      const total = 1
      showMinigameFeedback(opt.correct, correct, total)
    }
    container.appendChild(btn)
  })
}


function showRegularFeedback(success, correct, total, scene) {
  const feedbackArea = document.getElementById("feedback-area")
  const feedbackIcon = document.getElementById("feedback-icon")
  const feedbackTitle = document.getElementById("feedback-title")
  const feedbackText = document.getElementById("feedback-text")
  const educationalText = document.getElementById("educational-text")
  const retryBtn = document.getElementById("retry-btn")

  if (success) {
    feedbackIcon.textContent = "🎉"
    feedbackTitle.textContent = "Excellent Work!"
    feedbackText.textContent = `You got ${correct}/${total} correct! You're becoming a digital detective expert.`
    retryBtn.classList.add("hidden")
  } else {
    feedbackIcon.textContent = "🤔"
    feedbackTitle.textContent = "Good Try!"
    feedbackText.textContent = `You got ${correct}/${total} correct. Let's learn from this experience.`
    retryBtn.classList.remove("hidden")
  }

  educationalText.textContent = scene.educational
  feedbackArea.classList.remove("hidden")

  updateStats()
}

// Show Real-Life Impact Warning
function showImpactWarning(impactData) {
  const impactWarning = document.getElementById("impact-warning")
  const impactText = document.getElementById("impact-text")
  const consequencesList = document.getElementById("consequences-list")

  impactText.textContent = impactData.text

  consequencesList.innerHTML = ""
  impactData.consequences.forEach((consequence) => {
    const li = document.createElement("li")
    li.textContent = consequence
    consequencesList.appendChild(li)
  })

  impactWarning.classList.remove("hidden")
}

function closeImpactWarning() {
  playSound("click-sound")
  document.getElementById("impact-warning").classList.add("hidden")

  // Show regular feedback after impact warning
  const scene = storyScenes[currentScene]
  showRegularFeedback(false, 0, 1, scene) // Assume failure since impact was shown
}

// Retry Challenge
function retryChallenge() {
  playSound("click-sound")
  document.getElementById("feedback-area").classList.add("hidden")

  // Reset current minigame state
  const scene = storyScenes[currentScene]
  if (scene.minigame) {
    setupMinigame(scene.minigame, scene.minigameData)
  }
}

// Continue Story
function continueStory() {
  playSound("click-sound")
  document.getElementById("feedback-area").classList.add("hidden")
  currentScene++

  if (currentScene >= storyScenes.length) {
    showFinalResults()
  } else {
    showScene(currentScene)
  }
}

// Next Scene (for non-minigame transitions)
function nextScene() {
  playSound("click-sound")
  currentScene++

  if (currentScene >= storyScenes.length) {
    showFinalResults()
  } else {
    showScene(currentScene)
  }
}

// Show Final Results
function showFinalResults() {
  const percentage = Math.round((correctAnswers / totalScenes) * 100)
  let rank = "Digital Detective Trainee"
  let rankIcon = "🕵️"

  if (percentage >= 90) {
    rank = "Master Digital Detective"
    rankIcon = "🏆"
  } else if (percentage >= 70) {
    rank = "Senior Digital Detective"
    rankIcon = "🥇"
  } else if (percentage >= 50) {
    rank = "Junior Digital Detective"
    rankIcon = "🥈"
  }

  document.getElementById("story-title").textContent = "Mission Complete!"
  const sceneImg = document.getElementById("scene-img")
  sceneImg.src = "mission-complete.png" // Set the new image source
  sceneImg.style.display = "block" // Ensure the image is displayed
  if (sceneImg.nextElementSibling) {
    sceneImg.nextElementSibling.style.display = "none" // Hide the placeholder div
  }
  document.getElementById("speaker-avatar").textContent = "🎉"
  document.getElementById("speaker-name").textContent = "Congratulations!"
  document.getElementById("speaker-name").style.color = "#00cc66"
  document.getElementById("dialogue-text").textContent =
    `Alex has successfully completed the digital safety training! You helped navigate ${correctAnswers}/${totalScenes} challenges correctly (${percentage}%). You've earned the rank of ${rank}!`

  hideAllMinigames()
  document.getElementById("story-choices").style.display = "block"
  document.getElementById("choices-container").innerHTML = `
    <button class="choice-btn" onclick="restartStory()">
      <span class="choice-icon">🔄</span>
      Play Again
    </button>
    <button class="choice-btn" onclick="showCertificate()">
      <span class="choice-icon">📜</span>
      View Certificate
    </button>
  `

  showAchievement(`${rank} Achieved!`, `You scored ${percentage}% and helped Alex stay safe online!`)
}

// Restart Story
function restartStory() {
  playSound("click-sound")
  currentScene = 0
  score = 0
  correctAnswers = 0
  currentStoryPanel = 0
  startStory()
}

// Show Certificate
function showCertificate() {
  playSound("click-sound")
  const percentage = Math.round((correctAnswers / totalScenes) * 100)
  let rank = "Digital Detective Trainee"

  if (percentage >= 90) {
    rank = "Master Digital Detective"
  } else if (percentage >= 70) {
    rank = "Senior Digital Detective"
  } else if (percentage >= 50) {
    rank = "Junior Digital Detective"
  }

  alert(
    `🏆 CERTIFICATE OF COMPLETION 🏆

This certifies that you have successfully completed
"Alex's Digital Day - AI Safety Adventure"

Rank Achieved: ${rank}
Score: ${percentage}%
Challenges Completed: ${correctAnswers}/${totalScenes}

You are now equipped to identify and respond to AI-generated online threats!`,
  )
}

// Update Stats
function updateStats() {
  document.getElementById("score").textContent = score;
  document.getElementById("progress").textContent = `${currentScene + 1}/${totalScenes}`;  // Fixed with backticks

  let level = "Beginner";
  if (score >= 800) level = "Expert";
  else if (score >= 600) level = "Advanced";
  else if (score >= 400) level = "Intermediate";

  document.getElementById("level").textContent = level;
}

// Update Progress Bar
function updateProgress() {
  const progressBar = document.getElementById("progress-bar");
  const percentage = ((currentScene + 1) / totalScenes) * 100;
  progressBar.style.width = percentage + "%";
  document.getElementById("progress").textContent = `${currentScene + 1}/${totalScenes}`;  // Fixed with backticks
}

function nextScene() {
  if (currentScene < totalScenes) {
    currentScene++;
    updateProgress();
  }
}

// Show Achievement
function showAchievement(title, text) {
  const popup = document.getElementById("achievement-popup")
  const achievementText = document.getElementById("achievement-text")

  achievementText.textContent = text
  popup.classList.remove("hidden")

  setTimeout(() => {
    popup.classList.add("hidden")
  }, 3000)
}

// Image Modal Functions
function showImageModal(imageSrc, description) {
  const modal = document.getElementById("image-modal")
  const modalImage = document.getElementById("modal-image")

  modalImage.src = imageSrc
  modalImage.alt = description
  modal.classList.remove("hidden")

  modal.scrollTop = 0

  modalImage.onclick = (e) => {
    e.stopPropagation()
  }

  modal.onclick = (e) => {
    if (e.target === modal) {
      closeImageModal()
    }
  }
}

function closeImageModal() {
  const modal = document.getElementById("image-modal")
  modal.classList.add("hidden")
  modal.onclick = null

  const modalImage = document.getElementById("modal-image")
  modalImage.onclick = null
}

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeImageModal()
  }
})

// Initialize when page loads
document.addEventListener("DOMContentLoaded", initGame)

// Handle window resize for mobile
window.addEventListener("resize", () => {
  const rotateWarning = document.getElementById("rotate-warning")
  const gameContainer = document.getElementById("game-container")

  if (window.innerWidth <= 1024) {
    if (window.innerHeight > window.innerWidth) {
      rotateWarning.style.display = "flex"
      gameContainer.style.display = "none"
    } else {
      rotateWarning.style.display = "none"
      gameContainer.style.display = "flex"
    }
  } else {
    rotateWarning.style.display = "none"
    gameContainer.style.display = "flex"
  }
})
