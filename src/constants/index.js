import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    meta,
    starbucks,
    tesla,
    shopify,
    carrent,
    jobit,
    tripguide,
    threejs,
    curator,
    trust,
    eksim,

    talha
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "React Native Developer",
      icon: mobile,
    },
    {
      title: "Node JS Developer",
      icon: backend,
    },
    {
      title: "Flutter Developer",
      icon: mobile,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    
  ];
  
  const experiences = [
    {
      title: "QA Analyst & Full-Stack Developer",
      company_name: "Talha Textile",
      icon: talha,
      iconBg: "#003049",
      date: "09/2024 - 01/2026",
      points: [
        "Successfully developed and maintained the company’s internal WordPress platform using PHP, JavaScript, and CSS.",
        "Designed and implemented automated end-to-end (E2E) tests using Playwright to ensure continuous product quality and stability.",
        "Acted as a key bridge between stakeholders and the development team by translating business requirements into technical user stories.",
        
      ],
    },
    {
      title: "Unity & Web Developer",
      company_name: "Curator Studios",
      icon: curator,
      iconBg: "#003049",
      date: "01/2023 -  06/2024",
      points: [
        "Web Development with JavaScript: Spearheaded the creation of the company's website using JavaScript, applying modern web design principles to deliver an engaging and responsive user experience.",
        "Server-side Development with Node.js: Played a significant role in server-side development, utilizing Node.js to build robust APIs and backend systems that supported the web3 games' functionality.",
        "Web3 Game Interface Development: Led the design and development of captivating web3 game interfaces, seamlessly integrating blockchain functionalities to enhance user engagement and experience.",
        "Website Optimization and Performance: Ensured the website's optimal performance, employing optimization techniques and best practices to achieve fast loading times and a smooth browsing experience..",
        "Adapting to Emerging Technologies: Demonstrated adaptability in the ever-evolving web3 landscape, staying up-to-date with the latest Node.js and web development trends to drive innovation in the projects."
      ],
    },
    {
      title: "Software Engineer",
      company_name: "Trust Games",
      icon: trust,
      iconBg: "#fdf0d5",
      date: "03/2022 - 09/2022i",
      points: [
        "Unity Game Development Projects: Actively contributed to captivating VR game projects, implementing interactive mechanics and impressive graphics.",
        "Collaborative Teamwork: Excelled in a team environment, collaborating with developers, artists, and designers on VR projects using Git.",
        "Problem Solving and Debugging: Resolved challenges in VR development, optimized performance, and improved the overall VR gameplay experience.",
        "Learning and Growth: Expanded skills in C#, particle systems, shaders, and VR development through workshops and hands-on projects.",
      ],
    },
    
    
  ];
  
  const testimonials = [
    {
      testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
      name: "Sara Lee",
      designation: "CFO",
      company: "Acme Co",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Rick does.",
      name: "Chris Brown",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Lisa Wang",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  
  const projects = [
    {
      name: "Car Rent",
      description:
        "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "mongodb",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://github.com/",
    },
    {
      name: "Job IT",
      description:
        "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "green-text-gradient",
        },
        {
          name: "scss",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/",
    },
    {
      name: "Trip Guide",
      description:
        "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
      tags: [
        {
          name: "nextjs",
          color: "blue-text-gradient",
        },
        {
          name: "supabase",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: tripguide,
      source_code_link: "https://github.com/",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };