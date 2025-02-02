#!/bin/bash

# Step 1: Add the other repository as a remote
git remote add dynasty_dispute_repo <URL_OF_OTHER_REPOSITORY>

# Step 2: Fetch updates from the remote repository
git fetch dynasty_dispute_repo

# Step 3: Checkout the specific directory from the remote repository
git checkout dynasty_dispute_repo/main -- Dynasty_Dispute/client

# Step 4: Move the updated contents to the root directory
rsync -av --progress Dynasty_Dispute/client/ . --exclude .git

# Step 5: Remove the temporary directory
rm -rf Dynasty_Dispute

# Step 6: Commit and push the changes
git add .
git commit -m "Update contents from Dynasty_Dispute/client"
git push origin main
