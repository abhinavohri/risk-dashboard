## Tools Used
- **Claude Code**: Used for initial scaffolding, boilerplate code generation, bug fixing during ongoing development, and architectural analysis.

## How I Used AI

1.  **Initial scaffolding**: The foundational structure of the project, including the initial base implementation of the dashboard, was generated using Claude. This set up mostly involved the initial file structure, dependencies, and core UI layout.

2.  **Boilerplate generation**: For features added after the initial setup, Claude was used to generate boilerplate and foundational code. A significant example is the **Liquidation Page**, where the initial component structure and data table were generated via AI. Additionally, AI was used for the initial creation of **3D artifacts and related styling** for the landing page; however, these required subsequent manual adjustments, particularly for color schemes and overall aesthetic refinement. Eventually, I felt that the 3D artifacts were not going well with the theme and removed them completely.

3.  **Bug fixing**: The typical workflow involved me describing the issue and providing the relevant code, after which the AI would propose solutions. This was effective for several categories of bugs:
    -   For **thematic and styling issues** that I spotted—such as incorrect colors in tooltips, or improper spacing on chart axes—the AI was proficient at generating the correct CSS or component props to fix the visual defect.
    -   For functional bugs like **improper data updates** due to state mismatches, the AI's assistance had mixed results. It could often solve straightforward cases, but more complex state synchronization problems required manual fixing after the AI's suggestions proved insufficient.

4.  **Code review**: I used AI to try different approaches to state management and caching strategies to determine the best path forward for the project.

## Code Validation
- **How I tested AI suggestions**: The validation process varied with the type of task.
    *   For **UI and visual components**, I mostly relied on manual visual testing.
    *   For **architectural patterns**, I used to look for the existing established industry best practices online, look at other similar dashboards and the official documentation. Other than this, I would ask AI to implement all the different patterns and manually test them to see how they would affect the user experience and performance of the app.
    *   For **code-related suggestions**, I just consulted the official documentation to make sure the feature used is appropiate for the task.

- **What I modified and why**: Most AI-generated code requires modification. Changes were often made to align the code with the project's existing style conventions, improve variable names, and integrate the code seamlessly with other components.
- **Where I rejected AI suggestions**: I rejected suggestions that were overly complex, inefficient, or did not align with the project's long-term architectural goals. In some cases, the AI's suggestions did not fully grasp the context and were therefore not applicable.

## Manual Work
- **Changing theme to match LlamaRisk branding**: The AI didn't create a proper combination even after being provided with all the colors from the official website. So, I had to manually override the old theme, which was more cyberpunk style and had 3D objects to the current one which looked aesthetic and resembled LlamaRisk branding.
- **Caching mechanism**: The initial setup only supported server side fetching and that too outdated syntax which the AI claimed was auto cached. I read the docs and found out that this is no longer the case in the latest version of next js. So, I updated the server side function to revalidate in 5 minutes. I also later setup the tanstack query setup.
- **Reusable Components**:  When asked to implement a feature, AI would copy paste a lot of code across different files which made debugging difficult. Even after multiple prompts it was not able to break the components efficiently. So, I had to manually break them into meaningful, reusable parts.
- **Data fetching structure**: In the initial setup, in order to simulate websockets the data was manipulated on the client side. This was a bad structure and also affected the app's performance. I shifted the mock data logic to the server with the rest of the api fetching. In this way, in future we only need to replace these mocking functions with the relevant api calls and our app will continue to function.
- **Extra stuff**: AI just implemented the main data display part. It didn't think about what other relevant stuff we might have to do. I researched and looked through different competitor dashboards in order to find more relevant stuff like other plots, some small stuff like tooltips, watermarks etc.
- **Technical Corrections**:
    - **Server/Client Separation**: Manually enforced the correct boundary between Server and Client components to prevent hydration errors.
    - **DeFi Specifics**: Corrected AI hallucinations regarding Aave and Convex integrations, specifically fixing incorrect ABIs, field names, and contract addresses.
