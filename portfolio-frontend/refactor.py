import re
import sys

filename = 'src/Components/Admin/AdminComponents/AdminExperience.js'

with open(filename, 'r') as f:
    original_lines = f.readlines()

# We need to find the specific blocks.
# Block 1 starts at "const months = ["
# It ends right before "export default function AdminExperience() {"
# Wait, currently months is INSIDE the function.
# Let's find "const months = ["
try:
    months_start = next(i for i, line in enumerate(original_lines) if "const months = [" in line)
except StopIteration:
    print("Cannot find months_start")
    sys.exit(1)

# Now we find where the inner components end.
# Last inner component is ExperienceForm.
try:
    exp_form_start = next(i for i, line in enumerate(original_lines) if "const ExperienceForm = (" in line)
except StopIteration:
    print("Cannot find ExperienceForm")
    sys.exit(1)

# Find end of ExperienceForm
exp_form_end = -1
for i in range(exp_form_start, len(original_lines)):
    if original_lines[i].strip() == "};":
        exp_form_end = i
        break
if exp_form_end == -1:
    print("Cannot find end of ExperienceForm")
    sys.exit(1)

# Wait, `ExpForm` comes AFTER AdminExperience return statement? No, it's before `return (`.
try:
    admin_return_start = next(i for i, line in enumerate(original_lines) if "return (" in line and i > exp_form_end)
except StopIteration:
    print("Cannot find return of AdminExperience")
    sys.exit(1)

# The block to extract is from `months_start` to `exp_form_end`.
extracted_block = original_lines[months_start:exp_form_end + 1]

# In the extracted block, let's replace `learnings` tracking in ProjectInput with `skillsUsed`
# We'll just do simple string replacements.
joined_block = "".join(extracted_block)
joined_block = joined_block.replace("learnings: ''", "skillsUsed: ''")
joined_block = joined_block.replace("'learnings'", "'skillsUsed'")
joined_block = joined_block.replace("proj.learnings", "proj.skillsUsed")
joined_block = joined_block.replace("Key Learnings or Outcomes", "Technical Skills Used (e.g. Verilog, Python, UVM)")
joined_block = joined_block.replace("Key Learnings", "Technical Skills Used")

# For ExperienceForm, it maps `initialValues.projects` with `skillsUsed: ''` now.
# So change `learnings: initialValues.learnings`? No, the user wants Projects' learnings changed.
# The `ProjectInput` is what had `learnings`. 
# Wait, what if someone had `learnings` on the Experience itself? 
# The user said: "instead of learning outcomes link to the technical skill. Means What I used in this projects of my technical skills"
# It implies the change is ONLY for the Projects Overview list.

# Let's find where AdminExperience begins
admin_start = next(i for i, line in enumerate(original_lines) if "export default function AdminExperience()" in line)

# Let's assemble the new file:
# 1. Imports (from start to admin_start)
new_content = "".join(original_lines[:admin_start])
# 2. Extracted block and styling
new_content += joined_block + "\n\n"
# 3. export default function AdminExperience() {
new_content += original_lines[admin_start]
# 4. lines after admin_start to months_start
new_content += "".join(original_lines[admin_start+1:months_start])
# 5. lines after exp_form_end+1 to end of file
new_content += "".join(original_lines[exp_form_end+1:])

with open(filename, 'w') as f:
    f.write(new_content)

print("done")
