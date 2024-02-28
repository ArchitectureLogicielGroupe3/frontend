import React, { useState, useEffect, useRef, useMemo } from "react"
import Chart from "chart.js/auto"
import "./character.css"

function CharacterCard() {
  // Adjectives data
  const adjectives = useMemo(
    () => ({
      physical: ["Strong", "Agile", "Tough", "Quick", "Steady"],
      mental: ["Smart", "Wise", "Clever", "Creative", "Analytical"],
      social: [
        "Charming",
        "Persuasive",
        "Sociable",
        "Empathetic",
        "Leadership",
      ],
    }),
    []
  )

  // Skills data
  const skills = [
    "Programming",
    "Leadership",
    "Problem-solving",
    "Communication",
    "Time management",
    "Adaptability",
    "Teamwork",
    "Creativity",
    "Critical thinking",
    "Negotiation",
    "Organization",
    "Decision making",
    "Stress management",
    "Emotional intelligence",
    "Conflict resolution",
    "Attention to detail",
    "Networking",
    "Presentation",
    "Research",
    "Financial management",
  ]

  // List of professions
  const professions = ["Engineer", "Doctor", "Teacher", "Artist", "Lawyer"]

  // List of clearances
  const clearances = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"]

  // State to manage selected adjectives and skills
  const [selectedAdjectives, setSelectedAdjectives] = useState([])
  const [selectedSkills, setSelectedSkills] = useState([])
  const [remainingPointsAdjectives, setRemainingPointsAdjectives] = useState(9)
  const [remainingPointsSkills, setRemainingPointsSkills] = useState(3)
  const [characterInfo, setCharacterInfo] = useState(null)
  const [showSummary, setShowSummary] = useState(false)

  // Radar chart data
  const radarChartRef = useRef(null)

  useEffect(() => {
    const ctx = document.getElementById("radarChart").getContext("2d")
    const radarChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: Object.keys(adjectives),
        datasets: [
          {
            label: "Adjectives",
            data: Object.keys(adjectives).map(() => 0),
            fill: true,
            backgroundColor: "rgba(204, 153, 255, 0.2)",
            borderColor: "#cc99ff",
            pointBackgroundColor: "#cc99ff",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#cc99ff",
          },
        ],
      },
      options: {
        elements: {
          line: {
            borderWidth: 3,
          },
        },
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 5,
            ticks: {
              stepSize: "none",
            },
          },
        },
      },
    })

    radarChartRef.current = radarChart

    return () => {
      radarChart.destroy()
    }
  }, [])

  useEffect(() => {
    const radarChart = radarChartRef.current
    const data = radarChart.data.datasets[0].data

    Object.keys(adjectives).forEach((category, index) => {
      const categoryAdjectives = adjectives[category]
      const selectedCategoryAdjectives = categoryAdjectives.filter((adj) =>
        selectedAdjectives.includes(adj)
      )
      data[index] = selectedCategoryAdjectives.length
    })

    radarChart.update()
  }, [selectedAdjectives, adjectives]) // Ajoutez 'adjectives' dans le tableau de dépendances

  // Function to handle checkbox change for adjectives
  const handleCheckboxChangeAdjectives = (adj) => {
    if (selectedAdjectives.includes(adj)) {
      setSelectedAdjectives(selectedAdjectives.filter((item) => item !== adj))
      setRemainingPointsAdjectives(remainingPointsAdjectives + 1)
    } else {
      if (remainingPointsAdjectives > 0) {
        setSelectedAdjectives([...selectedAdjectives, adj])
        setRemainingPointsAdjectives(remainingPointsAdjectives - 1)
      } else {
        alert("You have already used all your points for adjectives!")
      }
    }
  }

  // Function to handle checkbox change for skills
  const handleCheckboxChangeSkills = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((item) => item !== skill))
      setRemainingPointsSkills(remainingPointsSkills + 1)
    } else {
      if (remainingPointsSkills > 0) {
        setSelectedSkills([...selectedSkills, skill])
        setRemainingPointsSkills(remainingPointsSkills - 1)
      } else {
        alert("You have already selected the maximum number of skills!")
      }
    }
  }

  // Function to handle click on the summary button
  const handleSummaryButtonClick = () => {
    const strongestCategory = getStrongestCategory()
    const imageUrl = getCategoryImageUrl(strongestCategory)
    const name = document.getElementById("name").value
    const profession = document.getElementById("profession").value
    const clearance = document.getElementById("clearance").value

    const characterInfo = {
      name,
      profession,
      clearance,
      selectedAdjectives,
      selectedSkills,
      imageUrl,
    }
    setCharacterInfo(characterInfo)
    setShowSummary(true)
  }

  // Function to get the strongest category based on selected adjectives
  const getStrongestCategory = () => {
    let maxAdjectives = 0
    let strongestCategory = ""

    Object.keys(adjectives).forEach((category) => {
      const categoryAdjectives = adjectives[category]
      const selectedCategoryAdjectives = categoryAdjectives.filter((adj) =>
        selectedAdjectives.includes(adj)
      )
      if (selectedCategoryAdjectives.length > maxAdjectives) {
        maxAdjectives = selectedCategoryAdjectives.length
        strongestCategory = category
      }
    })

    return strongestCategory
  }

  // Function to get the image URL based on the strongest category
  const getCategoryImageUrl = (category) => {
    switch (category) {
      case "physical":
        return "https://static.wikia.nocookie.net/dragonball/images/3/36/Battle_of_Gods_-_Furious_Vegeta.png"
      case "mental":
        return "https://www.kana.fr/assets/uploads/2017/09/eating_cake.png"
      case "social":
        return "https://apprentiotaku.files.wordpress.com/2021/02/gon-2.jpg"
      default:
        return "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2019/12/Sad-karp-2.jpg"
    }
  }

  return (
    <div className="character-container">
      <div className="block">
        <h2>Adjectives</h2>
        <p>Remaining points for adjectives: {remainingPointsAdjectives}</p>
        <div className="categories">
          {Object.keys(adjectives).map((category, index) => (
            <div className="category" key={index}>
              <h3>{category}</h3>
              {adjectives[category].map((adj, idx) => (
                <div key={idx} className="adjective">
                  <input
                    type="checkbox"
                    value={adj}
                    id={adj}
                    checked={selectedAdjectives.includes(adj)}
                    onChange={() => handleCheckboxChangeAdjectives(adj)}
                    className="checkbox-custom"
                  />
                  <label
                    htmlFor={adj}
                    style={{
                      fontWeight: selectedAdjectives.includes(adj)
                        ? "bold"
                        : "normal",
                      color: selectedAdjectives.includes(adj)
                        ? "purple"
                        : "white",
                    }}
                  >
                    {adj}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="block">
        <h2>Radar Chart</h2>
        <canvas id="radarChart"></canvas>
      </div>
      <div className="block">
        <h2>Skills</h2>
        <p>Remaining points for skills: {remainingPointsSkills}</p>
        <form id="skillsForm">
          {skills.map((skill, index) => (
            <div key={index} className="skill">
              <input
                type="checkbox"
                id={`skill_${index}`}
                value={skill}
                checked={selectedSkills.includes(skill)}
                onChange={() => handleCheckboxChangeSkills(skill)}
                class="checkbox-custom"
              />
              <label
                htmlFor={`skill_${index}`}
                style={{
                  fontWeight: selectedSkills.includes(skill)
                    ? "bold"
                    : "normal",
                  color: selectedSkills.includes(skill) ? "purple" : "white",
                }}
              >
                {skill}
              </label>
            </div>
          ))}
        </form>
      </div>
      <div className="block character-infos">
        <h2>Character Information</h2>
        <form id="characterForm">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="profession">Profession:</label>
          <select id="profession" name="profession">
            {professions.map((profession, index) => (
              <option key={index} value={profession}>
                {profession}
              </option>
            ))}
          </select>
          <label htmlFor="clearance">Clearance:</label>
          <select id="clearance" name="clearance">
            {clearances.map((clearance, index) => (
              <option key={index} value={clearance}>
                {clearance}
              </option>
            ))}
          </select>
          <button
            className="button"
            type="button"
            onClick={handleSummaryButtonClick}
          >
            Show Summary
          </button>
        </form>
      </div>
      {showSummary && (
        <div className="block character-recap">
          <h2>Your character</h2>
          <img src={characterInfo.imageUrl} alt="Strongest category" />
          <div className="info">
            <p className="title">Name:</p>
            <p className="sub-title">{characterInfo.name}</p>
          </div>
          <div className="info">
            <p className="title">Profession:</p>
            <p className="sub-title">{characterInfo.profession}</p>
          </div>
          <div className="info">
            <p className="title">Clearance:</p>
            <p className="sub-title">{characterInfo.clearance}</p>
          </div>
          <div className="info">
            <p className="title">Selected adjectives:</p>
            <ul>
              {characterInfo.selectedAdjectives.map((adj, index) => (
                <li key={index}>{adj}</li>
              ))}
            </ul>
          </div>
          <div className="info">
            <p className="title">Selected skills:</p>
            <ul>
              {characterInfo.selectedSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default CharacterCard
