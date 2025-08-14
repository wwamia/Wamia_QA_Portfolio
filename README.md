# Wamia's QA Automation Portfolio 

Welcome to my portfolio highlighting some of my skills as a SDET! 👋  
Here, you will find hands-on projects that showcase my ability to build and maintain quality-focused software automation solutions.

## ✨ About Me

I am a recent Engineering grad from the University of Waterloo with a passion for software quality.  
I have completed 4 SDET/QA co-ops in diverse tech environments, resulting in 2 years of building real-world experience in automation, scripting, and modern testing practices.  
I am now focused on growing my career as a full-time SDET, blending engineering rigor with testing excellence.

## 📝 Contents within this repo

1. [UI Automation](./Tests/UI/)  
   UI automation tests were completed using this [demo site](/https://www.saucedemo.com/) with integrated POM classes. 

2. [API testing](./Tests/API/)  
   API tests were completed by creating a mock api db.

3. [SQL testing](./Tests/DB/)  
   SQL tests were completed by creating a mock sql db.

4. [CI-CD Integration](./.github/workflows/)  
   CI/CD integration was created through Github Actions and are run daily at 3 AM EST.

## 🛠️ Tools & Technologies
Full list of stacks, frameworks, and languages used
| Category         | Stack / Tools              |
|:-------------------|:---------------------------|
| 🖥️ UI Automation    | Playwright                 |
| ⚙️ API Testing      | Playwright + JSON DB       |
| 🗄️ SQL Testing      | Playwright + SQLite DB     |
| 🤖 CI/CD            | GitHub Actions             |
| 🧪 Test Frameworks  | Playwright Test Runner     |
| 📦 Package Managers | npm                        |
| 🔗 Version Control  | Git, GitHub                |

## 🕹 Installation & Running Projects
How to set up and run the test suites

### 🔧 Prerequisites  
- Node.js & npm  
- Playwright (`npx playwright install`)  
- Git (for cloning repo)

### 1. Clone the repo
```bash
git clone https://github.com/wwamia/Wamia_QA_Portfolio.git
cd Wamia_QA_Portfolio
```

### 2. Install Node.js dependencies
```bash
npm install
```

### 3. Install Playwright browser binaries
```bash
npx playwright install
```

### 4. Run all Playwright tests
```bash
npm run test:all
```

### 5. Run a specific test suite  
API test suite:  
```bash
npm run test:api
```  
UI test suite:  
```bash
npm run test:ui
```  
SQL DB test suite:  
```bash
npm run test:with-db
```  

### 6. CI/CD Integration
Additionally, the entire test suite can be run through Github Actions under the worflow `Run Playwright Tests`.

##
💎 Thanks for checking out my QA Automation Portfolio! 💎


