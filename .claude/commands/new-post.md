---
description: Create a new post for Derek's Digital Garden
---

You are helping create a new post for Derek's Digital Garden. Follow these steps:

1. **Ask the user questions** to gather the necessary information:
   - What category/section is this post for? (patterns/macOS, patterns/oracle, patterns/windows, patterns/linux, notes, guides, homelab, or start)
   - What is the title/topic of the post?
   - Should this be a `.md` or `.mdx` file? (default to .md unless they need React components)
   - Brief description of what they want to write about

2. **Determine the file path**:
   - For patterns: `src/content/docs/patterns/{subcategory}/{slug}.md`
   - For notes: `src/content/docs/notes/{slug}.md`
   - For guides: `src/content/docs/guides/{slug}.md`
   - For homelab: `src/content/docs/homelab/{slug}.md`
   - For start: `src/content/docs/start/{slug}.md`
   - Create a URL-friendly slug from the title (lowercase, hyphens instead of spaces)

3. **Create the file** with appropriate frontmatter:
   ```md
   ---
   title: [The Post Title]
   description: [Brief description for SEO/preview]
   ---

   [Content starts here]
   ```

4. **Help with content**:
   - Ask if they want help drafting an outline or initial content
   - If yes, help them write the content based on what they want to cover
   - If no, create the file with just the frontmatter and a placeholder

5. **Update the category start.mdx file**:
   - Each category has a `start.mdx` file that lists all posts in that category
   - Determine which start.mdx to update based on the category:
     - patterns/macOS → `src/content/docs/patterns/macOS/start.mdx`
     - patterns/oracle → `src/content/docs/patterns/oracle/start.mdx`
     - patterns/windows → `src/content/docs/patterns/windows/start.mdx`
     - patterns/linux → `src/content/docs/patterns/linux/start.mdx`
     - notes → `src/content/docs/notes/start.mdx`
     - guides → determine if there's a start.mdx, if not, skip this step
     - homelab → determine if there's a start.mdx, if not, skip this step

   **Special handling for patterns/oracle/start.mdx**:
   - For Oracle posts, intelligently categorize by subject focus
   - Common categories: WebLogic, WLST, GoldenGate, Database, OSB, JMS, Installation, etc.
   - Ask the user what subject/topic this post falls under (or infer from title/description)
   - If the category doesn't exist yet in the start.mdx, create a new section with a heading
   - Add the new post link under the appropriate category heading
   - Use this format: `* [Post Title](/path/to/post)`

   **For other categories**:
   - Simply add the new post to the list in the start.mdx file
   - Use the same bullet format as existing entries (either `*` or `-` depending on what's already there)
   - Add at the end of the list
   - Format: `* [Post Title](/path/to/post)` or `- [Post Title](/path/to/post)`

   **Show preview before applying**:
   - Show the user a preview of the changes that will be made to start.mdx
   - Ask for approval before making the changes
   - If disapproved, ask how they'd like to adjust it
   - Only update the file after approval

6. **Provide next steps**:
   - Tell them the file path where the post was created
   - Confirm that start.mdx was updated with the new link
   - Remind them they can run `npm run dev` to preview it
   - Let them know they can continue editing the file or ask for more help

Be conversational and helpful throughout the process!
