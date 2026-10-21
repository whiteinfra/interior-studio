# Interior Studio

[![Live demo](https://img.shields.io/badge/live%20demo-GitHub%20Pages-222222?style=flat-square&logo=githubpages&logoColor=white)](https://whiteinfra.github.io/interior-studio/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

A responsive three-page website for a fictional interior design studio, written in **vanilla HTML, CSS and JavaScript** with no frameworks, and hosted on **GitHub Pages**.

**Live:** https://whiteinfra.github.io/interior-studio/

<p align="center">
  <img src="docs/desktop.jpg" width="72%" alt="Home page, desktop">
  <img src="docs/mobile.jpg" width="23%" alt="Home page, mobile">
</p>

## Features

- Pages: home, services, contact
- Responsive layout with breakpoints at 1920, 1024, 768 and 480 px; burger menu on mobile
- Sticky header that changes on scroll, active link highlighting, smooth scrolling
- Portfolio filter by category
- Contact form with client-side validation: name, email format, phone (10+ digits), service type, message length, with inline error messages

## Structure

```
├── index.html       # home: hero, about, services, portfolio, reviews
├── services.html    # residential, commercial, supervision + pricing
├── contact.html     # contact form
├── css/
│   ├── reset.css
│   └── styles.css
├── js/
│   └── main.js      # navigation, filter, form validation
└── images/
```

## Run locally

No build step: clone and open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000   # http://localhost:8000
```

> Coursework project for the Web Technologies course. Site content is in Ukrainian.
