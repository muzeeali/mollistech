const fs = require('fs');

let code = fs.readFileSync('src/animations.js', 'utf8');

const scriptToAdd = `
  // 12. IDE Terminal Typing Animation
  const ideFiles = [
    "custom-software.json",
    "cloud-infrastructure.json",
    "design-system.json",
    "data-engineering.json",
    "ai-models.json",
    "ci-cd-pipeline.json"
  ];

  const ideContents = [
\`<span class="text-[#8b949e]">/**
 * Service Module: Custom Software Development
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">serviceData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"Custom Software Development"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"We design and develop secure, maintainable, and high-performance software for web, mobile, and enterprise environments."</span>,
  <span class="text-[#a5d6ff]">"stack"</span>: [
    <span class="text-[#a5d6ff]">"React"</span>,
    <span class="text-[#a5d6ff]">"Node.js"</span>,
    <span class="text-[#a5d6ff]">"Python"</span>,
    <span class="text-[#a5d6ff]">"Go"</span>
  ]
};\`,
\`<span class="text-[#8b949e]">/**
 * Service Module: Cloud
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">cloudData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"Cloud Architecture & Migration"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"Scalable cloud infrastructure designed for maximum reliability and performance."</span>,
  <span class="text-[#a5d6ff]">"providers"</span>: [
    <span class="text-[#a5d6ff]">"AWS"</span>,
    <span class="text-[#a5d6ff]">"Google Cloud"</span>,
    <span class="text-[#a5d6ff]">"Azure"</span>
  ]
};\`,
\`<span class="text-[#8b949e]">/**
 * Service Module: UI/UX
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">designData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"User Interface & Experience"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"Human-centered design creating intuitive, engaging, and beautiful product experiences."</span>,
  <span class="text-[#a5d6ff]">"tools"</span>: [
    <span class="text-[#a5d6ff]">"Figma"</span>,
    <span class="text-[#a5d6ff]">"Framer"</span>,
    <span class="text-[#a5d6ff]">"Webflow"</span>
  ]
};\`,
\`<span class="text-[#8b949e]">/**
 * Service Module: Data
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">dataData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"Data Engineering & Analytics"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"High-speed pipelines and secure warehousing to transform raw data into actionable insights."</span>,
  <span class="text-[#a5d6ff]">"stack"</span>: [
    <span class="text-[#a5d6ff]">"Snowflake"</span>,
    <span class="text-[#a5d6ff]">"dbt"</span>,
    <span class="text-[#a5d6ff]">"Airflow"</span>
  ]
};\`,
\`<span class="text-[#8b949e]">/**
 * Service Module: AI Enhancement
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">aiData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"Generative AI Embedded"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"Deploy proprietary machine learning models directly into your applications for intelligent automation."</span>,
  <span class="text-[#a5d6ff]">"capabilities"</span>: [
    <span class="text-[#a5d6ff]">"LLMs"</span>,
    <span class="text-[#a5d6ff]">"Computer Vision"</span>,
    <span class="text-[#a5d6ff]">"Predictive Analytics"</span>
  ]
};\`,
\`<span class="text-[#8b949e]">/**
 * Service Module: DevOps
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">devopsData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"Automated DevOps Pipelines"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"Accelerate delivery with continuous integration, automated testing, and secure release orchestration."</span>,
  <span class="text-[#a5d6ff]">"tools"</span>: [
    <span class="text-[#a5d6ff]">"Kubernetes"</span>,
    <span class="text-[#a5d6ff]">"Terraform"</span>,
    <span class="text-[#a5d6ff]">"GitHub Actions"</span>
  ]
};\`
  ];

  let currentIdeIndex = -1;
  const ideFilenameEl = $('#ide-filename');
  const ideContentEl = $('#ide-content');

  const typeHTML = (htmlStr, element) => {
    clearInterval(element.data('typeInterval'));
    element.html('');
    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex <= htmlStr.length) {
        if (htmlStr[charIndex] === '<') {
           let closingIdx = htmlStr.indexOf('>', charIndex);
           if (closingIdx !== -1) charIndex = closingIdx + 1;
        }
        element.html(htmlStr.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(interval);
      }
    }, 5);
    element.data('typeInterval', interval);
  };
`;

code = code.replace("$(document).on('click', '#hero-slider .bottom-12 button', function() {", "$(document).on('click mouseenter', '#hero-slider .bottom-12 button', function() {");

code = code.replace("$(this).removeClass('opacity-100').addClass('opacity-0 pointer-events-none');\n      }\n    });\n  });", "$(this).removeClass('opacity-100').addClass('opacity-0 pointer-events-none');\n      }\n    });\n    \n    if (currentIdeIndex !== index && index >= 0 && index < ideContents.length) {\n      currentIdeIndex = index;\n      ideFilenameEl.text(ideFiles[index]);\n      typeHTML(ideContents[index], ideContentEl);\n    }\n  });");

code = code.replace("// 10. Text coloring animation based on scroll progress", scriptToAdd + "\n\n  // 10. Text coloring animation based on scroll progress");

fs.writeFileSync('src/animations.js', code);
console.log('Update script finished');
