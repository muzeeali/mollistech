const fs = require('fs');

let code = fs.readFileSync('src/animations.js', 'utf8');

const scriptToAdd = `
  // 13. Services & Capabilities Network Topology Animation
  const serviceNodes = $('.animate-\\\\[spin_60s_linear_infinite_reverse\\\\] > button');
  if (serviceNodes.length) {
    const serviceFiles = [
      "custom-software.json",
      "cloud-engineering.yml",
      "cybersecurity.json",
      "ai-data.py",
      "ui-ux-design.tsx",
      "qa-automation.spec.ts",
      "dedicated-teams.json",
      "mobile-app.swift",
      "api-integration.graphql"
    ];

    const serviceContents = [
\`<span class="text-[#8b949e]">/**
 * Service: Custom Software Development
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">softwareData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"Custom Software Development"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"Scalable, secure, and high-performance solutions."</span>,
  <span class="text-[#a5d6ff]">"stack"</span>: [<span class="text-[#a5d6ff]">"React"</span>, <span class="text-[#a5d6ff]">"Node.js"</span>, <span class="text-[#a5d6ff]">"Python"</span>, <span class="text-[#a5d6ff]">"Go"</span>]
};\`,
\`<span class="text-[#8b949e]"># Service: Cloud Engineering & DevOps</span>
<span class="text-[#ff7b72]">stages</span>:
  - <span class="text-[#a5d6ff]">build</span>
  - <span class="text-[#a5d6ff]">test</span>
  - <span class="text-[#a5d6ff]">deploy</span>

<span class="text-[#79c0ff]">production_deploy</span>:
  <span class="text-[#a5d6ff]">script</span>:
    - <span class="text-[#a5d6ff]">echo "Deploying to Kubernetes cluster..."</span>
    - <span class="text-[#a5d6ff]">kubectl apply -f k8s/</span>\`,
\`<span class="text-[#8b949e]">/**
 * Service: Cybersecurity & Cloud Security
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">securityConfig</span> = {
  <span class="text-[#a5d6ff]">"encryption"</span>: <span class="text-[#a5d6ff]">"AES-256"</span>,
  <span class="text-[#a5d6ff]">"compliance"</span>: [<span class="text-[#a5d6ff]">"SOC2"</span>, <span class="text-[#a5d6ff]">"HIPAA"</span>, <span class="text-[#a5d6ff]">"GDPR"</span>],
  <span class="text-[#a5d6ff]">"firewall"</span>: <span class="text-[#79c0ff]">true</span>,
  <span class="text-[#a5d6ff]">"zero_trust"</span>: <span class="text-[#79c0ff]">true</span>
};\`,
\`<span class="text-[#8b949e]"># Service: AI & Data Solutions</span>
<span class="text-[#ff7b72]">import</span> pandas <span class="text-[#ff7b72]">as</span> pd
<span class="text-[#ff7b72]">from</span> sklearn.model_selection <span class="text-[#ff7b72]">import</span> train_test_split
<span class="text-[#ff7b72]">from</span> transformers <span class="text-[#ff7b72]">import</span> pipeline

<span class="text-[#8b949e]"># Initialize GenAI model pipeline</span>
generator = pipeline(<span class="text-[#a5d6ff]">'text-generation'</span>, model=<span class="text-[#a5d6ff]">'gpt-4'</span>)
results = generator(<span class="text-[#a5d6ff]'>"Optimize data pipelines for speed."</span>)\`,
\`<span class="text-[#8b949e]">/**
 * Service: UI/UX Design
 */</span>
<span class="text-[#ff7b72]">import</span> React <span class="text-[#ff7b72]">from</span> <span class="text-[#a5d6ff]">'react'</span>;

<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">DesignSystem</span> = () =&gt; (
  <span class="text-[#79c0ff]">&lt;ThemeProvider</span> <span class="text-[#a5d6ff]">theme</span>=<span class="text-[#a5d6ff]">"dark"</span><span class="text-[#79c0ff]">&gt;</span>
    <span class="text-[#79c0ff]">&lt;Button</span> <span class="text-[#a5d6ff]">variant</span>=<span class="text-[#a5d6ff]">"primary"</span><span class="text-[#79c0ff]">&gt;</span>User-Centric Design<span class="text-[#79c0ff]">&lt;/Button&gt;</span>
  <span class="text-[#79c0ff]">&lt;/ThemeProvider&gt;</span>
);\`,
\`<span class="text-[#8b949e]">/**
 * Service: Quality Assurance & Automation
 */</span>
<span class="text-[#ff7b72]">import</span> { test, expect } <span class="text-[#ff7b72]">from</span> <span class="text-[#a5d6ff]">'@playwright/test'</span>;

test(<span class="text-[#a5d6ff]">'automated integration checks pass'</span>, <span class="text-[#ff7b72]">async</span> ({ page }) =&gt; {
  <span class="text-[#ff7b72]">await</span> page.goto(<span class="text-[#a5d6ff]">'/production'</span>);
  <span class="text-[#ff7b72]">await</span> expect(page.locator(<span class="text-[#a5d6ff]">'#status'</span>)).toHaveText(<span class="text-[#a5d6ff]">'All systems nominal'</span>);
});\`,
\`<span class="text-[#8b949e]">/**
 * Service: Dedicated Engineering Teams
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">teamStructure</span> = {
  <span class="text-[#a5d6ff]">"model"</span>: <span class="text-[#a5d6ff]">"Embedded Pods"</span>,
  <span class="text-[#a5d6ff]">"composition"</span>: [
    <span class="text-[#a5d6ff]">"Tech Lead"</span>,
    <span class="text-[#a5d6ff]">"Senior Full-Stack Engineers"</span>,
    <span class="text-[#a5d6ff]">"QA Automation Engineer"</span>
  ],
  <span class="text-[#a5d6ff]">"agile_workflow"</span>: <span class="text-[#a5d6ff]">"Scrum/Kanban"</span>
};\`,
\`<span class="text-[#8b949e]">/* Service: Mobile App Development */</span>
<span class="text-[#ff7b72]">import</span> SwiftUI

<span class="text-[#ff7b72]">struct</span> MobileView: <span class="text-[#79c0ff]">View</span> {
    <span class="text-[#ff7b72]">var</span> body: <span class="text-[#ff7b72]">some</span> <span class="text-[#79c0ff]">View</span> {
        VStack {
            Text(<span class="text-[#a5d6ff]">"High-Performance iOS App"</span>)
                .font(.largeTitle)
                .foregroundColor(.blue)
        }
    }
}\`,
\`<span class="text-[#8b949e]"># Service: API Development & System Integration</span>
<span class="text-[#ff7b72]">type</span> <span class="text-[#79c0ff]">Query</span> {
  <span class="text-[#79c0ff]">systemStatus</span>: <span class="text-[#79c0ff]">String!</span>
  <span class="text-[#79c0ff]">fetchData</span>(<span class="text-[#a5d6ff]">source</span>: <span class="text-[#79c0ff]">String!</span>): <span class="text-[#79c0ff]">JSON!</span>
}

<span class="text-[#ff7b72]">type</span> <span class="text-[#79c0ff]">Mutation</span> {
  <span class="text-[#79c0ff]">integrateSystem</span>(<span class="text-[#a5d6ff]">config</span>: <span class="text-[#79c0ff]">ConfigInput!</span>): <span class="text-[#79c0ff]">Boolean!</span>
}\`
    ];

    let currentServiceIndex = -1;
    
    $(document).off('mouseenter', '.animate-\\\\[spin_60s_linear_infinite_reverse\\\\] > button');
    $(document).on('mouseenter', '.animate-\\\\[spin_60s_linear_infinite_reverse\\\\] > button', function() {
      const index = serviceNodes.index(this);
      
      // Update the visual state of all nodes
      serviceNodes.each(function(i) {
        const btn = $(this);
        const container = btn.parent().parent();
        const line = container.find('line');
        const label = btn.next('div');
        
        if (i === index) {
          // Active state
          btn.removeClass('bg-[#0d1117] border-[#30363d] text-[#8b949e]')
             .addClass('bg-[#161b22] border-[#58a6ff] text-[#58a6ff] scale-125 shadow-[0_0_20px_rgba(88,166,255,0.4)]');
          line.attr('stroke', '#58a6ff').attr('stroke-width', '2');
          label.removeClass('text-[#8b949e] opacity-0').addClass('text-[#58a6ff] opacity-100');
        } else {
          // Inactive state
          btn.removeClass('bg-[#161b22] border-[#58a6ff] text-[#58a6ff] scale-125 shadow-[0_0_20px_rgba(88,166,255,0.4)]')
             .addClass('bg-[#0d1117] border-[#30363d] text-[#8b949e]');
          line.attr('stroke', 'rgba(255,255,255,0.05)').attr('stroke-width', '1');
          label.removeClass('text-[#58a6ff] opacity-100').addClass('text-[#8b949e] opacity-0');
        }
      });
      
      // Update terminal IDE text
      if (currentServiceIndex !== index && index >= 0 && index < serviceContents.length) {
        currentServiceIndex = index;
        const ideFilenameEl = $('#ide-filename');
        const ideContentEl = $('#ide-content');
        if (ideFilenameEl.length && ideContentEl.length) {
          ideFilenameEl.text(serviceFiles[index]);
          // Use typeHTML if it is defined, otherwise fallback
          if (typeof typeHTML === 'function') {
             typeHTML(serviceContents[index], ideContentEl);
          } else {
             // Fallback definition for typeHTML
             clearInterval(ideContentEl.data('typeInterval'));
             ideContentEl.html('');
             let charIndex = 0;
             const htmlStr = serviceContents[index];
             const interval = setInterval(() => {
                if (charIndex <= htmlStr.length) {
                   if (htmlStr[charIndex] === '<') {
                      let closingIdx = htmlStr.indexOf('>', charIndex);
                      if (closingIdx !== -1) charIndex = closingIdx + 1;
                   }
                   ideContentEl.html(htmlStr.substring(0, charIndex));
                   charIndex++;
                } else {
                   clearInterval(interval);
                }
             }, 5);
             ideContentEl.data('typeInterval', interval);
          }
        }
      }
    });
  }
`;

// Inject into animations.js
code += "\n" + scriptToAdd;

fs.writeFileSync('src/animations.js', code);
console.log('Update script finished');
